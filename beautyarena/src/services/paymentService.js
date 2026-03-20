const openNetopiaRedirect = (redirectHtml) => {
  document.open();
  document.write(redirectHtml);
  document.close();
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

  if (!response.ok || !data?.success || !data?.redirectHtml) {
    const backendMessage = [data?.error, data?.details].filter(Boolean).join(': ');
    throw new Error(backendMessage || 'Nu s-a putut inițializa plata NETOPIA.');
  }

  openNetopiaRedirect(data.redirectHtml);
  return data;
};

