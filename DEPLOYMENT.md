# 🚀 Deployment Guide - Netlify Focus

## Overview
This guide covers deploying the Border Monitor application to Netlify, the recommended hosting platform for this application.

## 📋 Prerequisites
- Node.js v16 or higher
- npm or yarn package manager
- Git for version control
- Access to the GitHub repository
- Netlify account (free tier available)

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

## 🌐 Netlify Deployment (Recommended)

### Option 1: Automatic Deployment via GitHub

#### 1. Connect GitHub Repository
1. Go to [Netlify](https://netlify.com) and sign up/login
2. Click "New site from Git"
3. Choose GitHub and authorize Netlify
4. Select your repository: `singapore-malaysia-border-crossing`

#### 2. Configure Build Settings
```
Build command: cd client && npm run build
Publish directory: client/build
Base directory: (leave empty)
```

#### 3. Set Environment Variables
```
NODE_VERSION: 18
NODE_ENV: production
REACT_APP_API_URL: (your backend URL if using external backend)
```

#### 4. Deploy
- Click "Deploy site"
- Netlify will automatically build and deploy your app
- Every push to main branch will trigger automatic deployment

### Option 2: Manual Deployment via CLI

#### 1. Install Netlify CLI
```bash
npm install -g netlify-cli
```

#### 2. Login to Netlify
```bash
netlify login
```

#### 3. Build and Deploy
```bash
# Build the frontend
cd client
npm run build

# Deploy to Netlify
cd ..
netlify deploy --prod --dir=client/build
```

#### 4. Or Use the Provided Script
```bash
./deploy-netlify.sh
```

### Option 3: Drag & Drop Deployment

#### 1. Build Locally
```bash
cd client
npm run build
```

#### 2. Deploy via Netlify Dashboard
1. Go to Netlify dashboard
2. Drag and drop the `client/build` folder
3. Your site will be deployed instantly

## 🔧 Netlify Configuration

### netlify.toml
The application includes a `netlify.toml` file with:
- Build configuration
- Redirects for SPA routing
- Security headers
- Cache optimization
- Functions directory setup

### Environment Variables
Set these in Netlify dashboard under Site settings > Environment variables:
```env
NODE_VERSION=18
NODE_ENV=production
REACT_APP_API_URL=https://your-backend-domain.com
```

### Custom Domain
1. Go to Site settings > Domain management
2. Add your custom domain
3. Configure DNS records as instructed
4. Enable HTTPS (automatic with Netlify)

## 📱 Frontend-Only Deployment

Since this application generates traffic data locally, you can deploy just the frontend:

### 1. Build the Application
```bash
cd client
npm run build
```

### 2. Deploy to Netlify
```bash
netlify deploy --prod --dir=build
```

### 3. Access Your App
- Your app will be available at a Netlify subdomain
- All traffic data is generated client-side
- No backend server required

## 🔒 Security & Performance

### Security Headers (Auto-configured)
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

### Performance Optimization
- Static asset caching (1 year)
- HTML file caching (no cache)
- Gzip compression (automatic)
- CDN distribution (global)

### HTTPS
- Automatic SSL certificates
- HTTP/2 support
- Security best practices

## 📊 Monitoring & Analytics

### Netlify Analytics
- Page views and unique visitors
- Performance metrics
- Error tracking
- Form submissions

### Custom Analytics
```html
<!-- Add to index.html for Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔄 Continuous Deployment

### Automatic Deployments
- Every push to main branch triggers deployment
- Preview deployments for pull requests
- Branch deployments for testing

### Manual Deployments
```bash
# Deploy specific branch
netlify deploy --branch=feature-branch

# Deploy with message
netlify deploy --prod --dir=client/build --message="Update traffic patterns"
```

### Rollback
1. Go to Netlify dashboard
2. Navigate to Deploys
3. Click "Rollback" on any previous deployment

## 🆘 Troubleshooting

### Common Issues

#### 1. Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### 2. Environment Variables
- Check Netlify dashboard for correct variables
- Ensure variable names match exactly
- Restart build after adding variables

#### 3. Routing Issues
- Verify `netlify.toml` redirects are correct
- Check that SPA routing is properly configured
- Test with `netlify dev` locally

#### 4. Performance Issues
- Check bundle size with `npm run build --stats`
- Optimize images and assets
- Enable Netlify's asset optimization

### Debug Commands
```bash
# Test build locally
netlify dev

# Check build logs
netlify logs

# Verify configuration
netlify status
```

## 🚀 Advanced Features

### Netlify Functions
The application includes serverless functions for API endpoints:
- `netlify/functions/traffic-status.js`
- Handles traffic data requests
- No external backend required

### Form Handling
```html
<!-- Add to your forms for Netlify integration -->
<form name="contact" netlify>
  <!-- form fields -->
</form>
```

### Edge Functions
```javascript
// Create edge functions for advanced routing
exports.handler = async (event) => {
  // Your edge function logic
};
```

## 📞 Support

### Netlify Support
- [Netlify Documentation](https://docs.netlify.com)
- [Community Forum](https://community.netlify.com)
- [Support Center](https://help.netlify.com)

### Application Support
- GitHub Issues: [Create an issue](https://github.com/learn-burn-code-123/singapore-malaysia-border-crossing/issues)
- Check the troubleshooting section above
- Verify Netlify configuration

---

**Happy Deploying to Netlify! 🚀**

Your Border Monitor application will be live with:
- ✅ Automatic deployments
- ✅ Global CDN
- ✅ HTTPS by default
- ✅ Performance optimization
- ✅ Zero server maintenance
