const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User');

// @route   GET api/users
// @desc    Get all users
// @access  Public
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/users/create
// @desc    Create a new user
// @access  Public
router.post('/create',[
  check('username', 'Username has to be 3 or higher characters').isLength({ min: 3 })
], async (req, res) => {
  // Error checking
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Checks if user is already created
    const isExist = await User.findOne({ username: req.body.username });
    if(isExist !== null) {
      return res.status(403).json({ msg: "Username already taken" });
    }

    const newUser = new User({
      username: req.body.username
    });

    await newUser.save();
    return res.json({ msg: "User Created", user: newUser });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/users/:id
// @desc    Delete a user
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user.remove();
    res.json({ msg: "Successfully Removed User", user });
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/users/:id
// @desc    Edit a user
// @access  Public
router.put('/:id', [
  check('username', 'Username has to be 3 or higher characters').isLength({ min: 3 })
], async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
  }

  try {
    const newUser = { username: req.body.username }
    const user = await User.findOneAndUpdate({ _id: req.params.id }, newUser, { new: true });

    return res.json({ msg: "Successfully Updated", user });
    
  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;