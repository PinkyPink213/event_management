const {
	createEvent,
	getEvent,
	listEvents,
	registerEvent,
	deleteEvent,
} = require('./src/services/eventService');
const { getUploadUrl } = require('./src/services/S3Service');

exports.handler = async (event) => {
	const method = event.requestContext.http.method;
	const body = event.body ? JSON.parse(event.body) : {};
	console.log('Current Method: ', method);
	console.log('Current Body: ', body);
	try {
		const { routeKey, pathParameters, body } = event;
		console.log('Route Key: ', routeKey);
		switch (routeKey) {
			case 'POST /upload-url': {
				const { fileName } = body;
				console.log('Current File name: ', fileName);
				const uploadUrl = await getUploadUrl(fileName);

				return {
					statusCode: 200,
					body: JSON.stringify({ uploadUrl }),
				};
			}

			case 'POST /events':
				return {
					statusCode: 201,
					body: JSON.stringify(await createEvent(JSON.parse(body))),
				};

			case 'GET /events':
				return {
					statusCode: 200,
					body: JSON.stringify(await listEvents()),
				};

			case 'GET /events/{id}':
				return {
					statusCode: 200,
					body: JSON.stringify(await getEvent(pathParameters.id)),
				};

			case 'POST /events/{id}/register':
				return {
					statusCode: 200,
					body: JSON.stringify(
						await registerEvent(pathParameters.id, JSON.parse(body).email)
					),
				};

			case 'DELETE /events/{id}':
				await deleteEvent(pathParameters.id);
				return {
					statusCode: 200,
					body: JSON.stringify({ message: 'Event deleted successfully' }),
				};

			default:
				return {
					statusCode: 404,
					body: JSON.stringify({ message: 'Route not found' }),
				};
		}
	} catch (err) {
		console.error(err);

		return {
			statusCode: 500,
			body: JSON.stringify({ error: err.message }),
		};
	}
};
