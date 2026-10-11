import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Lock, 
  Bell, 
  Shield, 
  HelpCircle, 
  FileText, 
  ChevronRight, 
  ArrowLeft, 
  Search, 
  Check, 
  Camera, 
  Key, 
  Download, 
  Trash2, 
  Globe, 
  Moon, 
  Clock, 
  Sliders, 
  Eye, 
  Activity, 
  Headphones, 
  CheckCircle2,
  X,
  AlertTriangle,
  Sparkles,
  Smartphone,
  Laptop,
} from 'lucide-react';
import { UserState } from '../types';

interface SettingsSectionProps {
  userState: UserState;
  onSendToast?: (msg: string, type?: 'success' | 'error' | 'info') => void;
  onNavigateTab?: (tab: any) => void;
}

type SettingsPage = 
  | 'overview'
  | 'user-preferences'
  | 'profile-info'
  | 'notification-settings'
  | 'privacy-settings'
  | 'terms-conditions';

export const SettingsSection: React.FC<SettingsSectionProps> = ({ 
  userState, 
  onSendToast,
  onNavigateTab,
}) => {
  // Current active page among the 7 views
  const [currentPage, setCurrentPage] = useState<SettingsPage>('overview');

  // --- Profile Info State ---
  const [fullName, setFullName] = useState(userState.userName || 'Sathwik Innovator');
  const [username, setUsername] = useState('sathwik_innovator');
  const [email, setEmail] = useState('sathwik@example.com');
  const [bio, setBio] = useState('AI Enthusiast | Innovator | Lifelong Learner. Passionate about building solutions that create impact.');
  const [avatarImage, setAvatarImage] = useState<string | null>(null);

  // --- User Preferences State ---
  const [learningGoal, setLearningGoal] = useState('Skill Improvement');
  const [difficultyLevel, setDifficultyLevel] = useState('Intermediate');
  const [preferredTopics, setPreferredTopics] = useState<string[]>(['AI & ML', 'Data Science', 'Web Development']);
  const [dailyLearningTime, setDailyLearningTime] = useState('1 Hour');
  const [courseRecs, setCourseRecs] = useState(true);
  const [prefEmailUpdates, setPrefEmailUpdates] = useState(true);
  const [prefPushNotifs, setPrefPushNotifs] = useState(true);
  const [showCompletedCourses, setShowCompletedCourses] = useState(true);
  const [compactView, setCompactView] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // --- Notification Settings State ---
  const [channelEmail, setChannelEmail] = useState(true);
  const [channelPush, setChannelPush] = useState(true);
  const [channelInApp, setChannelInApp] = useState(true);
  const [typeCourseUpdates, setTypeCourseUpdates] = useState(true);
  const [typeAchievementAlerts, setTypeAchievementAlerts] = useState(true);
  const [typeCommunityUpdates, setTypeCommunityUpdates] = useState(true);
  const [typeMarketingUpdates, setTypeMarketingUpdates] = useState(false);

  // --- Privacy Settings State ---
  const [publicProfile, setPublicProfile] = useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = useState(true);
  const [activityTracking, setActivityTracking] = useState(true);
  const [personalizedRecs, setPersonalizedRecs] = useState(true);

  // --- Help Center State ---
  const [helpSearchQuery, setHelpSearchQuery] = useState('');
  const [selectedHelpTopic, setSelectedHelpTopic] = useState<string | null>(null);
  const [isContactSupportModalOpen, setIsContactSupportModalOpen] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');

  // --- Terms & Conditions State ---
  const [agreedToTerms, setAgreedToTerms] = useState(true);

  // Topic Options
  const availableTopics = ['AI & ML', 'Data Science', 'Web Development', 'Cloud Computing', 'Mobile Dev', 'Cybersecurity'];

  const toggleTopic = (topic: string) => {
    if (preferredTopics.includes(topic)) {
      setPreferredTopics(preferredTopics.filter(t => t !== topic));
    } else {
      setPreferredTopics([...preferredTopics, topic]);
    }
  };

  const notify = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    if (onSendToast) {
      onSendToast(message, type);
    }
  };

  // Navigation Pages Metadata for Header Selector
  const pagesList: { id: SettingsPage; label: string }[] = [
    { id: 'overview', label: 'Settings' },
    { id: 'profile-info', label: 'Profile Information' },
    { id: 'user-preferences', label: 'User Preferences' },
    { id: 'notification-settings', label: 'Notification Settings' },
    { id: 'privacy-settings', label: 'Privacy Settings' },
    { id: 'terms-conditions', label: 'Terms & Conditions' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      {/* ================= PAGE 1: SETTINGS OVERVIEW ================= */}
      {currentPage === 'overview' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Settings</h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">Manage your account credentials, preferences, and security</p>
          </div>

          {/* Unified Card Layout with exact 6 Settings Sections in Order */}
          <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-2 shadow-2xl">
            <div className="divide-y divide-gray-800/80">
              {/* 1. Profile Information */}
              <button
                onClick={() => setCurrentPage('profile-info')}
                className="w-full py-4 sm:py-5 flex items-center justify-between text-left group cursor-pointer hover:px-3 rounded-2xl hover:bg-[#121c33]/60 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0 group-hover:scale-105 transition-transform">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-extrabold text-white group-hover:text-purple-300 transition-colors">
                      Profile Information
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Update your personal details, profile picture, username, and public bio
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1.5 transition-all shrink-0 ml-2" />
              </button>

              {/* 2. User Preferences */}
              <button
                onClick={() => setCurrentPage('user-preferences')}
                className="w-full py-4 sm:py-5 flex items-center justify-between text-left group cursor-pointer hover:px-3 rounded-2xl hover:bg-[#121c33]/60 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shrink-0 group-hover:scale-105 transition-transform">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-extrabold text-white group-hover:text-cyan-300 transition-colors">
                      User Preferences
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Customize learning goals, difficulty level, topic choices, and layout options
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1.5 transition-all shrink-0 ml-2" />
              </button>

              {/* 3. Notification Settings */}
              <button
                onClick={() => setCurrentPage('notification-settings')}
                className="w-full py-4 sm:py-5 flex items-center justify-between text-left group cursor-pointer hover:px-3 rounded-2xl hover:bg-[#121c33]/60 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0 group-hover:scale-105 transition-transform">
                    <Bell className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-extrabold text-white group-hover:text-amber-300 transition-colors">
                      Notification Settings
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Manage email digests, push notifications, and course completion alerts
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1.5 transition-all shrink-0 ml-2" />
              </button>

              {/* 4. Privacy Settings */}
              <button
                onClick={() => setCurrentPage('privacy-settings')}
                className="w-full py-4 sm:py-5 flex items-center justify-between text-left group cursor-pointer hover:px-3 rounded-2xl hover:bg-[#121c33]/60 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 shrink-0 group-hover:scale-105 transition-transform">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-extrabold text-white group-hover:text-rose-300 transition-colors">
                      Privacy Settings
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Control profile visibility, online status, activity tracking, and data usage
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1.5 transition-all shrink-0 ml-2" />
              </button>

              {/* 5. Terms & Conditions */}
              <button
                onClick={() => setCurrentPage('terms-conditions')}
                className="w-full py-4 sm:py-5 flex items-center justify-between text-left group cursor-pointer hover:px-3 rounded-2xl hover:bg-[#121c33]/60 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shrink-0 group-hover:scale-105 transition-transform">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm sm:text-base font-extrabold text-white group-hover:text-blue-300 transition-colors">
                      Terms & Conditions
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Review platform user agreement, acceptable use policy, and terms of service
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1.5 transition-all shrink-0 ml-2" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= PAGE 2: USER PREFERENCES ================= */}
      {currentPage === 'user-preferences' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Back Header */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('overview')}
              className="p-2 rounded-xl bg-[#0e1628] border border-gray-800 text-gray-300 hover:text-white hover:border-gray-700 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-black text-white">User Preferences</h1>
              <p className="text-xs text-gray-400 mt-0.5">Customize your learning experience</p>
            </div>
          </div>

          {/* Learning Preferences */}
          <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl">
            <h2 className="text-sm font-extrabold text-white">Learning Preferences</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Learning Goal */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300 block">Learning Goal</label>
                <select
                  value={learningGoal}
                  onChange={(e) => setLearningGoal(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#121c33] border border-gray-800 text-sm font-medium text-white focus:outline-none focus:border-purple-500 transition-all cursor-pointer"
                >
                  <option value="Skill Improvement">Skill Improvement</option>
                  <option value="Career Shift">Career Shift</option>
                  <option value="Exam Preparation">Exam Preparation</option>
                  <option value="Personal Growth">Personal Growth</option>
                </select>
              </div>

              {/* Difficulty Level */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300 block">Difficulty Level</label>
                <select
                  value={difficultyLevel}
                  onChange={(e) => setDifficultyLevel(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#121c33] border border-gray-800 text-sm font-medium text-white focus:outline-none focus:border-purple-500 transition-all cursor-pointer"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>

            {/* Preferred Topics */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-300 block">Preferred Topics</label>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                {availableTopics.map((topic) => {
                  const isSelected = preferredTopics.includes(topic);
                  return (
                    <button
                      key={topic}
                      onClick={() => toggleTopic(topic)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? 'bg-purple-600/30 border border-purple-500 text-purple-200'
                          : 'bg-[#121c33] border border-gray-800 text-gray-400 hover:text-white'
                      }`}
                    >
                      <span>{topic}</span>
                      {isSelected && <X className="w-3.5 h-3.5 text-purple-300" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Daily Learning Time */}
            <div className="space-y-2 max-w-md">
              <label className="text-xs font-bold text-gray-300 block">Daily Learning Time</label>
              <select
                value={dailyLearningTime}
                onChange={(e) => setDailyLearningTime(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-[#121c33] border border-gray-800 text-sm font-medium text-white focus:outline-none focus:border-purple-500 transition-all cursor-pointer"
              >
                <option value="15 Mins">15 Mins</option>
                <option value="30 Mins">30 Mins</option>
                <option value="1 Hour">1 Hour</option>
                <option value="2 Hours">2 Hours</option>
              </select>
            </div>
          </div>

          {/* Content Preferences */}
          <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl">
            <h2 className="text-sm font-extrabold text-white">Content Preferences</h2>

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Course Recommendations</h3>
                  <p className="text-xs text-gray-400">Get suggestions tailored to your learning goals</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={courseRecs}
                    onChange={(e) => setCourseRecs(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-800/60">
                <div>
                  <h3 className="text-sm font-bold text-white">Email Updates</h3>
                  <p className="text-xs text-gray-400">Receive periodic digest and recommendation emails</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefEmailUpdates}
                    onChange={(e) => setPrefEmailUpdates(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-800/60">
                <div>
                  <h3 className="text-sm font-bold text-white">Push Notifications</h3>
                  <p className="text-xs text-gray-400">Receive instant course updates on your browser</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prefPushNotifs}
                    onChange={(e) => setPrefPushNotifs(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-800/60">
                <div>
                  <h3 className="text-sm font-bold text-white">Show Completed Courses</h3>
                  <p className="text-xs text-gray-400">Keep completed courses visible in active catalogs</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showCompletedCourses}
                    onChange={(e) => setShowCompletedCourses(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Display Preferences */}
          <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl">
            <h2 className="text-sm font-extrabold text-white">Display Preferences</h2>

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Compact View</h3>
                  <p className="text-xs text-gray-400">Reduce spacing for denser user interface</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={compactView}
                    onChange={(e) => setCompactView(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-800/60">
                <div>
                  <h3 className="text-sm font-bold text-white">Animations</h3>
                  <p className="text-xs text-gray-400">Enable smooth UI motion and transition effects</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={animationsEnabled}
                    onChange={(e) => setAnimationsEnabled(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => notify('User preferences saved successfully!')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}

      {/* ================= PAGE 3: PROFILE INFORMATION ================= */}
      {currentPage === 'profile-info' && (
        <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto">
          {/* Back Header */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('overview')}
              className="p-2 rounded-xl bg-[#0e1628] border border-gray-800 text-gray-300 hover:text-white hover:border-gray-700 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-black text-white">Profile Information</h1>
              <p className="text-xs text-gray-400 mt-0.5">Update your personal information</p>
            </div>
          </div>

          <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-7 shadow-xl">
            {/* Avatar Section */}
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-purple-500/40 shadow-2xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white font-black text-2xl">
                {avatarImage ? (
                  <img src={avatarImage} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span>{fullName.charAt(0)}</span>
                )}
              </div>
              <button
                onClick={() => {
                  setAvatarImage('https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80');
                  notify('Profile photo updated successfully!');
                }}
                className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-md shadow-purple-600/30 transition-all cursor-pointer flex items-center gap-2"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Change Photo</span>
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300 block">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#121c33] border border-gray-800 text-sm font-medium text-white focus:outline-none focus:border-purple-500 transition-all"
                  placeholder="Sathwik Innovator"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300 block">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#121c33] border border-gray-800 text-sm font-medium text-white focus:outline-none focus:border-purple-500 transition-all"
                  placeholder="sathwik_innovator"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-300 block">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#121c33] border border-gray-800 text-sm font-medium text-white focus:outline-none focus:border-purple-500 transition-all"
                  placeholder="sathwik@example.com"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-300 block">Bio</label>
                  <span className="text-[10px] text-gray-500 font-mono">{bio.length}/150</span>
                </div>
                <textarea
                  rows={3}
                  value={bio}
                  maxLength={150}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-[#121c33] border border-gray-800 text-xs font-medium text-white focus:outline-none focus:border-purple-500 transition-all resize-none"
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={() => notify('Profile information saved successfully!')}
              className="w-full py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 transition-all cursor-pointer text-center"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}

      {/* ================= PAGE 4: NOTIFICATION SETTINGS ================= */}
      {currentPage === 'notification-settings' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Back Header */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('overview')}
              className="p-2 rounded-xl bg-[#0e1628] border border-gray-800 text-gray-300 hover:text-white hover:border-gray-700 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-black text-white">Notification Settings</h1>
              <p className="text-xs text-gray-400 mt-0.5">Manage how you receive notifications</p>
            </div>
          </div>

          {/* Notification Channels */}
          <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl">
            <h2 className="text-sm font-extrabold text-white">Notification Channels</h2>

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Email Notifications</h3>
                  <p className="text-xs text-gray-400">Receive important updates directly in your inbox</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={channelEmail}
                    onChange={(e) => setChannelEmail(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-800/60">
                <div>
                  <h3 className="text-sm font-bold text-white">Push Notifications</h3>
                  <p className="text-xs text-gray-400">Get browser alerts when logged in</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={channelPush}
                    onChange={(e) => setChannelPush(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-800/60">
                <div>
                  <h3 className="text-sm font-bold text-white">In-App Notifications</h3>
                  <p className="text-xs text-gray-400">Show floating notification badges inside NexusCraft</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={channelInApp}
                    onChange={(e) => setChannelInApp(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Notification Types */}
          <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl">
            <h2 className="text-sm font-extrabold text-white">Notification Types</h2>

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Course Updates</h3>
                  <p className="text-xs text-gray-400">New lessons, assignments</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={typeCourseUpdates}
                    onChange={(e) => setTypeCourseUpdates(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-800/60">
                <div>
                  <h3 className="text-sm font-bold text-white">Achievement Alerts</h3>
                  <p className="text-xs text-gray-400">Badges, certificates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={typeAchievementAlerts}
                    onChange={(e) => setTypeAchievementAlerts(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-800/60">
                <div>
                  <h3 className="text-sm font-bold text-white">Community Updates</h3>
                  <p className="text-xs text-gray-400">Messages, comments</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={typeCommunityUpdates}
                    onChange={(e) => setTypeCommunityUpdates(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-800/60">
                <div>
                  <h3 className="text-sm font-bold text-white">Marketing Updates</h3>
                  <p className="text-xs text-gray-400">Offers, new features</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={typeMarketingUpdates}
                    onChange={(e) => setTypeMarketingUpdates(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => notify('Notification settings saved!')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
            >
              Save Notification Settings
            </button>
          </div>
        </div>
      )}

      {/* ================= PAGE 5: PRIVACY SETTINGS ================= */}
      {currentPage === 'privacy-settings' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Back Header */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('overview')}
              className="p-2 rounded-xl bg-[#0e1628] border border-gray-800 text-gray-300 hover:text-white hover:border-gray-700 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-black text-white">Privacy Settings</h1>
              <p className="text-xs text-gray-400 mt-0.5">Control your privacy and data</p>
            </div>
          </div>

          {/* Profile Visibility */}
          <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl">
            <h2 className="text-sm font-extrabold text-white">Profile Visibility</h2>

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Public Profile</h3>
                  <p className="text-xs text-gray-400">Make profile visible to everyone</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={publicProfile}
                    onChange={(e) => setPublicProfile(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-800/60">
                <div>
                  <h3 className="text-sm font-bold text-white">Show Online Status</h3>
                  <p className="text-xs text-gray-400">Let others see when you're online</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showOnlineStatus}
                    onChange={(e) => setShowOnlineStatus(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Data & Activity */}
          <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl">
            <h2 className="text-sm font-extrabold text-white">Data & Activity</h2>

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Activity Tracking</h3>
                  <p className="text-xs text-gray-400">Allow us to improve your experience</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activityTracking}
                    onChange={(e) => setActivityTracking(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-800/60">
                <div>
                  <h3 className="text-sm font-bold text-white">Personalized Recommendations</h3>
                  <p className="text-xs text-gray-400">Get personalized course suggestions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={personalizedRecs}
                    onChange={(e) => setPersonalizedRecs(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Data Management */}
          <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 sm:p-7 space-y-6 shadow-xl">
            <h2 className="text-sm font-extrabold text-white">Data Management</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#121c33] rounded-2xl border border-gray-800">
                <div>
                  <h3 className="text-sm font-bold text-white">Download My Data</h3>
                  <p className="text-xs text-gray-400">Get a copy of your data</p>
                </div>
                <button
                  onClick={() => notify('Data download link generated! Check your email.', 'info')}
                  className="px-4 py-2 rounded-xl bg-purple-600/20 border border-purple-500/40 hover:bg-purple-600 hover:text-white text-purple-300 text-xs font-bold transition-all cursor-pointer"
                >
                  Request
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-[#121c33] rounded-2xl border border-gray-800">
                <div>
                  <h3 className="text-sm font-bold text-white">Clear Browsing History</h3>
                  <p className="text-xs text-gray-400">Remove your learning history</p>
                </div>
                <button
                  onClick={() => notify('Browsing history cleared successfully!')}
                  className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs font-bold transition-all border border-gray-700 cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= PAGE 6: TERMS & CONDITIONS ================= */}
      {currentPage === 'terms-conditions' && (
        <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
          {/* Back Header */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('overview')}
              className="p-2 rounded-xl bg-[#0e1628] border border-gray-800 text-gray-300 hover:text-white hover:border-gray-700 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-black text-white">Terms & Conditions</h1>
              <p className="text-xs text-gray-400 mt-0.5">Please read our terms and conditions carefully.</p>
            </div>
          </div>

          {/* Terms Container Card */}
          <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h2 className="text-base font-extrabold text-white border-b border-gray-800 pb-4">
              NexusCraft Terms of Service
            </h2>

            <div className="space-y-5 text-xs text-gray-300 leading-relaxed max-h-80 overflow-y-auto pr-2 custom-scrollbar">
              <p className="text-gray-400 font-medium">
                Welcome to NexusCraft! By using our platform, you agree to the following terms and conditions.
              </p>

              <div className="space-y-2">
                <h3 className="font-extrabold text-white text-sm">1. Acceptance of Terms</h3>
                <p>
                  By accessing or using NexusCraft, you agree to be bound by these Terms of Service. If you do not agree to all terms, you must discontinue platform usage immediately.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-extrabold text-white text-sm">2. Use of Platform</h3>
                <p>
                  You agree to use the platform only for lawful purposes and in accordance with our guidelines. Any automated scraping, unauthorized account access, or system disturbance is strictly prohibited.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-extrabold text-white text-sm">3. User Accounts</h3>
                <p>
                  You are responsible for maintaining the confidentiality of your account information, passwords, and security credentials. NexusCraft is not liable for unauthorized access caused by credential sharing.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-extrabold text-white text-sm">4. Intellectual Property</h3>
                <p>
                  All content, learning tracks, code interactive sandboxes, and logos remain the exclusive property of NexusCraft and its creators.
                </p>
              </div>
            </div>

            {/* Checkbox Agreement */}
            <div className="pt-4 border-t border-gray-800 flex items-center gap-3">
              <input
                type="checkbox"
                id="terms-check"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-purple-600 focus:ring-purple-500 cursor-pointer"
              />
              <label htmlFor="terms-check" className="text-xs font-bold text-gray-200 cursor-pointer">
                I agree to the Terms & Conditions
              </label>
            </div>

            {/* Accept Button */}
            <button
              disabled={!agreedToTerms}
              onClick={() => {
                notify('Terms & Conditions accepted successfully!');
                setCurrentPage('overview');
              }}
              className={`w-full py-3.5 rounded-2xl font-extrabold text-xs transition-all cursor-pointer text-center ${
                agreedToTerms
                  ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              Accept & Continue
            </button>
          </div>
        </div>
      )}

      {/* ================= MODALS & DIALOGS ================= */}

      {/* Help Article Detail Modal */}
      {selectedHelpTopic && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-base font-extrabold text-white">{selectedHelpTopic}</h3>
              <button
                onClick={() => setSelectedHelpTopic(null)}
                className="p-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-xs text-gray-300 space-y-3 leading-relaxed">
              <p>
                Here you can find complete documentation and FAQs regarding <strong>{selectedHelpTopic}</strong> in NexusCraft.
              </p>
              <ul className="list-disc list-inside space-y-1 text-gray-400">
                <li>Step-by-step onboarding walkthroughs</li>
                <li>Best security practices & tips</li>
                <li>Account synchronization & billing info</li>
              </ul>
            </div>
            <button
              onClick={() => setSelectedHelpTopic(null)}
              className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-extrabold transition-all cursor-pointer"
            >
              Close Article
            </button>
          </div>
        </div>
      )}

      {/* Contact Support Modal */}
      {isContactSupportModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-4 shadow-2xl animate-scaleUp">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Headphones className="w-5 h-5 text-purple-400" />
                Contact Support
              </h3>
              <button
                onClick={() => setIsContactSupportModalOpen(false)}
                className="p-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-300 block">Describe your issue or feedback</label>
              <textarea
                rows={4}
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                placeholder="How can our technical team help you today?"
                className="w-full px-4 py-3 rounded-2xl bg-[#121c33] border border-gray-800 text-xs text-white focus:outline-none focus:border-purple-500 transition-all resize-none"
              />
            </div>

            <button
              onClick={() => {
                notify('Support ticket created! Response will arrive via email.', 'success');
                setSupportMessage('');
                setIsContactSupportModalOpen(false);
              }}
              className="w-full py-3 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-extrabold shadow-lg shadow-purple-600/30 transition-all cursor-pointer"
            >
              Submit Ticket
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
