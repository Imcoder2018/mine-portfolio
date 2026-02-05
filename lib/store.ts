import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface SocialLink {
  id: string
  platform: string
  url: string
  icon: string
  enabled: boolean
}

export interface Skill {
  id: string
  name: string
  category: string
  level: number
  enabled: boolean
}

export interface WorkExperience {
  id: string
  title: string
  company: string
  location: string
  startDate: string
  endDate: string
  current: boolean
  description: string
  achievements: string[]
  technologies: string[]
  links: { label: string; url: string }[]
  enabled: boolean
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  imageUrl: string
  videoUrl: string
  githubUrl: string
  liveUrl: string
  category: string
  featured: boolean
  startDate: string
  endDate: string
  enabled: boolean
}

export interface Education {
  id: string
  degree: string
  institution: string
  location: string
  startDate: string
  endDate: string
  description: string
  achievements: string[]
  enabled: boolean
}

export interface Certification {
  id: string
  name: string
  issuer: string
  date: string
  url: string
  credentialId: string
  enabled: boolean
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  imageUrl: string
  rating: number
  enabled: boolean
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
  enabled: boolean
}

export interface Achievement {
  id: string
  title: string
  description: string
  date: string
  icon: string
  enabled: boolean
}

export interface Language {
  id: string
  name: string
  proficiency: string
  enabled: boolean
}

export interface Interest {
  id: string
  name: string
  icon: string
  enabled: boolean
}

export interface Publication {
  id: string
  title: string
  publisher: string
  date: string
  url: string
  description: string
  enabled: boolean
}

export interface Award {
  id: string
  title: string
  issuer: string
  date: string
  description: string
  enabled: boolean
}

export interface Volunteer {
  id: string
  role: string
  organization: string
  startDate: string
  endDate: string
  description: string
  enabled: boolean
}

export interface SectionSettings {
  hero: boolean
  about: boolean
  skills: boolean
  experience: boolean
  projects: boolean
  personalProjects: boolean
  education: boolean
  certifications: boolean
  services: boolean
  testimonials: boolean
  achievements: boolean
  languages: boolean
  interests: boolean
  publications: boolean
  awards: boolean
  volunteer: boolean
  contact: boolean
  timeline: boolean
}

export interface ProfileInfo {
  name: string
  title: string
  subtitle: string
  email: string
  phone: string
  location: string
  bio: string
  shortBio: string
  profileImage: string
  resumeUrl: string
  availableForHire: boolean
  yearsOfExperience: number
  projectsCompleted: number
  happyClients: number
  theme: 'professional' | 'bauhaus'
}

interface PortfolioStore {
  profile: ProfileInfo
  socialLinks: SocialLink[]
  skills: Skill[]
  workExperience: WorkExperience[]
  projects: Project[]
  education: Education[]
  certifications: Certification[]
  testimonials: Testimonial[]
  services: Service[]
  achievements: Achievement[]
  languages: Language[]
  interests: Interest[]
  publications: Publication[]
  awards: Award[]
  volunteer: Volunteer[]
  sectionSettings: SectionSettings
  isAdminAuthenticated: boolean
  adminPassword: string
  
  // Actions
  setProfile: (profile: Partial<ProfileInfo>) => void
  setTheme: (theme: 'professional' | 'bauhaus') => void
  
  // Social Links
  addSocialLink: (link: SocialLink) => void
  updateSocialLink: (id: string, link: Partial<SocialLink>) => void
  deleteSocialLink: (id: string) => void
  
  // Skills
  addSkill: (skill: Skill) => void
  updateSkill: (id: string, skill: Partial<Skill>) => void
  deleteSkill: (id: string) => void
  
  // Work Experience
  addWorkExperience: (exp: WorkExperience) => void
  updateWorkExperience: (id: string, exp: Partial<WorkExperience>) => void
  deleteWorkExperience: (id: string) => void
  
  // Projects
  addProject: (project: Project) => void
  updateProject: (id: string, project: Partial<Project>) => void
  deleteProject: (id: string) => void
  
  // Education
  addEducation: (edu: Education) => void
  updateEducation: (id: string, edu: Partial<Education>) => void
  deleteEducation: (id: string) => void
  
  // Certifications
  addCertification: (cert: Certification) => void
  updateCertification: (id: string, cert: Partial<Certification>) => void
  deleteCertification: (id: string) => void
  
  // Testimonials
  addTestimonial: (test: Testimonial) => void
  updateTestimonial: (id: string, test: Partial<Testimonial>) => void
  deleteTestimonial: (id: string) => void
  
  // Services
  addService: (service: Service) => void
  updateService: (id: string, service: Partial<Service>) => void
  deleteService: (id: string) => void
  
  // Achievements
  addAchievement: (achievement: Achievement) => void
  updateAchievement: (id: string, achievement: Partial<Achievement>) => void
  deleteAchievement: (id: string) => void
  
  // Languages
  addLanguage: (lang: Language) => void
  updateLanguage: (id: string, lang: Partial<Language>) => void
  deleteLanguage: (id: string) => void
  
  // Interests
  addInterest: (interest: Interest) => void
  updateInterest: (id: string, interest: Partial<Interest>) => void
  deleteInterest: (id: string) => void
  
  // Publications
  addPublication: (pub: Publication) => void
  updatePublication: (id: string, pub: Partial<Publication>) => void
  deletePublication: (id: string) => void
  
  // Awards
  addAward: (award: Award) => void
  updateAward: (id: string, award: Partial<Award>) => void
  deleteAward: (id: string) => void
  
  // Volunteer
  addVolunteer: (vol: Volunteer) => void
  updateVolunteer: (id: string, vol: Partial<Volunteer>) => void
  deleteVolunteer: (id: string) => void
  
  // Section Settings
  toggleSection: (section: keyof SectionSettings) => void
  setSectionSettings: (settings: Partial<SectionSettings>) => void
  
  // Admin
  login: (password: string) => boolean
  logout: () => void
  setAdminPassword: (password: string) => void
}

const defaultProfile: ProfileInfo = {
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
  theme: 'professional'
}

const defaultSocialLinks: SocialLink[] = [
  { id: '1', platform: 'LinkedIn', url: 'https://linkedin.com/in/mwaqarsikandar', icon: 'linkedin', enabled: true },
  { id: '2', platform: 'GitHub', url: 'https://github.com/lmcoder2018', icon: 'github', enabled: true },
  { id: '3', platform: 'Email', url: 'mailto:junglescouthome@gmail.com', icon: 'mail', enabled: true },
]

const defaultSkills: Skill[] = [
  { id: '1', name: 'Next.js', category: 'Frontend', level: 85, enabled: true },
  { id: '2', name: 'FastAPI', category: 'Backend', level: 80, enabled: true },
  { id: '3', name: 'Agentic AI', category: 'AI/ML', level: 90, enabled: true },
  { id: '4', name: 'Fast Autonomous Development', category: 'AI/ML', level: 85, enabled: true },
  { id: '5', name: 'Langchain', category: 'AI/ML', level: 80, enabled: true },
  { id: '6', name: 'n8n', category: 'Automation', level: 85, enabled: true },
  { id: '7', name: 'Docker', category: 'DevOps', level: 75, enabled: true },
  { id: '8', name: 'Python', category: 'Languages', level: 90, enabled: true },
  { id: '9', name: 'TypeScript', category: 'Languages', level: 85, enabled: true },
  { id: '10', name: 'React', category: 'Frontend', level: 85, enabled: true },
]

const defaultWorkExperience: WorkExperience[] = [
  {
    id: '1',
    title: 'AI Research Assistant Project | Windsurf AI & Gemini Deep Research',
    company: 'Upwork',
    location: 'Remote',
    startDate: '2025-06',
    endDate: '2025-07',
    current: false,
    description: 'Delivered a full-stack AI assistant with Windsurf AI: Next.js frontend, FastAPI backend, OpenAI embeddings, Pinecone vector store, and ArXiv search tooling.',
    achievements: [
      'Delivered a full-stack AI assistant with Windsurf AI: Next.js frontend, FastAPI backend, OpenAI embeddings, Pinecone vector store, and ArXiv search tooling',
      'Generated and documented the project blueprint using Gemini Deep Research, logging all prompts and insights in Google Docs',
      'Leveraged NotebookLM for live experimentation—capturing commands, concepts, troubleshooting steps—and published an audio summary via its Podcast feature'
    ],
    technologies: ['Next.js', 'FastAPI', 'OpenAI', 'Pinecone', 'ArXiv'],
    links: [
      { label: 'Vercel App', url: '#' },
      { label: 'AI Agent Project Planning - Google Docs', url: '#' },
      { label: 'AI Research Assistant: Setup and Troubleshooting - NotebookLM', url: '#' }
    ],
    enabled: true
  },
  {
    id: '2',
    title: 'Amazon Private Label Bootcamp and Launching Client\'s Product in France',
    company: 'Freelance',
    location: 'Remote',
    startDate: '2024-01',
    endDate: '2024-06',
    current: false,
    description: 'Helped clients launch private label products on Amazon France marketplace.',
    achievements: [
      'Successfully launched multiple private label products',
      'Managed end-to-end product launch process',
      'Optimized listings for French marketplace'
    ],
    technologies: ['Amazon Seller Central', 'Product Research', 'PPC Advertising'],
    links: [],
    enabled: true
  }
]

const defaultProjects: Project[] = [
  {
    id: '1',
    title: 'YouTube Automation Development',
    description: 'Automated 99% of YouTube work required to make Data Comparison Videos',
    longDescription: 'By utilizing N8N workflows, Python Flask frameworks, both frontend and backend, which only required to import AI content and it then scrape images, make video thumbnails and make videos in 4k quality and finally it uploads automatically videos.',
    technologies: ['N8N', 'Python', 'Flask', 'AI', 'Automation'],
    imageUrl: '/projects/youtube-automation.jpg',
    videoUrl: '',
    githubUrl: '#',
    liveUrl: 'https://www.youtube.com/@WatchData',
    category: 'personal',
    featured: true,
    startDate: '2025-01',
    endDate: '2025-05',
    enabled: true
  },
  {
    id: '2',
    title: 'Automation Specialist',
    description: 'Building AI Agents workflows and automation solutions',
    longDescription: 'I have made many AI Agents workflows and still learning and building more and more.',
    technologies: ['AI Agents', 'N8N', 'Automation', 'Python'],
    imageUrl: '/projects/automation.jpg',
    videoUrl: '',
    githubUrl: '#',
    liveUrl: '#',
    category: 'personal',
    featured: true,
    startDate: '2025-01',
    endDate: '2025-07',
    enabled: true
  }
]

const defaultEducation: Education[] = [
  {
    id: '1',
    degree: 'Bachelor of Science in Computer Science',
    institution: 'University of Engineering and Technology',
    location: 'Pakistan',
    startDate: '2020',
    endDate: '2024',
    description: 'Focused on software engineering, AI/ML, and web development.',
    achievements: ['Dean\'s List', 'Completed multiple AI projects'],
    enabled: true
  }
]

const defaultCertifications: Certification[] = [
  {
    id: '1',
    name: 'AI and Machine Learning Fundamentals',
    issuer: 'Coursera',
    date: '2024',
    url: '#',
    credentialId: 'CERT-001',
    enabled: true
  }
]

const defaultServices: Service[] = [
  {
    id: '1',
    title: 'AI Development',
    description: 'Building intelligent AI agents and automation workflows',
    icon: 'brain',
    features: ['Custom AI Agents', 'RAG Systems', 'LLM Integration', 'Vector Databases'],
    enabled: true
  },
  {
    id: '2',
    title: 'Full-Stack Development',
    description: 'End-to-end web application development',
    icon: 'code',
    features: ['Next.js/React', 'FastAPI/Node.js', 'Database Design', 'API Development'],
    enabled: true
  },
  {
    id: '3',
    title: 'Automation Solutions',
    description: 'Streamline workflows and automate repetitive tasks',
    icon: 'zap',
    features: ['N8N Workflows', 'Process Automation', 'Integration Services', 'Bot Development'],
    enabled: true
  }
]

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'John Doe',
    role: 'CEO',
    company: 'Tech Startup',
    content: 'Waqar delivered an exceptional AI solution that transformed our business processes. Highly recommended!',
    imageUrl: '/testimonials/john.jpg',
    rating: 5,
    enabled: true
  }
]

const defaultAchievements: Achievement[] = [
  {
    id: '1',
    title: 'Successfully Launched AI Research Assistant',
    description: 'Built and deployed a full-stack AI assistant using cutting-edge technologies',
    date: '2025-07',
    icon: 'trophy',
    enabled: true
  }
]

const defaultLanguages: Language[] = [
  { id: '1', name: 'English', proficiency: 'Professional', enabled: true },
  { id: '2', name: 'Urdu', proficiency: 'Native', enabled: true },
]

const defaultInterests: Interest[] = [
  { id: '1', name: 'Artificial Intelligence', icon: 'brain', enabled: true },
  { id: '2', name: 'Open Source', icon: 'github', enabled: true },
  { id: '3', name: 'Automation', icon: 'zap', enabled: true },
]

const defaultSectionSettings: SectionSettings = {
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
  timeline: true
}

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set, get) => ({
      profile: defaultProfile,
      socialLinks: defaultSocialLinks,
      skills: defaultSkills,
      workExperience: defaultWorkExperience,
      projects: defaultProjects,
      education: defaultEducation,
      certifications: defaultCertifications,
      testimonials: defaultTestimonials,
      services: defaultServices,
      achievements: defaultAchievements,
      languages: defaultLanguages,
      interests: defaultInterests,
      publications: [],
      awards: [],
      volunteer: [],
      sectionSettings: defaultSectionSettings,
      isAdminAuthenticated: false,
      adminPassword: 'admin123',

      setProfile: (profile) => set((state) => ({ profile: { ...state.profile, ...profile } })),
      setTheme: (theme) => set((state) => ({ profile: { ...state.profile, theme } })),

      // Social Links
      addSocialLink: (link) => set((state) => ({ socialLinks: [...state.socialLinks, link] })),
      updateSocialLink: (id, link) => set((state) => ({
        socialLinks: state.socialLinks.map((l) => (l.id === id ? { ...l, ...link } : l))
      })),
      deleteSocialLink: (id) => set((state) => ({
        socialLinks: state.socialLinks.filter((l) => l.id !== id)
      })),

      // Skills
      addSkill: (skill) => set((state) => ({ skills: [...state.skills, skill] })),
      updateSkill: (id, skill) => set((state) => ({
        skills: state.skills.map((s) => (s.id === id ? { ...s, ...skill } : s))
      })),
      deleteSkill: (id) => set((state) => ({
        skills: state.skills.filter((s) => s.id !== id)
      })),

      // Work Experience
      addWorkExperience: (exp) => set((state) => ({ workExperience: [...state.workExperience, exp] })),
      updateWorkExperience: (id, exp) => set((state) => ({
        workExperience: state.workExperience.map((e) => (e.id === id ? { ...e, ...exp } : e))
      })),
      deleteWorkExperience: (id) => set((state) => ({
        workExperience: state.workExperience.filter((e) => e.id !== id)
      })),

      // Projects
      addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),
      updateProject: (id, project) => set((state) => ({
        projects: state.projects.map((p) => (p.id === id ? { ...p, ...project } : p))
      })),
      deleteProject: (id) => set((state) => ({
        projects: state.projects.filter((p) => p.id !== id)
      })),

      // Education
      addEducation: (edu) => set((state) => ({ education: [...state.education, edu] })),
      updateEducation: (id, edu) => set((state) => ({
        education: state.education.map((e) => (e.id === id ? { ...e, ...edu } : e))
      })),
      deleteEducation: (id) => set((state) => ({
        education: state.education.filter((e) => e.id !== id)
      })),

      // Certifications
      addCertification: (cert) => set((state) => ({ certifications: [...state.certifications, cert] })),
      updateCertification: (id, cert) => set((state) => ({
        certifications: state.certifications.map((c) => (c.id === id ? { ...c, ...cert } : c))
      })),
      deleteCertification: (id) => set((state) => ({
        certifications: state.certifications.filter((c) => c.id !== id)
      })),

      // Testimonials
      addTestimonial: (test) => set((state) => ({ testimonials: [...state.testimonials, test] })),
      updateTestimonial: (id, test) => set((state) => ({
        testimonials: state.testimonials.map((t) => (t.id === id ? { ...t, ...test } : t))
      })),
      deleteTestimonial: (id) => set((state) => ({
        testimonials: state.testimonials.filter((t) => t.id !== id)
      })),

      // Services
      addService: (service) => set((state) => ({ services: [...state.services, service] })),
      updateService: (id, service) => set((state) => ({
        services: state.services.map((s) => (s.id === id ? { ...s, ...service } : s))
      })),
      deleteService: (id) => set((state) => ({
        services: state.services.filter((s) => s.id !== id)
      })),

      // Achievements
      addAchievement: (achievement) => set((state) => ({ achievements: [...state.achievements, achievement] })),
      updateAchievement: (id, achievement) => set((state) => ({
        achievements: state.achievements.map((a) => (a.id === id ? { ...a, ...achievement } : a))
      })),
      deleteAchievement: (id) => set((state) => ({
        achievements: state.achievements.filter((a) => a.id !== id)
      })),

      // Languages
      addLanguage: (lang) => set((state) => ({ languages: [...state.languages, lang] })),
      updateLanguage: (id, lang) => set((state) => ({
        languages: state.languages.map((l) => (l.id === id ? { ...l, ...lang } : l))
      })),
      deleteLanguage: (id) => set((state) => ({
        languages: state.languages.filter((l) => l.id !== id)
      })),

      // Interests
      addInterest: (interest) => set((state) => ({ interests: [...state.interests, interest] })),
      updateInterest: (id, interest) => set((state) => ({
        interests: state.interests.map((i) => (i.id === id ? { ...i, ...interest } : i))
      })),
      deleteInterest: (id) => set((state) => ({
        interests: state.interests.filter((i) => i.id !== id)
      })),

      // Publications
      addPublication: (pub) => set((state) => ({ publications: [...state.publications, pub] })),
      updatePublication: (id, pub) => set((state) => ({
        publications: state.publications.map((p) => (p.id === id ? { ...p, ...pub } : p))
      })),
      deletePublication: (id) => set((state) => ({
        publications: state.publications.filter((p) => p.id !== id)
      })),

      // Awards
      addAward: (award) => set((state) => ({ awards: [...state.awards, award] })),
      updateAward: (id, award) => set((state) => ({
        awards: state.awards.map((a) => (a.id === id ? { ...a, ...award } : a))
      })),
      deleteAward: (id) => set((state) => ({
        awards: state.awards.filter((a) => a.id !== id)
      })),

      // Volunteer
      addVolunteer: (vol) => set((state) => ({ volunteer: [...state.volunteer, vol] })),
      updateVolunteer: (id, vol) => set((state) => ({
        volunteer: state.volunteer.map((v) => (v.id === id ? { ...v, ...vol } : v))
      })),
      deleteVolunteer: (id) => set((state) => ({
        volunteer: state.volunteer.filter((v) => v.id !== id)
      })),

      // Section Settings
      toggleSection: (section) => set((state) => ({
        sectionSettings: { ...state.sectionSettings, [section]: !state.sectionSettings[section] }
      })),
      setSectionSettings: (settings) => set((state) => ({
        sectionSettings: { ...state.sectionSettings, ...settings }
      })),

      // Admin
      login: (password) => {
        const isValid = password === get().adminPassword
        if (isValid) {
          set({ isAdminAuthenticated: true })
        }
        return isValid
      },
      logout: () => set({ isAdminAuthenticated: false }),
      setAdminPassword: (password) => set({ adminPassword: password }),
    }),
    {
      name: 'portfolio-storage',
    }
  )
)

export const generateId = () => Math.random().toString(36).substr(2, 9)
