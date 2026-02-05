-- Portfolio Database Schema for Neon PostgreSQL
-- Create tables for all portfolio data

-- Profile table
CREATE TABLE IF NOT EXISTS profile (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  location TEXT NOT NULL,
  bio TEXT NOT NULL,
  short_bio TEXT NOT NULL,
  profile_image TEXT,
  resume_url TEXT,
  available_for_hire BOOLEAN DEFAULT true,
  years_of_experience INTEGER DEFAULT 0,
  projects_completed INTEGER DEFAULT 0,
  happy_clients INTEGER DEFAULT 0,
  theme TEXT DEFAULT 'professional' CHECK (theme IN ('professional', 'bauhaus')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Social links table
CREATE TABLE IF NOT EXISTS social_links (
  id SERIAL PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT NOT NULL,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  level INTEGER CHECK (level >= 0 AND level <= 100),
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Work experience table
CREATE TABLE IF NOT EXISTS work_experience (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  location TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT,
  current BOOLEAN DEFAULT false,
  description TEXT,
  achievements TEXT[], -- PostgreSQL array
  technologies TEXT[], -- PostgreSQL array
  links JSONB, -- Store links as JSON
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  technologies TEXT[], -- PostgreSQL array
  image_url TEXT,
  video_url TEXT,
  github_url TEXT,
  live_url TEXT,
  category TEXT,
  featured BOOLEAN DEFAULT false,
  start_date TEXT,
  end_date TEXT,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Education table
CREATE TABLE IF NOT EXISTS education (
  id SERIAL PRIMARY KEY,
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  location TEXT NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  description TEXT,
  achievements TEXT[], -- PostgreSQL array
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  date TEXT NOT NULL,
  url TEXT,
  credential_id TEXT,
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  features TEXT[], -- PostgreSQL array
  enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Section settings table
CREATE TABLE IF NOT EXISTS section_settings (
  id SERIAL PRIMARY KEY,
  hero BOOLEAN DEFAULT true,
  about BOOLEAN DEFAULT true,
  skills BOOLEAN DEFAULT true,
  experience BOOLEAN DEFAULT true,
  projects BOOLEAN DEFAULT true,
  personal_projects BOOLEAN DEFAULT true,
  education BOOLEAN DEFAULT true,
  certifications BOOLEAN DEFAULT true,
  services BOOLEAN DEFAULT true,
  testimonials BOOLEAN DEFAULT true,
  achievements BOOLEAN DEFAULT true,
  languages BOOLEAN DEFAULT true,
  interests BOOLEAN DEFAULT true,
  publications BOOLEAN DEFAULT true,
  awards BOOLEAN DEFAULT true,
  volunteer BOOLEAN DEFAULT true,
  contact BOOLEAN DEFAULT true,
  timeline BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Admin settings table
CREATE TABLE IF NOT EXISTS admin_settings (
  id SERIAL PRIMARY KEY,
  admin_password TEXT NOT NULL DEFAULT 'admin123',
  is_authenticated BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_profile_updated_at BEFORE UPDATE ON profile FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_social_links_updated_at BEFORE UPDATE ON social_links FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_work_experience_updated_at BEFORE UPDATE ON work_experience FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_education_updated_at BEFORE UPDATE ON education FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_certifications_updated_at BEFORE UPDATE ON certifications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_section_settings_updated_at BEFORE UPDATE ON section_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_settings_updated_at BEFORE UPDATE ON admin_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
