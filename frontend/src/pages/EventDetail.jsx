import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getEvent } from '../api/api';
import { useNavigate } from 'react-router-dom';
export default function EventDetail() {
	const { id } = useParams();
	const [event, setEvent] = useState(null);
	const navigate = useNavigate();
	useEffect(() => {
		getEvent(id).then(setEvent);
	}, [id]);

	if (!event) return <p className='text-center mt-10'>Loading...</p>;

	return (
		<div>
			{/* Title */}
			<h1 className='text-2xl font-semibold mb-4 text-gray-800 text-center'>
				{event.name}
			</h1>
			<div className='bg-white w-full max-w-4xl rounded-xl shadow-md overflow-hidden p-6'>
				{/* Content */}
				<div className='d-flex align-items-center flex-wrap '>
					{/* Image */}
					<img
						src={event.imageUrl}
						alt={event.name}
						className='col-lg-4 col-12 h-100'
					/>

					{/* Details */}
					<div className='text-box p-4 col-lg-8 col-12'>
						<p className='text-gray-600 leading-relaxed mb-4'>
							{event.description}
						</p>
						<div className='d-flex flex-wrap'>
							<p className='font-medium'>Capacity:</p> {event.capacity ?? 'N/A'}
						</div>
					</div>
				</div>
			</div>
			<button
				type='button'
				className='btn btn-secondary mb-3 w-100 mt-3'
				onClick={() => navigate('/')}
			>
				← Back to Home
			</button>
		</div>
	);
}
