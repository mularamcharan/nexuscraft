import React, { useState } from 'react';
import {
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Trophy,
  Target,
  Clock,
  Award,
  Zap,
  Play,
  Layers,
  MessageSquare,
  Workflow,
  HelpCircle,
  X,
  Send,
  RotateCcw,
  Star,
  ChevronRight,
  BookOpen,
  Brain,
  Lightbulb,
  Sliders,
  Code2,
  ShieldCheck,
  Flame,
  Copy,
  Check
} from 'lucide-react';
import { UserState } from '../types';
import {
  getStoredLearnerProfile,
  saveStoredLearnerProfile,
  PracticeAttemptRecord
} from '../data/learnerStore';

interface Chapter {
  id: number;
  title: string;
  scenario: string;
  expectedKeywords: string[];
  bestScore: number;
  attemptsLeft: number;
  completed: boolean;
}

interface PromptMasterySectionProps {
  userState: UserState;
  onSendToast?: (msg: string, type?: 'success' | 'error' | 'info') => void;
}

const LEVEL_1_CHAPTERS: Chapter[] = [
  { id: 1, title: 'Event Networking', scenario: 'Craft a prompt to introduce yourself to industry leaders at a climate tech conference, requesting a 10-minute coffee chat.', expectedKeywords: ['context', 'background', 'coffee', 'value'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 2, title: 'Social Media Clean-Up', scenario: 'Write a prompt asking AI to scan a list of past social posts and identify potential professional brand risks.', expectedKeywords: ['audit', 'professional', 'tone', 'flag'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 3, title: 'Side Income Idea', scenario: 'Prompt the AI to brainstorm 5 low-overhead side project ideas using your current AI programming skills.', expectedKeywords: ['skills', 'income', 'low-overhead', 'feasibility'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 4, title: 'Career Switch Thought', scenario: 'Draft a prompt asking for a step-by-step 90-day transition roadmap from traditional software to AI Climate Engineering.', expectedKeywords: ['roadmap', '90-day', 'transition', 'skills'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 5, title: 'Salary Understanding', scenario: 'Write a prompt asking AI to breakdown compensation packages for mid-level Climate Data Scientists across US markets.', expectedKeywords: ['compensation', 'base', 'equity', 'location'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 6, title: 'Networking with Seniors', scenario: 'Prompt the AI to generate a polite, non-intrusive LinkedIn outreach message to a Principal AI Research Director.', expectedKeywords: ['polite', 'concise', 'mutual', 'question'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 7, title: 'Balancing Expectations', scenario: 'Draft a prompt for AI to analyze your weekly schedule and recommend realistic hours for upskilling without burnout.', expectedKeywords: ['schedule', 'hours', 'burnout', 'balance'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 8, title: 'Job Role Understanding', scenario: 'Ask AI to deconstruct a complex job description into core responsibilities, key tech stack, and red flags.', expectedKeywords: ['responsibilities', 'tech stack', 'requirements', 'summary'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 9, title: 'Hackathon Prep', scenario: 'Generate a prompt requesting a project team role breakdown and fast prototyping schedule for a 48-hour climate hackathon.', expectedKeywords: ['hackathon', 'timeline', 'roles', 'prototype'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 10, title: 'Lecture Notes Cleanup', scenario: 'Ask AI to convert raw, unstructured meeting or lecture bullet points into a clean executive summary with action items.', expectedKeywords: ['summary', 'action items', 'structured', 'key points'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 11, title: 'LinkedIn Profile Improvement', scenario: 'Write a prompt asking for specific bio & summary optimizations to increase recruiter visibility for AI roles.', expectedKeywords: ['keywords', 'visibility', 'bio', 'achievements'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 12, title: 'Exam Revision', scenario: 'Create a prompt instructing AI to act as a rigorous quizmaster asking 5 progressive questions on Machine Learning matrices.', expectedKeywords: ['quizmaster', 'progressive', 'questions', 'feedback'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 13, title: 'Cold Messaging', scenario: 'Draft a concise 3-sentence email prompt seeking mentorship from an open-source maintainer.', expectedKeywords: ['mentorship', 'concise', 'appreciation', 'question'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 14, title: 'Travel Planning', scenario: 'Ask AI for a low-carbon 3-day itinerary for attending an AI symposium in Zurich on a student budget.', expectedKeywords: ['low-carbon', 'budget', 'itinerary', 'Zurich'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 15, title: 'Decision Making', scenario: 'Write a structured decision-matrix prompt comparing two job offers based on growth, salary, culture, and remote flexibility.', expectedKeywords: ['matrix', 'criteria', 'weights', 'tradeoffs'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 16, title: 'Food on a Budget', scenario: 'Prompt AI to generate a high-protein, plant-based meal plan for $50/week with exact grocery shopping lists.', expectedKeywords: ['grocery list', 'budget', 'high-protein', 'meal plan'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 17, title: 'Curiosity Learning', scenario: 'Ask AI to explain Transformer attention mechanisms using an intuitive real-world library catalog analogy.', expectedKeywords: ['analogy', 'simple', 'transformer', 'attention'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 18, title: 'Last-Minute Prep', scenario: 'Create a prompt for a 15-minute quick cheat-sheet summary of Python async/await paradigms before a coding interview.', expectedKeywords: ['cheat-sheet', 'async/await', 'examples', 'quick'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 19, title: 'Understanding a Formula', scenario: 'Prompt AI to step through the mathematical formula for Shannon Entropy and explain its role in Decision Trees.', expectedKeywords: ['entropy', 'step-by-step', 'decision tree', 'formula'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 20, title: 'Concept Confusion', scenario: 'Ask AI to clarify the distinction between L1 and L2 regularization with clear geometric visualization code in Python.', expectedKeywords: ['L1 vs L2', 'regularization', 'differences', 'python'], bestScore: 0, attemptsLeft: 3, completed: false },
];

const LEVEL_2_CHAPTERS: Chapter[] = [
  { id: 1, title: 'Networking Purpose Clarity', scenario: 'Define a role-assigned prompt where AI acts as a Senior Career Strategist framing networking outreach.', expectedKeywords: ['role', 'strategist', 'persona', 'outreach'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 2, title: 'LinkedIn Content Strategy', scenario: 'Build a few-shot prompt with 2 example posts to generate a weekly thought-leadership calendar.', expectedKeywords: ['few-shot', 'examples', 'calendar', 'hooks'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 3, title: 'Digital Footprint Review', scenario: 'Structure a prompt utilizing system instructions to evaluate public developer presence.', expectedKeywords: ['system instruction', 'evaluate', 'footprint', 'audit'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 4, title: 'Application Shortlisting Strategy', scenario: 'Create a prompt with structured JSON output schema requirements to parse 3 job posts against a resume.', expectedKeywords: ['json', 'schema', 'parse', 'compatibility'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 5, title: 'Skill Learning Order', scenario: 'Prompt AI with explicit negative constraints (e.g., "Do not suggest outdated ML libraries") to sequence learning steps.', expectedKeywords: ['constraints', 'do not', 'sequence', 'modern'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 6, title: 'Paid vs Unpaid Internship Choice', scenario: 'Draft a contextual framing prompt listing personal financial parameters and long-term valuation metrics.', expectedKeywords: ['context', 'valuation', 'financial', 'tradeoffs'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 7, title: 'Confidence Building Plan', scenario: 'Use persona prompting to instruct AI to act as an empathetic executive coach preparing you for technical presentation.', expectedKeywords: ['persona', 'empathetic', 'coach', 'prep'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 8, title: 'Resume Focus Decision', scenario: 'Instruct AI to rewrite technical resume bullet points using the Google XYZ formula (Accomplished X by Y through Z).', expectedKeywords: ['formula', 'xyz', 'impact', 'metrics'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 9, title: 'Internship Role Selection', scenario: 'Construct a multi-attribute decision prompt evaluating early-stage vs series-A climate startups.', expectedKeywords: ['attributes', 'startup', 'stage', 'growth'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 10, title: 'Outreach Prioritisation', scenario: 'Draft a structured prompt generating a tiered contact matrix based on industry influence and responsiveness.', expectedKeywords: ['matrix', 'tiered', 'responsiveness', 'influence'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 11, title: 'Side Income Choice', scenario: 'Prompt AI to evaluate 3 freelancing niches using explicit context window boundaries and budget caps.', expectedKeywords: ['boundaries', 'context window', 'freelancing', 'niches'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 12, title: 'Scoring Improvement Plan', scenario: 'Ask AI to grade a given prompt and output a revised prompt with chain-of-thought rationale.', expectedKeywords: ['grade', 'rationale', 'revised prompt', 'feedback'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 13, title: 'Daily Schedule Design', scenario: 'Create a structured prompt enforcing strict time-boxing output in Markdown table format.', expectedKeywords: ['markdown table', 'time-boxing', 'schedule', 'strict'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 14, title: 'Freelancing Skill Fit', scenario: 'Prompt AI to audit a portfolio website against top Upwork AI consulting queries.', expectedKeywords: ['audit', 'portfolio', 'queries', 'gap analysis'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 15, title: 'Skill Depth vs Breadth', scenario: 'Construct a T-shaped skill assessment prompt asking for deep specialization vs generalist domain balance.', expectedKeywords: ['t-shaped', 'specialization', 'generalist', 'assessment'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 16, title: 'Core vs Non-Core Career Choice', scenario: 'Draft a structured prompt establishing core vs non-core career goal filters.', expectedKeywords: ['filters', 'core vs non-core', 'clarity', 'decision'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 17, title: 'Study-Life Balance', scenario: 'Use delimiters (```) to pass raw calendar data and instruct AI to identify free recovery blocks.', expectedKeywords: ['delimiters', 'calendar', 'recovery', 'blocks'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 18, title: 'Expense Planning for Studies', scenario: 'Prompt AI to build a parametric budget model in CSV format.', expectedKeywords: ['csv', 'parametric', 'budget', 'model'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 19, title: 'Monthly Expense Strategy', scenario: 'Instruct AI with step-by-step reasoning constraints to optimize fixed vs variable savings goals.', expectedKeywords: ['fixed vs variable', 'reasoning', 'optimization', 'savings'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 20, title: 'Internship Skill Alignment', scenario: 'Construct a prompt connecting coursework modules directly to target internship requirements.', expectedKeywords: ['alignment', 'modules', 'requirements', 'evidence'], bestScore: 0, attemptsLeft: 3, completed: false },
];

const LEVEL_3_CHAPTERS: Chapter[] = [
  { id: 1, title: 'Multi-Agent Climate Workflow', scenario: 'Design a multi-agent system prompt orchestrating a Sensor Agent, Data Sanitizer Agent, and Report Synthesizer Agent.', expectedKeywords: ['multi-agent', 'orchestration', 'roles', 'handoff'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 2, title: 'Few-Shot ESG Report Parser', scenario: 'Construct a zero-hallucination few-shot prompt parsing Scope 1-3 emissions from complex PDF text blocks.', expectedKeywords: ['few-shot', 'zero-hallucination', 'parsing', 'emissions'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 3, title: 'Chain-of-Thought Code Auditor', scenario: 'Enforce explicit <thinking> chain-of-thought blocks before outputting a security audit for a smart contract.', expectedKeywords: ['chain-of-thought', 'thinking', 'audit', 'security'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 4, title: 'Autonomous Task Decomposition', scenario: 'Prompt AI to break down a large software feature request into DAG (Directed Acyclic Graph) sub-tasks with dependency links.', expectedKeywords: ['dag', 'decomposition', 'dependencies', 'sub-tasks'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 5, title: 'Hallucination Mitigation Guardrails', scenario: 'Incorporate strict fallback rules (e.g. "If source facts are absent, respond exactly with UNKNOWN").', expectedKeywords: ['fallback', 'guardrails', 'strict', 'unknown'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 6, title: 'Dynamic Context Window Optimization', scenario: 'Design a prompt compression technique that distills 50,000 words into key state vectors without losing entity links.', expectedKeywords: ['compression', 'distill', 'state vectors', 'entities'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 7, title: 'Synthetic Data Generation Engine', scenario: 'Prompt AI to generate 100 realistic edge-case sensor anomaly JSON objects following a strict TypeScript type definition.', expectedKeywords: ['synthetic', 'edge-case', 'typescript', 'json'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 8, title: 'AI Persona Orchestration', scenario: 'Define a multi-perspective debate prompt between a Chief Sustainability Officer, CFO, and Lead Engineer.', expectedKeywords: ['debate', 'perspectives', 'cso', 'cfo'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 9, title: 'Conditional Reasoning Pipeline', scenario: 'Write an IF-THEN-ELSE branch prompt evaluating climate policy risk scenarios based on carbon tax thresholds.', expectedKeywords: ['if-then-else', 'conditional', 'branching', 'thresholds'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 10, title: 'Complex System Architecture Review', scenario: 'Construct a prompt evaluating microservices architecture against AWS Well-Architected Framework principles.', expectedKeywords: ['architecture', 'microservices', 'well-architected', 'review'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 11, title: 'Recursive Prompt Refinement', scenario: 'Prompt AI to critique its own previous output and iterate 3 times to produce a flawless policy executive brief.', expectedKeywords: ['critique', 'iterate', 'recursive', 'refinement'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 12, title: 'Multi-Modal Satellite Data Extractor', scenario: 'Create a prompt designed for multi-modal vision-language models to extract canopy cover metrics from satellite images.', expectedKeywords: ['vision-language', 'multi-modal', 'canopy', 'satellite'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 13, title: 'Real-Time Telemetry Summarizer', scenario: 'Draft a sliding-window prompt summarizing IoT wind turbine frequency anomalies in 15-second intervals.', expectedKeywords: ['sliding-window', 'telemetry', 'iot', 'anomalies'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 14, title: 'Policy Compliance Auditor', scenario: 'Instruct AI to cross-reference EU Corporate Sustainability Reporting Directive (CSRD) articles with corporate disclosures.', expectedKeywords: ['csrd', 'compliance', 'cross-reference', 'articles'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 15, title: 'Enterprise API Integration Scripting', scenario: 'Prompt AI to generate error-resilient Node.js wrapper code with exponential backoff for rate-limited REST APIs.', expectedKeywords: ['exponential backoff', 'node.js', 'wrapper', 'rate-limited'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 16, title: 'Edge Case Stress Tester', scenario: 'Prompt AI to act as an adversarial QA engineer testing a climate forecasting algorithm against extreme weather outliers.', expectedKeywords: ['adversarial', 'qa', 'edge-case', 'outliers'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 17, title: 'Automated Hypothesis Generator', scenario: 'Draft a scientific reasoning prompt generating testable hypotheses for ocean acidification mitigation.', expectedKeywords: ['hypothesis', 'scientific', 'testable', 'mitigation'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 18, title: 'Strategic Decision Matrix Engine', scenario: 'Construct a multi-objective optimization prompt balancing carbon offset ROI against social impact metrics.', expectedKeywords: ['multi-objective', 'optimization', 'carbon offset', 'roi'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 19, title: 'Cross-Disciplinary Knowledge Graph', scenario: 'Prompt AI to map connections between Transformer Attention heads and ecological food-web node dynamics.', expectedKeywords: ['knowledge graph', 'connections', 'transformer', 'ecological'], bestScore: 0, attemptsLeft: 3, completed: false },
  { id: 20, title: 'Production AI Safety Protocol', scenario: 'Build an end-to-end AI safety guardrail prompt preventing prompt injection and data exfiltration.', expectedKeywords: ['guardrail', 'safety', 'prompt injection', 'exfiltration'], bestScore: 0, attemptsLeft: 3, completed: false },
];

export const PromptMasterySection: React.FC<PromptMasterySectionProps> = ({ userState, onSendToast }) => {
  const [activeHeaderTab, setActiveHeaderTab] = useState<'lessons' | 'practice' | 'challenges' | 'achievements'>('lessons');
  const [selectedLevel, setSelectedLevel] = useState<number | null>(null);

  // Chapter tracking state per level
  const [level1Chapters, setLevel1Chapters] = useState<Chapter[]>(LEVEL_1_CHAPTERS);
  const [level2Chapters, setLevel2Chapters] = useState<Chapter[]>(LEVEL_2_CHAPTERS);
  const [level3Chapters, setLevel3Chapters] = useState<Chapter[]>(LEVEL_3_CHAPTERS);

  // Active Chapter Modal state
  const [activeChapter, setActiveChapter] = useState<{ level: number; chapter: Chapter } | null>(null);
  const [userPromptInput, setUserPromptInput] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [lastFeedback, setLastFeedback] = useState<{ score: number; message: string; keywordsFound: string[] } | null>(null);

  // Practice Playground / Sandbox State
  const [sandboxRole, setSandboxRole] = useState('Senior AI Systems Engineer');
  const [sandboxFormat, setSandboxFormat] = useState('Structured Markdown with Execution Steps');
  const [sandboxTemperature, setSandboxTemperature] = useState(0.4);
  const [sandboxPrompt, setSandboxPrompt] = useState('Act as a Senior Climate Risk Modeler. Evaluate the economic vulnerability of coastal power substations under a 1.5°C vs 2.5°C global warming trajectory. Structure your response with: 1) Asset Exposure Metrics, 2) Critical Thresholds, and 3) Immediate Grid Hardening Priorities.');
  const [sandboxOutput, setSandboxOutput] = useState<string | null>(null);
  const [isSandboxRunning, setIsSandboxRunning] = useState(false);
  const [sandboxAnalysis, setSandboxAnalysis] = useState<{ clarity: number; specificity: number; safety: number; recommendations: string[] } | null>(null);

  // Challenges State
  const [activeChallengeModal, setActiveChallengeModal] = useState<any | null>(null);
  const [challengeResponse, setChallengeResponse] = useState('');
  const [challengeFeedback, setChallengeFeedback] = useState<any | null>(null);
  const [isSubmittingChallenge, setIsSubmittingChallenge] = useState(false);

  const PROMPT_CHALLENGES = [
    {
      id: 'c1',
      title: 'Climate Anomaly Extraction Enforcer',
      tier: 'Intermediate',
      timeLimit: '4 mins',
      xpReward: 150,
      scenario: 'You are receiving unformatted sensor telemetry from 500 oceanic buoys. Construct a prompt enforcing strict JSON output conforming to { buoyId: string, timestamp: ISO, tempAnomalyCelsius: number, severity: "LOW" | "ELEVATED" | "CRITICAL" } with zero conversational markdown.',
      expectedKeywords: ['json', 'schema', 'anomaly', 'strict'],
      icon: Target,
      color: 'from-blue-600 to-cyan-600'
    },
    {
      id: 'c2',
      title: 'Anti-Hallucination Guardrail Protocol',
      tier: 'Advanced',
      timeLimit: '5 mins',
      xpReward: 200,
      scenario: 'Write a system prompt wrapper that instructs the model to refuse speculative carbon credit calculations unless verified empirical references are provided, citing specific error codes on failure.',
      expectedKeywords: ['guardrail', 'refuse', 'empirical', 'error code'],
      icon: ShieldCheck,
      color: 'from-purple-600 to-indigo-600'
    },
    {
      id: 'c3',
      title: 'Multi-Agent Workflow Decomposer',
      tier: 'Master',
      timeLimit: '8 mins',
      xpReward: 300,
      scenario: 'Draft a meta-prompt that orchestrates 3 autonomous agents (Data Ingestion Agent, Climate Policy Validator, and Executive Summarizer) with handoff protocols and conflict resolution rules.',
      expectedKeywords: ['agent', 'handoff', 'validator', 'protocol'],
      icon: Workflow,
      color: 'from-amber-600 to-rose-600'
    },
    {
      id: 'c4',
      title: 'Few-Shot In-Context Domain Tuner',
      tier: 'Pro',
      timeLimit: '6 mins',
      xpReward: 220,
      scenario: 'Construct a few-shot prompt with 3 distinct input/output calibration examples translating regulatory environmental jargon into actionable developer tickets.',
      expectedKeywords: ['few-shot', 'example', 'regulatory', 'ticket'],
      icon: Brain,
      color: 'from-emerald-600 to-teal-600'
    }
  ];

  // Get chapter list for active level
  const getChapterList = (level: number) => {
    if (level === 1) return level1Chapters;
    if (level === 2) return level2Chapters;
    return level3Chapters;
  };

  // Get completed count for level
  const getCompletedCount = (level: number) => {
    const list = getChapterList(level);
    return list.filter(c => c.completed).length;
  };

  const ACHIEVEMENTS_DATA = [
    {
      id: 'a1',
      title: 'Prompt Architecture Apprentice',
      desc: 'Complete at least 5 Beginner level prompt engineering chapters.',
      unlocked: getCompletedCount(1) >= 5,
      progress: Math.min(100, Math.round((getCompletedCount(1) / 5) * 100)),
      xp: 250,
      icon: MessageSquare,
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
    },
    {
      id: 'a2',
      title: 'Structured Prompt Craftsman',
      desc: 'Solve 10+ Intermediate level structured prompt scenarios.',
      unlocked: getCompletedCount(2) >= 10,
      progress: Math.min(100, Math.round((getCompletedCount(2) / 10) * 100)),
      xp: 500,
      icon: Layers,
      badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/40'
    },
    {
      id: 'a3',
      title: 'Multi-Step Workflow Orchestrator',
      desc: 'Conquer 10+ Advanced Level chapters involving chain-of-thought and decomposition.',
      unlocked: getCompletedCount(3) >= 10,
      progress: Math.min(100, Math.round((getCompletedCount(3) / 10) * 100)),
      xp: 750,
      icon: Workflow,
      badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/40'
    },
    {
      id: 'a4',
      title: 'Anti-Hallucination Shield',
      desc: 'Achieve a 90%+ score on 5 consecutive prompt evaluations.',
      unlocked: getCompletedCount(1) + getCompletedCount(2) + getCompletedCount(3) >= 15,
      progress: Math.min(100, Math.round(((getCompletedCount(1) + getCompletedCount(2) + getCompletedCount(3)) / 15) * 100)),
      xp: 600,
      icon: ShieldCheck,
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40'
    },
    {
      id: 'a5',
      title: 'Grandmaster Prompt Pioneer',
      desc: 'Complete all 60 Chapters across Beginner, Intermediate, and Advanced tiers.',
      unlocked: getCompletedCount(1) + getCompletedCount(2) + getCompletedCount(3) >= 60,
      progress: Math.min(100, Math.round(((getCompletedCount(1) + getCompletedCount(2) + getCompletedCount(3)) / 60) * 100)),
      xp: 1500,
      icon: Trophy,
      badgeColor: 'bg-rose-500/20 text-rose-400 border-rose-500/40'
    }
  ];

  const handleRunSandbox = () => {
    if (!sandboxPrompt.trim()) return;
    setIsSandboxRunning(true);
    setTimeout(() => {
      setIsSandboxRunning(false);
      setSandboxOutput(`[SYSTEM GENERATED RESPONSE • ROLE: ${sandboxRole.toUpperCase()}]\n\n### 1. Asset Exposure & Vulnerability Metrics\n• Sea-Level Inundation Risk: 1.5°C (+0.42m) vs 2.5°C (+0.88m peak surge).\n• Peak Thermal Derating: Substation transformers experience ~8.4% capacity drop under ambient spikes >42°C.\n• Floodplain Overlay: 24.3% of regional distribution nodes intersect 100-year flood lines.\n\n### 2. Critical Thresholds\n• Breaker Submersion: High-voltage switchgear fails at water level >0.15m.\n• Corrosive Salinity Index: Rapid degradation if salt spray exposure >15mg/m²/day.\n\n### 3. Immediate Grid Hardening Priorities\n1. Install modular perimeter hydrostatic barriers at coastal substations A-14 and B-09.\n2. Upgrade transformer dielectric cooling fluids to ester-based high-flashpoint alternatives.\n3. Deploy real-time SCADA telemetry with automated islanding routines upon flood alarm.`);
      setSandboxAnalysis({
        clarity: 96,
        specificity: 94,
        safety: 100,
        recommendations: [
          'Excellent role framing and clear numerical constraint boundaries.',
          'Consider adding negative constraints to prevent extrapolation beyond empirical historical flood records.',
          'Temperature parameter of 0.4 successfully kept the response deterministic and factual.'
        ]
      });
      if (onSendToast) {
        onSendToast('✨ Prompt Analyzed & Simulated Successfully!', 'success');
      }
    }, 750);
  };

  const handleTestChallenge = (ch: typeof PROMPT_CHALLENGES[0]) => {
    setActiveChallengeModal(ch);
    setChallengeResponse('');
    setChallengeFeedback(null);
  };

  const handleSubmitChallenge = () => {
    if (!activeChallengeModal || !challengeResponse.trim()) return;
    setIsSubmittingChallenge(true);
    setTimeout(() => {
      setIsSubmittingChallenge(false);
      const text = challengeResponse.toLowerCase();
      const expected: string[] = activeChallengeModal.expectedKeywords;
      const found = expected.filter((kw: string) => text.includes(kw.toLowerCase()));
      const score = Math.min(100, Math.round((found.length / expected.length) * 80 + (challengeResponse.length > 50 ? 20 : 10)));
      const isPassed = score >= 75;

      setChallengeFeedback({
        score,
        passed: isPassed,
        message: isPassed 
          ? `🌟 Outstanding execution! Your challenge response met the strict constraints and earned +${activeChallengeModal.xpReward} XP.`
          : '⚠️ Close attempt! Ensure all required schema tags, refusal guardrails, or handoff directives are explicitly stated.'
      });

      if (isPassed && onSendToast) {
        onSendToast(`🏆 Challenge "${activeChallengeModal.title}" Passed! +${activeChallengeModal.xpReward} XP!`, 'success');
      }
    }, 850);
  };

  // Handle opening chapter solver
  const handleSolveChapter = (level: number, chapter: Chapter) => {
    setActiveChapter({ level, chapter });
    setUserPromptInput('');
    setLastFeedback(null);
  };

  // Evaluate user prompt
  const handleEvaluatePrompt = () => {
    if (!activeChapter || !userPromptInput.trim()) return;

    setIsEvaluating(true);

    setTimeout(() => {
      const text = userPromptInput.toLowerCase();
      const expected = activeChapter.chapter.expectedKeywords;
      const found = expected.filter(kw => text.includes(kw.toLowerCase()));

      let score = Math.min(100, Math.round((found.length / expected.length) * 75 + (userPromptInput.length > 50 ? 25 : 10)));
      if (text.length < 20) score = Math.max(20, score - 30);

      let message = 'Great effort! Your prompt demonstrates clear context and task intent.';
      if (score >= 85) {
        message = '🌟 Outstanding Prompt! High structural clarity, role assignment, and precise instructions.';
      } else if (score >= 70) {
        message = '✅ Solid Prompt! Good contextual clarity. Try adding specific constraints or output formatting to reach 90%+!';
      } else {
        message = '💡 Good start! Add more specific details, desired output format, or role framing to improve your score.';
      }

      setLastFeedback({ score, message, keywordsFound: found });
      setIsEvaluating(false);

      // Update chapter state
      const isPassed = score >= 70;
      const updateList = (prev: Chapter[]) =>
        prev.map(c => {
          if (c.id === activeChapter.chapter.id) {
            return {
              ...c,
              bestScore: Math.max(c.bestScore, score),
              attemptsLeft: Math.max(0, c.attemptsLeft - 1),
              completed: c.completed || isPassed
            };
          }
          return c;
        });

      if (activeChapter.level === 1) setLevel1Chapters(updateList);
      else if (activeChapter.level === 2) setLevel2Chapters(updateList);
      else setLevel3Chapters(updateList);

      // Record in Central Learner Store
      try {
        const profile = getStoredLearnerProfile();
        const newRecord: PracticeAttemptRecord = {
          id: `pm-${Date.now()}`,
          topicId: `prompt-level-${activeChapter.level}-ch-${activeChapter.chapter.id}`,
          topicTitle: `Level ${activeChapter.level}: ${activeChapter.chapter.title}`,
          questionType: 'scenario',
          difficulty: activeChapter.level === 1 ? 'Beginner' : activeChapter.level === 2 ? 'Intermediate' : 'Advanced',
          score,
          passed: isPassed,
          skillsUpdated: ['prompt-engineering', 'nlp'],
          timestamp: 'Just now',
        };

        const updatedSkills = profile.skills.map(s => {
          if (s.id === 'prompt-engineering' || s.id === 'nlp') {
            return {
              ...s,
              currentLevel: Math.min(100, s.currentLevel + (isPassed ? 4 : 1)),
              evidenceCount: s.evidenceCount + 1,
              lastUpdated: 'Just now',
            };
          }
          return s;
        });

        saveStoredLearnerProfile({
          ...profile,
          skills: updatedSkills,
          practiceHistory: [newRecord, ...profile.practiceHistory],
        });
      } catch (err) {
        console.error('Error updating learner store from PromptMastery:', err);
      }

      if (isPassed && onSendToast) {
        onSendToast(`🎉 Chapter "${activeChapter.chapter.title}" Solved! +100 XP Earned!`, 'success');
      }
    }, 1000);
  };

  // Button background colors matching design in image
  const getButtonColor = (index: number) => {
    const colors = [
      'bg-[#3b82f6] hover:bg-[#2563eb]', // Royal Blue
      'bg-[#f59e0b] hover:bg-[#d97706]', // Yellow / Amber
      'bg-[#ec4899] hover:bg-[#db2777]', // Pink / Magenta
      'bg-[#a855f7] hover:bg-[#9333ea]', // Purple
      'bg-[#f97316] hover:bg-[#ea580c]', // Orange
      'bg-[#10b981] hover:bg-[#059669]', // Teal / Emerald
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      {/* Top Section Header & Navbar matching reference image */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#2563eb] p-6 sm:p-8 shadow-2xl text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 border-b border-white/20 pb-4 mb-6 relative z-10">
          {[
            { id: 'lessons' as const, label: 'LESSONS AVAILABLE' },
            { id: 'practice' as const, label: 'PRACTICE PROMPTS' },
            { id: 'challenges' as const, label: 'SKILL CHALLENGES' },
            { id: 'achievements' as const, label: 'ACHIEVEMENTS' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveHeaderTab(tab.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-black tracking-wider transition-all cursor-pointer ${
                activeHeaderTab === tab.id
                  ? 'bg-white text-indigo-900 shadow-lg scale-105'
                  : 'bg-white/10 hover:bg-white/20 text-white/90'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Header Title Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold mb-2 backdrop-blur-sm">
              <Brain className="w-4 h-4 text-cyan-300" />
              <span>Prompt Engineering Mastery Academy</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
              Master the Art of Prompt Engineering
            </h1>
            <p className="text-sm text-indigo-100 max-w-2xl mt-1 leading-relaxed">
              From foundational queries to multi-agent workflow decomposition. Solve interactive prompt challenges and earn verified badges.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 shrink-0">
            <Trophy className="w-8 h-8 text-amber-300" />
            <div>
              <span className="text-[10px] text-indigo-200 uppercase font-extrabold block">Total Mastery XP</span>
              <span className="text-xl font-black text-white">
                {(getCompletedCount(1) + getCompletedCount(2) + getCompletedCount(3)) * 100} PTS
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* TAB 1: LESSONS AVAILABLE */}
      {activeHeaderTab === 'lessons' && (
        <>
          {/* VIEW MODE 1: LEVEL OVERVIEW CARDS (When no level is selected) */}
          {selectedLevel === null && (
        <div className="space-y-8">
          {/* Level Badge Headers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* LEVEL 1 CARD - BEGINNER */}
            <div className="bg-[#0e1628] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden flex flex-col justify-between group hover:border-emerald-500/60 transition-all">
              <div className="space-y-4">
                {/* Level Tag & Icon */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-md">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black uppercase tracking-wider border border-emerald-500/30">
                    LEVEL 1
                  </span>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-black text-white">Beginner</h2>
                  <span className="text-xs font-bold text-emerald-400">Basic Prompts</span>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">
                  Learn the fundamentals of communicating with AI. Understand how to write clear, effective prompts that get useful responses.
                </p>

                {/* Bullet Points */}
                <ul className="space-y-2.5 pt-2">
                  {[
                    'Writing clear instructions',
                    'Asking the right questions',
                    'Understanding AI capabilities',
                    'Basic formatting & output control',
                  ].map((bullet, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs text-gray-200 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-gray-800/80 space-y-3">
                <div className="flex justify-between items-center text-xs text-gray-400 font-bold">
                  <span>Progress</span>
                  <span className="text-emerald-400">{getCompletedCount(1)} / 20 Tasks</span>
                </div>

                <button
                  onClick={() => setSelectedLevel(1)}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-black font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:scale-[1.02]"
                >
                  <span>Start Learning</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* LEVEL 2 CARD - INTERMEDIATE */}
            <div className="bg-[#0e1628] border border-blue-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden flex flex-col justify-between group hover:border-blue-500/60 transition-all">
              <div className="space-y-4">
                {/* Level Tag & Icon */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-md">
                    <Layers className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-black uppercase tracking-wider border border-blue-500/30">
                    LEVEL 2
                  </span>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-black text-white">Intermediate</h2>
                  <span className="text-xs font-bold text-blue-400">Structured Prompts</span>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">
                  Discover how structure transforms your prompts. Learn templates, persona techniques, and context framing for consistent results.
                </p>

                {/* Bullet Points */}
                <ul className="space-y-2.5 pt-2">
                  {[
                    'Prompt templates & patterns',
                    'Role & persona assignment',
                    'Context window management',
                    'Few-shot prompting techniques',
                  ].map((bullet, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs text-gray-200 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-gray-800/80 space-y-3">
                <div className="flex justify-between items-center text-xs text-gray-400 font-bold">
                  <span>Progress</span>
                  <span className="text-blue-400">{getCompletedCount(2)} / 20 Tasks</span>
                </div>

                <button
                  onClick={() => setSelectedLevel(2)}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:scale-[1.02]"
                >
                  <span>Start Learning</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* LEVEL 3 CARD - ADVANCED */}
            <div className="bg-[#0e1628] border border-purple-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden flex flex-col justify-between group hover:border-purple-500/60 transition-all">
              <div className="space-y-4">
                {/* Level Tag & Icon */}
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 shadow-md">
                    <Workflow className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-black uppercase tracking-wider border border-purple-500/30">
                    LEVEL 3
                  </span>
                </div>

                <div>
                  <h2 className="font-display text-2xl font-black text-white">Advanced</h2>
                  <span className="text-xs font-bold text-purple-400">Multi-step Prompts</span>
                </div>

                <p className="text-xs text-gray-300 leading-relaxed">
                  Chain complex reasoning across multiple steps. Build sophisticated workflows that handle nuanced, multi-part tasks with precision.
                </p>

                {/* Bullet Points */}
                <ul className="space-y-2.5 pt-2">
                  {[
                    'Chain-of-thought reasoning',
                    'Multi-step task decomposition',
                    'Iterative refinement loops',
                    'Conditional logic in prompts',
                  ].map((bullet, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs text-gray-200 font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-gray-800/80 space-y-3">
                <div className="flex justify-between items-center text-xs text-gray-400 font-bold">
                  <span>Progress</span>
                  <span className="text-purple-400">{getCompletedCount(3)} / 20 Tasks</span>
                </div>

                <button
                  onClick={() => setSelectedLevel(3)}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-purple-500 to-fuchsia-600 hover:from-purple-400 hover:to-fuchsia-500 text-white font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group-hover:scale-[1.02]"
                >
                  <span>Start Learning</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODE 2: CHAPTERS GRID VIEW (When a level is selected) */}
      {selectedLevel !== null && (
        <div className="space-y-8 animate-fadeIn">
          {/* Top Bar with Back Button and Level Details */}
          <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSelectedLevel(null)}
                className="p-2.5 rounded-2xl bg-[#141d33] hover:bg-[#1e2a47] text-gray-300 hover:text-white border border-gray-700 transition-all cursor-pointer flex items-center gap-2 text-xs font-extrabold shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <div>
                <h2 className="font-display text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <span>Level {selectedLevel} —</span>
                  <span className={selectedLevel === 1 ? 'text-emerald-400' : selectedLevel === 2 ? 'text-blue-400' : 'text-purple-400'}>
                    {selectedLevel === 1 ? 'Beginner' : selectedLevel === 2 ? 'Intermediate' : 'Advanced'}
                  </span>
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  {selectedLevel === 1 && '20 carefully crafted challenges to build your professional foundation — from networking to career clarity.'}
                  {selectedLevel === 2 && 'Master structured approaches to prompt design and professional context management.'}
                  {selectedLevel === 3 && 'Chain complex multi-step AI reasoning and advanced workflow execution.'}
                </p>
              </div>
            </div>

            {/* Top Right Badges */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5" />
                <span>Passed: {getCompletedCount(selectedLevel)}/20</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-black flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>Tasks: 20</span>
              </span>
            </div>
          </div>

          {/* Progress Card (YOUR PROGRESS) matching image 2 & 6 */}
          <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
            <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">
              YOUR PROGRESS
            </span>
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-3xl sm:text-4xl font-black text-white">
                {getCompletedCount(selectedLevel)} of 20 Completed
              </h3>
              <span className="text-3xl sm:text-4xl font-black text-emerald-400">
                {Math.round((getCompletedCount(selectedLevel) / 20) * 100)}%
              </span>
            </div>

            {/* Progress Bar Track */}
            <div className="w-full h-3 bg-[#141d33] rounded-full overflow-hidden border border-gray-800">
              <div
                className="h-full bg-gradient-to-r from-[#06b6d4] via-[#10b981] to-emerald-400 transition-all duration-500"
                style={{ width: `${(getCompletedCount(selectedLevel) / 20) * 100}%` }}
              />
            </div>
          </div>

          {/* Chapters Grid Header */}
          <div className="space-y-1">
            <span className="text-xs font-bold text-amber-500 tracking-wider uppercase block">
              — {selectedLevel === 1 ? 'THE DISCOVERY GRID' : selectedLevel === 2 ? 'THE INTERMEDIATE GRID' : 'THE ADVANCED GRID'}
            </span>
            <h2 className="font-display text-2xl font-black text-white">
              {selectedLevel === 1 ? '20 Chapters to Master' : selectedLevel === 2 ? 'Mastering the Nuance' : 'Architecting Complex AI Workflows'}
            </h2>
            <p className="text-xs text-gray-400">
              Each challenge is a stepping stone in your professional journey. Solve them to build real-world career skills.
            </p>
          </div>

          {/* Grid of 20 Chapter Cards matching design in uploaded images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {getChapterList(selectedLevel).map((chapter, index) => {
              const btnColor = getButtonColor(index);
              return (
                <div
                  key={chapter.id}
                  className={`bg-[#0e1628] border rounded-3xl p-5 shadow-xl space-y-4 transition-all hover:border-gray-600 flex flex-col justify-between ${
                    chapter.completed ? 'border-emerald-500/40 bg-[#0c1a2d]' : 'border-gray-800'
                  }`}
                >
                  <div className="space-y-3">
                    {/* Top Status Pill */}
                    <div className="flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${
                        chapter.completed
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${chapter.completed ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                        <span>{chapter.completed ? 'COMPLETED' : 'PENDING'}</span>
                      </span>

                      {chapter.completed && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      )}
                    </div>

                    {/* Chapter Number Badge & Title */}
                    <div className="flex items-start gap-3 pt-1">
                      <div className="w-8 h-8 rounded-full bg-[#141d33] border border-gray-700 font-black text-xs text-white flex items-center justify-center shrink-0">
                        {chapter.id}
                      </div>
                      <h4 className="font-extrabold text-white text-sm leading-snug pt-1">
                        {chapter.title}
                      </h4>
                    </div>

                    {/* Stats Table inside card matching images */}
                    <div className="grid grid-cols-2 gap-2 bg-[#121b30] p-3 rounded-2xl border border-gray-800/80 text-[10px]">
                      <div>
                        <span className="text-gray-400 font-semibold uppercase block">BEST SCORE</span>
                        <span className="font-extrabold text-white text-xs">{chapter.bestScore}</span>
                      </div>
                      <div>
                        <span className="text-gray-400 font-semibold uppercase block">ATTEMPTS LEFT</span>
                        <span className="font-extrabold text-white text-xs">{chapter.attemptsLeft}/3</span>
                      </div>
                      <div className="col-span-2 pt-1 border-t border-gray-800/60 flex items-center justify-between">
                        <span className="text-gray-400 font-semibold uppercase">RATING</span>
                        <span className={`font-extrabold text-xs ${chapter.completed ? 'text-emerald-400' : 'text-emerald-400'}`}>
                          {chapter.completed ? 'Mastered' : 'Progress'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Colorful Solve Button */}
                  <button
                    onClick={() => handleSolveChapter(selectedLevel, chapter)}
                    className={`w-full py-2.5 rounded-2xl ${btnColor} text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95`}
                  >
                    <span>{chapter.completed ? 'Review Solution' : 'Solve'}</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Bottom Transition Banner matching images 5 & 8 */}
          <div className="bg-[#0a0f1d] border border-gray-800 rounded-3xl p-10 text-center space-y-3 relative overflow-hidden shadow-2xl">
            <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest block">
              {selectedLevel === 1 ? 'LEVEL 2 AWAITS' : selectedLevel === 2 ? 'LEVEL 3 AWAITS' : 'PROMPT MASTERY COMPLETED'}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-black text-white">
              {selectedLevel === 1 && 'Ready to go beyond the basics?'}
              {selectedLevel === 2 && 'Ready to go beyond intermediate?'}
              {selectedLevel === 3 && 'Congratulations! You mastered all Prompt Engineering levels!'}
            </h2>
            <div className="w-12 h-1 bg-amber-500 mx-auto rounded-full mt-2" />

            <div className="pt-3">
              <button
                onClick={() => {
                  if (selectedLevel < 3) setSelectedLevel(selectedLevel + 1);
                  else setSelectedLevel(null);
                }}
                className="px-6 py-3 rounded-2xl bg-white hover:bg-gray-100 text-black font-extrabold text-xs shadow-lg transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <span>{selectedLevel < 3 ? `Advance to Level ${selectedLevel + 1}` : 'Return to All Levels'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
        </>
      )}

      {/* TAB 2: PRACTICE PROMPTS / SANDBOX PLAYGROUND */}
      {activeHeaderTab === 'practice' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Top Controls Grid */}
          <div className="bg-[#0e1628] border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-800 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase text-cyan-400 tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" /> PromptCraft Simulator & Optimizer
                </span>
                <h2 className="text-xl font-black text-white">Live AI Prompt Sandbox</h2>
              </div>

              {/* Template Presets */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-gray-400 font-bold">Quick Presets:</span>
                {[
                  { label: 'Role-Based', prompt: 'Act as a Senior Environmental Data Architect. Deconstruct the carbon intensity of GPU cluster inference across 4 regions with quantitative optimization strategies.' },
                  { label: 'Few-Shot', prompt: 'Convert natural language queries to structured search queries.\nExample 1: "high temp anomalies last week" -> query: anomaly(metric="temp", window="7d")\nExample 2: "solar farms in california above 50MW" -> query: asset(type="solar", state="CA", capacity_mw=">50")\nInput: "show wind speed dropouts offshore texas in august"' },
                  { label: 'Chain-of-Thought', prompt: 'Step 1: Identify all edge variables.\nStep 2: Calculate maximum thermal dissipation limit.\nStep 3: Recommend mitigation protocol.\nAnalyze a 15% coolant pump flow degradation in a 200MW battery storage facility.' },
                  { label: 'JSON Schema', prompt: 'Analyze the following environmental report and return STRICT JSON ONLY conforming to schema:\n{ "incidentId": string, "pollutant": string, "ppmValue": number, "actionRequired": boolean }' }
                ].map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSandboxPrompt(preset.prompt)}
                    className="px-2.5 py-1 rounded-lg bg-[#141d33] hover:bg-[#1f2c4d] text-cyan-300 text-xs font-bold border border-cyan-500/20 transition-all cursor-pointer"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Config Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1.5">Model Persona / Role</label>
                <select
                  value={sandboxRole}
                  onChange={(e) => setSandboxRole(e.target.value)}
                  className="w-full bg-[#10192d] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option>Senior AI Systems Engineer</option>
                  <option>Principal Climate Risk Modeler</option>
                  <option>Prompt Security & Red-Teaming Lead</option>
                  <option>Environmental Policy Auditor</option>
                  <option>Machine Learning Research Scientist</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-300 block mb-1.5">Output Format Target</label>
                <select
                  value={sandboxFormat}
                  onChange={(e) => setSandboxFormat(e.target.value)}
                  className="w-full bg-[#10192d] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:border-cyan-400 focus:outline-none"
                >
                  <option>Structured Markdown with Execution Steps</option>
                  <option>Strict JSON Object (No Conversational Wrapper)</option>
                  <option>Executive Bullet Summary</option>
                  <option>Python / TypeScript Code Block</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold text-gray-300">Temperature: {sandboxTemperature}</label>
                  <span className="text-[10px] text-gray-400">{sandboxTemperature <= 0.3 ? 'Deterministic' : sandboxTemperature >= 0.7 ? 'Creative' : 'Balanced'}</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="1.0"
                  step="0.1"
                  value={sandboxTemperature}
                  onChange={(e) => setSandboxTemperature(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Prompt Textarea */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-black uppercase text-gray-300 tracking-wider">Prompt Input Buffer</label>
                <span className="text-[11px] text-gray-400 font-mono">{sandboxPrompt.length} characters • ~{Math.ceil(sandboxPrompt.split(' ').length * 1.3)} tokens</span>
              </div>
              <textarea
                value={sandboxPrompt}
                onChange={(e) => setSandboxPrompt(e.target.value)}
                rows={5}
                className="w-full bg-[#080d1a] border border-gray-700 rounded-2xl p-4 text-xs font-mono text-cyan-200 focus:outline-none focus:border-cyan-400 placeholder:text-gray-600 shadow-inner"
                placeholder="Enter prompt instructions..."
              />
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Brain className="w-4 h-4 text-cyan-400" />
                <span>Simulated using Gemini-guided prompt analyzer</span>
              </div>

              <button
                onClick={handleRunSandbox}
                disabled={isSandboxRunning || !sandboxPrompt.trim()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                {isSandboxRunning ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin" />
                    <span>Analyzing & Running...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Run Simulation & Audit</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Sandbox Results & Metrics */}
          {sandboxOutput && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
              {/* Output Display */}
              <div className="lg:col-span-2 bg-[#0e1628] border border-gray-800 rounded-3xl p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                  <span className="text-xs font-extrabold text-white flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Simulated Model Output</span>
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(sandboxOutput);
                      if (onSendToast) onSendToast('Copied output to clipboard!', 'info');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#141d33] hover:bg-[#1f2c4d] text-gray-300 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </button>
                </div>

                <pre className="p-4 rounded-2xl bg-[#080d1a] border border-gray-800 text-xs font-mono text-gray-200 whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto">
                  {sandboxOutput}
                </pre>
              </div>

              {/* Prompt Quality Audit Card */}
              {sandboxAnalysis && (
                <div className="bg-[#0e1628] border border-cyan-500/30 rounded-3xl p-6 space-y-4 shadow-xl">
                  <span className="text-xs font-extrabold text-cyan-300 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Prompt Quality Audit</span>
                  </span>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-gray-300 mb-1">
                        <span>Instruction Clarity</span>
                        <span className="text-cyan-400">{sandboxAnalysis.clarity}%</span>
                      </div>
                      <div className="w-full bg-[#10192d] h-2 rounded-full overflow-hidden">
                        <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${sandboxAnalysis.clarity}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-gray-300 mb-1">
                        <span>Constraint Specificity</span>
                        <span className="text-emerald-400">{sandboxAnalysis.specificity}%</span>
                      </div>
                      <div className="w-full bg-[#10192d] h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${sandboxAnalysis.specificity}%` }} />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-gray-300 mb-1">
                        <span>Safety & Guardrail Health</span>
                        <span className="text-purple-400">{sandboxAnalysis.safety}%</span>
                      </div>
                      <div className="w-full bg-[#10192d] h-2 rounded-full overflow-hidden">
                        <div className="bg-purple-400 h-full rounded-full" style={{ width: `${sandboxAnalysis.safety}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-800 space-y-2">
                    <span className="text-[11px] font-bold text-gray-400 uppercase">Optimizer Recommendations:</span>
                    <ul className="space-y-1.5">
                      {sandboxAnalysis.recommendations.map((rec, i) => (
                        <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                          <span className="text-cyan-400 font-bold">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: SKILL CHALLENGES */}
      {activeHeaderTab === 'challenges' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-3xl bg-[#0e1628] border border-gray-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-rose-400" /> Timed Engineering Challenges
              </span>
              <h2 className="text-xl font-black text-white">Real-World Prompt Challenges</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Test your prompt engineering under real enterprise time limits and constraints.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-gray-300 font-bold">Total Available XP:</span>
              <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-500/30">
                870 XP
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROMPT_CHALLENGES.map((ch) => {
              const Icon = ch.icon;
              return (
                <div
                  key={ch.id}
                  className="bg-[#0e1628] border border-gray-800 hover:border-gray-700 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xl flex flex-col justify-between transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-2xl bg-gradient-to-r ${ch.color} text-white shadow-lg`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-black/40 text-gray-300 text-[11px] font-bold border border-gray-800">
                          ⏱️ {ch.timeLimit}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[11px] font-extrabold border border-amber-500/30">
                          +{ch.xpReward} XP
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-cyan-400 block">{ch.tier} Challenge</span>
                      <h3 className="text-lg font-black text-white">{ch.title}</h3>
                    </div>

                    <p className="text-xs text-gray-300 leading-relaxed font-medium">
                      {ch.scenario}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between">
                    <span className="text-[11px] text-gray-400 font-semibold">Strict Keywords Checked</span>
                    <button
                      onClick={() => handleTestChallenge(ch)}
                      className="px-5 py-2.5 rounded-xl bg-white hover:bg-gray-100 text-black font-extrabold text-xs shadow transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Take Challenge</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: ACHIEVEMENTS */}
      {activeHeaderTab === 'achievements' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="p-6 rounded-3xl bg-[#0e1628] border border-gray-800 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                <Trophy className="w-3.5 h-3.5" /> Prompt Mastery Credentials
              </span>
              <h2 className="text-xl font-black text-white">Verified Prompt Engineering Badges</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                Track your accomplishments as you master zero-shot, few-shot, and workflow automation.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 font-bold">Earned:</span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-black text-xs border border-emerald-500/30">
                {ACHIEVEMENTS_DATA.filter(a => a.unlocked).length} / {ACHIEVEMENTS_DATA.length} Badges
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACHIEVEMENTS_DATA.map((ach) => {
              const Icon = ach.icon;
              return (
                <div
                  key={ach.id}
                  className={`bg-[#0e1628] border rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between transition-all ${
                    ach.unlocked ? 'border-amber-500/40 bg-gradient-to-b from-[#10192d] to-[#0e1628]' : 'border-gray-800 opacity-80'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-2xl border ${ach.badgeColor}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        ach.unlocked ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-gray-800 text-gray-400'
                      }`}>
                        {ach.unlocked ? 'Unlocked ✅' : 'In Progress'}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-black text-white">{ach.title}</h4>
                      <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                        {ach.desc}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-gray-800">
                    <div className="flex justify-between items-center text-xs font-bold">
                      <span className="text-gray-400">Progress</span>
                      <span className={ach.unlocked ? 'text-emerald-400' : 'text-cyan-400'}>{ach.progress}%</span>
                    </div>
                    <div className="w-full bg-[#080d1a] h-2 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          ach.unlocked ? 'bg-emerald-400' : 'bg-cyan-400'
                        }`}
                        style={{ width: `${ach.progress}%` }}
                      />
                    </div>

                    <div className="flex justify-between items-center pt-1 text-[11px] text-gray-400">
                      <span>Reward Value</span>
                      <span className="text-amber-400 font-extrabold">+{ach.xp} XP</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* CHALLENGE SOLVER MODAL */}
      {activeChallengeModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveChallengeModal(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#0d162a] border border-amber-500/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-white overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-400 tracking-wider block">
                    Timed Challenge • {activeChallengeModal.tier} • {activeChallengeModal.timeLimit}
                  </span>
                  <h3 className="text-lg font-black text-white">{activeChallengeModal.title}</h3>
                </div>
              </div>

              <button
                onClick={() => setActiveChallengeModal(null)}
                className="p-1.5 text-gray-400 hover:text-white rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#121c33] border border-gray-800 rounded-2xl p-4 space-y-2">
              <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                <Target className="w-3.5 h-3.5" /> Challenge Scenario
              </span>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-medium">
                {activeChallengeModal.scenario}
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-extrabold text-gray-300 uppercase tracking-wider">
                Your Enterprise Prompt Solution:
              </label>
              <textarea
                value={challengeResponse}
                onChange={(e) => setChallengeResponse(e.target.value)}
                placeholder="Write your prompt strictly addressing the scenario requirements..."
                rows={5}
                className="w-full bg-[#080d1a] border border-gray-700 rounded-2xl p-4 text-xs font-mono text-cyan-200 focus:outline-none focus:border-amber-400 shadow-inner placeholder:text-gray-600"
              />
            </div>

            {challengeFeedback && (
              <div className={`p-4 rounded-2xl border space-y-2 animate-fadeIn ${
                challengeFeedback.passed
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
                  : 'bg-amber-500/10 border-amber-500/40 text-amber-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm flex items-center gap-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>Challenge Score: {challengeFeedback.score}/100</span>
                  </span>
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-black/40">
                    {challengeFeedback.passed ? 'PASSED ✅' : 'INCOMPLETE'}
                  </span>
                </div>
                <p className="text-xs leading-relaxed font-medium">{challengeFeedback.message}</p>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveChallengeModal(null)}
                className="px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold text-xs cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={handleSubmitChallenge}
                disabled={isSubmittingChallenge || !challengeResponse.trim()}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 disabled:opacity-50 text-white font-extrabold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                {isSubmittingChallenge ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin" />
                    <span>Evaluating Challenge...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit for XP</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* INTERACTIVE PROMPT PRACTICE & EVALUATION MODAL */}
      {activeChapter && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setActiveChapter(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-[#0d162a] border border-[#06b6d4]/50 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl text-white overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-[#06b6d4]/20 text-[#06b6d4] border border-[#06b6d4]/40">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-[#06b6d4] tracking-wider block">
                    Level {activeChapter.level} • Chapter {activeChapter.chapter.id}
                  </span>
                  <h3 className="font-display text-lg font-black text-white">
                    {activeChapter.chapter.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setActiveChapter(null)}
                className="p-1.5 text-gray-400 hover:text-white rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scenario Description */}
            <div className="bg-[#121c33] border border-gray-800 rounded-2xl p-4 space-y-2">
              <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-wider block flex items-center gap-1">
                <Target className="w-3.5 h-3.5" /> Scenario & Objective
              </span>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed font-medium">
                {activeChapter.chapter.scenario}
              </p>
            </div>

            {/* Input Box */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-extrabold text-gray-300 uppercase tracking-wider">
                  Write Your Custom AI Prompt Below:
                </label>
                <span className="text-[11px] text-gray-400 font-semibold">
                  Attempts Left: {activeChapter.chapter.attemptsLeft}/3
                </span>
              </div>

              <textarea
                value={userPromptInput}
                onChange={(e) => setUserPromptInput(e.target.value)}
                placeholder="Act as a Senior Research Strategist... Write clear context, target outcome, and output format..."
                rows={5}
                className="w-full bg-[#080d1a] border border-gray-700 rounded-2xl p-4 text-xs font-mono text-cyan-200 focus:outline-none focus:border-[#06b6d4] shadow-inner placeholder:text-gray-600"
              />
            </div>

            {/* Evaluation Results Banner */}
            {lastFeedback && (
              <div className={`p-4 rounded-2xl border space-y-2 animate-fadeIn ${
                lastFeedback.score >= 70
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
                  : 'bg-amber-500/10 border-amber-500/40 text-amber-200'
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-sm flex items-center gap-2">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>Prompt Evaluation Score: {lastFeedback.score}/100</span>
                  </span>
                  <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-black/40">
                    {lastFeedback.score >= 70 ? 'Passed ✅' : 'Try Again'}
                  </span>
                </div>

                <p className="text-xs leading-relaxed font-medium">
                  {lastFeedback.message}
                </p>

                {lastFeedback.keywordsFound.length > 0 && (
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400">Detected Elements:</span>
                    <div className="flex flex-wrap gap-1">
                      {lastFeedback.keywordsFound.map((kw, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-black/40 text-[10px] font-bold text-cyan-300 border border-cyan-500/30">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Footer */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setActiveChapter(null)}
                className="px-4 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold text-xs cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={handleEvaluatePrompt}
                disabled={isEvaluating || !userPromptInput.trim()}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#06b6d4] to-[#10b981] hover:from-[#0891b2] hover:to-[#059669] disabled:opacity-50 text-black font-extrabold text-xs shadow-lg transition-all flex items-center gap-2 cursor-pointer"
              >
                {isEvaluating ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin" />
                    <span>Evaluating Prompt...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Evaluate & Submit</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
