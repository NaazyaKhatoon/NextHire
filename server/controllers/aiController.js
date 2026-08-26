const aiService = require('../services/aiService');

// @desc    Enhance single bullet point
// @route   POST /api/ai/enhance-bullet
const enhanceBullet = async (req, res, next) => {
  try {
    const { bullet, style, targetRole } = req.body;
    const result = await aiService.enhanceBullet({ bullet, style, targetRole });
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

// @desc    Generate summary
// @route   POST /api/ai/generate-summary
const generateSummary = async (req, res, next) => {
  try {
    const { experienceYears, targetRole, skills, background } = req.body;
    const result = await aiService.generateSummary({
      experienceYears,
      targetRole,
      skills,
      background,
    });
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

// @desc    Generate complete resume from wizard
// @route   POST /api/ai/generate-resume
const generateFullResume = async (req, res, next) => {
  try {
    const wizardData = req.body;
    // Assemble resume with summary
    const summaryRes = await aiService.generateSummary({
      experienceYears: wizardData.experienceYears,
      targetRole: wizardData.targetRole,
      skills: wizardData.skills,
    });

    const generatedResume = {
      ...wizardData,
      personalInfo: {
        ...wizardData.personalInfo,
        summary: summaryRes.summary || wizardData.personalInfo?.summary,
      },
      atsScore: 92,
    };

    return res.json({
      success: true,
      resume: generatedResume,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Chat with Career Copilot
// @route   POST /api/ai/chat
const chat = async (req, res, next) => {
  try {
    const { message, history, resumeContext } = req.body;
    const result = await aiService.chatWithCopilot({
      message,
      history,
      resumeContext,
    });
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  enhanceBullet,
  generateSummary,
  generateFullResume,
  chat,
};
