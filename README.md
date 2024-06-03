# Invoice Generator App

This is a web application for generating invoices. It consists of both frontend and backend components.

## Features

- User authentication: Register and login functionality with authentication using JWT tokens.
- Invoice generation: Create invoices by adding products with their quantities and rates.
- PDF generation: Generate downloadable PDF invoices with the details entered.
- Responsive design: User-friendly interface optimized for both desktop and mobile devices.

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js (https://nodejs.org)
- npm (Node Package Manager, usually comes with Node.js)
- MongoDB Atlas account (https://www.mongodb.com/cloud/atlas) for database storage

## Installation

1. Clone this repository to your local machine:

2 .Navigate to the `backend` directory and install dependencies: cd backend
npm install

3. Set up MongoDB Atlas:

   - Create a MongoDB Atlas account and set up a cluster.
   - Whitelist your IP address in MongoDB Atlas.
   - Create a new database named `invoice_app`.
   - Create a new collection named `users` to store user data.

4. Create a `.env` file in the `backend` directory and add the following environment variables:

PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret 

Replace `your_mongodb_uri` with your MongoDB connection string and `your_jwt_secret` with a secret key for JWT token generation.

5. Start the backend server:

npm start 

6. Open another terminal window, navigate to the `frontend` directory, and install frontend dependencies:

cd ../frontend
7. Navigate to the `invoice_generator` directory:

cd invoice_generator

8. Install frontend dependencies:

npm install

9. Start the frontend development server:

npm run dev 

## Usage

Once the backend and frontend servers are running, you can access the Invoice Generator app by opening a web browser and navigating to http://localhost:3000/.

## Contributing

If you'd like to contribute to this project, please fork the repository, make your changes, and submit a pull request. We welcome contributions from the community!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
