const express = require('express');
const router = express.Router();
const { signup, login, demoLogin, getMe, updateProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.post('/demo-login', demoLogin);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);
router.post('/logout', (req, res) => res.json({ success: true, message: 'Logged out' }));

module.exports = router;
