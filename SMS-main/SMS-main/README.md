# School Management System - Standalone Version

## Overview
This is a standalone version of the School Management System that runs entirely on your local machine without requiring any external API or database. All data is stored in your browser's local storage.

## Features
- Student Management
- Teacher Management
- Course Management
- Enrollment Management
- Attendance Tracking

## How to Run the Application

### Simple Method (Recommended)
1. Double-click the `start_school_management_system.bat` file
2. The batch file will:
   - Display login credentials
   - Check if Node.js is installed
   - Install dependencies if needed
   - Start the application in your default browser

### Manual Method
1. Make sure you have Node.js installed
2. Open a command prompt in the `client` directory
3. Run `npm install` to install dependencies
4. Run `npm start` to start the application

## Login Credentials
- **Email:** admin@example.com
- **Password:** password123

## Data Persistence
All data is stored in your browser's local storage. This means:
- Data will persist between sessions as long as you use the same browser
- Clearing your browser cache will reset the application data
- The application works completely offline

## Sharing the Application
To share this application with someone else:
1. Copy the entire folder
2. Share it with the recipient
3. Instruct them to run the `start_school_management_system.bat` file

## Requirements
- Node.js (v12 or higher)
- A modern web browser (Chrome, Firefox, Edge, etc.)
- Windows operating system (for the batch file)

## Troubleshooting
- If the batch file doesn't work, try running the commands manually
- If you encounter any issues with Node.js, make sure it's properly installed and in your PATH
- If the application doesn't load, check the console for errors