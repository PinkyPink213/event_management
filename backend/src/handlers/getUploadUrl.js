const { getUploadUrl } = require('../services/S3Service');

exports.handler = async (event) => {
	const { fileName } = JSON.parse(event.body);
	const uploadUrl = await getUploadUrl(fileName);

	return {
		statusCode: 200,
		body: JSON.stringify({ uploadUrl }),
	};
};
