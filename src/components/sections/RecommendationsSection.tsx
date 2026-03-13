import {
  Quote,
  ExternalLink,
  Linkedin,
  Shield,
  Brain,
  Users,
  Lightbulb,
  BarChart3,
  Cpu,
  CheckCircle2,
} from "lucide-react";

const recommendations = [
  {
    name: "Md. Ashif Al Mehedi Hasan",
    role: "Manager",
    highlight: "Software Implementation & User Training",
    quote:
      "Nasif has been instrumental in optimizing operational efficiency through seamless software implementation and ensuring smooth adoption across teams.",
    takeaway: "Drives adoption & operational efficiency",
    icon: Shield,
    linkedin: "https://www.linkedin.com/in/nasifkamal",
  },
  {
    name: "Nusrat Sharmin",
    role: "Manager",
    highlight: "Strategic Thinking & MIS",
    quote:
      "A quick learner with exceptional analytical skills. His expertise in Management Information Systems and strategic thinking makes him a valuable asset to any organization.",
    takeaway: "Quick learner & MIS expert",
    icon: Lightbulb,
    linkedin: "https://www.linkedin.com/in/nasifkamal",
  },
  {
    name: "Théo Willard",
    role: "Colleague",
    highlight: "Data Expert & Team Support",
    quote:
      "Nasif excels at analyzing complex data and providing guidance to the team. His support and expertise have been invaluable in our collaborative projects.",
    takeaway: "Complex data analysis & mentorship",
    icon: BarChart3,
    linkedin: "https://www.linkedin.com/in/nasifkamal",
  },
];

const competencies = [
  {
    area: "Technical Expertise",
    desc: "ERP implementation, system configuration, data migration & integration",
    icon: Cpu,
  },
  {
    area: "Adaptability",
    desc: "Quick learner, strategic thinker, cross-functional collaboration",
    icon: Brain,
  },
  {
    area: "User Training",
    desc: "Hands-on training, user adoption, documentation & ongoing support",
    icon: Users,
  },
];

const RecommendationsSection = () => (
  <section className="py-12 md:py-16">
    <div className="container mx-auto px-4">
      {/* Impact Statement */}
      <div className="max-w-3xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium mb-4">
          <Linkedin className="w-3.5 h-3.5" />
          LinkedIn Recommendations
        </div>
        <h2 className="text-xl md:text-2xl font-bold text-foreground font-display leading-snug">
          Bridging Technical Complexity and User Adoption
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Expert in Software Implementation and Team Training
        </p>
      </div>

      {/* Recommendation Cards */}
      <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-12">
        {recommendations.map((r, idx) => (
          <div
            key={idx}
            className="flex flex-col p-5 rounded-xl border border-border/50 bg-card hover:border-primary/30 transition-all group"
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <r.icon className="w-4 h-4 text-primary" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-foreground leading-tight">
                  {r.name}
                </h3>
                <p className="text-xs text-muted-foreground">{r.role}</p>
              </div>
            </div>

            {/* Highlight badge */}
            <span className="self-start text-[10px] font-semibold uppercase tracking-wider bg-primary/10 text-primary px-2.5 py-1 rounded-full mb-3">
              {r.highlight}
            </span>

            {/* Quote */}
            <div className="flex-1 relative pl-3 border-l-2 border-primary/20 mb-4">
              <Quote className="w-3 h-3 text-primary/40 absolute -left-1.5 -top-0.5 bg-card" />
              <p className="text-xs text-muted-foreground leading-relaxed italic">
                "{r.quote}"
              </p>
            </div>

            {/* Key Takeaway */}
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-muted/50 mb-3">
              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
              <span className="text-xs font-medium text-foreground">
                Key Takeaway:{" "}
                <span className="text-muted-foreground font-normal">
                  {r.takeaway}
                </span>
              </span>
            </div>

            {/* LinkedIn link */}
            <a
              href={r.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[11px] font-medium text-primary hover:underline mt-auto"
            >
              <Linkedin className="w-3 h-3" />
              Verified on LinkedIn
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        ))}
      </div>

      {/* Competency Matrix */}
      <div className="max-w-3xl mx-auto">
        <h3 className="text-base font-bold text-foreground font-display mb-4 text-center">
          Competency Matrix
        </h3>
        <div className="grid md:grid-cols-3 gap-3">
          {competencies.map((c, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-4 rounded-xl border border-border/50 bg-card/50"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <c.icon className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-foreground mb-1">
                  {c.area}
                </h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default RecommendationsSection;
