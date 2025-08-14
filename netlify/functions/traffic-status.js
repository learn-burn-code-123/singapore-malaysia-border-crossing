// Netlify serverless function for traffic status
const TrafficMonitorService = require('../../server/services/TrafficMonitorService');

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
          result = await TrafficMonitorService.getCurrentStatus(
            queryStringParameters.crossingPoint,
            queryStringParameters.direction
          );
        } else {
          result = await TrafficMonitorService.getAllCurrentStatuses();
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
        
        result = await TrafficMonitorService.getHistoricalData(
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
        
        result = await TrafficMonitorService.getTrafficStats(
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
        
        result = await TrafficMonitorService.getPeakTimes(
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
