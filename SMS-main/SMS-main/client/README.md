# School Management System - Frontend

This is the frontend React application for the School Management System.

## Features

- User authentication (login/register)
- Dashboard for different user roles (Admin, Teacher, Student, Parent)
- Student management interface
- Course management interface
- Attendance tracking system
- Grade management system
- Responsive design for all devices

## Technology Stack

- React.js - Frontend library
- Material-UI - UI component library
- Redux - State management
- Axios - API requests
- React Router - Navigation

## Installation

1. Make sure you have Node.js installed
2. Navigate to the client directory
3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file with the following content:

```
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

To start the development server:

```bash
npm start
```

The application will be available at http://localhost:3000

## Building for Production

To create a production build:

```bash
npm run build
```

The build files will be created in the `build` directory, which can be deployed to any static hosting service.

## Connecting to Backend

This frontend application is designed to work with the School Management System backend API. Make sure the backend server is running before using this application.

## Deployment

For deployment to a live server:

1. Build the React application
2. Deploy the build folder to your web server
3. Configure your web server to serve the static files
4. Ensure the backend API is accessible from your deployment environment