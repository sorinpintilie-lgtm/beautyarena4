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
    const { date, workerAssignments, serviceDurations } = JSON.parse(event.body);

    if (!date || !workerAssignments || !serviceDurations) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required parameters' }),
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

    // Get busy periods for all assigned workers
    const workerBusyPeriods = {};
    const uniqueWorkers = [...new Set(Object.values(workerAssignments))];

    for (const workerId of uniqueWorkers) {
      const calendarId = getCalendarIdForSpecialist(workerId);
      const startTime = new Date(`${date}T09:00:00+02:00`);
      const endTime = new Date(`${date}T20:00:00+02:00`);

      const freebusyResponse = await calendar.freebusy.query({
        requestBody: {
          timeMin: startTime.toISOString(),
          timeMax: endTime.toISOString(),
          items: [{ id: calendarId }],
        },
      });

      workerBusyPeriods[workerId] = freebusyResponse.data.calendars[calendarId]?.busy || [];
    }

    // Calculate available time slots
    const timeSlots = [
      '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
      '15:00', '16:00', '17:00', '18:00', '19:00'
    ];

    const availableSlots = timeSlots.filter(slot => {
      const slotTime = new Date(`${date}T${slot}:00+02:00`);

      // Check each worker's availability for their assigned services
      for (const [area, workerId] of Object.entries(workerAssignments)) {
        const duration = serviceDurations[area] || 60;
        const endTime = new Date(slotTime.getTime() + duration * 60000);
        const busyPeriods = workerBusyPeriods[workerId] || [];

        // Check if this worker is busy during the required time
        const isWorkerBusy = busyPeriods.some(busy => {
          const busyStart = new Date(busy.start);
          const busyEnd = new Date(busy.end);
          return (slotTime < busyEnd && endTime > busyStart);
        });

        if (isWorkerBusy) {
          return false; // This slot doesn't work for at least one worker
        }
      }

      return true; // All workers are available
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        available: true,
        availableSlots,
        workerBusyPeriods,
        date
      }),
    };

  } catch (error) {
    console.error('Error checking multi-worker availability:', error);
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