const crypto = require('crypto');

const trimTrailingSlash = (value = '') => value.replace(/\/+$/, '');

const toBoolean = (value, fallback = false) => {
  if (typeof value === 'boolean') return value;
  if (typeof value !== 'string') return fallback;

  const normalized = value.trim().toLowerCase();
  if (['1', 'true', 'yes', 'y', 'on'].includes(normalized)) return true;
  if (['0', 'false', 'no', 'n', 'off'].includes(normalized)) return false;

  return fallback;
};

const normalizePem = (rawValue = '') => rawValue.replace(/\\n/g, '\n').trim();

const normalizeCertificatePem = (rawCertificate = '') => {
  const cert = normalizePem(rawCertificate);

  if (!cert) {
    throw new Error('NETOPIA_PUBLIC_CERT is missing');
  }

  if (cert.includes('BEGIN CERTIFICATE')) {
    return cert;
  }

  const compact = cert.replace(/\s+/g, '');
  return `-----BEGIN CERTIFICATE-----\n${compact}\n-----END CERTIFICATE-----`;
};

const extractPublicKeyFromCertificate = (rawCertificate = '') => {
  const cert = normalizeCertificatePem(rawCertificate);

  try {
    const x509 = new crypto.X509Certificate(cert);
    return x509.publicKey.export({ type: 'spki', format: 'pem' }).toString();
  } catch (error) {
    throw new Error(`Invalid NETOPIA_PUBLIC_CERT content: ${error.message}`);
  }
};

const getBaseUrl = (event) => {
  const envBaseUrl = process.env.SITE_URL || process.env.URL || process.env.DEPLOY_PRIME_URL;

  if (envBaseUrl) {
    return trimTrailingSlash(envBaseUrl);
  }

  const headers = event?.headers || {};
  const host = headers['x-forwarded-host'] || headers.host;
  const proto = headers['x-forwarded-proto'] || 'https';

  if (host) {
    return `${proto}://${host}`;
  }

  throw new Error('Unable to determine site base URL. Set SITE_URL in Netlify environment variables.');
};

const splitFullName = (name = '') => {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  const firstName = parts.shift() || 'Client';
  const lastName = parts.join(' ') || 'Salon Beauty Arena';

  return { firstName, lastName };
};

const xmlEscape = (value = '') => String(value)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&apos;');

const parseNetopiaPayload = (event) => {
  const bodyRaw = event?.isBase64Encoded
    ? Buffer.from(event.body || '', 'base64').toString('utf8')
    : (event?.body || '');

  const contentType = (event?.headers?.['content-type'] || event?.headers?.['Content-Type'] || '').toLowerCase();

  if (contentType.includes('application/json')) {
    const parsed = JSON.parse(bodyRaw || '{}');
    return {
      envKey: parsed.env_key || parsed.envKey || '',
      data: parsed.data || '',
    };
  }

  const params = new URLSearchParams(bodyRaw);
  return {
    envKey: params.get('env_key') || params.get('envKey') || '',
    data: params.get('data') || '',
  };
};

const mapNetopiaActionToOrderStatus = (action = '') => {
  const normalized = String(action || '').trim().toLowerCase();

  switch (normalized) {
    case 'paid':
    case 'confirmed':
      return 'paid';
    case 'paid_pending':
    case 'confirmed_pending':
      return 'payment_pending';
    case 'canceled':
    case 'cancelled':
      return 'payment_cancelled';
    case 'credit':
      return 'refunded';
    default:
      return 'payment_processing';
  }
};

const getNetopiaConfig = () => {
  const signature = (process.env.NETOPIA_SIGNATURE || '').trim();
  const privateKey = normalizePem(process.env.NETOPIA_PRIVATE_KEY || '');
  const publicCert = process.env.NETOPIA_PUBLIC_CERT || '';

  if (!signature) {
    throw new Error('Missing NETOPIA_SIGNATURE environment variable');
  }

  if (!privateKey) {
    throw new Error('Missing NETOPIA_PRIVATE_KEY environment variable');
  }

  if (!publicCert) {
    throw new Error('Missing NETOPIA_PUBLIC_CERT environment variable');
  }

  const isLive = toBoolean(process.env.NETOPIA_IS_LIVE, false);
  const isSandbox = toBoolean(process.env.NETOPIA_SANDBOX, !isLive);

  return {
    signature,
    privateKey,
    publicCert,
    isSandbox,
  };
};

module.exports = {
  extractPublicKeyFromCertificate,
  getBaseUrl,
  getNetopiaConfig,
  mapNetopiaActionToOrderStatus,
  parseNetopiaPayload,
  splitFullName,
  xmlEscape,
};

