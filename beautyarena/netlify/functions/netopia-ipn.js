const MobilPay = require('mobilpay-card');
const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const {
  extractPublicKeyFromCertificate,
  getNetopiaConfig,
  mapNetopiaActionToOrderStatus,
  parseNetopiaPayload,
} = require('./_netopia-utils');

const xmlHeaders = {
  'Content-Type': 'application/xml; charset=utf-8',
  'Cache-Control': 'no-store',
};

const jsonHeaders = {
  'Content-Type': 'application/json',
};

const jsonAckBody = '{"errorCode":0}';

const jsonAckResponse = () => ({
  statusCode: 200,
  headers: jsonHeaders,
  body: jsonAckBody,
});

const toBoolean = (value, fallback = false) => {
  if (typeof value === 'boolean') return value;
  if (typeof value !== 'string') return fallback;

  const normalized = value.trim().toLowerCase();
  if (['1', 'true', 'yes', 'y', 'on'].includes(normalized)) return true;
  if (['0', 'false', 'no', 'n', 'off'].includes(normalized)) return false;

  return fallback;
};

const isIpnDebugEnabled = () => toBoolean(process.env.NETOPIA_IPN_DEBUG, false);

const decodeEventBody = (event) => {
  if (!event?.body) return '';
  return event.isBase64Encoded
    ? Buffer.from(event.body, 'base64').toString('utf8')
    : String(event.body || '');
};

const summarizeBodyByContentType = ({ contentType, rawBody }) => {
  if (!rawBody) {
    return { hasBody: false };
  }

  if (String(contentType || '').includes('application/json')) {
    try {
      const parsed = JSON.parse(rawBody || '{}');
      return {
        hasBody: true,
        bodyType: 'json',
        topLevelKeys: Object.keys(parsed || {}),
        hasOrderId: Boolean(parsed?.order?.orderID || parsed?.orderID),
        hasPaymentStatus: Boolean(parsed?.payment?.status !== undefined),
        hasErrorCode: Boolean(parsed?.error?.code),
      };
    } catch (error) {
      return {
        hasBody: true,
        bodyType: 'json',
        jsonParseError: error.message,
      };
    }
  }

  const params = new URLSearchParams(rawBody);
  const envKey = params.get('env_key') || params.get('envKey') || '';
  const data = params.get('data') || '';
  const cipher = params.get('cipher') || '';
  const signature = params.get('signature') || '';

  return {
    hasBody: true,
    bodyType: 'form-urlencoded',
    envKeyLength: envKey.length,
    dataLength: data.length,
    cipher,
    hasSignature: Boolean(signature),
    signatureLength: signature.length,
  };
};

const initFirebaseAdmin = () => {
  if (!getApps().length) {
    const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
    const privateKey = (process.env.FIREBASE_ADMIN_PRIVATE_KEY || '').replace(/\\n/g, '\n');

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error('Missing Firebase Admin env vars: FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY');
    }

    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }

  return getFirestore();
};

const safeXmlResponse = (errorCode = 0, message = 'OK') => {
  const msg = String(message || 'OK')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return `<?xml version="1.0" encoding="utf-8"?><crc error_code="${errorCode}">${msg}</crc>`;
};

const orderAckXmlResponse = (orderId = 'UNKNOWN', message = 'OK') => {
  const escapedOrderId = String(orderId || 'UNKNOWN')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

  const escapedMessage = String(message || 'OK')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return `<?xml version="1.0" encoding="utf-8"?><crc><order id="${escapedOrderId}">${escapedMessage}</order></crc>`;
};

const parseJsonBody = (event) => {
  const raw = event?.isBase64Encoded
    ? Buffer.from(event.body || '', 'base64').toString('utf8')
    : (event?.body || '{}');

  return JSON.parse(raw || '{}');
};

const mapNetopiaV2ToOrderStatus = ({ paymentStatus, errorCode }) => {
  const status = Number(paymentStatus);
  const error = String(errorCode || '').trim();
  const isSuccessError = error === '' || error === '0' || error === '00';

  // In v2, status must be interpreted together with error.code.
  // Mark as paid for successful terminal status + success error code variants.
  if (isSuccessError && (status === 3 || status === 5)) return 'paid';

  if (error === '100' || status === 15) return 'payment_processing';
  if (error === '101' || status === 1) return 'payment_pending';

  if (status === 12) return 'payment_cancelled';
  if (!isSuccessError) return 'payment_failed';

  return 'payment_processing';
};

const handler = async (event) => {
  const requestId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  const contentType = String(event?.headers?.['content-type'] || event?.headers?.['Content-Type'] || '').toLowerCase();
  const isJsonRequest = contentType.includes('application/json');
  const debugEnabled = isIpnDebugEnabled();
  const rawBody = decodeEventBody(event);

  console.info('[netopia-ipn] request received', {
    requestId,
    httpMethod: event?.httpMethod,
    path: event?.path,
    contentType,
    isJsonRequest,
    isBase64Encoded: Boolean(event?.isBase64Encoded),
    bodyLength: rawBody.length,
    host: event?.headers?.host || event?.headers?.['x-forwarded-host'] || null,
    forwardedFor: event?.headers?.['x-forwarded-for'] || event?.headers?.['X-Forwarded-For'] || null,
    userAgent: event?.headers?.['user-agent'] || event?.headers?.['User-Agent'] || null,
  });

  if (debugEnabled) {
    console.info('[netopia-ipn] request body summary', {
      requestId,
      ...summarizeBodyByContentType({ contentType, rawBody }),
    });
  }

  if (event.httpMethod !== 'POST') {
    console.warn('[netopia-ipn] rejected non-POST request', { requestId, method: event.httpMethod });
    return {
      statusCode: 405,
      headers: xmlHeaders,
      body: safeXmlResponse(1, 'Method not allowed'),
    };
  }

  try {
    if (isJsonRequest) {
      const payload = parseJsonBody(event);
      const orderNumber = payload?.order?.orderID || payload?.orderID || null;
      const paymentStatusCode = payload?.payment?.status ?? null;
      const errorCode = payload?.error?.code || null;
      const status = mapNetopiaV2ToOrderStatus({ paymentStatus: paymentStatusCode, errorCode });

      console.info('[netopia-ipn] v2 payload parsed', {
        requestId,
        orderNumber,
        paymentStatusCode,
        errorCode,
        mappedStatus: status,
      });

      if (orderNumber) {
        const db = initFirebaseAdmin();
        const querySnap = await db
          .collection('orders')
          .where('orderNumber', '==', orderNumber)
          .limit(1)
          .get();

        if (!querySnap.empty) {
          const doc = querySnap.docs[0];
          const currentData = doc.data() || {};
          const previousPaymentStatus = currentData.paymentStatus || currentData.status || null;
          const normalizedStatus = previousPaymentStatus === 'paid' && status !== 'paid' ? 'paid' : status;
          const shouldSendPaidEmail = normalizedStatus === 'paid' && previousPaymentStatus !== 'paid';

          const nextOrderUpdate = {
            status: normalizedStatus,
            paymentStatus: normalizedStatus,
            paymentGateway: 'netopia-v2',
            paymentAction: payload?.error?.message || null,
            paymentUpdatedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            ...(normalizedStatus === 'paid' && !currentData.paidAt ? { paidAt: new Date().toISOString() } : {}),
          };

          await doc.ref.update(nextOrderUpdate);
          console.info('[netopia-ipn] v2 order updated', {
            requestId,
            orderNumber,
            previousPaymentStatus,
            normalizedStatus,
            shouldSendPaidEmail,
          });

          if (shouldSendPaidEmail) {
            const orderData = { id: doc.id, ...currentData, ...nextOrderUpdate };
            const siteUrl = process.env.SITE_URL || process.env.URL || process.env.DEPLOY_PRIME_URL;

            if (siteUrl) {
              try {
                await fetch(`${siteUrl}/.netlify/functions/send-email`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    type: 'order_confirmation',
                    data: orderData,
                  }),
                });

                await fetch(`${siteUrl}/.netlify/functions/send-email`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    type: 'store_order_notification',
                    data: orderData,
                  }),
                });
              } catch (emailError) {
                console.warn('NETOPIA v2 webhook email notification failed:', emailError.message);
              }
            }
          }
        } else {
          console.warn('NETOPIA v2 webhook order not found for orderNumber:', orderNumber, { requestId });
        }
      } else {
        console.warn('NETOPIA v2 webhook missing order id', { requestId, payloadKeys: Object.keys(payload || {}) });
      }

      console.info('[netopia-ipn] v2 ack sent', { requestId, ackBody: jsonAckBody });
      return jsonAckResponse();
    }

    const { envKey, data, cipher } = parseNetopiaPayload(event);

    console.info('[netopia-ipn] classic payload parsed', {
      requestId,
      envKeyLength: String(envKey || '').length,
      dataLength: String(data || '').length,
      cipher: cipher || null,
    });

    if (!envKey || !data) {
      console.warn('[netopia-ipn] missing encrypted fields', {
        requestId,
        hasEnvKey: Boolean(envKey),
        hasData: Boolean(data),
      });
      return {
        statusCode: 400,
        headers: xmlHeaders,
        body: safeXmlResponse(2, 'Missing env_key or data'),
      };
    }

    const { signature, privateKey, publicCert } = getNetopiaConfig();
    const publicKey = extractPublicKeyFromCertificate(publicCert);

    const mobilPay = new MobilPay(signature);
    mobilPay.setPublicKey(publicKey);
    mobilPay.setPrivateKey(privateKey);

    console.info('[netopia-ipn] starting validatePayment', {
      requestId,
      signatureLength: String(signature || '').length,
    });
    const validation = await mobilPay.validatePayment(envKey, data, cipher || undefined);

    const orderNumber = validation?.$?.id || validation?.orderInvoice?.$?.order_id || null;
    const action = validation?.action || '';
    const status = mapNetopiaActionToOrderStatus(action);

    console.info('[netopia-ipn] validatePayment finished', {
      requestId,
      orderNumber,
      action,
      mappedStatus: status,
      hasValidationError: Boolean(validation?.error),
      hasSdkAck: Boolean(validation?.res?.send),
    });

    if (validation?.error) {
      console.warn('[netopia-ipn] validation marked as error by SDK', {
        requestId,
        orderNumber,
        errorMessage: validation?.errorMessage || null,
      });
      return {
        statusCode: 200,
        headers: xmlHeaders,
        body:
          validation?.res?.send
          || orderAckXmlResponse(orderNumber || 'UNKNOWN', validation?.errorMessage || 'Validation error')
          || safeXmlResponse(5, validation?.errorMessage || 'Validation error'),
      };
    }

    if (orderNumber) {
      const db = initFirebaseAdmin();
      const querySnap = await db
        .collection('orders')
        .where('orderNumber', '==', orderNumber)
        .limit(1)
        .get();

      if (!querySnap.empty) {
        const doc = querySnap.docs[0];
        const currentData = doc.data() || {};
        const previousPaymentStatus = currentData.paymentStatus || currentData.status || null;
        const normalizedStatus = previousPaymentStatus === 'paid' && status !== 'paid' ? 'paid' : status;
        const shouldSendPaidEmail = normalizedStatus === 'paid' && previousPaymentStatus !== 'paid';

        const nextOrderUpdate = {
          status: normalizedStatus,
          paymentStatus: normalizedStatus,
          paymentGateway: 'netopia',
          paymentAction: action || null,
          paymentUpdatedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          ...(normalizedStatus === 'paid' && !currentData.paidAt ? { paidAt: new Date().toISOString() } : {}),
        };

        await doc.ref.update(nextOrderUpdate);
        console.info('[netopia-ipn] classic order updated', {
          requestId,
          orderNumber,
          previousPaymentStatus,
          normalizedStatus,
          shouldSendPaidEmail,
        });

        if (shouldSendPaidEmail) {
          const orderData = { id: doc.id, ...currentData, ...nextOrderUpdate };
          const siteUrl = process.env.SITE_URL || process.env.URL || process.env.DEPLOY_PRIME_URL;

          if (siteUrl) {
            try {
              await fetch(`${siteUrl}/.netlify/functions/send-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  type: 'order_confirmation',
                  data: orderData,
                }),
              });

              await fetch(`${siteUrl}/.netlify/functions/send-email`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  type: 'store_order_notification',
                  data: orderData,
                }),
              });
            } catch (emailError) {
              console.warn('NETOPIA IPN email notification failed:', emailError.message);
            }
          } else {
            console.warn('SITE_URL/URL is missing; skipping NETOPIA IPN email notifications.');
          }
        }
      } else {
        console.warn('NETOPIA IPN order not found for orderNumber:', orderNumber, { requestId });
      }
    } else {
      console.warn('NETOPIA IPN without order id in payload/action:', action, { requestId });
    }

    const ackBody =
      validation?.res?.send
      || orderAckXmlResponse(orderNumber || 'UNKNOWN', 'OK')
      || safeXmlResponse(0, validation?.errorMessage || 'OK');

    console.info('[netopia-ipn] classic ack sent', {
      requestId,
      orderNumber,
      ackLength: String(ackBody || '').length,
      ackPreview: String(ackBody || '').slice(0, 180),
    });

    return {
      statusCode: 200,
      headers: xmlHeaders,
      body: ackBody,
    };
  } catch (error) {
    console.error('netopia-ipn error:', {
      requestId,
      name: error?.name,
      message: error?.message,
      stack: isIpnDebugEnabled() ? error?.stack : undefined,
    });

    if (isJsonRequest) {
      console.warn('[netopia-ipn] returning v2 ack despite error', { requestId });
      return jsonAckResponse();
    }

    return {
      statusCode: 200,
      headers: xmlHeaders,
      body: safeXmlResponse(9, error.message || 'Internal error'),
    };
  }
};

module.exports = { handler };

