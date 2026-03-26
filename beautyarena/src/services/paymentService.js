const PENDING_PAYMENT_STORAGE_KEY = 'beautyarena-pending-payment-order';

const openNetopiaRedirect = ({ paymentUrl, signature, envKey, data }) => {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = paymentUrl;
  form.style.display = 'none';

  if (signature) {
    const signatureInput = document.createElement('input');
    signatureInput.type = 'hidden';
    signatureInput.name = 'signature';
    signatureInput.value = signature;
    form.appendChild(signatureInput);
  }

  const envKeyInput = document.createElement('input');
  envKeyInput.type = 'hidden';
  envKeyInput.name = 'env_key';
  envKeyInput.value = envKey;

  const dataInput = document.createElement('input');
  dataInput.type = 'hidden';
  dataInput.name = 'data';
  dataInput.value = data;

  form.appendChild(envKeyInput);
  form.appendChild(dataInput);
  document.body.appendChild(form);
  form.submit();
};

export const initializeNetopiaPayment = async (orderPayload) => {
  const browserData = {
    BROWSER_USER_AGENT: navigator.userAgent,
    BROWSER_TZ: Intl.DateTimeFormat().resolvedOptions().timeZone,
    BROWSER_COLOR_DEPTH: window.screen.colorDepth,
    BROWSER_JAVA_ENABLED: false,
    BROWSER_LANGUAGE: navigator.language,
    BROWSER_TZ_OFFSET: new Date().getTimezoneOffset(),
    BROWSER_SCREEN_WIDTH: window.screen.width,
    BROWSER_SCREEN_HEIGHT: window.screen.height,
    BROWSER_PLUGINS: '',
    MOBILE: /Mobi|Android/i.test(navigator.userAgent),
    SCREEN_POINT: 'false',
    OS: '',
    OS_VERSION: '',
  };

  const response = await fetch('/.netlify/functions/create-netopia-payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...orderPayload,
      browserData,
    }),
  });

  const data = await response.json();

  const hasHostedUrl = Boolean(data?.hostedPaymentUrl);
  const hasStructuredPayload = Boolean(data?.paymentUrl && data?.envKey && data?.data);
  const hasLegacyPayload = Boolean(data?.redirectHtml);

  if (!response.ok || !data?.success || (!hasHostedUrl && !hasStructuredPayload && !hasLegacyPayload)) {
    const backendMessage = [data?.error, data?.details].filter(Boolean).join(': ');
    throw new Error(backendMessage || 'Nu s-a putut inițializa plata NETOPIA.');
  }

  if (data?.ntpID && orderPayload?.orderNumber) {
    try {
      const pendingPayment = JSON.parse(localStorage.getItem(PENDING_PAYMENT_STORAGE_KEY) || 'null');

      if (pendingPayment?.orderNumber === orderPayload.orderNumber) {
        localStorage.setItem(PENDING_PAYMENT_STORAGE_KEY, JSON.stringify({
          ...pendingPayment,
          ntpID: data.ntpID,
          updatedAt: new Date().toISOString(),
        }));
      }
    } catch (_error) {
      // no-op, used only for debugging fallback IDs
    }
  }

  if (hasHostedUrl) {
    window.location.assign(data.hostedPaymentUrl);
    return data;
  }

  if (hasStructuredPayload) {
    openNetopiaRedirect({
      paymentUrl: data.paymentUrl,
      signature: data.signature,
      envKey: data.envKey,
      data: data.data,
    });
    return data;
  }

  document.open();
  document.write(data.redirectHtml);
  document.close();
  return data;
};

