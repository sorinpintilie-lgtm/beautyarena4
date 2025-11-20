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

  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { date, specialistId } = event.queryStringParameters;

    if (!date || !specialistId) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing date or specialistId parameter' }),
      };
    }

    // Initialize Google Calendar API
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // Get calendar ID for specialist
    const calendarId = getCalendarIdForSpecialist(specialistId);

    // Set time range for the selected date (check from 9 AM to 8 PM)
    const startTime = new Date(`${date}T09:00:00+02:00`);
    const endTime = new Date(`${date}T20:00:00+02:00`);

    // Use freebusy API for efficient availability checking
    const freebusyResponse = await calendar.freebusy.query({
      requestBody: {
        timeMin: startTime.toISOString(),
        timeMax: endTime.toISOString(),
        items: [{ id: calendarId }],
      },
    });

    // Extract busy periods
    const busyPeriods = freebusyResponse.data.calendars[calendarId]?.busy || [];

    // Convert busy periods to booked slots
    const bookedSlots = busyPeriods.map(period => ({
      start: period.start,
      end: period.end,
    }));

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        available: true,
        bookedSlots,
        date,
        specialistId
      }),
    };

  } catch (error) {
    console.error('Error checking availability:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to check availability',
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