import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const getS3Client = () => {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

  if (!accountId || !accessKeyId || !secretAccessKey) {
    throw new Error('R2 credentials not found in environment variables');
  }

  return new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });
};

export const uploadImage = async (key: string, body: Buffer | Uint8Array | Blob | string, contentType: string) => {
  const client = getS3Client();
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME || 'ecommerce-bucket',
    Key: key,
    Body: body,
    ContentType: contentType,
  });

  await client.send(command);
  return key;
};

export const getImageUrl = async (key: string, expiresIn = 3600) => {
  const client = getS3Client();
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME || 'ecommerce-bucket',
    Key: key,
  });

  return await getSignedUrl(client, command, { expiresIn });
};
