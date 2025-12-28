import { useState, useRef } from 'react';
import { createEvent, getUploadUrl } from '../api/api';

export default function CreateEvent() {
	const [name, setName] = useState('');
	const [desc, setDesc] = useState('');
	const [file, setFile] = useState(null);
	const fileInputRef = useRef(null);

	const handleFileChange = (e) => {
		const selected = e.target.files[0];
		if (!selected) return;

		// only allow images
		if (!selected.type.startsWith('image/')) {
			alert('Please select an image file (jpg, png, etc.)');
			e.target.value = '';
			return;
		}

		setFile(selected);
	};

	const removeFile = () => {
		setFile(null);
		fileInputRef.current.value = ''; // reset input
	};

	const submit = async () => {
		if (!file) {
			alert('Please select an image file');
			return;
		}

		if (!name.trim()) {
			alert('Please enter event name');
			return;
		}

		try {
			const { uploadUrl } = await getUploadUrl(file.name);

			await fetch(uploadUrl, {
				method: 'PUT',
				headers: {
					'Content-Type': file.type,
				},
				body: file,
			});

			await createEvent({
				name,
				description: desc,
				imageUrl: uploadUrl.split('?')[0],
			});

			alert('Event created successfully!');
			setFile(null);
			setName('');
			setDesc('');
		} catch (err) {
			console.error(err);
			alert('Upload failed');
		}
	};

	return (
		<div className='container'>
			<h2>Create Event</h2>

			<input
				className='form-control mb-2'
				placeholder='Event name'
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>

			<textarea
				className='form-control mb-2'
				placeholder='Description'
				value={desc}
				onChange={(e) => setDesc(e.target.value)}
			/>

			{/* File input */}
			<input
				type='file'
				accept='image/*'
				ref={fileInputRef}
				className='form-control mb-2'
				onChange={handleFileChange}
			/>

			{/* Preview + remove */}
			{file && (
				<div className='mb-3'>
					<p>
						Selected file: <strong>{file.name}</strong>
					</p>
					<button
						className='btn btn-sm btn-outline-danger'
						onClick={removeFile}
					>
						Remove file ✖
					</button>
				</div>
			)}

			<button className='btn btn-primary' onClick={submit}>
				Create Event
			</button>
		</div>
	);
}
