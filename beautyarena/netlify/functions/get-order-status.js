const { initializeApp, cert, getApps } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const jsonHeaders = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-store',
};

const initFirebaseAdmin = () => {
  if (!getApps().length) {
    const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
    const privateKey = (process.env.FIREBASE_ADMIN_PRIVATE_KEY || '').replace(/\\n/g, '\n');

    if (!projectId || !clientEmail || !privateKey) {
      return null;
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

const parseBody = (event) => {
  const raw = event?.isBase64Encoded
    ? Buffer.from(event.body || '', 'base64').toString('utf8')
    : (event.body || '{}');

  return JSON.parse(raw);
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

    if (!orderNumber) {
      return {
        statusCode: 400,
        headers: jsonHeaders,
        body: JSON.stringify({ success: false, error: 'Missing orderNumber' }),
      };
    }

    const db = initFirebaseAdmin();

    if (!db) {
      return {
        statusCode: 200,
        headers: jsonHeaders,
        body: JSON.stringify({
          success: false,
          found: false,
          orderNumber,
          status: 'payment_processing',
          paymentStatus: 'payment_processing',
          reason: 'admin_not_configured',
        }),
      };
    }

    const querySnap = await db
      .collection('orders')
      .where('orderNumber', '==', orderNumber)
      .limit(1)
      .get();

    if (querySnap.empty) {
      return {
        statusCode: 404,
        headers: jsonHeaders,
        body: JSON.stringify({
          success: false,
          found: false,
          orderNumber,
        }),
      };
    }

    const orderData = querySnap.docs[0].data() || {};

    return {
      statusCode: 200,
      headers: jsonHeaders,
      body: JSON.stringify({
        success: true,
        found: true,
        orderNumber,
        status: orderData.status || null,
        paymentStatus: orderData.paymentStatus || null,
        updatedAt: orderData.updatedAt || null,
        paidAt: orderData.paidAt || null,
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
