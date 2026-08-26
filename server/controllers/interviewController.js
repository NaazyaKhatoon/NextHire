const InterviewSession = require('../models/InterviewSession');

const INTERVIEW_QUESTION_BANK = [
  {
    id: 'iq-1',
    category: 'Technical',
    difficulty: 'Hard',
    question: 'How do you diagnose and resolve memory leaks and event loop blocking in a high-concurrency Node.js production service?',
    idealAnswer: '1. Take heap snapshots using Chrome DevTools or Clinic.js to identify uncollected closures or lingering global event listeners.\n2. Monitor process.memoryUsage() rss/heapUsed over time.\n3. Offload CPU-heavy tasks (crypto/compression) to Worker Threads to keep the main event loop sub-5ms.',
    tips: 'Mention heap snapshots, v8 profiler, Worker Threads, and Clinic.js.'
  },
  {
    id: 'iq-2',
    category: 'System Design',
    difficulty: 'Hard',
    question: 'Design a distributed rate limiter that handles 100k requests/sec across 20 multi-region web servers.',
    idealAnswer: 'Use a Sliding Window Counter algorithm backed by Redis Cluster. Implement Redis pipelines or Lua scripts to ensure atomic increment and expiry checks in a single round-trip, falling back to local Token Bucket counters if Redis latency exceeds 15ms.',
    tips: 'Address atomic Lua scripts, Redis cluster, clock skew, and graceful fallback.'
  },
  {
    id: 'iq-3',
    category: 'Behavioral',
    difficulty: 'Medium',
    question: 'Tell me about a time a production deployment failed or broke critical functionality. How did you handle it?',
    idealAnswer: 'Situation: An automated migration locked a high-traffic table during peak hours.\nTask: Restore availability immediately without losing transaction integrity.\nAction: Executed an instant rollback script, coordinated customer status page communications, and re-architected the migration using zero-downtime shadow tables.\nResult: Restored platform in 4 minutes and added pre-deployment lock checks.',
    tips: 'Always use STAR format: Situation, Task, Action, Result. Highlight ownership and post-mortem improvements.'
  },
  {
    id: 'iq-4',
    category: 'Resume-Specific',
    difficulty: 'Medium',
    question: 'You mentioned reducing query latency by 35% on your resume. Walk me through the exact database profiling steps you took.',
    idealAnswer: 'I enabled PostgreSQL slow query logs (pg_stat_statements) to identify top N+1 queries. Ran EXPLAIN (ANALYZE, BUFFERS) to find sequential scans, added multi-column compound indexes for hot filters, and placed hot read results behind a Redis cache with 60s TTL.',
    tips: 'Explain EXPLAIN ANALYZE, indexing, caching, and before/after latency numbers.'
  },
  {
    id: 'iq-5',
    category: 'HR / Culture',
    difficulty: 'Easy',
    question: 'Why NextHire / why are you interested in our team and engineering culture?',
    idealAnswer: 'I am drawn to your focus on high-velocity developer empowerment and scalable cloud architecture. My background in building responsive, high-uptime web platforms aligns directly with your mission to innovate.',
    tips: 'Show enthusiasm, connect your past experience to the company mission, and ask thoughtful questions.'
  }
];

const interviewController = {
  // POST /api/interview/generate
  async generateQuestions(req, res) {
    try {
      const { targetRole, category, difficulty } = req.body;
      let filtered = INTERVIEW_QUESTION_BANK;

      if (category && category !== 'All') {
        filtered = filtered.filter(q => q.category.toLowerCase() === category.toLowerCase());
      }
      if (difficulty && difficulty !== 'All') {
        filtered = filtered.filter(q => q.difficulty.toLowerCase() === difficulty.toLowerCase());
      }

      return res.json({
        success: true,
        targetRole: targetRole || 'Senior Full-Stack Engineer',
        questions: filtered.length > 0 ? filtered : INTERVIEW_QUESTION_BANK,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // POST /api/interview/evaluate
  async evaluateAnswer(req, res) {
    try {
      const { questionId, question, userAnswer, targetRole } = req.body;
      const answer = (userAnswer || '').trim();

      if (!answer) {
        return res.status(400).json({ success: false, message: 'Please provide an answer to evaluate.' });
      }

      const words = answer.split(/\s+/).length;
      const hasMetrics = /\d+%|\d+ms|\d+k|\$|\d+\s*(users|requests|servers)/i.test(answer);
      const hasStar = /situation|task|action|result|because|improved|reduced|architected|resolved/i.test(answer);

      let score = 75;
      if (words > 25) score += 8;
      if (hasMetrics) score += 9;
      if (hasStar) score += 6;
      score = Math.min(96, Math.max(60, score));

      const feedback = (
        `Your answer demonstrates solid foundational knowledge (${score}/100). ` +
        (hasMetrics ? `Great job highlighting quantifiable outcomes! ` : `To reach a 95%+ score, inject specific performance metrics or latency improvements. `) +
        `Structure your points clearly using Situation, Action, and Business Result.`
      );

      return res.json({
        success: true,
        score,
        technicalScore: Math.min(95, score + 2),
        communicationScore: Math.min(92, score - 2),
        problemSolvingScore: Math.min(96, score + 3),
        answerQualityScore: score,
        feedback,
        strengths: [
          'Direct response addressing the primary technical question.',
          hasMetrics ? 'Included verifiable outcome numbers.' : 'Clear and articulate explanation.',
        ],
        improvements: [
          'Quantify the exact business outcome or cost reduction.',
          'Emphasize how you communicated and aligned with teammates.',
        ],
        idealAnswer: 'Structure clearly: State the problem, technical trade-offs evaluated, exact solution implemented, and measurable business result.',
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // POST /api/interview/mock
  async saveMockSession(req, res) {
    try {
      const userId = req.user?.id || 'demo-user-1';
      const sessionData = req.body;

      const created = await InterviewSession.create({
        ...sessionData,
        userId,
      });

      return res.json({
        success: true,
        message: 'Mock Interview session recorded successfully!',
        session: created,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // GET /api/interview/sessions
  async getSessions(req, res) {
    try {
      const userId = req.user?.id || 'demo-user-1';
      const sessions = await InterviewSession.find({ userId });
      return res.json({
        success: true,
        sessions,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
};

module.exports = interviewController;
