const express = require('express');
const router = express.Router();
const Exercises = require('../models/Exercise');
const { findOne } = require('../models/User');
const User = require('../models/User');

// @route   GET /api/exercise
// @desc    Get all exercises
// @access  Public
router.get('/', async (req, res) => {
  try {
  const exercises = await Exercises.find();
  return res.json(exercises);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/exercise/create
// @desc    Create a new exercise
// @access  Public
router.post('/create', async (req, res) => {
  try {
    const { username, description, duration, date } = req.body;

    // Retrieves Object ID of user
    const user = await User.findOne({ username });
    if(user === null) {
      return res.status(403).json({ msg: "This user does not exist" });
    }

    const newExercise = new Exercises({ user: user._id, username: user.username, description, duration, date });
    newExercise.save();
    return res.json({ msg: "Successfully posted Exercise", exercise: newExercise });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @route   DELETE /api/exercise/:id
// @desc    Delete an exercise
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const exercise = await Exercises.findById(req.params.id);
    exercise.remove();
    return res.json({ msg: "Successfully Deleted!", exercise });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @route   PUT /api/exercise/:id
// @desc    Edit an exercise
// @access  Public
router.put('/:id', async (req, res) => {
  const { username, description, duration, date } = req.body;

  try {
    // Checks if User exist
    const user = await User.findOne({ username });
    if(user === null) {
      return res.status(403).json({ msg: "This user does not exist" });
    }

    const newExercise = { 
      user: user._id,
      username: user.username,
      description, 
      duration: Number(duration),
      date: Date.parse(date) }

    const exercise = await Exercises.findOneAndUpdate({ _id: req.params.id }, newExercise, { new: true } );
    return res.json({ msg: "Successfully Edited!", exercise });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;