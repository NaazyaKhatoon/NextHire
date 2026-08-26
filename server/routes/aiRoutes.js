const express = require('express');
const router = express.Router();
const {
  enhanceBullet,
  generateSummary,
  generateFullResume,
  chat,
} = require('../controllers/aiController');

router.post('/enhance-bullet', enhanceBullet);
router.post('/generate-summary', generateSummary);
router.post('/generate-resume', generateFullResume);
router.post('/chat', chat);

module.exports = router;
