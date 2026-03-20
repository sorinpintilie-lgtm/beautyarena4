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

const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: xmlHeaders,
      body: safeXmlResponse(1, 'Method not allowed'),
    };
  }

  try {
    const { envKey, data } = parseNetopiaPayload(event);

    if (!envKey || !data) {
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

    const validation = await mobilPay.validatePayment(envKey, data);

    const orderNumber = validation?.$?.id || validation?.orderInvoice?.$?.order_id || null;
    const action = validation?.action || '';
    const status = mapNetopiaActionToOrderStatus(action);

    if (validation?.error) {
      return {
        statusCode: 200,
        headers: xmlHeaders,
        body: validation?.res?.send || safeXmlResponse(5, validation?.errorMessage || 'Validation error'),
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
        await doc.ref.update({
          status,
          paymentStatus: status,
          paymentGateway: 'netopia',
          paymentAction: action || null,
          paymentUpdatedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

        if (status === 'paid') {
          const orderData = { id: doc.id, ...doc.data() };
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
        console.warn('NETOPIA IPN order not found for orderNumber:', orderNumber);
      }
    } else {
      console.warn('NETOPIA IPN without order id in payload/action:', action);
    }

    return {
      statusCode: 200,
      headers: xmlHeaders,
      body: validation?.res?.send || safeXmlResponse(0, validation?.errorMessage || 'OK'),
    };
  } catch (error) {
    console.error('netopia-ipn error:', error);
    return {
      statusCode: 200,
      headers: xmlHeaders,
      body: safeXmlResponse(9, error.message || 'Internal error'),
    };
  }
};

module.exports = { handler };

