const CareerProfile = require('../models/CareerProfile');
const { ResumeModel, inMemoryResumes } = require('../models/Resume');
const Application = require('../models/Application');
const { isConnected } = require('../config/database');

// Role benchmarks taxonomy
const ROLE_ROADMAPS = {
  'Software Engineer': {
    title: 'Software Engineer Career Roadmap',
    description: 'From foundational problem solving to scalable distributed microservices.',
    levels: [
      { step: 1, title: 'Core Computer Science', status: 'completed', skills: ['Data Structures', 'Algorithms', 'Git', 'Clean Code'], desc: 'Master foundational DSA, memory management, and version control.' },
      { step: 2, title: 'Web Architecture & APIs', status: 'completed', skills: ['RESTful APIs', 'TypeScript', 'Node.js', 'PostgreSQL'], desc: 'Build scalable backend services, schema models, and authenticated APIs.' },
      { step: 3, title: 'Cloud & Containerization', status: 'in-progress', skills: ['Docker', 'AWS (EC2, S3, RDS)', 'Kubernetes'], desc: 'Deploy containerized multi-tier applications with high availability.' },
      { step: 4, title: 'System Design & Scale', status: 'upcoming', skills: ['Redis Caching', 'Microservices', 'Message Queues (Kafka)'], desc: 'Architect low-latency distributed systems handling 100k+ RPS.' },
      { step: 5, title: 'Production CI/CD & Observability', status: 'upcoming', skills: ['GitHub Actions', 'Datadog / Prometheus', 'Infrastructure as Code'], desc: 'Automate zero-downtime deployment pipelines with full telemetry.' }
    ]
  },
  'Frontend Developer': {
    title: 'Frontend Platform Engineer Roadmap',
    description: 'Modern component design, state architecture, and sub-second web performance.',
    levels: [
      { step: 1, title: 'Modern JavaScript & TypeScript', status: 'completed', skills: ['ES6+', 'TypeScript', 'DOM Manipulation', 'Async JS'], desc: 'Master type-safe modern JavaScript and reactive browser APIs.' },
      { step: 2, title: 'Component Frameworks', status: 'completed', skills: ['React', 'Next.js', 'Tailwind CSS', 'State Management'], desc: 'Build responsive design systems and performant component trees.' },
      { step: 3, title: 'Performance & Core Web Vitals', status: 'in-progress', skills: ['LCP / INP Optimization', 'Code Splitting', 'Web Workers'], desc: 'Diagnose rendering bottlenecks and achieve 95+ Lighthouse scores.' },
      { step: 4, title: 'Testing & Design Systems', status: 'upcoming', skills: ['Jest', 'Playwright', 'Storybook', 'Accessibility (a11y)'], desc: 'Build robust end-to-end test suites and accessible enterprise design libraries.' },
      { step: 5, title: 'Micro-Frontends & Edge', status: 'upcoming', skills: ['Module Federation', 'Edge Middleware', 'WebAssembly'], desc: 'Scale frontend architecture across autonomous distributed squads.' }
    ]
  },
  'Full Stack Developer': {
    title: 'Full Stack Engineer Roadmap',
    description: 'End-to-end full stack architecture from reactive UI to database clustering.',
    levels: [
      { step: 1, title: 'Full Stack Baseline', status: 'completed', skills: ['React', 'Node.js', 'PostgreSQL', 'Express'], desc: 'Deliver end-to-end CRUD applications with secure authentication.' },
      { step: 2, title: 'Type-Safe Distributed Architecture', status: 'completed', skills: ['TypeScript', 'FastAPI', 'MongoDB / Redis'], desc: 'Implement polyglot microservices with caching and message queues.' },
      { step: 3, title: 'DevOps & Cloud Deployments', status: 'in-progress', skills: ['Docker', 'AWS ECS', 'GitHub Actions CI/CD'], desc: 'Automate build, test, and containerized deployment workflows.' },
      { step: 4, title: 'Security & Optimization', status: 'upcoming', skills: ['OAuth 2.0', 'Rate Limiting', 'SQL Optimization', 'CDN'], desc: 'Harden web security posture and eliminate database n+1 bottlenecks.' },
      { step: 5, title: 'Enterprise Full Stack Leadership', status: 'upcoming', skills: ['System Architecture', 'Event-Driven Systems', 'Team Mentorship'], desc: 'Lead full-lifecycle product architecture and technical roadmaps.' }
    ]
  },
  'Data Scientist': {
    title: 'Data Science & Machine Learning Roadmap',
    description: 'Statistical modeling, predictive analytics, and ML model production.',
    levels: [
      { step: 1, title: 'Python & Data Analysis', status: 'completed', skills: ['Python', 'Pandas', 'NumPy', 'SQL', 'Data Wrangling'], desc: 'Extract, clean, and visualize large structured datasets.' },
      { step: 2, title: 'Statistical Modeling & ML', status: 'completed', skills: ['Scikit-Learn', 'Regression', 'Classification', 'A/B Testing'], desc: 'Build supervised and unsupervised predictive machine learning models.' },
      { step: 3, title: 'Deep Learning & NLP', status: 'in-progress', skills: ['PyTorch', 'TensorFlow', 'Transformers', 'Hugging Face'], desc: 'Train deep neural networks for computer vision and NLP tasks.' },
      { step: 4, title: 'MLOps & Pipelines', status: 'upcoming', skills: ['MLflow', 'Docker', 'AWS SageMaker', 'Feature Stores'], desc: 'Deploy automated model training and real-time inference APIs.' },
      { step: 5, title: 'Production Scale AI Systems', status: 'upcoming', skills: ['Vector DBs', 'Distributed Training', 'Model Optimization (ONNX)'], desc: 'Scale low-latency inference across high-throughput streaming systems.' }
    ]
  },
  'AI Engineer': {
    title: 'AI & LLM Systems Engineer Roadmap',
    description: 'Generative AI, Retrieval-Augmented Generation (RAG), and agentic workflows.',
    levels: [
      { step: 1, title: 'Python & LLM APIs', status: 'completed', skills: ['Python', 'OpenAI API', 'Anthropic API', 'Prompt Engineering'], desc: 'Integrate LLM API providers with structured function calling.' },
      { step: 2, title: 'RAG & Vector Search', status: 'completed', skills: ['LangChain', 'LlamaIndex', 'Pinecone / Qdrant', 'Embeddings'], desc: 'Build accurate semantic retrieval engines over proprietary knowledge.' },
      { step: 3, title: 'Agentic Workflows & Tool Calling', status: 'in-progress', skills: ['Multi-Agent Orchestration', 'Self-Reflection', 'FastAPI'], desc: 'Build autonomous agents that write code, browse the web, and execute tasks.' },
      { step: 4, title: 'Fine-Tuning & Evaluation', status: 'upcoming', skills: ['LoRA / QLoRA', 'RAGAS Eval', 'Unsloth', 'TRL'], desc: 'Fine-tune open-weights models (Llama 3, Mistral) and measure hallucination.' },
      { step: 5, title: 'Production LLMOps & Guardrails', status: 'upcoming', skills: ['vLLM / TensorRT-LLM', 'Guardrails AI', 'Semantic Caching'], desc: 'Optimize sub-second TTFT latency and enforce safety guardrails.' }
    ]
  },
  'DevOps Engineer': {
    title: 'Cloud DevOps & SRE Roadmap',
    description: 'Continuous delivery, infrastructure as code, and production reliability.',
    levels: [
      { step: 1, title: 'Linux & Scripting', status: 'completed', skills: ['Linux Bash', 'Networking', 'Python Scripting', 'Git'], desc: 'Master OS performance diagnostics, SSH, and automated scripting.' },
      { step: 2, title: 'Containers & CI/CD', status: 'completed', skills: ['Docker', 'GitHub Actions', 'GitLab CI', 'Docker Compose'], desc: 'Package applications into lightweight images and automate builds.' },
      { step: 3, title: 'Cloud Infrastructure & IaC', status: 'in-progress', skills: ['AWS / GCP', 'Terraform', 'Ansible', 'CloudFormation'], desc: 'Provision scalable, declarative multi-region cloud infrastructure.' },
      { step: 4, title: 'Kubernetes Orchestration', status: 'upcoming', skills: ['Kubernetes (K8s)', 'Helm', 'ArgoCD (GitOps)', 'Service Mesh (Istio)'], desc: 'Manage zero-downtime microservice clusters and automated rollouts.' },
      { step: 5, title: 'Observability & SRE', status: 'upcoming', skills: ['Prometheus & Grafana', 'Datadog', 'SLO/SLI Management', 'Chaos Engineering'], desc: 'Guarantee 99.99% availability with automated alerting and incident telemetry.' }
    ]
  },
  'Product Manager': {
    title: 'Technical Product Management Roadmap',
    description: 'Product vision, user discovery, metrics analysis, and high-impact execution.',
    levels: [
      { step: 1, title: 'Product Discovery & User Research', status: 'completed', skills: ['User Interviews', 'JTBD Framework', 'Wireframing', 'Figma'], desc: 'Identify critical customer pain points and formulate product hypotheses.' },
      { step: 2, title: 'Data Analytics & Metric Telemetry', status: 'completed', skills: ['SQL', 'Mixpanel / Amplitude', 'A/B Testing', 'North Star Metrics'], desc: 'Define funnel metrics and evaluate product feature engagement.' },
      { step: 3, title: 'Agile Delivery & Technical Collaboration', status: 'in-progress', skills: ['Scrum / Kanban', 'PRDs & User Stories', 'API Fundamentals'], desc: 'Lead engineering sprints and author structured product requirement docs.' },
      { step: 4, title: 'Product Strategy & Roadmap', status: 'upcoming', skills: ['RICE Prioritization', 'Competitive Moats', 'Roadmapping'], desc: 'Balance customer requests, tech debt, and strategic company goals.' },
      { step: 5, title: 'Go-To-Market & Executive Leadership', status: 'upcoming', skills: ['GTM Strategy', 'P&L Management', 'Executive Communication'], desc: 'Lead cross-functional product launches across Sales, Marketing, and Ops.' }
    ]
  }
};

const careerController = {
  // GET /api/career/progress
  async getCareerProgress(req, res) {
    try {
      const userId = req.user?._id || req.user?.id || 'demo-user-123';
      let profile;
      let apps = [];
      let resumes = [];

      try {
        profile = await CareerProfile.findOne({ userId });
      } catch {
        profile = null;
      }

      try {
        apps = await Application.find({ userId });
      } catch {
        apps = [];
      }

      if (isConnected()) {
        try {
          resumes = await ResumeModel.find({ userId });
        } catch {
          resumes = inMemoryResumes;
        }
      } else {
        resumes = inMemoryResumes;
      }

      const topResume = resumes[0] || { atsScore: 88 };
      const completedRoadmapCount = (profile?.skillRoadmap || []).filter(s => s.status === 'Completed').length;
      const totalRoadmapCount = Math.max(1, (profile?.skillRoadmap || []).length);
      const skillProgress = Math.round((completedRoadmapCount / totalRoadmapCount) * 100);

      const readinessScore = profile?.careerReadinessScore || 91;

      return res.json({
        success: true,
        readinessScore,
        targetRole: profile?.targetRole || 'Senior Full-Stack Engineer',
        streakDays: profile?.streakDays || 5,
        completedChallengesCount: profile?.completedChallengesCount || 14,
        breakdown: profile?.breakdown || {
          resume: topResume.atsScore || 88,
          skills: skillProgress || 84,
          projects: 92,
          interview: 76,
          profile: 95,
          applications: Math.min(100, (apps.length * 15) || 80),
        },
        todayChallenge: profile?.todayChallenge || {
          title: 'Practice 1 STAR Behavioral Question on Scaling Microservices',
          category: 'Interview Preparation',
          xp: 50,
          completed: false,
          actionUrl: '/interview-prep',
        },
        savedMotivations: profile?.savedMotivations || [],
        skillRoadmap: profile?.skillRoadmap || [
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
        ],
      });
    } catch (err) {
      console.error('getCareerProgress error:', err);
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // POST /api/career/next-action
  async getNextBestAction(req, res) {
    try {
      const userId = req.user?._id || req.user?.id || 'demo-user-123';
      let profile;
      let apps = [];
      let resumes = [];

      try {
        profile = await CareerProfile.findOne({ userId });
      } catch {
        profile = null;
      }

      try {
        apps = await Application.find({ userId });
      } catch {
        apps = [];
      }

      if (isConnected()) {
        try {
          resumes = await ResumeModel.find({ userId });
        } catch {
          resumes = inMemoryResumes;
        }
      } else {
        resumes = inMemoryResumes;
      }

      const topResume = resumes[0] || { atsScore: 88, targetRole: 'Senior Full-Stack Engineer' };
      const atsScore = topResume.atsScore || 88;
      const missingSkills = ['Kubernetes', 'GraphQL', 'Terraform'];

      let action = {
        title: 'Master Kubernetes Fundamentals & Container Orchestration',
        description: 'Adding Kubernetes to your skills and experience bullets will immediately boost your ATS compatibility from 88% to 95%+ for Senior roles.',
        primaryButton: { label: 'Start Skill Roadmap', url: '/skill-gap' },
        secondaryButton: { label: 'Optimize Resume', url: '/resume-editor' },
        urgency: 'High Impact',
        impactScore: '+8 ATS Pts',
        category: 'Skill Gap & ATS Optimization',
      };

      if (atsScore < 75) {
        action = {
          title: 'Inject High-Frequency Keywords into Experience Bullets',
          description: 'Your resume keyword density is currently below the 80% recruiter threshold. Use our AI Rewriter to inject active verbs and metrics.',
          primaryButton: { label: 'Fix with AI Rewriter', url: '/ai-rewriter' },
          secondaryButton: { label: 'Scan Resume', url: '/ats-scanner' },
          urgency: 'Critical',
          impactScore: '+15 ATS Pts',
          category: 'Resume Optimization',
        };
      } else if (apps.length < 2) {
        action = {
          title: 'Submit Applications to 3 Matching Senior Engineering Roles',
          description: 'Your resume ATS score is in the top 8% of applicants (88/100). Begin tracking job applications to build interview pipeline momentum.',
          primaryButton: { label: 'Track New Application', url: '/application-tracker' },
          secondaryButton: { label: 'Check Job Matcher', url: '/job-matcher' },
          urgency: 'Action Recommended',
          impactScore: 'Pipeline Momentum',
          category: 'Job Applications',
        };
      }

      return res.json({
        success: true,
        action,
        atsScore,
        targetRole: topResume.targetRole || profile?.targetRole || 'Senior Full-Stack Engineer',
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // POST /api/career/skill-gap
  async getSkillGap(req, res) {
    try {
      const targetRole = req.body?.targetRole || 'Senior Full-Stack Engineer';
      const resumeText = req.body?.resumeText || '';

      const currentSkills = ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Express', 'Python', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS', 'Git'];
      
      const missingEssential = ['Kubernetes', 'CI/CD Pipelines (GitHub Actions)'];
      const missingRecommended = ['GraphQL / Apollo', 'System Observability (Datadog/Prometheus)'];
      const missingBonus = ['Terraform (IaC)', 'Kafka / RabbitMQ Event Streams'];

      return res.json({
        success: true,
        targetRole,
        currentSkills,
        categories: {
          essential: {
            label: 'Essential (Mandatory for 85%+ Job Posts)',
            skills: missingEssential,
            urgency: 'Immediate Priority',
          },
          recommended: {
            label: 'Recommended (Differentiates Senior Candidates)',
            skills: missingRecommended,
            urgency: 'Medium Priority',
          },
          bonus: {
            label: 'Bonus (High-Compensation Advantage)',
            skills: missingBonus,
            urgency: 'High Leverage',
          }
        },
        aiRanking: [
          { rank: 1, skill: 'Kubernetes', why: 'Top requested container orchestrator across modern cloud microservices.', recommendedHours: '8 hours', projectIdea: 'Deploy 3-node Minikube cluster with Ingress.' },
          { rank: 2, skill: 'CI/CD Pipelines', why: 'Demonstrates enterprise production readiness and automated quality control.', recommendedHours: '4 hours', projectIdea: 'Set up GitHub Actions to run tests and build Docker images.' },
          { rank: 3, skill: 'System Observability', why: 'Proves capability to manage production SLA and track distributed latency.', recommendedHours: '6 hours', projectIdea: 'Instrument Prometheus metrics & Grafana dashboards.' },
        ]
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // POST /api/career/roadmap
  async getRoleRoadmap(req, res) {
    try {
      const role = req.body?.role || 'Software Engineer';
      const roadmap = ROLE_ROADMAPS[role] || ROLE_ROADMAPS['Software Engineer'];
      return res.json({
        success: true,
        role,
        roadmap,
        allRoles: Object.keys(ROLE_ROADMAPS),
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // POST /api/career/challenge/complete
  async completeChallenge(req, res) {
    try {
      const userId = req.user?.id || 'demo-user-1';
      const profile = await CareerProfile.findOne({ userId });
      const currentStreak = (profile?.streakDays || 5) + 1;
      const count = (profile?.completedChallengesCount || 14) + 1;

      const updated = await CareerProfile.findOneAndUpdate(
        { userId },
        {
          $set: {
            streakDays: currentStreak,
            completedChallengesCount: count,
            'todayChallenge.completed': true,
          }
        },
        { new: true }
      );

      return res.json({
        success: true,
        message: 'Daily Challenge Completed! +50 XP awarded.',
        streakDays: currentStreak,
        completedChallengesCount: count,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // POST /api/career/skill/status
  async updateSkillStatus(req, res) {
    try {
      const userId = req.user?.id || 'demo-user-1';
      const { skillId, status } = req.body; // status: 'Not Started' | 'Learning' | 'Completed'

      const profile = await CareerProfile.findOne({ userId });
      const skills = profile?.skillRoadmap || [];
      const idx = skills.findIndex(s => s.id === skillId);
      if (idx !== -1) {
        skills[idx].status = status;
      }

      await CareerProfile.findOneAndUpdate(
        { userId },
        { $set: { skillRoadmap: skills } },
        { new: true }
      );

      return res.json({
        success: true,
        message: `Skill status updated to "${status}"`,
        skillRoadmap: skills,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  },

  // POST /api/career/motivation/save
  async saveMotivation(req, res) {
    try {
      const userId = req.user?.id || 'demo-user-1';
      const { quote, author, role } = req.body;

      const profile = await CareerProfile.findOne({ userId });
      const list = profile?.savedMotivations || [];
      list.unshift({ quote, author, role, savedAt: new Date() });

      await CareerProfile.findOneAndUpdate(
        { userId },
        { $set: { savedMotivations: list } },
        { new: true }
      );

      return res.json({
        success: true,
        message: 'Inspirational quote saved to your career profile!',
        savedMotivations: list,
      });
    } catch (err) {
      return res.status(500).json({ success: false, message: err.message });
    }
  }
};

module.exports = careerController;
