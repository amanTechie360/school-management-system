@echo off
echo.
echo ===================================================
echo    SCHOOL MANAGEMENT SYSTEM - STANDALONE MODE
echo ===================================================
echo.
echo This application runs completely on your local machine
echo without requiring any external API or database.
echo All data is stored in your browser's local storage.
echo.
echo LOGIN CREDENTIALS:
echo   Email:    admin@example.com
echo   Password: password123
echo.
echo ===================================================
echo.
echo Starting the application...
echo The application will open in your default browser.
echo.
echo Press Ctrl+C in this window to stop the application when done.
echo.

:: Change to the client directory
cd %~dp0\client

:: Check if Node.js is installed
node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
  echo ERROR: Node.js is not installed or not in your PATH.
  echo Please install Node.js from https://nodejs.org/
  echo.
  pause
  exit /b 1
)

:: Check if npm packages are installed
if not exist node_modules (
  echo Installing dependencies...
  call npm install
  if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to install dependencies.
    pause
    exit /b 1
  )
)

:: Start the React application directly
echo Starting the application...
call npm start

pause