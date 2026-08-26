const express = require('express');
const router = express.Router();
const interviewController = require('../controllers/interviewController');
const { protect } = require('../middleware/authMiddleware');

router.post('/generate', protect, interviewController.generateQuestions);
router.post('/evaluate', protect, interviewController.evaluateAnswer);
router.post('/mock', protect, interviewController.saveMockSession);
router.get('/sessions', protect, interviewController.getSessions);

module.exports = router;
