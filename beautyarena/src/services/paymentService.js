const openNetopiaRedirect = ({ paymentUrl, envKey, data }) => {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = paymentUrl;
  form.style.display = 'none';

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
  const response = await fetch('/.netlify/functions/create-netopia-payment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderPayload),
  });

  const data = await response.json();

  const hasHostedUrl = Boolean(data?.hostedPaymentUrl);
  const hasStructuredPayload = Boolean(data?.paymentUrl && data?.envKey && data?.data);
  const hasLegacyPayload = Boolean(data?.redirectHtml);

  if (!response.ok || !data?.success || (!hasStructuredPayload && !hasLegacyPayload)) {
    const backendMessage = [data?.error, data?.details].filter(Boolean).join(': ');
    throw new Error(backendMessage || 'Nu s-a putut inițializa plata NETOPIA.');
  }

  if (hasHostedUrl) {
    window.location.assign(data.hostedPaymentUrl);
    return data;
  }

  if (hasStructuredPayload) {
    openNetopiaRedirect({
      paymentUrl: data.paymentUrl,
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

