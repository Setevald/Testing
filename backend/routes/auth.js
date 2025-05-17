const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();
// Store hashedPassword in the database
const bcrypt = require('bcrypt');
const hashedPassword = await bcrypt.hash(password, 10);
  

const isMatch = await bcrypt.compare(enteredPassword, storedHashedPassword);
  if (!isMatch) {
    // Handle incorrect password
  }
router.post('/register', register); // POST /api/auth/register
router.post('/login', login);       // POST /api/auth/login

module.exports = router;
