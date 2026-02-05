import { 
  getProfile, 
  getSocialLinks, 
  getSkills, 
  getWorkExperience, 
  getProjects, 
  getEducation, 
  getCertifications, 
  getTestimonials, 
  getServices, 
  getSectionSettings 
} from '@/lib/prisma-db'

// API route to get all portfolio data
export async function GET() {
  try {
    const [
      profile,
      socialLinks,
      skills,
      workExperience,
      projects,
      education,
      certifications,
      testimonials,
      services,
      sectionSettings
    ] = await Promise.all([
      getProfile(),
      getSocialLinks(),
      getSkills(),
      getWorkExperience(),
      getProjects(),
      getEducation(),
      getCertifications(),
      getTestimonials(),
      getServices(),
      getSectionSettings()
    ])

    // Transform database data to match frontend interface
    const transformedData = {
      profile: profile ? {
        id: profile.id.toString(),
        name: profile.name,
        title: profile.title,
        subtitle: profile.subtitle || '',
        email: profile.email,
        phone: profile.phone || '',
        location: profile.location,
        bio: profile.bio,
        shortBio: profile.shortBio,
        profileImage: profile.profileImage || '',
        resumeUrl: profile.resumeUrl || '',
        availableForHire: profile.availableForHire,
        yearsOfExperience: profile.yearsOfExperience,
        projectsCompleted: profile.projectsCompleted,
        happyClients: profile.happyClients,
        theme: profile.theme || 'professional'
      } : null,
      socialLinks: socialLinks.map((link: any) => ({
        id: link.id.toString(),
        platform: link.platform,
        url: link.url,
        icon: link.icon,
        enabled: link.enabled
      })),
      skills: skills.map((skill: any) => ({
        id: skill.id.toString(),
        name: skill.name,
        category: skill.category,
        level: skill.level,
        enabled: skill.enabled
      })),
      workExperience: workExperience.map((exp: any) => ({
        id: exp.id.toString(),
        title: exp.title,
        company: exp.company,
        location: exp.location,
        startDate: exp.startDate,
        endDate: exp.endDate || '',
        current: exp.current,
        description: exp.description || '',
        achievements: exp.achievements || [],
        technologies: exp.technologies || [],
        links: exp.links || [],
        enabled: exp.enabled
      })),
      projects: projects.map((project: any) => ({
        id: project.id.toString(),
        title: project.title,
        description: project.description,
        longDescription: project.longDescription || '',
        technologies: project.technologies || [],
        imageUrl: project.imageUrl || '',
        videoUrl: project.videoUrl || '',
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || '',
        category: project.category || '',
        featured: project.featured,
        startDate: project.startDate || '',
        endDate: project.endDate || '',
        enabled: project.enabled
      })),
      education: education.map((edu: any) => ({
        id: edu.id.toString(),
        degree: edu.degree,
        institution: edu.institution,
        location: edu.location,
        startDate: edu.startDate,
        endDate: edu.endDate,
        description: edu.description || '',
        achievements: edu.achievements || [],
        enabled: edu.enabled
      })),
      certifications: certifications.map((cert: any) => ({
        id: cert.id.toString(),
        name: cert.name,
        issuer: cert.issuer,
        date: cert.date,
        url: cert.url || '',
        credentialId: cert.credentialId || '',
        enabled: cert.enabled
      })),
      testimonials: testimonials.map((testimonial: any) => ({
        id: testimonial.id.toString(),
        name: testimonial.name,
        role: testimonial.role,
        company: testimonial.company,
        content: testimonial.content,
        imageUrl: testimonial.imageUrl || '',
        rating: testimonial.rating,
        enabled: testimonial.enabled
      })),
      services: services.map((service: any) => ({
        id: service.id.toString(),
        title: service.title,
        description: service.description,
        icon: service.icon,
        features: service.features || [],
        enabled: service.enabled
      })),
      sectionSettings: sectionSettings ? {
        id: sectionSettings.id.toString(),
        hero: sectionSettings.hero,
        about: sectionSettings.about,
        skills: sectionSettings.skills,
        experience: sectionSettings.experience,
        projects: sectionSettings.projects,
        personalProjects: sectionSettings.personalProjects,
        education: sectionSettings.education,
        certifications: sectionSettings.certifications,
        services: sectionSettings.services,
        testimonials: sectionSettings.testimonials,
        achievements: sectionSettings.achievements,
        languages: sectionSettings.languages,
        interests: sectionSettings.interests,
        publications: sectionSettings.publications,
        awards: sectionSettings.awards,
        volunteer: sectionSettings.volunteer,
        contact: sectionSettings.contact,
        timeline: sectionSettings.timeline
      } : null
    }

    return Response.json(transformedData)
  } catch (error) {
    console.error('Error fetching portfolio data:', error)
    return Response.json(
      { error: 'Failed to fetch portfolio data' },
      { status: 500 }
    )
  }
}
