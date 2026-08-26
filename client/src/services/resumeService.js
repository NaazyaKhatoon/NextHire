import api from './api';

export const resumeService = {
  // Analyze a resume file or text
  async analyzeResume({ file, text, targetRole, jobDescription }) {
    if (file) {
      const formData = new FormData();
      formData.append('resume', file);
      if (targetRole) formData.append('targetRole', targetRole);
      if (jobDescription) formData.append('jobDescription', jobDescription);
      
      const res = await api.post('/resume/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } else {
      const res = await api.post('/resume/analyze', {
        text,
        targetRole,
        jobDescription,
      });
      return res.data;
    }
  },

  // Fetch user resumes
  async getResumes() {
    const res = await api.get('/resume');
    return res.data;
  },

  // Get specific resume by ID
  async getResumeById(id) {
    const res = await api.get(`/resume/${id}`);
    return res.data;
  },

  // Create or save a new resume
  async createResume(resumeData) {
    const res = await api.post('/resume', resumeData);
    return res.data;
  },

  // Update existing resume
  async updateResume(id, resumeData) {
    const res = await api.put(`/resume/${id}`, resumeData);
    return res.data;
  },

  // Duplicate resume
  async duplicateResume(id) {
    const res = await api.post(`/resume/${id}/duplicate`);
    return res.data;
  },

  // Delete resume
  async deleteResume(id) {
    const res = await api.delete(`/resume/${id}`);
    return res.data;
  },

  // Get analysis history
  async getAnalysis(id) {
    const res = await api.get(`/analysis/${id}`);
    return res.data;
  }
};
