# Firebase-to-MinIO Migration Tool

This project provides a script for migrating images from Firebase Storage to a MinIO storage instance. It's built with Node.js and TypeScript, offering a straightforward way to transfer files without modifying them.

## Features

- Direct transfer of images from Firebase Storage to MinIO.
- Utilizes environment variables for secure configuration.
- Easy to set up and run with minimal dependencies.

## Prerequisites

Before you start, ensure you have the following installed:
- Node.js (v12.x or later)
- npm (comes with Node.js)

## Setup Instructions

1. **Clone the repository:**

   If you have a Git repository for this project, clone it. Otherwise, ensure you have the project files in your working directory.

2. **Install dependencies:**

   Navigate to your project directory and run:
   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the root of your project directory. Add the following environment variables with your specific values:

   ```
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_SERVICE_ACCOUNT_BASE64=your_base64_encoded_service_account
   FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket_url

   MINIO_ENDPOINT=your_minio_endpoint
   MINIO_PORT=your_minio_port
   MINIO_ACCESS_KEY=your_minio_access_key
   MINIO_SECRET_KEY=your_minio_secret_key
   MINIO_BUCKET_NAME=your_minio_bucket_name
   MINIO_USE_SSL=true_or_false
   ```

   For `FIREBASE_SERVICE_ACCOUNT_BASE64`, encode your Firebase service account JSON file to a Base64 string and paste it here.

4. **Transpile TypeScript to JavaScript:**

   Run the TypeScript compiler to transpile the `.ts` files into `.js` files in the `dist` directory:
   ```bash
   npx tsc
   ```

5. **Run the migration script:**

   With the setup complete, start the migration process by running:
   ```bash
   npx ts-node --transpile-only src/migrate.ts
   ```

## How It Works

The script authenticates with Firebase using the provided service account details, lists all files in the specified Firebase Storage bucket, and transfers them to the configured MinIO bucket. It does not modify the files in any way.

## Security Considerations

Ensure that your `.env` file is never committed to your version control system. This file contains sensitive credentials that should not be made public.

## Troubleshooting

- **Authentication Errors:** Double-check your Firebase and MinIO credentials in the `.env` file.
- **Network Issues:** Ensure there are no network connectivity issues between your machine and both Firebase and MinIO services.
- **SSL/TLS Errors:** If you encounter SSL/TLS-related errors, verify the `MINIO_USE_SSL` configuration and ensure your MinIO instance's SSL setup is correct.

For more help, refer to the error logs generated by the script, which can provide insights into what went wrong.

## Contributing

Contributions are welcome! If you have suggestions for improving this utility, feel free to submit a pull request or open an issue. When contributing, please keep in mind that this project was initially generated using ChatGPT. While the project aims to be fully functional and well-documented, there may be areas that benefit from human insight and refinement.

## Disclaimer

This project was conceptualized and its initial codebase generated using ChatGPT, a powerful AI language model developed by OpenAI. The tool is designed to facilitate the migration of images from Firebase Storage to MinIO, simplifying the process of transferring data between these services. While efforts have been made to ensure the utility is functional and the documentation accurate, users and contributors are encouraged to review the code and documentation thoroughly. There may be opportunities for optimization, additional features, or corrections that could enhance the utility further.

It's important to approach the deployment and use of this tool with an understanding of its origins and limitations. Any modifications, enhancements, or operational decisions made based on this project are the sole responsibility of the users and contributors.

## License

This project is released under the [MIT License](LICENSE). By using or contributing to this project, you acknowledge and agree that the project was generated by ChatGPT and that the responsibility for any modifications or usage of the project lies with the individuals choosing to use or modify it.