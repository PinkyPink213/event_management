const corsHeaders = {
	'Access-Control-Allow-Origin': '*',
	'Access-Control-Allow-Headers': 'Content-Type',
	'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
};

const response = (statusCode, body = {}) => ({
	statusCode,
	headers: corsHeaders,
	body: JSON.stringify(body),
});

const preflight = () => ({
	statusCode: 200,
	headers: corsHeaders,
	body: '',
});

module.exports = { response, preflight };
