const { query, isConnected } = require('../config/database');

const inMemoryApplications = [
  {
    _id: 'app-1',
    id: 'app-1',
    userId: 'demo-user-1',
    company: 'Stripe',
    role: 'Senior Full-Stack Engineer',
    location: 'Remote (US)',
    salary: '$165,000 - $195,000',
    jobDescription: 'Seeking React, Node.js, and distributed payments systems engineer.',
    status: 'Interview',
    appliedDate: new Date(Date.now() - 86400000 * 6),
    deadline: new Date(Date.now() + 86400000 * 10),
    resumeVersion: 'Senior Full-Stack Resume v2.4',
    matchScore: 94,
    notes: 'Technical screen scheduled for Thursday 2:00 PM EST. Focus on API idempotent design.',
    interviewDate: new Date(Date.now() + 86400000 * 2),
    createdAt: new Date(Date.now() - 86400000 * 6),
    updatedAt: new Date(Date.now() - 86400000 * 1),
  },
  {
    _id: 'app-2',
    id: 'app-2',
    userId: 'demo-user-1',
    company: 'Vercel',
    role: 'Frontend Platform Engineer',
    location: 'Remote',
    salary: '$150,000 - $180,000',
    jobDescription: 'Build next-generation developer tooling with Next.js and Edge runtime.',
    status: 'Screening',
    appliedDate: new Date(Date.now() - 86400000 * 3),
    deadline: new Date(Date.now() + 86400000 * 14),
    resumeVersion: 'React / Next.js Specialist Resume',
    matchScore: 91,
    notes: 'Recruiter reached out on LinkedIn. Recruiter call completed on Tuesday.',
    createdAt: new Date(Date.now() - 86400000 * 3),
    updatedAt: new Date(Date.now() - 86400000 * 1),
  },
  {
    _id: 'app-3',
    id: 'app-3',
    userId: 'demo-user-1',
    company: 'Linear',
    role: 'Product Engineer',
    location: 'Remote (Global)',
    salary: '$170,000 - $200,000',
    jobDescription: 'Craft lightning-fast desktop-grade web applications.',
    status: 'Applied',
    appliedDate: new Date(Date.now() - 86400000 * 1),
    deadline: new Date(Date.now() + 86400000 * 20),
    resumeVersion: 'Senior Full-Stack Resume v2.4',
    matchScore: 89,
    notes: 'Submitted via company career portal with tailored cover letter.',
    createdAt: new Date(Date.now() - 86400000 * 1),
    updatedAt: new Date(Date.now() - 86400000 * 1),
  },
  {
    _id: 'app-4',
    id: 'app-4',
    userId: 'demo-user-1',
    company: 'Datadog',
    role: 'Cloud Infrastructure Engineer',
    location: 'New York, NY (Hybrid)',
    salary: '$160,000 - $190,000',
    jobDescription: 'Build high-scale monitoring pipelines in Go, Python, and Kubernetes.',
    status: 'Saved',
    appliedDate: new Date(),
    deadline: new Date(Date.now() + 86400000 * 7),
    resumeVersion: 'Cloud & DevOps Architecture Resume',
    matchScore: 82,
    notes: 'Need to add Kubernetes project to resume before submitting.',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: 'app-5',
    id: 'app-5',
    userId: 'demo-user-1',
    company: 'Figma',
    role: 'Full Stack Systems Engineer',
    location: 'San Francisco, CA (Remote Friendly)',
    salary: '$180,000 - $210,000',
    jobDescription: 'WebAssembly, WebGL, and collaborative canvas infrastructure.',
    status: 'Offer',
    appliedDate: new Date(Date.now() - 86400000 * 18),
    deadline: new Date(Date.now() + 86400000 * 3),
    resumeVersion: 'Senior Full-Stack Resume v2.4',
    matchScore: 96,
    notes: 'Official offer received! Base: $185k + $75k Equity/yr. In review.',
    createdAt: new Date(Date.now() - 86400000 * 18),
    updatedAt: new Date(),
  }
];

const mapAppRow = (row) => ({
  _id: row.id,
  id: row.id,
  userId: row.user_id,
  company: row.company,
  role: row.role,
  location: row.location,
  salary: row.salary,
  jobDescription: row.job_description,
  status: row.status,
  appliedDate: row.applied_date,
  deadline: row.deadline,
  resumeVersion: row.resume_version,
  matchScore: row.match_score,
  notes: row.notes,
  interviewDate: row.interview_date,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

class ApplicationModelDual {
  static async find(queryObj = {}) {
    if (isConnected()) {
      const userId = queryObj.userId || 'demo-user-1';
      const res = await query('SELECT * FROM applications WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
      if (res && res.rows.length > 0) {
        return res.rows.map(mapAppRow);
      }
    }
    return inMemoryApplications.filter(a => !queryObj.userId || a.userId === queryObj.userId || a.userId === 'demo-user-1');
  }

  static async findById(id) {
    if (isConnected()) {
      const res = await query('SELECT * FROM applications WHERE id = $1 LIMIT 1', [id]);
      if (res && res.rows.length > 0) {
        return mapAppRow(res.rows[0]);
      }
    }
    return inMemoryApplications.find(a => a._id === id || a.id === id);
  }

  static async create(data) {
    const id = 'app-' + Date.now();
    if (isConnected()) {
      const res = await query(
        `INSERT INTO applications (
          id, user_id, company, role, location, salary,
          job_description, status, applied_date, deadline,
          resume_version, match_score, notes, interview_date
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        RETURNING *`,
        [
          id,
          data.userId || 'demo-user-1',
          data.company,
          data.role,
          data.location || 'Remote',
          data.salary || '$120k - $150k',
          data.jobDescription || '',
          data.status || 'Applied',
          data.appliedDate || new Date(),
          data.deadline || null,
          data.resumeVersion || 'Senior Full-Stack Resume v2.4',
          data.matchScore || 88,
          data.notes || '',
          data.interviewDate || null,
        ]
      );
      if (res && res.rows.length > 0) {
        return mapAppRow(res.rows[0]);
      }
    }

    const newApp = {
      _id: id,
      id,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    inMemoryApplications.unshift(newApp);
    return newApp;
  }

  static async findByIdAndUpdate(id, data, options = {}) {
    if (isConnected()) {
      const res = await query(
        `UPDATE applications
         SET company = COALESCE($1, company),
             role = COALESCE($2, role),
             status = COALESCE($3, status),
             location = COALESCE($4, location),
             salary = COALESCE($5, salary),
             notes = COALESCE($6, notes),
             interview_date = COALESCE($7, interview_date),
             updated_at = NOW()
         WHERE id = $8
         RETURNING *`,
        [
          data.company || null,
          data.role || null,
          data.status || null,
          data.location || null,
          data.salary || null,
          data.notes || null,
          data.interviewDate || null,
          id,
        ]
      );
      if (res && res.rows.length > 0) {
        return mapAppRow(res.rows[0]);
      }
    }

    const idx = inMemoryApplications.findIndex(a => a._id === id || a.id === id);
    if (idx !== -1) {
      inMemoryApplications[idx] = { ...inMemoryApplications[idx], ...data, updatedAt: new Date() };
      return inMemoryApplications[idx];
    }
    return null;
  }

  static async findByIdAndDelete(id) {
    if (isConnected()) {
      const res = await query('DELETE FROM applications WHERE id = $1 RETURNING *', [id]);
      if (res && res.rows.length > 0) {
        return mapAppRow(res.rows[0]);
      }
    }
    const idx = inMemoryApplications.findIndex(a => a._id === id || a.id === id);
    if (idx !== -1) {
      const removed = inMemoryApplications.splice(idx, 1);
      return removed[0];
    }
    return null;
  }
}

module.exports = ApplicationModelDual;
