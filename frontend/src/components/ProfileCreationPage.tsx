import React, { useState } from 'react';
import { User, Camera, Calendar, MapPin, Sparkles, ArrowRight, CheckCircle2, Globe, Heart } from 'lucide-react';
import { ActiveTab, UserState } from '../types';
import { getProfile, saveProfile } from '@/api-client';
import { PublicProfilePage } from './PublicProfilePage';

interface ProfileCreationPageProps {
  userState: UserState;
  onNavigateTab: (tab: ActiveTab) => void;
  onSendToast?: (msg: string, type?: 'success' | 'error' | 'info') => void;
  onUpdateUserState?: (updates: Partial<UserState>) => void;
}

export const ProfileCreationPage: React.FC<ProfileCreationPageProps> = ({ 
  userState, 
  onNavigateTab, 
  onSendToast,
  onUpdateUserState 
}) => {
  const [fullName, setFullName] = useState(userState.userName || 'Sathwik Sai Varma');
  const [username, setUsername] = useState('sathwik_dev');
  const [dob, setDob] = useState('2000-05-15');
  const [bio, setBio] = useState('Passionate about AI, full-stack engineering, climate solutions, and interactive platform building.');
  const [country, setCountry] = useState('United States');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['AI & Climate', 'Full-Stack', 'Prompt Engineering']);
  const [avatarIndex, setAvatarIndex] = useState(0);

  // Diagnostic Assessment fields
  const [selectedRole, setSelectedRole] = useState(userState.selectedRole || 'Corporate Professional');
  const [proficiencyLevel, setProficiencyLevel] = useState(userState.proficiencyLevel || 'Intermediate');
  const [dailyCommitment, setDailyCommitment] = useState<number>(userState.dailyCommitment || 10);
  const [remindersEnabled, setRemindersEnabled] = useState<boolean>(userState.remindersEnabled !== false);

  const availableInterests = [
    'AI & Climate',
    'Full-Stack',
    'Prompt Engineering',
    'Data Science',
    'UI/UX Design',
    'Cybersecurity',
    'Cloud Architecture',
    'Mobile Dev'
  ];

  const avatarGradients = [
    'from-blue-600 to-cyan-500',
    'from-purple-600 to-indigo-500',
    'from-emerald-600 to-teal-500',
    'from-amber-500 to-orange-600',
    'from-rose-600 to-pink-500'
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      if (onSendToast) onSendToast('Please enter your full name', 'error');
      return;
    }
    try {
      const profile = await getProfile();
      await saveProfile({ ...profile, fullName: fullName.trim(), username: username.trim(), bio: bio.trim() });
      onUpdateUserState?.({
        userName: fullName.trim(),
        selectedRole,
        proficiencyLevel,
        dailyCommitment,
        remindersEnabled,
      });
      onSendToast?.('Profile and Diagnostic Persona updated successfully!', 'success');
      onNavigateTab('portfolio');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Profile could not be saved.';
      onSendToast?.(message, 'error');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn pb-16">
      {/* Header Banner */}
      <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -z-10" />
        <div className="flex items-center gap-3 text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">
          <Sparkles className="w-4 h-4" />
          <span>Screen 17 • Profile Setup</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">Complete Your Profile</h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-xl">
          Set up your public persona, select your technical interests, and customize how you appear to mentors and peers.
        </p>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        {/* Avatar Selector */}
        <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-800">
          <div className={`w-24 h-24 rounded-3xl bg-gradient-to-tr ${avatarGradients[avatarIndex]} p-1 shadow-2xl relative group cursor-pointer`}>
            <div className="w-full h-full bg-[#0e1628] rounded-[22px] flex items-center justify-center font-black text-3xl text-white">
              {fullName.charAt(0) || 'U'}
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
              <Camera className="w-6 h-6" />
            </div>
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-sm font-extrabold text-white">Choose Avatar Theme</h3>
            <p className="text-xs text-gray-400">Select a color profile for your public avatar badge</p>
            <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
              {avatarGradients.map((grad, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setAvatarIndex(idx)}
                  className={`w-7 h-7 rounded-full bg-gradient-to-tr ${grad} border-2 transition-all ${
                    avatarIndex === idx ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-blue-400" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              className="w-full bg-[#121c33] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="e.g. Sathwik Sai Varma"
            />
          </div>

          {/* Username */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              <span>Username</span>
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-xs font-bold text-gray-500">@</span>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-[#121c33] border border-gray-800 rounded-xl pl-8 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="sathwik_dev"
              />
            </div>
          </div>

          {/* Date of Birth */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              <span>Date of Birth</span>
            </label>
            <input
              type="date"
              value={dob}
              onChange={e => setDob(e.target.value)}
              className="w-full bg-[#121c33] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Country */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              <span>Country or Region</span>
            </label>
            <select
              value={country}
              onChange={e => setCountry(e.target.value)}
              className="w-full bg-[#121c33] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors cursor-pointer"
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

        {/* Bio */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-300 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-blue-400" />
            <span>Short Bio</span>
          </label>
          <textarea
            value={bio}
            onChange={e => setBio(e.target.value)}
            rows={3}
            className="w-full bg-[#121c33] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
            placeholder="Tell the community about your goals and technical passions..."
          />
        </div>

        {/* Learning & Goal Preferences */}
        <div className="bg-[#10192d] border border-cyan-500/30 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-gray-800 pb-3">
            <div className="flex items-center gap-2 text-cyan-400 font-extrabold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Learning & Goal Preferences</span>
            </div>
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

            {/* Sync Notifications */}
            <div className="space-y-1.5 flex flex-col justify-end">
              <label className="font-bold text-gray-300 flex items-center justify-between py-1 cursor-pointer">
                <span>Notification Reminders</span>
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

        {/* Technical Interests */}
        <div className="space-y-2 pt-2">
          <label className="text-xs font-bold text-gray-300 block">Select Primary Focus Areas</label>
          <div className="flex flex-wrap gap-2">
            {availableInterests.map(interest => {
              const isSelected = selectedInterests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
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
            onClick={() => onNavigateTab('portfolio')}
            className="text-xs text-gray-400 hover:text-white font-bold transition-colors cursor-pointer"
          >
            Cancel & Return to Portfolio
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-xl shadow-blue-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Save Profile & Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
