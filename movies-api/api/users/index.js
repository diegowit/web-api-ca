import express from 'express';
import User from './userModel.js';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
const router = express.Router(); // eslint-disable-line


// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

//.... code as before

// register(Create)/Authenticate User
router.post('/', asyncHandler(async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ success: false, msg: 'Username and password are required.' });
        }
        if (req.query.action === 'register') {
            await registerUser(req, res);
        } else {
            await authenticateUser(req, res);
        }
    } catch (error) {
        // Log the error and return a generic error message
        console.error(error);
        res.status(500).json({ success: false, msg: 'Internal server error.' });
    }
}));

const strongPasswordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;


const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!strongPasswordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        msg:
          'Password must be at least 8 characters long and contain a letter, a number, and a special character'
      });
    }

    const user = new User({ username, password });
    await user.save();

    return res.status(201).json({
      success: true,
      msg: 'Successful created new user'
    });
  } catch (err) {
    // Duplicate username
    if (err.code === 11000) {
      return res.status(409).json({ success: false, msg: 'Username already exists' });
    }
    return res.status(500).json({ success: false, msg: err.message });
  }
};

async function authenticateUser(req, res) {
    const user = await User.findByUserName(req.body.username);
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Authentication failed. User not found.' });
    }

    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
        const token = jwt.sign({ username: user.username }, process.env.SECRET);
        res.status(200).json({ success: true, token: 'BEARER ' + token });
    } else {
        res.status(401).json({ success: false, msg: 'Wrong password.' });
    }
}



export default router;
