// Netlify serverless function for traffic status
// Self-contained function with no external dependencies

// Mock traffic data generator (in-memory)
const generateTrafficData = () => {
  const crossingPoints = ['woodlands', 'tuas', 'second-link'];
  const directions = ['malaysia-to-singapore', 'singapore-to-malaysia'];
  
  const data = {};
  
  crossingPoints.forEach(crossing => {
    directions.forEach(direction => {
      const key = `${crossing}-${direction}`;
      const now = new Date();
      const hour = now.getHours();
      
      // Generate realistic traffic patterns
      let congestionLevel;
      let waitTime;
      let vehicleCount;
      
      // Morning rush (7-9 AM)
      if (hour >= 7 && hour <= 9) {
        congestionLevel = Math.random() > 0.3 ? 'high' : 'medium';
        waitTime = Math.floor(Math.random() * 60) + 30; // 30-90 minutes
        vehicleCount = Math.floor(Math.random() * 200) + 100; // 100-300 vehicles
      }
      // Evening rush (5-7 PM)
      else if (hour >= 17 && hour <= 19) {
        congestionLevel = Math.random() > 0.2 ? 'high' : 'medium';
        waitTime = Math.floor(Math.random() * 60) + 45; // 45-105 minutes
        vehicleCount = Math.floor(Math.random() * 250) + 150; // 150-400 vehicles
      }
      // Weekend peak (10 AM - 4 PM)
      else if (now.getDay() === 0 || now.getDay() === 6) {
        if (hour >= 10 && hour <= 16) {
          congestionLevel = Math.random() > 0.4 ? 'medium' : 'low';
          waitTime = Math.floor(Math.random() * 45) + 15; // 15-60 minutes
          vehicleCount = Math.floor(Math.random() * 150) + 50; // 50-200 vehicles
        } else {
          congestionLevel = 'low';
          waitTime = Math.floor(Math.random() * 20) + 5; // 5-25 minutes
          vehicleCount = Math.floor(Math.random() * 80) + 20; // 20-100 vehicles
        }
      }
      // Regular hours
      else {
        congestionLevel = Math.random() > 0.6 ? 'medium' : 'low';
        waitTime = Math.floor(Math.random() * 30) + 10; // 10-40 minutes
        vehicleCount = Math.floor(Math.random() * 120) + 30; // 30-150 vehicles
      }
      
      data[key] = {
        crossingPoint: crossing,
        direction: direction,
        congestionLevel,
        waitTime,
        vehicleCount,
        lastUpdated: now.toISOString(),
        status: congestionLevel === 'high' ? 'delayed' : congestionLevel === 'medium' ? 'moderate' : 'smooth'
      };
    });
  });
  
  return data;
};

// Generate historical data
const generateHistoricalData = (crossingPoint, direction, hours) => {
  const data = [];
  const now = new Date();
  
  for (let i = hours; i >= 0; i--) {
    const timestamp = new Date(now.getTime() - (i * 60 * 60 * 1000));
    const hour = timestamp.getHours();
    
    let congestionLevel;
    let waitTime;
    let vehicleCount;
    
    // Similar logic to current data but for historical points
    if (hour >= 7 && hour <= 9) {
      congestionLevel = Math.random() > 0.3 ? 'high' : 'medium';
      waitTime = Math.floor(Math.random() * 60) + 30;
      vehicleCount = Math.floor(Math.random() * 200) + 100;
    } else if (hour >= 17 && hour <= 19) {
      congestionLevel = Math.random() > 0.2 ? 'high' : 'medium';
      waitTime = Math.floor(Math.random() * 60) + 45;
      vehicleCount = Math.floor(Math.random() * 250) + 150;
    } else {
      congestionLevel = Math.random() > 0.6 ? 'medium' : 'low';
      waitTime = Math.floor(Math.random() * 30) + 10;
      vehicleCount = Math.floor(Math.random() * 120) + 30;
    }
    
    data.push({
      timestamp: timestamp.toISOString(),
      congestionLevel,
      waitTime,
      vehicleCount,
      status: congestionLevel === 'high' ? 'delayed' : congestionLevel === 'medium' ? 'moderate' : 'smooth'
    });
  }
  
  return data;
};

// Generate traffic statistics
const generateTrafficStats = (crossingPoint, direction, hours) => {
  const historicalData = generateHistoricalData(crossingPoint, direction, hours);
  
  const totalVehicles = historicalData.reduce((sum, data) => sum + data.vehicleCount, 0);
  const avgWaitTime = historicalData.reduce((sum, data) => sum + data.waitTime, 0) / historicalData.length;
  const highCongestionCount = historicalData.filter(data => data.congestionLevel === 'high').length;
  const congestionPercentage = (highCongestionCount / historicalData.length) * 100;
  
  return {
    totalVehicles,
    averageWaitTime: Math.round(avgWaitTime),
    congestionPercentage: Math.round(congestionPercentage * 100) / 100,
    dataPoints: historicalData.length,
    timeRange: `${hours} hours`
  };
};

// Generate peak times
const generatePeakTimes = (crossingPoint, direction, days) => {
  const peakTimes = [];
  const now = new Date();
  
  for (let day = 0; day < days; day++) {
    const date = new Date(now.getTime() - (day * 24 * 60 * 60 * 1000));
    
    // Morning peak: 7-9 AM
    peakTimes.push({
      date: date.toISOString().split('T')[0],
      timeSlot: '07:00-09:00',
      congestionLevel: 'high',
      averageWaitTime: Math.floor(Math.random() * 45) + 45, // 45-90 minutes
      vehicleCount: Math.floor(Math.random() * 150) + 150 // 150-300 vehicles
    });
    
    // Evening peak: 5-7 PM
    peakTimes.push({
      date: date.toISOString().split('T')[0],
      timeSlot: '17:00-19:00',
      congestionLevel: 'high',
      averageWaitTime: Math.floor(Math.random() * 50) + 50, // 50-100 minutes
      vehicleCount: Math.floor(Math.random() * 200) + 200 // 200-400 vehicles
    });
    
    // Weekend peak: 10 AM - 4 PM
    if (date.getDay() === 0 || date.getDay() === 6) {
      peakTimes.push({
        date: date.toISOString().split('T')[0],
        timeSlot: '10:00-16:00',
        congestionLevel: 'medium',
        averageWaitTime: Math.floor(Math.random() * 30) + 20, // 20-50 minutes
        vehicleCount: Math.floor(Math.random() * 100) + 100 // 100-200 vehicles
      });
    }
  }
  
  return peakTimes;
};

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  try {
    const { httpMethod, path, queryStringParameters } = event;
    
    if (httpMethod === 'GET') {
      let result;
      
      if (path.includes('/api/traffic/status')) {
        // Get traffic status
        if (queryStringParameters?.crossingPoint && queryStringParameters?.direction) {
          const key = `${queryStringParameters.crossingPoint}-${queryStringParameters.direction}`;
          const allData = generateTrafficData();
          result = allData[key] || null;
        } else {
          result = generateTrafficData();
        }
        
        return {
          statusCode: 200,
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            success: true,
            timestamp: new Date().toISOString(),
            data: result
          })
        };
      }
      
      if (path.includes('/api/traffic/history')) {
        // Get historical data
        const pathParts = path.split('/');
        const crossingPoint = pathParts[pathParts.length - 2];
        const direction = pathParts[pathParts.length - 1];
        const hours = queryStringParameters?.hours || 24;
        
        result = generateHistoricalData(
          crossingPoint,
          direction,
          parseInt(hours)
        );
        
        return {
          statusCode: 200,
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            success: true,
            crossingPoint,
            direction,
            hours: parseInt(hours),
            data: result
          })
        };
      }
      
      if (path.includes('/api/traffic/stats')) {
        // Get traffic statistics
        const pathParts = path.split('/');
        const crossingPoint = pathParts[pathParts.length - 2];
        const direction = pathParts[pathParts.length - 1];
        const hours = queryStringParameters?.hours || 24;
        
        result = generateTrafficStats(
          crossingPoint,
          direction,
          parseInt(hours)
        );
        
        return {
          statusCode: 200,
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            success: true,
            crossingPoint,
            direction,
            hours: parseInt(hours),
            data: result
          })
        };
      }
      
      if (path.includes('/api/traffic/peak-times')) {
        // Get peak times
        const pathParts = path.split('/');
        const crossingPoint = pathParts[pathParts.length - 2];
        const direction = pathParts[pathParts.length - 1];
        const days = queryStringParameters?.days || 7;
        
        result = generatePeakTimes(
          crossingPoint,
          direction,
          parseInt(days)
        );
        
        return {
          statusCode: 200,
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            success: true,
            crossingPoint,
            direction,
            days: parseInt(days),
            data: result
          })
        };
      }
      
      // Health check
      if (path.includes('/health')) {
        return {
          statusCode: 200,
          headers: {
            ...headers,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            status: 'OK',
            timestamp: new Date().toISOString(),
            service: 'Border Monitor API (Netlify)'
          })
        };
      }
    }
    
    // Default response for unhandled routes
    return {
      statusCode: 404,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: 'Route not found',
        message: 'This endpoint is not supported in the Netlify function'
      })
    };
    
  } catch (error) {
    console.error('Error in traffic-status function:', error);
    
    return {
      statusCode: 500,
      headers: {
        ...headers,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};
