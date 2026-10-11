import { Track, Quiz, CommunityProject, LeaderboardUser } from '../types';

export const TRACKS: Track[] = [
  {
    id: 'aiTrack',
    name: 'AI Innovation Track',
    tagline: 'Master core AI concepts, data handling, and predictive logic',
    iconName: 'Cpu',
    badge: 'AI Innovator',
    description: 'Build a solid foundation in Artificial Intelligence. Learn how neural networks learn from data, process language, detect patterns, and predict environmental outcomes responsibly.',
    modules: [
      {
        id: 'ai-mod-1',
        title: '1. What is Artificial Intelligence?',
        description: 'Explore what AI really is, how it differs from traditional computing, and understand Narrow AI vs. AGI.',
        duration: '15 mins',
        difficulty: 'Beginner',
        category: 'AI',
        tier: 1,
        prerequisites: [],
        keyTakeaways: [
          'AI can learn and improve from experience without explicit step-by-step programming',
          'Narrow AI excels at specific tasks like image recognition or language translation',
          'AI systems rely on algorithms and mathematical optimization to detect patterns'
        ],
        contentSections: [
          {
            heading: 'Understanding AI Capabilities',
            body: 'Unlike standard software programs that strictly follow predefined rules, Artificial Intelligence (AI) uses mathematical models and statistical patterns to learn from vast amounts of data and generalize to unseen scenarios.',
            keyConcept: 'Artificial Intelligence = Algorithms + Data + Processing Power'
          },
          {
            heading: 'Narrow AI vs. General AI',
            body: 'Today, all operational AI is Narrow AI (Weak AI) — designed for specific domains like climate modeling, chess playing, or medical diagnosis. Artificial General Intelligence (AGI) remains theoretical.',
            codeSnippet: `// Example: Rule-based vs Learning-based approach
// Traditional Rule-Based
if (temperature > 30) { status = "hot"; }

// AI Machine Learning Model
const predictedTemp = aiModel.predict(carbonEmissions, solarRadiation, humidity);`
          }
        ]
      },
      {
        id: 'ai-mod-2',
        title: '2. The Role of Data in AI Systems',
        description: 'Understand data quality, preprocessing, and why "Garbage in, garbage out" governs AI accuracy.',
        duration: '20 mins',
        difficulty: 'Beginner',
        category: 'AI',
        tier: 2,
        prerequisites: ['ai-mod-1'],
        keyTakeaways: [
          'High-quality, unbiased training data is the foundation of trustworthy AI',
          'Data cleaning and normalization directly impact model performance',
          'AI uses features and labels to construct predictive representations'
        ],
        contentSections: [
          {
            heading: 'Garbage In, Garbage Out (GIGO)',
            body: 'If an AI model is trained on corrupted, biased, or incomplete environmental datasets, its predictions will produce flawed conclusions regardless of model complexity.',
            keyConcept: 'Data Quality > Algorithm Complexity'
          },
          {
            heading: 'Features & Targets in Climate AI',
            body: 'In environmental modeling, features include CO2 levels, sea temperature, and forest cover, while targets might be global warming rate or rainfall probability.'
          }
        ]
      },
      {
        id: 'ai-mod-3',
        title: '3. Pattern Recognition & Clustering',
        description: 'Learn how AI discovers hidden structures and groups data without human supervision.',
        duration: '25 mins',
        difficulty: 'Intermediate',
        category: 'AI',
        tier: 3,
        prerequisites: ['ai-mod-2'],
        keyTakeaways: [
          'Unsupervised learning uses algorithms like K-Means to find natural groupings',
          'Clustering helps group geographic regions with similar ecological risk factors',
          'Anomaly detection identifies unusual climate events or illegal deforestation'
        ],
        contentSections: [
          {
            heading: 'Discovering Unseen Clusters',
            body: 'Clustering algorithms measure distances between data points in multi-dimensional space to identify natural communities or environmental threat zones automatically.',
            keyConcept: 'Unsupervised AI discovers patterns without labeled ground truth'
          }
        ]
      },
      {
        id: 'ai-mod-4',
        title: '4. Conversational AI & Natural Language Processing',
        description: 'Discover how AI interprets human text, sentiment, and communicates intelligently.',
        duration: '20 mins',
        difficulty: 'Intermediate',
        category: 'AI',
        tier: 3,
        prerequisites: ['ai-mod-2'],
        keyTakeaways: [
          'Large Language Models (LLMs) predict token probabilities to generate fluent responses',
          'Sentiment analysis classifies text as positive, negative, or urgent',
          'NLP transforms unstructured policy documents into structured insights'
        ],
        contentSections: [
          {
            heading: 'Decoding Text Sentiment',
            body: 'Natural Language Processing breaks sentences into tokens and embeddings to assess community sentiments toward sustainability policies.'
          }
        ]
      },
      {
        id: 'ai-mod-5',
        title: '5. Predictive AI & Sustainability Forecasting',
        description: 'Build predictive AI concepts for energy consumption and carbon emissions forecasting.',
        duration: '30 mins',
        difficulty: 'Advanced',
        category: 'Cross-Disciplinary',
        tier: 4,
        prerequisites: ['ai-mod-3', 'env-mod-1'],
        keyTakeaways: [
          'Time-series forecasting models future climate trends based on historical sequences',
          'Feature importance reveals key drivers of environmental degradation',
          'AI simulations optimize renewable energy grid distribution'
        ],
        contentSections: [
          {
            heading: 'Simulating Eco Outcomes',
            body: 'Predictive models evaluate scenarios — such as increasing solar adoption by 25% — to forecast exact metric tons of CO2 prevented.'
          }
        ]
      }
    ]
  },
  {
    id: 'envTrack',
    name: 'Environmental Innovation Track',
    tagline: 'Apply AI tools to real-world climate, energy, and conservation challenges',
    iconName: 'Leaf',
    badge: 'Eco Innovator',
    description: 'Transform sustainability through intelligent technology. Learn how environmental datasets, satellite vision, and AI monitoring safeguard ecosystems and accelerate green energy transitions.',
    modules: [
      {
        id: 'env-mod-1',
        title: '1. Environmental Data & Carbon Metrics',
        description: 'Measure greenhouse gas emissions, energy footprints, and ecological indicators with data science.',
        duration: '15 mins',
        difficulty: 'Beginner',
        category: 'Environmental',
        tier: 1,
        prerequisites: [],
        keyTakeaways: [
          'Scope 1, 2, and 3 emissions encompass direct and indirect corporate carbon footprints',
          'Sensor networks stream real-time air and water quality measurements',
          'Standardized reporting enables transparent sustainability tracking'
        ],
        contentSections: [
          {
            heading: 'Quantifying Environmental Footprints',
            body: 'Understanding carbon equivalencies (CO2e) allows researchers to compare methane, nitrous oxide, and carbon dioxide emissions on a unified scale.',
            keyConcept: 'Carbon Neutrality requires precise real-time measurement'
          }
        ]
      },
      {
        id: 'env-mod-2',
        title: '2. Sustainability Dashboard Design',
        description: 'Design intuitive dashboards for real-time energy, water, and waste visualization.',
        duration: '20 mins',
        difficulty: 'Intermediate',
        category: 'Environmental',
        tier: 2,
        prerequisites: ['env-mod-1'],
        keyTakeaways: [
          'Visual hierarchy guides stakeholder decision-making toward high-impact actions',
          'Interactive sliders enable real-time goal planning and scenario modeling',
          'Data transparency builds public trust in green initiatives'
        ],
        contentSections: [
          {
            heading: 'Actionable Eco Dashboards',
            body: 'Effective dashboards combine macro KPIs (total CO2 reduced) with micro insights (hourly grid renewable efficiency).'
          }
        ]
      },
      {
        id: 'env-mod-3',
        title: '3. Satellite Vision & Deforestation Monitoring',
        description: 'Use AI computer vision to process satellite imagery for forest protection.',
        duration: '25 mins',
        difficulty: 'Advanced',
        category: 'Cross-Disciplinary',
        tier: 4,
        prerequisites: ['ai-mod-3', 'env-mod-2'],
        keyTakeaways: [
          'Convolutional Neural Networks (CNNs) detect illegal logging in near real-time',
          'Multispectral imaging reveals crop health and soil moisture deficits',
          'Automated alerts empower ranger response teams before forest loss escalates'
        ],
        contentSections: [
          {
            heading: 'AI-Powered Earth Observation',
            body: 'By analyzing daily satellite imagery layers, AI models flag vegetation canopy changes with 94%+ accuracy.'
          }
        ]
      }
    ]
  }
];

export const QUIZZES: Quiz[] = [
  {
    id: 'ai-basics-quiz',
    title: 'AI Concepts & Machine Learning Basics',
    description: 'Test your understanding of core AI definitions, training data requirements, and pattern recognition.',
    category: 'AI',
    badgeEarned: 'AI Fundamentals Certified',
    questions: [
      {
        id: 'q1',
        question: 'What fundamentally distinguishes an AI system from a traditional computer program?',
        options: [
          'AI can learn and improve performance from data experience without explicit rule coding',
          'AI only operates on high-end supercomputers and smartphones',
          'AI never consumes electrical power during model training',
          'AI executes hardcoded IF-THEN statements exclusively'
        ],
        correctAnswer: 0,
        explanation: 'AI models learn statistical patterns from data rather than relying purely on pre-written, rigid IF-THEN rules.'
      },
      {
        id: 'q2',
        question: 'What does the principle "Garbage in, garbage out" mean for AI systems?',
        options: [
          'AI algorithms automatically clean up physical garbage in cities',
          'Flawed or poor-quality input data directly causes inaccurate AI predictions',
          'AI hardware generates excessive physical electronic waste',
          'AI systems ignore bad data and always achieve 100% accuracy'
        ],
        correctAnswer: 1,
        explanation: 'Model performance is bounded by dataset quality — bad data leads to bad predictions.'
      },
      {
        id: 'q3',
        question: 'Which AI branch discovers natural groupings in unlabeled datasets?',
        options: [
          'Supervised Classification',
          'Unsupervised Clustering',
          'Rule-based Expert Systems',
          'Manual Spreadsheet Filtering'
        ],
        correctAnswer: 1,
        explanation: 'Unsupervised learning (like K-Means clustering) identifies natural patterns and groupings without predefined labels.'
      }
    ]
  },
  {
    id: 'env-quiz',
    title: 'Environmental Data & Sustainability Analysis',
    description: 'Evaluate your knowledge on carbon footprint calculation, satellite monitoring, and renewable grid optimization.',
    category: 'Environmental',
    badgeEarned: 'Eco Data Analyst Certified',
    questions: [
      {
        id: 'eq1',
        question: 'Why are satellite imagery and computer vision crucial for deforestation monitoring?',
        options: [
          'They allow near real-time coverage over massive, remote forest regions',
          'They require manual human inspection of every tree individual photo',
          'Satellites can physically stop loggers without ranger intervention',
          'Computer vision cannot process image pixel data'
        ],
        correctAnswer: 0,
        explanation: 'Satellites paired with AI computer vision scan vast wilderness areas continuously, detecting canopy changes immediately.'
      },
      {
        id: 'eq2',
        question: 'How does predictive AI help optimize smart power grids?',
        options: [
          'By forecasting renewable solar/wind output and matching energy supply with demand',
          'By shutting off electricity to all cities at night',
          'By increasing fossil fuel burning automatically',
          'By eliminating the need for electrical wires'
        ],
        correctAnswer: 0,
        explanation: 'Predictive models forecast renewable generation spikes and consumer load to minimize fossil fuel backup reliance.'
      }
    ]
  },
  {
    id: 'comm-ethics-quiz',
    title: 'AI Ethics, Bias & Communication Practice',
    description: 'Assess responsible AI practices, bias mitigation, and professional sustainability communication.',
    category: 'Ethics & Practice',
    badgeEarned: 'Responsible AI Practitioner',
    questions: [
      {
        id: 'eth1',
        question: 'Why is ethics and bias mitigation critical in environmental and social AI applications?',
        options: [
          'To ensure AI resources and decisions are distributed fairly across all human populations',
          'Because AI models are immune to bias naturally',
          'To make model training slower on purpose',
          'Ethics only applies to social media apps'
        ],
        correctAnswer: 0,
        explanation: 'Responsible AI ensures environmental benefits and AI solutions treat all communities equitably without systemic bias.'
      }
    ]
  }
];

export const COMMUNITY_PROJECTS: CommunityProject[] = [
  {
    id: 'proj-1',
    title: 'EcoGrid AI: Neural Network for Solar Output Prediction',
    author: 'Elena Rostova',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    category: 'Renewable Energy',
    likes: 342,
    description: 'Developed an LSTM time-series model predicting rooftop solar output 24 hours in advance using meteorological API feeds.',
    tags: ['TensorFlow', 'Solar Energy', 'Python', 'Climate AI']
  },
  {
    id: 'proj-2',
    title: 'CanopyWatch: Deforestation Alert System via Sentinel-2',
    author: 'Arjun Mehta',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    category: 'Conservation',
    likes: 289,
    description: 'Computer vision pipeline detecting illegal road construction in rainforest satellite feeds with instant Telegram alerts.',
    tags: ['Computer Vision', 'PyTorch', 'GIS', 'Satellite']
  },
  {
    id: 'proj-3',
    title: 'Urban Heat Island Predictor & Green Canopy Planner',
    author: 'Sarah Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    category: 'Urban Sustainability',
    likes: 412,
    description: 'Interactive map calculating micro-climate temperatures in city zones to recommend optimal tree planting locations.',
    tags: ['React', 'Machine Learning', 'GeoJSON', 'Climate Action']
  }
];

export const LEADERBOARD: LeaderboardUser[] = [
  {
    rank: 1,
    name: 'Maya Lin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    points: 2450,
    trackCompleted: 'AI + Environmental Master',
    badges: ['AI Innovator', 'Eco Innovator', 'Quiz Champion']
  },
  {
    rank: 2,
    name: 'Carlos Rivera',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    points: 2180,
    trackCompleted: 'AI Track',
    badges: ['AI Innovator', 'Responsible AI']
  },
  {
    rank: 3,
    name: 'Aisha Kwame',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    points: 1940,
    trackCompleted: 'Environmental Track',
    badges: ['Eco Innovator', 'Community Hero']
  },
  {
    rank: 4,
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    points: 1720,
    trackCompleted: 'AI Track',
    badges: ['AI Fundamentals']
  }
];
