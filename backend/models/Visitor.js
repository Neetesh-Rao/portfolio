const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  ip: String,
  userAgent: String,
  visitorId: String, // Unique identifier
  firstVisit: {
    type: Date,
    default: Date.now
  },
  lastVisit: {
    type: Date,
    default: Date.now
  },
  visitCount: {
    type: Number,
    default: 1
  }
});

// Compound index for faster unique checking
visitorSchema.index({ ip: 1, userAgent: 1 }, { unique: true });

module.exports = mongoose.model('Visitor', visitorSchema);