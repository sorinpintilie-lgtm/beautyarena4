const sgMail = require('@sendgrid/mail');

// Initialize SendGrid with API key from environment
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const FROM_EMAIL = 'contact@salonbeautyarena.ro';
const FROM_NAME = 'Salon Beauty Arena';

function generateBookingConfirmationHTML(bookingData) {
  const servicesList = bookingData.services.map(service =>
    `<li>${service.name} (${service.duration} min)</li>`
  ).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Confirmare Programare - Salon Beauty Arena</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FFAB9D, #FF8B7A); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FFAB9D; }
        .services { margin: 15px 0; }
        .services ul { list-style: none; padding: 0; }
        .services li { padding: 5px 0; border-bottom: 1px solid #eee; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        .highlight { color: #FFAB9D; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Programarea dumneavoastră a fost confirmată!</h1>
          <p>Salon Beauty Arena vă mulțumește pentru încredere</p>
        </div>

        <div class="content">
          <p>Bună ziua, <strong>${bookingData.customerInfo.name}</strong>,</p>

          <p>Programarea dumneavoastră a fost înregistrată cu succes. Detaliile sunt următoarele:</p>

          <div class="booking-details">
            <h3>📅 Detalii Programare</h3>
            <p><strong>Data:</strong> ${new Date(bookingData.date).toLocaleDateString('ro-RO', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
            <p><strong>Ora:</strong> ${bookingData.startTime}</p>
            <p><strong>Specialist:</strong> ${bookingData.specialistName}</p>
            <p><strong>Durată totală:</strong> ${bookingData.duration} minute</p>

            <div class="services">
              <h4>💅 Servicii rezervate:</h4>
              <ul>${servicesList}</ul>
            </div>
          </div>

          <p><strong>Important:</strong> Vă rugăm să ajungeți cu 10-15 minute înainte de ora programată.</p>

          <p>Dacă aveți întrebări sau doriți să modificați programarea, ne puteți contacta la:</p>
          <p>📞 Telefon: +40 123 456 789</p>
          <p>📧 Email: ${FROM_EMAIL}</p>

          <p>Vă așteptăm cu drag la Salon Beauty Arena!</p>

          <div class="footer">
            <p>© 2025 Salon Beauty Arena. Toate drepturile rezervate.</p>
            <p>Strada Exemplu nr. 123, București, România</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateBookingCancellationHTML(bookingData) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Programare Anulată - Salon Beauty Arena</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #666, #444); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📋 Programare Anulată</h1>
          <p>Salon Beauty Arena</p>
        </div>

        <div class="content">
          <p>Bună ziua, <strong>${bookingData.customerInfo.name}</strong>,</p>

          <p>Vă confirmăm că programarea dumneavoastră din <strong>${new Date(bookingData.date).toLocaleDateString('ro-RO')}</strong> la ora <strong>${bookingData.startTime}</strong> a fost anulată cu succes.</p>

          <p>Dacă doriți să reprogramați, vă rugăm să accesați site-ul nostru sau să ne contactați direct.</p>

          <p>Vă mulțumim pentru înțelegere!</p>

          <div class="footer">
            <p>© 2025 Salon Beauty Arena. Toate drepturile rezervate.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateOrderConfirmationHTML(orderData) {
  const itemsList = orderData.items.map(item =>
    `<li>${item.name} x${item.quantity} - ${item.price * item.quantity} lei</li>`
  ).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Confirmare Comandă - Salon Beauty Arena</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FFAB9D, #FF8B7A); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FFAB9D; }
        .items { margin: 15px 0; }
        .items ul { list-style: none; padding: 0; }
        .items li { padding: 5px 0; border-bottom: 1px solid #eee; }
        .total { font-size: 18px; font-weight: bold; color: #FFAB9D; text-align: right; margin-top: 15px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🛍️ Comandă Confirmată!</h1>
          <p>Comanda #${orderData.orderNumber}</p>
        </div>

        <div class="content">
          <p>Bună ziua, <strong>${orderData.customerInfo.name}</strong>,</p>

          <p>Vă mulțumim pentru comanda dumneavoastră! Detaliile comenzii sunt următoarele:</p>

          <div class="order-details">
            <h3>📦 Detalii Comandă</h3>
            <p><strong>Număr comandă:</strong> ${orderData.orderNumber}</p>
            <p><strong>Data:</strong> ${new Date(orderData.createdAt).toLocaleDateString('ro-RO')}</p>

            <div class="items">
              <h4>Produse comandate:</h4>
              <ul>${itemsList}</ul>
            </div>

            <div class="total">
              Total: ${orderData.total} lei
            </div>
          </div>

          <p>Comanda dumneavoastră va fi procesată în cel mai scurt timp. Veți primi un email separat când comanda va fi expediată.</p>

          <p>Pentru orice întrebări, ne puteți contacta la:</p>
          <p>📞 Telefon: +40 123 456 789</p>
          <p>📧 Email: ${FROM_EMAIL}</p>

          <div class="footer">
            <p>© 2025 Salon Beauty Arena. Toate drepturile rezervate.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateStoreOrderNotificationHTML(orderData) {
  const itemsList = orderData.items.map(item =>
    `<li>${item.name} x${item.quantity} - ${item.price * item.quantity} lei</li>`
  ).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Comandă Nouă Primită - Salon Beauty Arena</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FF6B35, #F7931E); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .order-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #FF6B35; }
        .shipping-info { background: #fff3cd; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .items { margin: 15px 0; }
        .items ul { list-style: none; padding: 0; }
        .items li { padding: 5px 0; border-bottom: 1px solid #eee; }
        .total { font-size: 18px; font-weight: bold; color: #FF6B35; text-align: right; margin-top: 15px; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        .urgent { color: #dc3545; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🆕 Comandă Nouă Primită!</h1>
          <p>Comanda #${orderData.orderNumber} - Procesare necesară</p>
        </div>

        <div class="content">
          <p><span class="urgent">URGENT:</span> Ați primit o comandă nouă care necesită procesare imediată.</p>

          <div class="order-details">
            <h3>📦 Detalii Comandă</h3>
            <p><strong>Număr comandă:</strong> ${orderData.orderNumber}</p>
            <p><strong>Data primirii:</strong> ${new Date(orderData.createdAt).toLocaleDateString('ro-RO')}</p>
            <p><strong>Metodă de plată:</strong> ${orderData.paymentMethod === 'card' ? 'Card bancar' : 'Ramburs'}</p>
            <p><strong>Metodă de livrare:</strong> ${orderData.shippingMethod === 'standard' ? 'Curier standard' : 'Curier express'}</p>

            <div class="items">
              <h4>Produse comandate:</h4>
              <ul>${itemsList}</ul>
            </div>

            <div class="total">
              Total: ${orderData.total} lei
            </div>
          </div>

          <div class="shipping-info">
            <h4>🚚 Informații de livrare:</h4>
            <p><strong>Nume:</strong> ${orderData.shippingAddress.fullName}</p>
            <p><strong>Adresă:</strong> ${orderData.shippingAddress.address}</p>
            <p><strong>Oraș:</strong> ${orderData.shippingAddress.city}</p>
            <p><strong>Cod poștal:</strong> ${orderData.shippingAddress.postalCode}</p>
            <p><strong>Țară:</strong> ${orderData.shippingAddress.country}</p>
            <p><strong>Telefon:</strong> ${orderData.shippingAddress.phone}</p>
            <p><strong>Email:</strong> ${orderData.customerInfo.email}</p>
          </div>

          <p><strong>Acțiuni necesare:</strong></p>
          <ul>
            <li>Verificați stocul pentru toate produsele comandate</li>
            <li>Pregătiți coletul pentru expediere</li>
            <li>Contactați clientul dacă sunt probleme cu stocul</li>
            <li>Actualizați statusul comenzii în sistem</li>
          </ul>

          <p>Pentru orice întrebări sau probleme, verificați email-ul clientului: <strong>${orderData.customerInfo.email}</strong></p>

          <div class="footer">
            <p>© 2025 Salon Beauty Arena. Sistem automat de notificări</p>
            <p>Procesați comenzile cât mai repede posibil pentru satisfacția clienților!</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateWelcomeEmailHTML(userData) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Bine ați venit la Salon Beauty Arena</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FFAB9D, #FF8B7A); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .features { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .features ul { list-style: none; padding: 0; }
        .features li { padding: 8px 0; border-bottom: 1px solid #eee; }
        .features li:before { content: "✨ "; color: #FFAB9D; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🌟 Bine ați venit la Salon Beauty Arena!</h1>
          <p>Contul dumneavoastră a fost creat cu succes</p>
        </div>

        <div class="content">
          <p>Bună ziua, <strong>${userData.name}</strong>,</p>

          <p>Bine ați venit în comunitatea Salon Beauty Arena! Contul dumneavoastră a fost creat cu succes și acum puteți beneficia de toate avantajele:</p>

          <div class="features">
            <h3>🎁 Avantajele contului dumneavoastră:</h3>
            <ul>
              <li>Programări online rapide și ușoare</li>
              <li>Istoric complet al programărilor</li>
              <li>Anularea și reprogramarea facilă</li>
              <li>Comenzi online cu livrare la domiciliu</li>
              <li>Oferte speciale și reduceri exclusive</li>
              <li>Notificări pentru servicii noi</li>
            </ul>
          </div>

          <p>Puteți accesa contul dumneavoastră oricând de pe site-ul nostru. Prima programare vă așteaptă!</p>

          <p>Echipa Salon Beauty Arena</p>

          <div class="footer">
            <p>© 2025 Salon Beauty Arena. Toate drepturile rezervate.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateWorkerNotificationHTML(bookingData) {
  const servicesList = bookingData.services.map(service =>
    `<li>${service.name} (${service.duration} min)</li>`
  ).join('');

  const isCancellation = bookingData.cancellationNotice;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${isCancellation ? 'Programare Anulată' : 'Programare Nouă'} - Salon Beauty Arena</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, ${isCancellation ? '#f44336, #d32f2f' : '#4CAF50, #45a049'}); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${isCancellation ? '#f44336' : '#4CAF50'}; }
        .services { margin: 15px 0; }
        .services ul { list-style: none; padding: 0; }
        .services li { padding: 5px 0; border-bottom: 1px solid #eee; }
        .customer-info { background: ${isCancellation ? '#ffebee' : '#e8f5e8'}; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
        .highlight { color: ${isCancellation ? '#f44336' : '#4CAF50'}; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${isCancellation ? '❌ Programare Anulată' : '🔔 Programare Nouă'}!</h1>
          <p>Salon Beauty Arena - Notificare pentru specialiști</p>
        </div>

        <div class="content">
          <p>Bună ziua, <strong>${bookingData.specialistName}</strong>,</p>

          <p>${isCancellation ?
            'O programare din agenda dumneavoastră a fost anulată. Detaliile sunt următoarele:' :
            'Aveți o programare nouă în agenda dumneavoastră. Detaliile sunt următoarele:'}</p>

          <div class="booking-details">
            <h3>📅 Detalii Programare</h3>
            <p><strong>Data:</strong> ${new Date(bookingData.date).toLocaleDateString('ro-RO', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}</p>
            <p><strong>Ora:</strong> ${bookingData.startTime}</p>
            <p><strong>Durată totală:</strong> ${bookingData.duration} minute</p>

            <div class="services">
              <h4>💅 Servicii ${isCancellation ? 'anulate' : 'programate'}:</h4>
              <ul>${servicesList}</ul>
            </div>
          </div>

          <div class="customer-info">
            <h4>👤 Informații client:</h4>
            <p><strong>Nume:</strong> ${bookingData.customerInfo.name}</p>
            <p><strong>Telefon:</strong> ${bookingData.customerInfo.phone}</p>
            <p><strong>Email:</strong> ${bookingData.customerInfo.email}</p>
            ${bookingData.customerInfo.notes ? `<p><strong>Note:</strong> ${bookingData.customerInfo.notes}</p>` : ''}
          </div>

          ${isCancellation ?
            '<p><strong>Important:</strong> Programarea a fost anulată de către client. Slotul orar este acum liber pentru reprogramări.</p>' :
            '<p><strong>Important:</strong> Vă rugăm să confirmați prezența clientului cu cel puțin 15 minute înainte de ora programată.</p>'}

          <p>Puteți vedea toate programările dumneavoastră în calendarul Google sau în contul de pe site-ul nostru.</p>

          <p>${isCancellation ? 'Vă mulțumim pentru înțelegere!' : 'Vă mulțumim pentru profesionalismul dumneavoastră!'}</p>

          <div class="footer">
            <p>© 2025 Salon Beauty Arena. Toate drepturile rezervate.</p>
            <p>Sistem automat de notificări</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { type, data } = JSON.parse(event.body);

    let emailContent = {};
    let subject = '';

    switch (type) {
      case 'booking_confirmation':
        subject = `Confirmare Programare - Salon Beauty Arena`;
        emailContent = {
          to: data.customerInfo.email,
          from: { email: FROM_EMAIL, name: FROM_NAME },
          subject: subject,
          html: generateBookingConfirmationHTML(data)
        };
        break;

      case 'booking_cancellation':
        subject = `Programare Anulată - Salon Beauty Arena`;
        emailContent = {
          to: data.customerInfo.email,
          from: { email: FROM_EMAIL, name: FROM_NAME },
          subject: subject,
          html: generateBookingCancellationHTML(data)
        };
        break;

      case 'order_confirmation':
        subject = `Confirmare Comandă #${data.orderNumber} - Salon Beauty Arena`;
        emailContent = {
          to: data.customerInfo.email,
          from: { email: FROM_EMAIL, name: FROM_NAME },
          subject: subject,
          html: generateOrderConfirmationHTML(data)
        };
        break;

      case 'store_order_notification':
        subject = `Comandă Nouă #${data.orderNumber} - Salon Beauty Arena`;
        emailContent = {
          to: 'contact@salonbeautyarena.ro',
          from: { email: FROM_EMAIL, name: FROM_NAME },
          subject: subject,
          html: generateStoreOrderNotificationHTML(data)
        };
        break;

      case 'welcome':
        subject = `Bine ați venit la Salon Beauty Arena!`;
        emailContent = {
          to: data.email,
          from: { email: FROM_EMAIL, name: FROM_NAME },
          subject: subject,
          html: generateWelcomeEmailHTML(data)
        };
        break;

      case 'worker_notification':
        subject = `Programare Nouă - ${data.specialistName}`;

        // Map specialist IDs to their email addresses
        const workerEmails = {
          'loredana': process.env.CALENDAR_LOREDANA || 'loredanasalonbeautyarena@gmail.com',
          'camelia1': process.env.CALENDAR_CAMELIA1 || 'cameliasalonbeautyarena@gmail.com',
          'dana': process.env.CALENDAR_DANA || 'danasalonbeautyarena@gmail.com',
          'valentina': process.env.CALENDAR_VALENTINA || 'valentinasalonbeautyarena@gmail.com',
          'teo': process.env.CALENDAR_TEO || 'teosalonbeautyarena@gmail.com',
          'camelia2': process.env.CALENDAR_CAMELIA2 || 'camelia2salonbeautyarena@gmail.com',
          'geo': process.env.CALENDAR_GEO || 'geosalonbeautyarena@gmail.com',
          'mihaela': process.env.CALENDAR_MIHAELA || 'mihaelasalonbeautyarena@gmail.com',
          'disponibil': process.env.CALENDAR_GENERAL || 'general@beautyarena.com'
        };

        const workerEmail = workerEmails[data.specialistId] || 'workers@salonbeautyarena.ro';

        emailContent = {
          to: workerEmail,
          from: { email: FROM_EMAIL, name: FROM_NAME },
          subject: subject,
          html: generateWorkerNotificationHTML(data)
        };
        break;

      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Unknown email type' })
        };
    }

    // Send the email
    await sgMail.send(emailContent);

    console.log(`Email sent successfully: ${type} to ${emailContent.to}`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: 'Email sent successfully'
      })
    };

  } catch (error) {
    console.error('Error sending email:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to send email',
        details: error.message
      })
    };
  }
};