import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
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

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const resend = new Resend(resendApiKey);
    const { name, email, subject, message }: ContactEmailRequest = await req.json();

    console.log("Received contact form submission:", { name, email, subject });

    // Validate input
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Store message in database
    const { error: dbError } = await supabase
      .from("contact_messages")
      .insert({ name, email, subject, message });

    if (dbError) {
      console.error("Error storing message:", dbError);
    } else {
      console.log("Message stored in database");
    }

    // Fetch admin email from settings
    const { data: adminSettings, error: settingsError } = await supabase
      .from("admin_settings")
      .select("admin_email")
      .limit(1)
      .maybeSingle();

    if (settingsError) {
      console.error("Error fetching admin settings:", settingsError);
    }

    const adminEmail = adminSettings?.admin_email || "nasif.kamal06@gmail.com";
    console.log("Sending notification to:", adminEmail);
    
    const emailResponse = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [adminEmail],
      reply_to: email,
      subject: `New Contact: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1a2e; color: #ffffff;">
          <h1 style="color: #d4a739; border-bottom: 2px solid #d4a739; padding-bottom: 10px;">New Contact Form Submission</h1>
          
          <div style="margin: 20px 0; padding: 15px; background-color: #16213e; border-radius: 8px;">
            <p style="margin: 5px 0;"><strong style="color: #d4a739;">From:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong style="color: #d4a739;">Email:</strong> <a href="mailto:${email}" style="color: #4da6ff;">${email}</a></p>
            <p style="margin: 5px 0;"><strong style="color: #d4a739;">Subject:</strong> ${subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h2 style="color: #d4a739; font-size: 18px;">Message:</h2>
            <div style="padding: 15px; background-color: #16213e; border-radius: 8px; white-space: pre-wrap;">
              ${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}
            </div>
          </div>
          
          <p style="color: #888; font-size: 12px; margin-top: 30px; text-align: center;">
            This message was sent from your portfolio contact form.
          </p>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error sending contact email:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to send email" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
