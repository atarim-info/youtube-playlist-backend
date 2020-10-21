const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
  videoId: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const VideoTrack = mongoose.model('Video', VideoSchema)

module.exports = { VideoTrack };
