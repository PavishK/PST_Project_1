const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = 'your_jwt_secret';

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).send('User registered');
  } catch (err) {
    res.status(500).send('Error registering user');
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt:', { email, password });

  try {
    const user = await User.findOne({ email });
    console.log('User found:', user);

    if (!user) {
      return res.status(401).send('Invalid credentials');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', passwordMatch);

    if (!passwordMatch) {
      return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    console.log('Token generated:', token);
    res.json({ token,email });
  } catch (err) {
    console.error('Error logging in:', err);
    res.status(500).send('Error logging in');
  }
});

module.exports = router;
