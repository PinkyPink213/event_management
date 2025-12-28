const dynamoDB = require('../config/dynamoClient');
const { v4: uuidv4 } = require('uuid');

const TABLE_NAME = 'Events';
const REG_TABLE = 'EventRegistrations';
async function createEvent(data) {
	const item = {
		eventId: uuidv4(),
		name: data.name,
		description: data.description || '', //
		capacity: data.capacity,
		registeredCount: 0,
		createdAt: new Date().toISOString(),
	};

	await dynamoDB
		.put({
			TableName: TABLE_NAME,
			Item: item,
		})
		.promise();

	return item;
}

async function getEventById(eventId) {
	const result = await dynamoDB
		.get({
			TableName: TABLE_NAME,
			Key: { eventId },
		})
		.promise();

	return result.Item;
}

async function listEvents() {
	const result = await dynamoDB.scan({ TableName: TABLE_NAME }).promise();
	return result.Items;
}

async function isAlreadyRegistered(eventId, email) {
	const result = await dynamoDB
		.get({
			TableName: REG_TABLE,
			Key: { eventId, email },
		})
		.promise();

	return !!result.Item;
}

async function registerUser(eventId, email) {
	const item = {
		eventId,
		email,
		registeredAt: new Date().toISOString(),
	};

	await dynamoDB
		.put({
			TableName: REG_TABLE,
			Item: item,
		})
		.promise();
}

async function incrementCount(eventId) {
	await dynamoDB
		.update({
			TableName: TABLE_NAME,
			Key: { eventId },
			UpdateExpression: 'SET registeredCount = registeredCount + :one',
			ExpressionAttributeValues: {
				':one': 1,
			},
		})
		.promise();
}

module.exports = {
	createEvent,
	getEventById,
	listEvents,
	isAlreadyRegistered,
	registerUser,
	incrementCount,
};
