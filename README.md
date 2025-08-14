# Border Monitor - Malaysia-Singapore Transit System

A real-time border congestion monitoring and reminder system for Malaysia-Singapore crossings, featuring smart peak time prediction, custom alerts, and comprehensive traffic analysis.

## 🌐 Live Demo

**GitHub Repository**: [https://github.com/learn-burn-code-123/singapore-malaysia-border-crossing.git](https://github.com/learn-burn-code-123/singapore-malaysia-border-crossing.git)

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- **No external API keys required**
- **No database setup required**

### Installation & Running

1. **Clone the repository**
   ```bash
   git clone https://github.com/learn-burn-code-123/singapore-malaysia-border-crossing.git
   cd singapore-malaysia-border-crossing
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Start the application**
   ```bash
   npm run dev
   ```

   Or use the provided startup script:
   ```bash
   chmod +x start.sh
   ./start.sh
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001
   - Health Check: http://localhost:5001/health

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React Client  │◄──►│  Express Server  │◄──►│ Data Generation │
│   (Port 3000)   │    │   (Port 5001)    │    │   (In-Memory)   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Socket.IO     │    │  Traffic Routes  │    │ Realistic      │
│   Real-time     │    │  & Middleware    │    │ Traffic        │
│   Updates       │    │                  │    │ Patterns       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🎯 Core Functionality

### Real-Time Traffic Monitoring
- **Live Updates**: Real-time traffic status for all crossing points
- **Smart Simulation**: Realistic traffic patterns based on time, day, and events
- **Multiple Crossings**: Woodlands, Tuas, and Second Link checkpoints
- **Bidirectional Monitoring**: Malaysia-to-Singapore and Singapore-to-Malaysia

### Intelligent Traffic Analysis
- **Peak Time Prediction**: AI-powered analysis of historical patterns
- **Congestion Forecasting**: Predictive modeling for traffic conditions
- **Weather Impact**: Simulated weather effects on travel times
- **Special Events**: Holiday and event-based traffic predictions

### User Experience Features
- **Custom Alerts**: Set personalized traffic notifications
- **Interactive Dashboard**: Real-time charts and status cards
- **Responsive Design**: Mobile-first, modern UI with Tailwind CSS
- **Local Storage**: Settings and alerts stored in your browser

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern UI framework
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Data visualization library
- **Socket.IO Client** - Real-time communication
- **React Router** - Client-side routing
- **React Hot Toast** - User notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Socket.IO** - Real-time bidirectional communication
- **Node-cron** - Task scheduling
- **In-memory data storage** - No external database required
- **Realistic traffic patterns** - Simulated data generation

### Development Tools
- **Nodemon** - Development server with auto-reload
- **Concurrently** - Run multiple commands simultaneously
- **ESLint** - Code quality and consistency

## 📊 API Endpoints

### Traffic Data
- `GET /api/traffic/status` - Current traffic status for all crossings
- `GET /api/traffic/status/:crossing/:direction` - Specific crossing status
- `GET /api/traffic/history/:crossing/:direction` - Historical traffic data
- `GET /api/traffic/stats/:crossing/:direction` - Traffic statistics
- `GET /api/traffic/peak-times/:crossing/:direction` - Peak time predictions

### System
- `GET /health` - Server health check
- `WebSocket` - Real-time traffic updates via Socket.IO

## 🔧 Configuration

### Environment Variables (Optional)
```env
# Server Configuration
NODE_ENV=development
PORT=5001
CLIENT_URL=http://localhost:3000

# Application Settings
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Note**: The application works without any environment variables - all settings use sensible defaults.

## 📱 Features in Detail

### Dashboard
- **Real-time Status Cards**: Live traffic information for each crossing
- **Interactive Charts**: Historical traffic trends and patterns
- **Peak Time Widget**: Predicted busy periods and recommendations
- **Overall Status Alert**: System-wide traffic condition summary

### Alerts System
- **Custom Notifications**: Set alerts for specific crossings and conditions
- **Local Storage**: Alerts saved in your browser (no account needed)
- **Flexible Conditions**: Configure wait time thresholds and directions
- **Real-time Updates**: Instant notification when conditions change

### Settings & Preferences
- **Notification Preferences**: Browser push notification settings
- **Privacy Controls**: Local data storage configuration
- **User Preferences**: Customizable dashboard and display options

## 🚦 Traffic Simulation Features

### Realistic Patterns
- **Time-based Variations**: Morning rush, evening peak, night lull
- **Day-of-week Effects**: Weekend traffic patterns and holiday impacts
- **Weather Simulation**: Rain, haze, and clear weather effects
- **Special Events**: Chinese New Year, school holidays, weekend travel

### Data Generation
- **Historical Patterns**: 24-hour historical data generation
- **Peak Time Analysis**: 7-day peak time prediction
- **Statistical Analysis**: Average, min, max wait times and congestion breakdown
- **Real-time Updates**: 30-second refresh intervals

## 🔒 Security Features

- **Helmet.js** - Security headers and protection
- **CORS Configuration** - Cross-origin resource sharing
- **Input Validation** - Request parameter sanitization
- **Error Handling** - Comprehensive error management
- **Rate Limiting** - API request throttling (when enabled)

## 📈 Performance

- **Lightning Fast**: In-memory data access
- **Real-time Updates**: 30-second refresh cycles
- **Efficient Rendering**: React optimization and lazy loading
- **Responsive UI**: Mobile-first design with smooth animations
- **Minimal Dependencies**: Lightweight, focused application

## 🚀 Deployment

### Local Development
```bash
npm run dev          # Start both frontend and backend
npm run server       # Start only backend
npm run client       # Start only frontend
```

### Production Build
```bash
npm run build        # Build frontend for production
npm start           # Start production server
```

### Docker (Optional)
```bash
# Build and run with Docker
docker build -t border-monitor .
docker run -p 5001:5001 -p 3000:3000 border-monitor
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Traffic pattern research** - Based on real Malaysia-Singapore border crossing patterns
- **React community** - For the excellent frontend framework
- **Node.js ecosystem** - For the robust backend platform
- **Tailwind CSS** - For the beautiful, responsive design system

## 🔮 Future Enhancements

- **Mobile App**: Native iOS and Android applications
- **Advanced Analytics**: Machine learning for traffic prediction
- **Integration APIs**: Connect with real traffic data sources
- **Multi-language Support**: Bahasa Malaysia and Chinese localization
- **Offline Mode**: PWA capabilities for offline access

## 📞 Support

For questions, issues, or contributions:
- **GitHub Issues**: [Create an issue](https://github.com/learn-burn-code-123/singapore-malaysia-border-crossing/issues)
- **Repository**: [https://github.com/learn-burn-code-123/singapore-malaysia-border-crossing.git](https://github.com/learn-burn-code-123/singapore-malaysia-border-crossing.git)

---

**Built with ❤️ for the Malaysia-Singapore transit community**
