#!/bin/bash

echo "🚀 Starting School Management System deployment..."

# Install dependencies
echo "📦 Installing backend dependencies..."
npm install

echo "📦 Installing frontend dependencies..."
cd frontend && npm install && cd ..

# Build frontend
echo "🔨 Building frontend..."
cd frontend && npm run build && cd ..

# Setup database if MySQL is available
echo "🗄️ Setting up database..."
if command -v mysql &> /dev/null; then
    echo "MySQL found, setting up database..."
    chmod +x setup_database.sh
    ./setup_database.sh
else
    echo "MySQL not found, skipping database setup..."
fi

echo "✅ Deployment completed!"
echo "🌐 Your app should be available at: https://your-repl-url.repl.co"
echo "📊 API Health check: https://your-repl-url.repl.co/health" 