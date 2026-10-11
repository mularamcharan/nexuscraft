import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserState, ActiveTab } from '../types';
import { 
  X, 
  Award, 
  Sparkles, 
  Zap, 
  Trophy, 
  ShieldCheck, 
  CheckCircle2, 
  User, 
  BookOpen, 
  Brain, 
  Leaf, 
  Users, 
  Target,
  Flame,
  ChevronRight,
  Globe,
  BarChart2,
  Lock,
  Crown,
  HelpCircle,
  ExternalLink,
  Check,
  Compass,
  ArrowRight,
  FolderGit2
} from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userState: UserState;
  onUpdateState?: (updater: (prev: UserState) => UserState) => void;
  onSendToast?: (msg: string, type?: 'success' | 'info' | 'error') => void;
  setActiveTab?: (tab: ActiveTab) => void;
  onOpenCertificate?: () => void;
  onOpenModule?: (moduleId: string) => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  userState,
  onUpdateState,
  onSendToast,
  setActiveTab,
  onOpenCertificate,
  onOpenModule,
}) => {
  const [levelUpEffect, setLevelUpEffect] = useState<string | null>(null);
  const [activeProfileSection, setActiveProfileSection] = useState<'quick-access' | 'skills' | 'milestones'>('quick-access');

  // Skill domains state for interactive leveling
  const [skillLevels, setSkillLevels] = useState([
    {
      id: 'ai',
      name: 'AI & Machine Learning Logic',
      icon: Brain,
      level: 3,
      xp: 75,
      maxXp: 100,
      color: 'from-[#06b6d4] to-[#3b82f6]',
      glowColor: 'rgba(6, 182, 212, 0.4)',
    },
    {
      id: 'env',
      name: 'Environmental Data & Satellites',
      icon: Leaf,
      level: 2,
      xp: 50,
      maxXp: 100,
      color: 'from-[#10b981] to-[#059669]',
      glowColor: 'rgba(16, 185, 129, 0.4)',
    },
    {
      id: 'soft',
      name: 'Leadership & Soft Skills',
      icon: Users,
      level: 4,
      xp: 85,
      maxXp: 100,
      color: 'from-pink-500 to-purple-600',
      glowColor: 'rgba(236, 72, 153, 0.4)',
    },
    {
      id: 'comm',
      name: 'English & Technical Interviewing',
      icon: Target,
      level: 3,
      xp: 60,
      maxXp: 100,
      color: 'from-amber-400 to-orange-500',
      glowColor: 'rgba(245, 158, 11, 0.4)',
    },
  ]);

  // Environmental Impact Sustainability Milestones
  const sustainabilityMilestones = [
    {
      id: 'carbon-metrics',
      title: 'Carbon Footprint Auditor Goal',
      category: 'Emissions & Carbon Data',
      moduleId: 'env-mod-1',
      moduleTitle: 'Environmental Data & Carbon Metrics',
      icon: Leaf,
      color: 'from-emerald-500 to-teal-600',
      description: 'Engineered baseline Scope 1-3 corporate emissions models and carbon equivalency audits.',
    },
    {
      id: 'eco-dashboards',
      title: 'Eco Dashboard Architect',
      category: 'UX & Resource Analytics',
      moduleId: 'env-mod-2',
      moduleTitle: 'Sustainability Dashboard Design',
      icon: BarChart2,
      color: 'from-cyan-500 to-blue-600',
      description: 'Designed interactive real-time resource tracking systems for energy, water, and waste reduction.',
    },
    {
      id: 'satellite-forest',
      title: 'Geospatial Forest Guardian',
      category: 'Satellite Computer Vision',
      moduleId: 'env-mod-3',
      moduleTitle: 'Satellite Vision & Deforestation',
      icon: Globe,
      color: 'from-green-500 to-emerald-700',
      description: 'Deployed computer vision on satellite telemetry to detect forest canopy degradation and illegal logging in real time.',
    },
    {
      id: 'predictive-forecast',
      title: 'Predictive Climate Strategist',
      category: 'AI & Clean Grid',
      moduleId: 'ai-mod-5',
      moduleTitle: 'Predictive AI & Sustainability Forecasting',
      icon: Zap,
      color: 'from-amber-400 to-orange-500',
      description: 'Simulated time-series AI forecasting models to optimize clean energy grid balancing and prevent outages.',
    },
    {
      id: 'eco-ai-scholar',
      title: 'Net-Zero AI Scholar Milestone',
      category: 'Multi-Disciplinary Impact',
      moduleId: 'any-3',
      moduleTitle: 'Complete 3+ Environmental AI Modules',
      icon: Sparkles,
      color: 'from-purple-500 to-indigo-600',
      description: 'Demonstrated cross-disciplinary AI & sustainability competence, offsetting an estimated 1.5 tons CO2e in simulated lab models.',
    },
  ];

  if (!isOpen) return null;

  // Level calculations based on user points
  const userXp = userState.totalPoints;
  const currentLevel = Math.floor(userXp / 100) + 1;
  const xpInCurrentLevel = userXp % 100;
  const levelProgressPercent = Math.min(100, xpInCurrentLevel);

  // Level-up action trigger
  const handleLevelUpSkill = (skillId: string) => {
    setSkillLevels(prev =>
      prev.map(skill => {
        if (skill.id === skillId) {
          const newXp = skill.xp + 25;
          let newLevel = skill.level;
          let finalXp = newXp;

          if (newXp >= skill.maxXp) {
            newLevel += 1;
            finalXp = newXp - skill.maxXp;
            setLevelUpEffect(`⚡ LEVEL UP! ${skill.name} reached Level ${newLevel}!`);
            if (onSendToast) {
              onSendToast(`🎉 LEVEL UP! ${skill.name} is now Level ${newLevel}!`, 'success');
            }
          } else {
            if (onSendToast) {
              onSendToast(`+25 XP added to ${skill.name}!`, 'info');
            }
          }

          return {
            ...skill,
            level: newLevel,
            xp: finalXp,
          };
        }
        return skill;
      })
    );

    if (onUpdateState) {
      onUpdateState(prev => ({
        ...prev,
        totalPoints: prev.totalPoints + 25,
      }));
    }
  };

  const handleGlobalXpBoost = () => {
    if (onUpdateState) {
      onUpdateState(prev => {
        const nextPoints = prev.totalPoints + 50;
        const oldLvl = Math.floor(prev.totalPoints / 100) + 1;
        const newLvl = Math.floor(nextPoints / 100) + 1;

        if (newLvl > oldLvl) {
          setLevelUpEffect(`🌟 LEVEL UP! You reached Overall Level ${newLvl}!`);
          if (onSendToast) {
            onSendToast(`🔥 Congratulations! Reached Overall Level ${newLvl}! (+50 PTS)`, 'success');
          }
        } else {
          if (onSendToast) {
            onSendToast(`+50 XP gained! Keep pushing forward.`, 'info');
          }
        }

        return {
          ...prev,
          totalPoints: nextPoints,
        };
      });
    }
  };

  const handleQuickAccessNavigate = (tab: ActiveTab, action?: () => void) => {
    onClose();
    if (action) {
      action();
    } else if (setActiveTab) {
      setActiveTab(tab);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-[#0b1222] border border-[#06b6d4]/40 rounded-3xl max-w-3xl w-full p-5 sm:p-7 space-y-6 shadow-2xl relative my-auto overflow-y-auto max-h-[92vh] custom-scrollbar text-white"
      >
        {/* Background Decorative Glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#06b6d4]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-2xl bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white transition-all cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header User Executive Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-800/80 pb-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#06b6d4] via-[#3b82f6] to-[#10b981] p-1 shadow-lg shadow-[#06b6d4]/20">
                <div className="w-full h-full bg-[#0d1628] rounded-xl flex items-center justify-center text-2xl font-black text-[#06b6d4]">
                  {userState.userName.charAt(0)}
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 px-2 py-0.5 rounded-full bg-amber-500 text-black font-extrabold text-[10px] border border-black flex items-center gap-1 shadow-md">
                <Sparkles className="w-2.5 h-2.5" />
                <span>Lvl {currentLevel}</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="font-display text-xl sm:text-2xl font-extrabold text-white">
                  {userState.userName}
                </h2>
                <ShieldCheck className="w-5 h-5 text-[#06b6d4]" />
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 rounded-full bg-[#06b6d4]/10 text-[#06b6d4] border border-[#06b6d4]/30 font-bold">
                  Level {currentLevel} Climate AI Scholar
                </span>
                <span className="text-gray-400 font-semibold">•</span>
                <span className="text-amber-400 font-bold flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-orange-400" /> 5-Day Streak
                </span>
                <span className="text-gray-400 font-semibold">•</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Active Member
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleGlobalXpBoost}
              className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:scale-[1.03] active:scale-[0.97] transition-all flex items-center gap-2 cursor-pointer shrink-0"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>+50 XP</span>
            </button>
          </div>
        </div>

        {/* Profile Internal Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-[#10192d] rounded-2xl border border-[#1e2d4a] overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveProfileSection('quick-access')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeProfileSection === 'quick-access'
                ? 'bg-[#2563eb] text-white shadow-md shadow-blue-500/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Quick Access Hub</span>
          </button>

          <button
            onClick={() => setActiveProfileSection('skills')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeProfileSection === 'skills'
                ? 'bg-[#2563eb] text-white shadow-md shadow-blue-500/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Skill Domains & Progression</span>
          </button>

          <button
            onClick={() => setActiveProfileSection('milestones')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeProfileSection === 'milestones'
                ? 'bg-[#2563eb] text-white shadow-md shadow-blue-500/30'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Milestones & Badges ({userState.earnedBadges.length})</span>
          </button>
        </div>

        {/* Level Up Announcement Alert */}
        <AnimatePresence>
          {levelUpEffect && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-purple-500/20 border border-amber-400/50 rounded-2xl p-3 text-center text-xs sm:text-sm font-extrabold text-amber-300 shadow-xl flex items-center justify-between gap-2"
            >
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400 animate-bounce" />
                <span>{levelUpEffect}</span>
              </div>
              <button
                onClick={() => setLevelUpEffect(null)}
                className="text-amber-300/70 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SECTION 1: QUICK ACCESS HUB */}
        {activeProfileSection === 'quick-access' && (
          <div className="space-y-6 animate-fadeIn">
            {/* Quick Access Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" />
                  Quick Access Workspace Tools
                </h3>
                <span className="text-xs text-gray-400">Click any card to launch module</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {/* 1. Portfolio Hub */}
                <button
                  onClick={() => {
                    handleQuickAccessNavigate('portfolio');
                  }}
                  className="p-4 bg-[#10192d] hover:bg-[#16233d] border border-[#06b6d4]/40 hover:border-[#06b6d4] rounded-2xl flex flex-col items-center text-center gap-2.5 transition-all cursor-pointer group shadow-lg shadow-cyan-500/5 hover:scale-[1.02]"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#06b6d4]/20 text-[#06b6d4] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <FolderGit2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-white group-hover:text-[#06b6d4] transition-colors">Portfolio</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">Projects & Certs</div>
                  </div>
                </button>

                {/* 3. Certificates */}
                <button
                  onClick={() => {
                    if (onOpenCertificate) {
                      onClose();
                      onOpenCertificate();
                    } else {
                      handleQuickAccessNavigate('portfolio');
                    }
                  }}
                  className="p-4 bg-[#10192d] hover:bg-[#16233d] border border-purple-500/40 hover:border-purple-400 rounded-2xl flex flex-col items-center text-center gap-2.5 transition-all cursor-pointer group shadow-lg shadow-purple-500/5 hover:scale-[1.02]"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-white group-hover:text-purple-300 transition-colors">Certificates</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">Verified Badge</div>
                  </div>
                </button>

                {/* 4. Achievements */}
                <button
                  onClick={() => setActiveProfileSection('milestones')}
                  className="p-4 bg-[#10192d] hover:bg-[#16233d] border border-orange-500/40 hover:border-orange-400 rounded-2xl flex flex-col items-center text-center gap-2.5 transition-all cursor-pointer group shadow-lg shadow-orange-500/5 hover:scale-[1.02]"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-white group-hover:text-orange-300 transition-colors">Achievements</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">{userState.earnedBadges.length} Badges</div>
                  </div>
                </button>

                {/* 5. Prompt Mastery */}
                <button
                  onClick={() => handleQuickAccessNavigate('prompt-mastery')}
                  className="p-4 bg-[#10192d] hover:bg-[#16233d] border border-indigo-500/40 hover:border-indigo-400 rounded-2xl flex flex-col items-center text-center gap-2.5 transition-all cursor-pointer group shadow-lg shadow-indigo-500/5 hover:scale-[1.02]"
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-white group-hover:text-indigo-300 transition-colors">Prompt Mastery</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">Prompt Engineering</div>
                  </div>
                </button>

                {/* 6. Take Quiz */}
                <button
                  onClick={() => handleQuickAccessNavigate('quizzes')}
                  className="p-4 bg-[#10192d] hover:bg-[#16233d] border border-pink-500/40 hover:border-pink-400 rounded-2xl flex flex-col items-center text-center gap-2.5 transition-all cursor-pointer group shadow-lg shadow-pink-500/5 hover:scale-[1.02]"
                >
                  <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-white group-hover:text-pink-300 transition-colors">Take Quiz</div>
                    <div className="text-[10px] text-gray-400 mt-0.5">Challenge & XP</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Overall Level Progress Bar */}
            <div className="bg-[#10182b] border border-gray-800 rounded-2xl p-5 space-y-3 shadow-lg">
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                <div className="flex items-center gap-2 text-gray-200">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Overall XP Progression</span>
                </div>
                <div className="text-[#06b6d4]">
                  <span>{userXp} XP</span>
                  <span className="text-gray-400 font-normal"> / {(currentLevel) * 100} XP ({levelProgressPercent}%)</span>
                </div>
              </div>

              {/* Framer Motion Progress Bar */}
              <div className="w-full bg-gray-800/80 rounded-full h-4 overflow-hidden p-0.5 border border-gray-700/60 relative">
                <motion.div
                  className="bg-gradient-to-r from-[#06b6d4] via-[#3b82f6] to-[#10b981] h-full rounded-full relative shadow-[0_0_15px_rgba(6,182,212,0.6)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${levelProgressPercent}%` }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                  <motion.div
                    className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: '200%' }}
                    transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                  />
                </motion.div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-gray-400 font-semibold">
                <span>Level {currentLevel} Climate AI Scholar</span>
                <span className="text-amber-400 font-bold">{100 - xpInCurrentLevel} XP to Level {currentLevel + 1}</span>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: SKILL DOMAINS */}
        {activeProfileSection === 'skills' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Brain className="w-4 h-4 text-[#06b6d4]" />
                Skill Domain Mastery
              </h3>
              <span className="text-[11px] text-gray-400">Click '+25 XP' to level up specific skills</span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {skillLevels.map((skill) => {
                const Icon = skill.icon;
                const skillPercent = Math.min(100, Math.round((skill.xp / skill.maxXp) * 100));

                return (
                  <div
                    key={skill.id}
                    className="bg-[#121b30] border border-gray-800 hover:border-gray-700 rounded-2xl p-4 space-y-2.5 transition-all shadow-md group"
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <div className="flex items-center gap-2 text-white">
                        <div className="p-1.5 rounded-lg bg-gray-800 border border-gray-700 text-[#06b6d4]">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span>{skill.name}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-extrabold border border-amber-500/30">
                          Lvl {skill.level}
                        </span>
                        <button
                          onClick={() => handleLevelUpSkill(skill.id)}
                          className="px-2.5 py-1 rounded-xl bg-[#06b6d4]/20 hover:bg-[#06b6d4]/30 text-[#06b6d4] text-[11px] font-extrabold border border-[#06b6d4]/40 transition-all cursor-pointer flex items-center gap-1 active:scale-95"
                        >
                          <Zap className="w-3 h-3" />
                          <span>+25 XP</span>
                        </button>
                      </div>
                    </div>

                    <div className="w-full bg-gray-800/80 rounded-full h-3 overflow-hidden p-0.5 border border-gray-700/50 relative">
                      <motion.div
                        className={`bg-gradient-to-r ${skill.color} h-full rounded-full relative`}
                        initial={{ width: 0 }}
                        animate={{ width: `${skillPercent}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        style={{ boxShadow: `0 0 10px ${skill.glowColor}` }}
                      >
                        <motion.div
                          className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full"
                          animate={{ opacity: [0.4, 1, 0.4] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                        />
                      </motion.div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-gray-400 font-semibold">
                      <span>{skill.xp} / {skill.maxXp} XP</span>
                      <span>{skillPercent}% Mastered</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* SECTION 3: MILESTONES & BADGES */}
        {activeProfileSection === 'milestones' && (
          <div className="space-y-5 animate-fadeIn">
            {/* Sustainability Milestones Section */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-400" />
                  Sustainability Milestones & Environmental Impact
                </h3>
                <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  {sustainabilityMilestones.filter(m => m.moduleId === 'any-3' ? userState.completedModules.length >= 3 : userState.completedModules.includes(m.moduleId)).length} / {sustainabilityMilestones.length} Achieved
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sustainabilityMilestones.map((milestone) => {
                  const Icon = milestone.icon;
                  const isAchieved = milestone.moduleId === 'any-3' 
                    ? userState.completedModules.length >= 3 
                    : userState.completedModules.includes(milestone.moduleId);

                  return (
                    <div
                      key={milestone.id}
                      className={`p-3.5 rounded-2xl border transition-all flex flex-col justify-between space-y-2 relative overflow-hidden ${
                        isAchieved
                          ? 'bg-[#0f1d33] border-emerald-500/50 shadow-lg shadow-emerald-500/10'
                          : 'bg-[#0f172a] border-gray-800 opacity-75'
                      }`}
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${milestone.color} flex items-center justify-center text-white shadow-md`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${
                            isAchieved
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 flex items-center gap-1'
                              : 'bg-gray-800 text-gray-400 border-gray-700 flex items-center gap-1'
                          }`}>
                            {isAchieved ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Lock className="w-3 h-3 text-gray-400" />}
                            {isAchieved ? 'Goal Achieved' : 'Locked'}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-extrabold text-white text-xs sm:text-sm">{milestone.title}</h4>
                          <p className="text-[10px] text-[#06b6d4] font-semibold">{milestone.category}</p>
                        </div>

                        <p className="text-[11px] text-gray-300 leading-relaxed font-normal">
                          {milestone.description}
                        </p>
                      </div>

                      {!isAchieved && onOpenModule && milestone.moduleId !== 'any-3' && (
                        <button
                          onClick={() => {
                            onClose();
                            onOpenModule(milestone.moduleId);
                          }}
                          className="mt-1 w-full py-1 px-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1"
                        >
                          <span>Unlock via {milestone.moduleTitle}</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Badges Earned Quick Row */}
            <div className="space-y-3 pt-2 border-t border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-400" />
                  Verified Credentials & Badges
                </h3>
                <span className="text-xs text-purple-400 font-bold">{userState.earnedBadges.length} Earned</span>
              </div>

              {userState.earnedBadges.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {userState.earnedBadges.map((badge, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-200 text-xs font-bold flex items-center gap-2 shadow-sm"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                      <span>{badge}</span>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-[#10182b] border border-gray-800 rounded-2xl text-center text-xs text-gray-400">
                  No badges earned yet. Complete quizzes or learning tracks to earn verified badges!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-4 border-t border-gray-800/80 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {onOpenCertificate && (
              <button
                onClick={() => {
                  onClose();
                  onOpenCertificate();
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#06b6d4] to-[#3b82f6] text-white text-xs font-extrabold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Award className="w-3.5 h-3.5" />
                <span>View Certificate</span>
              </button>
            )}

            {setActiveTab && (
              <button
                onClick={() => {
                  onClose();
                  setActiveTab('portfolio');
                }}
                className="px-4 py-2 rounded-xl bg-[#141e38] border border-gray-700 hover:border-[#06b6d4] text-gray-200 hover:text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Full Portfolio</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold text-xs transition-all cursor-pointer"
          >
            Close Profile
          </button>
        </div>
      </motion.div>
    </div>
  );
};

