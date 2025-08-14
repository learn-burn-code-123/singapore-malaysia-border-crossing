# 🚀 Deployment Guide

## Overview
This guide covers deploying the Border Monitor application to various platforms and environments.

## 📋 Prerequisites
- Node.js v16 or higher
- npm or yarn package manager
- Git for version control
- Access to the GitHub repository

## 🏠 Local Development

### 1. Clone and Setup
```bash
git clone https://github.com/learn-burn-code-123/singapore-malaysia-border-crossing.git
cd singapore-malaysia-border-crossing
npm run install-all
```

### 2. Start Development Server
```bash
npm run dev
```

**Access URLs:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5001
- Health Check: http://localhost:5001/health

## 🌐 Production Deployment

### Option 1: Traditional Server Deployment

#### 1. Build the Application
```bash
# Build frontend for production
cd client
npm run build

# The build folder will be created in client/build/
```

#### 2. Deploy Backend
```bash
# Install production dependencies
cd server
npm install --production

# Set environment variables
export NODE_ENV=production
export PORT=5001

# Start the server
npm start
```

#### 3. Serve Frontend
```bash
# Using nginx (recommended)
sudo apt-get install nginx
sudo cp nginx.conf /etc/nginx/sites-available/border-monitor
sudo ln -s /etc/nginx/sites-available/border-monitor /etc/nginx/sites-enabled/
sudo systemctl restart nginx

# Or using a simple HTTP server
cd client/build
npx serve -s . -l 3000
```

### Option 2: Docker Deployment

#### 1. Create Dockerfile
```dockerfile
# Multi-stage build for production
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app/server ./server
COPY --from=builder /app/client/build ./client/build
COPY --from=builder /app/package*.json ./

RUN npm ci --only=production

EXPOSE 5001

CMD ["npm", "start"]
```

#### 2. Build and Run
```bash
# Build Docker image
docker build -t border-monitor .

# Run container
docker run -d \
  --name border-monitor \
  -p 5001:5001 \
  -e NODE_ENV=production \
  border-monitor
```

### Option 3: Cloud Platform Deployment

#### Heroku
```bash
# Install Heroku CLI
curl https://cli-assets.heroku.com/install.sh | sh

# Login and create app
heroku login
heroku create your-border-monitor-app

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set PORT=5001

# Deploy
git push heroku main
```

#### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Render
```bash
# Connect your GitHub repository
# Set build command: npm run build
# Set start command: npm start
# Set environment variables in the dashboard
```

## 🔧 Environment Configuration

### Production Environment Variables
```env
NODE_ENV=production
PORT=5001
CLIENT_URL=https://yourdomain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Nginx Configuration Example
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        root /path/to/client/build;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Health check
    location /health {
        proxy_pass http://localhost:5001;
    }
}
```

## 📱 Frontend Deployment

### Static Hosting (Netlify, Vercel, GitHub Pages)

#### 1. Build the Application
```bash
cd client
npm run build
```

#### 2. Deploy to Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=build
```

#### 3. Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### 4. GitHub Pages
```bash
# Add to package.json
"homepage": "https://yourusername.github.io/repository-name",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}

# Deploy
npm run deploy
```

## 🔒 Security Considerations

### 1. Environment Variables
- Never commit `.env` files to version control
- Use environment-specific configuration files
- Rotate sensitive values regularly

### 2. HTTPS
- Always use HTTPS in production
- Configure SSL certificates (Let's Encrypt)
- Redirect HTTP to HTTPS

### 3. Rate Limiting
- Enable rate limiting for production
- Configure appropriate limits for your use case
- Monitor for abuse

### 4. CORS
- Restrict CORS origins to your domain
- Don't use `*` in production
- Configure allowed methods and headers

## 📊 Monitoring and Logging

### 1. Application Monitoring
```bash
# Install PM2 for process management
npm install -g pm2

# Start with PM2
pm2 start server/index.js --name "border-monitor"

# Monitor
pm2 monit
pm2 logs
```

### 2. Health Checks
```bash
# Test health endpoint
curl http://localhost:5001/health

# Set up monitoring (e.g., UptimeRobot)
# URL: https://yourdomain.com/health
# Expected: {"status":"OK"}
```

### 3. Log Management
```bash
# View logs
pm2 logs border-monitor

# Log rotation
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

## 🚀 Performance Optimization

### 1. Frontend
- Enable gzip compression
- Use CDN for static assets
- Implement lazy loading
- Optimize images and fonts

### 2. Backend
- Enable compression middleware
- Use clustering for multiple CPU cores
- Implement caching strategies
- Monitor memory usage

### 3. Database (if added later)
- Use connection pooling
- Implement query optimization
- Set up read replicas
- Monitor query performance

## 🔄 Continuous Deployment

### GitHub Actions Example
```yaml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          
      - name: Install dependencies
        run: npm run install-all
        
      - name: Build application
        run: npm run build
        
      - name: Deploy to server
        run: |
          # Add your deployment commands here
          echo "Deploying to production..."
```

## 🆘 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Find process using port
lsof -i :5001

# Kill process
kill -9 <PID>
```

#### 2. Build Failures
```bash
# Clear cache
npm cache clean --force
rm -rf node_modules
npm install
```

#### 3. Environment Variables
```bash
# Check environment
echo $NODE_ENV
echo $PORT

# Set if missing
export NODE_ENV=production
export PORT=5001
```

#### 4. Permission Issues
```bash
# Fix file permissions
chmod +x start.sh
chmod 755 client/build
```

## 📞 Support

For deployment issues:
1. Check the application logs
2. Verify environment configuration
3. Test endpoints individually
4. Create an issue on GitHub
5. Check the troubleshooting section above

---

**Happy Deploying! 🚀**
