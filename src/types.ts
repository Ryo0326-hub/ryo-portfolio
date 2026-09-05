export type TabType = 'overview' | 'experience' | 'projects' | 'contact';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'AGENTIC & FINTECH' | 'COMPUTER VISION' | 'OPEN SOURCE' | 'PRODUCTION WEB' | string;
  filterCategory?: 'agentic' | 'cv' | 'systems' | 'all';
  badges: {
    event?: string;
    organization?: string;
    actionText?: string;
    actionUrl?: string;
  };
  graphicType?: 'thetatrap' | 'amd-rocm' | 'gradient-map' | 'none';
  graphicBadge?: {
    icon?: string;
    label: string;
  };
  tags: string[];
  metrics?: { label: string; value: string }[];
  details?: string[];
  bullets?: string[];
  period?: string;
  demoUrl?: string;
  githubUrl?: string;
  image?: string;
  hasImage?: boolean;
}

export interface ExperienceItem {
  id: string;
  title: string;
  type: 'INTERNSHIP' | 'FOUNDING' | 'FULL-TIME';
  period: string;
  company: string;
  location: string;
  workMode: 'Remote' | 'On-site' | 'Hybrid';
  description?: string;
  bullets: string[];
  tags: string[];
}

export type CertificationStatus = 'In Progress' | 'Not Started' | 'Completed' | string;

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  description?: string;
  statusText?: string;
  iconType: 'deeplearning' | 'ai' | 'database' | 'azure' | 'aws' | 'gcp' | 'github';
  status: CertificationStatus;
  progress?: number;
}
