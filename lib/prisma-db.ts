import { prisma } from '@/lib/prisma'

// Profile operations
export async function getProfile() {
  try {
    const profile = await prisma.profile.findFirst({
      include: {
        socialLinks: true,
        skills: true,
        workExperience: true,
        projects: true,
        education: true,
        certifications: true,
        testimonials: true,
        services: true,
        sectionSettings: true,
        adminSettings: true,
      },
    })
    return profile
  } catch (error) {
    console.error('Error fetching profile:', error)
    return null
  }
}

export async function updateProfile(data: any) {
  try {
    const existing = await prisma.profile.findFirst()
    
    if (existing) {
      return await prisma.profile.update({
        where: { id: existing.id },
        data: {
          name: data.name,
          title: data.title,
          subtitle: data.subtitle,
          email: data.email,
          phone: data.phone,
          location: data.location,
          bio: data.bio,
          shortBio: data.shortBio,
          profileImage: data.profileImage,
          resumeUrl: data.resumeUrl,
          availableForHire: data.availableForHire,
          yearsOfExperience: data.yearsOfExperience,
          projectsCompleted: data.projectsCompleted,
          happyClients: data.happyClients,
          theme: data.theme,
        },
      })
    } else {
      return await prisma.profile.create({
        data: {
          name: data.name,
          title: data.title,
          subtitle: data.subtitle,
          email: data.email,
          phone: data.phone,
          location: data.location,
          bio: data.bio,
          shortBio: data.shortBio,
          profileImage: data.profileImage,
          resumeUrl: data.resumeUrl,
          availableForHire: data.availableForHire,
          yearsOfExperience: data.yearsOfExperience,
          projectsCompleted: data.projectsCompleted,
          happyClients: data.happyClients,
          theme: data.theme,
        },
      })
    }
  } catch (error) {
    console.error('Error updating profile:', error)
    throw error
  }
}

// Theme operations (public - no authentication required)
export async function updateTheme(theme: string) {
  try {
    const existing = await prisma.profile.findFirst()
    
    if (existing) {
      return await prisma.profile.update({
        where: { id: existing.id },
        data: { theme },
      })
    } else {
      // Create a new profile with default values and the selected theme
      return await prisma.profile.create({
        data: {
          name: 'Portfolio',
          title: 'Developer',
          subtitle: '',
          email: '',
          phone: '',
          location: '',
          bio: '',
          shortBio: '',
          profileImage: '',
          resumeUrl: '',
          availableForHire: false,
          yearsOfExperience: 0,
          projectsCompleted: 0,
          happyClients: 0,
          theme,
        },
      })
    }
  } catch (error) {
    console.error('Error updating theme:', error)
    throw error
  }
}

// Social links operations
export async function getSocialLinks() {
  try {
    return await prisma.socialLink.findMany({
      orderBy: { id: 'asc' },
    })
  } catch (error) {
    console.error('Error fetching social links:', error)
    return []
  }
}

export async function addSocialLink(data: any) {
  try {
    return await prisma.socialLink.create({
      data: {
        platform: data.platform,
        url: data.url,
        icon: data.icon,
        enabled: data.enabled,
        profileId: 1, // Assuming first profile
      },
    })
  } catch (error) {
    console.error('Error adding social link:', error)
    throw error
  }
}

export async function updateSocialLink(id: string, data: any) {
  try {
    return await prisma.socialLink.update({
      where: { id: parseInt(id) },
      data: {
        platform: data.platform,
        url: data.url,
        icon: data.icon,
        enabled: data.enabled,
      },
    })
  } catch (error) {
    console.error('Error updating social link:', error)
    throw error
  }
}

export async function deleteSocialLink(id: string) {
  try {
    await prisma.socialLink.delete({
      where: { id: parseInt(id) },
    })
  } catch (error) {
    console.error('Error deleting social link:', error)
    throw error
  }
}

// Skills operations
export async function getSkills() {
  try {
    return await prisma.skill.findMany({
      orderBy: [{ category: 'asc' }, { name: 'asc' }],
    })
  } catch (error) {
    console.error('Error fetching skills:', error)
    return []
  }
}

export async function addSkill(data: any) {
  try {
    return await prisma.skill.create({
      data: {
        name: data.name,
        category: data.category,
        level: data.level,
        enabled: data.enabled,
        profileId: 1,
      },
    })
  } catch (error) {
    console.error('Error adding skill:', error)
    throw error
  }
}

export async function updateSkill(id: string, data: any) {
  try {
    return await prisma.skill.update({
      where: { id: parseInt(id) },
      data: {
        name: data.name,
        category: data.category,
        level: data.level,
        enabled: data.enabled,
      },
    })
  } catch (error) {
    console.error('Error updating skill:', error)
    throw error
  }
}

export async function deleteSkill(id: string) {
  try {
    await prisma.skill.delete({
      where: { id: parseInt(id) },
    })
  } catch (error) {
    console.error('Error deleting skill:', error)
    throw error
  }
}

// Work experience operations
export async function getWorkExperience() {
  try {
    return await prisma.workExperience.findMany({
      orderBy: { startDate: 'desc' },
    })
  } catch (error) {
    console.error('Error fetching work experience:', error)
    return []
  }
}

export async function addWorkExperience(data: any) {
  try {
    return await prisma.workExperience.create({
      data: {
        title: data.title,
        company: data.company,
        location: data.location,
        startDate: data.startDate,
        endDate: data.endDate,
        current: data.current,
        description: data.description,
        achievements: data.achievements,
        technologies: data.technologies,
        links: data.links,
        enabled: data.enabled,
        profileId: 1,
      },
    })
  } catch (error) {
    console.error('Error adding work experience:', error)
    throw error
  }
}

export async function updateWorkExperience(id: string, data: any) {
  try {
    return await prisma.workExperience.update({
      where: { id: parseInt(id) },
      data: {
        title: data.title,
        company: data.company,
        location: data.location,
        startDate: data.startDate,
        endDate: data.endDate,
        current: data.current,
        description: data.description,
        achievements: data.achievements,
        technologies: data.technologies,
        links: data.links,
        enabled: data.enabled,
      },
    })
  } catch (error) {
    console.error('Error updating work experience:', error)
    throw error
  }
}

export async function deleteWorkExperience(id: string) {
  try {
    await prisma.workExperience.delete({
      where: { id: parseInt(id) },
    })
  } catch (error) {
    console.error('Error deleting work experience:', error)
    throw error
  }
}

// Projects operations
export async function getProjects() {
  try {
    return await prisma.project.findMany({
      orderBy: [{ featured: 'desc' }, { startDate: 'desc' }],
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function addProject(data: any) {
  try {
    return await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        longDescription: data.longDescription,
        technologies: data.technologies,
        imageUrl: data.imageUrl,
        videoUrl: data.videoUrl,
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        category: data.category,
        featured: data.featured,
        startDate: data.startDate,
        endDate: data.endDate,
        enabled: data.enabled,
        profileId: 1,
      },
    })
  } catch (error) {
    console.error('Error adding project:', error)
    throw error
  }
}

export async function updateProject(id: string, data: any) {
  try {
    return await prisma.project.update({
      where: { id: parseInt(id) },
      data: {
        title: data.title,
        description: data.description,
        longDescription: data.longDescription,
        technologies: data.technologies,
        imageUrl: data.imageUrl,
        videoUrl: data.videoUrl,
        githubUrl: data.githubUrl,
        liveUrl: data.liveUrl,
        category: data.category,
        featured: data.featured,
        startDate: data.startDate,
        endDate: data.endDate,
        enabled: data.enabled,
      },
    })
  } catch (error) {
    console.error('Error updating project:', error)
    throw error
  }
}

export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({
      where: { id: parseInt(id) },
    })
  } catch (error) {
    console.error('Error deleting project:', error)
    throw error
  }
}

// Education operations
export async function getEducation() {
  try {
    return await prisma.education.findMany({
      orderBy: { startDate: 'desc' },
    })
  } catch (error) {
    console.error('Error fetching education:', error)
    return []
  }
}

export async function addEducation(data: any) {
  try {
    return await prisma.education.create({
      data: {
        degree: data.degree,
        institution: data.institution,
        location: data.location,
        startDate: data.startDate,
        endDate: data.endDate,
        description: data.description,
        achievements: data.achievements,
        enabled: data.enabled,
        profileId: 1,
      },
    })
  } catch (error) {
    console.error('Error adding education:', error)
    throw error
  }
}

export async function updateEducation(id: string, data: any) {
  try {
    return await prisma.education.update({
      where: { id: parseInt(id) },
      data: {
        degree: data.degree,
        institution: data.institution,
        location: data.location,
        startDate: data.startDate,
        endDate: data.endDate,
        description: data.description,
        achievements: data.achievements,
        enabled: data.enabled,
      },
    })
  } catch (error) {
    console.error('Error updating education:', error)
    throw error
  }
}

export async function deleteEducation(id: string) {
  try {
    await prisma.education.delete({
      where: { id: parseInt(id) },
    })
  } catch (error) {
    console.error('Error deleting education:', error)
    throw error
  }
}

// Certifications operations
export async function getCertifications() {
  try {
    return await prisma.certification.findMany({
      orderBy: { date: 'desc' },
    })
  } catch (error) {
    console.error('Error fetching certifications:', error)
    return []
  }
}

export async function addCertification(data: any) {
  try {
    return await prisma.certification.create({
      data: {
        name: data.name,
        issuer: data.issuer,
        date: data.date,
        url: data.url,
        credentialId: data.credentialId,
        enabled: data.enabled,
        profileId: 1,
      },
    })
  } catch (error) {
    console.error('Error adding certification:', error)
    throw error
  }
}

export async function updateCertification(id: string, data: any) {
  try {
    return await prisma.certification.update({
      where: { id: parseInt(id) },
      data: {
        name: data.name,
        issuer: data.issuer,
        date: data.date,
        url: data.url,
        credentialId: data.credentialId,
        enabled: data.enabled,
      },
    })
  } catch (error) {
    console.error('Error updating certification:', error)
    throw error
  }
}

export async function deleteCertification(id: string) {
  try {
    await prisma.certification.delete({
      where: { id: parseInt(id) },
    })
  } catch (error) {
    console.error('Error deleting certification:', error)
    throw error
  }
}

// Testimonials operations
export async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    })
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

export async function addTestimonial(data: any) {
  try {
    return await prisma.testimonial.create({
      data: {
        name: data.name,
        role: data.role,
        company: data.company,
        content: data.content,
        imageUrl: data.imageUrl,
        rating: data.rating,
        enabled: data.enabled,
        profileId: 1,
      },
    })
  } catch (error) {
    console.error('Error adding testimonial:', error)
    throw error
  }
}

export async function updateTestimonial(id: string, data: any) {
  try {
    return await prisma.testimonial.update({
      where: { id: parseInt(id) },
      data: {
        name: data.name,
        role: data.role,
        company: data.company,
        content: data.content,
        imageUrl: data.imageUrl,
        rating: data.rating,
        enabled: data.enabled,
      },
    })
  } catch (error) {
    console.error('Error updating testimonial:', error)
    throw error
  }
}

export async function deleteTestimonial(id: string) {
  try {
    await prisma.testimonial.delete({
      where: { id: parseInt(id) },
    })
  } catch (error) {
    console.error('Error deleting testimonial:', error)
    throw error
  }
}

// Services operations
export async function getServices() {
  try {
    return await prisma.service.findMany({
      orderBy: { id: 'asc' },
    })
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

export async function addService(data: any) {
  try {
    return await prisma.service.create({
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        features: data.features,
        enabled: data.enabled,
        profileId: 1,
      },
    })
  } catch (error) {
    console.error('Error adding service:', error)
    throw error
  }
}

export async function updateService(id: string, data: any) {
  try {
    return await prisma.service.update({
      where: { id: parseInt(id) },
      data: {
        title: data.title,
        description: data.description,
        icon: data.icon,
        features: data.features,
        enabled: data.enabled,
      },
    })
  } catch (error) {
    console.error('Error updating service:', error)
    throw error
  }
}

export async function deleteService(id: string) {
  try {
    await prisma.service.delete({
      where: { id: parseInt(id) },
    })
  } catch (error) {
    console.error('Error deleting service:', error)
    throw error
  }
}

// Section settings operations
export async function getSectionSettings() {
  try {
    return await prisma.sectionSettings.findFirst()
  } catch (error) {
    console.error('Error fetching section settings:', error)
    return null
  }
}

export async function updateSectionSettings(data: any) {
  try {
    const existing = await prisma.sectionSettings.findFirst()
    
    if (existing) {
      return await prisma.sectionSettings.update({
        where: { id: existing.id },
        data: {
          hero: data.hero,
          about: data.about,
          skills: data.skills,
          experience: data.experience,
          projects: data.projects,
          personalProjects: data.personalProjects,
          education: data.education,
          certifications: data.certifications,
          services: data.services,
          testimonials: data.testimonials,
          achievements: data.achievements,
          languages: data.languages,
          interests: data.interests,
          publications: data.publications,
          awards: data.awards,
          volunteer: data.volunteer,
          contact: data.contact,
          timeline: data.timeline,
        },
      })
    } else {
      return await prisma.sectionSettings.create({
        data: {
          hero: data.hero,
          about: data.about,
          skills: data.skills,
          experience: data.experience,
          projects: data.projects,
          personalProjects: data.personalProjects,
          education: data.education,
          certifications: data.certifications,
          services: data.services,
          testimonials: data.testimonials,
          achievements: data.achievements,
          languages: data.languages,
          interests: data.interests,
          publications: data.publications,
          awards: data.awards,
          volunteer: data.volunteer,
          contact: data.contact,
          timeline: data.timeline,
          profileId: 1,
        },
      })
    }
  } catch (error) {
    console.error('Error updating section settings:', error)
    throw error
  }
}

// Admin operations
export async function getAdminSettings() {
  try {
    return await prisma.adminSettings.findFirst()
  } catch (error) {
    console.error('Error fetching admin settings:', error)
    return null
  }
}

export async function updateAdminPassword(password: string) {
  try {
    const existing = await prisma.adminSettings.findFirst()
    
    if (existing) {
      return await prisma.adminSettings.update({
        where: { id: existing.id },
        data: { adminPassword: password },
      })
    } else {
      return await prisma.adminSettings.create({
        data: {
          adminPassword: password,
          profileId: 1,
        },
      })
    }
  } catch (error) {
    console.error('Error updating admin password:', error)
    throw error
  }
}

export async function checkAdminPassword(password: string) {
  try {
    const settings = await prisma.adminSettings.findFirst()
    return settings?.adminPassword === password
  } catch (error) {
    console.error('Error checking admin password:', error)
    return false
  }
}
