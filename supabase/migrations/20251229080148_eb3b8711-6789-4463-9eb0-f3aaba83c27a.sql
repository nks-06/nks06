-- Create admin_settings table to store admin email and password hash
CREATE TABLE public.admin_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_email TEXT NOT NULL DEFAULT 'nasif.kamal06@gmail.com',
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create password_reset_tokens table
CREATE TABLE public.password_reset_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  token TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.password_reset_tokens ENABLE ROW LEVEL SECURITY;

-- Admin settings should only be readable/writable by edge functions (service role)
-- No public access policies - only service role can access

-- Password reset tokens - no public access
-- Only edge functions with service role can manage these

-- Insert default admin with password 'admin123' (bcrypt hash)
INSERT INTO public.admin_settings (admin_email, password_hash) 
VALUES ('nasif.kamal06@gmail.com', '$2a$10$rICQ1mV8.3bUVELq1Xc0/.4CkYT8ZNu5L8I1VQGy.H.Zu0Xh8X.Gy');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_admin_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_admin_settings_updated_at
  BEFORE UPDATE ON public.admin_settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_admin_settings_updated_at();