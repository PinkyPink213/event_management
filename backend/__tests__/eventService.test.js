const { createEvent, registerEvent } = require('../src/services/eventService');

jest.mock('../src/repositories/eventRepository', () => ({
	createEvent: jest.fn(),
	getEventById: jest.fn(),
	registerUser: jest.fn(),
	isAlreadyRegistered: jest.fn(),
	incrementCount: jest.fn(),
}));

const repo = require('../src/repositories/eventRepository');

describe('Event Service', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	// ---------- createEvent ----------
	test('createEvent success', async () => {
		const mockEvent = { name: 'Test Event', capacity: 10 };
		repo.createEvent.mockResolvedValue({ ...mockEvent, id: '1' });

		const result = await createEvent(mockEvent);

		expect(result.name).toBe('Test Event');
		expect(repo.createEvent).toHaveBeenCalledWith(mockEvent);
	});

	test('createEvent throws error', async () => {
		repo.createEvent.mockRejectedValue(new Error('Missing name or capacity'));

		await expect(createEvent({ name: 'Fail' })).rejects.toThrow(
			'Missing name or capacity'
		);
	});

	// ---------- registerEvent ----------
	test('registerEvent fail if event not found', async () => {
		repo.getEventById.mockResolvedValue(null);

		await expect(registerEvent('1', 'test@mail.com')).rejects.toThrow(
			'Event not found'
		);
	});

	test('registerEvent fail if event is full', async () => {
		repo.getEventById.mockResolvedValue({
			eventId: '1',
			capacity: 1,
			registeredCount: 1,
		});

		await expect(registerEvent('1', 'test@mail.com')).rejects.toThrow(
			'Event is full'
		);
	});

	test('registerEvent fail if already registered', async () => {
		repo.getEventById.mockResolvedValue({
			eventId: '1',
			capacity: 10,
			registeredCount: 5,
		});

		repo.isAlreadyRegistered.mockResolvedValue(true);

		await expect(registerEvent('1', 'test@mail.com')).rejects.toThrow(
			'Already registered'
		);
	});

	test('registerEvent is register successfully', async () => {
		repo.getEventById.mockResolvedValue({
			eventId: '1',
			capacity: 10,
			registeredCount: 5,
		});

		repo.isAlreadyRegistered.mockResolvedValue(false);
		repo.registerUser.mockResolvedValue();
		repo.incrementCount.mockResolvedValue();

		const result = await registerEvent('1', 'test@mail.com');

		expect(result.message).toBe('Registered successfully');
		expect(repo.registerUser).toHaveBeenCalled();
		expect(repo.incrementCount).toHaveBeenCalled();
	});

	test('registerUser fail when increment count fails', async () => {
		repo.getEventById.mockResolvedValue({
			eventId: '1',
			capacity: 10,
			registeredCount: 5,
		});

		repo.isAlreadyRegistered.mockResolvedValue(false);
		repo.registerUser.mockResolvedValue();
		repo.incrementCount.mockRejectedValue(new Error('Update failed'));

		await expect(registerEvent('1', 'test@mail.com')).rejects.toThrow(
			'Update failed'
		);
	});

	test('getEventById returns event data', async () => {
		repo.getEventById.mockResolvedValue({
			eventId: '1',
			capacity: 10,
			registeredCount: 5,
		});

		const result = await repo.getEventById('1');

		expect(result.capacity).toBe(10);
	});
});
