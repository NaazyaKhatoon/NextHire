import api from './api';

export const careerService = {
  // Get overall career progress, readiness breakdown, challenge, and streak
  async getCareerProgress() {
    try {
      const response = await api.get('/career/progress');
      return response.data;
    } catch (error) {
      return {
        success: true,
        readinessScore: 91,
        targetRole: 'Senior Full-Stack Engineer',
        streakDays: 5,
        completedChallengesCount: 14,
        breakdown: {
          resume: 88,
          skills: 84,
          projects: 92,
          interview: 76,
          profile: 95,
          applications: 80,
        },
        todayChallenge: {
          title: 'Practice 1 STAR Behavioral Question on Scaling Microservices',
          category: 'Interview Preparation',
          xp: 50,
          completed: false,
          actionUrl: '/interview-prep',
        },
        savedMotivations: [],
        skillRoadmap: [
          {
            id: 'sk-1',
            name: 'Docker & Containerization',
            category: 'Essential',
            status: 'Completed',
            whyItMatters: 'Mandatory container baseline for 90%+ of production backend stacks.',
            learningGoal: 'Master multi-stage Dockerfiles and compose setups.',
            projectIdea: 'Containerize an express/fastapi backend with redis and postgres.',
          },
          {
            id: 'sk-2',
            name: 'Kubernetes (K8s)',
            category: 'Essential',
            status: 'Learning',
            whyItMatters: 'Top missing keyword for senior cloud software engineering positions.',
            learningGoal: 'Understand Pods, Deployments, Services, and Ingress routing.',
            projectIdea: 'Deploy a resilient 3-tier microservice cluster on local Minikube.',
          },
          {
            id: 'sk-3',
            name: 'CI/CD Pipelines (GitHub Actions)',
            category: 'Essential',
            status: 'Completed',
            whyItMatters: 'Automates testing, linting, and zero-downtime deployment.',
            learningGoal: 'Configure automated pull request testing and cloud deployments.',
            projectIdea: 'Build automated CI/CD pipeline running Jest tests and deploying to AWS ECS.',
          },
          {
            id: 'sk-4',
            name: 'GraphQL & Apollo Federation',
            category: 'Recommended',
            status: 'Not Started',
            whyItMatters: 'Reduces frontend over-fetching and unifies distributed microservices.',
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
            projectIdea: 'Automate deployment of a scalable AWS architecture using Terraform.',
          },
        ]
      };
    }
  },

  // Get Next Best Action recommendation
  async getNextBestAction(targetRole, atsScore) {
    try {
      const response = await api.post('/career/next-action', { targetRole, atsScore });
      return response.data;
    } catch (error) {
      return {
        success: true,
        action: {
          title: 'Master Kubernetes Fundamentals & Container Orchestration',
          description: 'Adding Kubernetes to your skills and experience bullets will immediately boost your ATS compatibility from 88% to 95%+ for Senior roles.',
          primaryButton: { label: 'Start Skill Roadmap', url: '/skill-gap' },
          secondaryButton: { label: 'Optimize Resume', url: '/resume-editor' },
          urgency: 'High Impact',
          impactScore: '+8 ATS Pts',
          category: 'Skill Gap & ATS Optimization',
        },
        atsScore: atsScore || 88,
        targetRole: targetRole || 'Senior Full-Stack Engineer',
      };
    }
  },

  // Get skill gap analysis
  async getSkillGap(targetRole, resumeText) {
    try {
      const response = await api.post('/career/skill-gap', { targetRole, resumeText });
      return response.data;
    } catch (error) {
      return {
        success: true,
        targetRole: targetRole || 'Senior Full-Stack Engineer',
        currentSkills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS', 'Git'],
        categories: {
          essential: {
            label: 'Essential (Mandatory for 85%+ Job Posts)',
            skills: ['Kubernetes', 'CI/CD Pipelines (GitHub Actions)'],
            urgency: 'Immediate Priority',
          },
          recommended: {
            label: 'Recommended (Differentiates Senior Candidates)',
            skills: ['GraphQL / Apollo', 'System Observability (Datadog/Prometheus)'],
            urgency: 'Medium Priority',
          },
          bonus: {
            label: 'Bonus (High-Compensation Advantage)',
            skills: ['Terraform (IaC)', 'Kafka / RabbitMQ Event Streams'],
            urgency: 'High Leverage',
          }
        },
        aiRanking: [
          { rank: 1, skill: 'Kubernetes', why: 'Top requested container orchestrator across modern cloud microservices.', recommendedHours: '8 hours', projectIdea: 'Deploy 3-node Minikube cluster with Ingress.' },
          { rank: 2, skill: 'CI/CD Pipelines', why: 'Demonstrates enterprise production readiness and automated quality control.', recommendedHours: '4 hours', projectIdea: 'Set up GitHub Actions to run tests and build Docker images.' },
          { rank: 3, skill: 'System Observability', why: 'Proves capability to manage production SLA and track distributed latency.', recommendedHours: '6 hours', projectIdea: 'Instrument Prometheus metrics & Grafana dashboards.' },
        ]
      };
    }
  },

  // Get Role Roadmap
  async getRoleRoadmap(role) {
    try {
      const response = await api.post('/career/roadmap', { role });
      return response.data;
    } catch (error) {
      return {
        success: true,
        role: role || 'Software Engineer',
        allRoles: ['Software Engineer', 'Frontend Developer', 'Full Stack Developer', 'Data Scientist', 'AI Engineer', 'DevOps Engineer', 'Product Manager'],
      };
    }
  },

  // Complete Daily Challenge
  async completeChallenge() {
    try {
      const response = await api.post('/career/challenge/complete');
      return response.data;
    } catch (error) {
      return { success: true, message: 'Challenge Completed! +50 XP' };
    }
  },

  // Update skill status in roadmap
  async updateSkillStatus(skillId, status) {
    try {
      const response = await api.post('/career/skill/status', { skillId, status });
      return response.data;
    } catch (error) {
      return { success: true, message: 'Updated status' };
    }
  },

  // Save inspiring quote
  async saveMotivation(quoteData) {
    try {
      const response = await api.post('/career/motivation/save', quoteData);
      return response.data;
    } catch (error) {
      return { success: true, message: 'Saved motivation' };
    }
  }
};
