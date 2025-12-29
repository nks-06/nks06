import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      console.error("RESEND_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "Email service not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const resend = new Resend(resendApiKey);
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get admin email
    const { data: adminSettings, error: fetchError } = await supabase
      .from("admin_settings")
      .select("admin_email")
      .limit(1)
      .maybeSingle();

    if (fetchError || !adminSettings) {
      console.error("Error fetching admin settings:", fetchError);
      return new Response(
        JSON.stringify({ error: "Admin settings not found" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    // Store reset token
    const { error: insertError } = await supabase
      .from("password_reset_tokens")
      .insert({
        token: resetToken,
        expires_at: expiresAt.toISOString(),
      });

    if (insertError) {
      console.error("Error storing reset token:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to create reset token" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get the origin from request headers or use a default
    const origin = req.headers.get("origin") || "https://your-app.lovable.app";
    const resetLink = `${origin}/admin/reset-password?token=${resetToken}`;

    // Send email
    const emailResponse = await resend.emails.send({
      from: "Portfolio Admin <onboarding@resend.dev>",
      to: [adminSettings.admin_email],
      subject: "Password Reset Request",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #d4a739;">Password Reset Request</h1>
          <p>You have requested to reset your admin password for your portfolio website.</p>
          <p>Click the button below to reset your password:</p>
          <a href="${resetLink}" style="display: inline-block; background-color: #d4a739; color: #1a1a2e; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0;">
            Reset Password
          </a>
          <p style="color: #666; font-size: 14px;">This link will expire in 1 hour.</p>
          <p style="color: #666; font-size: 14px;">If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });

    console.log("Password reset email sent:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, message: "Password reset email sent" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Password reset error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send reset email" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
