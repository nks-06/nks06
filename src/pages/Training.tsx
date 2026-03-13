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
  ChevronDown,
  Bot,
  FileText,
  Code2,
  Sparkles,
  Palette,
  Workflow,
} from "lucide-react";
import RecommendationsSection from "@/components/sections/RecommendationsSection";

// --- Data ---
const metrics = [
  { label: "Users Trained", value: 200, suffix: "+", icon: Users },
  { label: "Enterprise Systems", value: 6, suffix: "+", icon: Monitor },
  { label: "Sessions Conducted", value: 25, suffix: "+", icon: BookOpen },
  { label: "Organizations", value: 4, suffix: "+", icon: Building2 },
];

const programs = [
  { org: "JAAGO Foundation", system: "Odoo ERP", users: "40+", icon: Settings, color: "from-primary/20 to-primary/5", desc: "Full ERP deployment & team onboarding", tools: ["Odoo 16", "Inventory", "HR", "Accounting"], success: "95%" },
  { org: "JAAGO Foundation", system: "Zoho Suite", users: "30+", icon: BarChart3, color: "from-primary/15 to-primary/5", desc: "CRM, mail & project management setup", tools: ["Zoho CRM", "Zoho Projects", "Zoho Mail"], success: "92%" },
  { org: "Expo Accessories Ltd", system: "ERP System", users: "50+", icon: Target, color: "from-primary/20 to-primary/5", desc: "Manufacturing & supply chain training", tools: ["Custom ERP", "Excel Automation", "Reports"], success: "96%" },
  { org: "APM ERP", system: "APM ERP", users: "35+", icon: Monitor, color: "from-primary/15 to-primary/5", desc: "Enterprise resource planning & workflows", tools: ["APM Modules", "Dashboard", "Analytics"], success: "90%" },
  { org: "Workspace Infotech", system: "Web App", users: "25+", icon: Globe, color: "from-primary/20 to-primary/5", desc: "Web application user training & support", tools: ["React Apps", "Admin Panels", "APIs"], success: "93%" },
  { org: "Multiple Organizations", system: "AI Tools Training", users: "20+", icon: Zap, color: "from-primary/15 to-primary/5", desc: "AI productivity & automation workflows", tools: ["ChatGPT", "Gemini", "Copilot", "Midjourney"], success: "97%" },
];

const process = [
  { step: "01", title: "Assess", desc: "Evaluate team skill levels, system requirements, and organizational goals to build a targeted training plan.", tags: ["Needs Analysis", "System Audit", "Gap Assessment"] },
  { step: "02", title: "Design", desc: "Create structured curriculum with real-world workflows, user manuals, and hands-on exercises tailored to each department.", tags: ["Curriculum Design", "User Manuals", "Workflow Mapping"] },
  { step: "03", title: "Deliver", desc: "Conduct interactive sessions with live system demos, role-based training, and real operational data simulations.", tags: ["Live Demos", "Hands-on Training", "Q&A Sessions"] },
  { step: "04", title: "Support", desc: "Provide post-training troubleshooting, continuous user assistance, and performance monitoring for lasting adoption.", tags: ["Troubleshooting", "User Assistance", "Performance Review"] },
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

// --- AI Tools Training Section ---
const aiTopics = [
  { title: "AI Productivity Tools", desc: "Streamline daily business workflows using AI assistants for email, scheduling, and task management.", icon: Sparkles },
  { title: "Prompt Engineering", desc: "Master effective prompt crafting for consistent, high-quality AI outputs across models.", icon: Bot },
  { title: "AI Documentation & Reporting", desc: "Automate reports, summaries, and documentation using AI-powered writing tools.", icon: FileText },
  { title: "AI for Software Development", desc: "Leverage code assistants, debugging tools, and AI pair programming for faster development.", icon: Code2 },
  { title: "Automation with AI", desc: "Build no-code/low-code automations connecting AI tools to business processes.", icon: Workflow },
  { title: "AI Content & Data Generation", desc: "Generate marketing content, data analysis, and visual assets with AI platforms.", icon: Palette },
];

const aiTools = [
  { name: "ChatGPT / GPT-4o", category: "Conversational AI" },
  { name: "Google Gemini", category: "Multimodal AI" },
  { name: "GitHub Copilot", category: "Code Assistant" },
  { name: "Claude AI", category: "Research & Analysis" },
  { name: "Midjourney / DALL·E", category: "Image Generation" },
  { name: "Notion AI", category: "Productivity" },
  { name: "Zapier AI / Make", category: "Automation" },
  { name: "Gamma / Canva AI", category: "Design & Presentations" },
  { name: "Cursor AI", category: "Dev Environment" },
  { name: "Perplexity AI", category: "Research" },
];

const aiUseCases = [
  "Automated email drafting & responses",
  "Meeting summaries & action items",
  "Data analysis & visualization",
  "Code generation & review",
  "Content creation at scale",
  "Document translation & formatting",
];

function AIToolsTrainingSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    const willExpand = !isExpanded;
    setIsExpanded(willExpand);
    if (willExpand) {
      setTimeout(() => {
        contentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);
    }
  };

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div ref={contentRef} className="text-center mb-8 scroll-mt-20">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-medium mb-4">
              <Zap className="w-3.5 h-3.5" />
              Specialized Program
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground font-display">
              AI Tools Training for Productivity & Automation
            </h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-2xl mx-auto">
              Empowering 20+ professionals across multiple organizations with practical AI skills for everyday work.
            </p>
          </div>

          {/* Toggle Button */}
          <button
            onClick={handleToggle}
            className="mx-auto flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium hover:bg-primary/10 transition-all mb-6"
          >
            {isExpanded ? "Hide Details" : "View Full Program Details"}
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
          </button>

          {/* Expandable Content */}
          <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}>
            {/* Topics Grid */}
            <div className="mb-8">
              <h3 className="text-base font-bold text-foreground font-display mb-4">Topics Covered</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {aiTopics.map((t, idx) => (
                  <div key={idx} className={`flex items-start gap-3 p-4 rounded-xl border border-border/50 bg-card/50 hover:border-primary/30 transition-all ${isExpanded ? "animate-fade-in" : ""}`} style={{ animationDelay: `${idx * 80}ms`, animationFillMode: "both" }}>
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <t.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-foreground mb-1">{t.title}</h4>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{t.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tools & Use Cases */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Tools */}
              <div>
                <h3 className="text-base font-bold text-foreground font-display mb-4">AI Tools Covered</h3>
                <div className="space-y-2">
                  {aiTools.map((tool, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-card/30">
                      <span className="text-xs font-medium text-foreground">{tool.name}</span>
                      <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full">{tool.category}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Use Cases */}
              <div>
                <h3 className="text-base font-bold text-foreground font-display mb-4">Real-World Use Cases</h3>
                <div className="space-y-2">
                  {aiUseCases.map((uc, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-card/30">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-xs text-foreground">{uc}</span>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-4 p-4 rounded-xl border border-primary/20 bg-primary/5">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <p className="text-lg font-bold text-primary">20+</p>
                      <p className="text-[10px] text-muted-foreground">Trained</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-primary">97%</p>
                      <p className="text-[10px] text-muted-foreground">Success Rate</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-primary">10+</p>
                      <p className="text-[10px] text-muted-foreground">AI Tools</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
              <div key={m.label} className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm">
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

      {/* How I Train Teams — card blocks */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-bold text-foreground font-display mb-8 text-center">
            How I Train Teams
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {process.map((p, idx) => (
              <div key={idx} className="group p-6 rounded-xl border border-border/50 bg-card hover:border-primary/30 transition-all">
                <h3 className="text-base font-bold text-foreground mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
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
          <div className="max-w-4xl mx-auto space-y-3">
            {programs.map((p, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-xl border border-border/50 bg-gradient-to-r ${p.color} backdrop-blur-sm hover:border-primary/30 transition-all`}
              >
                <div className="flex items-center gap-3 md:gap-4">
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
                <p className="text-xs text-muted-foreground mt-2 ml-0 md:ml-14">{p.desc}</p>
                <div className="flex items-center gap-3 mt-3 ml-0 md:ml-14 flex-wrap">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tools.map((tool, i) => (
                      <span key={i} className="text-[10px] font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">{tool}</span>
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold bg-green-500/15 text-green-500 px-2 py-0.5 rounded-full ml-auto shrink-0">
                    {p.success} Success Rate
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Tools Training — Expandable Detail */}
      <AIToolsTrainingSection />

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

      {/* Recommendations */}
      <RecommendationsSection />
    </Layout>
  </>
);

export default Training;
