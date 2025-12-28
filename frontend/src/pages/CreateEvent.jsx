import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../api/api';

export default function CreateEvent() {
	const [name, setName] = useState('');
	const [desc, setDesc] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [capacity, setCapacity] = useState('');
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!name.trim()) return alert('Event name is required');
		if (!desc.trim()) return alert('Description is required');
		if (!imageUrl.trim()) return alert('Image URL is required');
		if (!capacity || Number(capacity) <= 0)
			return alert('Capacity must be greater than 0');

		try {
			setLoading(true);

			await createEvent({
				name,
				description: desc,
				imageUrl,
				capacity: Number(capacity),
			});

			alert('Event created successfully!');
			navigate('/');
		} catch (err) {
			console.error(err);
			alert('Failed to create event');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='container' style={{ maxWidth: 500 }}>
			<h2 className='mb-3'>Create Event</h2>

			<form onSubmit={handleSubmit}>
				{/* Event Name */}
				<label className='form-label'>
					Event Name <span style={{ color: 'red' }}>*</span>
				</label>
				<input
					type='text'
					className='form-control mb-3'
					value={name}
					required
					onChange={(e) => setName(e.target.value)}
				/>

				{/* Description */}
				<label className='form-label'>
					Description <span style={{ color: 'red' }}>*</span>
				</label>
				<textarea
					className='form-control mb-3'
					value={desc}
					required
					onChange={(e) => setDesc(e.target.value)}
				/>

				{/* Image URL */}
				<label className='form-label'>
					Image URL <span style={{ color: 'red' }}>*</span>
				</label>
				<input
					type='url'
					className='form-control mb-3'
					placeholder='https://example.com/image.jpg'
					value={imageUrl}
					required
					onChange={(e) => setImageUrl(e.target.value)}
				/>

				{/* Capacity */}
				<label className='form-label'>
					Capacity <span style={{ color: 'red' }}>*</span>
				</label>
				<input
					type='number'
					className='form-control mb-4'
					min='1'
					value={capacity}
					required
					onChange={(e) => setCapacity(e.target.value)}
				/>

				<button
					type='submit'
					className='btn btn-primary w-100'
					disabled={loading}
				>
					{loading ? 'Creating...' : 'Create Event'}
				</button>
			</form>
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
