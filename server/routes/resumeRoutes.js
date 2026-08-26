const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');
const {
  analyzeResume,
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  duplicateResume,
  deleteResume,
} = require('../controllers/resumeController');

router.post('/analyze', upload.single('resume'), analyzeResume);
router.get('/', protect, getResumes);
router.post('/', protect, createResume);
router.get('/:id', protect, getResumeById);
router.put('/:id', protect, updateResume);
router.post('/:id/duplicate', protect, duplicateResume);
router.delete('/:id', protect, deleteResume);

module.exports = router;
