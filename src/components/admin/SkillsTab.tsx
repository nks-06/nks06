import { useState } from "react";
import { Plus, Edit2, Trash2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { useToast } from "@/hooks/use-toast";
import { Skill } from "@/types/portfolio";

export const SkillsTab = () => {
  const { skills, addSkill, updateSkill, deleteSkill } = usePortfolio();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Skill | null>(null);
  const [form, setForm] = useState({
    name: "",
    level: 80,
    category: "",
  });

  const resetForm = () => {
    setForm({ name: "", level: 80, category: "" });
    setEditingItem(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateSkill(editingItem.id, form);
      toast({ title: "Skill Updated", description: "Skill has been updated." });
    } else {
      addSkill(form);
      toast({ title: "Skill Added", description: "New skill has been added." });
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (item: Skill) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      level: item.level,
      category: item.category,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this skill?")) {
      deleteSkill(id);
      toast({ title: "Skill Deleted", description: "Skill has been removed." });
    }
  };

  const handleLevelChange = (id: string, newLevel: number[]) => {
    updateSkill(id, { level: newLevel[0] });
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-primary" />
          Skills
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
          Add Skill
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="p-4 bg-muted/50 rounded-xl"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-foreground">{skill.name}</h3>
                  <p className="text-muted-foreground text-sm">{skill.category}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(skill)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(skill.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Slider
                  value={[skill.level]}
                  onValueChange={(value) => handleLevelChange(skill.id, value)}
                  max={100}
                  min={0}
                  step={1}
                  className="flex-1"
                />
                <span className="text-primary font-semibold w-12 text-right">{skill.level}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit" : "Add"} Skill</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Skill Name</label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g., React.js"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Category</label>
              <Input
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="e.g., Frontend Development"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Proficiency Level: {form.level}%</label>
              <Slider
                value={[form.level]}
                onValueChange={(value) => setForm({ ...form, level: value[0] })}
                max={100}
                min={0}
                step={1}
                className="mt-2"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="hero">
                {editingItem ? "Update" : "Add"} Skill
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
