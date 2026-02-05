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
} from '@/lib/db'

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
        shortBio: profile.short_bio,
        profileImage: profile.profile_image || '',
        resumeUrl: profile.resume_url || '',
        availableForHire: profile.available_for_hire,
        yearsOfExperience: profile.years_of_experience,
        projectsCompleted: profile.projects_completed,
        happyClients: profile.happy_clients,
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
        startDate: exp.start_date,
        endDate: exp.end_date || '',
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
        longDescription: project.long_description || '',
        technologies: project.technologies || [],
        imageUrl: project.image_url || '',
        videoUrl: project.video_url || '',
        githubUrl: project.github_url || '',
        liveUrl: project.live_url || '',
        category: project.category || '',
        featured: project.featured,
        startDate: project.start_date || '',
        endDate: project.end_date || '',
        enabled: project.enabled
      })),
      education: education.map((edu: any) => ({
        id: edu.id.toString(),
        degree: edu.degree,
        institution: edu.institution,
        location: edu.location,
        startDate: edu.start_date,
        endDate: edu.end_date,
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
        credentialId: cert.credential_id || '',
        enabled: cert.enabled
      })),
      testimonials: testimonials.map((testimonial: any) => ({
        id: testimonial.id.toString(),
        name: testimonial.name,
        role: testimonial.role,
        company: testimonial.company,
        content: testimonial.content,
        imageUrl: testimonial.image_url || '',
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
        personalProjects: sectionSettings.personal_projects,
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
