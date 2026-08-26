const { query, isConnected } = require('../config/database');

const inMemoryCareerProfiles = {
  'demo-user-1': {
    _id: 'cp-1',
    id: 'cp-1',
    userId: 'demo-user-1',
    targetRole: 'Senior Full-Stack Engineer',
    careerReadinessScore: 91,
    breakdown: {
      resume: 88,
      skills: 84,
      projects: 92,
      interview: 76,
      profile: 95,
      applications: 80,
    },
    streakDays: 5,
    lastActiveDate: new Date(),
    todayChallenge: {
      title: 'Practice 1 STAR Behavioral Question on Scaling Microservices',
      category: 'Interview Preparation',
      xp: 50,
      completed: false,
      actionUrl: '/interview-prep',
    },
    completedChallengesCount: 14,
    savedMotivations: [
      {
        quote: "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
        author: "Steve Jobs",
        role: "Co-Founder, Apple",
        savedAt: new Date(Date.now() - 86400000 * 2),
      },
      {
        quote: "You don't need a thousand offers. You only need ONE company to recognize your true value. Stay focused.",
        author: "NextHire Career Insight",
        role: "AI Career Wisdom",
        savedAt: new Date(Date.now() - 86400000 * 1),
      }
    ],
    skillRoadmap: [
      {
        id: 'sk-1',
        name: 'Docker & Containerization',
        category: 'Essential',
        status: 'Completed',
        whyItMatters: 'Mandatory container baseline for 90%+ of production backend stacks.',
        learningGoal: 'Master multi-stage Dockerfiles, caching layers, and container optimization.',
        projectIdea: 'Containerize an express/fastapi backend with redis and postgres docker-compose.',
      },
      {
        id: 'sk-2',
        name: 'Kubernetes (K8s)',
        category: 'Essential',
        status: 'Learning',
        whyItMatters: 'Top missing keyword for senior and staff cloud software engineering positions.',
        learningGoal: 'Understand Pods, Deployments, Services, ConfigMaps, and Ingress routing.',
        projectIdea: 'Deploy a resilient 3-tier microservice cluster on local Minikube / AWS EKS.',
      },
      {
        id: 'sk-3',
        name: 'CI/CD Pipelines (GitHub Actions)',
        category: 'Essential',
        status: 'Completed',
        whyItMatters: 'Automates testing, linting, Docker building, and zero-downtime deployment.',
        learningGoal: 'Configure automated pull request testing, image builds, and AWS deployment.',
        projectIdea: 'Build automated CI/CD pipeline running Jest tests and deploying to AWS ECS.',
      },
      {
        id: 'sk-4',
        name: 'GraphQL & Apollo Federation',
        category: 'Recommended',
        status: 'Not Started',
        whyItMatters: 'Reduces frontend over-fetching and unifies distributed microservice schemas.',
        learningGoal: 'Design schema stitching, queries, mutations, and DataLoader batching.',
        projectIdea: 'Build a federated GraphQL gateway aggregating user and order microservices.',
      },
      {
        id: 'sk-5',
        name: 'Terraform (Infrastructure as Code)',
        category: 'Bonus',
        status: 'Not Started',
        whyItMatters: 'Enables repeatable cloud provisioning across AWS and GCP environments.',
        learningGoal: 'Write declarative HCL modules for VPC, RDS, and ECS clusters.',
        projectIdea: 'Automate deployment of a scalable AWS architecture using Terraform modules.',
      },
    ],
  }
};

const mapProfileRow = (row) => ({
  _id: row.id,
  id: row.id,
  userId: row.user_id,
  targetRole: row.target_role,
  careerReadinessScore: row.career_readiness_score,
  breakdown: row.breakdown || {},
  streakDays: row.streak_days,
  lastActiveDate: row.last_active_date,
  todayChallenge: row.today_challenge || {},
  completedChallengesCount: row.completed_challenges_count,
  savedMotivations: row.saved_motivations || [],
  skillRoadmap: row.skill_roadmap || [],
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

class CareerProfileModelDual {
  static async findOne(queryObj = {}) {
    const userId = queryObj.userId || 'demo-user-1';
    if (isConnected()) {
      const res = await query('SELECT * FROM career_profiles WHERE user_id = $1 LIMIT 1', [userId]);
      if (res && res.rows.length > 0) {
        return mapProfileRow(res.rows[0]);
      }
    }
    return inMemoryCareerProfiles[userId] || inMemoryCareerProfiles['demo-user-1'];
  }

  static async findOneAndUpdate(queryObj = {}, update = {}, options = {}) {
    const userId = queryObj.userId || 'demo-user-1';
    const updateData = update.$set ? { ...update, ...update.$set } : update;

    if (isConnected()) {
      const res = await query(
        `INSERT INTO career_profiles (
          id, user_id, target_role, career_readiness_score,
          breakdown, streak_days, today_challenge,
          completed_challenges_count, saved_motivations, skill_roadmap
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (user_id) DO UPDATE
        SET target_role = COALESCE($3, career_profiles.target_role),
            career_readiness_score = COALESCE($4, career_profiles.career_readiness_score),
            breakdown = COALESCE($5, career_profiles.breakdown),
            streak_days = COALESCE($6, career_profiles.streak_days),
            today_challenge = COALESCE($7, career_profiles.today_challenge),
            completed_challenges_count = COALESCE($8, career_profiles.completed_challenges_count),
            saved_motivations = COALESCE($9, career_profiles.saved_motivations),
            skill_roadmap = COALESCE($10, career_profiles.skill_roadmap),
            updated_at = NOW()
        RETURNING *`,
        [
          'cp-' + Date.now(),
          userId,
          updateData.targetRole || 'Senior Full-Stack Engineer',
          updateData.careerReadinessScore || 91,
          JSON.stringify(updateData.breakdown || {}),
          updateData.streakDays || 5,
          JSON.stringify(updateData.todayChallenge || {}),
          updateData.completedChallengesCount || 14,
          JSON.stringify(updateData.savedMotivations || []),
          JSON.stringify(updateData.skillRoadmap || []),
        ]
      );
      if (res && res.rows.length > 0) {
        return mapProfileRow(res.rows[0]);
      }
    }

    let profile = inMemoryCareerProfiles[userId] || inMemoryCareerProfiles['demo-user-1'];
    profile = { ...profile, ...updateData, updatedAt: new Date() };
    inMemoryCareerProfiles[userId] = profile;
    return profile;
  }
}

module.exports = CareerProfileModelDual;
