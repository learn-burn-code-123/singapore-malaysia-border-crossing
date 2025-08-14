# Netlify Functions for Border Monitor

This directory contains serverless functions that provide API endpoints for the Border Monitor application.

## 🚀 Functions

### traffic-status.js
Main API function that handles:
- Traffic status requests
- Historical data queries
- Traffic statistics
- Peak time analysis
- Health checks

## 📁 Structure
```
netlify/functions/
├── traffic-status.js    # Main API function
├── package.json         # Dependencies
└── README.md           # This file
```

## 🔧 Usage

### Local Development
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Start local development server
netlify dev

# Test functions locally
curl http://localhost:8888/.netlify/functions/traffic-status
```

### Production
Functions are automatically deployed when you deploy to Netlify.

## 🌐 API Endpoints

### Traffic Status
- `GET /.netlify/functions/traffic-status` - All traffic status
- `GET /.netlify/functions/traffic-status?crossingPoint=woodlands&direction=malaysia-to-singapore` - Specific crossing

### Historical Data
- `GET /.netlify/functions/traffic-status/history/woodlands/malaysia-to-singapore?hours=24`

### Traffic Statistics
- `GET /.netlify/functions/traffic-status/stats/woodlands/malaysia-to-singapore?hours=24`

### Peak Times
- `GET /.netlify/functions/traffic-status/peak-times/woodlands/malaysia-to-singapore?days=7`

### Health Check
- `GET /.netlify/functions/traffic-status/health`

## 🔒 Security

- CORS enabled for all origins
- Input validation and sanitization
- Error handling with appropriate HTTP status codes
- No sensitive data exposure

## 📊 Performance

- Serverless execution (pay-per-use)
- Automatic scaling
- Global edge network
- Cold start optimization

## 🚀 Deployment

Functions are automatically deployed when you:
1. Push to your GitHub repository
2. Deploy via Netlify CLI
3. Use the Netlify dashboard

## 🔧 Configuration

Update the `netlify.toml` file in the root directory to modify function settings.

## 📞 Support

For function-specific issues:
1. Check Netlify function logs
2. Test locally with `netlify dev`
3. Verify function configuration
4. Check Netlify documentation
