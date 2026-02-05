-- Initialize Portfolio Database with Default Data
-- Run this after creating the schema

-- Insert profile data
INSERT INTO profile (
  name, title, subtitle, email, phone, location, bio, short_bio,
  profile_image, resume_url, available_for_hire, years_of_experience,
  projects_completed, happy_clients, theme
) VALUES (
  'Muhammad Waqar Sikandar',
  'Autonomous AI Developer',
  'Architecting Cutting-Edge AI Solutions',
  'junglescouthome@gmail.com',
  '+923035080269',
  'Wah Cantt, Pakistan',
  'Currently building expertise in MERN Stack, Agentic AI systems, FastAPI, Docker, Kubernetes, and Generative AI. Actively creating end-to-end solutions that bring together AI agents, automation workflows, and scalable microservices. Passionate about driving innovation through smart automation and open to internship opportunities in AI, workflow engineering, or full-stack development.',
  'Autonomous AI Developer specializing in cutting-edge AI solutions and automation workflows.',
  '/profile.jpg',
  '/resume.pdf',
  true,
  2,
  15,
  10,
  'professional'
) ON CONFLICT DO NOTHING;

-- Insert social links
INSERT INTO social_links (platform, url, icon, enabled) VALUES
  ('GitHub', 'https://github.com/Imcoder2018', 'Github', true),
  ('LinkedIn', 'https://linkedin.com/in/waqar-sikandar', 'Linkedin', true),
  ('Twitter', 'https://twitter.com/waqar_dev', 'Twitter', true),
  ('Email', 'mailto:junglescouthome@gmail.com', 'Mail', true)
ON CONFLICT DO NOTHING;

-- Insert skills
INSERT INTO skills (name, category, level, enabled) VALUES
  ('JavaScript', 'Frontend', 90, true),
  ('TypeScript', 'Frontend', 85, true),
  ('React', 'Frontend', 90, true),
  ('Next.js', 'Frontend', 85, true),
  ('Node.js', 'Backend', 85, true),
  ('Python', 'Backend', 80, true),
  ('FastAPI', 'Backend', 75, true),
  ('PostgreSQL', 'Backend', 70, true),
  ('Docker', 'DevOps', 75, true),
  ('Kubernetes', 'DevOps', 60, true),
  ('Machine Learning', 'AI/ML', 70, true),
  ('LangChain', 'AI/ML', 65, true),
  ('AutoGen', 'AI/ML', 60, true),
  ('Git', 'Languages', 90, true),
  ('HTML/CSS', 'Frontend', 95, true)
ON CONFLICT DO NOTHING;

-- Insert work experience
INSERT INTO work_experience (
  title, company, location, start_date, end_date, current, description,
  achievements, technologies, links, enabled
) VALUES (
  'AI Developer Intern', 'Tech Company', 'Remote', '2024-01', '2024-06', false,
  'Developed AI-powered automation solutions and integrated machine learning models into production applications.',
  ARRAY['Built automated workflow systems', 'Implemented ML pipelines', 'Reduced manual processing by 60%'],
  ARRAY['Python', 'FastAPI', 'TensorFlow', 'Docker'],
  '{"github": "https://github.com/example/project"}',
  true
) ON CONFLICT DO NOTHING;

-- Insert projects
INSERT INTO projects (
  title, description, long_description, technologies, image_url, video_url,
  github_url, live_url, category, featured, start_date, end_date, enabled
) VALUES
(
  'AI Portfolio Website',
  'Dynamic portfolio website with AI integration and database backend.',
  'A modern portfolio website built with Next.js, featuring AI-powered content generation, real-time database integration with Neon PostgreSQL, and responsive design with both Professional and Bauhaus themes.',
  ARRAY['Next.js', 'React', 'TypeScript', 'Neon PostgreSQL', 'Tailwind CSS', 'Zustand'],
  '/projects/portfolio.jpg',
  '',
  'https://github.com/Imcoder2018/portfolio',
  'https://waqar-portfolio-sandy.vercel.app',
  'Web Development',
  true,
  '2024-01',
  '2024-02',
  true
),
(
  'AI Automation System',
  'Intelligent automation system for business workflows.',
  'An end-to-end automation system that uses AI agents to handle repetitive business tasks, integrate with multiple APIs, and provide intelligent decision-making capabilities.',
  ARRAY['Python', 'FastAPI', 'LangChain', 'AutoGen', 'Docker', 'PostgreSQL'],
  '/projects/automation.jpg',
  '',
  'https://github.com/Imcoder2018/ai-automation',
  '',
  'AI/ML',
  true,
  '2023-11',
  '2024-01',
  true
),
(
  'E-commerce Platform',
  'Full-stack e-commerce solution with modern features.',
  'A complete e-commerce platform with user authentication, payment processing, inventory management, and real-time analytics dashboard.',
  ARRAY['MERN Stack', 'Stripe', 'JWT', 'Redux', 'MongoDB'],
  '/projects/ecommerce.jpg',
  '',
  'https://github.com/Imcoder2018/ecommerce',
  'https://demo-ecommerce.vercel.app',
  'Web Development',
  false,
  '2023-08',
  '2023-10',
  true
) ON CONFLICT DO NOTHING;

-- Insert education
INSERT INTO education (
  degree, institution, location, start_date, end_date, description, achievements, enabled
) VALUES (
  'Bachelor of Computer Science',
  'University of Engineering and Technology',
  'Lahore, Pakistan',
  '2020-09',
  '2024-06',
  'Focused on software engineering, artificial intelligence, and database systems. Completed multiple projects in web development and machine learning.',
  ARRAY['Dean''s List for 3 semesters', 'Won hackathon 2022', 'Published research paper on AI'],
  true
) ON CONFLICT DO NOTHING;

-- Insert certifications
INSERT INTO certifications (name, issuer, date, url, credential_id, enabled) VALUES
(
  'Next.js Developer Certification',
  'Vercel',
  '2024-01',
  'https://vercel.com/certificates/nextjs',
  'NEXT-2024-001',
  true
),
(
  'Python for Data Science',
  'Coursera',
  '2023-11',
  'https://coursera.org/verify/python-ds',
  'PYDS-2023-456',
  true
),
(
  'React Developer Certification',
  'Meta',
  '2023-09',
  'https://coursera.org/verify/react-dev',
  'REACT-2023-789',
  true
) ON CONFLICT DO NOTHING;

-- Insert services
INSERT INTO services (title, description, icon, features, enabled) VALUES
(
  'AI Development',
  'Building intelligent automation systems and AI-powered applications.',
  'Code',
  ARRAY['Custom AI Solutions', 'Machine Learning Integration', 'Automation Workflows', 'Chatbot Development'],
  true
),
(
  'Web Development',
  'Creating modern, responsive web applications with cutting-edge technologies.',
  'Globe',
  ARRAY['Full-Stack Development', 'React/Next.js Apps', 'API Development', 'E-commerce Solutions'],
  true
),
(
  'Database Design',
  'Designing and implementing scalable database solutions.',
  'Database',
  ARRAY['PostgreSQL Design', 'API Integration', 'Performance Optimization', 'Data Migration'],
  true
),
(
  'DevOps & Deployment',
  'Setting up CI/CD pipelines and cloud deployment strategies.',
  'Cloud',
  ARRAY['Docker Containerization', 'Kubernetes Orchestration', 'Vercel Deployment', 'CI/CD Setup'],
  true
) ON CONFLICT DO NOTHING;

-- Insert testimonials
INSERT INTO testimonials (name, role, company, content, image_url, rating, enabled) VALUES
(
  'Sarah Johnson',
  'CTO',
  'TechStart Inc.',
  'Waqar delivered an exceptional AI automation system that transformed our workflow. His expertise in AI and web development is outstanding.',
  '/testimonials/sarah.jpg',
  5,
  true
),
(
  'Michael Chen',
  'Product Manager',
  'InnovateLabs',
  'The portfolio website Waqar built exceeded our expectations. Clean code, great design, and excellent communication throughout.',
  '/testimonials/michael.jpg',
  5,
  true
),
(
  'Emily Davis',
  'Founder',
  'StartupHub',
  'Waqar''s AI solutions helped us automate 60% of our manual processes. Highly recommended for any AI development needs.',
  '/testimonials/emily.jpg',
  4,
  true
) ON CONFLICT DO NOTHING;

-- Insert section settings (all sections enabled by default)
INSERT INTO section_settings (
  hero, about, skills, experience, projects, personal_projects, education,
  certifications, services, testimonials, achievements, languages, interests,
  publications, awards, volunteer, contact, timeline
) VALUES (
  true, true, true, true, true, true, true, true, true, true,
  true, true, true, true, true, true, true
) ON CONFLICT DO NOTHING;

-- Insert admin settings
INSERT INTO admin_settings (admin_password, is_authenticated) VALUES (
  'admin123', false
) ON CONFLICT DO NOTHING;
