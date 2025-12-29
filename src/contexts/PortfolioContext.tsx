import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Experience, PersonalInfo, Skill, Education, Certification, Project, SocialLink, AboutStats, ApiSettings, Visitor } from "@/types/portfolio";
import { 
  experiences as initialExperiences, 
  personalInfo as initialPersonalInfo,
  skills as initialSkills,
  education as initialEducation,
  certifications as initialCertifications,
  projects as initialProjects,
  socialLinks as initialSocialLinks,
  aboutStats as initialAboutStats,
} from "@/data/portfolioData";

interface PortfolioContextType {
  experiences: Experience[];
  personalInfo: PersonalInfo;
  addExperience: (experience: Omit<Experience, "id">) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateProfileImage: (imageUrl: string, imageNumber: 1 | 2) => void;
  
  skills: Skill[];
  addSkill: (skill: Omit<Skill, "id">) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  
  educationList: Education[];
  addEducation: (edu: Omit<Education, "id">) => void;
  updateEducation: (id: string, edu: Partial<Education>) => void;
  deleteEducation: (id: string) => void;
  
  certificationsList: Certification[];
  addCertification: (cert: Omit<Certification, "id">) => void;
  updateCertification: (id: string, cert: Partial<Certification>) => void;
  deleteCertification: (id: string) => void;
  
  projects: Project[];
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  socialLinks: SocialLink[];
  addSocialLink: (link: Omit<SocialLink, "id">) => void;
  updateSocialLink: (id: string, link: Partial<SocialLink>) => void;
  deleteSocialLink: (id: string) => void;
  
  aboutStats: AboutStats;
  updateAboutStats: (stats: Partial<AboutStats>) => void;
  
  updateResume: (resumeUrl: string) => void;
  
  apiSettings: ApiSettings;
  updateApiSettings: (settings: Partial<ApiSettings>) => void;
  
  visitors: Visitor[];
  addVisitor: (visitor: Omit<Visitor, "id">) => void;
  
  isAdminAuthenticated: boolean;
  adminPassword: string;
  setAdminPassword: (password: string) => void;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  // Experiences
  const [experiences, setExperiences] = useState<Experience[]>(() => {
    const saved = localStorage.getItem("portfolio_experiences");
    return saved ? JSON.parse(saved) : initialExperiences;
  });

  // Personal Info
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    const saved = localStorage.getItem("portfolio_personalInfo");
    return saved ? JSON.parse(saved) : initialPersonalInfo;
  });

  // Skills
  const [skills, setSkills] = useState<Skill[]>(() => {
    const saved = localStorage.getItem("portfolio_skills");
    return saved ? JSON.parse(saved) : initialSkills;
  });

  // Education
  const [educationList, setEducationList] = useState<Education[]>(() => {
    const saved = localStorage.getItem("portfolio_education");
    return saved ? JSON.parse(saved) : initialEducation;
  });

  // Certifications
  const [certificationsList, setCertificationsList] = useState<Certification[]>(() => {
    const saved = localStorage.getItem("portfolio_certifications");
    return saved ? JSON.parse(saved) : initialCertifications;
  });

  // Projects
  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem("portfolio_projects");
    return saved ? JSON.parse(saved) : initialProjects;
  });

  // Social Links
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(() => {
    const saved = localStorage.getItem("portfolio_socialLinks");
    return saved ? JSON.parse(saved) : initialSocialLinks;
  });

  // About Stats
  const [aboutStats, setAboutStats] = useState<AboutStats>(() => {
    const saved = localStorage.getItem("portfolio_aboutStats");
    return saved ? JSON.parse(saved) : initialAboutStats;
  });

  // API Settings
  const [apiSettings, setApiSettings] = useState<ApiSettings>(() => {
    const saved = localStorage.getItem("portfolio_apiSettings");
    return saved ? JSON.parse(saved) : { resendApiKey: "", whatsappApiKey: "", whatsappPhoneId: "" };
  });

  // Visitors
  const [visitors, setVisitors] = useState<Visitor[]>(() => {
    const saved = localStorage.getItem("portfolio_visitors");
    return saved ? JSON.parse(saved) : [];
  });

  // Admin Auth
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    const saved = sessionStorage.getItem("admin_authenticated");
    return saved === "true";
  });

  const [adminPassword, setAdminPasswordState] = useState<string>(() => {
    const saved = localStorage.getItem("admin_password");
    return saved || "admin123"; // Default password
  });

  // Safe localStorage setter with error handling
  const safeLocalStorageSet = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        console.warn(`Storage quota exceeded for ${key}. Clearing old data.`);
        // Clear visitors first (least important)
        localStorage.removeItem("portfolio_visitors");
        // Try again
        try {
          localStorage.setItem(key, value);
        } catch {
          console.error(`Still can't save ${key}. Data too large.`);
        }
      }
    }
  };

  // Persist all data
  useEffect(() => {
    safeLocalStorageSet("portfolio_experiences", JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    safeLocalStorageSet("portfolio_personalInfo", JSON.stringify(personalInfo));
  }, [personalInfo]);

  useEffect(() => {
    safeLocalStorageSet("portfolio_skills", JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    safeLocalStorageSet("portfolio_education", JSON.stringify(educationList));
  }, [educationList]);

  useEffect(() => {
    safeLocalStorageSet("portfolio_certifications", JSON.stringify(certificationsList));
  }, [certificationsList]);

  useEffect(() => {
    // For projects, strip large base64 images before saving
    const projectsToSave = projects.map(p => ({
      ...p,
      imageUrl: p.imageUrl && p.imageUrl.length > 10000 ? '' : p.imageUrl
    }));
    safeLocalStorageSet("portfolio_projects", JSON.stringify(projectsToSave));
  }, [projects]);

  useEffect(() => {
    safeLocalStorageSet("portfolio_socialLinks", JSON.stringify(socialLinks));
  }, [socialLinks]);

  useEffect(() => {
    safeLocalStorageSet("portfolio_aboutStats", JSON.stringify(aboutStats));
  }, [aboutStats]);

  useEffect(() => {
    safeLocalStorageSet("portfolio_apiSettings", JSON.stringify(apiSettings));
  }, [apiSettings]);

  useEffect(() => {
    safeLocalStorageSet("portfolio_visitors", JSON.stringify(visitors));
  }, [visitors]);

  useEffect(() => {
    safeLocalStorageSet("admin_password", adminPassword);
  }, [adminPassword]);

  // Experience functions
  const addExperience = (experience: Omit<Experience, "id">) => {
    const newExperience = { ...experience, id: Date.now().toString() };
    setExperiences((prev) => [newExperience, ...prev]);
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    setExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp))
    );
  };

  const deleteExperience = (id: string) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setPersonalInfo((prev) => ({ ...prev, ...info }));
  };

  const updateProfileImage = (imageUrl: string, imageNumber: 1 | 2) => {
    if (imageNumber === 1) {
      setPersonalInfo((prev) => ({ ...prev, profileImage: imageUrl }));
    } else {
      setPersonalInfo((prev) => ({ ...prev, profileImage2: imageUrl }));
    }
  };

  // Skill functions
  const addSkill = (skill: Omit<Skill, "id">) => {
    const newSkill = { ...skill, id: Date.now().toString() };
    setSkills((prev) => [...prev, newSkill]);
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    setSkills((prev) =>
      prev.map((skill) => (skill.id === id ? { ...skill, ...updates } : skill))
    );
  };

  const deleteSkill = (id: string) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== id));
  };

  // Education functions
  const addEducation = (edu: Omit<Education, "id">) => {
    const newEdu = { ...edu, id: Date.now().toString() };
    setEducationList((prev) => [...prev, newEdu]);
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    setEducationList((prev) =>
      prev.map((edu) => (edu.id === id ? { ...edu, ...updates } : edu))
    );
  };

  const deleteEducation = (id: string) => {
    setEducationList((prev) => prev.filter((edu) => edu.id !== id));
  };

  // Certification functions
  const addCertification = (cert: Omit<Certification, "id">) => {
    const newCert = { ...cert, id: Date.now().toString() };
    setCertificationsList((prev) => [...prev, newCert]);
  };

  const updateCertification = (id: string, updates: Partial<Certification>) => {
    setCertificationsList((prev) =>
      prev.map((cert) => (cert.id === id ? { ...cert, ...updates } : cert))
    );
  };

  const deleteCertification = (id: string) => {
    setCertificationsList((prev) => prev.filter((cert) => cert.id !== id));
  };

  // Project functions
  const addProject = (project: Omit<Project, "id">) => {
    const newProject = { ...project, id: Date.now().toString() };
    setProjects((prev) => [...prev, newProject]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects((prev) =>
      prev.map((proj) => (proj.id === id ? { ...proj, ...updates } : proj))
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((proj) => proj.id !== id));
  };

  // Social Link functions
  const addSocialLink = (link: Omit<SocialLink, "id">) => {
    const newLink = { ...link, id: Date.now().toString() };
    setSocialLinks((prev) => [...prev, newLink]);
  };

  const updateSocialLink = (id: string, updates: Partial<SocialLink>) => {
    setSocialLinks((prev) =>
      prev.map((link) => (link.id === id ? { ...link, ...updates } : link))
    );
  };

  const deleteSocialLink = (id: string) => {
    setSocialLinks((prev) => prev.filter((link) => link.id !== id));
  };

  // About Stats functions
  const updateAboutStats = (stats: Partial<AboutStats>) => {
    setAboutStats((prev) => ({ ...prev, ...stats }));
  };

  // Resume functions
  const updateResume = (resumeUrl: string) => {
    setPersonalInfo((prev) => ({ ...prev, resumeUrl }));
  };

  // API Settings functions
  const updateApiSettings = (settings: Partial<ApiSettings>) => {
    setApiSettings((prev) => ({ ...prev, ...settings }));
  };

  // Visitor functions
  const addVisitor = (visitor: Omit<Visitor, "id">) => {
    const newVisitor = { ...visitor, id: Date.now().toString() };
    setVisitors((prev) => [newVisitor, ...prev]);
  };

  // Admin Auth functions
  const setAdminPassword = (password: string) => {
    setAdminPasswordState(password);
  };

  const loginAdmin = (password: string): boolean => {
    if (password === adminPassword) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem("admin_authenticated", "true");
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem("admin_authenticated");
  };

  return (
    <PortfolioContext.Provider
      value={{
        experiences,
        personalInfo,
        addExperience,
        updateExperience,
        deleteExperience,
        updatePersonalInfo,
        updateProfileImage,
        skills,
        addSkill,
        updateSkill,
        deleteSkill,
        educationList,
        addEducation,
        updateEducation,
        deleteEducation,
        certificationsList,
        addCertification,
        updateCertification,
        deleteCertification,
        projects,
        addProject,
        updateProject,
        deleteProject,
        socialLinks,
        addSocialLink,
        updateSocialLink,
        deleteSocialLink,
        aboutStats,
        updateAboutStats,
        updateResume,
        apiSettings,
        updateApiSettings,
        visitors,
        addVisitor,
        isAdminAuthenticated,
        adminPassword,
        setAdminPassword,
        loginAdmin,
        logoutAdmin,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
