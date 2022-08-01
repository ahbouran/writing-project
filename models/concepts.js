const mongoose = require('mongoose');

const conceptSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  definition: {
    type: String,
    required: true
  },
  explanation: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('concept', conceptSchema);