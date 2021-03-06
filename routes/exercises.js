const express = require('express');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const Exercises = require('../models/Exercise');
const User = require('../models/User');

// @route   GET /api/exercises
// @desc    Get all exercises or only select users
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    let exercises;
    // if there are any query params
    if(req.query.users) {
      // Returns only selected users by ids
      const users = req.query.users.split('--');
      exercises = await Exercises.find({
        'user': {
          $in: users.map(id => mongoose.Types.ObjectId(id))
        }
      })
    } else {
      // Returns all objects
      exercises = await Exercises.find();
    }
    return res.json(exercises);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/exercises/:id
// @desc    Get all exercises
// @access  Public
router.get('/:id', auth, async (req, res) => {
  try {
    const users = req.query.users;
    const exercise = await Exercises.findById(req.params.id);
    return res.json(exercise);
  } catch (error) {
    res.status(500).send('Server Error');
  }
})

// @route   POST /api/exercises/create
// @desc    Create a new exercise
// @access  Public
router.post('/create', [
  auth,
  [
    check('description', 'Description field cannot be empty').not().isEmpty(),
    check('date', 'Date input is not a valid date').isDate({ format: 'YYYY-MM-DD' }),
    check('duration', 'Duration cannot be empty').not().isEmpty(),
    check('duration', 'Duration must be a number in minutes').isInt()
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, description, duration, date } = req.body;

    // Retrieves Object ID of user
    const user = await User.findOne({ username });
    if(user === null) {
      return res.status(403).json({ msg: "This user does not exist" });
    }

    const newExercise = new Exercises({ user: user._id, username: user.username, description, duration, date });
    newExercise.save();
    return res.json(newExercise);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @route   DELETE /api/exercises/:id
// @desc    Delete an exercise
// @access  Public
router.delete('/:id', auth, async (req, res) => {
  try {
    const exercise = await Exercises.findById(req.params.id);
    exercise.remove();
    return res.json({ msg: "Successfully Deleted!", exercise });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

// @route   PUT /api/exercises/:id
// @desc    Edit an exercise
// @access  Public
router.put('/:id', [
  auth,
  [
    check('description', 'Description field cannot be empty').not().isEmpty(),
    check('date', 'Date input is not a valid date').isDate({ format: 'YYYY-MM-DD' }),
    check('duration', 'Duration cannot be empty').not().isEmpty(),
    check('duration', 'Duration must be a number in minutes').isInt()
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

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