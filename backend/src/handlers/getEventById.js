const { getEvent } = require('../services/eventService');
const { response } = require('../utils/response');

exports.handler = async (event) => {
	try {
		const eventId = event.pathParameters.id;
		const result = await getEvent(eventId);
		return response(200, result);
	} catch (err) {
		return response(404, { error: err.message });
	}
};
