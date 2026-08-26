const { query, isConnected } = require('../config/database');

const inMemoryResumes = [
  {
    _id: 'demo-resume-1',
    id: 'demo-resume-1',
    userId: 'demo-user-123',
    title: 'Senior Software Engineer Resume',
    targetRole: 'Full Stack Software Engineer',
    template: 'tech',
    fresherMode: false,
    atsScore: 88,
    personalInfo: {
      fullName: 'Alex Chen',
      email: 'alex.chen@email.com',
      phone: '(555) 019-2834',
      location: 'San Francisco, CA',
      title: 'Senior Full-Stack Engineer',
      linkedin: 'linkedin.com/in/alexchen-dev',
      github: 'github.com/alexchen',
      website: 'alexchen.dev',
      summary: 'Results-driven Senior Full-Stack Engineer with 5+ years of experience architecting high-scale distributed web applications and microservices. Expert in React, TypeScript, Node.js, Python, PostgreSQL, and AWS.',
    },
    skills: ['React.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS', 'CI/CD'],
    experience: [
      {
        id: '1',
        title: 'Lead Full-Stack Engineer',
        company: 'TechNova Solutions',
        location: 'San Francisco, CA',
        startDate: '2022',
        endDate: 'Present',
        current: true,
        bullets: [
          'Spearheaded the architectural transition of monolithic SaaS platform into decoupled microservices using Node.js and Docker, improving system uptime to 99.98%.',
          'Optimized frontend performance in React and Next.js, decreasing LCP load times by 48% across 500k monthly active users.'
        ]
      }
    ],
    education: [
      {
        id: '1',
        degree: 'Bachelor of Science in Computer Science',
        institution: 'University of California, Berkeley',
        location: 'Berkeley, CA',
        graduationYear: '2020',
        gpa: '3.85 / 4.0'
      }
    ],
    projects: [
      {
        id: '1',
        name: 'CloudScale AI Monitor',
        link: 'github.com/alexchen/cloudscale',
        description: 'Built real-time cloud resource telemetry dashboard in React, FastAPI, and TimescaleDB.'
      }
    ],
    certifications: ['AWS Certified Solutions Architect', 'CKA Kubernetes'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const mapResumeRow = (row) => ({
  _id: row.id,
  id: row.id,
  userId: row.user_id,
  title: row.title,
  targetRole: row.target_role,
  template: row.template,
  fresherMode: row.fresher_mode,
  personalInfo: row.personal_info || {},
  skills: row.skills || [],
  experience: row.experience || [],
  education: row.education || [],
  projects: row.projects || [],
  certifications: row.certifications || [],
  customSections: row.custom_sections || [],
  atsScore: row.ats_score,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

class ResumeModel {
  static async find(criteria = {}) {
    if (isConnected()) {
      const userId = criteria.userId || 'demo-user-123';
      const res = await query('SELECT * FROM resumes WHERE user_id = $1 ORDER BY updated_at DESC', [userId]);
      if (res && res.rows.length > 0) {
        return res.rows.map(mapResumeRow);
      }
    }
    const userId = criteria.userId || 'demo-user-123';
    return inMemoryResumes.filter(r => r.userId === userId || r.userId === 'demo-user-123');
  }

  static async findById(id) {
    if (isConnected()) {
      const res = await query('SELECT * FROM resumes WHERE id = $1 LIMIT 1', [id]);
      if (res && res.rows.length > 0) {
        return mapResumeRow(res.rows[0]);
      }
    }
    return inMemoryResumes.find(r => r._id === id || r.id === id) || inMemoryResumes[0];
  }

  static async create(data) {
    const id = 'resume-' + Date.now();
    if (isConnected()) {
      const res = await query(
        `INSERT INTO resumes (
          id, user_id, title, target_role, template, fresher_mode,
          personal_info, skills, experience, education, projects,
          certifications, custom_sections, ats_score
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        RETURNING *`,
        [
          id,
          data.userId || 'demo-user-123',
          data.title || 'Untitled Resume',
          data.targetRole || 'Software Engineer',
          data.template || 'tech',
          Boolean(data.fresherMode),
          JSON.stringify(data.personalInfo || {}),
          JSON.stringify(data.skills || []),
          JSON.stringify(data.experience || []),
          JSON.stringify(data.education || []),
          JSON.stringify(data.projects || []),
          JSON.stringify(data.certifications || []),
          JSON.stringify(data.customSections || []),
          data.atsScore || 88,
        ]
      );
      if (res && res.rows.length > 0) {
        return mapResumeRow(res.rows[0]);
      }
    }

    const newResume = {
      _id: id,
      id,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    inMemoryResumes.unshift(newResume);
    return newResume;
  }

  static async findByIdAndUpdate(id, data, options = {}) {
    if (isConnected()) {
      const res = await query(
        `UPDATE resumes
         SET title = COALESCE($1, title),
             target_role = COALESCE($2, target_role),
             template = COALESCE($3, template),
             fresher_mode = COALESCE($4, fresher_mode),
             personal_info = COALESCE($5, personal_info),
             skills = COALESCE($6, skills),
             experience = COALESCE($7, experience),
             education = COALESCE($8, education),
             projects = COALESCE($9, projects),
             certifications = COALESCE($10, certifications),
             ats_score = COALESCE($11, ats_score),
             updated_at = NOW()
         WHERE id = $12
         RETURNING *`,
        [
          data.title || null,
          data.targetRole || null,
          data.template || null,
          data.fresherMode !== undefined ? Boolean(data.fresherMode) : null,
          data.personalInfo ? JSON.stringify(data.personalInfo) : null,
          data.skills ? JSON.stringify(data.skills) : null,
          data.experience ? JSON.stringify(data.experience) : null,
          data.education ? JSON.stringify(data.education) : null,
          data.projects ? JSON.stringify(data.projects) : null,
          data.certifications ? JSON.stringify(data.certifications) : null,
          data.atsScore || null,
          id,
        ]
      );
      if (res && res.rows.length > 0) {
        return mapResumeRow(res.rows[0]);
      }
    }

    const idx = inMemoryResumes.findIndex(r => r._id === id || r.id === id);
    if (idx !== -1) {
      inMemoryResumes[idx] = { ...inMemoryResumes[idx], ...data, updatedAt: new Date() };
      return inMemoryResumes[idx];
    }
    return inMemoryResumes[0];
  }

  static async findByIdAndDelete(id) {
    if (isConnected()) {
      const res = await query('DELETE FROM resumes WHERE id = $1 RETURNING *', [id]);
      if (res && res.rows.length > 0) {
        return mapResumeRow(res.rows[0]);
      }
    }
    const idx = inMemoryResumes.findIndex(r => r._id === id || r.id === id);
    if (idx !== -1) {
      return inMemoryResumes.splice(idx, 1)[0];
    }
    return null;
  }
}

module.exports = {
  ResumeModel,
  inMemoryResumes,
};
