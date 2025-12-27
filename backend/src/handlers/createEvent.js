const { createEvent } = require('../services/eventService');
const { response } = require('../utils/response');

exports.handler = async (event) => {
	try {
		// console.log('RAW EVENT:', JSON.stringify(event));
		let body = {};

		// Handles all cases safely
		if (typeof event === 'string') {
			body = JSON.parse(event);
		} else if (event?.body) {
			body =
				typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
		} else {
			body = event;
		}
		// console.log('BODY EVENT:', body);
		const result = await createEvent(body);
		return response(201, result);
	} catch (err) {
		return response(400, { error: err.message });
	}
};
