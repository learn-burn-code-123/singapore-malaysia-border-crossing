# Border Monitor - Malaysia-Singapore Transit

A real-time border congestion monitoring and reminder system for Malaysia-Singapore land border crossings. This application provides live traffic updates, peak time predictions, and customizable alerts to help travelers plan their border crossings efficiently.

## 🚀 Features

### Core Functionality
- **Real-time Traffic Monitoring**: Live updates generated using realistic traffic patterns
- **Smart Peak Time Prediction**: AI-based forecasting using historical patterns and upcoming events
- **Custom Alerts & Reminders**: Personalized notifications based on user preferences
- **Multi-Checkpoint Support**: Monitor both Woodlands and Tuas checkpoints
- **Bidirectional Monitoring**: Track traffic in both directions (Malaysia ↔ Singapore)

### User Experience
- **Modern Web Interface**: Responsive React application with real-time updates
- **Interactive Dashboard**: Visual traffic status with color-coded congestion levels
- **Historical Analytics**: Traffic trends and peak time analysis
- **Customizable Settings**: User preferences for notifications and monitoring
- **Mobile-Friendly**: Optimized for all device sizes

### Technical Features
- **Real-time Updates**: WebSocket connections for live data streaming
- **Local Data Generation**: Realistic traffic patterns without external dependencies
- **Scalable Architecture**: Node.js backend with in-memory data storage
- **API-First Design**: RESTful APIs for easy integration
- **Security**: Rate limiting and data validation

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Data Generation│    │  Data Processing │    │  Application    │
│                 │    │                  │    │                 │
│ • Traffic Patterns│───▶│ • Pattern Analysis│───▶│ • Web App       │
│ • Time-based Logic│    │ • Peak Detection │    │ • Mobile App    │
│ • Weather Effects│    │ • Historical Data│    │ • API Endpoints │
│ • Event Simulation│    │ • Trend Analysis │    │ • Notifications │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🛠️ Technology Stack

### Backend
- **Node.js** with Express.js framework
- **Socket.IO** for real-time communication
- **Node-cron** for scheduled tasks
- **In-memory data storage** (no database required)

### Frontend
- **React 18** with functional components and hooks
- **Tailwind CSS** for styling
- **Recharts** for data visualization
- **React Router** for navigation
- **Socket.IO Client** for real-time updates
- **Lucide React** for icons

### Data Generation
- **Realistic traffic patterns** based on time of day and day of week
- **Weekend and holiday effects** for accurate predictions
- **Weather simulation** for realistic variations
- **Peak hour analysis** using historical pattern algorithms

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **No external API keys required**
- **No database setup required**

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/singapore-malaysia-transit.git
cd singapore-malaysia-transit
```

### 2. Install Dependencies
```bash
# Install all dependencies (root, server, and client)
npm run install-all
```

### 3. Environment Configuration (Optional)
```bash
# Copy the example environment file (optional)
cp env.example .env

# The application works without any environment variables
# All traffic data is generated locally
```

### 4. Run the Application
```bash
# Development mode (both server and client)
npm run dev

# Or run separately:
npm run server    # Backend only
npm run client    # Frontend only
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

## 📱 Usage

### Dashboard
- View real-time traffic status for all crossings
- Monitor wait times and congestion levels
- Access historical trends and peak time analysis

### Alerts
- Set custom traffic alerts based on wait time thresholds
- Configure notification preferences (browser notifications)
- Set quiet hours for non-urgent notifications

### Settings
- Customize default crossing points and directions
- Manage notification channels and frequencies
- Configure privacy and data sharing preferences

## 🔧 API Endpoints

### Traffic Data
- `GET /api/traffic/status` - Current traffic status
- `GET /api/traffic/status/:crossing/:direction` - Specific crossing status
- `GET /api/traffic/history/:crossing/:direction` - Historical data
- `GET /api/traffic/stats/:crossing/:direction` - Traffic statistics
- `GET /api/traffic/peak-times/:crossing/:direction` - Peak time analysis

### Alerts
- `GET /api/alerts` - User alerts
- `POST /api/alerts` - Create alert
- `PUT /api/alerts/:id` - Update alert
- `DELETE /api/alerts/:id` - Delete alert

## 🧪 Testing

```bash
# Run backend tests
cd server
npm test

# Run frontend tests
cd client
npm test

# Run all tests
npm run test:all
```

## 📊 Data Models

### TrafficData
- Crossing point (Woodlands/Tuas)
- Direction (Malaysia ↔ Singapore)
- Wait time and congestion level
- Data source and confidence
- Weather and special events
- Timestamp and metadata

### User Preferences
- Travel preferences and schedule
- Notification settings
- Alert history and preferences

## 🔒 Security Features

- **Rate Limiting**: API request throttling
- **Input Validation**: Data sanitization and validation
- **CORS**: Cross-origin resource sharing configuration
- **Helmet**: Security headers and middleware

## 🚀 Deployment

### Production Build
```bash
# Build the frontend
cd client
npm run build

# Start production server
cd ../server
npm start
```

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
```

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d
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

- **ICA (Immigration & Checkpoints Authority)** for border information
- **JPJ (Jabatan Pengangkutan Jalan)** for Malaysian transport data
- **LTA (Land Transport Authority)** for Singapore transport data
- **Traffic pattern research** for realistic data generation

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation and FAQ

## 🔮 Future Enhancements

- **Mobile App**: React Native application
- **AI Predictions**: Machine learning for traffic forecasting
- **Integration**: Ride-hailing and logistics systems
- **Offline Support**: SMS alerts for low-data users
- **Gamification**: Best time to cross leaderboard
- **Weather Integration**: Real weather API integration
- **Event Calendar**: Public holidays and special events
- **Real-time APIs**: Integration with actual traffic data sources

## 💡 Key Benefits of This Approach

- **No External Dependencies**: Works completely offline
- **Realistic Data**: Traffic patterns based on real-world observations
- **Easy Setup**: No API keys or database configuration required
- **Fast Development**: Instant feedback and testing
- **Educational**: Great for learning traffic pattern analysis
- **Production Ready**: Can be easily extended with real data sources

---

**Built with ❤️ for the Malaysia-Singapore border community**
