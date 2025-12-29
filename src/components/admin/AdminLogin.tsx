import { useState } from "react";
import { Lock, Eye, EyeOff, Mail, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface AdminLoginProps {
  onLogin: () => void;
}

export const AdminLogin = ({ onLogin }: AdminLoginProps) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data, error: funcError } = await supabase.functions.invoke("admin-login", {
        body: { password },
      });

      if (funcError) {
        throw new Error(funcError.message);
      }

      if (data?.error) {
        setError(data.error);
        return;
      }

      if (data?.success) {
        sessionStorage.setItem("admin_session", data.sessionToken);
        toast({
          title: "Welcome!",
          description: "You have successfully logged into the admin panel.",
        });
        onLogin();
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setIsResetting(true);
    setError("");

    try {
      const { data, error: funcError } = await supabase.functions.invoke("send-password-reset", {
        body: {},
      });

      if (funcError) {
        throw new Error(funcError.message);
      }

      if (data?.error) {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Email Sent",
        description: "Password reset link has been sent to your admin email.",
      });
    } catch (err) {
      console.error("Reset error:", err);
      toast({
        title: "Error",
        description: "Failed to send reset email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass-card border-border animate-scale-in">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Admin Access</CardTitle>
          <p className="text-muted-foreground text-sm mt-2">
            Enter your password to access the admin panel
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="pr-10 bg-muted/50 border-border"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {error && (
              <p className="text-destructive text-sm">{error}</p>
            )}
            <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={isResetting}
              className="text-sm text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2"
            >
              {isResetting ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Sending reset link...
                </>
              ) : (
                <>
                  <Mail className="w-3 h-3" />
                  Forgot password? Send reset link
                </>
              )}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
