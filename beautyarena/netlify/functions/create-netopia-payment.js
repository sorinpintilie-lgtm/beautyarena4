const MobilPay = require('mobilpay-card');
const {
  extractPublicKeyFromCertificate,
  getBaseUrl,
  getNetopiaConfig,
  splitFullName,
  xmlEscape,
} = require('./_netopia-utils');

const jsonHeaders = {
  'Content-Type': 'application/json',
};

const getSafeDiagnostics = () => ({
  hasSignature: Boolean((process.env.NETOPIA_SIGNATURE || '').trim()),
  hasPrivateKey: Boolean((process.env.NETOPIA_PRIVATE_KEY || '').trim()),
  hasPublicCert: Boolean((process.env.NETOPIA_PUBLIC_CERT || '').trim()),
  netopiaIsLive: process.env.NETOPIA_IS_LIVE ?? null,
  netopiaSandbox: process.env.NETOPIA_SANDBOX ?? null,
  hasSiteUrl: Boolean(process.env.SITE_URL || process.env.URL || process.env.DEPLOY_PRIME_URL),
});

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
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const payload = parseBody(event);
    const {
      orderNumber,
      amount,
      currency = 'RON',
      description,
      customerInfo = {},
      shippingAddress = {},
    } = payload;

    if (!orderNumber) {
      return {
        statusCode: 400,
        headers: jsonHeaders,
        body: JSON.stringify({ error: 'Missing orderNumber' }),
      };
    }

    if (!amount || Number(amount) <= 0) {
      return {
        statusCode: 400,
        headers: jsonHeaders,
        body: JSON.stringify({ error: 'Invalid amount' }),
      };
    }

    const { signature, privateKey, publicCert, isSandbox } = getNetopiaConfig();
    const publicKey = extractPublicKeyFromCertificate(publicCert);

    const baseUrl = getBaseUrl(event);
    const returnUrl = `${baseUrl}/confirmare-comanda?source=netopia&order=${encodeURIComponent(orderNumber)}`;
    const confirmUrl = `${baseUrl}/.netlify/functions/netopia-ipn`;

    const fullName = shippingAddress.fullName || customerInfo.name || 'Client Beauty Arena';
    const { firstName, lastName } = splitFullName(fullName);
    const address = [shippingAddress.address, shippingAddress.city, shippingAddress.postalCode]
      .filter(Boolean)
      .join(', ') || 'Adresă indisponibilă';

    const mobilPay = new MobilPay(signature);
    mobilPay.setPublicKey(publicKey);
    mobilPay.setPrivateKey(privateKey);

    mobilPay.setClientBillingData({
      firstName,
      lastName,
      county: shippingAddress.city || 'București',
      city: shippingAddress.city || 'București',
      address,
      email: customerInfo.email || 'contact@salonbeautyarena.ro',
      phone: customerInfo.phone || shippingAddress.phone || '0700000000',
    });

    mobilPay.setClientShippingData({
      firstName,
      lastName,
      county: shippingAddress.city || 'București',
      city: shippingAddress.city || 'București',
      address,
      email: customerInfo.email || 'contact@salonbeautyarena.ro',
      phone: customerInfo.phone || shippingAddress.phone || '0700000000',
    });

    mobilPay.setPaymentData({
      orderId: orderNumber,
      amount: Number(amount).toFixed(2),
      currency,
      details: description || `Comandă ${orderNumber}`,
      confirmUrl,
      returnUrl,
    });

    const request = mobilPay.buildRequest(isSandbox);
    const paymentUrl = String(request.url || '').replace(/^http:\/\//i, 'https://');

    const redirectHtml = `<!doctype html>
<html lang="ro">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Redirecționare către NETOPIA</title>
  </head>
  <body>
    <p>Redirecționare către pagina securizată de plată...</p>
    <form id="netopiaRedirect" method="post" action="${xmlEscape(paymentUrl)}">
      <input type="hidden" name="env_key" value="${xmlEscape(request.env_key)}" />
      <input type="hidden" name="data" value="${xmlEscape(request.data)}" />
      <noscript><button type="submit">Continuă către plată</button></noscript>
    </form>
    <script>document.getElementById('netopiaRedirect').submit();</script>
  </body>
</html>`;

    return {
      statusCode: 200,
      headers: jsonHeaders,
      body: JSON.stringify({
        success: true,
        orderNumber,
        redirectHtml,
        mode: isSandbox ? 'sandbox' : 'live',
      }),
    };
  } catch (error) {
    const diagnostics = getSafeDiagnostics();
    console.error('create-netopia-payment error:', {
      name: error?.name,
      message: error?.message,
      diagnostics,
    });

    return {
      statusCode: 500,
      headers: jsonHeaders,
      body: JSON.stringify({
        error: 'Failed to initialize NETOPIA payment',
        details: error.message,
        diagnostics,
      }),
    };
  }
};

module.exports = { handler };

