-- Create portfolio_data table to store all portfolio content
CREATE TABLE public.portfolio_data (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  data_key text NOT NULL UNIQUE,
  data_value jsonb NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio_data ENABLE ROW LEVEL SECURITY;

-- Allow public read access (visitors can see portfolio data)
CREATE POLICY "Portfolio data is publicly readable"
ON public.portfolio_data
FOR SELECT
USING (true);

-- Only allow updates from edge functions (using service role)
-- No direct user updates allowed for security

-- Create trigger to update updated_at
CREATE TRIGGER update_portfolio_data_updated_at
BEFORE UPDATE ON public.portfolio_data
FOR EACH ROW
EXECUTE FUNCTION public.update_admin_settings_updated_at();

-- Insert initial data with all portfolio sections
INSERT INTO public.portfolio_data (data_key, data_value) VALUES
('personalInfo', '{
  "name": "Nasif Kamal",
  "title": "ERP & AI Automation Expert",
  "subtitle": "Software Developer | IT Administrator | MIS Specialist",
  "email": "nasif.kamal06@gmail.com",
  "phone": "+8801780522666",
  "location": "Uttara, Dhaka, Bangladesh",
  "bio": "More than 7 years of professional experience both in the Service and Manufacturing industries while functioning in diversified areas of Data Management and IT Operations with specialties in Software implementation & Operations Management, Process Improvement, Software Testing, Bug fixing & Training Planning, and Procurement & Commercial and Integrated ERP Management Systems.",
  "profileImage": "",
  "profileImage2": "",
  "linkedin": "https://www.linkedin.com/in/nk06",
  "whatsapp": "+8801780522666",
  "resumeUrl": ""
}'::jsonb),
('aboutStats', '{"yearsOfExperience": 7, "projectsCompleted": 50, "certificationsCount": 5}'::jsonb),
('experiences', '[]'::jsonb),
('skills', '[]'::jsonb),
('education', '[]'::jsonb),
('certifications', '[]'::jsonb),
('projects', '[]'::jsonb),
('socialLinks', '[]'::jsonb);