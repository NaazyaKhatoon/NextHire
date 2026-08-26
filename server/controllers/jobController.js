const aiService = require('../services/aiService');

// @desc    Match job description against resume
// @route   POST /api/jobs/match
const matchJob = async (req, res, next) => {
  try {
    const { resumeText, resumeData, jobDescription, targetRole } = req.body;
    const result = await aiService.matchJob({
      resumeText,
      resumeData,
      jobDescription,
      targetRole,
    });
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  matchJob,
};
