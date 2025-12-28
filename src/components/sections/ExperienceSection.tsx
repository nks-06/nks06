import { Briefcase, Calendar, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { usePortfolio } from "@/contexts/PortfolioContext";

interface ExperienceSectionProps {
  showAll?: boolean;
}

export const ExperienceSection = ({ showAll = false }: ExperienceSectionProps) => {
  const { experiences } = usePortfolio();
  const displayExperiences = showAll ? experiences : experiences.slice(0, 3);

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="text-[12rem] font-bold text-muted/5 select-none">
          Experience
        </span>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Work <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            7+ years of professional experience across diverse industries,
            specializing in ERP implementation, AI automation, and digital
            transformation.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:transform md:-translate-x-1/2" />

          {displayExperiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 md:-translate-x-1/2 mt-6 pulse-glow" />

              {/* Content Card */}
              <div className={`md:w-1/2 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"} pl-8 md:pl-0`}>
                <div className="glass-card rounded-2xl p-6 card-hover group">
                  <div className="flex items-center gap-2 text-primary mb-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {exp.position}
                  </h3>

                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <Briefcase className="w-4 h-4" />
                    <span>{exp.company}</span>
                    {exp.isCurrent && (
                      <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full">
                        Current
                      </span>
                    )}
                  </div>

                  <p className="text-muted-foreground mb-4">
                    {exp.description}
                  </p>

                  <ul className="space-y-2">
                    {exp.responsibilities.slice(0, 3).map((resp, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Spacer for alternating layout */}
              <div className="hidden md:block md:w-1/2" />
            </div>
          ))}
        </div>

        {!showAll && experiences.length > 3 && (
          <div className="text-center mt-12">
            <Button variant="hero" size="lg" asChild>
              <Link to="/experience">
                View All Experience
                <ChevronRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
