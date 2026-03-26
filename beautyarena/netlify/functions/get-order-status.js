const { mapNetopiaV2ToOrderStatus } = require('./_netopia-utils');

const jsonHeaders = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
};

const parseBody = (event) => {
  const raw = event?.isBase64Encoded
    ? Buffer.from(event.body || '', 'base64').toString('utf8')
    : (event.body || '{}');

  return JSON.parse(raw);
};

const toBoolean = (value, fallback = false) => {
  if (typeof value === 'boolean') return value;
  if (typeof value !== 'string') return fallback;

  const normalized = value.trim().toLowerCase();
  if (['1', 'true', 'yes', 'y', 'on'].includes(normalized)) return true;
  if (['0', 'false', 'no', 'n', 'off'].includes(normalized)) return false;

  return fallback;
};

const resolveNetopiaBaseUrl = () => {
  const isLive = toBoolean(process.env.NETOPIA_IS_LIVE, false);
  return isLive
    ? 'https://secure.mobilpay.ro/pay'
    : 'https://secure.sandbox.netopia-payments.com';
};

const parseJsonSafe = (rawText) => {
  try {
    return JSON.parse(rawText || '{}');
  } catch (_error) {
    return null;
  }
};

const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: jsonHeaders,
      body: JSON.stringify({ success: false, error: 'Method not allowed' }),
    };
  }

  try {
    const payload = parseBody(event);
    const orderNumber = String(payload?.orderNumber || '').trim();
    const ntpID = String(payload?.ntpID || payload?.ntpId || '').trim();

    if (!orderNumber && !ntpID) {
      return {
        statusCode: 400,
        headers: jsonHeaders,
        body: JSON.stringify({ success: false, error: 'Missing orderNumber or ntpID' }),
      };
    }

    const netopiaApiKey = String(process.env.NETOPIA_API_KEY || '').trim();

    if (!netopiaApiKey) {
      return {
        statusCode: 200,
        headers: jsonHeaders,
        body: JSON.stringify({
          success: false,
          found: false,
          orderNumber: orderNumber || null,
          ntpID: ntpID || null,
          status: 'payment_processing',
          paymentStatus: 'payment_processing',
          reason: 'netopia_not_configured',
        }),
      };
    }

    const requestBody = {
      ...(orderNumber ? { orderID: orderNumber } : {}),
      ...(ntpID ? { ntpID } : {}),
      ...(process.env.NETOPIA_POS_ID ? { posID: String(process.env.NETOPIA_POS_ID) } : {}),
    };

    const baseUrl = resolveNetopiaBaseUrl();
    const statusUrl = `${baseUrl}/operation/status`;

    console.info('get-order-status querying NETOPIA directly', {
      statusUrl,
      orderNumber: orderNumber || null,
      ntpID: ntpID || null,
      hasApiKey: Boolean(netopiaApiKey),
      hasPosId: Boolean(process.env.NETOPIA_POS_ID),
      netopiaIsLive: process.env.NETOPIA_IS_LIVE ?? null,
    });

    const statusResponse = await fetch(statusUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: netopiaApiKey,
      },
      body: JSON.stringify(requestBody),
    });

    const responseText = await statusResponse.text();
    const statusPayload = parseJsonSafe(responseText);

    if (!statusResponse.ok) {
      return {
        statusCode: 502,
        headers: jsonHeaders,
        body: JSON.stringify({
          success: false,
          found: false,
          orderNumber: orderNumber || null,
          ntpID: ntpID || null,
          status: 'payment_processing',
          paymentStatus: 'payment_processing',
          reason: 'netopia_status_http_error',
          netopiaHttpStatus: statusResponse.status,
          netopiaResponse: statusPayload || responseText.slice(0, 500),
        }),
      };
    }

    if (!statusPayload) {
      return {
        statusCode: 502,
        headers: jsonHeaders,
        body: JSON.stringify({
          success: false,
          found: false,
          orderNumber: orderNumber || null,
          ntpID: ntpID || null,
          status: 'payment_processing',
          paymentStatus: 'payment_processing',
          reason: 'netopia_status_parse_error',
        }),
      };
    }

    const paymentStatusCode = statusPayload?.payment?.status ?? null;
    const errorCode = statusPayload?.error?.code || null;
    const mappedStatus = mapNetopiaV2ToOrderStatus({
      paymentStatus: paymentStatusCode,
      errorCode,
    });

    const resolvedOrderNumber = statusPayload?.order?.orderID || orderNumber || null;
    const resolvedNtpID = statusPayload?.payment?.ntpID || ntpID || null;
    const found = Boolean(resolvedOrderNumber || resolvedNtpID || statusPayload?.error?.message || errorCode);

    return {
      statusCode: 200,
      headers: jsonHeaders,
      body: JSON.stringify({
        success: true,
        found,
        source: 'netopia',
        orderNumber: resolvedOrderNumber,
        ntpID: resolvedNtpID,
        status: mappedStatus,
        paymentStatus: mappedStatus,
        paymentStatusCode,
        errorCode,
        errorMessage: statusPayload?.error?.message || null,
        updatedAt: new Date().toISOString(),
      }),
    };
  } catch (error) {
    console.error('get-order-status error:', error);

    return {
      statusCode: 500,
      headers: jsonHeaders,
      body: JSON.stringify({
        success: false,
        error: 'Failed to fetch order status',
      }),
    };
  }
};

module.exports = { handler };
