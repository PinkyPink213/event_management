const { listEvents } = require('../services/eventService');
const { response } = require('../utils/response');

exports.handler = async () => {
	try {
		const events = await listEvents();
		return response(200, events);
	} catch (err) {
		return response(500, { error: err.message });
	}
};
