import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { ExperienceSection } from "@/components/sections/ExperienceSection";

const Experience = () => {
  return (
    <>
      <Helmet>
        <title>Work Experience | Nasif Kamal - ERP & AI Automation Expert</title>
        <meta
          name="description"
          content="Explore Nasif Kamal's professional journey with 7+ years of experience in ERP implementation, AI automation, software development, and IT administration."
        />
      </Helmet>
      <Layout>
        <ExperienceSection showAll />
      </Layout>
    </>
  );
};

export default Experience;
