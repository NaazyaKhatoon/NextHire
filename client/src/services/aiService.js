import api from './api';

export const aiService = {
  // Enhance a single resume bullet point
  async enhanceBullet({ bullet, style = 'achievement', targetRole = 'Software Engineer' }) {
    const res = await api.post('/ai/enhance-bullet', {
      bullet,
      style,
      targetRole,
    });
    return res.data;
  },

  // Generate an executive / professional summary
  async generateSummary({ experienceYears, targetRole, skills, background }) {
    const res = await api.post('/ai/generate-summary', {
      experienceYears,
      targetRole,
      skills,
      background,
    });
    return res.data;
  },

  // Generate a complete structured resume from wizard inputs
  async generateFullResume(wizardData) {
    const res = await api.post('/ai/generate-resume', wizardData);
    return res.data;
  },

  // Career Copilot conversational assistant
  async chatWithCopilot({ message, history = [], resumeContext = null }) {
    const res = await api.post('/ai/chat', {
      message,
      history,
      resumeContext,
    });
    return res.data;
  },

  // Job Matcher analysis
  async matchJob({ resumeText, resumeData, jobDescription, targetRole }) {
    const res = await api.post('/jobs/match', {
      resumeText,
      resumeData,
      jobDescription,
      targetRole,
    });
    return res.data;
  }
};
