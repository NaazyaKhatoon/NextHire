const express = require('express');
const router = express.Router();
const careerController = require('../controllers/careerController');
const { protect } = require('../middleware/authMiddleware');

router.get('/progress', protect, careerController.getCareerProgress);
router.post('/next-action', protect, careerController.getNextBestAction);
router.post('/skill-gap', protect, careerController.getSkillGap);
router.post('/roadmap', protect, careerController.getRoleRoadmap);
router.post('/challenge/complete', protect, careerController.completeChallenge);
router.post('/skill/status', protect, careerController.updateSkillStatus);
router.post('/motivation/save', protect, careerController.saveMotivation);

module.exports = router;
