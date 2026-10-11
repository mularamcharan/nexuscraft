import { UserState } from '../types';

export interface SkillItem {
  id: string;
  name: string;
  category: 'AI & ML' | 'Data Science' | 'Environmental Tech' | 'Software Engineering' | 'Soft Skills';
  currentLevel: number; // 0 to 100
  targetLevel: number;  // 0 to 100
  priority: 'High' | 'Medium' | 'Low';
  evidenceCount: number; // completed lessons, practice runs, projects
  relatedCourseIds: string[];
  relatedProjectIds: string[];
  lastUpdated: string;
}

export interface CareerRoleDefinition {
  id: string;
  title: string;
  category: string;
  avgSalary: string;
  demandTier: string;
  requiredSkills: { skillId: string; skillName: string; requiredLevel: number; priority: 'High' | 'Medium' | 'Low' }[];
  recommendedCourseIds: string[];
  recommendedProjectIds: string[];
  description: string;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  completed: boolean;
}

export interface LearnerProject {
  id: string;
  title: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  techStack: string[];
  progress: number; // 0 to 100
  completed: boolean;
  featured: boolean;
  stars: number;
  likes: number;
  milestones: ProjectMilestone[];
  skillsImpacted: string[];
  repoUrl?: string;
  liveUrl?: string;
  completionDate?: string;
}

export interface PracticeAttemptRecord {
  id: string;
  topicId: string;
  topicTitle: string;
  questionType: 'mcq' | 'multi-select' | 'short-answer' | 'coding-debug' | 'scenario';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  score: number; // 0 to 100
  passed: boolean;
  skillsUpdated: string[];
  timestamp: string;
  mistakesLogged?: string[];
}

export interface MockInterviewRecord {
  id: string;
  roleTitle: string;
  interviewType: 'Technical' | 'HR' | 'Behavioral' | 'System Design';
  date: string;
  overallScore: number; // 0 to 100
  breakdown: {
    technicalAccuracy: number;
    communication: number;
    problemSolving: number;
    scenarioAlignment: number;
  };
  strengths: string[];
  areasForImprovement: string[];
  feedbackSummary: string;
}

export interface ResumeProfileData {
  fullName: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  portfolioUrl: string;
  summary: string;
  education: {
    college: string;
    degree: string;
    branch: string;
    year: string;
    gpa: string;
  };
  skills: string[];
  experiences: {
    id: string;
    role: string;
    company: string;
    duration: string;
    location: string;
    bullets: string[];
  }[];
  projects: {
    id: string;
    title: string;
    tech: string;
    description: string;
    bullets: string[];
  }[];
  certifications: string[];
  achievements: string[];
}

export interface CentralLearnerProfile {
  // Personal Info
  fullName: string;
  email: string;
  college: string;
  branch: string;
  year: string;
  avatarUrl: string;
  
  // Career Goal
  careerGoalId: string;
  careerGoalTitle: string;
  
  // Skills Engine
  skills: SkillItem[];
  
  // Projects
  projects: LearnerProject[];
  
  // Practice History & Topic Performance
  practiceHistory: PracticeAttemptRecord[];
  weakTopics: string[];
  strongTopics: string[];
  
  // Mock Interviews
  interviewRecords: MockInterviewRecord[];
  
  // Resume Data
  resume: ResumeProfileData;
  
  // Learning Preferences
  learningPreferences: {
    dailyTargetMinutes: number;
    learningStyle: 'hands-on' | 'reading' | 'mixed';
    reminderDays: string[];
  };
}

export const CAREER_ROLES: CareerRoleDefinition[] = [
  {
    id: 'climate-data-scientist',
    title: 'Climate Data Scientist',
    category: 'Analytics & Predictive AI',
    avgSalary: '$115,000 - $160,000',
    demandTier: 'High Demand',
    description: 'Analyze time-series climate datasets, build atmospheric prediction models, and quantify carbon sink dynamics using machine learning algorithms.',
    requiredSkills: [
      { skillId: 'python-ml', skillName: 'Python & ML', requiredLevel: 85, priority: 'High' },
      { skillId: 'climate-modeling', skillName: 'Climate & Carbon Modeling', requiredLevel: 80, priority: 'High' },
      { skillId: 'data-preprocessing', skillName: 'Data Preprocessing & Telemetry', requiredLevel: 75, priority: 'High' },
      { skillId: 'nlp', skillName: 'Natural Language Processing', requiredLevel: 60, priority: 'Medium' },
      { skillId: 'system-design', skillName: 'System Architecture', requiredLevel: 55, priority: 'Low' },
    ],
    recommendedCourseIds: ['ai-mod-1', 'ai-mod-2', 'env-mod-1', 'env-mod-2'],
    recommendedProjectIds: ['p1', 'p5'],
  },
  {
    id: 'ai-engineer',
    title: 'AI Solutions Engineer',
    category: 'Artificial Intelligence & LLMs',
    avgSalary: '$125,000 - $175,000',
    demandTier: 'High Demand',
    description: 'Design and deploy state-of-the-art foundation models, agentic workflows, multi-modal applications, and robust API endpoints.',
    requiredSkills: [
      { skillId: 'python-ml', skillName: 'Python & ML', requiredLevel: 90, priority: 'High' },
      { skillId: 'prompt-engineering', skillName: 'Prompt Engineering & LLM APIs', requiredLevel: 85, priority: 'High' },
      { skillId: 'nlp', skillName: 'Natural Language Processing', requiredLevel: 80, priority: 'High' },
      { skillId: 'system-design', skillName: 'System Architecture', requiredLevel: 75, priority: 'High' },
      { skillId: 'web-dev', skillName: 'Full-Stack Integration', requiredLevel: 70, priority: 'Medium' },
    ],
    recommendedCourseIds: ['ai-mod-1', 'ai-mod-3', 'ai-mod-4', 'ai-mod-5'],
    recommendedProjectIds: ['p1', 'p2'],
  },
  {
    id: 'esg-systems-architect',
    title: 'ESG & Green Tech Systems Architect',
    category: 'Sustainability & Enterprise Tech',
    avgSalary: '$130,000 - $185,000',
    demandTier: 'Rapidly Growing',
    description: 'Architect low-carbon digital infrastructure, ESG compliance reporting engines, and green cloud computation pipelines.',
    requiredSkills: [
      { skillId: 'climate-modeling', skillName: 'Climate & Carbon Modeling', requiredLevel: 85, priority: 'High' },
      { skillId: 'system-design', skillName: 'System Architecture', requiredLevel: 85, priority: 'High' },
      { skillId: 'web-dev', skillName: 'Full-Stack Integration', requiredLevel: 75, priority: 'High' },
      { skillId: 'data-preprocessing', skillName: 'Data Preprocessing & Telemetry', requiredLevel: 70, priority: 'Medium' },
      { skillId: 'python-ml', skillName: 'Python & ML', requiredLevel: 65, priority: 'Medium' },
    ],
    recommendedCourseIds: ['env-mod-1', 'env-mod-3', 'env-mod-4', 'ai-mod-6'],
    recommendedProjectIds: ['p2', 'p5'],
  },
  {
    id: 'fullstack-ai-dev',
    title: 'Full Stack AI Developer',
    category: 'Software Engineering',
    avgSalary: '$110,000 - $155,000',
    demandTier: 'High Demand',
    description: 'Build end-to-end intelligent web platforms, pairing modern React interfaces with generative AI microservices and streaming pipelines.',
    requiredSkills: [
      { skillId: 'web-dev', skillName: 'Full-Stack Integration', requiredLevel: 90, priority: 'High' },
      { skillId: 'prompt-engineering', skillName: 'Prompt Engineering & LLM APIs', requiredLevel: 80, priority: 'High' },
      { skillId: 'python-ml', skillName: 'Python & ML', requiredLevel: 70, priority: 'High' },
      { skillId: 'system-design', skillName: 'System Architecture', requiredLevel: 75, priority: 'Medium' },
      { skillId: 'nlp', skillName: 'Natural Language Processing', requiredLevel: 65, priority: 'Medium' },
    ],
    recommendedCourseIds: ['ai-mod-1', 'ai-mod-4', 'soft-mod-1'],
    recommendedProjectIds: ['p2', 'p6'],
  },
];

export const INITIAL_SKILLS: SkillItem[] = [
  {
    id: 'python-ml',
    name: 'Python & Machine Learning',
    category: 'AI & ML',
    currentLevel: 58,
    targetLevel: 85,
    priority: 'High',
    evidenceCount: 14,
    relatedCourseIds: ['ai-mod-1', 'ai-mod-2', 'env-mod-1'],
    relatedProjectIds: ['p1', 'p5'],
    lastUpdated: '2 hours ago',
  },
  {
    id: 'prompt-engineering',
    name: 'Prompt Engineering & LLM APIs',
    category: 'AI & ML',
    currentLevel: 74,
    targetLevel: 90,
    priority: 'High',
    evidenceCount: 22,
    relatedCourseIds: ['ai-mod-4', 'ai-mod-5'],
    relatedProjectIds: ['p1'],
    lastUpdated: '1 hour ago',
  },
  {
    id: 'climate-modeling',
    name: 'Climate & Carbon Accounting',
    category: 'Environmental Tech',
    currentLevel: 65,
    targetLevel: 80,
    priority: 'High',
    evidenceCount: 11,
    relatedCourseIds: ['env-mod-1', 'env-mod-2', 'env-mod-3'],
    relatedProjectIds: ['p5'],
    lastUpdated: 'Yesterday',
  },
  {
    id: 'nlp',
    name: 'Natural Language Processing',
    category: 'AI & ML',
    currentLevel: 46,
    targetLevel: 75,
    priority: 'Medium',
    evidenceCount: 8,
    relatedCourseIds: ['ai-mod-4'],
    relatedProjectIds: ['p1'],
    lastUpdated: '3 days ago',
  },
  {
    id: 'web-dev',
    name: 'Full-Stack React & Node.js',
    category: 'Software Engineering',
    currentLevel: 82,
    targetLevel: 85,
    priority: 'Medium',
    evidenceCount: 19,
    relatedCourseIds: ['ai-mod-1'],
    relatedProjectIds: ['p2', 'p6'],
    lastUpdated: 'Today',
  },
  {
    id: 'system-design',
    name: 'Cloud & System Architecture',
    category: 'Software Engineering',
    currentLevel: 40,
    targetLevel: 75,
    priority: 'High',
    evidenceCount: 5,
    relatedCourseIds: ['ai-mod-6'],
    relatedProjectIds: ['p2'],
    lastUpdated: '4 days ago',
  },
  {
    id: 'data-preprocessing',
    name: 'Data Cleaning & Telemetry Pipelines',
    category: 'Data Science',
    currentLevel: 68,
    targetLevel: 80,
    priority: 'Medium',
    evidenceCount: 12,
    relatedCourseIds: ['ai-mod-2', 'env-mod-1'],
    relatedProjectIds: ['p5'],
    lastUpdated: 'Yesterday',
  },
  {
    id: 'communication',
    name: 'Technical Communication & Interviewing',
    category: 'Soft Skills',
    currentLevel: 70,
    targetLevel: 85,
    priority: 'Medium',
    evidenceCount: 9,
    relatedCourseIds: ['soft-mod-1', 'int-mod-1'],
    relatedProjectIds: [],
    lastUpdated: '2 days ago',
  }
];

export const INITIAL_PROJECTS: LearnerProject[] = [
  {
    id: 'p1',
    title: 'Atmospheric Carbon AI Predictor',
    category: 'AI & Environmental Tech',
    difficulty: 'Intermediate',
    description: 'A machine learning dashboard utilizing time-series telemetry to model and forecast localized carbon absorption with 92% accuracy.',
    techStack: ['Python', 'Scikit-Learn', 'FastAPI', 'React', 'Tailwind CSS'],
    progress: 100,
    completed: true,
    featured: true,
    stars: 45,
    likes: 18,
    milestones: [
      { id: 'm1', title: 'Data Cleaning & Baseline Regression', completed: true },
      { id: 'm2', title: 'Time-Series LSTM Model Architecture', completed: true },
      { id: 'm3', title: 'Interactive Dashboard & API Deployment', completed: true },
    ],
    skillsImpacted: ['python-ml', 'climate-modeling', 'data-preprocessing'],
    repoUrl: 'https://github.com/nexuscraft/carbon-ai-predictor',
    liveUrl: 'https://carbon-ai.nexuscraft.dev',
    completionDate: 'August 14, 2026',
  },
  {
    id: 'p2',
    title: 'Intelligent Green Supply Chain Engine',
    category: 'Full Stack AI',
    difficulty: 'Advanced',
    description: 'An enterprise microservices platform optimizing freight logistics routes for Scope 3 emissions minimization using genetic algorithms.',
    techStack: ['TypeScript', 'Node.js', 'React', 'Python Microservice', 'PostgreSQL'],
    progress: 75,
    completed: false,
    featured: true,
    stars: 38,
    likes: 14,
    milestones: [
      { id: 'm1', title: 'Route Emission Cost Functions', completed: true },
      { id: 'm2', title: 'Multi-Stop Genetic Optimization Engine', completed: true },
      { id: 'm3', title: 'Real-Time Telemetry Webhook Integrations', completed: false },
    ],
    skillsImpacted: ['web-dev', 'system-design', 'climate-modeling'],
    repoUrl: 'https://github.com/nexuscraft/green-supply-engine',
  },
  {
    id: 'p3',
    title: 'PromptCraft Multi-Agent Evaluator',
    category: 'LLM & Generative AI',
    difficulty: 'Intermediate',
    description: 'A zero-hallucination evaluation harness that runs automated adversarial test cases across prompt variants.',
    techStack: ['Python', 'Gemini API', 'TypeScript', 'Tailwind'],
    progress: 100,
    completed: true,
    featured: false,
    stars: 52,
    likes: 26,
    milestones: [
      { id: 'm1', title: 'Prompt Ingestion & Tokenizer Sandbox', completed: true },
      { id: 'm2', title: 'Automated Metric Rubric (Clarity, Guardrails)', completed: true },
      { id: 'm3', title: 'Benchmarking Dashboard', completed: true },
    ],
    skillsImpacted: ['prompt-engineering', 'nlp'],
    repoUrl: 'https://github.com/nexuscraft/promptcraft-evaluator',
    liveUrl: 'https://promptcraft.nexuscraft.dev',
    completionDate: 'August 02, 2026',
  },
];

export const INITIAL_LEARNER_PROFILE: CentralLearnerProfile = {
  fullName: 'Alex Vance',
  email: 'alex.vance@nexuscraft.edu',
  college: 'Nexus Institute of Technology & AI',
  branch: 'Computer Science & AI Engineering',
  year: 'Final Year (2026)',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80',
  careerGoalId: 'climate-data-scientist',
  careerGoalTitle: 'Climate Data Scientist',
  skills: INITIAL_SKILLS,
  projects: INITIAL_PROJECTS,
  practiceHistory: [
    {
      id: 'pr-1',
      topicId: 't-ml-basics',
      topicTitle: 'Machine Learning Loss Functions & Optimization',
      questionType: 'mcq',
      difficulty: 'Intermediate',
      score: 95,
      passed: true,
      skillsUpdated: ['python-ml'],
      timestamp: 'Yesterday at 3:45 PM',
    },
    {
      id: 'pr-2',
      topicId: 't-carbon-accounting',
      topicTitle: 'GHG Protocol Scope 1-3 Boundary Calculations',
      questionType: 'scenario',
      difficulty: 'Intermediate',
      score: 88,
      passed: true,
      skillsUpdated: ['climate-modeling'],
      timestamp: 'August 18, 2026',
    },
    {
      id: 'pr-3',
      topicId: 't-sys-design',
      topicTitle: 'Microservice Event Streaming for Climate IoT',
      questionType: 'coding-debug',
      difficulty: 'Advanced',
      score: 60,
      passed: false,
      skillsUpdated: ['system-design'],
      timestamp: 'August 17, 2026',
      mistakesLogged: ['Event deduplication logic in Kafka consumer', 'Missing backpressure buffer'],
    },
  ],
  weakTopics: ['Microservice Event Streaming for Climate IoT', 'Transformer Attention Latency Profiling'],
  strongTopics: ['GHG Protocol Scope 1-3 Boundary Calculations', 'Prompt Ingestion & Tokenizer Sandboxes', 'Python Regression & Gradient Descent'],
  interviewRecords: [
    {
      id: 'int-1',
      roleTitle: 'Climate Data Scientist',
      interviewType: 'Technical',
      date: 'August 16, 2026',
      overallScore: 84,
      breakdown: {
        technicalAccuracy: 88,
        communication: 82,
        problemSolving: 85,
        scenarioAlignment: 81,
      },
      strengths: [
        'Deep command of time-series regression and satellite data features',
        'Clear structured explanation of carbon sinks and GIGO principles',
      ],
      areasForImprovement: [
        'Could incorporate more distributed computing details (e.g. Apache Spark for >1TB datasets)',
      ],
      feedbackSummary: 'Strong candidate with clear mathematical foundations and high domain alignment for climate tech engineering.',
    }
  ],
  resume: {
    fullName: 'Alex Vance',
    title: 'Aspiring Climate Data Scientist & AI Solutions Engineer',
    email: 'alex.vance@nexuscraft.edu',
    phone: '+1 (555) 234-8901',
    location: 'San Francisco, CA (Open to Remote / Relocation)',
    linkedin: 'linkedin.com/in/alexvance-ai',
    github: 'github.com/alexvance',
    portfolioUrl: 'https://nexuscraft.dev/p/alex-vance',
    summary: 'Proactive AI Engineer and Data Scientist specializing in environmental climate modeling, machine learning, and LLM applications. Proven experience building end-to-end predictive telemetry dashboards and low-carbon computing workflows with 90%+ forecast precision.',
    education: {
      college: 'Nexus Institute of Technology',
      degree: 'Bachelor of Technology',
      branch: 'Computer Science & AI Engineering',
      year: 'Graduating 2026',
      gpa: '3.88 / 4.00',
    },
    skills: [
      'Python', 'Machine Learning', 'Scikit-Learn', 'PyTorch Basics', 'Prompt Engineering',
      'GHG Protocol & Climate Modeling', 'React', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'SQL', 'Git'
    ],
    experiences: [
      {
        id: 'exp-1',
        role: 'AI Research Fellow',
        company: 'GreenEarth Innovation Labs',
        duration: 'June 2025 – Present',
        location: 'San Francisco, CA',
        bullets: [
          'Engineered automated time-series machine learning pipelines handling 50+ GB of daily sensor telemetry.',
          'Developed predictive carbon sink models reducing forecast uncertainty by 28% for renewable grid planners.',
          'Co-authored 2 technical briefings on algorithmic efficiency and Scope 2 digital footprint mitigation.'
        ]
      }
    ],
    projects: [
      {
        id: 'p1',
        title: 'Atmospheric Carbon AI Predictor',
        tech: 'Python, Scikit-Learn, FastAPI, React',
        description: 'Predictive machine learning platform mapping localized carbon absorption patterns.',
        bullets: [
          'Engineered spatio-temporal data preprocessing routines across 100k+ environmental telemetry rows.',
          'Trained and deployed regression models achieving a 92% R² accuracy score against benchmark sensors.',
          'Built a modern React & Tailwind dashboard with interactive charting and downloadable forecast reports.'
        ]
      },
      {
        id: 'p2',
        title: 'Intelligent Green Supply Chain Engine',
        tech: 'TypeScript, Node.js, Python, PostgreSQL',
        description: 'Freight logistics emission minimization system.',
        bullets: [
          'Implemented genetic optimization algorithms to identify low-emission route alternatives.',
          'Designed modular REST APIs and automated telemetry ingest pipelines.'
        ]
      }
    ],
    certifications: [
      'NexusCraft Verified AI Innovator Credential (NC-2026-AI-1137)',
      'Verified Environmental AI Specialist (NC-2026-ENV-2401)',
      'Professional Prompt Mastery Level 3 Certification (NC-2026-PROMPT-3902)'
    ],
    achievements: [
      '1st Place — National Sustainable AI Hackathon 2025',
      'NexusCraft Top 5 Global Community Leaderboard (14,850+ XP)',
      'Completed 28 Modular AI Lessons & 15 Gamified Simulations'
    ]
  },
  learningPreferences: {
    dailyTargetMinutes: 30,
    learningStyle: 'hands-on',
    reminderDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  }
};

const STORAGE_KEY = 'nexuscraft_central_learner_profile_v1';

export function getStoredLearnerProfile(): CentralLearnerProfile {
  if (typeof window === 'undefined') return INITIAL_LEARNER_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LEARNER_PROFILE));
      return INITIAL_LEARNER_PROFILE;
    }
    const parsed = JSON.parse(raw);
    return { ...INITIAL_LEARNER_PROFILE, ...parsed };
  } catch {
    return INITIAL_LEARNER_PROFILE;
  }
}

export function saveStoredLearnerProfile(profile: CentralLearnerProfile): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch (err) {
    console.error('Failed to persist learner profile:', err);
  }
}

/**
 * Calculates a comprehensive Career Readiness Score (0-100%)
 */
export function calculateCareerReadiness(profile: CentralLearnerProfile, userState: UserState): {
  overallScore: number;
  skillMatchScore: number;
  courseCompletionScore: number;
  projectScore: number;
  interviewScore: number;
  atsReadinessScore: number;
} {
  const currentRole = CAREER_ROLES.find(r => r.id === profile.careerGoalId) || CAREER_ROLES[0];
  
  // 1. Skill Match Score (40% weight)
  let skillPointsTotal = 0;
  let maxSkillPoints = 0;
  currentRole.requiredSkills.forEach(req => {
    const userSkill = profile.skills.find(s => s.id === req.skillId);
    const userLvl = userSkill ? userSkill.currentLevel : 40;
    const weight = req.priority === 'High' ? 3 : req.priority === 'Medium' ? 2 : 1;
    const ratio = Math.min(1, userLvl / req.requiredLevel);
    skillPointsTotal += ratio * 100 * weight;
    maxSkillPoints += 100 * weight;
  });
  const skillMatchScore = Math.round(skillPointsTotal / (maxSkillPoints || 1));

  // 2. Course Completion Score (20% weight)
  const completedCount = userState.completedModules.length;
  const courseCompletionScore = Math.min(100, Math.round((completedCount / 12) * 100));

  // 3. Project Score (20% weight)
  const completedProjects = profile.projects.filter(p => p.completed).length;
  const projectScore = Math.min(100, completedProjects >= 2 ? 100 : completedProjects === 1 ? 70 : 40);

  // 4. Interview Score (10% weight)
  const latestInterview = profile.interviewRecords[0];
  const interviewScore = latestInterview ? latestInterview.overallScore : 65;

  // 5. ATS Resume Readiness (10% weight)
  const atsReadinessScore = profile.resume.summary && profile.resume.projects.length >= 2 ? 88 : 60;

  const overallScore = Math.round(
    skillMatchScore * 0.35 +
    courseCompletionScore * 0.20 +
    projectScore * 0.20 +
    interviewScore * 0.15 +
    atsReadinessScore * 0.10
  );

  return {
    overallScore: Math.min(99, Math.max(15, overallScore)),
    skillMatchScore,
    courseCompletionScore,
    projectScore,
    interviewScore,
    atsReadinessScore,
  };
}

/**
 * Computes Skill Gaps against current career goal
 */
export function calculateSkillGaps(profile: CentralLearnerProfile): {
  skillId: string;
  skillName: string;
  currentLevel: number;
  requiredLevel: number;
  gapPercent: number;
  priority: 'High' | 'Medium' | 'Low';
  recommendedLearning: string[];
  recommendedAction: string;
}[] {
  const currentRole = CAREER_ROLES.find(r => r.id === profile.careerGoalId) || CAREER_ROLES[0];
  
  return currentRole.requiredSkills.map(req => {
    const userSkill = profile.skills.find(s => s.id === req.skillId);
    const currentLevel = userSkill ? userSkill.currentLevel : 35;
    const gapPercent = Math.max(0, req.requiredLevel - currentLevel);
    
    let recommendedAction = '';
    if (gapPercent > 30) {
      recommendedAction = `Critical Priority: Complete modular courses & simulation drills in ${req.skillName}`;
    } else if (gapPercent > 10) {
      recommendedAction = `Moderate Gap: Build milestone project features utilizing ${req.skillName}`;
    } else {
      recommendedAction = `Target Met: Reinforce through high-difficulty practice questions`;
    }

    return {
      skillId: req.skillId,
      skillName: req.skillName,
      currentLevel,
      requiredLevel: req.requiredLevel,
      gapPercent,
      priority: req.priority,
      recommendedLearning: currentRole.recommendedCourseIds,
      recommendedAction,
    };
  }).sort((a, b) => b.gapPercent - a.gapPercent);
}

/**
 * Next Best Action Intelligent Engine
 */
export function getNextBestAction(profile: CentralLearnerProfile, userState: UserState): {
  title: string;
  description: string;
  actionLabel: string;
  targetTab: string;
  moduleId?: string;
  category: 'Skill Gap' | 'Project Milestone' | 'Interview Practice' | 'Weak Topic Drill';
  urgency: 'Immediate' | 'Recommended' | 'Upcoming';
} {
  // 1. If there's an active weak topic, prompt for prompt mastery drill
  if (profile.weakTopics.length > 0) {
    const weakTopic = profile.weakTopics[0];
    return {
      title: `Close Knowledge Gap in: ${weakTopic.slice(0, 36)}...`,
      description: `Your last practice session identified this as an area to reinforce. A quick prompt engineering simulation drill will boost your skill accuracy.`,
      actionLabel: 'Launch Prompt Mastery Drill',
      targetTab: 'prompt-mastery',
      category: 'Weak Topic Drill',
      urgency: 'Immediate',
    };
  }

  // 2. If there's an in-progress project with uncompleted milestones, recommend working on it
  const inProgressProject = profile.projects.find(p => !p.completed);
  if (inProgressProject) {
    const nextMilestone = inProgressProject.milestones.find(m => !m.completed) || inProgressProject.milestones[0];
    return {
      title: `Complete Milestone on "${inProgressProject.title}"`,
      description: `Next task: "${nextMilestone.title}". Completing this project adds +15% to your ${inProgressProject.skillsImpacted[0] || 'AI'} skill and updates your public portfolio!`,
      actionLabel: 'View Project in Portfolio',
      targetTab: 'portfolio',
      category: 'Project Milestone',
      urgency: 'Immediate',
    };
  }

  // 3. If interview readiness hasn't been tested recently, prompt mock interview
  if (profile.interviewRecords.length === 0 || profile.interviewRecords[0].overallScore < 85) {
    return {
      title: `Take ${profile.careerGoalTitle} Mock Interview`,
      description: `Evaluate your technical vocabulary, real-world case analysis, and scenario articulation in a simulated AI recruiter interview.`,
      actionLabel: 'Launch Mock Interview',
      targetTab: 'portfolio',
      category: 'Interview Practice',
      urgency: 'Recommended',
    };
  }

  // 4. Default: Recommend closing largest skill gap
  const gaps = calculateSkillGaps(profile);
  const highestGap = gaps[0];
  return {
    title: `Level Up ${highestGap?.skillName || 'AI Engineering'} (+${highestGap?.gapPercent || 25}% Gap)`,
    description: `To reach your target role of ${profile.careerGoalTitle}, closing this gap is high-priority. Complete your next curriculum module.`,
    actionLabel: 'Resume Learning Path',
    targetTab: 'portfolio',
    category: 'Skill Gap',
    urgency: 'Recommended',
  };
}
