import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEvents, deleteEvent } from '../api/api';

export default function Home() {
	const [events, setEvents] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const loadData = async () => {
			const res = await getEvents();
			setEvents(res);
		};

		loadData();
	}, []);

	const handleDelete = async (id) => {
		const confirm = window.confirm(
			'Are you sure you want to delete this event?'
		);
		if (!confirm) return;

		try {
			await deleteEvent(id);
			// setEvents((prev) => prev.filter((e) => e.eventId !== id));
		} catch (err) {
			alert('Failed to delete event');
		}
	};

	return (
		<div className='container'>
			<div className='d-flex justify-content-between align-items-center mb-4'>
				<h1>🎉 Events</h1>
				<button className='btn btn-success' onClick={() => navigate('/create')}>
					+ Create Event
				</button>
			</div>

			<div className='row'>
				{events.length === 0 && (
					<p className='text-muted'>No events available</p>
				)}

				{events.map((event) => (
					<div className='col-md-4 mb-4' key={event.eventId}>
						<div className='card h-100'>
							<img
								src={event.imageUrl}
								className='card-img-top'
								alt={event.name}
								style={{ height: '200px', objectFit: 'cover' }}
							/>

							<div className='card-body d-flex flex-column'>
								<h5 className='card-title'>{event.name}</h5>
								<p className='card-text'>{event.description}</p>

								<div className='mt-auto d-flex justify-content-between'>
									<a
										href={`/events/${event.eventId}`}
										className='btn btn-outline-primary btn-sm'
									>
										View
									</a>
									<button
										className='btn btn-outline-danger btn-sm'
										onClick={() => handleDelete(event.eventId)}
									>
										Delete
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
