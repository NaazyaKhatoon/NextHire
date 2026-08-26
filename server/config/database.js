const { Pool } = require('pg');

let pool = null;
let isConnected = false;
let isDemoStore = false;

const getDatabaseUrl = () => {
  return (
    process.env.DATABASE_URL ||
    process.env.NEON_DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.POSTGRESQL_URL ||
    ''
  ).trim();
};

const initNeonTables = async (client) => {
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        target_role VARCHAR(255) DEFAULT 'Software Engineer',
        profile JSONB DEFAULT '{}',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS resumes (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        title VARCHAR(255) DEFAULT 'Software Engineer Resume',
        target_role VARCHAR(255) DEFAULT 'Software Engineer',
        template VARCHAR(100) DEFAULT 'tech',
        fresher_mode BOOLEAN DEFAULT FALSE,
        personal_info JSONB DEFAULT '{}',
        skills JSONB DEFAULT '[]',
        experience JSONB DEFAULT '[]',
        education JSONB DEFAULT '[]',
        projects JSONB DEFAULT '[]',
        certifications JSONB DEFAULT '[]',
        custom_sections JSONB DEFAULT '[]',
        ats_score INTEGER DEFAULT 88,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS applications (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        company VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        location VARCHAR(255) DEFAULT 'Remote',
        salary VARCHAR(255) DEFAULT '$120k - $150k',
        job_description TEXT DEFAULT '',
        status VARCHAR(100) DEFAULT 'Applied',
        applied_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        deadline TIMESTAMP WITH TIME ZONE,
        resume_version VARCHAR(255) DEFAULT 'Senior Full-Stack Resume v2.4',
        match_score INTEGER DEFAULT 88,
        notes TEXT DEFAULT '',
        interview_date TIMESTAMP WITH TIME ZONE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS career_profiles (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) UNIQUE NOT NULL,
        target_role VARCHAR(255) DEFAULT 'Senior Full-Stack Engineer',
        career_readiness_score INTEGER DEFAULT 91,
        breakdown JSONB DEFAULT '{}',
        streak_days INTEGER DEFAULT 5,
        last_active_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        today_challenge JSONB DEFAULT '{}',
        completed_challenges_count INTEGER DEFAULT 14,
        saved_motivations JSONB DEFAULT '[]',
        skill_roadmap JSONB DEFAULT '[]',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS interview_sessions (
        id VARCHAR(255) PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        target_role VARCHAR(255) DEFAULT 'Senior Full-Stack Engineer',
        overall_score INTEGER DEFAULT 84,
        breakdown JSONB DEFAULT '{}',
        questions JSONB DEFAULT '[]',
        strengths JSONB DEFAULT '[]',
        improvements JSONB DEFAULT '[]',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Neon PostgreSQL Database Schema Verified & Migrated.');
  } catch (err) {
    console.error('⚠️  Neon PostgreSQL Schema Migration Warning:', err.message);
  }
};

const connectDB = async () => {
  const connectionString = getDatabaseUrl();

  if (!connectionString) {
    console.log('ℹ️  Neon DATABASE_URL not configured. Running with High-Fidelity Dual In-Memory Store.');
    isDemoStore = true;
    return;
  }

  try {
    pool = new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false,
      },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 7000,
    });

    // Handle unexpected idle connection errors to prevent process crash in serverless/Node
    pool.on('error', (err) => {
      console.warn('⚠️  Unexpected PostgreSQL idle client error (handled):', err.message);
    });

    const client = await pool.connect();
    const result = await client.query('SELECT NOW() as now, version() as version');
    console.log(`✅ Connected to Neon PostgreSQL Database successfully: ${result.rows[0].now}`);
    await initNeonTables(client);
    client.release();

    isConnected = true;
    isDemoStore = false;
  } catch (error) {
    console.warn(`⚠️  Neon PostgreSQL connection failed (${error.message}). Falling back to In-Memory Store.`);
    isDemoStore = true;
    isConnected = false;
  }
};

const query = async (text, params) => {
  if (!pool || !isConnected) return null;
  return pool.query(text, params);
};

module.exports = {
  connectDB,
  query,
  isConnected: () => isConnected,
  isDemoStore: () => isDemoStore,
  getPool: () => pool,
};
