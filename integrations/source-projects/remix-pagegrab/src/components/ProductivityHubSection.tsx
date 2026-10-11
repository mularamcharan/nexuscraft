import React, { useState, useEffect } from 'react';
import { UserState } from '../types';
import { 
  Brain, 
  Sparkles, 
  Clock, 
  Flame, 
  TrendingUp, 
  CheckCircle2, 
  Plus, 
  Play, 
  Pause, 
  RotateCcw, 
  ListTodo, 
  Lightbulb, 
  Zap, 
  Calendar, 
  BarChart2, 
  Tag, 
  ArrowRight,
  ShieldCheck,
  Check,
  Target,
  Save,
  BookOpen,
  Leaf,
  Award,
  BellRing
} from 'lucide-react';

interface ProductivityHubSectionProps {
  userState?: UserState;
  onOpenModule?: (moduleId: string) => void;
  onSendToast?: (msg: string, type?: 'success' | 'info' | 'error') => void;
  onSimulateInactivity?: () => void;
}

export const ProductivityHubSection: React.FC<ProductivityHubSectionProps> = ({
  userState,
  onOpenModule,
  onSendToast,
  onSimulateInactivity,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'planner' | 'insights' | 'tasks'>('planner');

  // Daily Learning Streak Goal Setter State
  const [dailyTargetMins, setDailyTargetMins] = useState<number>(30);
  const [dailyTargetModules, setDailyTargetModules] = useState<number>(1);
  const [selectedFocusTrack, setSelectedFocusTrack] = useState<string>('env-mod-1');
  const [todayStudiedMins, setTodayStudiedMins] = useState<number>(20);
  const [todayCompletedModules, setTodayCompletedModules] = useState<number>(1);
  const [streakDays, setStreakDays] = useState<number>(5);
  const [isEditingGoal, setIsEditingGoal] = useState<boolean>(false);

  // Environmental AI Modules List for Goal Setter
  const envModulesOptions = [
    { id: 'env-mod-1', name: 'Environmental Data & Carbon Metrics' },
    { id: 'env-mod-2', name: 'Sustainability Dashboard Design' },
    { id: 'env-mod-3', name: 'Satellite Vision & Deforestation' },
    { id: 'ai-mod-5', name: 'Predictive AI & Climate Forecasting' },
  ];

  const handleSaveGoal = () => {
    setIsEditingGoal(false);
    if (onSendToast) {
      onSendToast(`🎯 Daily streak goal target saved: ${dailyTargetMins} mins/day (${dailyTargetModules} module/day)!`, 'success');
    }
  };

  const handleLogStudyTime = (mins: number) => {
    const newTotal = todayStudiedMins + mins;
    setTodayStudiedMins(newTotal);
    if (newTotal >= dailyTargetMins && todayStudiedMins < dailyTargetMins) {
      setStreakDays(prev => prev + 1);
      if (onSendToast) {
        onSendToast(`🎉 Daily Target Reached! Streak extended to ${streakDays + 1} days!`, 'success');
      }
    } else if (onSendToast) {
      onSendToast(`+${mins} mins Environmental AI study session recorded!`, 'info');
    }
  };

  // AI Planner state
  const [plannerGoal, setPlannerGoal] = useState('');
  const [generatedPlan, setGeneratedPlan] = useState<{
    title: string;
    description: string;
    schedule: { step: string; detail: string; time: string }[];
    rules: string[];
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Pomodoro Focus Timer state
  const [timerMode, setTimerMode] = useState<25 | 15 | 5>(25);
  const [timerSeconds, setTimerSeconds] = useState(25 * 60); // 25 mins
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [focusHoursLogged, setFocusHoursLogged] = useState(0);
  const [selectedTaskId, setSelectedTaskId] = useState<string>('2');
  const [sessionXpEarned, setSessionXpEarned] = useState<number>(0);

  // Task list state
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Complete AI Data Fundamentals Module', completed: true, time: '20 min' },
    { id: '2', title: 'Solve Environmental Carbon Metrics Quiz', completed: false, time: '15 min' },
    { id: '3', title: 'Run Satellite Deforestation Simulator', completed: false, time: '25 min' },
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleFinishPomodoroSession = () => {
    setIsTimerRunning(false);
    setTimerSeconds(timerMode * 60);
    setFocusHoursLogged(prev => prev + (timerMode / 60));
    setSessionXpEarned(prev => prev + 50);

    // Auto-complete selected task if one is attached
    if (selectedTaskId) {
      setTasks(prev => prev.map(t => t.id === selectedTaskId ? { ...t, completed: true } : t));
    }

    const taskTitle = tasks.find(t => t.id === selectedTaskId)?.title || 'Pomodoro Deep Focus Task';
    if (onSendToast) {
      onSendToast(`🎉 Pomodoro Focus Session Complete! +50 XP awarded for "${taskTitle}"!`, 'success');
    }
  };

  // Timer countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      handleFinishPomodoroSession();
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const setTimerPreset = (mins: 25 | 15 | 5) => {
    setIsTimerRunning(false);
    setTimerMode(mins);
    setTimerSeconds(mins * 60);
  };

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePresetClick = (presetText: string) => {
    setPlannerGoal(`I want to ${presetText.toLowerCase()} and build real-world AI applications.`);
  };

  const handleGeneratePlan = () => {
    if (!plannerGoal.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      setGeneratedPlan({
        title: `Deep Work Plan: ${plannerGoal.slice(0, 30)}...`,
        description: 'Optimized high-impact schedule based on cognitive load balancing and daily deep work sessions.',
        schedule: [
          { step: 'Phase 1: Core Fundamentals', detail: 'Read concept theory & interactive code snippets', time: '25 mins' },
          { step: 'Phase 2: Hands-On Simulator Lab', detail: 'Apply neural net parameters or carbon calculation tools', time: '35 mins' },
          { step: 'Phase 3: Knowledge Assessment & Review', detail: 'Pass topic quiz and verify mastery certificate badges', time: '15 mins' },
        ],
        rules: [
          'Disable mobile notifications during 25-min Pomodoro sprints',
          'Document daily progress in Learner Interaction Space',
          'Review error logs carefully before asking AI Assistant'
        ],
      });
      setIsGenerating(false);
    }, 800);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setTasks(prev => [
      ...prev,
      { id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`, title: newTaskTitle.trim(), completed: false, time: '20 min' }
    ]);
    setNewTaskTitle('');
  };

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="space-y-8 py-4 animate-fadeIn">
      {/* Header Banner matching Screenshot 2 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl font-extrabold text-white">
              Productivity Hub
            </h1>
            <p className="text-xs sm:text-sm text-gray-400">
              Track tasks & plan with AI. Everything runs offline in your browser.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full font-semibold">
            <CheckCircle2 className="w-4 h-4" /> Offline Engine Ready
          </div>
        </div>

        {/* Sub-Navigation Buttons matching Screenshot 2 */}
        <div className="flex items-center gap-2 border-b border-gray-800 pb-2">
          <button
            onClick={() => setActiveSubTab('planner')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'planner'
                ? 'bg-white text-gray-900 shadow-md'
                : 'bg-[#0f172a] text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#10b981]" /> AI Planner
          </button>

          <button
            onClick={() => setActiveSubTab('insights')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'insights'
                ? 'bg-white text-gray-900 shadow-md'
                : 'bg-[#0f172a] text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5 text-[#06b6d4]" /> Insights
          </button>

          <button
            onClick={() => setActiveSubTab('tasks')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeSubTab === 'tasks'
                ? 'bg-white text-gray-900 shadow-md'
                : 'bg-[#0f172a] text-gray-400 hover:text-white border border-gray-800'
            }`}
          >
            <ListTodo className="w-3.5 h-3.5 text-purple-400" /> Tasks & Focus
          </button>
        </div>
      </div>

      {/* Daily Learning Streak Goal Setter Box */}
      <div className="bg-gradient-to-r from-[#0d1829] via-[#0f2138] to-[#0e192c] border border-amber-500/40 rounded-3xl p-6 sm:p-7 space-y-6 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-800/80 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
                <Flame className="w-5 h-5 fill-amber-400" />
              </div>
              <h2 className="font-display text-lg sm:text-xl font-extrabold text-white">
                Daily Learning Streak & Goal Setter
              </h2>
            </div>
            <p className="text-xs text-gray-300">
              Set custom study duration targets & track your daily environmental AI study habits.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="px-3.5 py-1.5 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-300 font-extrabold text-xs flex items-center gap-1.5 shadow-md">
              <Flame className="w-4 h-4 fill-amber-400" />
              <span>{streakDays}-Day Active Streak</span>
            </div>

            {onSimulateInactivity && (
              <button
                onClick={onSimulateInactivity}
                className="px-3 py-1.5 rounded-2xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                title="Test 24-hour inactivity notification"
              >
                <BellRing className="w-3.5 h-3.5 text-indigo-400" />
                <span>Simulate 24h Inactivity</span>
              </button>
            )}
          </div>
        </div>

        {/* Goal Setter Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Target Setter Panel */}
          <div className="bg-[#121c31] border border-gray-800 rounded-2xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-white flex items-center gap-1.5">
                <Target className="w-4 h-4 text-[#06b6d4]" />
                Daily Target Configuration
              </h3>
              <button
                onClick={() => setIsEditingGoal(!isEditingGoal)}
                className="text-[11px] text-[#06b6d4] hover:underline font-bold"
              >
                {isEditingGoal ? 'Cancel' : 'Edit Goal'}
              </button>
            </div>

            {isEditingGoal ? (
              <div className="space-y-3 pt-1 text-xs">
                <div>
                  <label className="text-[11px] font-bold text-gray-300 block mb-1">Target Study Minutes / Day</label>
                  <div className="flex gap-1.5">
                    {[15, 30, 45, 60].map(mins => (
                      <button
                        key={mins}
                        onClick={() => setDailyTargetMins(mins)}
                        className={`flex-1 py-1.5 rounded-xl text-xs font-extrabold border cursor-pointer ${
                          dailyTargetMins === mins
                            ? 'bg-[#06b6d4] text-black border-[#06b6d4]'
                            : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        {mins}m
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-300 block mb-1">Target Modules / Day</label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3].map(mCount => (
                      <button
                        key={mCount}
                        onClick={() => setDailyTargetModules(mCount)}
                        className={`flex-1 py-1.5 rounded-xl text-xs font-extrabold border cursor-pointer ${
                          dailyTargetModules === mCount
                            ? 'bg-[#10b981] text-black border-[#10b981]'
                            : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-gray-600'
                        }`}
                      >
                        {mCount} Mod
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-300 block mb-1">Focus Environmental AI Module</label>
                  <select
                    value={selectedFocusTrack}
                    onChange={(e) => setSelectedFocusTrack(e.target.value)}
                    className="w-full bg-[#18233b] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#06b6d4]"
                  >
                    {envModulesOptions.map(opt => (
                      <option key={opt.id} value={opt.id}>{opt.name}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={handleSaveGoal}
                  className="w-full py-2 rounded-xl bg-gradient-to-r from-[#06b6d4] to-[#10b981] text-black font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5 cursor-pointer mt-2"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Goal Target</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2.5 pt-1 text-xs">
                <div className="flex justify-between items-center bg-[#18233b] p-2.5 rounded-xl border border-gray-800">
                  <span className="text-gray-400 font-medium">Daily Study Target:</span>
                  <span className="font-extrabold text-[#06b6d4]">{dailyTargetMins} Minutes / Day</span>
                </div>

                <div className="flex justify-between items-center bg-[#18233b] p-2.5 rounded-xl border border-gray-800">
                  <span className="text-gray-400 font-medium">Module Target:</span>
                  <span className="font-extrabold text-emerald-400">{dailyTargetModules} Module / Day</span>
                </div>

                <div className="bg-[#18233b] p-2.5 rounded-xl border border-gray-800 space-y-1">
                  <span className="text-[10px] text-gray-400 font-medium block">Current Focus Module:</span>
                  <span className="font-extrabold text-amber-300 text-[11px] block truncate">
                    {envModulesOptions.find(o => o.id === selectedFocusTrack)?.name}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Today's Progress & Gauge */}
          <div className="bg-[#121c31] border border-gray-800 rounded-2xl p-4 space-y-3.5 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-white flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-emerald-400" />
                  Today's Study Progress
                </span>
                <span className="text-xs font-extrabold text-amber-400">
                  {Math.min(100, Math.round((todayStudiedMins / dailyTargetMins) * 100))}%
                </span>
              </div>

              <div className="text-2xl font-black text-white flex items-baseline gap-1.5">
                <span className="text-emerald-400">{todayStudiedMins}m</span>
                <span className="text-gray-400 text-xs font-normal">/ {dailyTargetMins}m target today</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-800 rounded-full h-3.5 overflow-hidden p-0.5 border border-gray-700 relative">
                <div
                  className="bg-gradient-to-r from-[#06b6d4] via-[#10b981] to-amber-400 h-full rounded-full transition-all duration-500 relative"
                  style={{ width: `${Math.min(100, (todayStudiedMins / dailyTargetMins) * 100)}%` }}
                />
              </div>

              {todayStudiedMins >= dailyTargetMins ? (
                <div className="p-2 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-extrabold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>🎯 Daily Study Target Achieved! Great job!</span>
                </div>
              ) : (
                <p className="text-[11px] text-gray-400">
                  Study <span className="text-amber-300 font-bold">{dailyTargetMins - todayStudiedMins} more mins</span> to preserve your {streakDays}-day streak!
                </p>
              )}
            </div>

            {/* Quick Log Buttons */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Log Today's Study Activity</span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleLogStudyTime(15)}
                  className="flex-1 py-1.5 px-2 rounded-xl bg-[#06b6d4]/20 hover:bg-[#06b6d4]/30 text-[#06b6d4] border border-[#06b6d4]/40 text-[11px] font-extrabold transition-all cursor-pointer"
                >
                  +15 Mins
                </button>
                <button
                  onClick={() => handleLogStudyTime(30)}
                  className="flex-1 py-1.5 px-2 rounded-xl bg-[#10b981]/20 hover:bg-[#10b981]/30 text-[#10b981] border border-[#10b981]/40 text-[11px] font-extrabold transition-all cursor-pointer"
                >
                  +30 Mins
                </button>
                {onOpenModule && (
                  <button
                    onClick={() => onOpenModule(selectedFocusTrack)}
                    className="flex-1 py-1.5 px-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-extrabold transition-all cursor-pointer flex items-center justify-center gap-1"
                  >
                    <BookOpen className="w-3 h-3" />
                    <span>Open Module</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* 7-Day Active Weekly Grid */}
          <div className="bg-[#121c31] border border-gray-800 rounded-2xl p-4 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-white flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-purple-400" />
                  Weekly Streak Consistency
                </span>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  5/7 Days Active
                </span>
              </div>

              <p className="text-[11px] text-gray-300 mb-3">
                Consistently completing daily environmental AI sessions boosts overall learning retention by 4x.
              </p>

              {/* 7-day grid */}
              <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] text-gray-400">
                {['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'].map((day, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto font-extrabold text-xs transition-all ${
                      idx >= 2 
                        ? 'bg-gradient-to-tr from-[#10b981] to-[#06b6d4] text-black shadow-md shadow-emerald-500/20' 
                        : 'bg-gray-800 text-gray-500 border border-gray-700'
                    }`}>
                      {idx >= 2 ? '✓' : '•'}
                    </div>
                    <span className="font-semibold">{day}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-gray-800/80 flex items-center justify-between text-[11px]">
              <span className="text-gray-400">Total Environmental Impact Score:</span>
              <span className="text-amber-300 font-extrabold">940 PTS</span>
            </div>
          </div>
        </div>
      </div>

      {/* SUB-TAB 1: AI PLANNER */}
      {activeSubTab === 'planner' && (
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 sm:p-10 text-center space-y-6 shadow-2xl">
            <div className="w-14 h-14 rounded-2xl bg-[#10b981]/10 border border-[#10b981]/30 text-[#10b981] flex items-center justify-center mx-auto">
              <Brain className="w-7 h-7" />
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <h2 className="font-display text-2xl font-extrabold text-white">
                Deep Work AI Planner
              </h2>
              <p className="text-xs sm:text-sm text-gray-300">
                Describe your goals, situation, and what you want to achieve. Get a personalized productivity plan with tasks, schedules, and execution rules.
              </p>
            </div>

            {/* Input Bar */}
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={plannerGoal}
                  onChange={(e) => setPlannerGoal(e.target.value)}
                  placeholder="I want to learn coding, build an app, create content, and stay fit..."
                  className="w-full bg-[#141d33] border border-gray-700 rounded-2xl pl-4 pr-36 py-3.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#10b981]"
                />
                <button
                  onClick={handleGeneratePlan}
                  disabled={isGenerating || !plannerGoal.trim()}
                  className="absolute right-2 top-1.5 px-4 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] disabled:opacity-50 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  {isGenerating ? <Sparkles className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  <span>{isGenerating ? 'Analyzing...' : 'Generate Plan'}</span>
                </button>
              </div>

              {/* Preset Chips matching Screenshot 2 */}
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs">
                {[
                  'Learn coding',
                  'Content creation',
                  'Finance & investing',
                  'Health & fitness',
                  'Study for exams'
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => handlePresetClick(preset)}
                    className="px-3 py-1.5 rounded-xl bg-[#141b2d] border border-gray-800 hover:border-[#10b981] text-gray-300 hover:text-white transition-all cursor-pointer"
                  >
                    + {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generated Plan Result */}
          {generatedPlan && (
            <div className="bg-[#0e1628] border border-[#10b981]/40 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-fadeIn">
              <div className="space-y-1">
                <span className="px-3 py-1 rounded-full bg-[#10b981]/20 text-[#10b981] text-[10px] font-bold uppercase tracking-wider">
                  AI Plan Generated
                </span>
                <h3 className="font-display text-xl font-bold text-white">
                  {generatedPlan.title}
                </h3>
                <p className="text-xs text-gray-300">{generatedPlan.description}</p>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Recommended Execution Schedule</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {generatedPlan.schedule.map((item, idx) => (
                    <div key={idx} className="p-4 bg-[#141d33] border border-gray-800 rounded-2xl space-y-1 text-left">
                      <div className="text-[11px] font-bold text-[#10b981]">{item.time}</div>
                      <div className="font-bold text-white text-xs">{item.step}</div>
                      <div className="text-[11px] text-gray-400">{item.detail}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Focus Execution Rules</h4>
                <ul className="space-y-1.5 text-xs text-gray-300">
                  {generatedPlan.rules.map((rule, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 2: INSIGHTS (Screenshot 3) */}
      {activeSubTab === 'insights' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Focus Hours Logged Card */}
            <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-300">
                  <Clock className="w-4 h-4 text-[#10b981]" /> Focus Hours Logged
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-[#141d33] text-xs font-bold text-gray-300 border border-gray-800">
                  ⚡ {focusHoursLogged.toFixed(1)}h today
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-4xl font-extrabold text-[#10b981]">
                  {focusHoursLogged.toFixed(1)}h
                </div>
                <div className="text-xs text-gray-400">Total focus time</div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Daily goal: 4h</span>
                  <span>{Math.min(100, Math.round((focusHoursLogged / 4) * 100))}%</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="bg-[#10b981] h-full rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (focusHoursLogged / 4) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Learning Streak Card */}
            <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-300">
                  <Flame className="w-4 h-4 text-amber-400" /> Learning Streak
                </div>
                <span className="px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-bold">
                  🌱 Getting started
                </span>
              </div>

              <div className="space-y-1">
                <div className="text-4xl font-extrabold text-amber-400">
                  5
                </div>
                <div className="text-xs text-gray-400">Consecutive active days</div>
              </div>

              {/* 7-day streak grid matching Screenshot 3 */}
              <div className="grid grid-cols-7 gap-2 pt-2 text-center text-[10px] text-gray-400">
                {['Fri', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu'].map((day, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto font-bold ${
                      idx >= 2 ? 'bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40' : 'bg-gray-800 text-gray-500'
                    }`}>
                      {idx >= 2 ? '✓' : '•'}
                    </div>
                    <span>{day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Performance */}
            <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-gray-300 flex items-center gap-2">
                  <BarChart2 className="w-4 h-4 text-[#06b6d4]" /> Weekly Performance
                </h3>
                <span className="text-xs font-bold text-gray-400">3 tasks done</span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-3 bg-[#131d36] rounded-2xl border border-gray-800">
                  <div className="text-lg font-extrabold text-[#10b981]">100%</div>
                  <div className="text-[10px] text-gray-400">Completion</div>
                </div>
                <div className="p-3 bg-[#131d36] rounded-2xl border border-gray-800">
                  <div className="text-lg font-extrabold text-amber-400">85%</div>
                  <div className="text-[10px] text-gray-400">Habits</div>
                </div>
                <div className="p-3 bg-[#131d36] rounded-2xl border border-gray-800">
                  <div className="text-lg font-extrabold text-[#06b6d4]">90%</div>
                  <div className="text-[10px] text-gray-400">Goals</div>
                </div>
              </div>
            </div>

            {/* Personalized Suggestions Card matching Screenshot 3 */}
            <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-xs font-bold text-gray-300 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-purple-400" /> Personalized AI Suggestions
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-200 flex items-start gap-3">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">No focus time logged today</div>
                    <div className="text-[11px] text-amber-300/80">Try starting with a 25-minute deep work focus session to build momentum.</div>
                  </div>
                </div>

                <div className="p-3.5 bg-[#06b6d4]/10 border border-[#06b6d4]/30 rounded-2xl text-[#06b6d4] flex items-start gap-3">
                  <Zap className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold">Maintain your learning streak!</div>
                    <div className="text-[11px] opacity-80">Complete one learning module or quiz assessment today.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: TASKS & POMODORO TIMER */}
      {activeSubTab === 'tasks' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pomodoro Focus Timer Box */}
          <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-5">
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-bold uppercase tracking-wider">
                  Pomodoro Focus Engine
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-extrabold flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>+{sessionXpEarned} XP Earned</span>
                </span>
              </div>
              <h3 className="font-display text-xl font-bold text-white pt-1">
                Deep Work Focus Timer
              </h3>
            </div>

            {/* Timer Presets */}
            <div className="flex items-center justify-center gap-2">
              {[
                { label: '25m Focus', mins: 25 },
                { label: '15m Sprint', mins: 15 },
                { label: '5m Rest', mins: 5 },
              ].map((preset) => (
                <button
                  key={preset.mins}
                  onClick={() => setTimerPreset(preset.mins as 25 | 15 | 5)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all cursor-pointer ${
                    timerMode === preset.mins
                      ? 'bg-purple-500 text-white border-purple-400 shadow-md'
                      : 'bg-[#141d33] text-gray-400 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Main Digital Clock */}
            <div className="text-5xl font-mono font-extrabold text-white tracking-widest bg-[#141d33] py-7 rounded-3xl border border-gray-800 shadow-inner relative overflow-hidden">
              {formatTimer(timerSeconds)}
              {isTimerRunning && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#06b6d4] via-[#10b981] to-purple-500 animate-pulse" />
              )}
            </div>

            {/* Linked Task Selector */}
            <div className="space-y-1 text-left">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                Attach Goal Task to Session (+50 XP Award)
              </label>
              <select
                value={selectedTaskId}
                onChange={(e) => setSelectedTaskId(e.target.value)}
                className="w-full bg-[#141d33] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
              >
                {tasks.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.completed ? '✓ ' : '○ '}{t.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Timer Control Buttons */}
            <div className="space-y-2">
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setIsTimerRunning(!isTimerRunning)}
                  className={`flex-1 py-3 rounded-2xl text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isTimerRunning ? 'bg-amber-600 hover:bg-amber-700' : 'bg-[#10b981] hover:bg-[#059669]'
                  }`}
                >
                  {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isTimerRunning ? 'Pause Session' : 'Start Focus'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsTimerRunning(false);
                    setTimerSeconds(timerMode * 60);
                  }}
                  className="p-3 rounded-2xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold text-xs transition-all cursor-pointer"
                  title="Reset Timer"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleFinishPomodoroSession}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Award className="w-4 h-4 text-amber-300" />
                <span>Complete Session & Claim +50 XP</span>
              </button>
            </div>
          </div>

          {/* Task Checklist Manager */}
          <div className="lg:col-span-2 bg-[#0e1628] border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <ListTodo className="w-5 h-5 text-[#06b6d4]" />
                  Tasks & Daily Goals
                </h3>
                <p className="text-xs text-gray-400">Manage your daily learning objectives and practice labs</p>
              </div>
            </div>

            {/* Add Task Form */}
            <form onSubmit={handleAddTask} className="flex gap-2">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Add a new learning goal or workshop task..."
                className="flex-1 bg-[#141d33] border border-gray-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#06b6d4]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#06b6d4] hover:bg-[#0891b2] text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </form>

            {/* Task List */}
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    task.completed
                      ? 'bg-[#101b2b]/60 border-emerald-500/30 text-gray-400 line-through'
                      : 'bg-[#141d33] border-gray-800 text-white hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 ${
                      task.completed ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-gray-600'
                    }`}>
                      {task.completed && <Check className="w-3.5 h-3.5" />}
                    </div>
                    <span className="text-xs font-semibold">{task.title}</span>
                  </div>

                  <span className="text-[10px] text-gray-400 font-medium px-2 py-1 rounded-lg bg-gray-800">
                    ⏱️ {task.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
