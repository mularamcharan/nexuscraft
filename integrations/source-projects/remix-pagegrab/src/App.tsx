import React, { useState, Suspense } from 'react';
import { ActiveTab, UserState, Module } from './types';
import { TRACKS, QUIZZES } from './data/nexusData';
import { Sidebar } from './components/Sidebar';
import { ParticleBackground } from './components/ParticleBackground';
import { ModuleViewerModal } from './components/ModuleViewerModal';
import { CertificateModal } from './components/CertificateModal';
import { UserProfileModal } from './components/UserProfileModal';
import { SettingsModal, ThemeMode } from './components/SettingsModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { NotificationsModal } from './components/NotificationsModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Toast } from './components/Toast';
import { BackButton } from './components/BackButton';
import { ErrorBoundary, LoadingFallback } from './components/ErrorBoundary';

const PromptMasterySection = React.lazy(() => import('./components/PromptMasterySection').then(m => ({ default: m.PromptMasterySection })));
const ProductivityHubSection = React.lazy(() => import('./components/ProductivityHubSection').then(m => ({ default: m.ProductivityHubSection })));
const LearnerSpaceSection = React.lazy(() => import('./components/LearnerSpaceSection').then(m => ({ default: m.LearnerSpaceSection })));
const QuizSection = React.lazy(() => import('./components/QuizSection').then(m => ({ default: m.QuizSection })));
const PortfolioSection = React.lazy(() => import('./components/PortfolioSection').then(m => ({ default: m.PortfolioSection })));
const MessagesSection = React.lazy(() => import('./components/MessagesSection').then(m => ({ default: m.MessagesSection })));
const SettingsSection = React.lazy(() => import('./components/SettingsSection').then(m => ({ default: m.SettingsSection })));

const ProjectsPage = React.lazy(() => import('./components/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const SearchPage = React.lazy(() => import('./components/SearchPage').then(m => ({ default: m.SearchPage })));
const NotificationsPage = React.lazy(() => import('./components/NotificationsPage').then(m => ({ default: m.NotificationsPage })));

const PublicProfilePage = React.lazy(() => import('./components/PublicProfilePage').then(m => ({ default: m.PublicProfilePage })));
const ProfileCreationPage = React.lazy(() => import('./components/ProfileCreationPage').then(m => ({ default: m.ProfileCreationPage })));


export default function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024;
    }
    return false;
  });

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [activeTab, setActiveTab] = useState<ActiveTab>(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '') as ActiveTab;
      const validTabs: ActiveTab[] = [
        'prompt-mastery',
        'productivity-hub',
        'learner-space',
        'quizzes',
        'portfolio',
        'messages',
        'settings',
        'projects',
        'search',
        'notifications',
        'public-profile',
        'profile-creation',
        'user-preferences',
      ];
      if (validTabs.includes(hash)) return hash;
    }
    return 'prompt-mastery';
  });
  const [tabHistory, setTabHistory] = useState<ActiveTab[]>(['prompt-mastery']);
  const [activeModule, setActiveModule] = useState<Module | null>(null);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [certData, setCertData] = useState<{ courseTitle?: string; certificateId?: string; issueDate?: string } | null>(null);

  const handleOpenCertificate = (courseTitle?: string, certificateId?: string, issueDate?: string) => {
    if (courseTitle) {
      setCertData({ courseTitle, certificateId, issueDate });
    }
    setIsCertificateOpen(true);
  };
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [themeMode, setThemeMode] = useState<ThemeMode>(
    () => (localStorage.getItem('nexus_theme_mode') as ThemeMode) || 'default'
  );
  const [toasts, setToasts] = useState<Array<{ id: string; type: 'success' | 'error' | 'info'; message: string }>>([]);
  const [activeMasterclassModuleId, setActiveMasterclassModuleId] = useState<string | null>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<string>('ai-innovation');

  const [userState, setUserState] = useState<UserState>({
    completedModules: [],
    completedQuizzes: {},
    earnedBadges: [],
    totalPoints: 0,
    userName: 'Learner',
    activePlan: 'Basic',
  });

  const addToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const handleNavigateTab = React.useCallback((newTab: ActiveTab, pushState = true) => {
    setActiveTab(prevTab => {
      if (prevTab === newTab) return prevTab;
      setTabHistory(h => {
        if (h[h.length - 1] === newTab) return h;
        return [...h, newTab];
      });
      if (pushState && typeof window !== 'undefined') {
        window.history.pushState({ tab: newTab }, '', `#${newTab}`);
      }
      return newTab;
    });
  }, []);

  const getTabLabel = (tab: ActiveTab): string => {
    switch (tab) {
      case 'prompt-mastery': return 'Prompt Mastery';
      case 'productivity-hub': return 'AI Planner';
      case 'learner-space': return 'Community Space';
      case 'quizzes': return 'Quizzes';
      case 'portfolio': return 'Portfolio';
      case 'messages': return 'Messages';
      case 'settings': return 'Settings';
      case 'profile-creation': return 'Profile Setup';
      default: return 'Overview Dashboard';
    }
  };

  const handleBackNav = React.useCallback(() => {
    setTabHistory(prevHistory => {
      if (prevHistory.length > 1) {
        const updated = [...prevHistory];
        updated.pop();
        const prevTab = updated[updated.length - 1] || 'prompt-mastery';
        setActiveTab(prevTab);
        if (typeof window !== 'undefined') {
          window.history.pushState({ tab: prevTab }, '', `#${prevTab}`);
        }
        return updated;
      } else {
        setActiveTab('prompt-mastery');
        if (typeof window !== 'undefined') {
          window.history.pushState({ tab: 'prompt-mastery' }, '', '#prompt-mastery');
        }
        return ['prompt-mastery'];
      }
    });
  }, []);

  React.useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state && e.state.tab) {
        setActiveTab(e.state.tab as ActiveTab);
      } else {
        setActiveTab('prompt-mastery');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenModule = (moduleId: string) => {
    for (const track of TRACKS) {
      const found = track.modules.find(m => m.id === moduleId);
      if (found) {
        setActiveModule(found);
        setUserState(prev => ({
          ...prev,
          currentLessonId: found.id,
          lastAccessedModuleTitle: found.title,
          currentCourseId: track.id === 'aiTrack' ? 'ai-innovation' : 'fullstack-web'
        }));
        return;
      }
    }
  };

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourseId(courseId);
    setUserState(prev => ({
      ...prev,
      currentCourseId: courseId
    }));
    handleNavigateTab('portfolio');
  };

  const handleToggleModuleComplete = (moduleId: string) => {
    setUserState(prev => {
      const exists = prev.completedModules.includes(moduleId);
      const updatedModules = exists
        ? prev.completedModules.filter(id => id !== moduleId)
        : [...prev.completedModules, moduleId];

      const pointsDelta = exists ? -50 : 50;

      if (!exists) {
        addToast(`Module completed! +50 Points earned.`, 'success');
      }

      return {
        ...prev,
        completedModules: updatedModules,
        totalPoints: Math.max(0, prev.totalPoints + pointsDelta),
      };
    });
  };

  const handleCompleteQuiz = (quizId: string, score: number, badgeName: string) => {
    setUserState(prev => {
      const newBadges = prev.earnedBadges.includes(badgeName)
        ? prev.earnedBadges
        : [...prev.earnedBadges, badgeName];

      return {
        ...prev,
        completedQuizzes: { ...prev.completedQuizzes, [quizId]: score },
        earnedBadges: newBadges,
        totalPoints: prev.totalPoints + 100,
      };
    });
    addToast(`🎉 Quiz passed! Badge "${badgeName}" unlocked (+100 PTS)`, 'success');
  };

  // Check for 24-hour inactivity & suggest an uncompleted environmental AI module
  const checkInactivityAndSuggestModule = React.useCallback((forceTrigger = false) => {
    const lastActiveStr = localStorage.getItem('nexus_last_active');
    const now = Date.now();
    let triggerAlert = forceTrigger;

    if (lastActiveStr && !forceTrigger) {
      const lastActive = parseInt(lastActiveStr, 10);
      const hoursPassed = (now - lastActive) / (1000 * 60 * 60);
      if (hoursPassed >= 24) {
        triggerAlert = true;
      }
    } else if (!lastActiveStr && !forceTrigger) {
      localStorage.setItem('nexus_last_active', now.toString());
      return;
    }

    if (triggerAlert) {
      const envTrack = TRACKS.find(t => t.id === 'envTrack');
      const uncompletedModule = envTrack?.modules.find(
        m => !userState.completedModules.includes(m.id)
      ) || envTrack?.modules[0];

      if (uncompletedModule) {
        addToast(
          `🌱 Welcome back! 24+ hours of inactivity detected. Suggested Module: "${uncompletedModule.title}" to maintain your streak!`,
          'info'
        );
      } else {
        addToast(
          `🌱 Welcome back! 24+ hours of inactivity detected. Keep your environmental AI learning streak strong!`,
          'info'
        );
      }
      localStorage.setItem('nexus_last_active', now.toString());
    }
  }, [userState.completedModules]);

  React.useEffect(() => {
    checkInactivityAndSuggestModule(false);
  }, [checkInactivityAndSuggestModule]);

  return (
    <div className={`min-h-screen ${themeMode === 'white' ? 'bg-slate-50 text-slate-900' : 'bg-[#080d1a] text-slate-100'} font-sans relative`}>
      <ParticleBackground />

      {/* Toast Notifications */}
      <Toast notifications={toasts} onDismiss={removeToast} />

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={handleNavigateTab}
        userState={userState}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onHelpCenter={() => handleNavigateTab('messages')}
      />

      {/* Main Content Area */}
      <main className={`transition-all duration-300 ${isSidebarCollapsed ? 'md:pl-20' : 'md:pl-64'} pt-6 sm:pt-8 pb-20 md:pb-12 min-h-screen px-4 sm:px-8 max-w-7xl mx-auto`}>
        {/* Back Navigation Button */}
        {tabHistory.length > 1 && (
          <BackButton onBack={handleBackNav} />
        )}

        {/* Tab Title Banner */}
        <div className="mb-6 flex items-center justify-between border-b border-[#1e2d4a] pb-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase font-bold">
              Platform Module
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              {getTabLabel(activeTab)}
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#10192d] hover:bg-[#182542] border border-[#1e2d4a] text-xs font-semibold text-gray-300 transition-all cursor-pointer"
            >
              <span>Search</span>
              <span className="px-1.5 py-0.5 rounded bg-[#080d1a] text-[10px] text-gray-400 font-mono">ctrl+K</span>
            </button>
          </div>
        </div>

        <div className="w-full">
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            {/* PROJECTS CATALOG VIEW (INTEGRATED INTO PORTFOLIO) */}
            {activeTab === 'projects' && (
              <PortfolioSection
                userState={userState}
                setActiveTab={handleNavigateTab}
                onOpenCertificate={handleOpenCertificate}
                onSendToast={addToast}
                onOpenModule={handleOpenModule}
              />
            )}

            {/* PROMPT MASTERY VIEW */}
            {activeTab === 'prompt-mastery' && (
              <PromptMasterySection
                userState={userState}
                onSendToast={addToast}
              />
            )}

            {/* PRODUCTIVITY HUB VIEW */}
            {activeTab === 'productivity-hub' && (
              <ProductivityHubSection
                userState={userState}
                onSendToast={addToast}
              />
            )}

            {/* LEARNER SPACE & COMMUNITY VIEW */}
            {activeTab === 'learner-space' && (
              <LearnerSpaceSection
                onSendToast={addToast}
              />
            )}

            {/* QUIZZES TAB */}
            {activeTab === 'quizzes' && (
              <QuizSection
                completedQuizzes={userState.completedQuizzes}
                onCompleteQuiz={handleCompleteQuiz}
              />
            )}

            {/* PORTFOLIO TAB */}
            {activeTab === 'portfolio' && (
              <PortfolioSection
                userState={userState}
                setActiveTab={handleNavigateTab}
                onOpenCertificate={handleOpenCertificate}
                onSendToast={addToast}
                onOpenModule={handleOpenModule}
              />
            )}

            {/* MESSAGES TAB */}
            {activeTab === 'messages' && (
              <MessagesSection
                userState={userState}
                onSendToast={addToast}
              />
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <SettingsSection
                userState={userState}
                onSendToast={addToast}
                onNavigateTab={handleNavigateTab}
              />
            )}

            {activeTab === 'search' && (
              <SearchPage
                onNavigateTab={handleNavigateTab}
                onSendToast={addToast}
              />
            )}

            {activeTab === 'notifications' && (
              <NotificationsPage
                onNavigateTab={handleNavigateTab}
                onSendToast={addToast}
              />
            )}

            {activeTab === 'user-preferences' && (
              <SettingsSection
                userState={userState}
                onSendToast={addToast}
                onNavigateTab={handleNavigateTab}
              />
            )}

            {activeTab === 'public-profile' && (
              <PublicProfilePage
                userState={userState}
                onNavigateTab={handleNavigateTab}
                onSendToast={addToast}
              />
            )}

            {activeTab === 'profile-creation' && (
              <ProfileCreationPage
                userState={userState}
                onNavigateTab={handleNavigateTab}
                onSendToast={addToast}
                onUpdateUserState={(updates) => setUserState(prev => ({ ...prev, ...updates }))}
              />
            )}
          </Suspense>
        </ErrorBoundary>
        </div>
      </main>

      {/* Module Viewer Modal */}
      <ModuleViewerModal
        module={activeModule}
        isCompleted={activeModule ? userState.completedModules.includes(activeModule.id) : false}
        onClose={() => setActiveModule(null)}
        onToggleComplete={handleToggleModuleComplete}
      />

      {/* Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        userState={userState}
        onClose={() => setIsCertificateOpen(false)}
        courseTitle={certData?.courseTitle}
        certificateId={certData?.certificateId}
        issueDate={certData?.issueDate}
      />

      {/* User Profile Drawer/Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        userState={userState}
        onClose={() => setIsProfileModalOpen(false)}
        onOpenCertificate={() => {
          setIsProfileModalOpen(false);
          setIsCertificateOpen(true);
        }}
        onSendToast={addToast}
        setActiveTab={handleNavigateTab}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        themeMode={themeMode}
        onSelectTheme={(mode) => {
          setThemeMode(mode);
          localStorage.setItem('nexus_theme_mode', mode);
          addToast(`Theme switched to ${mode} mode`, 'info');
        }}
      />

      {/* Global Search Modal */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onOpenModule={(modId) => {
          handleOpenModule(modId);
          setIsSearchOpen(false);
        }}
        setActiveTab={(tab) => {
          handleNavigateTab(tab);
          setIsSearchOpen(false);
        }}
      />

      {/* Notifications Drawer Modal */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* Mobile Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={handleNavigateTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
      />
    </div>
  );
}
