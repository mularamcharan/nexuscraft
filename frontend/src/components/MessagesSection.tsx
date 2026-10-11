import React, { useState } from 'react';
import { getLearningHints } from '@/api-client';
import { 
  MessageSquare, 
  Send, 
  User, 
  Sparkles, 
  Search, 
  Bot, 
  Users, 
  Megaphone, 
  Bell, 
  Mail, 
  Plus, 
  Check, 
  CheckCircle2, 
  Clock, 
  Paperclip, 
  Smile, 
  Filter, 
  X, 
  AtSign, 
  ShieldCheck, 
  Award, 
  BookOpen, 
  Calendar, 
  Trash2, 
  CheckCheck,
  ChevronRight,
  ExternalLink,
  ThumbsUp,
  Share2
} from 'lucide-react';
import { UserState } from '../types';

export type MessagesSubTab = 'ai-chat' | 'community-chat' | 'announcements' | 'notifications' | 'email-alerts';

interface MessagesSectionProps {
  userState: UserState;
  onSendToast?: (msg: string, type?: 'success' | 'error' | 'info') => void;
  initialSubTab?: MessagesSubTab;
}

export const MessagesSection: React.FC<MessagesSectionProps> = ({ 
  userState, 
  onSendToast,
  initialSubTab = 'ai-chat'
}) => {
  const [activeSubTab, setActiveSubTab] = useState<MessagesSubTab>(initialSubTab);

  // ==========================================
  // 111. AI CHAT STATE
  // ==========================================
  const [conversations, setConversations] = useState([
    { id: '1', title: 'Python Data Structures', lastMsg: 'Explain lists and tuples in Python...', time: '10:20 AM', unread: 0 },
    { id: '2', title: 'React Project Help', lastMsg: 'How to pass props in React?', time: '2 min ago', unread: 1 },
    { id: '3', title: 'Machine Learning Basics', lastMsg: 'What is overfitting in ML?', time: '1 hr ago', unread: 0 },
    { id: '4', title: 'SQL Query', lastMsg: 'How to join two tables in SQL?', time: 'Yesterday', unread: 0 },
    { id: '5', title: 'Time Complexity', lastMsg: 'Explain Big O notation', time: 'Yesterday', unread: 0 },
  ]);

  const [activeAiConvId, setActiveAiConvId] = useState<string>('1');

  const [aiMessagesMap, setAiMessagesMap] = useState<Record<string, Array<{ sender: 'user' | 'ai'; text: string; time: string }>>>({
    '1': [
      {
        sender: 'user',
        text: 'Explain lists and tuples in Python with examples.',
        time: '10:20 AM'
      },
      {
        sender: 'ai',
        text: 'Start by comparing whether each collection is meant to change after it is created. What would that mean for choosing between the two?',
        time: '10:20 AM'
      }
    ],
    '2': [
      { sender: 'user', text: 'How do I pass props in React components?', time: '10:15 AM' },
      { sender: 'ai', text: 'Trace how data should move from a parent component to its child. Which part of that relationship should own the value?', time: '10:16 AM' }
    ],
    '3': [
      { sender: 'user', text: 'What is overfitting in Machine Learning?', time: '9:00 AM' },
      { sender: 'ai', text: 'Compare performance on training data with performance on data the model has not seen. What pattern might suggest it learned too much from its examples?', time: '9:01 AM' }
    ],
    '4': [
      { sender: 'user', text: 'How do I write an INNER JOIN query in SQL?', time: 'Yesterday' },
      { sender: 'ai', text: 'Identify which columns represent the same entity in each table. Should rows without a matching key be included?', time: 'Yesterday' }
    ],
    '5': [
      { sender: 'user', text: 'What is Big O notation?', time: 'Yesterday' },
      { sender: 'ai', text: 'Focus on how the amount of work changes as input grows. What part of the algorithm repeats, and how often?', time: 'Yesterday' }
    ]
  });

  const [inputAiMsg, setInputAiMsg] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [aiErrors, setAiErrors] = useState<Record<string, string>>({});

  const handleSendAiMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputAiMsg.trim() || isAiThinking) return;

    const userText = inputAiMsg.trim();
    const conversationId = activeAiConvId;
    const conversationHistory = aiMessagesMap[conversationId] || [];
    const timeNow = 'Just now';

    // Add user message
    setAiMessagesMap(prev => ({
      ...prev,
      [conversationId]: [
        ...(prev[conversationId] || []),
        { sender: 'user', text: userText, time: timeNow }
      ]
    }));

    setInputAiMsg('');
    setIsAiThinking(true);
    setAiErrors(prev => ({ ...prev, [conversationId]: '' }));
    try {
      const context = [...conversationHistory, { sender: 'user' as const, text: userText, time: timeNow }]
        .slice(-8)
        .map(message => `${message.sender === 'user' ? 'Learner' : 'Coach'}: ${message.text}`)
        .join('\n')
        .slice(-3900);
      const coaching = await getLearningHints({
        role: 'Patient learning coach',
        outputFormat: 'Progressive conceptual hints and reflection question only; no completed solution',
        temperature: 0.4,
        learnerDraft: context
      });
      const aiReply = [
        ...coaching.strengths.map(strength => `What you have: ${strength}`),
        ...coaching.hints.map((hint, index) => `Hint ${index + 1}: ${hint}`),
        `Reflect: ${coaching.reflectionQuestion}`
      ].join('\n\n');
      setAiMessagesMap(prev => ({
        ...prev,
        [conversationId]: [
          ...(prev[conversationId] || []),
          { sender: 'ai', text: aiReply, time: 'Just now' }
        ]
      }));
      onSendToast?.('Learning hints are ready.', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'The learning coach could not respond.';
      setAiErrors(prev => ({ ...prev, [conversationId]: message }));
      onSendToast?.(message, 'error');
    } finally {
      setIsAiThinking(false);
    }
  };

  const handleCreateNewAiChat = () => {
    const newId = (conversations.length + 1).toString();
    const newTitle = `New Conversation #${newId}`;
    setConversations(prev => [
      { id: newId, title: newTitle, lastMsg: 'Ask anything...', time: 'Just now', unread: 0 },
      ...prev
    ]);
    setAiMessagesMap(prev => ({
      ...prev,
      [newId]: [
        { sender: 'ai', text: 'I can help you think through a concept with hints and questions. What are you working on?', time: 'Just now' }
      ]
    }));
    setActiveAiConvId(newId);
    if (onSendToast) onSendToast('Started new AI Chat!', 'success');
  };

  // ==========================================
  // 112. COMMUNITY CHAT STATE
  // ==========================================
  const [searchRoomQuery, setSearchRoomQuery] = useState('');
  const [rooms, setRooms] = useState([
    { id: '1', name: 'General Discussion', onlineCount: 128 },
    { id: '2', name: 'Python Learners', onlineCount: 85 },
    { id: '3', name: 'Web Development', onlineCount: 110 },
    { id: '4', name: 'AI & ML Enthusiasts', onlineCount: 87 },
    { id: '5', name: 'Project Collaboration', onlineCount: 72 },
    { id: '6', name: 'Interview Prep', onlineCount: 60 },
    { id: '7', name: 'Random Chat', onlineCount: 45 },
  ]);

  const [activeRoomId, setActiveRoomId] = useState<string>('1');

  const [roomMessagesMap, setRoomMessagesMap] = useState<Record<string, Array<{ id: string; sender: string; text: string; time: string; avatarBg: string }>>>({
    '1': [
      { id: 'm1', sender: 'Ananya Sharma', text: 'Hey everyone! What are you learning today?', time: '10:20 AM', avatarBg: 'from-pink-500 to-rose-600' },
      { id: 'm2', sender: 'Rohit Verma', text: 'Working on my React project! 🚀', time: '10:21 AM', avatarBg: 'from-blue-500 to-indigo-600' },
      { id: 'm3', sender: 'Priya Nair', text: 'I just completed the Python course! 🎉', time: '10:22 AM', avatarBg: 'from-emerald-500 to-teal-600' },
      { id: 'm4', sender: 'Sathwik Sai Varma', text: "That's awesome Priya! Any tips for beginners?", time: '10:23 AM', avatarBg: 'from-cyan-500 to-blue-600' },
      { id: 'm5', sender: 'Priya Nair', text: "Consistency and practical! Don't skip the projects.", time: '10:24 AM', avatarBg: 'from-emerald-500 to-teal-600' },
      { id: 'm6', sender: 'Arjun Mehta', text: 'Anyone up for a study group on DSA?', time: '10:24 AM', avatarBg: 'from-amber-500 to-orange-600' },
      { id: 'm7', sender: 'Sathwik Sai Varma', text: 'Count me in! ✋', time: '10:25 AM', avatarBg: 'from-cyan-500 to-blue-600' },
    ],
    '2': [
      { id: 'm21', sender: 'Dr. Vance', text: 'Welcome Python learners! Feel free to drop questions about decorators or generator expressions.', time: '9:00 AM', avatarBg: 'from-purple-500 to-indigo-600' },
      { id: 'm22', sender: 'Ananya Sharma', text: 'Can someone explain dictionary comprehensions with an example?', time: '9:15 AM', avatarBg: 'from-pink-500 to-rose-600' }
    ]
  });

  const [inputCommunityMsg, setInputCommunityMsg] = useState('');
  const [isCreateRoomModalOpen, setIsCreateRoomModalOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState('');

  const handleSendCommunityMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCommunityMsg.trim()) return;

    const newMsg = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      sender: userState.userName || 'Sathwik Sai Varma',
      text: inputCommunityMsg.trim(),
      time: 'Just now',
      avatarBg: 'from-cyan-500 to-blue-600'
    };

    setRoomMessagesMap(prev => ({
      ...prev,
      [activeRoomId]: [...(prev[activeRoomId] || []), newMsg]
    }));

    setInputCommunityMsg('');
    if (onSendToast) onSendToast('Message sent to room!', 'success');
  };

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoomName.trim()) return;

    const newRoomId = (rooms.length + 1).toString();
    const createdRoom = {
      id: newRoomId,
      name: newRoomName.trim(),
      onlineCount: 1
    };

    setRooms(prev => [...prev, createdRoom]);
    setRoomMessagesMap(prev => ({
      ...prev,
      [newRoomId]: [
        {
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          sender: 'System',
          text: `Room "${newRoomName.trim()}" created! Welcome all members.`,
          time: 'Just now',
          avatarBg: 'from-purple-500 to-indigo-600'
        }
      ]
    }));

    setActiveRoomId(newRoomId);
    setNewRoomName('');
    setIsCreateRoomModalOpen(false);
    if (onSendToast) onSendToast(`Created Chat Room "${createdRoom.name}"!`, 'success');
  };

  // Filtered rooms
  const filteredRooms = rooms.filter(r => 
    r.name.toLowerCase().includes(searchRoomQuery.toLowerCase())
  );

  // ==========================================
  // 113. ANNOUNCEMENTS STATE
  // ==========================================
  const [announcementsFilter, setAnnouncementsFilter] = useState<'All' | 'Updates' | 'Events' | 'Maintenance'>('All');
  const [isNewAnnouncementModalOpen, setIsNewAnnouncementModalOpen] = useState(false);
  const [newAnnTitle, setNewAnnTitle] = useState('');
  const [newAnnDesc, setNewAnnDesc] = useState('');
  const [newAnnCategory, setNewAnnCategory] = useState<'Course' | 'Event' | 'Maintenance' | 'Update'>('Course');

  const [announcementsList, setAnnouncementsList] = useState([
    {
      id: 'a1',
      title: 'New Course Launch: Full Stack Web Development',
      description: 'We are excited to announce our new course on Full Stack Web Development. Enroll now and start your journey!',
      date: 'May 15, 2025',
      category: 'Course',
      type: 'Updates',
      badgeColor: 'bg-blue-600/30 text-blue-300 border-blue-500/40'
    },
    {
      id: 'a2',
      title: 'NexusCraft Hackathon 2025',
      description: 'Join our biggest hackathon and showcase your skills. Exciting prizes await the winners!',
      date: 'May 12, 2025',
      category: 'Event',
      type: 'Events',
      badgeColor: 'bg-purple-600/30 text-purple-300 border-purple-500/40'
    },
    {
      id: 'a3',
      title: 'Platform Maintenance',
      description: 'We will be performing scheduled maintenance on May 18, 2025 from 2:00 AM to 4:00 AM. Thank you for your patience.',
      date: 'May 10, 2025',
      category: 'Maintenance',
      type: 'Maintenance',
      badgeColor: 'bg-amber-600/30 text-amber-300 border-amber-500/40'
    },
    {
      id: 'a4',
      title: 'New Learning Path: AI & Machine Learning',
      description: 'Explore our new AI & Machine Learning learning path with hands-on projects and real-world applications.',
      date: 'May 8, 2025',
      category: 'Update',
      type: 'Updates',
      badgeColor: 'bg-cyan-600/30 text-cyan-300 border-cyan-500/40'
    }
  ]);

  const filteredAnnouncements = announcementsList.filter(item => {
    if (announcementsFilter === 'All') return true;
    return item.type === announcementsFilter;
  });

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAnnTitle.trim() || !newAnnDesc.trim()) return;

    let typeStr: 'Updates' | 'Events' | 'Maintenance' = 'Updates';
    let colorStr = 'bg-cyan-600/30 text-cyan-300 border-cyan-500/40';

    if (newAnnCategory === 'Event') {
      typeStr = 'Events';
      colorStr = 'bg-purple-600/30 text-purple-300 border-purple-500/40';
    } else if (newAnnCategory === 'Maintenance') {
      typeStr = 'Maintenance';
      colorStr = 'bg-amber-600/30 text-amber-300 border-amber-500/40';
    } else if (newAnnCategory === 'Course') {
      typeStr = 'Updates';
      colorStr = 'bg-blue-600/30 text-blue-300 border-blue-500/40';
    }

    const newItem = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      title: newAnnTitle.trim(),
      description: newAnnDesc.trim(),
      date: 'May 16, 2025',
      category: newAnnCategory,
      type: typeStr,
      badgeColor: colorStr
    };

    setAnnouncementsList(prev => [newItem, ...prev]);
    setNewAnnTitle('');
    setNewAnnDesc('');
    setIsNewAnnouncementModalOpen(false);
    if (onSendToast) onSendToast('Announcement published successfully!', 'success');
  };

  // ==========================================
  // 114. NOTIFICATIONS STATE
  // ==========================================
  const [notifReadFilter, setNotifReadFilter] = useState<'All' | 'Unread' | 'Read'>('All');
  const [notifTypeFilter, setNotifTypeFilter] = useState<string>('All Types');

  const [notifications, setNotifications] = useState([
    { id: 'n1', title: 'Course Completed', desc: 'Congratulations! You have completed "Python for Beginners"', time: '2 min ago', read: false, type: 'Courses', icon: 'course' },
    { id: 'n2', title: 'New Assignment', desc: 'New assignment "Data Structures Problem Set" is available', time: '15 min ago', read: false, type: 'Assignments', icon: 'assignment' },
    { id: 'n3', title: 'Community Reply', desc: 'Ananya Sharma replied to your post in "Python Learners"', time: '1 hr ago', read: true, type: 'Community', icon: 'reply' },
    { id: 'n4', title: 'Achievement Unlocked', desc: 'You unlocked the "Consistent Learner" badge', time: '2 hrs ago', read: false, type: 'Achievements', icon: 'achievement' },
    { id: 'n5', title: 'New Announcement', desc: 'New course "Full Stack Web Development" is now available', time: '3 hrs ago', read: true, type: 'System', icon: 'announcement' },
    { id: 'n6', title: 'Reminder', desc: "Don't forget to complete your daily learning goal!", time: '5 hrs ago', read: false, type: 'Reminders', icon: 'reminder' },
    { id: 'n7', title: 'Mentor Message', desc: 'Rohit Verma sent you a message', time: '1 day ago', read: true, type: 'Community', icon: 'message' },
    { id: 'n8', title: 'Event Reminder', desc: 'Hackathon 2025 starts in 3 days', time: '1 day ago', read: false, type: 'Reminders', icon: 'event' },
  ]);

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    if (onSendToast) onSendToast('All notifications marked as read!', 'success');
  };

  const handleToggleSingleRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  const filteredNotifications = notifications.filter(n => {
    if (notifReadFilter === 'Unread' && n.read) return false;
    if (notifReadFilter === 'Read' && !n.read) return false;
    if (notifTypeFilter !== 'All Types' && n.type !== notifTypeFilter) return false;
    return true;
  });

  // ==========================================
  // 115. EMAIL ALERTS STATE
  // ==========================================
  const [emailPrefs, setEmailPrefs] = useState({
    courseUpdates: true,
    assignments: true,
    announcements: true,
    communityActivity: true,
    achievements: true,
    marketingUpdates: false,
    weeklySummary: true,
  });

  const [userEmail, setUserEmail] = useState('sathwik.saivarma@example.com');
  const [isChangeEmailOpen, setIsChangeEmailOpen] = useState(false);
  const [tempEmailInput, setTempEmailInput] = useState(userEmail);

  const handleTogglePref = (key: keyof typeof emailPrefs) => {
    setEmailPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveEmailPreferences = () => {
    if (onSendToast) onSendToast('Email notification preferences saved successfully!', 'success');
  };

  const handleSaveEmailAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempEmailInput.trim() || !tempEmailInput.includes('@')) {
      if (onSendToast) onSendToast('Please enter a valid email address.', 'error');
      return;
    }
    setUserEmail(tempEmailInput.trim());
    setIsChangeEmailOpen(false);
    if (onSendToast) onSendToast(`Email updated to ${tempEmailInput.trim()}!`, 'success');
  };

  // Helper function for notification icons
  const renderNotifIcon = (iconType: string) => {
    switch (iconType) {
      case 'course': return <BookOpen className="w-4 h-4 text-cyan-400" />;
      case 'assignment': return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
      case 'reply': return <MessageSquare className="w-4 h-4 text-purple-400" />;
      case 'achievement': return <Award className="w-4 h-4 text-amber-400" />;
      case 'announcement': return <Megaphone className="w-4 h-4 text-indigo-400" />;
      case 'reminder': return <Clock className="w-4 h-4 text-rose-400" />;
      case 'message': return <Mail className="w-4 h-4 text-blue-400" />;
      case 'event': return <Calendar className="w-4 h-4 text-pink-400" />;
      default: return <Bell className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      
      {/* SECONDARY TOP SUB-NAV BAR FOR MESSAGES MODULE */}
      <div className="bg-[#0b1222] border border-gray-800/90 rounded-2xl p-2 sm:p-3 shadow-xl backdrop-blur-md flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
        {[
          { id: 'ai-chat' as MessagesSubTab, label: 'AI Chat', icon: Bot, badge: 'AI' },
          { id: 'community-chat' as MessagesSubTab, label: 'Community Chat', icon: Users, badge: 'Live' },
          { id: 'announcements' as MessagesSubTab, label: 'Announcements', icon: Megaphone, badge: announcementsList.length },
          { id: 'notifications' as MessagesSubTab, label: 'Notifications', icon: Bell, badge: notifications.filter(n => !n.read).length },
          { id: 'email-alerts' as MessagesSubTab, label: 'Email Alerts', icon: Mail },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-3.5 py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap flex-shrink-0 ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 text-white shadow-lg shadow-cyan-950/50 ring-1 ring-cyan-400/50'
                  : 'bg-[#0f172a] text-gray-400 hover:text-white hover:bg-[#131f3b]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
              <span>{tab.label}</span>
              {tab.badge !== undefined && tab.badge !== 0 && (
                <span className={`px-1.5 py-0.2 text-[9px] font-black rounded-full ${
                  isActive ? 'bg-white text-black' : 'bg-cyan-950/80 text-cyan-300 border border-cyan-800'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* 111. AI CHAT SCREEN */}
      {/* ========================================================================= */}
      {activeSubTab === 'ai-chat' && (
        <div className="space-y-4">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0b1222] border border-gray-800/90 rounded-2xl p-5">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Bot className="w-6 h-6 text-purple-400" />
                <span>AI Chat</span>
              </h1>
              <p className="text-xs text-gray-400">Your personal AI learning assistant</p>
            </div>
            <button
              onClick={handleCreateNewAiChat}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>New Chat</span>
            </button>
          </div>

          {/* Chat Split Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-[#0b1222] border border-gray-800/90 rounded-3xl p-4 sm:p-6 min-h-[520px]">
            
            {/* Left Conversations List */}
            <div className="md:col-span-4 border-r-0 md:border-r border-gray-800/80 pr-0 md:pr-4 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 block px-1">
                  Conversations
                </span>

                <div className="space-y-1.5 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                  {conversations.map((conv) => {
                    const isSelected = activeAiConvId === conv.id;
                    return (
                      <button
                        key={conv.id}
                        onClick={() => setActiveAiConvId(conv.id)}
                        className={`w-full p-3 rounded-2xl text-left transition-all cursor-pointer block border ${
                          isSelected
                            ? 'bg-[#131d36] border-purple-500/60 text-white shadow-md shadow-purple-950/30'
                            : 'bg-[#0f172a] border-gray-800/80 text-gray-300 hover:bg-[#121c33]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold truncate pr-2">{conv.title}</span>
                          <span className="text-[9px] text-gray-400 flex-shrink-0">{conv.time}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 truncate">{conv.lastMsg}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => { if (onSendToast) onSendToast('Viewing all conversations archive...', 'info'); }}
                className="w-full text-center text-xs font-bold text-purple-400 hover:text-purple-300 py-2 cursor-pointer border-t border-gray-800/80"
              >
                View all conversations
              </button>
            </div>

            {/* Right Chat Thread */}
            <div className="md:col-span-8 flex flex-col justify-between pl-0 md:pl-2 pt-4 md:pt-0">
              
              {/* Chat Thread Header */}
              <div className="border-b border-gray-800/80 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-black text-white">
                    {conversations.find(c => c.id === activeAiConvId)?.title || 'AI Chat'}
                  </h2>
                  <span className="text-[10px] text-purple-400 font-semibold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>OpenRouter-powered hint-first tutor</span>
                  </span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 py-4 space-y-3.5 overflow-y-auto max-h-[360px] custom-scrollbar pr-1">
                {(aiMessagesMap[activeAiConvId] || []).map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-lg p-4 rounded-2xl text-xs space-y-1 shadow-lg ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-none'
                        : 'bg-[#0f172a] text-gray-200 border border-gray-800 rounded-bl-none'
                    }`}>
                      {msg.sender === 'ai' && (
                        <div className="flex items-center gap-1.5 text-purple-400 font-bold text-[10px] pb-1 border-b border-gray-800/60 mb-2">
                          <Bot className="w-3.5 h-3.5" />
                          <span>AI Assistant</span>
                        </div>
                      )}
                      <div className="whitespace-pre-line leading-relaxed font-sans">
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-gray-400 block text-right pt-1">{msg.time}</span>
                    </div>
                  </div>
                ))}

                {isAiThinking && (
                  <div className="flex justify-start">
                    <div className="p-3 rounded-2xl bg-[#0f172a] border border-gray-800 text-xs text-purple-300 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 animate-spin text-purple-400" />
                      <span>AI Assistant is analyzing & crafting response...</span>
                    </div>
                  </div>
                )}
              </div>

              {aiErrors[activeAiConvId] && (
                <p role="alert" className="mb-2 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-200">
                  {aiErrors[activeAiConvId]}
                </p>
              )}

              {/* Chat Input Bar */}
              <form onSubmit={handleSendAiMessage} className="pt-3 border-t border-gray-800 flex items-center gap-2">
                <input
                  type="text"
                  value={inputAiMsg}
                  onChange={e => setInputAiMsg(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/80 transition-all"
                />
                <button
                  type="submit"
                  disabled={isAiThinking || !inputAiMsg.trim()}
                  className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 112. COMMUNITY CHAT SCREEN */}
      {/* ========================================================================= */}
      {activeSubTab === 'community-chat' && (
        <div className="space-y-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0b1222] border border-gray-800/90 rounded-2xl p-5">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Users className="w-6 h-6 text-cyan-400" />
                <span>Community Chat</span>
              </h1>
              <p className="text-xs text-gray-400">Connect and chat with learners.</p>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchRoomQuery}
                  onChange={e => setSearchRoomQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl bg-[#0f172a] border border-gray-800 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/50 w-36 sm:w-48"
                />
              </div>
              <button
                onClick={() => setIsCreateRoomModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Room</span>
              </button>
            </div>
          </div>

          {/* Rooms & Messages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 bg-[#0b1222] border border-gray-800/90 rounded-3xl p-4 sm:p-6 min-h-[520px]">
            
            {/* Left Chat Rooms Sidebar */}
            <div className="md:col-span-4 border-r-0 md:border-r border-gray-800/80 pr-0 md:pr-4 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400 block px-1">
                  Chat Rooms
                </span>

                <div className="space-y-1.5 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
                  {filteredRooms.map((room) => {
                    const isSelected = activeRoomId === room.id;
                    return (
                      <button
                        key={room.id}
                        onClick={() => setActiveRoomId(room.id)}
                        className={`w-full p-3 rounded-2xl text-left transition-all cursor-pointer flex items-center justify-between border ${
                          isSelected
                            ? 'bg-[#122238] border-cyan-500/60 text-white shadow-md'
                            : 'bg-[#0f172a] border-gray-800/80 text-gray-300 hover:bg-[#121c33]'
                        }`}
                      >
                        <div className="truncate pr-2">
                          <span className="text-xs font-bold block truncate">{room.name}</span>
                          <span className="text-[10px] text-gray-400 block">{room.onlineCount} online</span>
                        </div>
                        <span className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => setIsCreateRoomModalOpen(true)}
                className="w-full py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-cyan-400 font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Create Room</span>
              </button>
            </div>

            {/* Right Chat Room Active Conversation */}
            <div className="md:col-span-8 flex flex-col justify-between pl-0 md:pl-2 pt-4 md:pt-0">
              
              {/* Room Header */}
              <div className="border-b border-gray-800/80 pb-3 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-black text-white">
                    {rooms.find(r => r.id === activeRoomId)?.name || 'General Discussion'}
                  </h2>
                  <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{rooms.find(r => r.id === activeRoomId)?.onlineCount || 128} members online</span>
                  </span>
                </div>
              </div>

              {/* Message Feed */}
              <div className="flex-1 py-4 space-y-3 overflow-y-auto max-h-[360px] custom-scrollbar pr-1">
                {(roomMessagesMap[activeRoomId] || []).map((msg) => (
                  <div key={msg.id} className="flex items-start gap-2.5">
                    <div className={`w-7 h-7 rounded-full bg-gradient-to-r ${msg.avatarBg} text-white font-black text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5 shadow`}>
                      {msg.sender.charAt(0)}
                    </div>
                    <div className="bg-[#0f172a] border border-gray-800 rounded-2xl p-3 max-w-md space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{msg.sender}</span>
                        <span className="text-[9px] text-gray-500">{msg.time}</span>
                      </div>
                      <p className="text-xs text-gray-300 leading-normal">{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendCommunityMessage} className="pt-3 border-t border-gray-800 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => { if (onSendToast) onSendToast('Attachment feature ready', 'info'); }}
                  className="p-2.5 rounded-xl bg-[#0f172a] border border-gray-800 text-gray-400 hover:text-white cursor-pointer"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                <input
                  type="text"
                  value={inputCommunityMsg}
                  onChange={e => setInputCommunityMsg(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500/80 transition-all"
                />
                <button
                  type="submit"
                  className="p-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white shadow-md transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 113. ANNOUNCEMENTS SCREEN */}
      {/* ========================================================================= */}
      {activeSubTab === 'announcements' && (
        <div className="space-y-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0b1222] border border-gray-800/90 rounded-2xl p-5">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Megaphone className="w-6 h-6 text-indigo-400" />
                <span>Announcements</span>
              </h1>
              <p className="text-xs text-gray-400">Stay updated with the latest news</p>
            </div>
            <button
              onClick={() => setIsNewAnnouncementModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-lg transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>New Announcement</span>
            </button>
          </div>

          {/* Filter Bar */}
          <div className="flex items-center gap-2 border-b border-gray-800/80 pb-3">
            {(['All', 'Updates', 'Events', 'Maintenance'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setAnnouncementsFilter(filter)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  announcementsFilter === filter
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-[#0f172a] text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Announcements List */}
          <div className="space-y-3">
            {filteredAnnouncements.map((item) => (
              <div
                key={item.id}
                className="bg-[#0b1222] border border-gray-800/90 hover:border-indigo-500/40 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-md group"
              >
                <div className="space-y-1.5 max-w-3xl">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                      {item.title}
                    </h2>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${item.badgeColor}`}>
                      {item.category}
                    </span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                  <span className="text-[10px] text-gray-500 block pt-1">
                    {item.date}
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => { if (onSendToast) onSendToast(`Saved announcement "${item.title}" to bookmarks`, 'info'); }}
                    className="p-2 rounded-xl bg-[#0f172a] border border-gray-800 text-gray-400 hover:text-white cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center pt-2">
            <button
              onClick={() => { if (onSendToast) onSendToast('All current announcements loaded', 'info'); }}
              className="px-6 py-2.5 rounded-xl bg-[#0f172a] border border-gray-800 hover:border-indigo-500/40 text-xs font-bold text-gray-300 hover:text-white transition-all cursor-pointer shadow"
            >
              Load More
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 114. NOTIFICATIONS SCREEN */}
      {/* ========================================================================= */}
      {activeSubTab === 'notifications' && (
        <div className="space-y-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0b1222] border border-gray-800/90 rounded-2xl p-5">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <Bell className="w-6 h-6 text-amber-400" />
                <span>Notifications</span>
              </h1>
              <p className="text-xs text-gray-400">All your notifications in one place</p>
            </div>
            <button
              onClick={handleMarkAllRead}
              className="px-3.5 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-xs font-bold text-gray-200 transition-all cursor-pointer self-start sm:self-auto"
            >
              Mark all as read
            </button>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-800/80 pb-3">
            <div className="flex items-center gap-2">
              {(['All', 'Unread', 'Read'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setNotifReadFilter(tab)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    notifReadFilter === tab
                      ? 'bg-amber-600 text-white shadow'
                      : 'bg-[#0f172a] text-gray-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={notifTypeFilter}
                onChange={e => setNotifTypeFilter(e.target.value)}
                className="bg-[#0f172a] border border-gray-800 rounded-xl px-3 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-amber-500/50 cursor-pointer"
              >
                <option value="All Types">All Types</option>
                <option value="Courses">Courses</option>
                <option value="Assignments">Assignments</option>
                <option value="Community">Community</option>
                <option value="Achievements">Achievements</option>
                <option value="Reminders">Reminders</option>
              </select>
            </div>
          </div>

          {/* Notifications Items Stack */}
          <div className="space-y-2">
            {filteredNotifications.length === 0 ? (
              <div className="p-8 text-center bg-[#0b1222] border border-gray-800/90 rounded-2xl text-xs text-gray-400">
                No notifications match your filter criteria.
              </div>
            ) : (
              filteredNotifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleToggleSingleRead(n.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                    !n.read
                      ? 'bg-[#121a2e] border-amber-500/40 shadow-md'
                      : 'bg-[#0b1222] border-gray-800/80 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2.5 rounded-xl bg-[#0f172a] border border-gray-800 flex-shrink-0">
                      {renderNotifIcon(n.icon)}
                    </div>
                    <div className="truncate">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white truncate">{n.title}</span>
                        {!n.read && (
                          <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-gray-400 truncate">{n.desc}</p>
                    </div>
                  </div>

                  <span className="text-[10px] text-gray-500 flex-shrink-0">{n.time}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 115. EMAIL ALERTS SCREEN */}
      {/* ========================================================================= */}
      {activeSubTab === 'email-alerts' && (
        <div className="space-y-4">
          {/* Header */}
          <div className="bg-[#0b1222] border border-gray-800/90 rounded-2xl p-5">
            <h1 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              <Mail className="w-6 h-6 text-purple-400" />
              <span>Email Alerts</span>
            </h1>
            <p className="text-xs text-gray-400">Manage your email notification preferences</p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left Preferences Toggles List */}
            <div className="lg:col-span-7 bg-[#0b1222] border border-gray-800/90 rounded-3xl p-6 space-y-5 shadow-xl">
              <span className="text-xs font-extrabold uppercase tracking-wider text-purple-400 block border-b border-gray-800 pb-2">
                Email Preferences
              </span>

              <div className="space-y-4">
                {[
                  { key: 'courseUpdates' as const, title: 'Course Updates', desc: 'Receive emails about course updates and new lessons' },
                  { key: 'assignments' as const, title: 'Assignments & Deadlines', desc: 'Receive emails about assignments and deadlines' },
                  { key: 'announcements' as const, title: 'Announcements', desc: 'Receive emails about important announcements' },
                  { key: 'communityActivity' as const, title: 'Community Activity', desc: 'Receive emails about replies and mentions' },
                  { key: 'achievements' as const, title: 'Achievements', desc: 'Receive emails about badges and achievements' },
                  { key: 'marketingUpdates' as const, title: 'Marketing Updates', desc: 'Receive emails about new features and offers' },
                  { key: 'weeklySummary' as const, title: 'Weekly Summary', desc: 'Receive a weekly summary of your progress' },
                ].map((item) => {
                  const isChecked = emailPrefs[item.key];
                  return (
                    <div
                      key={item.key}
                      onClick={() => handleTogglePref(item.key)}
                      className="flex items-center justify-between gap-4 p-3 rounded-2xl bg-[#0f172a] border border-gray-800 hover:border-purple-500/30 transition-all cursor-pointer select-none"
                    >
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-white block">{item.title}</span>
                        <p className="text-[11px] text-gray-400">{item.desc}</p>
                      </div>

                      {/* Toggle Switch Button */}
                      <button
                        type="button"
                        className={`w-11 h-6 rounded-full p-1 transition-colors flex-shrink-0 ${
                          isChecked ? 'bg-purple-600' : 'bg-gray-800'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white shadow-md transform transition-transform ${
                          isChecked ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSaveEmailPreferences}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-xl transition-all cursor-pointer"
                >
                  Save Preferences
                </button>
              </div>
            </div>

            {/* Right Side Email Preview Card */}
            <div className="lg:col-span-5 bg-[#0b1222] border border-gray-800/90 rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-6 shadow-xl relative overflow-hidden min-h-[400px]">
              <span className="text-xs font-extrabold uppercase tracking-wider text-purple-400 block self-start">
                Email Preview
              </span>

              {/* Graphic Icon */}
              <div className="relative my-4">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-500 p-1 shadow-2xl shadow-purple-900/50 flex items-center justify-center">
                  <div className="w-full h-full bg-[#0b1222] rounded-[22px] flex items-center justify-center">
                    <Mail className="w-10 h-10 text-purple-400" />
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-cyan-400 text-black flex items-center justify-center font-bold text-xs shadow">
                  ✓
                </div>
              </div>

              <div className="space-y-2 max-w-sm">
                <h2 className="text-xl font-black text-white">Stay Updated!</h2>
                <p className="text-xs text-gray-400 leading-relaxed">
                  You will receive emails about important updates, progress, and achievements.
                </p>
              </div>

              {/* Email Address Display */}
              <div className="w-full p-3.5 rounded-2xl bg-[#0f172a] border border-gray-800 flex items-center justify-between text-xs">
                <div className="text-left overflow-hidden">
                  <span className="text-[10px] text-gray-500 block uppercase font-bold">Email Address</span>
                  <span className="text-xs font-bold text-white truncate block">{userEmail}</span>
                </div>
                <button
                  onClick={() => setIsChangeEmailOpen(true)}
                  className="text-xs font-bold text-purple-400 hover:text-purple-300 underline cursor-pointer flex-shrink-0"
                >
                  Change
                </button>
              </div>

              <button
                onClick={handleSaveEmailPreferences}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs shadow-xl transition-all cursor-pointer"
              >
                Save Preferences
              </button>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}

      {/* Modal: Create Room */}
      {isCreateRoomModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b1222] border border-cyan-500/40 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsCreateRoomModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-gray-800 text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-black text-white">Create New Chat Room</h3>
            <form onSubmit={handleCreateRoom} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Room Name</label>
                <input
                  type="text"
                  placeholder="e.g. Data Structures & Algorithms"
                  value={newRoomName}
                  onChange={e => setNewRoomName(e.target.value)}
                  className="w-full bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs transition-all shadow-md cursor-pointer"
              >
                Create Room
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: New Announcement */}
      {isNewAnnouncementModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b1222] border border-indigo-500/40 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsNewAnnouncementModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-gray-800 text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-black text-white">Publish New Announcement</h3>
            <form onSubmit={handleAddAnnouncement} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Summer AI Workshop Registration Open"
                  value={newAnnTitle}
                  onChange={e => setNewAnnTitle(e.target.value)}
                  className="w-full bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Category</label>
                <select
                  value={newAnnCategory}
                  onChange={e => setNewAnnCategory(e.target.value as any)}
                  className="w-full bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-gray-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="Course">Course</option>
                  <option value="Event">Event</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Update">Update</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Provide announcement details..."
                  value={newAnnDesc}
                  onChange={e => setNewAnnDesc(e.target.value)}
                  className="w-full bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs transition-all shadow-md cursor-pointer"
              >
                Publish Announcement
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Change Email */}
      {isChangeEmailOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0b1222] border border-purple-500/40 rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsChangeEmailOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-gray-800 text-gray-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-black text-white">Update Email Address</h3>
            <form onSubmit={handleSaveEmailAddress} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1">New Email Address</label>
                <input
                  type="email"
                  value={tempEmailInput}
                  onChange={e => setTempEmailInput(e.target.value)}
                  className="w-full bg-[#0f172a] border border-gray-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs transition-all shadow-md cursor-pointer"
              >
                Save New Email
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
