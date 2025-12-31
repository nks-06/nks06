import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { Experience, PersonalInfo, Skill, Education, Certification, Project, SocialLink, AboutStats, ApiSettings, Visitor } from "@/types/portfolio";
import { supabase } from "@/integrations/supabase/client";
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
  
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(true);
  
  // Experiences
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiences);

  // Personal Info
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(initialPersonalInfo);

  // Skills
  const [skills, setSkills] = useState<Skill[]>(initialSkills);

  // Education
  const [educationList, setEducationList] = useState<Education[]>(initialEducation);

  // Certifications
  const [certificationsList, setCertificationsList] = useState<Certification[]>(initialCertifications);

  // Projects
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  // Social Links
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(initialSocialLinks);

  // About Stats
  const [aboutStats, setAboutStats] = useState<AboutStats>(initialAboutStats);

  // API Settings (local only - contains secrets)
  const [apiSettings, setApiSettings] = useState<ApiSettings>(() => {
    const saved = localStorage.getItem("portfolio_apiSettings");
    return saved ? JSON.parse(saved) : { resendApiKey: "", whatsappApiKey: "", whatsappPhoneId: "" };
  });

  // Visitors (local only)
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
    return saved || "admin123";
  });

  // Fetch portfolio data from database
  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        const { data, error } = await supabase
          .from("portfolio_data")
          .select("data_key, data_value");

        if (error) {
          console.error("Error fetching portfolio data:", error);
          setIsLoading(false);
          return;
        }

        if (data) {
          data.forEach((item) => {
            const value = item.data_value as any;
            switch (item.data_key) {
              case "personalInfo":
                if (value && Object.keys(value).length > 0) {
                  // Merge with initial data to keep default images if not set
                  setPersonalInfo(prev => ({
                    ...prev,
                    ...value,
                    profileImage: value.profileImage || prev.profileImage,
                    profileImage2: value.profileImage2 || prev.profileImage2,
                  }));
                }
                break;
              case "aboutStats":
                if (value && Object.keys(value).length > 0) {
                  setAboutStats(value);
                }
                break;
              case "experiences":
                if (Array.isArray(value) && value.length > 0) {
                  setExperiences(value);
                }
                break;
              case "skills":
                if (Array.isArray(value) && value.length > 0) {
                  setSkills(value);
                }
                break;
              case "education":
                if (Array.isArray(value) && value.length > 0) {
                  setEducationList(value);
                }
                break;
              case "certifications":
                if (Array.isArray(value) && value.length > 0) {
                  setCertificationsList(value);
                }
                break;
              case "projects":
                if (Array.isArray(value) && value.length > 0) {
                  setProjects(value);
                }
                break;
              case "socialLinks":
                if (Array.isArray(value) && value.length > 0) {
                  setSocialLinks(value);
                }
                break;
            }
          });
        }
      } catch (err) {
        console.error("Error loading portfolio data:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPortfolioData();
  }, []);

  // Sync data to database
  const syncToDatabase = useCallback(async (dataKey: string, dataValue: any) => {
    if (!isAdminAuthenticated) return;
    
    try {
      const { error } = await supabase.functions.invoke("update-portfolio", {
        body: { dataKey, dataValue },
      });

      if (error) {
        console.error("Error syncing to database:", error);
      }
    } catch (err) {
      console.error("Error syncing to database:", err);
    }
  }, [isAdminAuthenticated]);

  // Persist API settings to localStorage (contains secrets)
  useEffect(() => {
    localStorage.setItem("portfolio_apiSettings", JSON.stringify(apiSettings));
  }, [apiSettings]);

  // Persist visitors to localStorage
  useEffect(() => {
    localStorage.setItem("portfolio_visitors", JSON.stringify(visitors));
  }, [visitors]);

  useEffect(() => {
    localStorage.setItem("admin_password", adminPassword);
  }, [adminPassword]);

  // Experience functions
  const addExperience = (experience: Omit<Experience, "id">) => {
    const newExperience = { ...experience, id: Date.now().toString() };
    const updated = [newExperience, ...experiences];
    setExperiences(updated);
    syncToDatabase("experiences", updated);
  };

  const updateExperience = (id: string, updates: Partial<Experience>) => {
    const updated = experiences.map((exp) => (exp.id === id ? { ...exp, ...updates } : exp));
    setExperiences(updated);
    syncToDatabase("experiences", updated);
  };

  const deleteExperience = (id: string) => {
    const updated = experiences.filter((exp) => exp.id !== id);
    setExperiences(updated);
    syncToDatabase("experiences", updated);
  };

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    const updated = { ...personalInfo, ...info };
    setPersonalInfo(updated);
    syncToDatabase("personalInfo", updated);
  };

  const updateProfileImage = (imageUrl: string, imageNumber: 1 | 2) => {
    let updated: PersonalInfo;
    if (imageNumber === 1) {
      updated = { ...personalInfo, profileImage: imageUrl };
    } else {
      updated = { ...personalInfo, profileImage2: imageUrl };
    }
    setPersonalInfo(updated);
    syncToDatabase("personalInfo", updated);
  };

  // Skill functions
  const addSkill = (skill: Omit<Skill, "id">) => {
    const newSkill = { ...skill, id: Date.now().toString() };
    const updated = [...skills, newSkill];
    setSkills(updated);
    syncToDatabase("skills", updated);
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    const updated = skills.map((skill) => (skill.id === id ? { ...skill, ...updates } : skill));
    setSkills(updated);
    syncToDatabase("skills", updated);
  };

  const deleteSkill = (id: string) => {
    const updated = skills.filter((skill) => skill.id !== id);
    setSkills(updated);
    syncToDatabase("skills", updated);
  };

  // Education functions
  const addEducation = (edu: Omit<Education, "id">) => {
    const newEdu = { ...edu, id: Date.now().toString() };
    const updated = [...educationList, newEdu];
    setEducationList(updated);
    syncToDatabase("education", updated);
  };

  const updateEducation = (id: string, updates: Partial<Education>) => {
    const updated = educationList.map((edu) => (edu.id === id ? { ...edu, ...updates } : edu));
    setEducationList(updated);
    syncToDatabase("education", updated);
  };

  const deleteEducation = (id: string) => {
    const updated = educationList.filter((edu) => edu.id !== id);
    setEducationList(updated);
    syncToDatabase("education", updated);
  };

  // Certification functions
  const addCertification = (cert: Omit<Certification, "id">) => {
    const newCert = { ...cert, id: Date.now().toString() };
    const updated = [...certificationsList, newCert];
    setCertificationsList(updated);
    syncToDatabase("certifications", updated);
  };

  const updateCertification = (id: string, updates: Partial<Certification>) => {
    const updated = certificationsList.map((cert) => (cert.id === id ? { ...cert, ...updates } : cert));
    setCertificationsList(updated);
    syncToDatabase("certifications", updated);
  };

  const deleteCertification = (id: string) => {
    const updated = certificationsList.filter((cert) => cert.id !== id);
    setCertificationsList(updated);
    syncToDatabase("certifications", updated);
  };

  // Project functions
  const addProject = (project: Omit<Project, "id">) => {
    const newProject = { ...project, id: Date.now().toString() };
    const updated = [...projects, newProject];
    setProjects(updated);
    syncToDatabase("projects", updated);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    const updated = projects.map((proj) => (proj.id === id ? { ...proj, ...updates } : proj));
    setProjects(updated);
    syncToDatabase("projects", updated);
  };

  const deleteProject = (id: string) => {
    const updated = projects.filter((proj) => proj.id !== id);
    setProjects(updated);
    syncToDatabase("projects", updated);
  };

  // Social Link functions
  const addSocialLink = (link: Omit<SocialLink, "id">) => {
    const newLink = { ...link, id: Date.now().toString() };
    const updated = [...socialLinks, newLink];
    setSocialLinks(updated);
    syncToDatabase("socialLinks", updated);
  };

  const updateSocialLink = (id: string, updates: Partial<SocialLink>) => {
    const updated = socialLinks.map((link) => (link.id === id ? { ...link, ...updates } : link));
    setSocialLinks(updated);
    syncToDatabase("socialLinks", updated);
  };

  const deleteSocialLink = (id: string) => {
    const updated = socialLinks.filter((link) => link.id !== id);
    setSocialLinks(updated);
    syncToDatabase("socialLinks", updated);
  };

  // About Stats functions
  const updateAboutStats = (stats: Partial<AboutStats>) => {
    const updated = { ...aboutStats, ...stats };
    setAboutStats(updated);
    syncToDatabase("aboutStats", updated);
  };

  // Resume functions
  const updateResume = (resumeUrl: string) => {
    const updated = { ...personalInfo, resumeUrl };
    setPersonalInfo(updated);
    syncToDatabase("personalInfo", updated);
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
        isLoading,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
