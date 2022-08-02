const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image_url: {
    type: String
  }
});

module.exports = mongoose.model('topic', topicSchema);