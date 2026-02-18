#!/bin/bash

# Install dependencies for both backend and frontend
cd backend
npm install
cd ../frontend
npm install

# Build the frontend for production
npm run build

# Go back to root
cd ..

# The backend server is configured to serve the built frontend
echo "Deployment ready! The app will serve the built frontend from the backend server."