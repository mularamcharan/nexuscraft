import React, { useState } from 'react';
import { 
  Users, 
  MessageSquare, 
  Share2, 
  TrendingUp, 
  Calendar, 
  UserCheck, 
  Sparkles, 
  Heart, 
  MessageCircle, 
  Send, 
  Search, 
  Briefcase, 
  Plus, 
  Code, 
  Filter,
  CheckCircle2,
  X,
  ArrowLeft,
  Star,
  FileText,
  Award,
  ExternalLink,
  ThumbsUp
} from 'lucide-react';

interface LearnerSpaceSectionProps {
  onSendToast?: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

export const LearnerSpaceSection: React.FC<LearnerSpaceSectionProps> = ({ onSendToast }) => {
  const [activeSubView, setActiveSubView] = useState<
    'feed' | 'network' | 'messages' | 'events' | 'groups' | 'profile' | 'collab' | 'cobuilder' | 'peer-reviews'
  >('feed');

  // Peer Review Requests state
  const [peerRequests, setPeerRequests] = useState([
    {
      id: 'pr-1',
      author: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
      title: 'Satellite Deforestation Early Alert CNN Model',
      category: 'Geospatial AI & CV',
      demoUrl: 'https://github.com/example/satellite-deforestation',
      description: 'Calculates canopy density shifts across Amazon rainforest Sentinel-2 tiles. Looking for feedback on dataset normalization and boundary precision.',
      focusAreas: ['CNN Normalization', 'Boundary Precision', 'UI Dashboard'],
      reviews: [
        {
          id: 'rev-1',
          reviewer: 'Sathwik Saivarma',
          codeQuality: 5,
          modelAccuracy: 4,
          uxUsability: 5,
          comment: 'Excellent Sentinel band preprocessing! Consider adding automated confidence heatmaps for cloud-covered areas.',
          date: '1 day ago'
        }
      ]
    },
    {
      id: 'pr-2',
      author: 'Carlos Rivera',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      title: 'EcoGrid Solar Output Transformer Forecaster',
      category: 'Time-Series & Energy',
      demoUrl: 'https://ecogrid-forecast.demo',
      description: 'Predicts microgrid solar production 24 hours ahead using historical weather feeds and cloud movement indices.',
      focusAreas: ['Transformer Architecture', 'Real-time Latency', 'Error Handling'],
      reviews: []
    }
  ]);

  // Peer review modal / form state
  const [isCreatingPR, setIsCreatingPR] = useState(false);
  const [newPrTitle, setNewPrTitle] = useState('');
  const [newPrCategory, setNewPrCategory] = useState('AI & Climate');
  const [newPrUrl, setNewPrUrl] = useState('');
  const [newPrDesc, setNewPrDesc] = useState('');

  // Active reviewing modal state
  const [activePrId, setActivePrId] = useState<string | null>(null);
  const [reviewCodeQuality, setReviewCodeQuality] = useState(5);
  const [reviewAccuracy, setReviewAccuracy] = useState(5);
  const [reviewUx, setReviewUx] = useState(5);
  const [reviewComment, setReviewComment] = useState('');

  const handleCreatePeerRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrTitle.trim() || !newPrDesc.trim()) return;

    const newPr = {
      id: `pr-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      author: 'Learner Sathwik',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
      title: newPrTitle.trim(),
      category: newPrCategory,
      demoUrl: newPrUrl.trim() || 'https://ai.studio/project',
      description: newPrDesc.trim(),
      focusAreas: ['Code Quality', 'Model Logic', 'UX Usability'],
      reviews: []
    };

    setPeerRequests([newPr, ...peerRequests]);
    setIsCreatingPR(false);
    setNewPrTitle('');
    setNewPrUrl('');
    setNewPrDesc('');

    if (onSendToast) {
      onSendToast('🚀 Peer Review request published to community!', 'success');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePrId || !reviewComment.trim()) return;

    setPeerRequests(prev => prev.map(pr => {
      if (pr.id === activePrId) {
        return {
          ...pr,
          reviews: [
            ...pr.reviews,
            {
              id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
              reviewer: 'Learner Sathwik',
              codeQuality: reviewCodeQuality,
              modelAccuracy: reviewAccuracy,
              uxUsability: reviewUx,
              comment: reviewComment.trim(),
              date: 'Just now'
            }
          ]
        };
      }
      return pr;
    }));

    setActivePrId(null);
    setReviewComment('');

    if (onSendToast) {
      onSendToast('⭐ Peer review submitted! Thank you for supporting peer growth.', 'success');
    }
  };

  // Post feed state
  const [posts, setPosts] = useState([
    {
      id: '1',
      author: 'Sathwik Saivarma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
      time: '2 hours ago',
      content: 'Just deployed an AI model predicting solar energy yields for rural grids! Combined time-series forecasting with local weather feeds. Check out my project in the catalog!',
      likes: 24,
      isLiked: false,
      comments: 5,
      tag: 'AI Innovation',
    },
    {
      id: '2',
      author: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
      time: '5 hours ago',
      content: 'Looking for a co-builder with Python and GIS experience to join our satellite deforestation alert team for the upcoming GreenTech Hackathon!',
      likes: 18,
      isLiked: false,
      comments: 3,
      tag: 'Co-Builder Search',
    },
  ]);

  const [newPostText, setNewPostText] = useState('');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;
    setPosts([
      {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        author: 'Learner Sathwik',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
        time: 'Just now',
        content: newPostText.trim(),
        likes: 0,
        isLiked: false,
        comments: 0,
        tag: 'General Discussion',
      },
      ...posts,
    ]);
    setNewPostText('');
  };

  const toggleLike = (id: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === id) {
        return {
          ...p,
          likes: p.isLiked ? p.likes - 1 : p.likes + 1,
          isLiked: !p.isLiked,
        };
      }
      return p;
    }));
  };

  const navItems = [
    { id: 'feed' as const, label: 'Feed', icon: TrendingUp },
    { id: 'peer-reviews' as const, label: 'Peer Reviews', icon: Star },
    { id: 'network' as const, label: 'Network', icon: Users },
    { id: 'messages' as const, label: 'Messages', icon: MessageSquare },
    { id: 'events' as const, label: 'Events', icon: Calendar },
    { id: 'groups' as const, label: 'Groups', icon: Share2 },
    { id: 'profile' as const, label: 'Profile', icon: UserCheck },
    { id: 'collab' as const, label: 'Founder Collab', icon: Briefcase },
    { id: 'cobuilder' as const, label: 'Find Co-Builder', icon: Code },
  ];

  return (
    <div className="space-y-6 py-4 animate-fadeIn">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          {activeSubView !== 'feed' && (
            <button
              onClick={() => setActiveSubView('feed')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0f172a] hover:bg-[#1a2642] text-gray-300 hover:text-white border border-gray-700/80 text-xs font-bold transition-all cursor-pointer mb-2 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#06b6d4] group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Community Feed</span>
            </button>
          )}
          <h1 className="font-display text-3xl font-extrabold text-white">
            Learner Interaction Space
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            Connect, share, and grow with fellow learners, researchers, and project founders.
          </p>
        </div>
      </div>

      {/* Main Split Layout: Left Sub-Menu Sidebar (Screenshot 1) + Right Content View */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Sub-Menu Card matching Screenshot 1 */}
        <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-4 space-y-2 shadow-xl h-fit">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSubView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSubView(item.id)}
                className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition-all flex items-center gap-3 cursor-pointer ${
                  isActive
                    ? 'bg-white text-gray-900 shadow-md scale-[1.02]'
                    : 'text-gray-300 hover:text-white hover:bg-[#141d33]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#06b6d4]' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right Main Content Area */}
        <div className="md:col-span-3 space-y-6">
          {/* SUB-VIEW 1: FEED */}
          {activeSubView === 'feed' && (
            <div className="space-y-6">
              {/* Post Composer Card matching Screenshot 1 */}
              <form onSubmit={handleCreatePost} className="bg-[#0e1628] border border-gray-800 rounded-3xl p-4 sm:p-5 shadow-xl space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#06b6d4]/20 text-[#06b6d4] font-extrabold flex items-center justify-center shrink-0 text-sm">
                    S
                  </div>
                  <input
                    type="text"
                    value={newPostText}
                    onChange={(e) => setNewPostText(e.target.value)}
                    placeholder="Share your thoughts, achievements, or questions..."
                    className="flex-1 bg-[#141d33] border border-gray-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#06b6d4]"
                  />
                  <button
                    type="submit"
                    disabled={!newPostText.trim()}
                    className="px-4 py-3 rounded-2xl bg-[#06b6d4] hover:bg-[#0891b2] disabled:opacity-40 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Post</span>
                  </button>
                </div>
              </form>

              {/* Feed List */}
              <div className="space-y-4">
                {posts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-[#0e1628] border border-gray-800 rounded-3xl p-5 shadow-xl space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.avatar}
                          alt={post.author}
                          className="w-10 h-10 rounded-full object-cover border border-gray-700"
                        />
                        <div>
                          <div className="font-bold text-white text-xs sm:text-sm">{post.author}</div>
                          <div className="text-[10px] text-gray-400">{post.time}</div>
                        </div>
                      </div>

                      <span className="px-2.5 py-0.5 rounded-full bg-[#06b6d4]/10 text-[#06b6d4] border border-[#06b6d4]/30 text-[10px] font-bold">
                        {post.tag}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                      {post.content}
                    </p>

                    <div className="pt-3 border-t border-gray-800/80 flex items-center gap-6 text-xs text-gray-400">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`flex items-center gap-1.5 font-bold transition-colors cursor-pointer ${
                          post.isLiked ? 'text-pink-500' : 'hover:text-white'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                        <span>{post.likes}</span>
                      </button>

                      <div className="flex items-center gap-1.5 font-bold text-gray-400">
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments} Comments</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-VIEW 2: NETWORK & CO-BUILDER */}
          {(activeSubView === 'network' || activeSubView === 'cobuilder' || activeSubView === 'collab') && (
            <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-lg font-bold text-white">
                    {activeSubView === 'collab' ? 'Founder Collaboration Opportunities' : 'Find Co-Builders & Peers'}
                  </h3>
                  <p className="text-xs text-gray-400">Match with developers, data scientists, and climate activists</p>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30">
                  12 Active Requests
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: 'Elena Rostova', role: 'AI Data Scientist', project: 'CanopyWatch Satellite Deforestation', lookingFor: 'Python & GIS Developer' },
                  { name: 'Carlos Rivera', role: 'Full-Stack Developer', project: 'EcoGrid Renewable Forecast', lookingFor: 'Time-Series Specialist' },
                  { name: 'Aisha Kwame', role: 'Climate Policy Analyst', project: 'Urban Heat Island Predictor', lookingFor: 'React UI Designer' },
                  { name: 'David Kim', role: 'ML Engineer', project: 'CO2 Emission Estimator', lookingFor: 'Backend API Engineer' },
                ].map((user, idx) => (
                  <div key={idx} className="p-4 bg-[#141d33] border border-gray-800 rounded-2xl space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-white text-xs">{user.name}</div>
                      <span className="text-[10px] text-[#06b6d4] font-bold">{user.role}</span>
                    </div>

                    <div className="text-xs text-gray-300">
                      <span className="text-gray-500">Project:</span> {user.project}
                    </div>

                    <div className="text-[11px] text-emerald-400 bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
                      Seeking: {user.lookingFor}
                    </div>

                    <button className="w-full py-2 rounded-xl bg-[#06b6d4]/20 hover:bg-[#06b6d4]/30 text-[#06b6d4] border border-[#06b6d4]/40 text-xs font-bold transition-all cursor-pointer">
                      Connect & Collaborate
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-VIEW: PEER REVIEWS */}
          {activeSubView === 'peer-reviews' && (
            <div className="space-y-6">
              {/* Header Card */}
              <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold mb-1">
                    <Star className="w-3.5 h-3.5" />
                    <span>Peer Review & Feedback Space</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">
                    Project Peer Reviews
                  </h3>
                  <p className="text-xs text-gray-400">
                    Submit your climate & AI projects for structured community feedback, rating code quality, models, and UX.
                  </p>
                </div>

                <button
                  onClick={() => setIsCreatingPR(true)}
                  className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#06b6d4] to-[#10b981] hover:from-[#0891b2] hover:to-[#059669] text-black font-extrabold text-xs shadow-lg transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Plus className="w-4 h-4 stroke-[3]" />
                  <span>Request Peer Review</span>
                </button>
              </div>

              {/* Create Peer Review Modal Form */}
              {isCreatingPR && (
                <form
                  onSubmit={handleCreatePeerRequest}
                  className="bg-[#0e1628] border border-[#06b6d4]/50 rounded-3xl p-6 shadow-2xl space-y-4 animate-fadeIn"
                >
                  <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                      <FileText className="w-4 h-4 text-[#06b6d4]" />
                      Submit Project for Peer Review
                    </h4>
                    <button
                      type="button"
                      onClick={() => setIsCreatingPR(false)}
                      className="p-1 text-gray-400 hover:text-white rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-400 uppercase">Project Title</label>
                      <input
                        type="text"
                        value={newPrTitle}
                        onChange={(e) => setNewPrTitle(e.target.value)}
                        placeholder="e.g. CanopyWatch Deforestation Detector"
                        required
                        className="w-full bg-[#141d33] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#06b6d4]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-400 uppercase">Category</label>
                      <select
                        value={newPrCategory}
                        onChange={(e) => setNewPrCategory(e.target.value)}
                        className="w-full bg-[#141d33] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#06b6d4]"
                      >
                        <option value="Geospatial AI & CV">Geospatial AI & CV</option>
                        <option value="Time-Series & Energy">Time-Series & Energy</option>
                        <option value="Carbon Analytics">Carbon Analytics</option>
                        <option value="LLM & Climate NLP">LLM & Climate NLP</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-400 uppercase">Demo URL or Repository Link</label>
                    <input
                      type="url"
                      value={newPrUrl}
                      onChange={(e) => setNewPrUrl(e.target.value)}
                      placeholder="https://github.com/user/project or https://my-demo.app"
                      className="w-full bg-[#141d33] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#06b6d4]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-400 uppercase">Project Description & Feedback Goals</label>
                    <textarea
                      value={newPrDesc}
                      onChange={(e) => setNewPrDesc(e.target.value)}
                      placeholder="Describe what your project does and what specific parts you want feedback on..."
                      rows={3}
                      required
                      className="w-full bg-[#141d33] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#06b6d4]"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCreatingPR(false)}
                      className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 font-bold text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-[#06b6d4] hover:bg-[#0891b2] text-black font-extrabold text-xs shadow-md"
                    >
                      Publish Review Request
                    </button>
                  </div>
                </form>
              )}

              {/* Active Peer Review Form Modal */}
              {activePrId && (
                <form
                  onSubmit={handleAddReview}
                  className="bg-[#0e1628] border border-amber-500/50 rounded-3xl p-6 shadow-2xl space-y-4 animate-fadeIn"
                >
                  <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                    <h4 className="font-bold text-white text-sm flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-400" />
                      Submit Structured Peer Feedback
                    </h4>
                    <button
                      type="button"
                      onClick={() => setActivePrId(null)}
                      className="p-1 text-gray-400 hover:text-white rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Ratings */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#141d33] p-3 rounded-2xl border border-gray-800 space-y-1">
                      <label className="text-[11px] font-bold text-gray-300 block">Code Quality</label>
                      <select
                        value={reviewCodeQuality}
                        onChange={(e) => setReviewCodeQuality(Number(e.target.value))}
                        className="w-full bg-[#0d1424] border border-gray-700 rounded-lg px-2 py-1 text-xs text-white"
                      >
                        <option value={5}>5 ★ - Outstanding Clean Code</option>
                        <option value={4}>4 ★ - Solid & Modular</option>
                        <option value={3}>3 ★ - Functional Needs Refactoring</option>
                      </select>
                    </div>

                    <div className="bg-[#141d33] p-3 rounded-2xl border border-gray-800 space-y-1">
                      <label className="text-[11px] font-bold text-gray-300 block">Model Logic & Rigor</label>
                      <select
                        value={reviewAccuracy}
                        onChange={(e) => setReviewAccuracy(Number(e.target.value))}
                        className="w-full bg-[#0d1424] border border-gray-700 rounded-lg px-2 py-1 text-xs text-white"
                      >
                        <option value={5}>5 ★ - High Precision / Validated</option>
                        <option value={4}>4 ★ - Accurate Baseline</option>
                        <option value={3}>3 ★ - Needs Dataset Tuning</option>
                      </select>
                    </div>

                    <div className="bg-[#141d33] p-3 rounded-2xl border border-gray-800 space-y-1">
                      <label className="text-[11px] font-bold text-gray-300 block">UX & Usability</label>
                      <select
                        value={reviewUx}
                        onChange={(e) => setReviewUx(Number(e.target.value))}
                        className="w-full bg-[#0d1424] border border-gray-700 rounded-lg px-2 py-1 text-xs text-white"
                      >
                        <option value={5}>5 ★ - Intuitive & Visually Polished</option>
                        <option value={4}>4 ★ - Clear Layout</option>
                        <option value={3}>3 ★ - Basic Interface</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-gray-400 uppercase">Constructive Suggestions & Feedback</label>
                    <textarea
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      placeholder="Provide detailed observations on strengths, edge cases, and code improvements..."
                      rows={3}
                      required
                      className="w-full bg-[#141d33] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setActivePrId(null)}
                      className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 font-bold text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs shadow-md"
                    >
                      Submit Feedback
                    </button>
                  </div>
                </form>
              )}

              {/* List of Peer Requests */}
              <div className="space-y-5">
                {peerRequests.map((pr) => (
                  <div
                    key={pr.id}
                    className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 shadow-xl space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={pr.avatar}
                          alt={pr.author}
                          className="w-10 h-10 rounded-full object-cover border border-gray-700"
                        />
                        <div>
                          <h4 className="font-extrabold text-white text-base">{pr.title}</h4>
                          <div className="text-xs text-gray-400 flex items-center gap-2">
                            <span>{pr.author}</span>
                            <span>•</span>
                            <span className="text-[#06b6d4] font-semibold">{pr.category}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {pr.demoUrl && (
                          <a
                            href={pr.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-xl bg-[#141d33] hover:bg-[#1a2642] text-gray-300 hover:text-white border border-gray-700 text-xs font-bold transition-all flex items-center gap-1"
                          >
                            <span>Demo / Code</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#06b6d4]" />
                          </a>
                        )}

                        <button
                          onClick={() => setActivePrId(pr.id)}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1"
                        >
                          <Star className="w-3.5 h-3.5" />
                          <span>Leave Review</span>
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-200 leading-relaxed bg-[#121b30] p-4 rounded-2xl border border-gray-800/80">
                      {pr.description}
                    </p>

                    {/* Focus Areas */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] text-gray-400 font-bold uppercase">Focus Areas:</span>
                      {pr.focusAreas.map((area, idx) => (
                        <span key={idx} className="px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/30 text-[10px] font-extrabold">
                          {area}
                        </span>
                      ))}
                    </div>

                    {/* Submitted Reviews List */}
                    {pr.reviews.length > 0 && (
                      <div className="pt-3 border-t border-gray-800 space-y-3">
                        <div className="text-xs font-extrabold text-amber-400 flex items-center gap-1.5">
                          <Award className="w-4 h-4" />
                          <span>Community Peer Reviews ({pr.reviews.length})</span>
                        </div>

                        <div className="space-y-2">
                          {pr.reviews.map((rev) => (
                            <div key={rev.id} className="p-3.5 bg-[#141d33] border border-gray-800 rounded-2xl space-y-2 text-xs">
                              <div className="flex items-center justify-between">
                                <span className="font-extrabold text-white">{rev.reviewer}</span>
                                <span className="text-[10px] text-gray-400">{rev.date}</span>
                              </div>

                              <div className="flex flex-wrap gap-2 text-[10px]">
                                <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold">
                                  Code: {rev.codeQuality}/5 ★
                                </span>
                                <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 font-bold">
                                  Model: {rev.modelAccuracy}/5 ★
                                </span>
                                <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-bold">
                                  UX: {rev.uxUsability}/5 ★
                                </span>
                              </div>

                              <p className="text-gray-300 italic pt-1">
                                "{rev.comment}"
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUB-VIEW 3: MESSAGES, EVENTS, GROUPS, PROFILE */}
          {(activeSubView === 'messages' || activeSubView === 'events' || activeSubView === 'groups' || activeSubView === 'profile') && (
            <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-8 shadow-xl text-center space-y-4">
              <MessageSquare className="w-10 h-10 text-[#06b6d4] mx-auto" />
              <h3 className="font-display text-xl font-bold text-white">
                {activeSubView.toUpperCase()} Workspace
              </h3>
              <p className="text-xs text-gray-300 max-w-md mx-auto">
                Connect in real time with fellow cohort members and mentors.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
