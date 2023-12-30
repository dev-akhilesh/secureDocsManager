# SecureDocsManager

SecureDocsManager is a web application for managing and securely storing your documents. It provides functionalities such as file upload, download, and deletion with user authentication.


## Deployment

- **Frontend**: The frontend of this Spotify clone is deployed on Vercel. You can access it using the following link: [Frontend](https://securedocsmanager.netlify.app/).

- **Backend**: The backend of this Spotify clone is deployed on Render. You can access it using the following link: [Backend](https://securedocsmanagerbe.onrender.com/).



## Features

- **File Upload:** Easily upload your documents securely.
- **File Download:** Download your files using a secure code.
- **File Deletion:** Delete files that you no longer need.
- **User Authentication:** Register and log in to access your files.

## Technologies Used

- **Frontend:** React
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Cloud Storage:** Cloudinary
- **Authentication:** JSON Web Tokens (JWT)

### Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/SecureDocsManager.git
   cd SecureDocsManager
   ```

2. Install server dependencies:

   ```bash
   cd server
   npm install
   ```

3. Install client dependencies:

   ```bash
   cd client
   npm install
   ```

4. Create a .env file in the server directory and add the following:

   ```env
   JWT_SECRET=your_jwt_secret
   MONGODB_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

5. Start the server:

   ```bash
   cd ../server
   npm run server
   ```

6. Start the client:

   ```bash
   cd ../client
   npm run dev
   ```


