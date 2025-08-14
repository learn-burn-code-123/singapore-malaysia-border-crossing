#!/bin/bash

echo "🚀 Deploying Border Monitor to Netlify"
echo "======================================"

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "❌ Netlify CLI is not installed. Installing now..."
    npm install -g netlify-cli
fi

echo "✅ Netlify CLI version: $(netlify --version)"

# Build the frontend
echo "🔨 Building frontend..."
cd client
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Frontend build failed!"
    exit 1
fi

echo "✅ Frontend built successfully"

# Go back to root
cd ..

# Deploy to Netlify
echo "🚀 Deploying to Netlify..."
netlify deploy --prod --dir=client/build

if [ $? -eq 0 ]; then
    echo "🎉 Deployment successful!"
    echo "🌐 Your app is now live on Netlify!"
    echo "📱 You can access it at the URL shown above"
else
    echo "❌ Deployment failed!"
    exit 1
fi
