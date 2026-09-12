import { Project, ExperienceItem, CertificationItem } from '../types';

export const PROFILE_INFO = {
  name: 'Ryo Kitano',
  handle: 'ryo.kitano',
  profileImage: '/profile2.jpg',
  profileImageHorizontal: '/profile-horizontal.jpg',
  profileImageFallback: '/profile.jpg',
  resumeUrl: '/Ryo_Kitano_AI_ML_Resume.pdf',
  resumeFilename: 'Ryo_Kitano_AI_ML_Resume.pdf',
  title: 'Jr AI/ML Engineer | Mathematics @ University of Waterloo',
  bio: 'My interests span machine learning, cryptography, and mathematical optimization. I have hands-on experience developing computer vision systems, LLM-powered applications, model-routing architectures, and data-driven products. I particularly enjoy translating research ideas and mathematical concepts into tools that solve real-world problems.',
  status: 'AVAILABLE FOR WINTER 2026 CO-OP',
  location: 'Waterloo, ON',
  workPreference: 'Remote / Hybrid OK',
  institution: 'University of Waterloo',
  phone: '548-384-6021',
  email: 'rkitano@uwaterloo.ca',
  emailSecondary: 'rkitano0326@gmail.com',
  github: 'https://github.com/Ryo0326-hub',
  linkedin: 'https://linkedin.com/in/ryo-kitano',
  linkedinCertifications: 'https://www.linkedin.com/in/ryo-kitano/details/certifications/',
  education: {
    school: 'University of Waterloo',
    location: 'Waterloo, ON',
    degree: 'Bachelor of Mathematics, Honours, Co-operative Program',
    period: 'Sep. 2024 – May 2029',
    coursework: [
      'Optimization',
      'Probability',
      'Statistics',
      'Linear Algebra II',
      'Combinatorics',
      'Graph Theory',
      'Network Flow Theory',
      'Algorithm Design & Data Abstraction'
    ]
  },
  technicalSkills: {
    languages: ['Python', 'Java', 'SQL', 'C (working knowledge)', 'TypeScript/JavaScript (exposure)'],
    aiMl: [
      'Machine/Deep Learning',
      'PyTorch',
      'scikit-learn',
      'Hugging Face Transformers',
      'LLMs',
      'RAG/Vector Search',
      'Prompt Engineering',
      'Agentic/Multi-Agent Systems',
      'MCP/Tool Calling',
      'Computer Vision',
      'Responsible AI',
      'LLM Evaluation'
    ],
    frameworksData: [
      'TensorFlow/Keras',
      'OpenAI API',
      'FastAPI',
      'React',
      'Next.js',
      'PostgreSQL/pgvector',
      'Pinecone',
      'pandas',
      'NumPy',
      'Matplotlib',
      'Jupyter',
      'REST APIs'
    ],
    mlOpsTools: [
      'Docker',
      'GitHub Actions (CI/CD)',
      'AWS',
      'Vercel',
      'Render',
      'Linux',
      'Git/GitHub',
      'Azure',
      'GCP',
      'Kubernetes (working knowledge)'
    ]
  },
  focusAreas: [
    {
      id: 'FOCUS_01',
      title: 'Agentic Systems & MCP',
      keywords: 'Alpaca MCP / Qwen / Tool Calling'
    },
    {
      id: 'FOCUS_02',
      title: 'Deterministic Trading & Opt.',
      keywords: 'Kraken API / Backtesting / Risk Controls'
    }
  ],
  socialIndices: [
    {
      id: 'github',
      icon: 'code',
      title: 'github.com/Ryo0326-hub',
      subtitle: 'Source repos, agent code, quant engines',
      url: 'https://github.com/Ryo0326-hub',
      arrowType: 'external'
    },
    {
      id: 'linkedin',
      icon: 'network',
      title: 'linkedin.com/in/ryo-kitano',
      subtitle: 'Professional updates & certifications',
      url: 'https://linkedin.com/in/ryo-kitano',
      arrowType: 'external'
    },
    {
      id: 'email',
      icon: 'at',
      title: 'rkitano@uwaterloo.ca',
      subtitle: 'Official university contact dispatch',
      url: 'mailto:rkitano@uwaterloo.ca',
      arrowType: 'modal'
    }
  ]
};

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'neural-point-analytica',
    title: 'Co-Founder & Technical Lead',
    type: 'FOUNDING',
    period: 'Mar. 2026 – Present',
    company: 'Neural Point Analytica (NPA)',
    location: 'Remote / Japan',
    workMode: 'Remote',
    description: 'Co-founded a 3-person software company and lead full-stack engineering for an NDA-protected enterprise workflow platform, securing its first US$1.5K/month recurring client contract.',
    bullets: [
      'Co-founded a 3-person software company and lead engineering for an NDA-protected enterprise workflow platform; secured its first recurring client contract worth **US$1.5K/month**.',
      'Lead architecture and delivery of auditable RFQ intake, quotation, reconciliation, and reporting workflows using **Next.js**, **TypeScript**, **PostgreSQL**, and **AWS**; turn client feedback into staged releases with **Docker** and **GitHub Actions**.'
    ],
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker', 'GitHub Actions', 'Enterprise Workflows']
  },
  {
    id: 'aistgroup',
    title: 'Java Backend & Computer Vision Engineer Intern',
    type: 'INTERNSHIP',
    period: 'May 2026 – Aug. 2026',
    company: 'AISTGroup LLC',
    location: 'Remote / Baku, Azerbaijan',
    workMode: 'Remote',
    description: 'Delivered Spring Boot REST APIs with transactional outbox messaging and trained a 0.871 mAP@50 YOLO26-s + EfficientNet-B0 computer vision pipeline for road sign detection.',
    bullets: [
      'Delivered **Spring Boot REST APIs** for invoice, receipt, and file workflows in a 5-engineer team, spanning JPA entities, validation, localization, Liquibase migrations, and JUnit tests.',
      'Implemented encrypted SMTP configuration and a **transactional outbox** that decoupled receipt delivery from API requests and enabled retryable asynchronous processing; hardened behavior through code review and tests.',
      'Owned data preparation, training, and evaluation for a **YOLO26-s + EfficientNet-B0** pipeline using 41.9K images and 180K annotated signs; achieved **0.871 mAP@50** detection and **89.0% Top-1 classification** across 154 sign classes.'
    ],
    tags: ['Java', 'Spring Boot', 'JPA', 'Liquibase', 'JUnit', 'Computer Vision', 'YOLO26-s', 'EfficientNet-B0', 'PyTorch']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'thetatrap',
    title: 'ThetaTrap',
    tagline: 'MCP-native paper-options agent with deterministic Python controls that lock candidates, strikes, sizing, and max loss before LLM tool use.',
    category: 'AGENTIC & FINTECH',
    filterCategory: 'agentic',
    period: 'Aug. 2026 – Sep. 2026',
    image: 'https://opengraph.githubassets.com/1/Ryo0326-hub/agent-apple',
    hasImage: true,
    githubUrl: 'https://github.com/Ryo0326-hub/agent-apple',
    badges: {
      event: 'Alpaca AI Trading Hackathon',
      organization: 'GitHub',
      actionText: 'GitHub Repo',
      actionUrl: 'https://github.com/Ryo0326-hub/agent-apple'
    },
    graphicType: 'thetatrap',
    graphicBadge: {
      icon: 'dot',
      label: 'DETERMINISTIC PYTHON CONTROLS'
    },
    tags: ['Python', 'Qwen', 'Alpaca MCP', 'SQLite', 'Options Greeks'],
    metrics: [
      { label: 'Unit / Replay Tests', value: '191 Passed' },
      { label: 'Mutation Replays', value: '5/5 Passed' },
      { label: 'Control Layer', value: 'Deterministic' },
      { label: 'Tool Protocol', value: 'Alpaca MCP' }
    ],
    details: [
      'Independently built and deployed an MCP-native paper-options agent with deterministic Python controls that locked candidates, strikes, sizing, and max loss before LLM tool use.',
      'Passed 191 tests and 5/5 mutation-free replays across earnings events and market volatility regimes.',
      'Enforced bounded risk parity parameters and verified fill execution with idempotent SQLite logging.'
    ],
    bullets: [
      'Independently built and deployed an MCP-native paper-options agent with deterministic Python controls that locked candidates, strikes, sizing, and max loss before LLM tool use; passed 191 tests and 5/5 mutation-free replays.'
    ]
  },
  {
    id: 'kraken-knight',
    title: 'Kraken Knight',
    tagline: 'Deterministic BTC/CAD trading strategy backtested on 4.63M historical Kraken trades and deployed live with fail-closed risk controls.',
    category: 'AGENTIC & FINTECH',
    filterCategory: 'agentic',
    period: 'Aug. 2026 – Sep. 2026',
    image: 'https://opengraph.githubassets.com/1/Ryo0326-hub/kraken-knight',
    hasImage: true,
    githubUrl: 'https://github.com/Ryo0326-hub/kraken-knight',
    badges: {
      event: 'Algorithmic Trading',
      organization: 'GitHub',
      actionText: 'GitHub Repo',
      actionUrl: 'https://github.com/Ryo0326-hub/kraken-knight'
    },
    graphicType: 'gradient-map',
    graphicBadge: {
      icon: 'trend',
      label: 'LIVE AUTHENTICATED ORDERS'
    },
    tags: ['Python', 'Kraken API', 'SQLite', 'systemd', 'Quant Trading'],
    metrics: [
      { label: 'Backtest Trades', value: '4.63M' },
      { label: 'Execution', value: 'Live Authenticated' },
      { label: 'Audit Logging', value: 'Idempotent' },
      { label: 'Service Daemon', value: 'systemd' }
    ],
    details: [
      'Backtested a deterministic BTC/CAD strategy on 4.63M historical Kraken trades, validated it through shadow trading, then deployed live execution.',
      'Engineered authenticated order routing, fill reconciliation, idempotent audit logs, and fail-closed risk controls.',
      'Configured persistent SQLite state management and supervisory systemd daemon on Linux for continuous uptime.'
    ],
    bullets: [
      'Backtested a deterministic BTC/CAD strategy on 4.63M historical Kraken trades, validated it through shadow trading, then deployed live execution with authenticated orders, fill reconciliation, idempotent audit logs, and fail-closed risk controls.'
    ]
  },
  {
    id: 'hybrid-token-routing',
    title: 'Hybrid Token-Efficient Routing Agent',
    tagline: 'Dual-tier router trained on 360 task outcomes to route between quantized Qwen2.5-1.5B and hosted LLMs under a strict 2-vCPU / 4-GB budget.',
    category: 'AGENTIC & FINTECH',
    filterCategory: 'agentic',
    period: 'Jul. 2026',
    image: 'https://opengraph.githubassets.com/1/Ryo0326-hub/GP-AI-agent',
    hasImage: true,
    githubUrl: 'https://github.com/Ryo0326-hub/GP-AI-agent',
    badges: {
      event: 'AMD Hackathon',
      organization: 'GitHub',
      actionText: 'GitHub Repo',
      actionUrl: 'https://github.com/Ryo0326-hub/GP-AI-agent'
    },
    graphicType: 'amd-rocm',
    graphicBadge: {
      icon: 'gear',
      label: 'ADAPTIVE ESCALATION ROUTER'
    },
    tags: ['Python', 'Qwen', 'Fireworks', 'Docker', 'Adaptive Routing'],
    metrics: [
      { label: 'Token Reduction', value: '-24.6%' },
      { label: 'Hard-Set Accuracy', value: '95% (was 85%)' },
      { label: 'Mixed-Task Eval', value: '80 / 80 Passed' },
      { label: 'Resource Budget', value: '2-vCPU / 4-GB' }
    ],
    details: [
      'Trained a hashed n-gram logistic router on 360 measured task outcomes to route between quantized Qwen2.5-1.5B and a hosted LLM under a 2-vCPU / 4-GB budget.',
      'Added deterministic verification and failover; passed 80/80 mixed-task evaluations using 9,745 tokens.',
      'On a 20-case hard set, optimized escalation prompting raised accuracy from 85% to 95% while cutting token use by 24.6%.'
    ],
    bullets: [
      'Trained a hashed n-gram logistic router on 360 measured task outcomes to route between quantized Qwen2.5-1.5B and a hosted LLM under a 2-vCPU / 4-GB budget; added deterministic verification and failover.',
      'Passed 80/80 mixed-task evaluations using 9,745 tokens; on a 20-case hard set, optimized escalation prompting raised accuracy from 85% to 95% while cutting token use by 24.6%.'
    ]
  },
  {
    id: 'ken-memorial',
    title: 'KenMemory',
    tagline: 'Privacy-aware RAG product embedding consented memories in PostgreSQL/pgvector with HNSW vector search and streaming grounded answers.',
    category: 'PRODUCTION WEB',
    filterCategory: 'systems',
    period: 'Jul. 2026 – Aug. 2026',
    image: 'https://opengraph.githubassets.com/1/Ryo0326-hub/ken_memorial',
    hasImage: true,
    githubUrl: 'https://github.com/Ryo0326-hub/ken_memorial',
    demoUrl: 'https://ken-memorial.vercel.app/',
    badges: {
      event: 'Production Web & RAG',
      organization: 'Live Site',
      actionText: 'Live Demo',
      actionUrl: 'https://ken-memorial.vercel.app/'
    },
    graphicType: 'none',
    tags: ['OpenAI API', 'FastAPI', 'React', 'PostgreSQL/pgvector', 'HNSW'],
    metrics: [
      { label: 'Backend Tests', value: '63 Passed' },
      { label: 'Vector Index', value: 'HNSW / pgvector' },
      { label: 'Privacy Model', value: 'Consented Memories' },
      { label: 'Delivery', value: 'Streamed Grounded' }
    ],
    details: [
      'Independently built and deployed a privacy-aware RAG product with modern user interface.',
      'Embedded only consented memories in PostgreSQL/pgvector and used HNSW vector search for high-speed semantic retrieval.',
      'Streamed grounded answers to users with verified reliability backed by 63 backend tests.'
    ],
    bullets: [
      'Independently built and deployed a privacy-aware RAG product; embedded only consented memories in PostgreSQL/pgvector, used HNSW vector search for semantic retrieval, and streamed grounded answers, verified by 63 backend tests.'
    ]
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: 'ai-engineer',
    title: 'AI Engineer for Developers',
    issuer: 'Professional Accreditation',
    description: 'LLM orchestration patterns, RAG pipelines, vector search, and production inference deployment.',
    statusText: 'Completed',
    iconType: 'ai',
    status: 'Completed'
  },
  {
    id: 'sql-associate',
    title: 'SQL Associate Certification',
    issuer: 'Database Systems',
    description: 'Relational schema normalization, complex window functions, and query optimization plans.',
    statusText: 'In Progress',
    iconType: 'database',
    status: 'In Progress'
  },
  {
    id: 'deep-learning',
    title: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI',
    description: 'Neural networks, backprop, hyperparameter tuning, CNNs, and sequence models by Andrew Ng.',
    statusText: 'Not Started',
    iconType: 'deeplearning',
    status: 'Not Started'
  },
  {
    id: 'aws-cloud-practitioner',
    title: 'AWS Cloud Practitioner (CLF-C02)',
    issuer: 'Amazon Web Services',
    description: 'Serverless architectures (Lambda), compute (EC2), S3 storage, and IAM security matrices.',
    statusText: 'Not Started',
    iconType: 'aws',
    status: 'Not Started'
  },
  {
    id: 'azure-fundamentals',
    title: 'Azure Fundamentals (AZ-900)',
    issuer: 'Microsoft Azure',
    description: 'Cloud architecture components, virtual networks, identity services, governance, and compliance.',
    statusText: 'Not Started',
    iconType: 'azure',
    status: 'Not Started'
  },
  {
    id: 'google-cloud-certified',
    title: 'Google Cloud Certified',
    issuer: 'Google Cloud',
    description: 'BigQuery analytics, Vertex AI machine learning pipelines, and container deployment on GKE.',
    statusText: 'Not Started',
    iconType: 'gcp',
    status: 'Not Started'
  },
  {
    id: 'github-foundations',
    title: 'GitHub Foundations',
    issuer: 'GitHub Official',
    description: 'Git branching workflows, automated CI/CD with GitHub Actions, and repository security.',
    statusText: 'Not Started',
    iconType: 'github',
    status: 'Not Started'
  }
];

