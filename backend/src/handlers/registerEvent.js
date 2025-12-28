const { registerEvent } = require('../services/eventService');
const { response } = require('../utils/response');

exports.handler = async (event) => {
	if (event.requestContext?.http?.method === 'OPTIONS') {
		return preflight();
	}
	try {
		const { id } = event.pathParameters;
		const body = JSON.parse(event.body);

		const result = await registerEvent(id, body.email);
		return response(200, result);
	} catch (err) {
		return response(400, { error: err.message });
	}
};
