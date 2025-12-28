import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Experience, PersonalInfo } from "@/types/portfolio";
import { experiences as initialExperiences, personalInfo as initialPersonalInfo } from "@/data/portfolioData";

interface PortfolioContextType {
  experiences: Experience[];
  personalInfo: PersonalInfo;
  addExperience: (experience: Omit<Experience, "id">) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  deleteExperience: (id: string) => void;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updateProfileImage: (imageUrl: string, imageNumber: 1 | 2) => void;
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
  const [experiences, setExperiences] = useState<Experience[]>(() => {
    const saved = localStorage.getItem("portfolio_experiences");
    return saved ? JSON.parse(saved) : initialExperiences;
  });

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(() => {
    const saved = localStorage.getItem("portfolio_personalInfo");
    return saved ? JSON.parse(saved) : initialPersonalInfo;
  });

  useEffect(() => {
    localStorage.setItem("portfolio_experiences", JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    localStorage.setItem("portfolio_personalInfo", JSON.stringify(personalInfo));
  }, [personalInfo]);

  const addExperience = (experience: Omit<Experience, "id">) => {
    const newExperience = {
      ...experience,
      id: Date.now().toString(),
    };
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
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};
