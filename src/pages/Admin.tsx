import { useState, useRef } from "react";
import { Helmet } from "react-helmet-async";
import {
  Settings,
  Briefcase,
  Image,
  Mail,
  Plus,
  Edit2,
  Trash2,
  Upload,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { ExperienceForm } from "@/components/admin/ExperienceForm";
import { ImageCropper } from "@/components/admin/ImageCropper";
import { useToast } from "@/hooks/use-toast";
import { Experience, ContactMessage } from "@/types/portfolio";

const Admin = () => {
  const { experiences, personalInfo, addExperience, updateExperience, deleteExperience, updateProfileImage } = usePortfolio();
  const { toast } = useToast();
  
  const [isExperienceDialogOpen, setIsExperienceDialogOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [imageNumber, setImageNumber] = useState<1 | 2>(1);
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  const [messages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem("contact_messages");
    return saved ? JSON.parse(saved) : [];
  });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>, imgNum: 1 | 2) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageToCrop(reader.result as string);
        setImageNumber(imgNum);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedImage: string) => {
    updateProfileImage(croppedImage, imageNumber);
    toast({
      title: "Image Updated",
      description: `Profile image ${imageNumber} has been updated successfully.`,
    });
    setImageToCrop(null);
  };

  const handleAddExperience = (data: Omit<Experience, "id">) => {
    addExperience(data);
    setIsExperienceDialogOpen(false);
    toast({
      title: "Experience Added",
      description: "New work experience has been added.",
    });
  };

  const handleUpdateExperience = (data: Omit<Experience, "id">) => {
    if (editingExperience) {
      updateExperience(editingExperience.id, data);
      setEditingExperience(null);
      setIsExperienceDialogOpen(false);
      toast({
        title: "Experience Updated",
        description: "Work experience has been updated.",
      });
    }
  };

  const handleDeleteExperience = (id: string) => {
    if (confirm("Are you sure you want to delete this experience?")) {
      deleteExperience(id);
      toast({
        title: "Experience Deleted",
        description: "Work experience has been removed.",
      });
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Panel | Nasif Kamal Portfolio</title>
      </Helmet>
      <Layout>
        <section className="py-20">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex items-center gap-3 mb-8">
              <Settings className="w-8 h-8 text-primary" />
              <h1 className="text-3xl font-bold">Admin Panel</h1>
            </div>

            <Tabs defaultValue="experiences" className="space-y-8">
              <TabsList className="bg-card border border-border">
                <TabsTrigger value="experiences" className="gap-2">
                  <Briefcase className="w-4 h-4" />
                  Experiences
                </TabsTrigger>
                <TabsTrigger value="images" className="gap-2">
                  <Image className="w-4 h-4" />
                  Profile Images
                </TabsTrigger>
                <TabsTrigger value="messages" className="gap-2">
                  <Mail className="w-4 h-4" />
                  Messages
                </TabsTrigger>
              </TabsList>

              {/* Experiences Tab */}
              <TabsContent value="experiences">
                <Card className="bg-card border-border">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Work Experiences</CardTitle>
                    <Button
                      variant="hero"
                      size="sm"
                      onClick={() => {
                        setEditingExperience(null);
                        setIsExperienceDialogOpen(true);
                      }}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Experience
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {experiences.map((exp) => (
                        <div
                          key={exp.id}
                          className="flex items-start justify-between p-4 bg-muted/50 rounded-xl"
                        >
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {exp.position}
                            </h3>
                            <p className="text-primary text-sm">{exp.company}</p>
                            <p className="text-muted-foreground text-sm">
                              {exp.startDate} – {exp.endDate}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setEditingExperience(exp);
                                setIsExperienceDialogOpen(true);
                              }}
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteExperience(exp.id)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Profile Images Tab */}
              <TabsContent value="images">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>Profile Images</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Profile Image 1 */}
                      <div className="text-center">
                        <h3 className="font-semibold mb-4">Hero Section Image</h3>
                        <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-primary/30 mb-4">
                          <img
                            src={personalInfo.profileImage}
                            alt="Profile 1"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <input
                          type="file"
                          ref={fileInputRef1}
                          accept="image/*"
                          onChange={(e) => handleFileSelect(e, 1)}
                          className="hidden"
                        />
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef1.current?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Change Image
                        </Button>
                      </div>

                      {/* Profile Image 2 */}
                      <div className="text-center">
                        <h3 className="font-semibold mb-4">About Section Image</h3>
                        <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden border-4 border-primary/30 mb-4">
                          <img
                            src={personalInfo.profileImage2}
                            alt="Profile 2"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <input
                          type="file"
                          ref={fileInputRef2}
                          accept="image/*"
                          onChange={(e) => handleFileSelect(e, 2)}
                          className="hidden"
                        />
                        <Button
                          variant="outline"
                          onClick={() => fileInputRef2.current?.click()}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          Change Image
                        </Button>
                      </div>
                    </div>

                    <div className="mt-8 p-4 bg-muted/50 rounded-xl">
                      <h4 className="font-semibold mb-2">Email Notifications</h4>
                      <p className="text-muted-foreground text-sm mb-4">
                        To enable email notifications for contact form submissions,
                        connect a Resend API key through Lovable Cloud.
                      </p>
                      <Button variant="outline" size="sm" disabled>
                        Configure Email (Requires Resend API)
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Messages Tab */}
              <TabsContent value="messages">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>Contact Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {messages.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">
                        No messages yet.
                      </p>
                    ) : (
                      <div className="space-y-4">
                        {messages.map((msg) => (
                          <div
                            key={msg.id}
                            className="p-4 bg-muted/50 rounded-xl"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold">{msg.name}</h3>
                                <p className="text-primary text-sm">{msg.email}</p>
                              </div>
                              <span className="text-muted-foreground text-xs">
                                {new Date(msg.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm font-medium mb-1">{msg.subject}</p>
                            <p className="text-muted-foreground text-sm">
                              {msg.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Experience Dialog */}
            <Dialog open={isExperienceDialogOpen} onOpenChange={setIsExperienceDialogOpen}>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingExperience ? "Edit" : "Add"} Work Experience
                  </DialogTitle>
                </DialogHeader>
                <ExperienceForm
                  experience={editingExperience || undefined}
                  onSubmit={editingExperience ? handleUpdateExperience : handleAddExperience}
                  onCancel={() => {
                    setEditingExperience(null);
                    setIsExperienceDialogOpen(false);
                  }}
                />
              </DialogContent>
            </Dialog>

            {/* Image Cropper */}
            {imageToCrop && (
              <ImageCropper
                imageSrc={imageToCrop}
                isOpen={true}
                onClose={() => setImageToCrop(null)}
                onCropComplete={handleCropComplete}
                aspectRatio={imageNumber === 1 ? 1 : 1}
              />
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Admin;
