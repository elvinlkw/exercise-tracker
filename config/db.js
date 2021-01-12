const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = () => {
  const uri = process.env.ATLAS_URI;

  mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    console.log('MongoDB Connected!');
  });
}

module.exports = connectDB;