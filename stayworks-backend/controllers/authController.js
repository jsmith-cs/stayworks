const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { pool } = require('../config/database');
const User = require('../models/User');

exports.signup = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, dateOfBirth } = req.body;

  try {
    // Log sanitized data only
    console.log('Received signup request for:', {
      firstName,
      lastName,
      email,
      phoneNumber,
      dateOfBirth,
      password: '[REDACTED]'
    });

    // Check if user already exists
    User.findByEmail(email, async (err, existingUser) => {
      if (err) {
        console.error('Error checking for existing user:', err);
        return res.status(500).json({ msg: 'Server error' });
      }

      if (existingUser) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Validate password strength
      const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).json({ msg: 'Password does not meet strength requirements' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      User.create(firstName, lastName, email, phoneNumber, hashedPassword, dateOfBirth, (err, userId) => {
        if (err) {
          console.error('Error creating new user:', err);
          return res.status(500).json({ msg: 'Server error' });
        }

        res.status(201).json({ msg: 'User registered successfully', userId });
      });
    });
  } catch (err) {
    console.error('Error in signup process:', err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const { email } = req.body;

  try {
    // Initial login attempt log
    console.log('Login attempt initiated:', {
      email,
      timestamp: new Date().toISOString()
    });

    // Find user by email
    const userQuery = 'SELECT * FROM Credentials WHERE email = ?';
    pool.execute(userQuery, [email], async (err, results) => {
      if (err) {
        console.error('Error fetching user for login:', err);
        console.log('Login Status: Failed - Database Error');
        return res.status(500).json({ msg: 'Server error' });
      }

      if (results.length === 0) {
        console.log('Login Status: Denied - User Not Found');
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const user = results[0];

      // Compare password
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        console.log('Login Status: Denied - Incorrect Password');
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // Create and sign JWT token
      const payload = { user: { id: user.id } };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (err, token) => {
          if (err) {
            console.error('Error signing token:', err);
            console.log('Login Status: Failed - Token Generation Error');
            throw err;
          }
          console.log('Login Status: Successful');
          res.json({ token });
        }
      );
    });
  } catch (err) {
    console.error('Error in login process:', err.message);
    console.log('Login Status: Failed - Server Error');
    res.status(500).send('Server error');
  }
};