import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageData, fileName, folder } = await req.json();

    if (!imageData || !fileName) {
      return new Response(
        JSON.stringify({ error: "Missing imageData or fileName" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Uploading image: ${fileName} to folder: ${folder || 'root'}`);

    // Initialize Supabase client with service role key
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Convert base64 to blob
    const base64Data = imageData.split(",")[1] || imageData;
    const binaryData = Uint8Array.from(atob(base64Data), (c) => c.charCodeAt(0));
    
    // Determine content type
    let contentType = "image/png";
    if (imageData.includes("data:image/jpeg")) {
      contentType = "image/jpeg";
    } else if (imageData.includes("data:image/webp")) {
      contentType = "image/webp";
    }

    // Create file path
    const timestamp = Date.now();
    const filePath = folder ? `${folder}/${timestamp}-${fileName}` : `${timestamp}-${fileName}`;

    // Upload to storage
    const { data, error } = await supabase.storage
      .from("portfolio-images")
      .upload(filePath, binaryData, {
        contentType,
        upsert: true,
      });

    if (error) {
      console.error("Storage upload error:", error);
      return new Response(
        JSON.stringify({ error: error.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("portfolio-images")
      .getPublicUrl(filePath);

    console.log(`Image uploaded successfully: ${publicUrlData.publicUrl}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        url: publicUrlData.publicUrl,
        path: filePath 
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Error uploading image:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});