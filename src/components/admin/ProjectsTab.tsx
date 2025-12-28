import { useState, useRef } from "react";
import { Plus, Edit2, Trash2, FolderKanban, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { useToast } from "@/hooks/use-toast";
import { Project } from "@/types/portfolio";

export const ProjectsTab = () => {
  const { projects, addProject, updateProject, deleteProject } = usePortfolio();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Project | null>(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    technologies: "",
    imageUrl: "",
    liveUrl: "",
    githubUrl: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const resetForm = () => {
    setForm({ title: "", description: "", technologies: "", imageUrl: "", liveUrl: "", githubUrl: "" });
    setEditingItem(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const projectData = {
      ...form,
      technologies: form.technologies.split(",").map((t) => t.trim()).filter(Boolean),
    };
    
    if (editingItem) {
      updateProject(editingItem.id, projectData);
      toast({ title: "Project Updated", description: "Project has been updated." });
    } else {
      addProject(projectData);
      toast({ title: "Project Added", description: "New project has been added." });
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (item: Project) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      description: item.description,
      technologies: item.technologies.join(", "),
      imageUrl: item.imageUrl || "",
      liveUrl: item.liveUrl || "",
      githubUrl: item.githubUrl || "",
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      deleteProject(id);
      toast({ title: "Project Deleted", description: "Project has been removed." });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm({ ...form, imageUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <FolderKanban className="w-5 h-5 text-primary" />
          Projects
        </CardTitle>
        <Button
          variant="hero"
          size="sm"
          onClick={() => {
            resetForm();
            setIsDialogOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </CardHeader>
      <CardContent>
        {projects.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            No projects yet. Add your first project!
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-4 bg-muted/50 rounded-xl"
              >
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                )}
                <h3 className="font-semibold text-foreground">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-2 line-clamp-2">{project.description}</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit" : "Add"} Project</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Project Title</label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g., E-Commerce Platform"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Describe the project..."
                rows={3}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Technologies (comma-separated)</label>
              <Input
                value={form.technologies}
                onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                placeholder="e.g., React, Node.js, PostgreSQL"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Project Image</label>
              <div className="mt-2">
                {form.imageUrl ? (
                  <div className="relative w-full h-32 rounded-lg overflow-hidden">
                    <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setForm({ ...form, imageUrl: "" })}
                      className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-1 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Image
                  </Button>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Live URL</label>
                <Input
                  value={form.liveUrl}
                  onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="text-sm font-medium">GitHub URL</label>
                <Input
                  value={form.githubUrl}
                  onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
                  placeholder="https://github.com/..."
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="hero">
                {editingItem ? "Update" : "Add"} Project
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
