const { ResumeModel, inMemoryResumes } = require('../models/Resume');
const { AnalysisModel } = require('../models/Analysis');
const { isConnected } = require('../config/database');
const resumeParser = require('../services/resumeParser');
const aiService = require('../services/aiService');

// @desc    Analyze resume (File or Text)
// @route   POST /api/resume/analyze
const analyzeResume = async (req, res, next) => {
  try {
    let extractedText = req.body.text || '';
    const targetRole = req.body.targetRole || req.user?.targetRole || 'Software Engineer';
    const jobDescription = req.body.jobDescription || '';

    // If uploaded file is present in req.file
    if (req.file) {
      extractedText = await resumeParser.extractText(
        req.file.buffer,
        req.file.originalname
      );
    }

    if (!extractedText.trim()) {
      return res.status(400).json({
        success: false,
        message: 'No readable text could be extracted. Please paste your resume text.',
      });
    }

    // Call AI analysis engine
    const analysisResult = await aiService.analyzeResume({
      text: extractedText,
      targetRole,
      jobDescription,
      fileName: req.file?.originalname || 'resume.txt',
    });

    return res.json({
      success: true,
      ...analysisResult,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all resumes for current user
// @route   GET /api/resume
const getResumes = async (req, res, next) => {
  try {
    const userId = req.user?._id || 'demo-user-123';

    if (isConnected()) {
      const resumes = await ResumeModel.find({ userId }).sort({ updatedAt: -1 });
      return res.json(resumes.length > 0 ? resumes : inMemoryResumes);
    } else {
      const resumes = inMemoryResumes.filter(
        (r) => r.userId === userId || r.userId === 'demo-user-123'
      );
      return res.json(resumes);
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Get single resume by ID
// @route   GET /api/resume/:id
const getResumeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isConnected()) {
      const resume = await ResumeModel.findById(id);
      if (resume) return res.json(resume);
    }

    const found = inMemoryResumes.find((r) => r._id === id) || inMemoryResumes[0];
    return res.json(found);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new resume
// @route   POST /api/resume
const createResume = async (req, res, next) => {
  try {
    const userId = req.user?._id || 'demo-user-123';
    const resumeData = {
      ...req.body,
      userId,
    };

    if (isConnected()) {
      const resume = await ResumeModel.create(resumeData);
      return res.status(201).json(resume);
    } else {
      const newResume = {
        _id: 'resume-' + Date.now(),
        ...resumeData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      inMemoryResumes.unshift(newResume);
      return res.status(201).json(newResume);
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update existing resume
// @route   PUT /api/resume/:id
const updateResume = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isConnected()) {
      const updated = await ResumeModel.findByIdAndUpdate(id, req.body, { new: true });
      if (updated) return res.json(updated);
    }

    const index = inMemoryResumes.findIndex((r) => r._id === id);
    if (index !== -1) {
      inMemoryResumes[index] = {
        ...inMemoryResumes[index],
        ...req.body,
        updatedAt: new Date(),
      };
      return res.json(inMemoryResumes[index]);
    }

    return res.json(inMemoryResumes[0]);
  } catch (error) {
    next(error);
  }
};

// @desc    Duplicate resume
// @route   POST /api/resume/:id/duplicate
const duplicateResume = async (req, res, next) => {
  try {
    const { id } = req.params;
    let original = inMemoryResumes.find((r) => r._id === id) || inMemoryResumes[0];

    const cloned = {
      ...JSON.parse(JSON.stringify(original)),
      _id: 'resume-' + Date.now(),
      title: `${original.title} (Copy)`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    inMemoryResumes.unshift(cloned);
    return res.json(cloned);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete resume
// @route   DELETE /api/resume/:id
const deleteResume = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isConnected()) {
      await ResumeModel.findByIdAndDelete(id);
    }

    const idx = inMemoryResumes.findIndex((r) => r._id === id);
    if (idx !== -1) inMemoryResumes.splice(idx, 1);

    return res.json({ success: true, message: 'Resume deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  analyzeResume,
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  duplicateResume,
  deleteResume,
};
