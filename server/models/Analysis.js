const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    resumeId: {
      type: String,
    },
    targetRole: {
      type: String,
      default: 'Software Engineer',
    },
    atsScore: {
      type: Number,
      required: true,
    },
    keywordScore: Number,
    skillsScore: Number,
    formattingScore: Number,
    readabilityScore: Number,
    impactScore: Number,
    sectionScore: Number,
    applicationReadinessScore: Number,
    readabilityLevel: String,
    detectedSkills: [String],
    missingSkills: [String],
    missingKeywords: [String],
    strengths: [String],
    weaknesses: [String],
    formattingProblems: [String],
    recommendations: [
      {
        category: String,
        type: String,
        problem: String,
        whyItMatters: String,
        suggestedImprovement: String,
        sampleOriginal: String,
        sampleImproved: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

let AnalysisModel;
try {
  AnalysisModel = mongoose.model('Analysis', analysisSchema);
} catch {
  AnalysisModel = mongoose.model('Analysis');
}

module.exports = {
  AnalysisModel,
};
