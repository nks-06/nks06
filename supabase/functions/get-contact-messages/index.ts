import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const url = new URL(req.url);
    const messageId = url.searchParams.get("id");

    console.log(`Request method: ${req.method}, messageId: ${messageId}`);

    if (req.method === "DELETE" && messageId) {
      console.log(`Deleting message with id: ${messageId}`);
      const { error } = await supabase
        .from("contact_messages")
        .delete()
        .eq("id", messageId);

      if (error) {
        console.error("Delete error:", error);
        throw error;
      }

      console.log("Message deleted successfully");
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (req.method === "PATCH" && messageId) {
      console.log(`Updating message with id: ${messageId}`);
      const body = await req.json();
      const { error } = await supabase
        .from("contact_messages")
        .update({ is_read: body.is_read })
        .eq("id", messageId);

      if (error) {
        console.error("Update error:", error);
        throw error;
      }

      console.log("Message updated successfully");
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // GET - Fetch all messages (default for POST without body or GET)
    console.log("Fetching all messages");
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Fetch error:", error);
      throw error;
    }

    console.log(`Fetched ${data?.length || 0} contact messages`);

    return new Response(
      JSON.stringify({ messages: data }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
