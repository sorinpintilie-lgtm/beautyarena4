const MobilPay = require('mobilpay-card');
const https = require('https');
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

const maskValue = (value = '', visible = 4) => {
  const normalized = String(value || '');
  if (!normalized) return '';
  if (normalized.length <= visible * 2) return '*'.repeat(normalized.length);

  return `${normalized.slice(0, visible)}...${normalized.slice(-visible)}`;
};

const getSafeDiagnostics = () => ({
  hasSignature: Boolean((process.env.NETOPIA_SIGNATURE || '').trim()),
  signatureRawLength: String(process.env.NETOPIA_SIGNATURE || '').length,
  signatureTrimmedLength: String((process.env.NETOPIA_SIGNATURE || '').trim()).length,
  signatureHasLeadingOrTrailingWhitespace:
    String(process.env.NETOPIA_SIGNATURE || '') !== String((process.env.NETOPIA_SIGNATURE || '').trim()),
  signaturePreview: maskValue((process.env.NETOPIA_SIGNATURE || '').trim()),
  hasPrivateKey: Boolean((process.env.NETOPIA_PRIVATE_KEY || '').trim()),
  privateKeyLength: String(process.env.NETOPIA_PRIVATE_KEY || '').length,
  hasPublicCert: Boolean((process.env.NETOPIA_PUBLIC_CERT || '').trim()),
  publicCertLength: String(process.env.NETOPIA_PUBLIC_CERT || '').length,
  netopiaIsLive: process.env.NETOPIA_IS_LIVE ?? null,
  netopiaSandbox: process.env.NETOPIA_SANDBOX ?? null,
  hasSiteUrl: Boolean(process.env.SITE_URL || process.env.URL || process.env.DEPLOY_PRIME_URL),
  netlifyContext: process.env.CONTEXT || null,
  netlifyBranch: process.env.BRANCH || null,
  deployId: process.env.DEPLOY_ID || null,
  siteName: process.env.SITE_NAME || null,
});

const parseBody = (event) => {
  const raw = event?.isBase64Encoded
    ? Buffer.from(event.body || '', 'base64').toString('utf8')
    : (event.body || '{}');

  return JSON.parse(raw);
};

const resolveHostedPaymentUrl = ({ paymentUrl, envKey, data }) => new Promise((resolve, reject) => {
  try {
    const body = new URLSearchParams({
      env_key: envKey,
      data,
    }).toString();

    const url = new URL(paymentUrl);
    const req = https.request({
      protocol: url.protocol,
      hostname: url.hostname,
      port: url.port || undefined,
      path: `${url.pathname || '/'}${url.search || ''}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(body),
      },
    }, (res) => {
      const statusCode = res.statusCode || 0;
      const location = res.headers.location || '';
      let body = '';

      res.on('data', (chunk) => {
        if (body.length >= 2000) return;
        body += String(chunk || '');
      });

      res.on('end', () => {
        const bodySample = body.slice(0, 400);

        if (![301, 302, 303, 307, 308].includes(statusCode) || !location) {
          resolve({ hostedPaymentUrl: '', statusCode, location, bodySample });
          return;
        }

        const hostedPaymentUrl = /^https?:\/\//i.test(location)
          ? location
          : new URL(location, paymentUrl).toString();

        resolve({ hostedPaymentUrl, statusCode, location: hostedPaymentUrl, bodySample });
      });
    });

    req.on('error', reject);
    req.write(body);
    req.end();
  } catch (error) {
    reject(error);
  }
});

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
    console.info('NETOPIA mode resolution', {
      NETOPIA_IS_LIVE: process.env.NETOPIA_IS_LIVE ?? null,
      NETOPIA_SANDBOX: process.env.NETOPIA_SANDBOX ?? null,
      resolvedMode: isSandbox ? 'sandbox' : 'live',
      signatureLength: signature.length,
      signaturePreview: maskValue(signature),
      privateKeyLength: privateKey.length,
      publicCertLength: String(publicCert || '').length,
      netlifyContext: process.env.CONTEXT || null,
      netlifyBranch: process.env.BRANCH || null,
      deployId: process.env.DEPLOY_ID || null,
    });
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

    const orderSignature = mobilPay?.paymentData?.order?.signature || '';
    console.info('NETOPIA payload signature diagnostics', {
      orderNumber,
      resolvedMode: isSandbox ? 'sandbox' : 'live',
      hasOrderSignature: Boolean(orderSignature),
      orderSignatureLength: String(orderSignature).length,
      orderSignaturePreview: maskValue(orderSignature),
      orderSignatureMatchesEnvSignature: orderSignature === signature,
      confirmUrl,
      returnUrl,
    });

    const request = mobilPay.buildRequest(isSandbox);
    const paymentUrl = String(request.url || '').replace(/^http:\/\//i, 'https://');
    let hostedPaymentUrl = '';

    try {
      const hostedResolution = await resolveHostedPaymentUrl({
        paymentUrl,
        envKey: request.env_key,
        data: request.data,
      });

      hostedPaymentUrl = hostedResolution.hostedPaymentUrl || '';
      const gatewayBodySampleCompact = String(hostedResolution.bodySample || '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 220);

      console.info('NETOPIA hosted payment URL resolution', {
        mode: isSandbox ? 'sandbox' : 'live',
        paymentUrl,
        hostedPaymentUrl,
        gatewayStatusCode: hostedResolution.statusCode,
        gatewayBodyHasSignatureMissing: /signature is missing/i.test(hostedResolution.bodySample || ''),
        gatewayBodyHasDecryptError: /decriptarea datelor a esuat/i.test(hostedResolution.bodySample || ''),
        gatewayBodySample: gatewayBodySampleCompact,
      });
    } catch (hostedResolutionError) {
      console.warn('NETOPIA hosted payment URL resolution failed', {
        mode: isSandbox ? 'sandbox' : 'live',
        paymentUrl,
        message: hostedResolutionError?.message,
      });
    }

    console.info('create-netopia-payment request built', {
      mode: isSandbox ? 'sandbox' : 'live',
      paymentUrl,
      signatureLength: signature.length,
      envKeyLength: String(request?.env_key || '').length,
      dataLength: String(request?.data || '').length,
    });

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
        paymentUrl,
        hostedPaymentUrl,
        envKey: request.env_key,
        data: request.data,
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

