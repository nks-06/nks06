import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/layout/Layout";
import { useEffect, useRef, useState } from "react";
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
  Globe,
  TrendingUp,
  Award,
  MessageSquare,
  Wrench,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

// --- Data ---
const metrics = [
  { label: "Users Trained", value: 180, suffix: "+", icon: Users },
  { label: "Enterprise Systems", value: 5, suffix: "+", icon: Monitor },
  { label: "Sessions Conducted", value: 20, suffix: "+", icon: BookOpen },
  { label: "Organizations", value: 4, suffix: "", icon: Building2 },
];

const programs = [
  { org: "JAAGO Foundation", system: "Odoo ERP", users: "40+", icon: Settings, color: "from-primary/20 to-primary/5" },
  { org: "JAAGO Foundation", system: "Zoho Suite", users: "30+", icon: BarChart3, color: "from-primary/15 to-primary/5" },
  { org: "Expo Accessories Ltd", system: "ERP System", users: "50+", icon: Target, color: "from-primary/20 to-primary/5" },
  { org: "APM ERP", system: "APM ERP", users: "35+", icon: Monitor, color: "from-primary/15 to-primary/5" },
  { org: "Workspace Infotech", system: "Web App", users: "25+", icon: Globe, color: "from-primary/20 to-primary/5" },
];

const process = [
  { step: "01", title: "Assess", desc: "Evaluate team needs & system requirements", icon: Target },
  { step: "02", title: "Design", desc: "Create tailored training curriculum", icon: BookOpen },
  { step: "03", title: "Deliver", desc: "Hands-on sessions & live demos", icon: Monitor },
  { step: "04", title: "Support", desc: "Post-training assistance & troubleshooting", icon: HeartHandshake },
];

const outcomes = [
  { text: "Higher software adoption rates", icon: TrendingUp },
  { text: "Reduced operational errors", icon: CheckCircle2 },
  { text: "Faster employee onboarding", icon: Zap },
  { text: "Better data-driven decisions", icon: Award },
];

// --- Animated Counter ---
function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let current = 0;
          const increment = target / 30;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 40);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-3xl md:text-4xl font-bold text-primary font-display">
      {count}{suffix}
    </div>
  );
}

// --- Page ---
const Training = () => (
  <>
    <Helmet>
      <title>Training & Knowledge Transfer | Nasif Kamal</title>
      <meta name="description" content="Professional ERP training, software onboarding, and technology knowledge transfer by Nasif Kamal." />
    </Helmet>
    <Layout>
      {/* Hero — compact */}
      <section className="pt-16 pb-12 md:pt-24 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,hsl(var(--primary)/0.08),transparent_50%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium mb-4">
              <GraduationCap className="w-3.5 h-3.5" />
              Training & Knowledge Transfer
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-foreground font-display mb-3 leading-tight">
              I help teams <span className="text-primary">master enterprise software</span>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg max-w-2xl">
              7+ years training 180+ professionals across 4 organizations on ERP systems, CRM platforms, and web applications.
            </p>
          </div>

          {/* Metrics strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10">
            {metrics.map((m) => (
              <div key={m.label} className="flex items-center gap-3 p-4 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
                <m.icon className="w-5 h-5 text-primary opacity-70 shrink-0" />
                <div>
                  <Counter target={m.value} suffix={m.suffix} />
                  <p className="text-xs text-muted-foreground mt-0.5">{m.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Diagram — horizontal flow */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground font-display mb-8 text-center">
            How I Train Teams
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {process.map((p, idx) => (
              <div key={idx} className="relative group">
                <div className="p-5 rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm text-center hover:border-primary/30 transition-colors">
                  <span className="text-xs font-bold text-primary/40 block mb-2">{p.step}</span>
                  <div className="w-10 h-10 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <p.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{p.desc}</p>
                </div>
                {idx < 3 && (
                  <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/30 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Programs — compact table-like cards */}
      <section className="py-12 md:py-16 relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.04),transparent_60%)]" />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-xl md:text-2xl font-bold text-foreground font-display mb-8 text-center">
            Organizations I've Trained
          </h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {programs.map((p, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-gradient-to-r ${p.color} backdrop-blur-sm hover:border-primary/30 transition-all`}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <p.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-foreground">{p.system}</h3>
                  <p className="text-xs text-muted-foreground">{p.org}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-lg font-bold text-primary">{p.users}</span>
                  <p className="text-xs text-muted-foreground">users</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes — simple icon grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground font-display mb-8 text-center">
            Training Outcomes
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {outcomes.map((item, idx) => (
              <div key={idx} className="text-center p-5 rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm">
                <div className="w-10 h-10 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-xs font-medium text-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  </>
);

export default Training;
