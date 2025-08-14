const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  preferences: {
    defaultCrossingPoint: {
      type: String,
      enum: ['woodlands', 'tuas', 'both'],
      default: 'woodlands'
    },
    defaultDirection: {
      type: String,
      enum: ['malaysia-to-singapore', 'singapore-to-malaysia', 'both'],
      default: 'both'
    },
    vehicleType: {
      type: String,
      enum: ['car', 'bus', 'truck', 'motorcycle', 'all'],
      default: 'car'
    },
    maxWaitTime: {
      type: Number,
      default: 45, // minutes
      min: 5,
      max: 180
    },
    notificationChannels: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      whatsapp: { type: Boolean, default: false }
    },
    alertFrequency: {
      type: String,
      enum: ['immediate', '15min', '30min', '1hour'],
      default: 'immediate'
    },
    quietHours: {
      enabled: { type: Boolean, default: false },
      start: { type: String, default: '22:00' }, // HH:MM format
      end: { type: String, default: '07:00' }
    }
  },
  travelSchedule: [{
    dayOfWeek: {
      type: Number, // 0-6 (Sunday-Saturday)
      required: true
    },
    timeSlots: [{
      startTime: { type: String, required: true }, // HH:MM format
      endTime: { type: String, required: true },
      crossingPoint: {
        type: String,
        enum: ['woodlands', 'tuas', 'both']
      },
      direction: {
        type: String,
        enum: ['malaysia-to-singapore', 'singapore-to-malaysia', 'both']
      },
      priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
      }
    }]
  }],
  notificationHistory: [{
    type: {
      type: String,
      enum: ['congestion-alert', 'peak-time-warning', 'special-event', 'system-update']
    },
    message: String,
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
    actionTaken: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  verificationToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
}, {
  timestamps: true
});

// Indexes
userSchema.index({ email: 1 });
userSchema.index({ 'preferences.defaultCrossingPoint': 1 });
userSchema.index({ isActive: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to check if user should receive notification based on quiet hours
userSchema.methods.isWithinQuietHours = function() {
  if (!this.preferences.quietHours.enabled) return false;
  
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5); // HH:MM format
  
  const start = this.preferences.quietHours.start;
  const end = this.preferences.quietHours.end;
  
  if (start <= end) {
    return currentTime >= start && currentTime <= end;
  } else {
    // Handles overnight quiet hours (e.g., 22:00 to 07:00)
    return currentTime >= start || currentTime <= end;
  }
};

// Method to get user's preferred notification channels
userSchema.methods.getActiveNotificationChannels = function() {
  const channels = [];
  Object.entries(this.preferences.notificationChannels).forEach(([channel, enabled]) => {
    if (enabled) channels.push(channel);
  });
  return channels;
};

// Static method to find users who should be notified about specific conditions
userSchema.statics.findUsersForNotification = function(crossingPoint, direction, waitTime) {
  return this.find({
    isActive: true,
    $or: [
      { 'preferences.defaultCrossingPoint': crossingPoint },
      { 'preferences.defaultCrossingPoint': 'both' }
    ],
    $or: [
      { 'preferences.defaultDirection': direction },
      { 'preferences.defaultDirection': 'both' }
    ],
    'preferences.maxWaitTime': { $lte: waitTime }
  });
};

module.exports = mongoose.model('User', userSchema);
