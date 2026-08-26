const { query, isConnected } = require('../config/database');

const inMemoryInterviewSessions = [
  {
    _id: 'session-1',
    id: 'session-1',
    userId: 'demo-user-1',
    targetRole: 'Senior Full-Stack Engineer',
    overallScore: 84,
    breakdown: {
      technicalRelevance: 86,
      communicationClarity: 82,
      problemSolving: 88,
      answerStructure: 80,
    },
    questions: [
      {
        id: 'q-1',
        question: 'How do you handle database connection pooling and slow query bottlenecks in high-scale Node.js microservices?',
        category: 'Technical',
        difficulty: 'Hard',
        userAnswer: 'I configure Prisma or Pg-pool connection parameters to prevent pool exhaustion. For slow queries, I analyze EXPLAIN ANALYZE execution plans, add B-tree compound indexes, and implement a Redis cache with TTL for repetitive read queries.',
        feedback: 'Excellent answer addressing both connection pool sizing and read caching mechanics.',
        score: 92,
        idealAnswer: 'Mention connection pooling limits, connection timeouts, index optimization (EXPLAIN ANALYZE), read replicas, and distributed Redis caching.',
      },
      {
        id: 'q-2',
        question: 'Tell me about a time you had a technical disagreement with a teammate regarding system architecture. How did you resolve it?',
        category: 'Behavioral',
        difficulty: 'Medium',
        userAnswer: 'We debated whether to use GraphQL vs REST for our mobile client. I suggested building a lightweight benchmark prototype measuring payload size and query latency. The benchmark showed GraphQL reduced payload sizes by 40% on mobile networks, which convinced the team.',
        feedback: 'Strong use of objective data and benchmarking to achieve consensus without team friction.',
        score: 88,
        idealAnswer: 'Use the STAR method: explain the differing viewpoints, the objective metric chosen to evaluate trade-offs, and the collaborative outcome.',
      }
    ],
    strengths: [
      'Strong technical grounding in distributed caching and database query optimization.',
      'Data-driven approach to technical consensus and team collaboration.',
    ],
    improvements: [
      'Quantify business revenue impact when describing past architectural improvements.',
      'Structure behavioral answers with explicit STAR time boundaries.',
    ],
    createdAt: new Date(Date.now() - 86400000 * 2),
    updatedAt: new Date(Date.now() - 86400000 * 2),
  }
];

const mapSessionRow = (row) => ({
  _id: row.id,
  id: row.id,
  userId: row.user_id,
  targetRole: row.target_role,
  overallScore: row.overall_score,
  breakdown: row.breakdown || {},
  questions: row.questions || [],
  strengths: row.strengths || [],
  improvements: row.improvements || [],
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

class InterviewSessionModelDual {
  static async find(queryObj = {}) {
    const userId = queryObj.userId || 'demo-user-1';
    if (isConnected()) {
      const res = await query('SELECT * FROM interview_sessions WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
      if (res && res.rows.length > 0) {
        return res.rows.map(mapSessionRow);
      }
    }
    return inMemoryInterviewSessions.filter(s => !queryObj.userId || s.userId === queryObj.userId || s.userId === 'demo-user-1');
  }

  static async findById(id) {
    if (isConnected()) {
      const res = await query('SELECT * FROM interview_sessions WHERE id = $1 LIMIT 1', [id]);
      if (res && res.rows.length > 0) {
        return mapSessionRow(res.rows[0]);
      }
    }
    return inMemoryInterviewSessions.find(s => s._id === id || s.id === id);
  }

  static async create(data) {
    const id = 'session-' + Date.now();
    if (isConnected()) {
      const res = await query(
        `INSERT INTO interview_sessions (
          id, user_id, target_role, overall_score,
          breakdown, questions, strengths, improvements
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *`,
        [
          id,
          data.userId || 'demo-user-1',
          data.targetRole || 'Senior Full-Stack Engineer',
          data.overallScore || 84,
          JSON.stringify(data.breakdown || {}),
          JSON.stringify(data.questions || []),
          JSON.stringify(data.strengths || []),
          JSON.stringify(data.improvements || []),
        ]
      );
      if (res && res.rows.length > 0) {
        return mapSessionRow(res.rows[0]);
      }
    }

    const newSession = {
      _id: id,
      id,
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    inMemoryInterviewSessions.unshift(newSession);
    return newSession;
  }
}

module.exports = InterviewSessionModelDual;
