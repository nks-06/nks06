import { useState, useRef } from "react";
import { Upload, FileText, User, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { useToast } from "@/hooks/use-toast";
import { ImageCropper } from "./ImageCropper";
import { supabase } from "@/integrations/supabase/client";

export const AboutTab = () => {
  const { personalInfo, updatePersonalInfo, aboutStats, updateAboutStats, updateProfileImage, updateResume } = usePortfolio();
  const { toast } = useToast();
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [imageNumber, setImageNumber] = useState<1 | 2>(1);
  const [isUploading, setIsUploading] = useState(false);

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

  const handleCropComplete = async (croppedImage: string) => {
    setIsUploading(true);
    try {
      // Upload to cloud storage
      const { data, error } = await supabase.functions.invoke("upload-image", {
        body: {
          imageData: croppedImage,
          fileName: `profile-${imageNumber}.png`,
          folder: "profile",
        },
      });

      if (error) throw error;

      if (data?.url) {
        updateProfileImage(data.url, imageNumber);
        toast({
          title: "Image Updated",
          description: `Profile image ${imageNumber} has been uploaded to cloud storage.`,
        });
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      toast({
        title: "Upload Failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setImageToCrop(null);
    }
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        updateResume(reader.result as string);
        toast({
          title: "Resume Updated",
          description: "Your resume has been uploaded successfully.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="bg-muted/50 border border-border">
          <TabsTrigger value="info">Personal Info</TabsTrigger>
          <TabsTrigger value="images">Profile Images</TabsTrigger>
          <TabsTrigger value="resume">Resume</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>

        {/* Personal Info */}
        <TabsContent value="info">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    value={personalInfo.name}
                    onChange={(e) => updatePersonalInfo({ name: e.target.value })}
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={personalInfo.title}
                    onChange={(e) => updatePersonalInfo({ title: e.target.value })}
                    placeholder="Your Title"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Subtitle</label>
                  <Input
                    value={personalInfo.subtitle}
                    onChange={(e) => updatePersonalInfo({ subtitle: e.target.value })}
                    placeholder="Your Subtitle"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Bio</label>
                  <Textarea
                    value={personalInfo.bio}
                    onChange={(e) => updatePersonalInfo({ bio: e.target.value })}
                    placeholder="Tell about yourself..."
                    rows={5}
                  />
                </div>
              </div>
              <Button variant="hero" onClick={() => toast({ title: "Saved", description: "Personal info updated." })}>
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Images */}
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
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-primary/30 mb-4 relative">
                    <img
                      src={personalInfo.profileImage}
                      alt="Profile 1"
                      className="w-full h-full object-cover"
                    />
                    {isUploading && imageNumber === 1 && (
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef1}
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e, 1)}
                    className="hidden"
                  />
                  <Button variant="outline" onClick={() => fileInputRef1.current?.click()} disabled={isUploading}>
                    <Upload className="w-4 h-4 mr-2" />
                    Change Image
                  </Button>
                </div>

                {/* Profile Image 2 */}
                <div className="text-center">
                  <h3 className="font-semibold mb-4">About Section Image</h3>
                  <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden border-4 border-primary/30 mb-4 relative">
                    <img
                      src={personalInfo.profileImage2}
                      alt="Profile 2"
                      className="w-full h-full object-cover"
                    />
                    {isUploading && imageNumber === 2 && (
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef2}
                    accept="image/*"
                    onChange={(e) => handleFileSelect(e, 2)}
                    className="hidden"
                  />
                  <Button variant="outline" onClick={() => fileInputRef2.current?.click()} disabled={isUploading}>
                    <Upload className="w-4 h-4 mr-2" />
                    Change Image
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Resume */}
        <TabsContent value="resume">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Resume / CV
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {personalInfo.resumeUrl ? (
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-primary" />
                      <div>
                        <p className="font-medium">Resume Uploaded</p>
                        <p className="text-sm text-muted-foreground">Click to download or replace</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const link = document.createElement('a');
                          link.href = personalInfo.resumeUrl!;
                          link.download = 'resume.pdf';
                          link.click();
                        }}
                      >
                        Download
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => updateResume("")}
                      >
                        <X className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed border-border rounded-xl">
                    <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">No resume uploaded yet</p>
                    <Button variant="hero" onClick={() => resumeInputRef.current?.click()}>
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Resume
                    </Button>
                  </div>
                )}
                <input
                  type="file"
                  ref={resumeInputRef}
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="hidden"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stats */}
        <TabsContent value="stats">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>About Page Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Years of Experience</label>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateAboutStats({ yearsOfExperience: Math.max(0, aboutStats.yearsOfExperience - 1) })}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={aboutStats.yearsOfExperience}
                      onChange={(e) => updateAboutStats({ yearsOfExperience: parseInt(e.target.value) || 0 })}
                      className="text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateAboutStats({ yearsOfExperience: aboutStats.yearsOfExperience + 1 })}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Projects Completed</label>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateAboutStats({ projectsCompleted: Math.max(0, aboutStats.projectsCompleted - 1) })}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={aboutStats.projectsCompleted}
                      onChange={(e) => updateAboutStats({ projectsCompleted: parseInt(e.target.value) || 0 })}
                      className="text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateAboutStats({ projectsCompleted: aboutStats.projectsCompleted + 1 })}
                    >
                      +
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Certifications</label>
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateAboutStats({ certificationsCount: Math.max(0, aboutStats.certificationsCount - 1) })}
                    >
                      -
                    </Button>
                    <Input
                      type="number"
                      value={aboutStats.certificationsCount}
                      onChange={(e) => updateAboutStats({ certificationsCount: parseInt(e.target.value) || 0 })}
                      className="text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateAboutStats({ certificationsCount: aboutStats.certificationsCount + 1 })}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Image Cropper */}
      {imageToCrop && (
        <ImageCropper
          imageSrc={imageToCrop}
          isOpen={true}
          onClose={() => setImageToCrop(null)}
          onCropComplete={handleCropComplete}
          aspectRatio={1}
        />
      )}
    </div>
  );
};
