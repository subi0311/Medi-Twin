// // const express = require('express');
// // const bcrypt = require('bcryptjs');
// // const jwt = require('jsonwebtoken');
// // const User = require('../models/user');
// // const router = express.Router();

// // // Signup
// // router.post('/signup', async (req, res) => {
// //   try {
// //     const { name, email, password, role } = req.body;

// //     const exist = await User.findOne({ email });
// //     if (exist) {
// //       return res.status(400).json({ msg: 'Email already exists' });
// //     }

// //     const salt = await bcrypt.genSalt(10);
// //     const hash = await bcrypt.hash(password, salt);

// //     const user = await User.create({
// //       name,
// //       email,
// //       password: hash,
// //       role
// //     });

// //     res.json({ userId: user._id });
// //   } catch (err) {
// //     res.status(500).json({ err: err.message });
// //   }
// // });

// // // Login
// // router.post('/login', async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     const user = await User.findOne({ email });
// //     if (!user) {
// //       return res.status(400).json({ msg: 'Invalid credentials' });
// //     }

// //     const ok = await bcrypt.compare(password, user.password);
// //     if (!ok) {
// //       return res.status(400).json({ msg: 'Invalid credentials' });
// //     }

// //     const token = jwt.sign(
// //       { id: user._id, role: user.role },
// //       process.env.JWT_SECRET,
// //       { expiresIn: '7d' }
// //     );

// //     res.json({
// //       token,
// //       userId: user._id,
// //       role: user.role
// //     });
// //   } catch (err) {
// //     res.status(500).json({ err: err.message });
// //   }
// // });

// // module.exports = router;



// const express = require('express');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/user');
// const router = express.Router();

// // -------------------- SIGNUP --------------------
// router.post('/signup', async (req, res) => {
//   try {
//     const { name, email, password, role } = req.body;

//     // Validate required fields
//     if (!name || !email || !password) {
//       return res.status(400).json({ msg: 'Name, email, and password are required' });
//     }

//     // Check if user already exists
//     const exist = await User.findOne({ email });
//     if (exist) {
//       return res.status(400).json({ msg: 'Email already exists' });
//     }

//     // Hash password
//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);

//     // Create user
//     const user = await User.create({
//       name,
//       email,
//       password: hash,
//       role: role || 'user' // default role = 'user' if not provided
//     });

//     res.status(201).json({ 
//       msg: 'User created successfully', 
//       userId: user._id 
//     });

//   } catch (err) {
//     console.error('Signup error:', err);
//     res.status(500).json({ msg: 'Server error', error: err.message });
//   }
// });

// // -------------------- LOGIN --------------------
// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate required fields
//     if (!email || !password) {
//       return res.status(400).json({ msg: 'Email and password are required' });
//     }

//     // Find user
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     // Compare password
//     const ok = await bcrypt.compare(password, user.password);
//     if (!ok) {
//       return res.status(400).json({ msg: 'Invalid credentials' });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '7d' }
//     );

//     res.status(200).json({
//       msg: 'Login successful',
//       token,
//       userId: user._id,
//       role: user.role
//     });

//   } catch (err) {
//     console.error('Login error:', err);
//     res.status(500).json({ msg: 'Server error', error: err.message });
//   }
// });

// module.exports = router;


const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// -------------------- SIGNUP --------------------
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({ msg: 'Name, email, and password are required' });
    }

    // Check if user exists
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ msg: 'Email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hash,
      role: 'patient' // ✅ matches enum in User model
    });

    res.status(201).json({ msg: 'User created successfully', userId: user._id });

  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// -------------------- LOGIN --------------------
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({ msg: 'Login successful', token, userId: user._id, role: user.role });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;


