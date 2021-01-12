const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
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

app.use('/api/users', usersRoute);
app.use('/api/exercises', exercisesRoute);

// Starts the server
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));