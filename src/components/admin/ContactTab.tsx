import { useState } from "react";
import { Plus, Edit2, Trash2, Share2, Linkedin, MessageCircle, Github, Twitter, Facebook, Instagram, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { useToast } from "@/hooks/use-toast";
import { SocialLink } from "@/types/portfolio";

const socialIcons: Record<string, React.ReactNode> = {
  linkedin: <Linkedin className="w-5 h-5" />,
  whatsapp: <MessageCircle className="w-5 h-5" />,
  github: <Github className="w-5 h-5" />,
  twitter: <Twitter className="w-5 h-5" />,
  facebook: <Facebook className="w-5 h-5" />,
  instagram: <Instagram className="w-5 h-5" />,
  website: <Globe className="w-5 h-5" />,
};

const socialPlatforms = [
  { value: "linkedin", label: "LinkedIn" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "github", label: "GitHub" },
  { value: "twitter", label: "Twitter" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "website", label: "Website" },
];

export const ContactTab = () => {
  const { personalInfo, updatePersonalInfo, socialLinks, addSocialLink, updateSocialLink, deleteSocialLink } = usePortfolio();
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<SocialLink | null>(null);
  const [form, setForm] = useState({
    platform: "",
    url: "",
    icon: "",
  });

  const resetForm = () => {
    setForm({ platform: "", url: "", icon: "" });
    setEditingItem(null);
  };

  const handleContactSubmit = () => {
    toast({ title: "Contact Info Updated", description: "Your contact information has been updated." });
  };

  const handleSocialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = { ...form, icon: form.platform };
    
    if (editingItem) {
      updateSocialLink(editingItem.id, data);
      toast({ title: "Social Link Updated", description: "Social link has been updated." });
    } else {
      addSocialLink(data);
      toast({ title: "Social Link Added", description: "New social link has been added." });
    }
    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (item: SocialLink) => {
    setEditingItem(item);
    setForm({
      platform: item.platform,
      url: item.url,
      icon: item.icon,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this social link?")) {
      deleteSocialLink(id);
      toast({ title: "Social Link Deleted", description: "Social link has been removed." });
    }
  };

  return (
    <div className="space-y-6">
      {/* Contact Info Card */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                value={personalInfo.email}
                onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input
                value={personalInfo.phone}
                onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                placeholder="+1234567890"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Location</label>
              <Input
                value={personalInfo.location}
                onChange={(e) => updatePersonalInfo({ location: e.target.value })}
                placeholder="City, Country"
              />
            </div>
          </div>
          <Button variant="hero" onClick={handleContactSubmit}>
            Save Contact Info
          </Button>
        </CardContent>
      </Card>

      {/* Social Links Card */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-primary" />
            Social Links
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
            Add Social Link
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {socialLinks.map((link) => (
              <div
                key={link.id}
                className="flex items-center justify-between p-4 bg-muted/50 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {socialIcons[link.icon] || <Globe className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{link.platform}</h3>
                    <p className="text-muted-foreground text-sm truncate max-w-xs">{link.url}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(link)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" onClick={() => handleDelete(link.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? "Edit" : "Add"} Social Link</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSocialSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Platform</label>
              <Select
                value={form.platform}
                onValueChange={(value) => setForm({ ...form, platform: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {socialPlatforms.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      <div className="flex items-center gap-2">
                        {socialIcons[p.value]}
                        {p.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">URL / Handle</label>
              <Input
                value={form.url}
                onChange={(e) => setForm({ ...form, url: e.target.value })}
                placeholder="https://... or phone number for WhatsApp"
                required
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="hero">
                {editingItem ? "Update" : "Add"} Social Link
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
