const express = require('express');
const router = express.Router();
const TrafficMonitorService = require('../services/TrafficMonitorService');

// Get current traffic status for all crossings
router.get('/status', async (req, res) => {
  try {
    const { crossingPoint, direction, vehicleType } = req.query;
    
    let query = {};
    if (crossingPoint) query.crossingPoint = crossingPoint;
    if (direction) query.direction = direction;
    if (vehicleType) query.vehicleType = vehicleType;
    
    // Get current status from the service
    const currentStatuses = [];
    
    if (crossingPoint && direction) {
      const status = await TrafficMonitorService.getCurrentStatus(crossingPoint, direction);
      if (status) {
        currentStatuses.push({
          crossingPoint: status.crossingPoint,
          direction: status.direction,
          waitTime: status.waitTime,
          congestionLevel: status.congestionLevel,
          dataSource: status.dataSource,
          confidence: status.confidence,
          timestamp: status.timestamp,
          weather: status.weather,
          specialEvents: status.specialEvents
        });
      }
    } else {
      // Get all current statuses
      const allStatuses = await TrafficMonitorService.getAllCurrentStatuses();
      currentStatuses.push(...allStatuses);
    }

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: currentStatuses
    });
    
  } catch (error) {
    console.error('Error getting traffic status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get traffic status',
      message: error.message
    });
  }
});

// Get current status for a specific crossing and direction
router.get('/status/:crossingPoint/:direction', async (req, res) => {
  try {
    const { crossingPoint, direction } = req.params;
    const { vehicleType } = req.query;
    
    const currentStatus = await TrafficMonitorService.getCurrentStatus(crossingPoint, direction);
    
    if (!currentStatus) {
      return res.status(404).json({
        success: false,
        error: 'No traffic data found for the specified crossing'
      });
    }
    
    res.json({
      success: true,
      data: currentStatus
    });
    
  } catch (error) {
    console.error('Error getting specific traffic status:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get traffic status',
      message: error.message
    });
  }
});

// Get historical traffic data
router.get('/history/:crossingPoint/:direction', async (req, res) => {
  try {
    const { crossingPoint, direction } = req.params;
    const { hours = 24, limit = 100 } = req.query;
    
    const historicalData = await TrafficMonitorService.getHistoricalData(crossingPoint, direction, parseInt(hours));
    
    // Apply limit if specified
    const limitedData = limit ? historicalData.slice(0, parseInt(limit)) : historicalData;
    
    res.json({
      success: true,
      crossingPoint,
      direction,
      hours: parseInt(hours),
      count: limitedData.length,
      data: limitedData
    });
    
  } catch (error) {
    console.error('Error getting historical data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get historical data',
      message: error.message
    });
  }
});

// Get traffic statistics
router.get('/stats/:crossingPoint/:direction', async (req, res) => {
  try {
    const { crossingPoint, direction } = req.params;
    const { hours = 24 } = req.query;
    
    const stats = await TrafficMonitorService.getTrafficStats(crossingPoint, direction, parseInt(hours));
    
    if (!stats) {
      return res.status(404).json({
        success: false,
        error: 'No statistics available for the specified crossing'
      });
    }
    
    res.json({
      success: true,
      crossingPoint,
      direction,
      hours: parseInt(hours),
      statistics: stats
    });
    
  } catch (error) {
    console.error('Error getting traffic statistics:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get traffic statistics',
      message: error.message
    });
  }
});

// Get peak time analysis
router.get('/peak-times/:crossingPoint/:direction', async (req, res) => {
  try {
    const { crossingPoint, direction } = req.params;
    const { days = 7 } = req.query;
    
    const peakTimes = await TrafficMonitorService.getPeakTimes(crossingPoint, direction, parseInt(days));
    
    res.json({
      success: true,
      crossingPoint,
      direction,
      days: parseInt(days),
      peakTimes: peakTimes
    });
    
  } catch (error) {
    console.error('Error getting peak time analysis:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get peak time analysis',
      message: error.message
    });
  }
});

// Manual traffic data entry (for testing/admin purposes)
router.post('/manual-entry', async (req, res) => {
  try {
    const {
      crossingPoint,
      direction,
      waitTime,
      congestionLevel,
      vehicleType = 'all',
      dataSource = 'manual',
      confidence = 0.9
    } = req.body;
    
    // Validation
    if (!crossingPoint || !direction || waitTime === undefined || !congestionLevel) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: crossingPoint, direction, waitTime, congestionLevel'
      });
    }
    
    // Create manual traffic data
    const manualData = {
      crossingPoint,
      direction,
      waitTime: parseInt(waitTime),
      congestionLevel,
      vehicleType,
      dataSource,
      confidence: parseFloat(confidence),
      timestamp: new Date(),
      weather: TrafficMonitorService.getWeatherEffect(),
      specialEvents: [],
      metadata: {
        laneCount: Math.floor(Math.random() * 3) + 4,
        processingTime: Math.random() * 100 + 50,
        rawData: { manual: true }
      }
    };
    
    // Update the service with manual data
    await TrafficMonitorService.updateTrafficData(crossingPoint, direction, manualData);
    
    res.status(201).json({
      success: true,
      message: 'Traffic data added successfully',
      data: manualData
    });
    
  } catch (error) {
    console.error('Error adding manual traffic data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to add traffic data',
      message: error.message
    });
  }
});

// Get available data sources
router.get('/data-sources', (req, res) => {
  res.json({
    success: true,
    dataSources: {
      googleMaps: {
        name: 'Google Maps',
        enabled: true,
        description: 'Simulated traffic data from Google Maps API'
      },
      waze: {
        name: 'Waze',
        enabled: true,
        description: 'Simulated community-driven traffic information'
      },
      ltaDatamall: {
        name: 'LTA DataMall',
        enabled: true,
        description: 'Simulated official Singapore transport data'
      },
      manual: {
        name: 'Manual Entry',
        enabled: true,
        description: 'Manual traffic data entry for testing'
      }
    }
  });
});

module.exports = router;
