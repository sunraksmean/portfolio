// src/types/index.ts

export interface Skill {
  id: string;
  name: string;
  level: number; // 0-100
  category: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  duration: string;
  description: string[];
  current?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  highlights: string[];
  status: 'live' | 'development' | 'concept';
  color: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  message: string;
  initials: string;
}
