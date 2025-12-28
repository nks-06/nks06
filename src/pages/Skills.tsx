import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { SkillsSection } from "@/components/sections/SkillsSection";

const Skills = () => {
  return (
    <>
      <Helmet>
        <title>Skills | Nasif Kamal - ERP & AI Automation Expert</title>
        <meta
          name="description"
          content="Discover Nasif Kamal's technical skills including ERP systems, AI automation, data management, software development, and more."
        />
      </Helmet>
      <Layout>
        <SkillsSection />
      </Layout>
    </>
  );
};

export default Skills;
