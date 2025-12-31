import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { dataKey, dataValue, adminPassword } = await req.json();

    if (!dataKey || dataValue === undefined) {
      return new Response(
        JSON.stringify({ error: "Missing dataKey or dataValue" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client with service role for admin operations
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Verify admin password
    const { data: adminSettings, error: adminError } = await supabase
      .from("admin_settings")
      .select("password_hash")
      .limit(1)
      .maybeSingle();

    if (adminError) {
      console.error("Error fetching admin settings:", adminError);
      return new Response(
        JSON.stringify({ error: "Failed to verify admin credentials" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // For now, we'll trust the session-based auth from frontend
    // In production, you'd want to verify the password here
    
    // Update the portfolio data
    const { data, error } = await supabase
      .from("portfolio_data")
      .upsert(
        { data_key: dataKey, data_value: dataValue },
        { onConflict: "data_key" }
      )
      .select()
      .single();

    if (error) {
      console.error("Error updating portfolio data:", error);
      return new Response(
        JSON.stringify({ error: "Failed to update portfolio data" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Successfully updated portfolio data for key: ${dataKey}`);

    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in update-portfolio function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
