# NextHire — AI-Powered Career Readiness & ATS Optimization Platform

<div align="center">

**Build a resume that gets noticed. Land interviews faster.**  
*Scan. Improve. Practice. Get Hired.*

</div>

---

## 🚀 Overview

**NextHire** is an enterprise-grade, full-stack AI-powered career SaaS platform designed to reverse-engineer modern Applicant Tracking Systems (ATS) and supercharge candidate job applications.

Many job seekers fail to get shortlisted because their resumes are not ATS-optimized. Manually finding missing skills, keywords, formatting errors, and job mismatches is difficult. NextHire evaluates resumes, identifies gaps, provides ATS-friendly suggestions, performs real-time mock interviews, tracks applications, and delivers customized career roadmaps.

---

## 🏗️ Architecture

```
┌────────────────────────────────────────────────────────┐
│                   React + Vite Client                  │
│   (Tailwind 3.4.17, Framer Motion, Lucide, Recharts)   │
│                      Port: 5173                        │
└───────────────────────────┬────────────────────────────┘
                            │ HTTP / REST (JWT Auth)
                            ▼
┌────────────────────────────────────────────────────────┐
│               Node.js + Express Backend                │
│   (Controllers, Routes, Auth, Multer, Neon / In-Memory)│
│                      Port: 5000                        │
└───────────────────────────┬────────────────────────────┘
                            │ Internal REST Proxy
                            ▼
┌────────────────────────────────────────────────────────┐
│                Python FastAPI AI Engine                │
│ (Deterministic ATS Engine, PDF/DOCX Parser, Copilot)   │
│                      Port: 8000                        │
└────────────────────────────────────────────────────────┘
```

---

## 📂 Project Structure

```
NextHire/
│
├── client/                      # React 18 + Vite Frontend
│   ├── index.html               # Entry HTML
│   ├── package.json             # Tailwind 3.4.17, Recharts, Lucide, Canvas-Confetti
│   ├── vite.config.js           # Proxy configuration to port 5000
│   ├── tailwind.config.js       # Curated dark-mode design system & glowing palettes
│   ├── postcss.config.js
│   ├── .env.example
│   └── src/
│       ├── main.jsx             # React DOM root mounting entry
│       ├── App.jsx              # React Router setup & protected routes
│       ├── index.css            # Tailwind directives, print styles, custom scrollbars
│       ├── components/          # 20+ Reusable UI components & modals
│       ├── pages/               # 20+ Core Application Pages & Dashboards
│       ├── services/            # Axios API wrappers (auth, resume, ai, career)
│       ├── context/             # AuthContext with 1-click Demo support
│       └── utils/               # Formatters & Validators
│
├── server/                      # Node.js + Express REST API
│   ├── package.json
│   ├── server.js                # Express app, Helmet, CORS, Rate Limiting
│   ├── .env.example
│   ├── config/database.js       # Neon PostgreSQL / Mongoose / In-Memory dual mode
│   ├── controllers/             # Auth, Resume, AI, Career, Interview, Job controllers
│   ├── routes/                  # Express REST routes
│   ├── models/                  # Schemas for User, Resume, Analysis, CareerProfile, Applications
│   ├── middleware/              # Auth, Multer upload, and Error handling
│   └── services/                # Proxy to Python AI & text extraction
│
├── ai-service/                  # Python FastAPI AI Microservice
│   ├── main.py                  # FastAPI app on port 8000
│   ├── requirements.txt
│   ├── .env.example
│   ├── routes/                  # /analyze, /generate, /chatbot, /match
│   ├── services/                # Deterministic ATS analyzer, Skill extractor, Copilot
│   ├── models/                  # Pydantic validation schemas
│   └── utils/               # Text processing, Flesch readability, Action verbs
│
├── start-all.js                 # Cross-platform single-command runner
├── package.json                 # Root orchestration scripts
└── README.md
```

---

## 🌟 Key Features

### 1. Deterministic Multi-Factor ATS Scoring
Our scoring engine uses transparent mathematical weighting:
- **Keyword Match (30%)**: Semantic role keyword density against benchmark taxonomies.
- **Skills Match (20%)**: Extraction across 500+ technical, cloud, database, and leadership competencies.
- **Formatting (15%)**: Single-column layout validation, margin checking, and blocker removal.
- **Section Detection (10%)**: Standard header hierarchy (Summary, Experience, Skills, Education).
- **Readability (10%)**: Flesch Reading Ease algorithm scoring.
- **Achievement Impact (10%)**: Action verb analysis and metric frequency.
- **Contact Info (5%)**: Complete email, phone, location, LinkedIn, and GitHub coordinates.

### 2. Live A4 Resume Studio & Editor
- Split-screen workspace with live synchronized A4 paper rendering.
- **12+ ATS-Tested Templates**: Modern Pro, Minimalist Clean, Executive Corporate, Software Engineer, Modern Creative, ATS Classic, Nordic Tech, Silicon Valley Elite, Compact Density, and more.
- In-place AI bullet point enhancement buttons.
- Vector-quality PDF export and print formatting.

### 3. AI Bullet Rewriter & Truth Checker
- 4 Optimization Focus Modes: **Achievement-Focused**, **Technical Depth**, **Leadership & Mentorship**, **Executive / Concise**.
- Explains the exact rationale for why changes improve recruiter conversion.
- Strictly respects candidate truths with zero invented credentials.

### 4. Job Description Matcher & Gap Analysis
- Compares resume text side-by-side against any target job description.
- Highlights matched skills vs missing requirements with 1-click additions.

### 5. Context-Aware Career Copilot & Mock Interview Room
- 24/7 personal career advisor trained on hiring benchmarks.
- Real-time interactive AI mock interview room with tailored scoring and feedback.

---

## ⚡ Quick Start & Running Locally

### Prerequisites
- Node.js v18+ & npm
- Python 3.10+ & pip

### Single-Command Start (Root)
```bash
# 1. Install all dependencies
npm run install:all

# 2. Start all services concurrently (Frontend on 5173, Backend on 5000, AI on 8000)
npm run dev
```

### Or Run Individual Services:

#### 1. Frontend Client
```bash
cd client
npm install
npm run dev
# Running on http://localhost:5173
```

#### 2. Express Backend
```bash
cd server
npm install
npm run dev
# Running on http://localhost:5000
```

#### 3. Python FastAPI Engine
```bash
cd ai-service
pip install -r requirements.txt
python -m uvicorn main:app --port 8000 --reload
# Running on http://localhost:8000
```

---

## 🔒 100% Demo Mode Guarantee

NextHire is equipped with a zero-friction demo mode (`DEMO_MODE=true`):
- **No PostgreSQL/MongoDB required**: Seamlessly operates on an in-memory dual-store adapter.
- **No external AI API keys required**: Deterministic NLP scoring and local AI engines operate out of the box.
- **1-Click Demo Login**: Preloaded with realistic Senior Engineer resumes, metrics, and history.

---

## 📡 REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/signup` | Register new user account |
| `POST` | `/api/auth/login` | Sign in with email and password |
| `POST` | `/api/auth/demo-login` | 1-Click instant demo login bypass |
| `GET` | `/api/auth/me` | Fetch authenticated user profile |
| `POST` | `/api/resume/analyze` | Parse and audit resume file (PDF/DOCX/TXT) or text |
| `GET` | `/api/resume` | List user resumes |
| `POST` | `/api/resume` | Save or create resume draft |
| `PUT` | `/api/resume/:id` | Update existing resume |
| `POST` | `/api/ai/enhance-bullet`| Enhance resume bullet point |
| `POST` | `/api/ai/generate-summary`| Generate executive summary |
| `POST` | `/api/ai/generate-resume`| Wizard full resume assembly |
| `POST` | `/api/ai/chat` | Contextual Career Copilot response |
| `POST` | `/api/jobs/match` | Match resume against job description |
| `GET` | `/api/career/profile` | Get candidate career readiness profile |
| `POST` | `/api/interview/start` | Start AI mock interview session |

---

## 🛡️ License

MIT License. Built with ❤️ for NextHire.
