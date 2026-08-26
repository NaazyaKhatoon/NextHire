import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/Toast';
import ProtectedRoute from './components/ProtectedRoute';

// Global Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import About from './pages/About';
import Pricing from './pages/Pricing';
import Dashboard from './pages/Dashboard';
import ATSScanner from './pages/ATSScanner';
import AnalysisResult from './pages/AnalysisResult';
import JobMatcher from './pages/JobMatcher';
import ResumeGenerator from './pages/ResumeGenerator';
import ResumeEditor from './pages/ResumeEditor';
import Templates from './pages/Templates';
import AIRewriter from './pages/AIRewriter';
import Chatbot from './pages/Chatbot';
import ResumeHistory from './pages/ResumeHistory';
import Settings from './pages/Settings';
import SkillGapAnalyzer from './pages/SkillGapAnalyzer';
import CareerRoadmap from './pages/CareerRoadmap';
import InterviewPrep from './pages/InterviewPrep';
import MockInterview from './pages/MockInterview';
import ApplicationTracker from './pages/ApplicationTracker';
import ApplicationAnalytics from './pages/ApplicationAnalytics';
import ProjectAnalyzer from './pages/ProjectAnalyzer';
import LinkedInAnalyzer from './pages/LinkedInAnalyzer';
import ResumeABTesting from './pages/ResumeABTesting';

const AppLayout = () => {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Pages that display the dashboard sidebar
  const dashboardRoutes = [
    '/dashboard',
    '/ats-scanner',
    '/analysis-result',
    '/job-matcher',
    '/resume-generator',
    '/resume-editor',
    '/templates',
    '/ai-rewriter',
    '/chatbot',
    '/resume-history',
    '/skill-gap',
    '/career-roadmap',
    '/interview-prep',
    '/mock-interview',
    '/application-tracker',
    '/application-analytics',
    '/project-analyzer',
    '/linkedin-analyzer',
    '/resume-ab-testing',
    '/settings',
  ];

  const showSidebar = dashboardRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 flex flex-col">
      <Navbar />

      <div className="flex-1 flex w-full">
        {showSidebar && (
          <Sidebar
            isCollapsed={sidebarCollapsed}
            setIsCollapsed={setSidebarCollapsed}
          />
        )}

        <main className={`flex-1 ${showSidebar ? 'p-4 sm:p-8 max-w-7xl mx-auto w-full' : ''}`}>
          <Routes>
            {/* Public Pages */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/about" element={<About />} />
            <Route path="/pricing" element={<Pricing />} />

            {/* Core & Protected App Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ats-scanner"
              element={
                <ProtectedRoute>
                  <ATSScanner />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analysis-result"
              element={
                <ProtectedRoute>
                  <AnalysisResult />
                </ProtectedRoute>
              }
            />
            <Route
              path="/job-matcher"
              element={
                <ProtectedRoute>
                  <JobMatcher />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resume-generator"
              element={
                <ProtectedRoute>
                  <ResumeGenerator />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resume-editor"
              element={
                <ProtectedRoute>
                  <ResumeEditor />
                </ProtectedRoute>
              }
            />
            <Route
              path="/templates"
              element={
                <ProtectedRoute>
                  <Templates />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ai-rewriter"
              element={
                <ProtectedRoute>
                  <AIRewriter />
                </ProtectedRoute>
              }
            />
            <Route
              path="/chatbot"
              element={
                <ProtectedRoute>
                  <Chatbot />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resume-history"
              element={
                <ProtectedRoute>
                  <ResumeHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/skill-gap"
              element={
                <ProtectedRoute>
                  <SkillGapAnalyzer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/career-roadmap"
              element={
                <ProtectedRoute>
                  <CareerRoadmap />
                </ProtectedRoute>
              }
            />
            <Route
              path="/interview-prep"
              element={
                <ProtectedRoute>
                  <InterviewPrep />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mock-interview"
              element={
                <ProtectedRoute>
                  <MockInterview />
                </ProtectedRoute>
              }
            />
            <Route
              path="/application-tracker"
              element={
                <ProtectedRoute>
                  <ApplicationTracker />
                </ProtectedRoute>
              }
            />
            <Route
              path="/application-analytics"
              element={
                <ProtectedRoute>
                  <ApplicationAnalytics />
                </ProtectedRoute>
              }
            />
            <Route
              path="/project-analyzer"
              element={
                <ProtectedRoute>
                  <ProjectAnalyzer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/linkedin-analyzer"
              element={
                <ProtectedRoute>
                  <LinkedInAnalyzer />
                </ProtectedRoute>
              }
            />
            <Route
              path="/resume-ab-testing"
              element={
                <ProtectedRoute>
                  <ResumeABTesting />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <AppLayout />
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
