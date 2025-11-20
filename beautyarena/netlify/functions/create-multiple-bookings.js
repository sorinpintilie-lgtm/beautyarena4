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
    const { bookings, customerInfo } = JSON.parse(event.body);

    if (!bookings || !Array.isArray(bookings) || bookings.length === 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing or invalid bookings array' }),
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

    // Create all events
    const createdEvents = [];
    const errors = [];

    for (const booking of bookings) {
      try {
        const { services, specialistId, specialistName, date, startTime, duration } = booking;

        // Get calendar ID for specialist
        const calendarId = getCalendarIdForSpecialist(specialistId);

        // Calculate start and end times
        const startDateTime = new Date(`${date}T${startTime}:00+02:00`);
        const endDateTime = new Date(startDateTime.getTime() + duration * 60000);

        // Create event object
        const eventDetails = {
          summary: `${services.map(s => s.name).join(', ')} - ${customerInfo.name}`,
          description: `Servicii: ${services.map(s => s.name).join(', ')}
Specialist: ${specialistName}
Client: ${customerInfo.name}
Telefon: ${customerInfo.phone}
Email: ${customerInfo.email}
${customerInfo.notes ? `Observații: ${customerInfo.notes}` : ''}`,
          start: {
            dateTime: startDateTime.toISOString(),
            timeZone: 'Europe/Bucharest',
          },
          end: {
            dateTime: endDateTime.toISOString(),
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

        createdEvents.push({
          specialistId,
          specialistName,
          eventId: response.data.id,
          eventLink: response.data.htmlLink,
          services: services.map(s => s.name)
        });

      } catch (error) {
        console.error(`Error creating booking for specialist ${booking.specialistId}:`, error);
        errors.push({
          specialistId: booking.specialistId,
          error: error.message
        });
      }
    }

    if (errors.length > 0 && createdEvents.length === 0) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Failed to create any bookings',
          details: errors
        }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        createdEvents,
        errors: errors.length > 0 ? errors : undefined,
        customerInfo
      }),
    };

  } catch (error) {
    console.error('Error creating bookings:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to create bookings',
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