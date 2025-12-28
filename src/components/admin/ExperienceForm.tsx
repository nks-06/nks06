import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Experience } from "@/types/portfolio";

interface ExperienceFormProps {
  experience?: Experience;
  onSubmit: (data: Omit<Experience, "id">) => void;
  onCancel: () => void;
}

export const ExperienceForm = ({
  experience,
  onSubmit,
  onCancel,
}: ExperienceFormProps) => {
  const [formData, setFormData] = useState({
    company: experience?.company || "",
    position: experience?.position || "",
    startDate: experience?.startDate || "",
    endDate: experience?.endDate || "",
    description: experience?.description || "",
    responsibilities: experience?.responsibilities || [""],
    isCurrent: experience?.isCurrent || false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleResponsibilityChange = (index: number, value: string) => {
    const newResponsibilities = [...formData.responsibilities];
    newResponsibilities[index] = value;
    setFormData((prev) => ({
      ...prev,
      responsibilities: newResponsibilities,
    }));
  };

  const addResponsibility = () => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: [...prev.responsibilities, ""],
    }));
  };

  const removeResponsibility = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      endDate: formData.isCurrent ? "Present" : formData.endDate,
      responsibilities: formData.responsibilities.filter((r) => r.trim() !== ""),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Company Name</Label>
          <Input
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company Name"
            required
            className="mt-1"
          />
        </div>
        <div>
          <Label>Position</Label>
          <Input
            name="position"
            value={formData.position}
            onChange={handleChange}
            placeholder="Job Title"
            required
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Start Date</Label>
          <Input
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            placeholder="e.g., Jan 2023"
            required
            className="mt-1"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <Label>End Date</Label>
            <div className="flex items-center gap-2">
              <Switch
                checked={formData.isCurrent}
                onCheckedChange={(checked) =>
                  setFormData((prev) => ({ ...prev, isCurrent: checked }))
                }
              />
              <Label className="text-sm text-muted-foreground">Current</Label>
            </div>
          </div>
          <Input
            name="endDate"
            value={formData.isCurrent ? "Present" : formData.endDate}
            onChange={handleChange}
            placeholder="e.g., Dec 2024"
            disabled={formData.isCurrent}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label>Description</Label>
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Brief description of your role..."
          required
          rows={3}
          className="mt-1"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Key Responsibilities</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addResponsibility}
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
        <div className="space-y-2">
          {formData.responsibilities.map((resp, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={resp}
                onChange={(e) =>
                  handleResponsibilityChange(index, e.target.value)
                }
                placeholder="Responsibility..."
              />
              {formData.responsibilities.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeResponsibility(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="hero">
          {experience ? "Update" : "Add"} Experience
        </Button>
      </div>
    </form>
  );
};
