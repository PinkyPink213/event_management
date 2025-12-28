const { getUploadUrl } = require('../services/S3Service');

exports.handler = async (event) => {
	if (event.httpMethod === 'OPTIONS') {
		return preflight();
	}
	const { fileName } = JSON.parse(event.body);
	console.log('FILE NAME:', fileName);
	const uploadUrl = await getUploadUrl(fileName);

	return {
		statusCode: 200,
		body: JSON.stringify({ uploadUrl }),
	};
};
