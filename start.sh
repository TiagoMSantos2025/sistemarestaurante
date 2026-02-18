#!/bin/bash

# Set environment to production
export NODE_ENV=production

# Install all dependencies
npm run install-all

# Build the frontend
cd frontend
npm run build
cd ..

# Start the server
npm start