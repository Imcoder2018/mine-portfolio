import { PrismaClient } from '@prisma/client'
import { config } from 'dotenv'

// Load environment variables
config({ path: '.env' })

const prisma = new PrismaClient({
  log: ['query'],
  accelerateUrl: process.env.PRISMA_DATABASE_URL,
})

async function main() {
  console.log('Start seeding...')

  // Create profile
  const profile = await prisma.profile.create({
    data: {
      name: 'Muhammad Waqar Sikandar',
      title: 'Autonomous AI Developer',
      subtitle: 'Architecting Cutting-Edge AI Solutions',
      email: 'junglescouthome@gmail.com',
      phone: '+923035080269',
      location: 'Wah Cantt, Pakistan',
      bio: 'Currently building expertise in MERN Stack, Agentic AI systems, FastAPI, Docker, Kubernetes, and Generative AI. Actively creating end-to-end solutions that bring together AI agents, automation workflows, and scalable microservices. Passionate about driving innovation through smart automation and open to internship opportunities in AI, workflow engineering, or full-stack development.',
      shortBio: 'Autonomous AI Developer specializing in cutting-edge AI solutions and automation workflows.',
      profileImage: '/profile.jpg',
      resumeUrl: '/resume.pdf',
      availableForHire: true,
      yearsOfExperience: 2,
      projectsCompleted: 15,
      happyClients: 10,
      theme: 'professional',
    },
  })
  console.log('Created profile:', profile)

  // Create social links
  const socialLinks = await Promise.all([
    prisma.socialLink.create({
      data: {
        platform: 'GitHub',
        url: 'https://github.com/Imcoder2018',
        icon: 'Github',
        enabled: true,
        profileId: profile.id,
      },
    }),
    prisma.socialLink.create({
      data: {
        platform: 'LinkedIn',
        url: 'https://linkedin.com/in/waqar-sikandar',
        icon: 'Linkedin',
        enabled: true,
        profileId: profile.id,
      },
    }),
    prisma.socialLink.create({
      data: {
        platform: 'Twitter',
        url: 'https://twitter.com/waqar_dev',
        icon: 'Twitter',
        enabled: true,
        profileId: profile.id,
      },
    }),
    prisma.socialLink.create({
      data: {
        platform: 'Email',
        url: 'mailto:junglescouthome@gmail.com',
        icon: 'Mail',
        enabled: true,
        profileId: profile.id,
      },
    }),
  ])
  console.log('Created social links:', socialLinks.length)

  // Create skills
  const skills = await Promise.all([
    prisma.skill.create({
      data: { name: 'JavaScript', category: 'Frontend', level: 90, enabled: true, profileId: profile.id },
    }),
    prisma.skill.create({
      data: { name: 'TypeScript', category: 'Frontend', level: 85, enabled: true, profileId: profile.id },
    }),
    prisma.skill.create({
      data: { name: 'React', category: 'Frontend', level: 90, enabled: true, profileId: profile.id },
    }),
    prisma.skill.create({
      data: { name: 'Next.js', category: 'Frontend', level: 85, enabled: true, profileId: profile.id },
    }),
    prisma.skill.create({
      data: { name: 'Node.js', category: 'Backend', level: 85, enabled: true, profileId: profile.id },
    }),
    prisma.skill.create({
      data: { name: 'Python', category: 'Backend', level: 80, enabled: true, profileId: profile.id },
    }),
    prisma.skill.create({
      data: { name: 'FastAPI', category: 'Backend', level: 75, enabled: true, profileId: profile.id },
    }),
    prisma.skill.create({
      data: { name: 'PostgreSQL', category: 'Backend', level: 70, enabled: true, profileId: profile.id },
    }),
    prisma.skill.create({
      data: { name: 'Docker', category: 'DevOps', level: 75, enabled: true, profileId: profile.id },
    }),
    prisma.skill.create({
      data: { name: 'Kubernetes', category: 'DevOps', level: 60, enabled: true, profileId: profile.id },
    }),
    prisma.skill.create({
      data: { name: 'Machine Learning', category: 'AI/ML', level: 70, enabled: true, profileId: profile.id },
    }),
    prisma.skill.create({
      data: { name: 'LangChain', category: 'AI/ML', level: 65, enabled: true, profileId: profile.id },
    }),
    prisma.skill.create({
      data: { name: 'AutoGen', category: 'AI/ML', level: 60, enabled: true, profileId: profile.id },
    }),
    prisma.skill.create({
      data: { name: 'Git', category: 'Languages', level: 90, enabled: true, profileId: profile.id },
    }),
    prisma.skill.create({
      data: { name: 'HTML/CSS', category: 'Frontend', level: 95, enabled: true, profileId: profile.id },
    }),
  ])
  console.log('Created skills:', skills.length)

  // Create work experience
  const workExperience = await prisma.workExperience.create({
    data: {
      title: 'AI Developer Intern',
      company: 'Tech Company',
      location: 'Remote',
      startDate: '2024-01',
      endDate: '2024-06',
      current: false,
      description: 'Developed AI-powered automation solutions and integrated machine learning models into production applications.',
      achievements: ['Built automated workflow systems', 'Implemented ML pipelines', 'Reduced manual processing by 60%'],
      technologies: ['Python', 'FastAPI', 'TensorFlow', 'Docker'],
      links: { github: 'https://github.com/example/project' },
      enabled: true,
      profileId: profile.id,
    },
  })
  console.log('Created work experience:', workExperience)

  // Create projects
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        title: 'AI Portfolio Website',
        description: 'Dynamic portfolio website with AI integration and database backend.',
        longDescription: 'A modern portfolio website built with Next.js, featuring AI-powered content generation, real-time database integration with Prisma Postgres, and responsive design with both Professional and Bauhaus themes.',
        technologies: ['Next.js', 'React', 'TypeScript', 'Prisma Postgres', 'Tailwind CSS', 'Zustand'],
        imageUrl: '/projects/portfolio.jpg',
        videoUrl: '',
        githubUrl: 'https://github.com/Imcoder2018/portfolio',
        liveUrl: 'https://waqar-portfolio-sandy.vercel.app',
        category: 'Web Development',
        featured: true,
        startDate: '2024-01',
        endDate: '2024-02',
        enabled: true,
        profileId: profile.id,
      },
    }),
    prisma.project.create({
      data: {
        title: 'AI Automation System',
        description: 'Intelligent automation system for business workflows.',
        longDescription: 'An end-to-end automation system that uses AI agents to handle repetitive business tasks, integrate with multiple APIs, and provide intelligent decision-making capabilities.',
        technologies: ['Python', 'FastAPI', 'LangChain', 'AutoGen', 'Docker', 'PostgreSQL'],
        imageUrl: '/projects/automation.jpg',
        videoUrl: '',
        githubUrl: 'https://github.com/Imcoder2018/ai-automation',
        liveUrl: '',
        category: 'AI/ML',
        featured: true,
        startDate: '2023-11',
        endDate: '2024-01',
        enabled: true,
        profileId: profile.id,
      },
    }),
    prisma.project.create({
      data: {
        title: 'E-commerce Platform',
        description: 'Full-stack e-commerce solution with modern features.',
        longDescription: 'A complete e-commerce platform with user authentication, payment processing, inventory management, and real-time analytics dashboard.',
        technologies: ['MERN Stack', 'Stripe', 'JWT', 'Redux', 'MongoDB'],
        imageUrl: '/projects/ecommerce.jpg',
        videoUrl: '',
        githubUrl: 'https://github.com/Imcoder2018/ecommerce',
        liveUrl: 'https://demo-ecommerce.vercel.app',
        category: 'Web Development',
        featured: false,
        startDate: '2023-08',
        endDate: '2023-10',
        enabled: true,
        profileId: profile.id,
      },
    }),
  ])
  console.log('Created projects:', projects.length)

  // Create education
  const education = await prisma.education.create({
    data: {
      degree: 'Bachelor of Computer Science',
      institution: 'University of Engineering and Technology',
      location: 'Lahore, Pakistan',
      startDate: '2020-09',
      endDate: '2024-06',
      description: 'Focused on software engineering, artificial intelligence, and database systems. Completed multiple projects in web development and machine learning.',
      achievements: ["Dean's List for 3 semesters", 'Won hackathon 2022', 'Published research paper on AI'],
      enabled: true,
      profileId: profile.id,
    },
  })
  console.log('Created education:', education)

  // Create certifications
  const certifications = await Promise.all([
    prisma.certification.create({
      data: {
        name: 'Next.js Developer Certification',
        issuer: 'Vercel',
        date: '2024-01',
        url: 'https://vercel.com/certificates/nextjs',
        credentialId: 'NEXT-2024-001',
        enabled: true,
        profileId: profile.id,
      },
    }),
    prisma.certification.create({
      data: {
        name: 'Python for Data Science',
        issuer: 'Coursera',
        date: '2023-11',
        url: 'https://coursera.org/verify/python-ds',
        credentialId: 'PYDS-2023-456',
        enabled: true,
        profileId: profile.id,
      },
    }),
    prisma.certification.create({
      data: {
        name: 'React Developer Certification',
        issuer: 'Meta',
        date: '2023-09',
        url: 'https://coursera.org/verify/react-dev',
        credentialId: 'REACT-2023-789',
        enabled: true,
        profileId: profile.id,
      },
    }),
  ])
  console.log('Created certifications:', certifications.length)

  // Create services
  const services = await Promise.all([
    prisma.service.create({
      data: {
        title: 'AI Development',
        description: 'Building intelligent automation systems and AI-powered applications.',
        icon: 'Code',
        features: ['Custom AI Solutions', 'Machine Learning Integration', 'Automation Workflows', 'Chatbot Development'],
        enabled: true,
        profileId: profile.id,
      },
    }),
    prisma.service.create({
      data: {
        title: 'Web Development',
        description: 'Creating modern, responsive web applications with cutting-edge technologies.',
        icon: 'Globe',
        features: ['Full-Stack Development', 'React/Next.js Apps', 'API Development', 'E-commerce Solutions'],
        enabled: true,
        profileId: profile.id,
      },
    }),
    prisma.service.create({
      data: {
        title: 'Database Design',
        description: 'Designing and implementing scalable database solutions.',
        icon: 'Database',
        features: ['Prisma Design', 'API Integration', 'Performance Optimization', 'Data Migration'],
        enabled: true,
        profileId: profile.id,
      },
    }),
    prisma.service.create({
      data: {
        title: 'DevOps & Deployment',
        description: 'Setting up CI/CD pipelines and cloud deployment strategies.',
        icon: 'Cloud',
        features: ['Docker Containerization', 'Kubernetes Orchestration', 'Vercel Deployment', 'CI/CD Setup'],
        enabled: true,
        profileId: profile.id,
      },
    }),
  ])
  console.log('Created services:', services.length)

  // Create testimonials
  const testimonials = await Promise.all([
    prisma.testimonial.create({
      data: {
        name: 'Sarah Johnson',
        role: 'CTO',
        company: 'TechStart Inc.',
        content: 'Waqar delivered an exceptional AI automation system that transformed our workflow. His expertise in AI and web development is outstanding.',
        imageUrl: '/testimonials/sarah.jpg',
        rating: 5,
        enabled: true,
        profileId: profile.id,
      },
    }),
    prisma.testimonial.create({
      data: {
        name: 'Michael Chen',
        role: 'Product Manager',
        company: 'InnovateLabs',
        content: 'The portfolio website Waqar built exceeded our expectations. Clean code, great design, and excellent communication throughout.',
        imageUrl: '/testimonials/michael.jpg',
        rating: 5,
        enabled: true,
        profileId: profile.id,
      },
    }),
    prisma.testimonial.create({
      data: {
        name: 'Emily Davis',
        role: 'Founder',
        company: 'StartupHub',
        content: 'Waqar\'s AI solutions helped us automate 60% of our manual processes. Highly recommended for any AI development needs.',
        imageUrl: '/testimonials/emily.jpg',
        rating: 4,
        enabled: true,
        profileId: profile.id,
      },
    }),
  ])
  console.log('Created testimonials:', testimonials.length)

  // Create section settings
  const sectionSettings = await prisma.sectionSettings.create({
    data: {
      hero: true,
      about: true,
      skills: true,
      experience: true,
      projects: true,
      personalProjects: true,
      education: true,
      certifications: true,
      services: true,
      testimonials: true,
      achievements: true,
      languages: true,
      interests: true,
      publications: true,
      awards: true,
      volunteer: true,
      contact: true,
      timeline: true,
      profileId: profile.id,
    },
  })
  console.log('Created section settings:', sectionSettings)

  // Create admin settings
  const adminSettings = await prisma.adminSettings.create({
    data: {
      adminPassword: 'admin123',
      isAuthenticated: false,
      profileId: profile.id,
    },
  })
  console.log('Created admin settings:', adminSettings)

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
