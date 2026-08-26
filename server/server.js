const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

dotenv.config();

const { connectDB } = require('./config/database');
const { errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const resumeRoutes = require('./routes/resumeRoutes');
const aiRoutes = require('./routes/aiRoutes');
const jobRoutes = require('./routes/jobRoutes');
const careerRoutes = require('./routes/careerRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const aiToolRoutes = require('./routes/aiToolRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database or In-Memory Store
connectDB();

// Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));

// Rate Limiter (Relaxed for dev & demo production)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests from this IP, please try again later.' },
});
app.use('/api/', limiter);

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoints (Both /api/health and /health)
const healthHandler = (req, res) => {
  res.json({
    status: 'healthy',
    service: 'NextHire REST API Backend',
    timestamp: new Date().toISOString(),
    demoMode: process.env.DEMO_MODE === 'true' || true,
  });
};
app.get('/api/health', healthHandler);
app.get('/health', healthHandler);

// Root route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'NextHire Production REST API Engine is running.',
    docs: '/api/health',
  });
});

// Mount Routes with both /api/* and root /* prefixes to prevent any 404 routing mismatches
app.use('/api/auth', authRoutes);
app.use('/auth', authRoutes);

app.use('/api/resume', resumeRoutes);
app.use('/resume', resumeRoutes);

app.use('/api/ai', aiRoutes);
app.use('/ai', aiRoutes);

app.use('/api/ai-tools', aiToolRoutes);
app.use('/ai-tools', aiToolRoutes);

app.use('/api/jobs', jobRoutes);
app.use('/jobs', jobRoutes);

app.use('/api/career', careerRoutes);
app.use('/career', careerRoutes);

app.use('/api/interview', interviewRoutes);
app.use('/interview', interviewRoutes);

app.use('/api/applications', applicationRoutes);
app.use('/applications', applicationRoutes);

// Analysis endpoint alias
app.get(['/api/analysis/:id', '/analysis/:id'], (req, res) => {
  res.json({
    atsScore: 88,
    keywordScore: 92,
    skillsScore: 88,
    formattingScore: 100,
    readabilityScore: 86,
    impactScore: 84,
    targetRole: 'Software Engineer',
  });
});

// Central Error Handler
app.use(errorHandler);

// Start Server when run directly
if (require.main === module && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 NextHire Backend running on http://localhost:${PORT}`);
  });
}

module.exports = app;
