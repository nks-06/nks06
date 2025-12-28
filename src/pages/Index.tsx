import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/sections/HeroSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ContactSection } from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Nasif Kamal | ERP & AI Automation Expert</title>
        <meta
          name="description"
          content="Nasif Kamal - ERP & AI Automation Expert with 7+ years of experience in software development, IT administration, and digital transformation. Specializing in Odoo, Zoho, and enterprise solutions."
        />
      </Helmet>
      <Layout>
        <HeroSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </Layout>
    </>
  );
};

export default Index;
