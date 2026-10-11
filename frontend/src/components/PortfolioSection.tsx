import React, { useState } from 'react';
import { UserState, ActiveTab } from '../types';
import { 
  Award, 
  BookOpen, 
  FolderGit2, 
  Trophy, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Star, 
  Download, 
  Calendar, 
  Clock, 
  ExternalLink, 
  User, 
  Plus, 
  Check, 
  FileText, 
  X, 
  BarChart3, 
  Eye, 
  Heart, 
  Share2, 
  Search, 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Code2, 
  ChevronLeft, 
  ChevronRight, 
  TrendingUp, 
  Filter,
  Flame,
  Zap,
  Copy,
  Printer,
  Layers,
  Bot,
  Target
} from 'lucide-react';

interface PortfolioSectionProps {
  userState: UserState;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenCertificate: (courseTitle?: string, certificateId?: string, issueDate?: string) => void;
  onSendToast?: (msg: string, type?: 'success' | 'error' | 'info') => void;
  onOpenModule?: (moduleId: string) => void;
}

export type PortfolioSubTab = 
  | 'portfolio' 
  | 'certificates' 
  | 'completed-projects' 
  | 'lesson-history' 
  | 'public-portfolio';

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({
  userState,
  setActiveTab,
  onOpenCertificate,
  onSendToast,
  onOpenModule = () => {},
}) => {
  const [activeSubTab, setActiveSubTab] = useState<PortfolioSubTab>('portfolio');

  // Interactive local states for 97-101
  const [portfolioFilter, setPortfolioFilter] = useState<'All' | 'In Progress' | 'Completed' | 'Featured'>('All');
  const [certFilter, setCertFilter] = useState<'All' | 'Earned' | 'In Progress'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [lessonSearchQuery, setLessonSearchQuery] = useState('');
  const [analyticsMode, setAnalyticsMode] = useState<'all' | 'learning' | 'portfolio'>('all');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

// Local certificates data
  const CERTIFICATES_LIST = [
    { id: 'fullstack-web', title: 'Full Stack Web Development', instructor: 'Alex Rivera', category: 'Web Dev' },
    { id: 'python-programming', title: 'Python Programming', instructor: 'Sarah Chen', category: 'Programming' },
    { id: 'data-science-python', title: 'Data Science with Python', instructor: 'David Miller', category: 'Data Science' },
    { id: 'ui-ux-design', title: 'UI/UX Design Fundamentals', instructor: 'Elena Rostova', category: 'UI/UX' },
    { id: 'ai-innovation', title: 'AI Innovation', instructor: 'Dr. Vance & Team', category: 'AI & ML' },
    { id: 'env-innovation', title: 'Environmental Innovation', instructor: 'Prof. Marcus Thorne', category: 'Environmental AI' },
    { id: 'soft-skills', title: 'Soft Skills Training', instructor: 'Maya Lin', category: 'Soft Skills' },
    { id: 'english-learning', title: 'English Learning', instructor: 'James Wilson', category: 'Language' },
    { id: 'interview-skills', title: 'Interview Skills', instructor: 'David Miller', category: 'Career' },
  ];

  // Dynamically map certificates according to completed/enrolled status
  const certificates = CERTIFICATES_LIST.map((course, idx) => {
    const isCompleted = userState.completedModules.includes(course.id) || idx < 3;
    return {
      id: `cert-${course.id}`,
      courseId: course.id,
      title: course.title,
      date: isCompleted ? 'August 11, 2026' : 'In Progress',
      issuer: course.instructor || 'NexusCraft Faculty',
      certId: `NC-2026-${course.id.toUpperCase().slice(0, 4)}-${1000 + idx * 137}`,
      status: isCompleted ? ('Verified' as const) : ('In Progress' as const),
      category: course.category || 'AI Innovation',
    };
  });

  // 97 Projects Data
  const projectsList = [
    { id: 'p1', title: 'AI Chatbot Assistant', desc: 'An intelligent chatbot built with NLP and Machine Learning', tech: ['Python', 'NLP', 'TensorFlow'], category: 'Completed', featured: true, stars: 45, likes: 12 },
    { id: 'p2', title: 'E-Learning Platform', desc: 'A full-stack e-learning platform with video streaming', tech: ['React', 'Node.js', 'MongoDB'], category: 'Completed', featured: true, stars: 68, likes: 24 },
    { id: 'p3', title: 'Weather Dashboard', desc: 'Real-time weather app with forecast and analytics', tech: ['JavaScript', 'API', 'Chart.js'], category: 'Completed', featured: false, stars: 32, likes: 8 },
    { id: 'p4', title: 'Task Management App', desc: 'A productivity app to manage tasks and teams', tech: ['Vue.js', 'Firebase'], category: 'In Progress', featured: false, stars: 28, likes: 15 },
    { id: 'p5', title: 'Data Visualization Tool', desc: 'Interactive data visualization with multiple charts', tech: ['Python', 'D3.js', 'Flask'], category: 'Completed', featured: false, stars: 52, likes: 18 },
    { id: 'p6', title: 'Portfolio Website', desc: 'Personal portfolio website to showcase my work', tech: ['HTML', 'CSS', 'JavaScript'], category: 'Completed', featured: true, stars: 42, likes: 10 },
  ];

  // 98 Completed Projects Data
  const completedProjectsTable = [
    { name: 'AI Chatbot Assistant', tech: 'Python, NLP, TensorFlow', date: 'May 15, 2025' },
    { name: 'E-Learning Platform', tech: 'React, Node.js, MongoDB', date: 'May 10, 2025' },
    { name: 'Weather Dashboard', tech: 'JavaScript, API, Chart.js', date: 'May 02, 2025' },
    { name: 'Task Management App', tech: 'Vue.js, Firebase', date: 'Apr 28, 2025' },
    { name: 'Portfolio Website', tech: 'HTML, CSS, JavaScript', date: 'Apr 20, 2025' },
    { name: 'Expense Tracker', tech: 'React, Node.js, Express', date: 'Apr 15, 2025' },
    { name: 'Quiz Application', tech: 'JavaScript, Firebase', date: 'Apr 02, 2025' },
    { name: 'Note Taking App', tech: 'React, Local Storage', date: 'Mar 25, 2025' },
  ];

  // 99 Lesson History Data
  const lessonHistoryTable = [
    { lesson: 'Introduction to Python', course: 'Python for Beginners', date: 'May 15, 2025', time: '45m', score: '100%' },
    { lesson: 'Data Types in Python', course: 'Python for Beginners', date: 'May 15, 2025', time: '32m', score: '95%' },
    { lesson: 'Control Structures', course: 'Python for Beginners', date: 'May 14, 2025', time: '40m', score: '90%' },
    { lesson: 'Functions in Python', course: 'Python for Beginners', date: 'May 14, 2025', time: '35m', score: '100%' },
    { lesson: 'Web Development Basics', course: 'Web Development', date: 'May 13, 2025', time: '50m', score: '92%' },
    { lesson: 'HTML Fundamentals', course: 'Web Development', date: 'May 13, 2025', time: '38m', score: '100%' },
    { lesson: 'CSS Styling', course: 'Web Development', date: 'May 12, 2025', time: '42m', score: '88%' },
    { lesson: 'JavaScript Introduction', course: 'JavaScript Basics', date: 'May 12, 2025', time: '45m', score: '95%' },
    { lesson: 'Variables and Data Types', course: 'JavaScript Basics', date: 'May 11, 2025', time: '30m', score: '100%' },
    { lesson: 'DOM Manipulation', course: 'JavaScript Basics', date: 'May 11, 2025', time: '50m', score: '92%' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Top Header Bar & Navigation Sub-Tabs */}
      <div className="bg-gradient-to-r from-[#0b1329] via-[#0f1b38] to-[#0b1329] border border-[#1e2d4a] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
                Portfolio
              </span>
            </div>
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
              Career and project portfolio
            </h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl">
              Showcase your projects, career credentials, learning history, and public portfolio in one place.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start lg:self-auto flex-wrap">
            <button
              onClick={() => setIsExportModalOpen(true)}
              className="px-5 py-3 rounded-2xl bg-[#10192d] hover:bg-[#182542] border border-teal-500/40 text-teal-300 font-extrabold text-xs shadow-lg shadow-teal-500/10 transition-all cursor-pointer flex items-center gap-2 group"
            >
              <Download className="w-4 h-4 text-teal-400 group-hover:scale-110 transition-transform" />
              <span>Export My Progress</span>
            </button>

            <button
              onClick={() => {
                if (onSendToast) onSendToast('Opening new project creation modal...', 'info');
              }}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-black text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Project</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pt-2 pb-1 border-t border-[#1e2d4a]">
          {[
            { id: 'portfolio' as PortfolioSubTab, label: 'Projects & Career Showcase', icon: FolderGit2 },
            { id: 'certificates' as PortfolioSubTab, label: 'Verified Credentials', icon: Award },
            { id: 'completed-projects' as PortfolioSubTab, label: 'Completed Projects', icon: CheckCircle2 },
            { id: 'lesson-history' as PortfolioSubTab, label: 'Lesson History', icon: BookOpen },
            { id: 'public-portfolio' as PortfolioSubTab, label: 'Public portfolio', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? 'bg-cyan-500 text-black border-cyan-400 shadow-lg shadow-cyan-500/20 font-black'
                    : 'bg-[#10192d] text-gray-300 border-[#1e2d4a] hover:bg-[#182542] hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : 'text-cyan-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 97. PROJECT PORTFOLIO VIEW */}
      {activeSubTab === 'portfolio' && (
        <div className="space-y-6">
          {/* Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Total Projects', val: '24', color: 'text-white' },
              { label: 'Completed', val: '18', color: 'text-emerald-400' },
              { label: 'In Progress', val: '4', color: 'text-cyan-400' },
              { label: 'Technologies', val: '12', color: 'text-purple-400' },
            ].map((st, i) => (
              <div key={i} className="bg-[#0b1329] border border-[#1e2d4a] rounded-2xl p-4 shadow-xl">
                <div className="text-xs text-gray-400 font-bold uppercase">{st.label}</div>
                <div className={`text-2xl font-black mt-1 ${st.color}`}>{st.val}</div>
              </div>
            ))}
          </div>

          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0b1329] border border-[#1e2d4a] p-4 rounded-2xl shadow-xl">
            <div className="flex items-center gap-2">
              {(['All', 'In Progress', 'Completed', 'Featured'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setPortfolioFilter(f)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    portfolioFilter === f
                      ? 'bg-cyan-500 text-black font-black'
                      : 'bg-[#10192d] text-gray-400 hover:text-white border border-gray-800'
                  }`}
                >
                  {f === 'All' ? 'All Projects' : f}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-bold">Sort By:</span>
              <select className="bg-[#10192d] border border-gray-800 rounded-xl px-3 py-1.5 text-xs text-white outline-none">
                <option>Newest First</option>
                <option>Most Popular</option>
                <option>Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Project Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsList
              .filter(p => {
                if (portfolioFilter === 'All') return true;
                if (portfolioFilter === 'Featured') return p.featured;
                return p.category === portfolioFilter;
              })
              .map(p => (
                <div key={p.id} className="bg-[#0b1329] border border-[#1e2d4a] rounded-3xl p-6 shadow-xl space-y-4 hover:border-cyan-500/40 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        p.category === 'Completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                      }`}>
                        {p.category}
                      </span>
                      <div className="flex items-center gap-3 text-xs text-gray-400 font-bold">
                        <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {p.stars}</span>
                        <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" /> {p.likes}</span>
                      </div>
                    </div>

                    <h3 className="font-display text-lg font-black text-white">{p.title}</h3>
                    <p className="text-xs text-gray-300">{p.desc}</p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.tech.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded-md bg-[#10192d] border border-gray-800 text-[10px] font-mono text-cyan-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
                    <button
                      onClick={() => onSendToast && onSendToast(`Opening ${p.title} project view...`, 'info')}
                      className="text-xs font-bold text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onSendToast && onSendToast(`Live Demo launched for ${p.title}`, 'success')}
                      className="p-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs cursor-pointer"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* CERTIFICATES SUB-TAB VIEW */}
      {activeSubTab === 'certificates' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Certificate Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Total Track Certs', val: certificates.length.toString(), color: 'text-white' },
              { label: 'Verified & Earned', val: certificates.filter(c => c.status === 'Verified').length.toString(), color: 'text-emerald-400' },
              { label: 'In Progress', val: certificates.filter(c => c.status === 'In Progress').length.toString(), color: 'text-amber-400' },
              { label: 'Credential Standard', val: 'ERC-721 Ready', color: 'text-purple-400' },
            ].map((st, i) => (
              <div key={i} className="bg-[#0b1329] border border-[#1e2d4a] rounded-2xl p-4 shadow-xl">
                <div className="text-xs text-gray-400 font-bold uppercase">{st.label}</div>
                <div className={`text-2xl font-black mt-1 ${st.color}`}>{st.val}</div>
              </div>
            ))}
          </div>

          {/* Certificates Header Banner & Actions */}
          <div className="bg-[#0b1329] border border-[#1e2d4a] rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-xl font-black text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-400" />
                <span>Verified Credentials & Certificates</span>
              </h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Every completed course issues an immutable, tamper-proof credential with a cryptographic hash.
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {(['All', 'Earned', 'In Progress'] as const).map(f => (
                <button
                  key={f}
                  onClick={() => setCertFilter(f)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    certFilter === f
                      ? 'bg-cyan-500 text-black font-black shadow-md shadow-cyan-500/20'
                      : 'bg-[#10192d] text-gray-400 hover:text-white border border-gray-800'
                  }`}
                >
                  {f === 'All' ? 'All Certificates' : f === 'Earned' ? 'Earned (Verified)' : 'In Progress'}
                </button>
              ))}
            </div>
          </div>

          {/* Certificates Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates
              .filter(c => {
                if (certFilter === 'All') return true;
                if (certFilter === 'Earned') return c.status === 'Verified';
                return c.status === 'In Progress';
              })
              .map(cert => (
                <div 
                  key={cert.id} 
                  className="bg-[#0b1329] border border-[#1e2d4a] rounded-3xl p-6 shadow-xl space-y-4 hover:border-cyan-500/40 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 ${
                        cert.status === 'Verified'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>{cert.status}</span>
                      </span>
                      <span className="text-[11px] text-gray-400 font-bold">{cert.issuer}</span>
                    </div>

                    <div className="pt-1">
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-cyan-400">
                        {cert.category}
                      </span>
                      <h3 className="font-display text-lg font-black text-white group-hover:text-cyan-300 transition-colors mt-0.5">
                        {cert.title}
                      </h3>
                    </div>

                    <div className="space-y-1 text-xs text-gray-400 pt-1">
                      <div className="flex items-center justify-between">
                        <span>Issued On:</span>
                        <span className="text-gray-200 font-semibold">{cert.date}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Credential ID:</span>
                        <span className="text-cyan-400 font-mono text-[11px]">{cert.certId}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-800 flex items-center gap-2">
                    <button
                      onClick={() => onOpenCertificate(cert.title, cert.certId, cert.date)}
                      className="flex-1 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>View Full Certificate</span>
                    </button>
                    <button
                      onClick={() => {
                        if (onSendToast) onSendToast(`Certificate credential link (${cert.certId}) copied to clipboard!`, 'success');
                      }}
                      className="p-2.5 rounded-xl bg-[#10192d] hover:bg-gray-800 text-gray-300 transition-all cursor-pointer border border-gray-800"
                      title="Share Certificate"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* 98. COMPLETED PROJECTS VIEW */}
      {activeSubTab === 'completed-projects' && (
        <div className="space-y-6">
          <div className="bg-[#0b1329] border border-[#1e2d4a] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-black text-white">Completed Projects</h2>
                <p className="text-xs text-gray-400">Projects you have successfully completed</p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search completed projects..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="w-full bg-[#10192d] border border-gray-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            </div>

            {/* Completed Projects Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#1e2d4a] text-gray-400 uppercase text-[10px] font-black tracking-wider">
                    <th className="pb-3 px-3">Project</th>
                    <th className="pb-3 px-3">Technologies</th>
                    <th className="pb-3 px-3">Completed On</th>
                    <th className="pb-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e2d4a]">
                  {completedProjectsTable
                    .filter(cp => cp.name.toLowerCase().includes(searchQuery.toLowerCase()) || cp.tech.toLowerCase().includes(searchQuery.toLowerCase()))
                    .map((cp, idx) => (
                      <tr key={idx} className="hover:bg-[#10192d]/50 transition-colors">
                        <td className="py-3.5 px-3 font-bold text-white">{cp.name}</td>
                        <td className="py-3.5 px-3 text-cyan-300 font-mono text-[11px]">{cp.tech}</td>
                        <td className="py-3.5 px-3 text-gray-400">{cp.date}</td>
                        <td className="py-3.5 px-3 text-right">
                          <button
                            onClick={() => onSendToast && onSendToast(`Opening details for ${cp.name}`, 'info')}
                            className="px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[11px] font-bold cursor-pointer"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-2 text-xs text-gray-400 border-t border-[#1e2d4a]">
              <span>Showing 1 to 8 of 18 completed projects</span>
              <div className="flex items-center gap-1">
                <button className="p-1.5 rounded-lg bg-[#10192d] border border-gray-800 text-gray-400 hover:text-white cursor-pointer"><ChevronLeft className="w-4 h-4" /></button>
                <button className="px-2.5 py-1 rounded-lg bg-cyan-500 text-black font-black">1</button>
                <button className="px-2.5 py-1 rounded-lg bg-[#10192d] text-gray-300 hover:text-white">2</button>
                <button className="px-2.5 py-1 rounded-lg bg-[#10192d] text-gray-300 hover:text-white">3</button>
                <button className="p-1.5 rounded-lg bg-[#10192d] border border-gray-800 text-gray-400 hover:text-white cursor-pointer"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 99. LESSON HISTORY VIEW */}
      {activeSubTab === 'lesson-history' && (
        <div className="space-y-6">
          <div className="bg-[#0b1329] border border-[#1e2d4a] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Total Lessons', val: '156' },
                { label: 'Completed', val: '132' },
                { label: 'Total Learning Time', val: '67h 30m' },
                { label: 'Current Streak', val: '21 Days' },
              ].map((lh, i) => (
                <div key={i} className="bg-[#10192d] border border-gray-800 p-4 rounded-2xl">
                  <div className="text-[10px] text-gray-400 font-bold uppercase">{lh.label}</div>
                  <div className="text-xl font-black text-cyan-400 mt-1">{lh.val}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <h2 className="font-display text-xl font-black text-white">Lesson History</h2>
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search lessons..."
                  value={lessonSearchQuery}
                  onChange={e => setLessonSearchQuery(e.target.value)}
                  className="w-full bg-[#10192d] border border-gray-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Lessons Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#1e2d4a] text-gray-400 uppercase text-[10px] font-black tracking-wider">
                    <th className="pb-3 px-3">Lesson</th>
                    <th className="pb-3 px-3">Course</th>
                    <th className="pb-3 px-3">Completed On</th>
                    <th className="pb-3 px-3">Time Spent</th>
                    <th className="pb-3 px-3 text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e2d4a]">
                  {lessonHistoryTable
                    .filter(lh => lh.lesson.toLowerCase().includes(lessonSearchQuery.toLowerCase()) || lh.course.toLowerCase().includes(lessonSearchQuery.toLowerCase()))
                    .map((lh, idx) => (
                      <tr key={idx} className="hover:bg-[#10192d]/50 transition-colors">
                        <td className="py-3.5 px-3 font-bold text-white">{lh.lesson}</td>
                        <td className="py-3.5 px-3 text-gray-300">{lh.course}</td>
                        <td className="py-3.5 px-3 text-gray-400">{lh.date}</td>
                        <td className="py-3.5 px-3 text-cyan-400 font-mono">{lh.time}</td>
                        <td className="py-3.5 px-3 text-right font-black text-emerald-400">{lh.score}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs text-gray-400 border-t border-[#1e2d4a]">
              <span>Showing 1 to 10 of 132 completed lessons</span>
              <div className="flex items-center gap-1">
                <button className="px-2.5 py-1 rounded-lg bg-cyan-500 text-black font-black">1</button>
                <button className="px-2.5 py-1 rounded-lg bg-[#10192d] text-gray-300">2</button>
                <button className="px-2.5 py-1 rounded-lg bg-[#10192d] text-gray-300">3</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 101. PUBLIC PORTFOLIO VIEW */}
      {activeSubTab === 'public-portfolio' && (
        <div className="space-y-6">
          <div className="bg-[#0b1329] border border-[#1e2d4a] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-black text-3xl shadow-xl">
                SV
              </div>
              <div className="space-y-2 flex-1">
                <h2 className="font-display text-2xl font-black text-white">Sathwik Sai Varma</h2>
                <p className="text-xs text-cyan-400 font-extrabold">Full Stack Developer | AI Enthusiast | Problem Solver</p>
                <div className="flex items-center justify-center md:justify-start gap-3 pt-1">
                  <Github className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                  <Linkedin className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                  <Twitter className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                  <Mail className="w-4 h-4 text-gray-400 hover:text-white cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#10192d] border border-gray-800 space-y-1">
              <h4 className="text-xs font-black uppercase text-gray-300">About Me</h4>
              <p className="text-xs text-gray-300 leading-relaxed">
                Passionate about building web applications and AI solutions that solve real-world problems. Always learning and exploring new technologies.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              {[
                { label: 'Projects', val: '24' },
                { label: 'Completed', val: '18' },
                { label: 'Technologies', val: '12' },
                { label: 'Profile Views', val: '2.1K' },
              ].map((pstat, i) => (
                <div key={i} className="p-3 bg-[#10192d] rounded-xl border border-gray-800">
                  <div className="text-lg font-black text-white">{pstat.val}</div>
                  <div className="text-[10px] text-gray-400 uppercase font-bold">{pstat.label}</div>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-2">
              <h3 className="font-display text-base font-black text-white">Featured Projects</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {projectsList.slice(0, 4).map((fp) => (
                  <div key={fp.id} className="bg-[#10192d] border border-gray-800 rounded-2xl p-4 space-y-2">
                    <h4 className="font-bold text-white text-xs">{fp.title}</h4>
                    <p className="text-[11px] text-gray-400">{fp.desc}</p>
                    <div className="flex gap-1 pt-1">
                      {fp.tech.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-gray-900 text-[9px] font-mono text-cyan-300">{t}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Verified Certificates in Public Portfolio */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-black text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-cyan-400" />
                  <span>Verified Credentials & Certificates</span>
                </h3>
                <span className="text-[11px] text-emerald-400 font-bold">
                  {certificates.filter(c => c.status === 'Verified').length} Verified Credentials
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {certificates.filter(c => c.status === 'Verified').slice(0, 4).map((cert) => (
                  <div key={cert.id} className="bg-[#10192d] border border-gray-800 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        Verified
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">{cert.certId}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-xs">{cert.title}</h4>
                      <p className="text-[11px] text-gray-400 mt-0.5">Issued: {cert.date} • {cert.issuer}</p>
                    </div>
                    <button
                      onClick={() => onOpenCertificate(cert.title, cert.certId, cert.date)}
                      className="w-full py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>View Verified Credential</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EXPORT PROGRESS REPORT MODAL */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0b1329] border border-teal-500/30 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar p-6 sm:p-8 shadow-2xl relative space-y-6">
            {/* Close Button */}
            <button
              onClick={() => setIsExportModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-gray-800/80 hover:bg-gray-700 text-gray-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header & Verification Badge */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-400 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  Verified Learner Progress Report
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  REF: PRG-2026-8842
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-800 pb-4">
                <div>
                  <h2 className="font-display text-2xl font-black text-white">
                    {userState.userName || 'Sathwik Sai Varma'}
                  </h2>
                  <p className="text-xs text-cyan-400 font-bold mt-0.5">
                    Official Learning Transcript & Credentials Summary
                  </p>
                </div>
                <div className="text-left sm:text-right text-xs text-gray-400">
                  <div className="flex items-center gap-1 sm:justify-end">
                    <Calendar className="w-3.5 h-3.5 text-gray-500" />
                    <span>Generated: {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <span className="text-[10px] text-teal-400 font-bold block mt-0.5">Platform Verified Learner</span>
                </div>
              </div>
            </div>

            {/* Overview Key Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-[#10192d] border border-gray-800 space-y-1">
                <div className="text-[10px] text-gray-400 font-bold uppercase flex items-center gap-1">
                  <Zap className="w-3 h-3 text-amber-400" /> Total XP
                </div>
                <div className="text-xl font-black text-amber-400">{userState.totalPoints || 12450} XP</div>
                <div className="text-[10px] text-gray-500">Global Rank Top 5%</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#10192d] border border-gray-800 space-y-1">
                <div className="text-[10px] text-gray-400 font-bold uppercase flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-cyan-400" /> Completed
                </div>
                <div className="text-xl font-black text-white">
                  {userState.completedModules?.length || 14} Modules
                </div>
                <div className="text-[10px] text-emerald-400 font-bold">100% Verified</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#10192d] border border-gray-800 space-y-1">
                <div className="text-[10px] text-gray-400 font-bold uppercase flex items-center gap-1">
                  <Award className="w-3 h-3 text-purple-400" /> Badges
                </div>
                <div className="text-xl font-black text-purple-300">
                  {userState.earnedBadges?.length || 6} Badges
                </div>
                <div className="text-[10px] text-purple-400 font-bold">Earned & Verified</div>
              </div>

              <div className="p-4 rounded-2xl bg-[#10192d] border border-gray-800 space-y-1">
                <div className="text-[10px] text-gray-400 font-bold uppercase flex items-center gap-1">
                  <Flame className="w-3 h-3 text-orange-400" /> Active Streak
                </div>
                <div className="text-xl font-black text-orange-400">{userState.streak || 12} Days</div>
                <div className="text-[10px] text-gray-500">Consistent Learning</div>
              </div>
            </div>

            {/* Completed Modules Section */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-teal-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-400" />
                Completed Learning Modules ({userState.completedModules?.length || 8})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto custom-scrollbar p-1">
                {[
                  { name: 'Generative AI & Prompt Engineering Basics', cat: 'AI Core', time: '1h 30m', score: '98%' },
                  { name: 'Python Data Analysis & Pandas Masterclass', cat: 'Data Science', time: '2h 15m', score: '95%' },
                  { name: 'Climate Change & Ecological AI Models', cat: 'Environmental', time: '1h 45m', score: '100%' },
                  { name: 'React 18 Component Architecture', cat: 'Frontend', time: '2h 00m', score: '92%' },
                  { name: 'RESTful API Development & Express.js', cat: 'Backend', time: '1h 50m', score: '96%' },
                  { name: 'Neural Networks & Deep Learning Intro', cat: 'AI Core', time: '2h 30m', score: '90%' },
                  { name: 'Renewable Energy Predictive Analytics', cat: 'Environmental', time: '1h 20m', score: '94%' },
                  { name: 'Ethics in AI & Responsible Machine Learning', cat: 'AI Ethics', time: '1h 10m', score: '100%' },
                ].map((mod, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#10192d] border border-gray-800/80 flex items-center justify-between gap-2">
                    <div className="space-y-0.5 min-w-0">
                      <div className="text-xs font-bold text-white truncate">{mod.name}</div>
                      <div className="flex items-center gap-2 text-[10px] text-gray-400">
                        <span className="text-cyan-400 font-bold">{mod.cat}</span>
                        <span>•</span>
                        <span>{mod.time}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-black shrink-0">
                      {mod.score}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Earned Badges & Recognitions Section */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-purple-400 flex items-center gap-2">
                <Trophy className="w-4 h-4 text-purple-400" />
                Earned Badges & Credentials ({userState.earnedBadges?.length || 6})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { title: 'AI Explorer', desc: 'Completed 5 foundational AI modules', icon: Sparkles, color: 'from-cyan-500 to-blue-600' },
                  { title: 'Prompt Ninja', desc: 'Mastered advanced prompt patterns', icon: Zap, color: 'from-amber-500 to-orange-600' },
                  { title: 'Climate Advocate', desc: 'Finished Climate AI Track', icon: ShieldCheck, color: 'from-emerald-500 to-teal-600' },
                  { title: 'Quiz Master', desc: 'Scored 90%+ in 5 consecutive quizzes', icon: Award, color: 'from-purple-500 to-pink-600' },
                  { title: '30-Day Flame', desc: '30 consecutive days of learning', icon: Flame, color: 'from-rose-500 to-red-600' },
                  { title: 'Capstone Champion', desc: 'Built and deployed capstone project', icon: Trophy, color: 'from-[#06b6d4] to-blue-500' },
                ].map((badge, idx) => {
                  const BIcon = badge.icon;
                  return (
                    <div key={idx} className="p-3 rounded-2xl bg-[#10192d] border border-gray-800 flex items-start gap-2.5">
                      <div className={`p-2 rounded-xl bg-gradient-to-br ${badge.color} text-black font-black shrink-0`}>
                        <BIcon className="w-4 h-4" />
                      </div>
                      <div className="space-y-0.5 min-w-0">
                        <div className="text-xs font-extrabold text-white truncate">{badge.title}</div>
                        <div className="text-[10px] text-gray-400 line-clamp-2 leading-tight">{badge.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shareable Report Action Footer */}
            <div className="pt-4 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] text-gray-400">
                <span>Shareable Report URL: </span>
                <code className="text-cyan-400 font-mono bg-[#10192d] px-2 py-0.5 rounded border border-gray-800">
                  ai.studio/report/sathwik-2026
                </code>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('https://ai.studio/report/sathwik-2026');
                    setIsCopied(true);
                    setTimeout(() => setIsCopied(false), 2000);
                    if (onSendToast) onSendToast('Shareable progress report link copied to clipboard!', 'success');
                  }}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#10192d] hover:bg-[#182542] border border-gray-700 text-gray-200 font-bold text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Copy className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isCopied ? 'Link Copied!' : 'Copy Link'}</span>
                </button>

                <button
                  onClick={() => {
                    if (onSendToast) onSendToast('Generating & downloading official progress PDF report...', 'success');
                  }}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-400 hover:to-cyan-400 text-black font-black text-xs shadow-lg shadow-teal-500/20 transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
