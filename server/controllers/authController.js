const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserModel, inMemoryUsers } = require('../models/User');
const { isConnected } = require('../config/database');

const JWT_SECRET = process.env.JWT_SECRET || 'resumeai_production_jwt_secret_key_2026_x99';

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
const signup = async (req, res, next) => {
  try {
    const { name, email, password, targetRole } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (isConnected()) {
      const userExists = await UserModel.findOne({ email });
      if (userExists) {
        return res.status(400).json({ success: false, message: 'Email already registered' });
      }

      const user = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        targetRole: targetRole || 'Software Engineer',
      });

      return res.status(201).json({
        success: true,
        token: generateToken(user._id),
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          targetRole: user.targetRole,
        },
      });
    } else {
      // In-Memory Mode
      const userExists = inMemoryUsers.find((u) => u.email === email);
      if (userExists) {
        return res.status(400).json({ success: false, message: 'Email already registered' });
      }

      const newUser = {
        _id: 'user-' + Date.now(),
        name,
        email,
        password: hashedPassword,
        targetRole: targetRole || 'Software Engineer',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      inMemoryUsers.push(newUser);

      return res.status(201).json({
        success: true,
        token: generateToken(newUser._id),
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          targetRole: newUser.targetRole,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    if (isConnected()) {
      const user = await UserModel.findOne({ email });
      if (user && (await bcrypt.compare(password, user.password))) {
        return res.json({
          success: true,
          token: generateToken(user._id),
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            targetRole: user.targetRole,
          },
        });
      }
    } else {
      const user = inMemoryUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
      if (user) {
        return res.json({
          success: true,
          token: generateToken(user._id),
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            targetRole: user.targetRole,
          },
        });
      }
    }

    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (error) {
    next(error);
  }
};

// @desc    Instant Demo login bypass
// @route   POST /api/auth/demo-login
const demoLogin = async (req, res) => {
  const demoUser = inMemoryUsers[0];
  return res.json({
    success: true,
    token: generateToken(demoUser._id),
    user: {
      _id: demoUser._id,
      name: demoUser.name,
      email: demoUser.email,
      targetRole: demoUser.targetRole,
      isDemo: true,
    },
  });
};

// @desc    Get current user profile
// @route   GET /api/auth/me
const getMe = async (req, res) => {
  return res.json({
    success: true,
    user: req.user,
  });
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
const updateProfile = async (req, res, next) => {
  try {
    const { name, targetRole } = req.body;
    if (req.user) {
      req.user.name = name || req.user.name;
      req.user.targetRole = targetRole || req.user.targetRole;
    }
    return res.json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  demoLogin,
  getMe,
  updateProfile,
};
