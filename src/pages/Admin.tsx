import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Settings, Briefcase, GraduationCap, Zap, FolderKanban, Phone, User, Key, Users, LogOut, MessageSquare } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { ExperienceForm } from "@/components/admin/ExperienceForm";
import { EducationTab } from "@/components/admin/EducationTab";
import { SkillsTab } from "@/components/admin/SkillsTab";
import { ProjectsTab } from "@/components/admin/ProjectsTab";
import { ContactTab } from "@/components/admin/ContactTab";
import { AboutTab } from "@/components/admin/AboutTab";
import { ApiSettingsTab } from "@/components/admin/ApiSettingsTab";
import { VisitorsTab } from "@/components/admin/VisitorsTab";
import { MessagesTab } from "@/components/admin/MessagesTab";
import { useToast } from "@/hooks/use-toast";
import { Experience } from "@/types/portfolio";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Edit2, Trash2 } from "lucide-react";

const Admin = () => {
  const { experiences, addExperience, updateExperience, deleteExperience } = usePortfolio();
  const { toast } = useToast();
  const [isExperienceDialogOpen, setIsExperienceDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if admin session exists
    const session = sessionStorage.getItem("admin_session");
    setIsAuthenticated(!!session);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_session");
    setIsAuthenticated(false);
    toast({ title: "Logged Out", description: "You have been logged out." });
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={() => setIsAuthenticated(true)} />
  }

  const handleAddExperience = (data: Omit<Experience, "id">) => {
    addExperience(data);
    setIsExperienceDialogOpen(false);
    toast({ title: "Experience Added", description: "New work experience has been added." });
  };

  const handleUpdateExperience = (data: Omit<Experience, "id">) => {
    if (editingExperience) {
      updateExperience(editingExperience.id, data);
      setEditingExperience(null);
      setIsExperienceDialogOpen(false);
      toast({ title: "Experience Updated", description: "Work experience has been updated." });
    }
  };

  const handleDeleteExperience = (id: string) => {
    if (confirm("Are you sure you want to delete this experience?")) {
      deleteExperience(id);
      toast({ title: "Experience Deleted", description: "Work experience has been removed." });
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Panel | Nasif Kamal Portfolio</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Layout>
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <Settings className="w-8 h-8 text-primary animate-spin-slow" />
                <h1 className="text-3xl font-bold">Admin Panel</h1>
              </div>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>

            <Tabs defaultValue="about" className="space-y-8">
              <TabsList className="bg-card border border-border flex-wrap h-auto gap-1 p-2">
                <TabsTrigger value="about" className="gap-2"><User className="w-4 h-4" />About Me</TabsTrigger>
                <TabsTrigger value="experiences" className="gap-2"><Briefcase className="w-4 h-4" />Experiences</TabsTrigger>
                <TabsTrigger value="education" className="gap-2"><GraduationCap className="w-4 h-4" />Education</TabsTrigger>
                <TabsTrigger value="skills" className="gap-2"><Zap className="w-4 h-4" />Skills</TabsTrigger>
                <TabsTrigger value="projects" className="gap-2"><FolderKanban className="w-4 h-4" />Projects</TabsTrigger>
                <TabsTrigger value="contact" className="gap-2"><Phone className="w-4 h-4" />Contact</TabsTrigger>
                <TabsTrigger value="messages" className="gap-2"><MessageSquare className="w-4 h-4" />Messages</TabsTrigger>
                <TabsTrigger value="api" className="gap-2"><Key className="w-4 h-4" />API Settings</TabsTrigger>
                <TabsTrigger value="visitors" className="gap-2"><Users className="w-4 h-4" />Visitors</TabsTrigger>
              </TabsList>

              <TabsContent value="about"><AboutTab /></TabsContent>
              
              <TabsContent value="experiences">
                <Card className="bg-card border-border">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Work Experiences</CardTitle>
                    <Button variant="hero" size="sm" onClick={() => { setEditingExperience(null); setIsExperienceDialogOpen(true); }}>
                      <Plus className="w-4 h-4 mr-2" />Add Experience
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {experiences.map((exp) => (
                        <div key={exp.id} className="flex items-start justify-between p-4 bg-muted/50 rounded-xl">
                          <div>
                            <h3 className="font-semibold text-foreground">{exp.position}</h3>
                            <p className="text-primary text-sm">{exp.company}</p>
                            <p className="text-muted-foreground text-sm">{exp.startDate} – {exp.endDate}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon" onClick={() => { setEditingExperience(exp); setIsExperienceDialogOpen(true); }}><Edit2 className="w-4 h-4" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteExperience(exp.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="education"><EducationTab /></TabsContent>
              <TabsContent value="skills"><SkillsTab /></TabsContent>
              <TabsContent value="projects"><ProjectsTab /></TabsContent>
              <TabsContent value="contact"><ContactTab /></TabsContent>
              <TabsContent value="messages"><MessagesTab /></TabsContent>
              <TabsContent value="api"><ApiSettingsTab /></TabsContent>
              <TabsContent value="visitors"><VisitorsTab /></TabsContent>
            </Tabs>

            <Dialog open={isExperienceDialogOpen} onOpenChange={setIsExperienceDialogOpen}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingExperience ? "Edit" : "Add"} Work Experience</DialogTitle>
                </DialogHeader>
                <ExperienceForm
                  experience={editingExperience || undefined}
                  onSubmit={editingExperience ? handleUpdateExperience : handleAddExperience}
                  onCancel={() => { setEditingExperience(null); setIsExperienceDialogOpen(false); }}
                />
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Admin;
