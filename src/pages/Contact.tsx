import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { ContactSection } from "@/components/sections/ContactSection";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact | Nasif Kamal - ERP & AI Automation Expert</title>
        <meta
          name="description"
          content="Get in touch with Nasif Kamal for ERP implementation, AI automation projects, or software development consultations."
        />
      </Helmet>
      <Layout>
        <ContactSection />
      </Layout>
    </>
  );
};

export default Contact;
