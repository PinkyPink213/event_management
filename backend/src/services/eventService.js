const repo = require('../repositories/eventRepository');

async function createEvent(data) {
	if (!data.name || !data.capacity) {
		throw new Error('Missing name or capacity');
	}

	return await repo.createEvent(data);
}

async function getEvent(id) {
	const event = await repo.getEventById(id);
	if (!event) throw new Error('Event not found');
	return event;
}

async function listEvents() {
	return await repo.listEvents();
}

async function registerEvent(eventId, email) {
	if (!email) throw new Error('Email is required');

	const event = await repo.getEventById(eventId);
	if (!event) throw new Error('Event not found');

	if (event.registeredCount >= event.capacity) {
		throw new Error('Event is full');
	}

	const already = await repo.isAlreadyRegistered(eventId, email);
	if (already) throw new Error('Already registered');

	await repo.registerUser(eventId, email);
	await repo.incrementCount(eventId);

	return { message: 'Registered successfully' };
}
async function deleteEvent(eventId) {
	await dynamoDB
		.delete({
			TableName: 'Events',
			Key: { eventId },
		})
		.promise();
}

async function deleteEventRegistrations(eventId) {
	// ดึง registration ทั้งหมดของ event นี้ก่อน
	const result = await dynamoDB
		.query({
			TableName: 'EventRegistrations',
			KeyConditionExpression: 'eventId = :eventId',
			ExpressionAttributeValues: {
				':eventId': eventId,
			},
		})
		.promise();

	// ลบทีละรายการ
	const deleteRequests = result.Items.map((item) => ({
		DeleteRequest: {
			Key: {
				eventId: item.eventId,
				email: item.email,
			},
		},
	}));

	if (deleteRequests.length === 0) return;

	await dynamoDB
		.batchWrite({
			RequestItems: {
				EventRegistrations: deleteRequests,
			},
		})
		.promise();
}

module.exports = {
	createEvent,
	getEvent,
	listEvents,
	registerEvent,
	deleteEvent,
	deleteEventRegistrations,
};
