const API_BASE =
	'https://lkm56raap2.execute-api.ap-southeast-1.amazonaws.com/prod';

export async function getEvents() {
	const res = await fetch(`${API_BASE}/events`);
	return res.json();
}

export async function getEvent(id) {
	const res = await fetch(`${API_BASE}/events/${id}`);
	return res.json();
}

export async function createEvent(data) {
	const res = await fetch(`${API_BASE}/events`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});
	return res.json();
}

export async function deleteEvent(id) {
	alert(`Deleting event with ID: ${API_BASE}/events/${id}`);

	const res = await fetch(`${API_BASE}/events/${id}`, {
		method: 'DELETE',
	});

	if (!res.ok) {
		throw new Error('Failed to delete event');
	}

	return res.json();
}
