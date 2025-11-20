const { google } = require('googleapis');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const bookingData = JSON.parse(event.body);
    const { service, specialist, date, time, name, phone, email, notes } = bookingData;

    if (!service || !specialist || !date || !time || !name || !phone || !email) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required booking data' }),
      };
    }

    // Initialize Google Calendar API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/calendar.events'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // Get calendar ID for specialist
    const calendarId = getCalendarIdForSpecialist(specialist.id);

    // Calculate start and end times
    const startTime = new Date(`${date}T${time}:00+02:00`);
    const duration = parseInt(service.duration); // Extract minutes from "90 min"
    const endTime = new Date(startTime.getTime() + duration * 60000);

    // Create event object
    const eventDetails = {
      summary: `${service.name} - ${name}`,
      description: `Serviciu: ${service.name}
Specialist: ${specialist.name}
Client: ${name}
Telefon: ${phone}
Email: ${email}
${notes ? `Observații: ${notes}` : ''}`,
      start: {
        dateTime: startTime.toISOString(),
        timeZone: 'Europe/Bucharest',
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: 'Europe/Bucharest',
      },
      reminders: {
        useDefault: true,
      },
    };

    // Create the event
    const response = await calendar.events.insert({
      calendarId,
      resource: eventDetails,
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        eventId: response.data.id,
        eventLink: response.data.htmlLink,
        bookingData: {
          service: service.name,
          specialist: specialist.name,
          date,
          time,
          duration: service.duration,
          name,
          phone,
          email
        }
      }),
    };

  } catch (error) {
    console.error('Error creating booking:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to create booking',
        details: error.message
      }),
    };
  }
};

function getCalendarIdForSpecialist(specialistId) {
  // Map specialist IDs to calendar IDs (Gmail addresses)
  const calendarMap = {
    'loredana': process.env.CALENDAR_LOREDANA,
    'camelia1': process.env.CALENDAR_CAMELIA1,
    'dana': process.env.CALENDAR_DANA,
    'valentina': process.env.CALENDAR_VALENTINA,
    'teo': process.env.CALENDAR_TEO,
    'camelia2': process.env.CALENDAR_CAMELIA2,
    'geo': process.env.CALENDAR_GEO,
    'mihaela': process.env.CALENDAR_MIHAELA,
    'disponibil': process.env.CALENDAR_GENERAL
  };

  const calendarId = calendarMap[specialistId];
  if (!calendarId) {
    throw new Error(`No calendar ID found for specialist: ${specialistId}`);
  }
  return calendarId;
}