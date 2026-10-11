import React, { useEffect, useState } from 'react';
import { 
  Award, 
  MessageSquare, 
  UserPlus, 
  Edit3, 
  Eye, 
  Sparkles, 
  User, 
  Calendar, 
  MapPin, 
  Globe, 
  Heart, 
  CheckCircle2, 
  ArrowRight,
  Share2, 
  FolderGit2,
  ShieldCheck, 
  Camera,
  Clock,
  Bell,
  ExternalLink
} from 'lucide-react';
import { ActiveTab, UserState } from '../types';
import type { UserProfile } from '@shared/types';
import { getProfile, saveProfile } from '@/api-client';

export interface PublicProfilePageProps {
  userState: UserState;
  onNavigateTab: (tab: ActiveTab) => void;
  onSendToast?: (msg: string, type?: 'success' | 'error' | 'info') => void;
  onUpdateUserState?: (updates: Partial<UserState>) => void;
  initialMode?: 'public' | 'builder';
}

const AVAILABLE_INTERESTS = [
  'AI & Climate',
  'Full-Stack',
  'Prompt Engineering',
  'Data Science',
  'UI/UX Design',
  'Cybersecurity',
  'Cloud Architecture',
  'Mobile Dev'
];

const AVATAR_GRADIENTS = [
  'from-blue-600 to-cyan-500',
  'from-purple-600 to-indigo-500',
  'from-emerald-600 to-teal-500',
  'from-amber-500 to-orange-600',
  'from-rose-600 to-pink-500'
];

export const PublicProfilePage: React.FC<PublicProfilePageProps> = ({ 
  userState, 
  onNavigateTab, 
  onSendToast,
  onUpdateUserState,
  initialMode = 'public'
}) => {
  const [sectionMode, setSectionMode] = useState<'public' | 'builder'>(initialMode);
  const [activeTab, setActiveTab] = useState<'about' | 'projects' | 'skills' | 'activity'>('about');
  const [isFollowing, setIsFollowing] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);

  const [profile, setProfile] = useState<UserProfile>({
    fullName: userState.userName || 'Sathwik Sai Varma',
    username: 'sathwik_dev',
    email: '',
    bio: 'Passionate about AI, full-stack engineering, and building experiential learning platforms.',
    avatarImage: null
  });

  // Builder form states
  const [fullName, setFullName] = useState(userState.userName || 'Sathwik Sai Varma');
  const [username, setUsername] = useState('sathwik_dev');
  const [dob, setDob] = useState('2000-05-15');
  const [bio, setBio] = useState('Passionate about AI, full-stack engineering, and building experiential learning platforms.');
  const [country, setCountry] = useState('United States');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['AI & Climate', 'Full-Stack', 'Prompt Engineering']);
  const [avatarIndex, setAvatarIndex] = useState(0);

  // Diagnostic persona states
  const [selectedRole, setSelectedRole] = useState(userState.selectedRole || 'Corporate Professional');
  const [proficiencyLevel, setProficiencyLevel] = useState(userState.proficiencyLevel || 'Intermediate');
  const [dailyCommitment, setDailyCommitment] = useState<number>(userState.dailyCommitment || 10);
  const [remindersEnabled, setRemindersEnabled] = useState<boolean>(userState.remindersEnabled !== false);

  useEffect(() => {
    let isActive = true;
    getProfile()
      .then((savedProfile) => {
        if (!isActive) return;
        setProfile(savedProfile);
        if (savedProfile.fullName) setFullName(savedProfile.fullName);
        if (savedProfile.username) setUsername(savedProfile.username);
        if (savedProfile.bio) setBio(savedProfile.bio);
      })
      .catch((error: unknown) => {
        if (isActive) {
          setProfileError(error instanceof Error ? error.message : 'Profile details could not be loaded.');
        }
      });
    return () => {
      isActive = false;
    };
  }, []);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    if (onSendToast) {
      onSendToast(isFollowing ? `Unfollowed @${profile.username || username}` : `Now following @${profile.username || username}!`, 'info');
    }
  };

  const handleShareProfile = () => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/profile` : 'https://nexuscraft.app/profile';
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(url);
    }
    onSendToast?.('Public profile link copied to clipboard!', 'success');
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      onSendToast?.('Please enter your full name', 'error');
      return;
    }

    try {
      const updated = {
        ...profile,
        fullName: fullName.trim(),
        username: username.trim(),
        bio: bio.trim()
      };
      await saveProfile(updated);
      setProfile(updated);
      onUpdateUserState?.({
        userName: fullName.trim(),
        selectedRole,
        proficiencyLevel,
        dailyCommitment,
        remindersEnabled,
      });
      onSendToast?.('Profile and persona preferences saved successfully!', 'success');
      setSectionMode('public');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Profile could not be saved.';
      onSendToast?.(message, 'error');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* Section Mode Toggle Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#0e1628] border border-gray-800/80 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-md">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-white">Profile</h2>
            <p className="text-xs text-gray-400">View and edit your public profile in one place.</p>
          </div>
        </div>

        {/* Segmented Control */}
        <div className="flex items-center p-1 bg-[#121c33] border border-gray-800 rounded-xl self-stretch sm:self-auto">
          <button
            type="button"
            onClick={() => setSectionMode('public')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              sectionMode === 'public'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>My profile</span>
          </button>
          <button
            type="button"
            onClick={() => setSectionMode('builder')}
            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              sectionMode === 'builder'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit profile</span>
          </button>
        </div>
      </div>

      {/* ========================================= */}
      {/* 1. PUBLIC PROFILE VIEW                    */}
      {/* ========================================= */}
      {sectionMode === 'public' && (
        <div className="space-y-6">
          {/* Main Hero Card */}
          <div className="bg-[#0e1628] border border-gray-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Avatar */}
              <div className={`w-24 h-24 rounded-3xl bg-gradient-to-tr ${AVATAR_GRADIENTS[avatarIndex]} p-1 shadow-2xl shrink-0`}>
                <div className="w-full h-full bg-[#0e1628] rounded-[22px] flex items-center justify-center font-black text-3xl text-white">
                  {profile.avatarImage ? (
                    <img src={profile.avatarImage} alt="" className="h-full w-full rounded-[22px] object-cover" />
                  ) : (
                    (profile.fullName || userState.userName || 'S').charAt(0)
                  )}
                </div>
              </div>

              {/* Identity & Details */}
              <div className="space-y-3 text-center sm:text-left flex-1">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                      <h1 className="text-2xl sm:text-3xl font-black text-white">
                        {profile.fullName || userState.userName}
                      </h1>
                      <ShieldCheck className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="flex items-center justify-center sm:justify-start gap-2.5 mt-1 text-xs">
                      <span className="font-bold text-purple-400">@{profile.username || username || 'learner'}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-400 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                        {country}
                      </span>
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setSectionMode('builder')}
                      className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Profile</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleShareProfile}
                      className="p-2.5 rounded-xl bg-[#121c33] hover:bg-[#182542] border border-gray-800 text-gray-300 hover:text-white transition-all cursor-pointer"
                      title="Share Profile Link"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={handleFollow}
                      className={`px-3.5 py-2.5 rounded-xl font-extrabold text-xs transition-all cursor-pointer flex items-center gap-1.5 ${
                        isFollowing
                          ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                          : 'bg-[#121c33] hover:bg-[#182542] border border-gray-800 text-gray-300 hover:text-white'
                      }`}
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>{isFollowing ? 'Following' : 'Follow'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onNavigateTab('messages')}
                      className="p-2.5 rounded-xl bg-[#121c33] hover:bg-[#182542] border border-gray-800 text-gray-300 hover:text-white transition-all cursor-pointer"
                      title="Send Message"
                    >
                      <MessageSquare className="w-4 h-4 text-purple-400" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
                  {profile.bio || bio}
                </p>

                {/* Persona & Baseline Badges */}
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                  <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    {selectedRole}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold flex items-center gap-1.5">
                    <Award className="w-3 h-3 text-purple-400" />
                    {proficiencyLevel} Prompt Engineering
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    {dailyCommitment}m Daily Target
                  </span>
                </div>
              </div>
            </div>

            {profileError && <p role="alert" className="text-xs text-rose-300">{profileError}</p>}

            {/* Stats Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-800/60">
              {[
                { label: 'Completed Tracks', value: `${(userState.completedModules?.length || 0) + 12}` },
                { label: 'Total Points', value: `${((userState.totalPoints || 0) + 8500).toLocaleString()} XP` },
                { label: 'Verified Badges', value: `${(userState.earnedBadges?.length || 0) + 24}` },
                { label: 'Followers', value: '156' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-[#121c33] border border-gray-800 rounded-2xl p-4 text-center">
                  <div className="text-lg sm:text-xl font-black text-white">{stat.value}</div>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Sub-Tabs Navigation */}
          <div className="border-b border-gray-800">
            <div className="flex items-center gap-6 overflow-x-auto custom-scrollbar">
              {[
                { id: 'about', label: 'About & Goals' },
                { id: 'projects', label: 'Featured Projects' },
                { id: 'skills', label: 'Verified Skills' },
                { id: 'activity', label: 'Learning Activity' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`pb-3 text-xs font-bold transition-all cursor-pointer border-b-2 ${
                    activeTab === tab.id
                      ? 'border-purple-500 text-purple-400'
                      : 'border-transparent text-gray-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Sub-Tab 1: About */}
          {activeTab === 'about' && (
            <div className="bg-[#0e1628] border border-gray-800/80 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl">
              <div>
                <h3 className="text-xs font-black text-white uppercase tracking-wider mb-2">Technical Overview</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {profile.bio || bio}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-black text-white uppercase tracking-wider mb-3">Primary Focus Areas</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedInterests.map((interest, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-xl bg-[#121c33] border border-gray-800 text-purple-300 text-xs font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                      <span>{interest}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800/60">
                <div>
                  <h4 className="text-xs font-extrabold text-white">Interested in collaborating or reviewing my work?</h4>
                  <p className="text-[11px] text-gray-400">Share this profile or get in touch using the links above.</p>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Tab 2: Projects */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'AI Chatbot Assistant', desc: 'An intelligent chatbot built with NLP and Machine Learning.', tech: ['Python', 'NLP', 'TensorFlow'] },
                  { name: 'E-Commerce Website', desc: 'MERN stack store with cart, payments, and product search.', tech: ['React', 'Node.js', 'MongoDB'] },
                  { name: 'Weather Dashboard', desc: 'Real-time weather analytics application with forecast charts.', tech: ['JavaScript', 'Chart.js', 'API'] },
                  { name: 'Task Management App', desc: 'Real-time task board built with modern state management.', tech: ['Vue.js', 'Firebase'] }
                ].map((p, idx) => (
                  <div key={idx} className="bg-[#0e1628] border border-gray-800/80 rounded-2xl p-5 space-y-3 shadow-xl">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-extrabold text-white">{p.name}</h3>
                      <button
                        type="button"
                        onClick={() => onNavigateTab('portfolio')}
                        className="text-[11px] text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span>Evidence</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-400">{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {p.tech.map((t, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-[#121c33] border border-gray-800 text-[10px] font-mono text-purple-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-[#0e1628] border border-gray-800/80 rounded-2xl p-4 flex items-center justify-between">
                <span className="text-xs text-gray-300">Looking for all 24 completed and in-progress projects?</span>
                <button
                  type="button"
                  onClick={() => onNavigateTab('portfolio')}
                  className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold cursor-pointer flex items-center gap-1.5"
                >
                  <FolderGit2 className="w-3.5 h-3.5" />
                  <span>View All in Portfolio</span>
                </button>
              </div>
            </div>
          )}

          {/* Sub-Tab 3: Skills */}
          {activeTab === 'skills' && (
            <div className="bg-[#0e1628] border border-gray-800/80 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl">
              <div>
                <h3 className="text-xs font-black text-white uppercase tracking-wider mb-3">Verified Badges & Credentials</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['React Master', 'Python Pro', 'Full Stack Capstone', 'AI Innovator', 'Prompt Ninja', 'Climate Scholar'].map((b, i) => (
                    <div key={i} className="p-3.5 rounded-2xl bg-[#121c33] border border-purple-500/30 text-purple-300 text-xs font-extrabold flex items-center gap-2.5">
                      <Award className="w-4 h-4 text-purple-400 shrink-0" />
                      <span className="truncate">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800/60">
                <h3 className="text-xs font-black text-white uppercase tracking-wider mb-3">Core Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {['React', 'TypeScript', 'Node.js', 'Python', 'FastAPI', 'Tailwind CSS', 'PostgreSQL', 'SQLite', 'Docker'].map((s, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-xl bg-[#121c33] border border-gray-800 text-gray-200 text-xs font-bold">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Sub-Tab 4: Activity */}
          {activeTab === 'activity' && (
            <div className="bg-[#0e1628] border border-gray-800/80 rounded-3xl p-6 space-y-3 text-xs text-gray-300 shadow-xl">
              {[
                { title: 'Completed Full Stack Web Development module', date: 'Today' },
                { title: 'Passed Prompt Mastery Challenge: Clear Context Formulation', date: 'Yesterday' },
                { title: 'Achieved 5-Day Learning Streak milestone', date: '2 days ago' },
                { title: 'Created new project: Study buddy prompt kit', date: 'Oct 8, 2026' }
              ].map((act, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-[#121c33] border border-gray-800 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{act.title}</span>
                  </div>
                  <span className="text-[11px] text-gray-400 whitespace-nowrap">{act.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================= */}
      {/* 2. PROFILE BUILDER VIEW                   */}
      {/* ========================================= */}
      {sectionMode === 'builder' && (
        <form onSubmit={handleSaveProfile} className="space-y-6 animate-fadeIn">
          {/* Header Banner */}
          <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -z-10" />
            <div className="flex items-center gap-2 text-xs font-bold text-purple-400 uppercase tracking-widest mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Interactive Profile Builder</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Customize Your Persona & Goals</h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
              Configure your public display details, avatar style, baseline prompt proficiency, and technical goals.
            </p>
          </div>

          {/* Builder Form Card */}
          <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            {/* Avatar Theme Selector */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-800">
              <div className={`w-24 h-24 rounded-3xl bg-gradient-to-tr ${AVATAR_GRADIENTS[avatarIndex]} p-1 shadow-2xl relative group cursor-pointer`}>
                <div className="w-full h-full bg-[#0e1628] rounded-[22px] flex items-center justify-center font-black text-3xl text-white">
                  {fullName.charAt(0) || 'U'}
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                  <Camera className="w-6 h-6" />
                </div>
              </div>

              <div className="space-y-2 text-center sm:text-left">
                <h3 className="text-sm font-extrabold text-white">Avatar Gradient Accent</h3>
                <p className="text-xs text-gray-400">Choose a color accent for your profile badge</p>
                <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                  {AVATAR_GRADIENTS.map((grad, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setAvatarIndex(idx)}
                      className={`w-7 h-7 rounded-full bg-gradient-to-tr ${grad} border-2 transition-all cursor-pointer ${
                        avatarIndex === idx ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Basic Information Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-purple-400" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full bg-[#121c33] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                  placeholder="e.g. Sathwik Sai Varma"
                  required
                />
              </div>

              {/* Username */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-purple-400" />
                  <span>Public Handle</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-xs font-bold text-gray-500">@</span>
                  <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    className="w-full bg-[#121c33] border border-gray-800 rounded-xl pl-8 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="sathwik_dev"
                  />
                </div>
              </div>

              {/* Date of Birth */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-purple-400" />
                  <span>Date of Birth</span>
                </label>
                <input
                  type="date"
                  value={dob}
                  onChange={e => setDob(e.target.value)}
                  className="w-full bg-[#121c33] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              {/* Country */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-purple-400" />
                  <span>Country or Region</span>
                </label>
                <select
                  value={country}
                  onChange={e => setCountry(e.target.value)}
                  className="w-full bg-[#121c33] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 transition-colors cursor-pointer"
                >
                  <option value="United States">United States</option>
                  <option value="India">India</option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="Canada">Canada</option>
                  <option value="Germany">Germany</option>
                  <option value="Australia">Australia</option>
                </select>
              </div>
            </div>

            {/* Short Bio */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-purple-400" />
                <span>Short Professional Bio</span>
              </label>
              <textarea
                value={bio}
                onChange={e => setBio(e.target.value)}
                rows={3}
                className="w-full bg-[#121c33] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                placeholder="Tell peers and mentors about your technical focus and goals..."
              />
            </div>

            {/* Learning & Goal Persona Card */}
            <div className="bg-[#10192d] border border-cyan-500/30 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-xs uppercase tracking-wider border-b border-gray-800 pb-3">
                <Sparkles className="w-4 h-4" />
                <span>Learning & Goal Preferences</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                {/* Role */}
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-300">Target Persona Role</label>
                  <select
                    value={selectedRole}
                    onChange={e => setSelectedRole(e.target.value)}
                    className="w-full bg-[#121c33] border border-gray-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="Student">Student & Academic Researcher</option>
                    <option value="Corporate Professional">Corporate Professional & Employee</option>
                    <option value="Founder">Founder & Business Leader</option>
                    <option value="Independent Executive">Executive & Independent Specialist</option>
                  </select>
                </div>

                {/* Proficiency Level */}
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-300">Prompt Engineering Baseline</label>
                  <select
                    value={proficiencyLevel}
                    onChange={e => setProficiencyLevel(e.target.value)}
                    className="w-full bg-[#121c33] border border-gray-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value="Foundational">Foundational & Beginner (Level 1)</option>
                    <option value="Intermediate">Intermediate & Familiar (Level 2)</option>
                    <option value="Advanced">Advanced & Experienced (Level 3)</option>
                  </select>
                </div>

                {/* Daily Commitment Pace */}
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-300">Daily Study Pace</label>
                  <select
                    value={dailyCommitment}
                    onChange={e => setDailyCommitment(Number(e.target.value))}
                    className="w-full bg-[#121c33] border border-gray-800 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                  >
                    <option value={5}>5 min daily (Casual Pace)</option>
                    <option value={10}>10 min daily (Recommended Pace)</option>
                    <option value={20}>20 min daily (Intensive Sprint)</option>
                  </select>
                </div>

                {/* Notification Reminders */}
                <div className="space-y-1.5 flex flex-col justify-end">
                  <label className="font-bold text-gray-300 flex items-center justify-between py-2 cursor-pointer bg-[#121c33] border border-gray-800 rounded-xl px-3.5">
                    <span className="flex items-center gap-1.5">
                      <Bell className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Study Reminders</span>
                    </span>
                    <input
                      type="checkbox"
                      checked={remindersEnabled}
                      onChange={e => setRemindersEnabled(e.target.checked)}
                      className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 bg-[#121c33] border-gray-800 cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Technical Focus Areas */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-gray-300 block">Select Primary Focus Areas</label>
              <div className="flex flex-wrap gap-2">
                {AVAILABLE_INTERESTS.map(interest => {
                  const isSelected = selectedInterests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                          : 'bg-[#121c33] text-gray-400 hover:text-white border border-gray-800'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                      <span>{interest}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form Actions */}
            <div className="pt-6 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setSectionMode('public')}
                className="text-xs text-gray-400 hover:text-white font-bold transition-colors cursor-pointer"
              >
                Cancel & Return to Public View
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-xl shadow-purple-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Save Profile & View</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
