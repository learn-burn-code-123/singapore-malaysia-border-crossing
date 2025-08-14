#!/bin/bash

echo "🚀 Netlify Build Script for Border Monitor"
echo "=========================================="

# Set environment variables
export NODE_ENV=production
export CI=true

# Clear npm cache to avoid dependency issues
echo "🧹 Clearing npm cache..."
npm cache clean --force

# Install dependencies in client directory
echo "📦 Installing client dependencies..."
cd client

# Remove existing node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Install dependencies with clean slate
npm install --no-optional --no-audit --no-fund --prefer-offline

if [ $? -ne 0 ]; then
    echo "❌ Dependency installation failed!"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Build the application
echo "🔨 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully"
echo "📁 Build output: $(pwd)/build"

# Go back to root
cd ..

echo "🎉 Netlify build script completed successfully!"
