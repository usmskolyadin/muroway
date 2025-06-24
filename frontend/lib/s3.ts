import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  endpoint: 'https://s3.twcstorage.ru',
  region: 'ru-1',
  credentials: {
    accessKeyId: '1BHCSNF6YNK4TLN0F6GK',
    secretAccessKey: 'kZAvcDDpH3GoDDBGvNRZHW3CNPbK8xU6mwf8joSa'
  },
  forcePathStyle: true 
});

const BUCKET_NAME = '714e50aa-8d8643a0-1bd4-46a8-a088-e77845dd8cbb';

export async function uploadToS3(file: File): Promise<string> {
  const fileKey = `uploads/${Date.now()}-${file.name}`;
  
  const params = {
    Bucket: BUCKET_NAME,
    Key: fileKey,
    Body: Buffer.from(await file.arrayBuffer()),
    ContentType: file.type
  };

  await s3Client.send(new PutObjectCommand(params));

  return `https://${BUCKET_NAME}.s3.twcstorage.ru/${fileKey}`;
}