import { useState } from "react";
import { Plus, Edit2, Trash2, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { useToast } from "@/hooks/use-toast";
import { Education } from "@/types/portfolio";

export const EducationTab = () => {
  const { educationList, addEducation, updateEducation, deleteEducation } = usePortfolio();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Education | null>(null);
  const [form, setForm] = useState({
    degree: "",
    institution: "",
    year: "",
    gpa: "",
  });

  const resetForm = () => {
    setForm({ degree: "", institution: "", year: "", gpa: "" });
    setEditingItem(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateEducation(editingItem.id, form);
      toast({ title: "Education Updated", description: "Education entry has been updated." });
    } else {
      addEducation(form);
      toast({ title: "Education Added", description: "New education entry has been added." });
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (item: Education) => {
    setEditingItem(item);
    setForm({
      degree: item.degree,
      institution: item.institution,
      year: item.year,
      gpa: item.gpa,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this education entry?")) {
      deleteEducation(id);
      toast({ title: "Education Deleted", description: "Education entry has been removed." });
    }
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-primary" />
          Education
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
          Add Education
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {educationList.map((edu) => (
            <div
              key={edu.id}
              className="flex items-start justify-between p-4 bg-muted/50 rounded-xl"
            >
              <div>
                <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                <p className="text-primary text-sm">{edu.institution}</p>
                <p className="text-muted-foreground text-sm">GPA: {edu.gpa}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(edu)}>
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(edu.id)}>
                  <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit" : "Add"} Education</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Degree</label>
              <Input
                value={form.degree}
                onChange={(e) => setForm({ ...form, degree: e.target.value })}
                placeholder="e.g., Bachelor of Science in Computer Science"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Institution</label>
              <Input
                value={form.institution}
                onChange={(e) => setForm({ ...form, institution: e.target.value })}
                placeholder="e.g., University Name"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Year</label>
                <Input
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  placeholder="e.g., 2020"
                />
              </div>
              <div>
                <label className="text-sm font-medium">GPA</label>
                <Input
                  value={form.gpa}
                  onChange={(e) => setForm({ ...form, gpa: e.target.value })}
                  placeholder="e.g., 3.5/4.0"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="hero">
                {editingItem ? "Update" : "Add"} Education
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
