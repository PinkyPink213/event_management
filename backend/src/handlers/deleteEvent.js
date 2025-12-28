const {
	deleteEvent,
	deleteEventRegistrations,
} = require('./services/eventService');

exports.handler = async (event) => {
	if (event.requestContext?.http?.method === 'OPTIONS') {
		return preflight();
	}
	try {
		const eventId = event.pathParameters?.id;
		if (!eventId) {
			return {
				statusCode: 400,
				body: JSON.stringify({ error: 'Missing event ID' }),
			};
		}

		await deleteEventRegistrations(eventId);
		await deleteEvent(eventId);

		return {
			statusCode: 200,
			body: JSON.stringify({ message: 'Event deleted successfully' }),
		};
	} catch (err) {
		console.error(err);
		return {
			statusCode: 500,
			body: JSON.stringify({ error: err.message }),
		};
	}
};
