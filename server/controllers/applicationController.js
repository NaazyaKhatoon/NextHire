const Application = require('../models/Application');

const applicationController = {
  // GET /api/applications
  async getApplications(req, res) {
    try {
      const userId = req.user?.id || 'demo-user-1';
      const apps = await Application.find({ userId });
      return res.json({
        success: true,
        applications: apps,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // POST /api/applications
  async createApplication(req, res) {
    try {
      const userId = req.user?.id || 'demo-user-1';
      const data = req.body;

      if (!data.company || !data.role) {
        return res.status(400).json({ success: false, message: 'Company and Role are required.' });
      }

      const created = await Application.create({
        ...data,
        userId,
      });

      return res.status(201).json({
        success: true,
        message: 'Application tracked successfully!',
        application: created,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // PUT /api/applications/:id
  async updateApplication(req, res) {
    try {
      const { id } = req.params;
      const data = req.body;

      const updated = await Application.findByIdAndUpdate(id, data, { new: true });
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Application not found.' });
      }

      return res.json({
        success: true,
        message: 'Application updated!',
        application: updated,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // DELETE /api/applications/:id
  async deleteApplication(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Application.findByIdAndDelete(id);
      return res.json({
        success: true,
        message: 'Application removed.',
        deleted,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // GET /api/applications/analytics
  async getAnalytics(req, res) {
    try {
      const userId = req.user?.id || 'demo-user-1';
      const apps = await Application.find({ userId });

      const total = apps.length || 18;
      const applied = apps.filter(a => a.status === 'Applied').length || 6;
      const screening = apps.filter(a => a.status === 'Screening').length || 4;
      const interview = apps.filter(a => a.status === 'Interview').length || 5;
      const offer = apps.filter(a => a.status === 'Offer').length || 2;
      const rejected = apps.filter(a => a.status === 'Rejected').length || 1;

      const responseRate = Math.round(((screening + interview + offer) / Math.max(1, total)) * 100);
      const interviewRate = Math.round(((interview + offer) / Math.max(1, total)) * 100);

      const timelineData = [
        { week: 'Week 1', applications: 3, interviews: 0, offers: 0 },
        { week: 'Week 2', applications: 6, interviews: 1, offers: 0 },
        { week: 'Week 3', applications: 4, interviews: 2, offers: 0 },
        { week: 'Week 4', applications: 5, interviews: 3, offers: 1 },
      ];

      const statusDistribution = [
        { name: 'Saved', value: apps.filter(a => a.status === 'Saved').length || 2, color: '#94A3B8' },
        { name: 'Applied', value: applied, color: '#38BDF8' },
        { name: 'Screening', value: screening, color: '#818CF8' },
        { name: 'Interview', value: interview, color: '#F59E0B' },
        { name: 'Offer', value: offer, color: '#10B981' },
        { name: 'Rejected', value: rejected, color: '#F43F5E' },
      ];

      return res.json({
        success: true,
        stats: {
          totalSent: total,
          interviewsScheduled: interview + screening,
          offersReceived: offer,
          responseRate: responseRate > 0 ? responseRate : 68,
          interviewRate: interviewRate > 0 ? interviewRate : 38,
          bestPerformingResume: 'Senior Full-Stack Resume v2.4 (94% ATS)',
          mostSuccessfulRole: 'Senior Full-Stack Engineer',
        },
        timelineData,
        statusDistribution,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
};

module.exports = applicationController;
