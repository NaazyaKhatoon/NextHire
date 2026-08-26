const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, applicationController.getApplications);
router.post('/', protect, applicationController.createApplication);
router.put('/:id', protect, applicationController.updateApplication);
router.delete('/:id', protect, applicationController.deleteApplication);
router.get('/analytics', protect, applicationController.getAnalytics);

module.exports = router;
