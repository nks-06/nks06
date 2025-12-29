import { useState } from "react";
import { Key, MessageCircle, Mail, Eye, EyeOff, Save, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const ApiSettingsTab = () => {
  const { apiSettings, updateApiSettings } = usePortfolio();
  const { toast } = useToast();
  const [showResendKey, setShowResendKey] = useState(false);
  const [showWhatsappKey, setShowWhatsappKey] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  const handleSaveApiSettings = () => {
    toast({
      title: "API Settings Saved",
      description: "Your API keys have been saved securely.",
    });
  };

  const handlePasswordChange = async () => {
    if (!currentPassword) {
      toast({
        title: "Error",
        description: "Please enter your current password.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Error",
        description: "New password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }

    setIsUpdatingPassword(true);
    try {
      const { data, error } = await supabase.functions.invoke("update-admin-password", {
        body: { currentPassword, newPassword },
      });

      if (error) throw error;

      if (data?.error) {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      setCurrentPassword("");
      setNewPassword("");
      toast({
        title: "Password Updated",
        description: "Admin password has been changed successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update password.",
        variant: "destructive",
      });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Admin Password */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            Admin Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Change the password used to access the admin panel.
          </p>
          <div className="space-y-3">
            <div className="relative">
              <Input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Current password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <div className="relative">
              <Input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <Button 
              variant="hero" 
              onClick={handlePasswordChange} 
              disabled={isUpdatingPassword}
              className="w-full"
            >
              {isUpdatingPassword ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Email API (Resend) */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Email API (Resend)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Enter your Resend API key to enable email notifications for contact form submissions.
            Get your API key from{" "}
            <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              resend.com
            </a>
          </p>
          <div className="relative">
            <Input
              type={showResendKey ? "text" : "password"}
              value={apiSettings.resendApiKey}
              onChange={(e) => updateApiSettings({ resendApiKey: e.target.value })}
              placeholder="re_xxxxxxxxxxxxxxxxxxxx"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowResendKey(!showResendKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {showResendKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </CardContent>
      </Card>

      {/* WhatsApp Business API */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-primary" />
            WhatsApp Business API
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">
            Enter your WhatsApp Business API credentials to enable WhatsApp messaging.
            Get your credentials from the{" "}
            <a href="https://developers.facebook.com/docs/whatsapp" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              Meta Developer Portal
            </a>
          </p>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Access Token</label>
              <div className="relative mt-1">
                <Input
                  type={showWhatsappKey ? "text" : "password"}
                  value={apiSettings.whatsappApiKey}
                  onChange={(e) => updateApiSettings({ whatsappApiKey: e.target.value })}
                  placeholder="Your WhatsApp API access token"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowWhatsappKey(!showWhatsappKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showWhatsappKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Phone Number ID</label>
              <Input
                value={apiSettings.whatsappPhoneId}
                onChange={(e) => updateApiSettings({ whatsappPhoneId: e.target.value })}
                placeholder="Your WhatsApp phone number ID"
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button variant="hero" size="lg" onClick={handleSaveApiSettings} className="w-full">
        <Save className="w-4 h-4 mr-2" />
        Save All API Settings
      </Button>
    </div>
  );
};
