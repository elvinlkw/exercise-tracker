const express = require('express');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const auth = require('../middleware/auth');
const Auth = require('../models/Auth');

// @route   GET /api/auth
// @desc    Get logged in user
// @access  Public
router.get('/', auth, async (req, res) => {
  try {
    const user = await Auth.findById(req.user.id).select('-password');
    return res.json(user);
  } catch (error) {
    return res.status(500).send('Server Error');
  }
});

// @route   POST /api/auth/login
// @desc    Authenticate User and Get Token
// @access  Public
router.post('/login', [
  check('email', 'Requires a valid Email').isEmail(),
  check('password', 'Password is required').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });

    // not valid email
    if(!user) {
      return res.status(400).json({ errors: [{ msg: 'Incorrect Email or Password' }] });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Incorrect Email or Password' }] });
    }

    // Generate Token
    const payload = {
      user: {
        id: user._id
      }
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600000 },
      (err, token) => {
        if(err) throw err;
          return res.status(200).json(token);
      }
    )
  } catch (error) {
    return res.status(500).send('Server Error');
  }
});

// @route   POST /api/auth/change-password
// @desc    Update Password
// @access  Private
router.post('/change-password', [
  auth,
  [
    check('old_password', 'Current password is a required field').exists(),
    check('new_password', 'New password is a required field').exists(),
    check('new_password', 'Password needs to be at least 6 characters').isLength({ min: 6 })
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errrors: errors.array() });
  }

  try {
    const { old_password, new_password } = req.body;
    const user = await Auth.findById(req.user.id);

    // Check Password Match
    const isMatch = await bcrypt.compare(old_password, user.password);
    if(!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Current Password do not match' }] });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(new_password, salt);

    user.password = hash;
    await user.save();

    res.json(user);
  } catch (error) {
    res.status(500).json('Server Error');
  }
});

// @route   POST /api/auth
// @desc    Register a User
// @access  Public
router.post('/', [
  check('email', 'Input a valid email').isEmail(),
  check('password', 'Password needs to be at least 6 characters').isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    // Checks for duplicate email
    const isExist = await Auth.findOne({ email });
    if(isExist) {
      return res.status(400).json({ errors: [{ msg: "Email already exist" }] })
    }

    // Create new user
    const newUser = {
      email,
      password
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    // Store in DB
    const user = new Auth(newUser);
    await user.save();
    
    // Login user to get token
    const payload = {
      user: {
        id: user._id
      }
    }

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 3600000 },
      (err, token) => {
        if(err) throw err;
        res.status(200).json(token);
      }
    )
  } catch(error) {
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/auth/:id
// @desc    Delete a user
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    // Checks if looged in user and requested for deletion user are the same
    if(req.params.id !== req.user.id) {
      return res.status(403).json({ msg: "You are not allowed to perform this operation" });
    }

    await Auth.findByIdAndRemove(req.params.id);
    res.json({ msg: "Successfully Deleted" });

  } catch (error) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;