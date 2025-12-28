import { Helmet } from "react-helmet-async";
import { ExternalLink, Github, FolderKanban } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { usePortfolio } from "@/contexts/PortfolioContext";

const Projects = () => {
  const { projects } = usePortfolio();

  return (
    <>
      <Helmet>
        <title>Projects | Nasif Kamal - ERP & AI Automation Expert</title>
        <meta name="description" content="Explore Nasif Kamal's portfolio of ERP implementations, AI automation projects, and software development work." />
      </Helmet>
      <Layout>
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[12rem] font-bold text-muted/5 select-none">Projects</span>
          </div>

          <div className="container mx-auto px-4 md:px-8 relative z-10">
            <div className="text-center mb-16 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                My <span className="text-gradient">Projects</span>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A showcase of my work in ERP implementation, AI automation, and software development.
              </p>
            </div>

            {projects.length === 0 ? (
              <div className="text-center py-20 glass-card rounded-3xl">
                <FolderKanban className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-2xl font-bold mb-2">No Projects Yet</h2>
                <p className="text-muted-foreground">Projects will be displayed here once added from the admin panel.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project, index) => (
                  <div
                    key={project.id}
                    className="glass-card rounded-2xl overflow-hidden card-hover animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {project.imageUrl && (
                      <div className="relative h-48 overflow-hidden">
                        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">{tech}</span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        {project.liveUrl && (
                          <Button variant="hero" size="sm" asChild>
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4 mr-1" />Live
                            </a>
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button variant="outline" size="sm" asChild>
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="w-4 h-4 mr-1" />Code
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Projects;
