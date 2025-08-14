class TrafficMonitorService {
  constructor() {
    this.trafficData = {
      'woodlands': {
        'malaysia-to-singapore': null,
        'singapore-to-malaysia': null
      },
      'tuas': {
        'malaysia-to-singapore': null,
        'singapore-to-malaysia': null
      },
      'second-link': {
        'malaysia-to-singapore': null,
        'singapore-to-malaysia': null
      }
    };

    // Historical patterns for realistic traffic simulation
    this.historicalPatterns = {
      'woodlands': {
        'malaysia-to-singapore': {
          morning: { base: 35, variance: 15 },
          afternoon: { base: 20, variance: 10 },
          evening: { base: 45, variance: 20 },
          night: { base: 15, variance: 8 }
        },
        'singapore-to-malaysia': {
          morning: { base: 25, variance: 12 },
          afternoon: { base: 15, variance: 8 },
          evening: { base: 35, variance: 18 },
          night: { base: 10, variance: 5 }
        }
      },
      'tuas': {
        'malaysia-to-singapore': {
          morning: { base: 30, variance: 12 },
          afternoon: { base: 18, variance: 9 },
          evening: { base: 40, variance: 18 },
          night: { base: 12, variance: 6 }
        },
        'singapore-to-malaysia': {
          morning: { base: 20, variance: 10 },
          afternoon: { base: 12, variance: 6 },
          evening: { base: 30, variance: 15 },
          night: { base: 8, variance: 4 }
        }
      },
      'second-link': {
        'malaysia-to-singapore': {
          morning: { base: 25, variance: 10 },
          afternoon: { base: 15, variance: 7 },
          evening: { base: 35, variance: 16 },
          night: { base: 10, variance: 5 }
        },
        'singapore-to-malaysia': {
          morning: { base: 18, variance: 8 },
          afternoon: { base: 10, variance: 5 },
          evening: { base: 28, variance: 14 },
          night: { base: 6, variance: 3 }
        }
      }
    };

    // Start monitoring
    this.startMonitoring();
  }

  async generateTrafficData(crossingPoint, direction) {
    const now = new Date();
    const hour = now.getHours();
    const dayOfWeek = now.getDay();

    // Determine time period
    let timePeriod;
    if (hour >= 6 && hour < 10) timePeriod = 'morning';
    else if (hour >= 10 && hour < 16) timePeriod = 'afternoon';
    else if (hour >= 16 && hour < 20) timePeriod = 'evening';
    else timePeriod = 'night';

    // Get base pattern for this crossing, direction, and time
    const pattern = this.historicalPatterns[crossingPoint][direction][timePeriod];

    // Add weekend effect
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const weekendMultiplier = isWeekend ? 1.3 : 1.0;

    // Add random variance
    const variance = (Math.random() - 0.5) * 2 * pattern.variance;
    const baseWaitTime = pattern.base + variance;

    // Add peak hour effect
    const peakEffect = this.calculatePeakEffect(hour, dayOfWeek);
    const finalWaitTime = Math.max(5, Math.round((baseWaitTime + peakEffect) * weekendMultiplier));

    // Determine congestion level
    const congestionLevel = this.calculateCongestionLevel(finalWaitTime);

    // Add some realistic variations
    const dataSource = this.getRandomDataSource();
    const confidence = 0.85 + (Math.random() * 0.1);

    // Add weather effect (simulated)
    const weatherEffect = this.getWeatherEffect();

    return {
      crossingPoint,
      direction,
      waitTime: finalWaitTime,
      congestionLevel,
      dataSource,
      confidence: Math.min(confidence, 0.95),
      weather: weatherEffect,
      specialEvents: this.getSpecialEvents(now),
      timestamp: now,
      metadata: {
        laneCount: Math.floor(Math.random() * 3) + 4, // 4-6 lanes
        processingTime: Math.random() * 100 + 50,
        rawData: { generated: true, pattern: timePeriod }
      }
    };
  }

  calculatePeakEffect(hour, dayOfWeek) {
    // Morning rush hour (6-9 AM)
    if (hour >= 6 && hour <= 9) {
      return 15 + (Math.random() * 10);
    }
    // Evening rush hour (5-8 PM)
    else if (hour >= 17 && hour <= 20) {
      return 20 + (Math.random() * 15);
    }
    // Lunch time (12-2 PM)
    else if (hour >= 12 && hour <= 14) {
      return 5 + (Math.random() * 8);
    }
    // Weekend effect
    else if (dayOfWeek === 0 || dayOfWeek === 6) {
      return 8 + (Math.random() * 12);
    }
    return 0;
  }

  getRandomDataSource() {
    const sources = ['simulated', 'historical-pattern', 'time-based', 'weekend-effect'];
    return sources[Math.floor(Math.random() * sources.length)];
  }

  getWeatherEffect() {
    const weatherConditions = ['clear', 'rainy', 'cloudy', 'hazy'];
    const weather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
    
    // Rain increases wait times
    if (weather === 'rainy') {
      return { condition: weather, impact: 'increased', multiplier: 1.2 };
    }
    // Haze can also affect travel
    else if (weather === 'hazy') {
      return { condition: weather, impact: 'moderate', multiplier: 1.1 };
    }
    
    return { condition: weather, impact: 'minimal', multiplier: 1.0 };
  }

  getSpecialEvents(date) {
    const events = [];
    
    // Check for holidays or special events
    const month = date.getMonth();
    const day = date.getDate();
    
    // Chinese New Year (simplified - usually in Jan/Feb)
    if ((month === 0 || month === 1) && Math.random() > 0.7) {
      events.push({
        name: 'Chinese New Year',
        impact: 'high',
        multiplier: 1.5,
        description: 'Increased border traffic during holiday period'
      });
    }
    
    // School holidays (simplified)
    if ((month === 5 || month === 11) && Math.random() > 0.6) {
      events.push({
        name: 'School Holidays',
        impact: 'medium',
        multiplier: 1.3,
        description: 'Family travel during school break'
      });
    }
    
    // Weekend events
    if ((date.getDay() === 0 || date.getDay() === 6) && Math.random() > 0.5) {
      events.push({
        name: 'Weekend Travel',
        impact: 'medium',
        multiplier: 1.2,
        description: 'Leisure travel and shopping trips'
      });
    }
    
    return events;
  }

  calculateCongestionLevel(waitTime) {
    if (waitTime < 15) return 'low';
    if (waitTime < 30) return 'moderate';
    if (waitTime < 60) return 'high';
    return 'severe';
  }

  async startMonitoring() {
    console.log('🚦 Starting traffic monitoring service...');
    
    // Initial data generation
    await this.updateAllCrossings();
    
    // Set up periodic updates
    setInterval(async () => {
      await this.updateAllCrossings();
    }, 30000); // Update every 30 seconds
    
    // Set up peak time analysis
    setInterval(async () => {
      await this.analyzePeakTimes();
    }, 300000); // Analyze every 5 minutes
  }

  async updateAllCrossings() {
    try {
      for (const [crossingPoint, directions] of Object.entries(this.trafficData)) {
        for (const direction of Object.keys(directions)) {
          const newData = await this.generateTrafficData(crossingPoint, direction);
          this.trafficData[crossingPoint][direction] = newData;
        }
      }
      
      // Emit updates to connected clients
      this.emitTrafficUpdates();
      
    } catch (error) {
      console.error('Error updating traffic data:', error);
    }
  }

  async monitorCrossing(crossingPoint, direction) {
    try {
      const trafficData = await this.generateTrafficData(crossingPoint, direction);
      
      // Update the in-memory store
      if (this.trafficData[crossingPoint] && this.trafficData[crossingPoint][direction]) {
        this.trafficData[crossingPoint][direction] = trafficData;
      }
      
      return trafficData;
      
    } catch (error) {
      console.error(`Error monitoring ${crossingPoint} - ${direction}:`, error);
      return null;
    }
  }

  emitTrafficUpdates() {
    // This would emit to Socket.IO clients in a real implementation
    // For now, just log the updates
    console.log('📊 Traffic data updated:', new Date().toISOString());
  }

  async analyzePeakTimes() {
    try {
      console.log('🔍 Analyzing peak traffic times...');
      
      // Simulate peak time analysis
      for (const [crossingPoint, directions] of Object.entries(this.trafficData)) {
        for (const direction of Object.keys(directions)) {
          const currentData = this.trafficData[crossingPoint][direction];
          if (currentData) {
            // Analyze patterns and update recommendations
            const peakAnalysis = await this.getPeakTimes(crossingPoint, direction);
            console.log(`Peak analysis for ${crossingPoint} - ${direction}:`, peakAnalysis.length, 'peak periods identified');
          }
        }
      }
      
    } catch (error) {
      console.error('Error analyzing peak times:', error);
    }
  }

  async getCurrentStatus(crossingPoint, direction) {
    try {
      if (this.trafficData[crossingPoint] && this.trafficData[crossingPoint][direction]) {
        return this.trafficData[crossingPoint][direction];
      }
      return null;
    } catch (error) {
      console.error('Error getting current status:', error);
      return null;
    }
  }

  async getHistoricalData(crossingPoint, direction, hours = 24) {
    try {
      const historicalData = [];
      const now = new Date();
      
      // Generate historical data based on patterns
      for (let i = hours; i >= 0; i--) {
        const timestamp = new Date(now.getTime() - (i * 60 * 60 * 1000));
        const hour = timestamp.getHours();
        const dayOfWeek = timestamp.getDay();
        
        // Get base pattern
        const timePeriod = this.getTimePeriod(hour);
        const pattern = this.historicalPatterns[crossingPoint][direction][timePeriod];
        
        // Add variations
        const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
        const weekendMultiplier = isWeekend ? 1.3 : 1.0;
        const variance = (Math.random() - 0.5) * 2 * pattern.variance;
        const peakEffect = this.calculatePeakEffect(hour, dayOfWeek);
        
        const waitTime = Math.max(5, Math.round((pattern.base + variance + peakEffect) * weekendMultiplier));
        
        historicalData.push({
          crossingPoint,
          direction,
          waitTime,
          congestionLevel: this.calculateCongestionLevel(waitTime),
          timestamp,
          dataSource: 'historical-simulation'
        });
      }
      
      return historicalData;
      
    } catch (error) {
      console.error('Error getting historical data:', error);
      return [];
    }
  }

  getTimePeriod(hour) {
    if (hour >= 6 && hour < 10) return 'morning';
    if (hour >= 10 && hour < 16) return 'afternoon';
    if (hour >= 16 && hour < 20) return 'evening';
    return 'night';
  }

  async getTrafficStats(crossingPoint, direction, hours = 24) {
    try {
      const historicalData = await this.getHistoricalData(crossingPoint, direction, hours);
      
      if (historicalData.length === 0) {
        return null;
      }
      
      const waitTimes = historicalData.map(data => data.waitTime);
      const avgWaitTime = waitTimes.reduce((a, b) => a + b, 0) / waitTimes.length;
      const minWaitTime = Math.min(...waitTimes);
      const maxWaitTime = Math.max(...waitTimes);
      
      const congestionBreakdown = historicalData.reduce((acc, data) => {
        acc[data.congestionLevel] = (acc[data.congestionLevel] || 0) + 1;
        return acc;
      }, {});
      
      return {
        totalRecords: historicalData.length,
        avgWaitTime: Math.round(avgWaitTime * 10) / 10,
        minWaitTime,
        maxWaitTime,
        congestionBreakdown
      };
      
    } catch (error) {
      console.error('Error getting traffic stats:', error);
      return null;
    }
  }

  async getPeakTimes(crossingPoint, direction, days = 7) {
    try {
      const peakTimes = [];
      
      // Generate peak time analysis for the last 7 days
      for (let day = 0; day < days; day++) {
        for (let hour = 0; hour < 24; hour++) {
          const pattern = this.historicalPatterns[crossingPoint][direction];
          let timePeriod;
          if (hour >= 6 && hour < 10) timePeriod = 'morning';
          else if (hour >= 10 && hour < 16) timePeriod = 'afternoon';
          else if (hour >= 16 && hour < 20) timePeriod = 'evening';
          else timePeriod = 'night';
          
          const basePattern = pattern[timePeriod];
          const isWeekend = (day === 0 || day === 6);
          const weekendMultiplier = isWeekend ? 1.3 : 1.0;
          
          const variance = (Math.random() - 0.5) * 2 * basePattern.variance;
          const baseWaitTime = basePattern.base + variance;
          const peakEffect = this.calculatePeakEffect(hour, day + 1);
          const avgWaitTime = Math.max(5, (baseWaitTime + peakEffect) * weekendMultiplier);
          
          // Only include significant peak times
          if (avgWaitTime > 20) {
            peakTimes.push({
              hour,
              dayOfWeek: day + 1,
              avgWaitTime: Math.round(avgWaitTime * 10) / 10,
              count: Math.floor(Math.random() * 20) + 10,
              maxWaitTime: Math.round(avgWaitTime * 1.5),
              severity: avgWaitTime > 45 ? 'high' : avgWaitTime > 30 ? 'medium' : 'low'
            });
          }
        }
      }
      
      // Sort by average wait time and return top results
      return peakTimes
        .sort((a, b) => b.avgWaitTime - a.avgWaitTime)
        .slice(0, 20);
      
    } catch (error) {
      console.error('Error getting peak times:', error);
      return [];
    }
  }

  async getAllCurrentStatuses() {
    const allStatuses = [];
    
    Object.entries(this.trafficData).forEach(([crossingPoint, directions]) => {
      Object.entries(directions).forEach(([direction, data]) => {
        if (data) {
          allStatuses.push({
            crossingPoint,
            direction,
            ...data
          });
        }
      });
    });
    
    return allStatuses;
  }

  async updateTrafficData(crossingPoint, direction, data) {
    if (this.trafficData[crossingPoint] && this.trafficData[crossingPoint][direction]) {
      this.trafficData[crossingPoint][direction] = data;
      return true;
    }
    return false;
  }
}

module.exports = new TrafficMonitorService();
