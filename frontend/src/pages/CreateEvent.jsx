import { useState, useRef } from 'react';
import { createEvent, getUploadUrl } from '../api/api';

export default function CreateEvent() {
	const [name, setName] = useState('');
	const [desc, setDesc] = useState('');
	const [file, setFile] = useState(null);
	const [progress, setProgress] = useState(0);
	const [uploading, setUploading] = useState(false);

	const fileInputRef = useRef(null);

	const handleUpload = async () => {
		if (!file) return alert('Please select a file');
		if (!name.trim()) return alert('Event name required');

		try {
			setUploading(true);

			// 1️⃣ get presigned url
			const { uploadUrl } = await getUploadUrl(file.name);

			// 2️⃣ upload to S3 with progress
			await uploadWithProgress(uploadUrl, file);

			// 3️⃣ save event
			await createEvent({
				name,
				description: desc,
				imageUrl: uploadUrl.split('?')[0],
			});

			alert('Upload success!');
			resetForm();
		} catch (err) {
			console.error(err);
			alert('Upload failed');
		} finally {
			setUploading(false);
		}
	};

	const resetForm = () => {
		setFile(null);
		setProgress(0);
		fileInputRef.current.value = '';
	};

	return (
		<div className='container'>
			<h2>Create Event</h2>

			<input
				type='text'
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

			<input
				type='file'
				className='form-control mb-2'
				ref={fileInputRef}
				onChange={(e) => setFile(e.target.files[0])}
				accept='image/*'
			/>

			{file && (
				<div className='mb-2'>
					<small>{file.name}</small>
				</div>
			)}

			{uploading && (
				<div className='progress mb-2'>
					<div
						className='progress-bar progress-bar-striped progress-bar-animated'
						style={{ width: `${progress}%` }}
					>
						{progress}%
					</div>
				</div>
			)}

			<button
				className='btn btn-primary'
				disabled={uploading}
				onClick={handleUpload}
			>
				{uploading ? 'Uploading...' : 'Create Event'}
			</button>
		</div>
	);
}
