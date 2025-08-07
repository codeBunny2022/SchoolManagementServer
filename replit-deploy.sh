#!/bin/bash

echo "🚀 Starting Replit deployment for School Management System..."

# Install backend dependencies
echo "📦 Installing backend dependencies..."
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend && npm install && cd ..

# Build frontend
echo "🔨 Building frontend..."
cd frontend && npm run build && cd ..

# Check if build was successful
if [ -d "frontend/build" ]; then
    echo "✅ Frontend built successfully!"
else
    echo "❌ Frontend build failed!"
    exit 1
fi

echo "🎉 Deployment completed successfully!"
echo "🌐 Your app should be available at your Replit URL"
echo "📊 Health check: your-repl-url.repl.co/health" 