import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEvent } from '../api/api';

export default function EventDetail() {
	const { id } = useParams();
	const [event, setEvent] = useState(null);

	useEffect(() => {
		getEvent(id).then(setEvent);
	}, [id]);

	if (!event) return <p>Loading...</p>;

	return (
		<div>
			<h1>{event.name}</h1>
			<img src={event.imageUrl} width='300' />
			<p>{event.description}</p>
		</div>
	);
}
