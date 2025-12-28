export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  responsibilities: string[];
  isCurrent?: boolean;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  gpa: string;
}

export interface Certification {
  id: string;
  name: string;
  institution: string;
  year: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  socialLinks: SocialLink[];
}

export interface AboutStats {
  yearsOfExperience: number;
  projectsCompleted: number;
  certificationsCount: number;
}

export interface ApiSettings {
  resendApiKey: string;
  whatsappApiKey: string;
  whatsappPhoneId: string;
}

export interface Visitor {
  id: string;
  ip: string;
  device: string;
  browser: string;
  location: string;
  country: string;
  visitedAt: string;
  timeSpent: number;
  pagesViewed: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  subtitle: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  profileImage: string;
  profileImage2: string;
  linkedin: string;
  whatsapp: string;
  resumeUrl?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}
