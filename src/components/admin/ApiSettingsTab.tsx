import { useState } from "react";
import { Key, MessageCircle, Mail, Eye, EyeOff, Save, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { useToast } from "@/hooks/use-toast";

export const ApiSettingsTab = () => {
  const { apiSettings, updateApiSettings, adminPassword, setAdminPassword } = usePortfolio();
  const { toast } = useToast();
  const [showResendKey, setShowResendKey] = useState(false);
  const [showWhatsappKey, setShowWhatsappKey] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const handleSaveApiSettings = () => {
    toast({
      title: "API Settings Saved",
      description: "Your API keys have been saved securely.",
    });
  };

  const handlePasswordChange = () => {
    if (newPassword.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters.",
        variant: "destructive",
      });
      return;
    }
    setAdminPassword(newPassword);
    setNewPassword("");
    toast({
      title: "Password Updated",
      description: "Admin password has been changed successfully.",
    });
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
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <Button variant="hero" onClick={handlePasswordChange}>
              Update Password
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
