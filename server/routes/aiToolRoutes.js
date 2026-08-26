const express = require('express');
const router = express.Router();
const aiToolController = require('../controllers/aiToolController');
const { protect } = require('../middleware/authMiddleware');

router.post('/truth-check', protect, aiToolController.truthCheck);
router.post('/achievement-discovery', protect, aiToolController.discoverAchievements);
router.post('/project-analysis', protect, aiToolController.analyzeProject);
router.post('/hackathon-converter', protect, aiToolController.convertHackathon);
router.post('/portfolio-generator', protect, aiToolController.generatePortfolioContent);
router.post('/linkedin-analysis', protect, aiToolController.analyzeLinkedIn);
router.post('/resume-ab-test', protect, aiToolController.abTestResumes);
router.post('/resume-cleanup', protect, aiToolController.cleanupResume);
router.post('/one-page', protect, aiToolController.fitToOnePage);

module.exports = router;
