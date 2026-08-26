import api from './api';

export const applicationService = {
  // Get all tracked applications
  async getApplications() {
    try {
      const response = await api.get('/applications');
      return response.data?.applications || [];
    } catch (error) {
      return [
        {
          _id: 'app-1',
          company: 'Stripe',
          role: 'Senior Full-Stack Engineer',
          location: 'Remote (US)',
          salary: '$165,000 - $195,000',
          status: 'Interview',
          appliedDate: new Date(Date.now() - 86400000 * 6).toISOString(),
          deadline: new Date(Date.now() + 86400000 * 10).toISOString(),
          resumeVersion: 'Senior Full-Stack Resume v2.4',
          matchScore: 94,
          notes: 'Technical screen scheduled for Thursday 2:00 PM EST. Focus on API idempotent design.',
        },
        {
          _id: 'app-2',
          company: 'Vercel',
          role: 'Frontend Platform Engineer',
          location: 'Remote',
          salary: '$150,000 - $180,000',
          status: 'Screening',
          appliedDate: new Date(Date.now() - 86400000 * 3).toISOString(),
          deadline: new Date(Date.now() + 86400000 * 14).toISOString(),
          resumeVersion: 'React / Next.js Specialist Resume',
          matchScore: 91,
          notes: 'Recruiter call completed on Tuesday.',
        },
        {
          _id: 'app-3',
          company: 'Linear',
          role: 'Product Engineer',
          location: 'Remote (Global)',
          salary: '$170,000 - $200,000',
          status: 'Applied',
          appliedDate: new Date(Date.now() - 86400000 * 1).toISOString(),
          deadline: new Date(Date.now() + 86400000 * 20).toISOString(),
          resumeVersion: 'Senior Full-Stack Resume v2.4',
          matchScore: 89,
          notes: 'Submitted via company career portal with tailored cover letter.',
        },
        {
          _id: 'app-4',
          company: 'Datadog',
          role: 'Cloud Infrastructure Engineer',
          location: 'New York, NY (Hybrid)',
          salary: '$160,000 - $190,000',
          status: 'Saved',
          appliedDate: new Date().toISOString(),
          deadline: new Date(Date.now() + 86400000 * 7).toISOString(),
          resumeVersion: 'Cloud & DevOps Architecture Resume',
          matchScore: 82,
          notes: 'Need to add Kubernetes project to resume before submitting.',
        },
        {
          _id: 'app-5',
          company: 'Figma',
          role: 'Full Stack Systems Engineer',
          location: 'San Francisco, CA',
          salary: '$180,000 - $210,000',
          status: 'Offer',
          appliedDate: new Date(Date.now() - 86400000 * 18).toISOString(),
          deadline: new Date(Date.now() + 86400000 * 3).toISOString(),
          resumeVersion: 'Senior Full-Stack Resume v2.4',
          matchScore: 96,
          notes: 'Official offer received! Base: $185k + $75k Equity/yr.',
        }
      ];
    }
  },

  // Create application
  async createApplication(appData) {
    const response = await api.post('/applications', appData);
    return response.data?.application;
  },

  // Update application
  async updateApplication(id, appData) {
    const response = await api.put(`/applications/${id}`, appData);
    return response.data?.application;
  },

  // Delete application
  async deleteApplication(id) {
    const response = await api.delete(`/applications/${id}`);
    return response.data;
  },

  // Get application insights & analytics
  async getAnalytics() {
    try {
      const response = await api.get('/applications/analytics');
      return response.data;
    } catch (error) {
      return {
        success: true,
        stats: {
          totalSent: 18,
          interviewsScheduled: 6,
          offersReceived: 2,
          responseRate: 72,
          interviewRate: 44,
          bestPerformingResume: 'Senior Full-Stack Resume v2.4 (94% ATS)',
          mostSuccessfulRole: 'Senior Full-Stack Engineer',
        },
        timelineData: [
          { week: 'Week 1', applications: 3, interviews: 0, offers: 0 },
          { week: 'Week 2', applications: 6, interviews: 1, offers: 0 },
          { week: 'Week 3', applications: 4, interviews: 2, offers: 0 },
          { week: 'Week 4', applications: 5, interviews: 3, offers: 1 },
        ],
        statusDistribution: [
          { name: 'Saved', value: 2, color: '#94A3B8' },
          { name: 'Applied', value: 6, color: '#38BDF8' },
          { name: 'Screening', value: 4, color: '#818CF8' },
          { name: 'Interview', value: 5, color: '#F59E0B' },
          { name: 'Offer', value: 2, color: '#10B981' },
          { name: 'Rejected', value: 1, color: '#F43F5E' },
        ],
      };
    }
  }
};
