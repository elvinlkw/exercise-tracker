const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  username: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

module.exports = Exercise = mongoose.model('Exercise', exerciseSchema);