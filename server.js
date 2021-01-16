const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connection to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const usersRoute = require('./routes/users');
const exercisesRoute = require('./routes/exercises');
const authRoute = require('./routes/auth');

app.use('/api/users', usersRoute);
app.use('/api/exercises', exercisesRoute);
app.use('/api/auth', authRoute);

// Serve static assets in production
if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

// Starts the server
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));