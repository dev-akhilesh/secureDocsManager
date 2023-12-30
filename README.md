# SecureDocsManager

SecureDocsManager is a web application for managing and securely storing your documents. It provides functionalities such as file upload, download, and deletion with user authentication.

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

4. Create a `.env` file in the backend directory and set the following environment variables:

   ```env
   MONGO_PASSWORD=your-mongodb-connection-string
   SECRET_KEY_PASSPORT=your-secret-key
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


## Deployment

- **Frontend**: The frontend of this Spotify clone is deployed on Vercel. You can access it using the following link: [Frontend](https://securedocsmanager.netlify.app/).

- **Backend**: The backend of this Spotify clone is deployed on Render. You can access it using the following link: [Backend](https://securedocsmanagerbe.onrender.com/).


