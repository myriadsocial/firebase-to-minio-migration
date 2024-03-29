import * as admin from 'firebase-admin';
import { Client as MinioClient } from 'minio';
import dotenv from 'dotenv';
import { Readable } from 'stream';
import mime from 'mime-types';

dotenv.config();

// Decode the Base64 encoded Firebase service account
const firebaseServiceAccount = JSON.parse(Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64 || '', 'base64').toString('ascii'));

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(firebaseServiceAccount),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const bucket = admin.storage().bucket();

// Initialize MinIO Client
// Assuming you've set your MinIO credentials and endpoint in your environment or have them hard-coded here
const minioClient = new MinioClient({
  endPoint: process.env.MINIO_ENDPOINT as string, // Place your MinIO endpoint here
  port: Number(process.env.MINIO_PORT), // Your MinIO port; change it if different
  accessKey: process.env.MINIO_ACCESS_KEY as string, // Place your access key or load from env
  secretKey: process.env.MINIO_SECRET_KEY as string, // Place your secret key or load from env
  useSSL: false, // Depending on your MinIO setup; adjust accordingly
});

const minioBucketName = process.env.MINIO_BUCKET_NAME as string; // Your MinIO bucket name

async function uploadStreamToMinio(fileKey: string, stream: Readable) {
  // Use the detected MIME type; default to 'binary/octet-stream' if not detected
  const contentType = mime.lookup(fileKey) || 'binary/octet-stream';

  // Set the metadata, including Content-Type
  const metaData = {
    'Content-Type': contentType,
  };

  return minioClient.putObject(minioBucketName, fileKey, stream, metaData);
}

async function migrateObjects() {
  const [files] = await bucket.getFiles();
  console.log(`Found ${files.length} files to migrate.`);

  for (const file of files) {
    const fileStream = file.createReadStream();
    const fileKey = file.name;
    console.log(`Migrating ${fileKey} to MinIO...`);

    try {
      await uploadStreamToMinio(fileKey, fileStream);
      console.log(`${fileKey} migrated successfully.`);
    } catch (error) {
      console.error(`Error migrating ${fileKey}:`, error);
    }
  }
}

migrateObjects().then(() => console.log('Migration completed.')).catch(console.error);
