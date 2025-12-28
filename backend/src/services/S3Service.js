const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const s3 = new S3Client({ region: 'ap-southeast-1' });

async function getUploadUrl(fileName) {
	const command = new PutObjectCommand({
		Bucket: process.env.BUCKET_NAME,
		Key: `events/${fileName}`,
		ContentType: 'image/jpeg',
	});

	return await getSignedUrl(s3, command, { expiresIn: 60 });
}

module.exports = { getUploadUrl };
