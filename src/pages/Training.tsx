import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Monitor,
  Users,
  BookOpen,
  Building2,
  Settings,
  BarChart3,
  Target,
  CheckCircle2,
  Zap,
  GraduationCap,
  Layers,
  Globe,
  TrendingUp,
  Award,
  Lightbulb,
  MessageSquare,
  Wrench,
  HeartHandshake,
} from "lucide-react";

const metrics = [
  { label: "Users Trained", value: 180, suffix: "+", icon: Users },
  { label: "Enterprise Systems", value: 5, suffix: "+", icon: Layers },
  { label: "Training Sessions", value: 20, suffix: "+", icon: BookOpen },
  { label: "Organizations Trained", value: 4, suffix: "", icon: Building2 },
];

const trainingPrograms = [
  {
    title: "Odoo ERP Implementation & User Training",
    organization: "JAAGO Foundation",
    usersTrained: "40+ Employees",
    icon: Settings,
    topics: [
      "Odoo ERP navigation",
      "Department workflow automation",
      "CRM and financial system integration",
      "User roles and permission management",
      "Data reporting and analytics",
      "Operational troubleshooting",
    ],
  },
  {
    title: "Zoho Systems Training",
    organization: "JAAGO Foundation",
    usersTrained: "30+ Employees",
    icon: BarChart3,
    topics: [
      "Zoho CRM usage",
      "Zoho Books financial workflow",
      "Zoho People HR system",
      "Dashboard monitoring",
      "Reporting and performance tracking",
    ],
  },
  {
    title: "ERP System Implementation & Training",
    organization: "Expo Accessories Limited",
    usersTrained: "50+ Operational Staff",
    icon: Target,
    topics: [
      "Production workflow management",
      "Supply chain operations",
      "Inventory management system",
      "Order and requisition processing",
      "Production planning and ERP reporting",
    ],
  },
  {
    title: "APM ERP System Training",
    organization: "APM ERP",
    usersTrained: "35+ Client Users",
    icon: Monitor,
    topics: [
      "Sales CRM module",
      "Production planning module",
      "Inventory control",
      "ERP database management",
      "Dashboard and operational reporting",
    ],
  },
  {
    title: "Web Application User Training",
    organization: "Workspace Infotech Ltd",
    usersTrained: "25+ Users",
    icon: Globe,
    topics: [
      "Web application navigation",
      "User access control",
      "Basic database interaction",
      "QA testing procedures",
      "System troubleshooting",
    ],
  },
];

const methodology = [
  { text: "Hands-on system demonstration", icon: Monitor },
  { text: "Real operational workflow simulation", icon: Zap },
  { text: "Step-by-step user manuals", icon: BookOpen },
  { text: "Interactive Q&A sessions", icon: MessageSquare },
  { text: "Post-training troubleshooting support", icon: Wrench },
  { text: "Continuous user assistance", icon: HeartHandshake },
];

const impact = [
  { text: "Improved software adoption across departments", icon: TrendingUp },
  { text: "Reduced operational errors", icon: CheckCircle2 },
  { text: "Increased ERP efficiency", icon: Zap },
  { text: "Faster onboarding for new employees", icon: Award },
  { text: "Better data management and reporting", icon: BarChart3 },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1500;
          const steps = 40;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-primary font-display">
      {count}
      {suffix}
    </div>
  );
}

const Training = () => {
  return (
    <>
      <Helmet>
        <title>Training & Knowledge Transfer | Nasif Kamal</title>
        <meta
          name="description"
          content="Nasif Kamal's professional training experience — ERP implementation guidance, software onboarding, and technology training for enterprise teams."
        />
      </Helmet>
      <Layout>
        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_60%)]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium mb-6">
                <GraduationCap className="w-4 h-4" />
                Training & Knowledge Transfer
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 font-display">
                Empowering Teams Through{" "}
                <span className="text-primary">Technology Training</span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                7+ years of experience conducting professional training sessions, ERP implementation guidance, and software onboarding for employees and operational teams.
              </p>
            </div>

            {/* Trainer Profile Card */}
            <div className="max-w-2xl mx-auto mb-16">
              <Card className="border-primary/10 bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Lightbulb className="w-10 h-10 text-primary" />
                    </div>
                    <div className="text-center sm:text-left">
                      <h2 className="text-xl font-bold text-foreground">Nasif Kamal</h2>
                      <p className="text-muted-foreground text-sm mt-1">
                        Software Systems Administrator | ERP Implementation Specialist | Technical Trainer
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3 justify-center sm:justify-start">
                        {["ERP Implementation", "Software Training", "System Operations", "User Onboarding"].map((s) => (
                          <span key={s} className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
              {metrics.map((m) => (
                <Card key={m.label} className="border-primary/10 bg-card/60 backdrop-blur-sm text-center">
                  <CardContent className="p-6">
                    <m.icon className="w-8 h-8 text-primary mx-auto mb-3 opacity-70" />
                    <AnimatedCounter target={m.value} suffix={m.suffix} />
                    <p className="text-muted-foreground text-sm mt-2">{m.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Training Programs */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display mb-3">
                Training Programs
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Comprehensive training programs delivered across multiple organizations and enterprise systems.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {trainingPrograms.map((prog, idx) => (
                <Card
                  key={idx}
                  className="border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 group"
                >
                  <CardHeader className="pb-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                      <prog.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-foreground leading-tight">
                      {prog.title}
                    </CardTitle>
                    <div className="space-y-1 mt-2">
                      <p className="text-sm text-primary font-medium">{prog.organization}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Users className="w-3 h-3" /> {prog.usersTrained}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {prog.topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-primary/60 mt-0.5 shrink-0" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Training Methodology */}
        <section className="py-16 md:py-20 relative">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.05),transparent_60%)]" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display mb-3">
                Training Methodology
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                A structured approach to ensure effective knowledge transfer and lasting skill development.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {methodology.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm hover:border-primary/20 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-sm text-foreground font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground font-display mb-3">
                Impact of My Training
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Measurable outcomes delivered through structured training and knowledge transfer.
              </p>
            </div>
            <div className="max-w-2xl mx-auto space-y-4">
              {impact.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 p-5 rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Training;
