import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  History, 
  Search, 
  Filter, 
  FileText, 
  Edit3, 
  FileSearch, 
  Copy, 
  Trash2, 
  Download, 
  Plus,
  Sparkles,
  TrendingUp
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import EmptyState from '../components/EmptyState';
import { formatDate, getScoreBg } from '../utils/formatters';
import { useToast } from '../components/Toast';

const INITIAL_HISTORY = [
  {
    _id: 'hist-1',
    title: 'Senior Software Engineer (AWS & React)',
    targetRole: 'Senior Full-Stack Engineer',
    atsScore: 88,
    version: 'v2.4',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    _id: 'hist-2',
    title: 'Lead DevOps & Cloud Engineer',
    targetRole: 'DevOps / Cloud Engineer',
    atsScore: 82,
    version: 'v1.8',
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    _id: 'hist-3',
    title: 'Product Engineering Lead',
    targetRole: 'Engineering Manager',
    atsScore: 79,
    version: 'v1.2',
    createdAt: new Date(Date.now() - 86400000 * 35).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 6).toISOString(),
  },
  {
    _id: 'hist-4',
    title: 'Senior Frontend Architect',
    targetRole: 'Frontend Developer',
    atsScore: 91,
    version: 'v3.0',
    createdAt: new Date(Date.now() - 86400000 * 45).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 12).toISOString(),
  }
];

const ResumeHistory = () => {
  const [resumes, setResumes] = useState(INITIAL_HISTORY);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMode, setFilterMode] = useState('all'); // 'all' | 'high' | 'recent'
  const toast = useToast();

  const filteredResumes = resumes.filter((r) => {
    const matchesSearch =
      r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.targetRole.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    if (filterMode === 'high') return r.atsScore >= 85;
    return true;
  });

  const handleDelete = (id) => {
    setResumes((prev) => prev.filter((r) => r._id !== id));
    toast.success('Resume version deleted');
  };

  const handleDuplicate = (resume) => {
    const dup = {
      ...resume,
      _id: 'hist-' + Date.now(),
      title: `${resume.title} (Clone)`,
      version: 'v1.0',
      updatedAt: new Date().toISOString(),
    };
    setResumes((prev) => [dup, ...prev]);
    toast.success('Cloned resume version created!');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2.5">
            <History className="w-6 h-6 text-brand-400" />
            Resume Version History & Archives
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage, duplicate, audit, and compare all created and parsed resume iterations
          </p>
        </div>

        <Link to="/resume-generator">
          <Button variant="gradient" size="md" icon={Plus} className="shadow-glow">
            New Resume
          </Button>
        </Link>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title or target role..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-dark-800 border border-slate-700 text-white placeholder-slate-500 text-xs focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          <button
            onClick={() => setFilterMode('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterMode === 'all' ? 'bg-brand-600 text-white' : 'bg-dark-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({resumes.length})
          </button>
          <button
            onClick={() => setFilterMode('high')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              filterMode === 'high' ? 'bg-brand-600 text-white' : 'bg-dark-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            High ATS (85%+)
          </button>
        </div>
      </div>

      {/* Table or Empty State */}
      {filteredResumes.length === 0 ? (
        <EmptyState
          title="No resumes match your criteria"
          description="Try clearing your search filters or generate a new resume with AI."
          actionLabel="Create Resume"
          onAction={() => window.location.href = '/resume-generator'}
        />
      ) : (
        <div className="rounded-3xl bg-dark-800/80 border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-dark-900/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="px-6 py-4">Title & Version</th>
                  <th className="px-6 py-4">Target Role</th>
                  <th className="px-6 py-4">ATS Score</th>
                  <th className="px-6 py-4">Created Date</th>
                  <th className="px-6 py-4">Last Updated</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredResumes.map((resume) => (
                  <tr key={resume._id} className="hover:bg-dark-750/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-400">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <div>{resume.title}</div>
                          <span className="text-[10px] text-slate-500 font-mono">{resume.version}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-300">{resume.targetRole}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getScoreBg(resume.atsScore)}`}>
                        {resume.atsScore}% Match
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400">{formatDate(resume.createdAt)}</td>
                    <td className="px-6 py-4 text-slate-400">{formatDate(resume.updatedAt)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/resume-editor?id=${resume._id}`}>
                          <button className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-dark-700 transition-colors" title="Edit in Studio">
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </Link>
                        <Link to={`/analysis-result?id=${resume._id}`}>
                          <button className="p-1.5 text-slate-400 hover:text-brand-300 rounded-lg hover:bg-dark-700 transition-colors" title="ATS Report">
                            <FileSearch className="w-4 h-4" />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDuplicate(resume)}
                          className="p-1.5 text-slate-400 hover:text-sky-300 rounded-lg hover:bg-dark-700 transition-colors"
                          title="Clone Version"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(resume._id)}
                          className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-dark-700 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeHistory;
