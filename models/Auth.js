const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  session: {
    type: String
  }
},{
  timestamps: true
});

module.exports = Auth = mongoose.model('Auth', authSchema);