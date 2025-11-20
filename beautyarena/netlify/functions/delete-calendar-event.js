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
    const { eventId, specialistId } = JSON.parse(event.body);

    if (!eventId || !specialistId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing eventId or specialistId' }),
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
    const calendarId = getCalendarIdForSpecialist(specialistId);

    // Delete the event
    await calendar.events.delete({
      calendarId,
      eventId,
    });

    console.log(`Successfully deleted calendar event: ${eventId} from calendar: ${calendarId}`);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Calendar event deleted successfully'
      }),
    };

  } catch (error) {
    console.error('Error deleting calendar event:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to delete calendar event',
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