import { Helmet } from "react-helmet-async";
import { Download, Award, GraduationCap, Languages } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { usePortfolio } from "@/contexts/PortfolioContext";

const About = () => {
  const { personalInfo, educationList, certificationsList, aboutStats } = usePortfolio();

  const handleDownloadCV = () => {
    if (personalInfo.resumeUrl) {
      const link = document.createElement('a');
      link.href = personalInfo.resumeUrl;
      link.download = 'Nasif_Kamal_CV.pdf';
      link.click();
    }
  };

  return (
    <>
      <Helmet>
        <title>About Me | Nasif Kamal - ERP & AI Automation Expert</title>
        <meta name="description" content="Learn about Nasif Kamal's professional journey, education, and certifications in ERP systems, AI automation, and software development." />
      </Helmet>
      <Layout>
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <span className="text-[15rem] font-bold text-muted/5 select-none animate-pulse">About</span>
          </div>

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-start mb-20">
              <div className="relative animate-fade-in">
                <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-3xl animate-pulse" />
                <div className="relative rounded-3xl overflow-hidden border-2 border-border hover:border-primary/50 transition-all duration-500 hover:scale-[1.02]">
                  <img src={personalInfo.profileImage2} alt={personalInfo.name} className="w-full aspect-square object-cover object-top" />
                </div>
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 glass-card rounded-2xl px-8 py-4 flex gap-8 animate-slide-up delay-300">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gradient">{aboutStats.yearsOfExperience}+</p>
                    <p className="text-sm text-muted-foreground">Years Exp</p>
                  </div>
                  <div className="w-px bg-border" />
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gradient">{aboutStats.projectsCompleted}+</p>
                    <p className="text-sm text-muted-foreground">Projects</p>
                  </div>
                  <div className="w-px bg-border" />
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gradient">{aboutStats.certificationsCount}</p>
                    <p className="text-sm text-muted-foreground">Certifications</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 animate-slide-in-right">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">About <span className="text-gradient">Me</span></h1>
                <p className="text-muted-foreground leading-relaxed mb-6">{personalInfo.bio}</p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div><p className="text-muted-foreground text-sm">Name:</p><p className="font-medium">{personalInfo.name}</p></div>
                  <div><p className="text-muted-foreground text-sm">Email:</p><p className="font-medium">{personalInfo.email}</p></div>
                  <div><p className="text-muted-foreground text-sm">Phone:</p><p className="font-medium">{personalInfo.phone}</p></div>
                  <div><p className="text-muted-foreground text-sm">Location:</p><p className="font-medium">{personalInfo.location}</p></div>
                </div>
                <Button variant="hero" size="lg" onClick={handleDownloadCV} disabled={!personalInfo.resumeUrl}>
                  <Download className="w-4 h-4 mr-2" />
                  Download CV
                </Button>
              </div>
            </div>

            <div className="mb-20">
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold">Education</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {educationList.map((edu, index) => (
                  <div key={edu.id} className="glass-card rounded-2xl p-6 card-hover animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <h3 className="text-lg font-bold text-foreground mb-2">{edu.degree}</h3>
                    <p className="text-primary mb-2">{edu.institution}</p>
                    <p className="text-muted-foreground text-sm">GPA: {edu.gpa}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-20">
              <div className="flex items-center gap-3 mb-8">
                <Award className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold">Certifications</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {certificationsList.map((cert, index) => (
                  <div key={cert.id} className="glass-card rounded-2xl p-6 card-hover animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    <h3 className="text-lg font-bold text-foreground mb-2">{cert.name}</h3>
                    <p className="text-primary text-sm mb-1">{cert.institution}</p>
                    <p className="text-muted-foreground text-sm">{cert.year}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-8">
                <Languages className="w-8 h-8 text-primary" />
                <h2 className="text-3xl font-bold">Languages</h2>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="glass-card rounded-xl px-6 py-4 hover:scale-105 transition-transform"><p className="font-medium">Bangla</p><p className="text-primary text-sm">Native</p></div>
                <div className="glass-card rounded-xl px-6 py-4 hover:scale-105 transition-transform"><p className="font-medium">English</p><p className="text-primary text-sm">Fluent</p></div>
                <div className="glass-card rounded-xl px-6 py-4 hover:scale-105 transition-transform"><p className="font-medium">Hindi</p><p className="text-primary text-sm">Basic</p></div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default About;
