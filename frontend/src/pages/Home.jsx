import { useEffect, useState } from 'react';
import { getEvents } from '../api/api';

export default function Home() {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		getEvents().then(setEvents);
	}, []);

	return (
		<div>
			<h1 className='mb-4'>🎉 Events</h1>

			<div className='row'>
				{events.map((e) => (
					<div className='col-md-4 mb-4' key={e.eventId}>
						<div className='card h-100'>
							<img src={e.imageUrl} className='card-img-top' alt={e.name} />
							<div className='card-body'>
								<h5 className='card-title'>{e.name}</h5>
								<p className='card-text'>{e.description}</p>
								<a href={`/events/${e.eventId}`} className='btn btn-primary'>
									View
								</a>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
