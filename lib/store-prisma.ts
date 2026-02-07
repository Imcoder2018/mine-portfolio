import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// Database interfaces
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
  id: string
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
  // Data
  profile: ProfileInfo | null
  socialLinks: SocialLink[]
  skills: Skill[]
  workExperience: WorkExperience[]
  projects: Project[]
  education: Education[]
  certifications: Certification[]
  testimonials: Testimonial[]
  services: Service[]
  sectionSettings: SectionSettings | null
  isLoading: boolean
  error: string | null
  
  // Actions
  fetchData: () => Promise<void>
  setProfile: (profile: Partial<ProfileInfo>) => Promise<void>
  setTheme: (theme: 'professional' | 'bauhaus') => Promise<void>
  
  // Social Links
  addSocialLink: (link: SocialLink) => Promise<void>
  updateSocialLink: (id: string, link: Partial<SocialLink>) => Promise<void>
  deleteSocialLink: (id: string) => Promise<void>
  
  // Skills
  addSkill: (skill: Skill) => Promise<void>
  updateSkill: (id: string, skill: Partial<Skill>) => Promise<void>
  deleteSkill: (id: string) => Promise<void>
  reorderSkills: (oldIndex: number, newIndex: number) => Promise<void>
  
  // Work Experience
  addWorkExperience: (exp: WorkExperience) => Promise<void>
  updateWorkExperience: (id: string, exp: Partial<WorkExperience>) => Promise<void>
  deleteWorkExperience: (id: string) => Promise<void>
  
  // Projects
  addProject: (project: Project) => Promise<void>
  updateProject: (id: string, project: Partial<Project>) => Promise<void>
  deleteProject: (id: string) => Promise<void>
  reorderProjects: (oldIndex: number, newIndex: number) => Promise<void>
  
  // Education
  addEducation: (edu: Education) => Promise<void>
  updateEducation: (id: string, edu: Partial<Education>) => Promise<void>
  deleteEducation: (id: string) => Promise<void>
  
  // Certifications
  addCertification: (cert: Certification) => Promise<void>
  updateCertification: (id: string, cert: Partial<Certification>) => Promise<void>
  deleteCertification: (id: string) => Promise<void>
  
  // Testimonials
  addTestimonial: (test: Testimonial) => Promise<void>
  updateTestimonial: (id: string, test: Partial<Testimonial>) => Promise<void>
  deleteTestimonial: (id: string) => Promise<void>
  
  // Services
  addService: (service: Service) => Promise<void>
  updateService: (id: string, service: Partial<Service>) => Promise<void>
  deleteService: (id: string) => Promise<void>
  
  // Section Settings
  toggleSection: (section: keyof SectionSettings) => Promise<void>
  setSectionSettings: (settings: Partial<SectionSettings>) => Promise<void>
}

// Default values for fallback
const defaultProfile: ProfileInfo = {
  id: '1',
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

// API helper function
async function apiCall(action: string, data?: any, id?: string) {
  const response = await fetch('/api/portfolio/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ action, data, id }),
  })
  
  if (!response.ok) {
    throw new Error('API call failed')
  }
  
  return response.json()
}

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set, get) => ({
      // Initial state
      profile: null,
      socialLinks: [],
      skills: [],
      workExperience: [],
      projects: [],
      education: [],
      certifications: [],
      testimonials: [],
      services: [],
      sectionSettings: null,
      isLoading: false,
      error: null,

      // Fetch data from database
      fetchData: async () => {
        // Don't fetch if already loading
        const currentState = get()
        if (currentState.isLoading) return
        
        set({ isLoading: true, error: null })
        
        // Add timeout to prevent infinite loading
        const timeoutId = setTimeout(() => {
          set({ 
            isLoading: false, 
            error: 'Loading timeout - please refresh the page',
            profile: defaultProfile,
            sectionSettings: defaultSectionSettings
          })
        }, 10000) // 10 second timeout
        
        try {
          const response = await fetch('/api/portfolio')
          clearTimeout(timeoutId)
          
          if (!response.ok) {
            throw new Error('Failed to fetch data')
          }
          
          const data = await response.json()
          
          set({
            profile: data.profile || defaultProfile,
            socialLinks: data.socialLinks || [],
            skills: data.skills || [],
            workExperience: data.workExperience || [],
            projects: data.projects || [],
            education: data.education || [],
            certifications: data.certifications || [],
            testimonials: data.testimonials || [],
            services: data.services || [],
            sectionSettings: data.sectionSettings || defaultSectionSettings,
            isLoading: false,
            error: null
          })
        } catch (error) {
          clearTimeout(timeoutId)
          console.error('Error fetching data:', error)
          set({ 
            error: 'Failed to load portfolio data',
            isLoading: false,
            // Fallback to default data
            profile: defaultProfile,
            sectionSettings: defaultSectionSettings
          })
        }
      },

      // Profile
      setProfile: async (profile) => {
        const currentProfile = get().profile
        if (!currentProfile) return
        
        const updatedProfile = { ...currentProfile, ...profile }
        await apiCall('updateProfile', updatedProfile)
        set({ profile: updatedProfile })
      },

      setTheme: async (theme) => {
        const currentProfile = get().profile
        if (!currentProfile) return
        
        try {
          await apiCall('updateTheme', { theme })
          const updatedProfile = { ...currentProfile, theme }
          set({ profile: updatedProfile })
        } catch (error) {
          console.error('Error in setTheme:', error)
        }
      },

      // Social Links
      addSocialLink: async (link) => {
        const result = await apiCall('addSocialLink', link)
        const newLink = { ...link, id: result.id.toString() }
        set((state) => ({ socialLinks: [...state.socialLinks, newLink] }))
      },

      updateSocialLink: async (id, link) => {
        await apiCall('updateSocialLink', link, id)
        set((state) => ({
          socialLinks: state.socialLinks.map((l) => (l.id === id ? { ...l, ...link } : l))
        }))
      },

      deleteSocialLink: async (id) => {
        await apiCall('deleteSocialLink', undefined, id)
        set((state) => ({
          socialLinks: state.socialLinks.filter((l) => l.id !== id)
        }))
      },

      // Skills
      addSkill: async (skill) => {
        const result = await apiCall('addSkill', skill)
        const newSkill = { ...skill, id: result.id.toString() }
        set((state) => ({ skills: [...state.skills, newSkill] }))
      },

      updateSkill: async (id, skill) => {
        await apiCall('updateSkill', skill, id)
        set((state) => ({
          skills: state.skills.map((s) => (s.id === id ? { ...s, ...skill } : s))
        }))
      },

      deleteSkill: async (id) => {
        await apiCall('deleteSkill', undefined, id)
        set((state) => ({
          skills: state.skills.filter((s) => s.id !== id)
        }))
      },

      reorderSkills: async (oldIndex, newIndex) => {
        set((state) => {
          const newSkills = [...state.skills]
          const [moved] = newSkills.splice(oldIndex, 1)
          newSkills.splice(newIndex, 0, moved)
          return { skills: newSkills }
        })
        
        await apiCall('reorderSkills', { oldIndex, newIndex })
      },

      // Work Experience
      addWorkExperience: async (exp) => {
        const result = await apiCall('addWorkExperience', exp)
        const newExp = { ...exp, id: result.id.toString() }
        set((state) => ({ workExperience: [...state.workExperience, newExp] }))
      },

      updateWorkExperience: async (id, exp) => {
        await apiCall('updateWorkExperience', exp, id)
        set((state) => ({
          workExperience: state.workExperience.map((e) => (e.id === id ? { ...e, ...exp } : e))
        }))
      },

      deleteWorkExperience: async (id) => {
        await apiCall('deleteWorkExperience', undefined, id)
        set((state) => ({
          workExperience: state.workExperience.filter((e) => e.id !== id)
        }))
      },

      // Projects
      addProject: async (project) => {
        const result = await apiCall('addProject', project)
        const newProject = { ...project, id: result.id.toString() }
        set((state) => ({ projects: [...state.projects, newProject] }))
      },

      updateProject: async (id, project) => {
        await apiCall('updateProject', project, id)
        set((state) => ({
          projects: state.projects.map((p) => (p.id === id ? { ...p, ...project } : p))
        }))
      },

      deleteProject: async (id) => {
        await apiCall('deleteProject', undefined, id)
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id)
        }))
      },

      reorderProjects: async (oldIndex, newIndex) => {
        set((state) => {
          const newProjects = [...state.projects]
          const [moved] = newProjects.splice(oldIndex, 1)
          newProjects.splice(newIndex, 0, moved)
          return { projects: newProjects }
        })
        
        // Update order in database via API
        await apiCall('reorderProjects', { oldIndex, newIndex })
      },

      // Education
      addEducation: async (edu) => {
        const result = await apiCall('addEducation', edu)
        const newEdu = { ...edu, id: result.id.toString() }
        set((state) => ({ education: [...state.education, newEdu] }))
      },

      updateEducation: async (id, edu) => {
        await apiCall('updateEducation', edu, id)
        set((state) => ({
          education: state.education.map((e) => (e.id === id ? { ...e, ...edu } : e))
        }))
      },

      deleteEducation: async (id) => {
        await apiCall('deleteEducation', undefined, id)
        set((state) => ({
          education: state.education.filter((e) => e.id !== id)
        }))
      },

      // Certifications
      addCertification: async (cert) => {
        const result = await apiCall('addCertification', cert)
        const newCert = { ...cert, id: result.id.toString() }
        set((state) => ({ certifications: [...state.certifications, newCert] }))
      },

      updateCertification: async (id, cert) => {
        await apiCall('updateCertification', cert, id)
        set((state) => ({
          certifications: state.certifications.map((c) => (c.id === id ? { ...c, ...cert } : c))
        }))
      },

      deleteCertification: async (id) => {
        await apiCall('deleteCertification', undefined, id)
        set((state) => ({
          certifications: state.certifications.filter((c) => c.id !== id)
        }))
      },

      // Testimonials
      addTestimonial: async (test) => {
        const result = await apiCall('addTestimonial', test)
        const newTestimonial = { ...test, id: result.id.toString() }
        set((state) => ({ testimonials: [...state.testimonials, newTestimonial] }))
      },

      updateTestimonial: async (id, test) => {
        await apiCall('updateTestimonial', test, id)
        set((state) => ({
          testimonials: state.testimonials.map((t) => (t.id === id ? { ...t, ...test } : t))
        }))
      },

      deleteTestimonial: async (id) => {
        await apiCall('deleteTestimonial', undefined, id)
        set((state) => ({
          testimonials: state.testimonials.filter((t) => t.id !== id)
        }))
      },

      // Services
      addService: async (service) => {
        const result = await apiCall('addService', service)
        const newService = { ...service, id: result.id.toString() }
        set((state) => ({ services: [...state.services, newService] }))
      },

      updateService: async (id, service) => {
        await apiCall('updateService', service, id)
        set((state) => ({
          services: state.services.map((s) => (s.id === id ? { ...s, ...service } : s))
        }))
      },

      deleteService: async (id) => {
        await apiCall('deleteService', undefined, id)
        set((state) => ({
          services: state.services.filter((s) => s.id !== id)
        }))
      },

      // Section Settings
      toggleSection: async (section) => {
        const currentSettings = get().sectionSettings
        if (!currentSettings) return
        
        const updatedSettings = { ...currentSettings, [section]: !currentSettings[section] }
        await apiCall('updateSectionSettings', updatedSettings)
        set({ sectionSettings: updatedSettings })
      },

      setSectionSettings: async (settings) => {
        const currentSettings = get().sectionSettings
        if (!currentSettings) return
        
        const updatedSettings = { ...currentSettings, ...settings }
        await apiCall('updateSectionSettings', updatedSettings)
        set({ sectionSettings: updatedSettings })
      },

    }),
    {
      name: 'portfolio-storage',
      partialize: () => ({}),
    }
  )
)

export const generateId = () => Math.random().toString(36).substr(2, 9)
