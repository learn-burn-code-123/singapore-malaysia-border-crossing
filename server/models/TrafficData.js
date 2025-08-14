const mongoose = require('mongoose');

const trafficDataSchema = new mongoose.Schema({
  crossingPoint: {
    type: String,
    required: true,
    enum: ['woodlands', 'tuas'],
    index: true
  },
  direction: {
    type: String,
    required: true,
    enum: ['malaysia-to-singapore', 'singapore-to-malaysia'],
    index: true
  },
  waitTime: {
    type: Number,
    required: true,
    min: 0,
    max: 300 // 5 hours max
  },
  congestionLevel: {
    type: String,
    required: true,
    enum: ['low', 'moderate', 'high', 'severe'],
    index: true
  },
  vehicleType: {
    type: String,
    required: true,
    enum: ['car', 'bus', 'truck', 'motorcycle', 'all'],
    default: 'all'
  },
  dataSource: {
    type: String,
    required: true,
    enum: ['ica', 'jpj', 'google-maps', 'waze', 'lta-datamall', 'manual'],
    index: true
  },
  confidence: {
    type: Number,
    required: true,
    min: 0,
    max: 1,
    default: 0.8
  },
  weather: {
    condition: String,
    temperature: Number,
    visibility: Number
  },
  specialEvents: [{
    name: String,
    impact: {
      type: String,
      enum: ['low', 'medium', 'high']
    }
  }],
  timestamp: {
    type: Date,
    required: true,
    default: Date.now,
    index: true
  },
  metadata: {
    laneCount: Number,
    processingTime: Number,
    rawData: mongoose.Schema.Types.Mixed
  }
}, {
  timestamps: true
});

// Indexes for efficient querying
trafficDataSchema.index({ crossingPoint: 1, direction: 1, timestamp: -1 });
trafficDataSchema.index({ congestionLevel: 1, timestamp: -1 });
trafficDataSchema.index({ dataSource: 1, timestamp: -1 });

// Virtual for wait time category
trafficDataSchema.virtual('waitTimeCategory').get(function() {
  if (this.waitTime <= 15) return 'very-low';
  if (this.waitTime <= 30) return 'low';
  if (this.waitTime <= 60) return 'moderate';
  if (this.waitTime <= 120) return 'high';
  return 'severe';
});

// Method to get congestion color
trafficDataSchema.methods.getCongestionColor = function() {
  const colors = {
    'low': '#10B981',      // Green
    'moderate': '#F59E0B', // Yellow
    'high': '#EF4444',     // Red
    'severe': '#7C2D12'    // Dark Red
  };
  return colors[this.congestionLevel] || colors.moderate;
};

// Static method to get latest data
trafficDataSchema.statics.getLatestData = function(crossingPoint, direction, limit = 10) {
  return this.find({ crossingPoint, direction })
    .sort({ timestamp: -1 })
    .limit(limit)
    .exec();
};

// Static method to get average wait time for a time period
trafficDataSchema.statics.getAverageWaitTime = function(crossingPoint, direction, hours = 1) {
  const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
  return this.aggregate([
    {
      $match: {
        crossingPoint,
        direction,
        timestamp: { $gte: cutoffTime }
      }
    },
    {
      $group: {
        _id: null,
        averageWaitTime: { $avg: '$waitTime' },
        count: { $sum: 1 },
        minWaitTime: { $min: '$waitTime' },
        maxWaitTime: { $max: '$waitTime' }
      }
    }
  ]);
};

module.exports = mongoose.model('TrafficData', trafficDataSchema);
