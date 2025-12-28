import { useState } from 'react';
import { createEvent, getUploadUrl } from '../api/api';

export default function CreateEvent() {
	const [name, setName] = useState('');
	const [desc, setDesc] = useState('');
	const [file, setFile] = useState(null);

	const submit = async () => {
		const { uploadUrl } = await getUploadUrl(file.name);

		await fetch(uploadUrl, {
			method: 'PUT',
			body: file,
			headers: { 'Content-Type': file.type },
		});

		await createEvent({
			name,
			description: desc,
			imageUrl: uploadUrl.split('?')[0],
		});

		alert('Event created!');
	};

	return (
		<div className='container'>
			<h2>Create Event</h2>

			<input
				className='form-control mb-2'
				placeholder='Event name'
				onChange={(e) => setName(e.target.value)}
			/>

			<textarea
				className='form-control mb-2'
				placeholder='Description'
				onChange={(e) => setDesc(e.target.value)}
			/>

			<input
				type='file'
				className='form-control mb-3'
				onChange={(e) => setFile(e.target.files[0])}
			/>

			<button className='btn btn-primary' onClick={submit}>
				Create Event
			</button>
		</div>
	);
}
