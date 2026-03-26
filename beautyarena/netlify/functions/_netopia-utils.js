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

const normalizePem = (rawValue = '') => String(rawValue || '')
  .replace(/^"|"$/g, '')
  .replace(/^'|'$/g, '')
  .replace(/\\n/g, '\n')
  .trim();

const normalizeCertificatePem = (rawCertificate = '') => {
  const cert = normalizePem(rawCertificate);

  if (!cert) {
    throw new Error('NETOPIA_PUBLIC_CERT is missing');
  }

  const compact = cert
    .replace(/-----BEGIN CERTIFICATE-----/gi, '')
    .replace(/-----END CERTIFICATE-----/gi, '')
    .replace(/\s+/g, '');

  const wrapped = compact.match(/.{1,64}/g)?.join('\n') || compact;
  return `-----BEGIN CERTIFICATE-----\n${wrapped}\n-----END CERTIFICATE-----`;
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
      cipher: parsed.cipher || '',
    };
  }

  const params = new URLSearchParams(bodyRaw);
  return {
    envKey: params.get('env_key') || params.get('envKey') || '',
    data: params.get('data') || '',
    cipher: params.get('cipher') || '',
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

const mapNetopiaV2ToOrderStatus = ({ paymentStatus, errorCode }) => {
  const status = Number(paymentStatus);
  const error = String(errorCode || '').trim();
  const isSuccessError = error === '' || error === '0' || error === '00';

  // Terminal successful payment statuses should win over error code variants
  // that can still be present in some intermediary gateway responses.
  if (status === 3 || status === 5) return 'paid';

  if (error === '100' || status === 15) return 'payment_processing';
  if (error === '101' || status === 1) return 'payment_pending';
  if (error === '99') return 'payment_processing';

  if (status === 12) return 'payment_cancelled';
  if (!isSuccessError) return 'payment_failed';

  return 'payment_processing';
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

  if (isLive && isSandbox) {
    throw new Error('Invalid NETOPIA mode configuration: NETOPIA_IS_LIVE and NETOPIA_SANDBOX cannot both be true');
  }

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
  mapNetopiaV2ToOrderStatus,
  parseNetopiaPayload,
  splitFullName,
  xmlEscape,
};

