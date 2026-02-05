import { neon } from '@neondatabase/serverless'

// Database connection with fallback
let sql: any = null

if (process.env.DATABASE_URL) {
  try {
    sql = neon(process.env.DATABASE_URL)
  } catch (error) {
    console.warn('Failed to initialize database connection:', error)
  }
}

// Helper function to check if database is available
export function isDatabaseAvailable() {
  return sql !== null
}

// Profile operations
export async function getProfile() {
  if (!sql) return null
  try {
    const result = await sql`SELECT * FROM profile ORDER BY id DESC LIMIT 1`
    return result[0] || null
  } catch (error) {
    console.error('Error fetching profile:', error)
    return null
  }
}

export async function updateProfile(data: any) {
  if (!sql) throw new Error('Database not available')
  
  const existing = await getProfile()
  
  if (existing) {
    await sql`
      UPDATE profile SET 
        name = ${data.name},
        title = ${data.title},
        subtitle = ${data.subtitle},
        email = ${data.email},
        phone = ${data.phone},
        location = ${data.location},
        bio = ${data.bio},
        short_bio = ${data.shortBio},
        profile_image = ${data.profileImage},
        resume_url = ${data.resumeUrl},
        available_for_hire = ${data.availableForHire},
        years_of_experience = ${data.yearsOfExperience},
        projects_completed = ${data.projectsCompleted},
        happy_clients = ${data.happyClients},
        theme = ${data.theme}
      WHERE id = ${existing.id}
    `
  } else {
    await sql`
      INSERT INTO profile (
        name, title, subtitle, email, phone, location, bio, short_bio,
        profile_image, resume_url, available_for_hire, years_of_experience,
        projects_completed, happy_clients, theme
      ) VALUES (
        ${data.name}, ${data.title}, ${data.subtitle}, ${data.email}, ${data.phone},
        ${data.location}, ${data.bio}, ${data.shortBio}, ${data.profileImage},
        ${data.resumeUrl}, ${data.availableForHire}, ${data.yearsOfExperience},
        ${data.projectsCompleted}, ${data.happyClients}, ${data.theme}
      )
    `
  }
  
  return await getProfile()
}

// Social links operations
export async function getSocialLinks() {
  if (!sql) return []
  try {
    return await sql`SELECT * FROM social_links ORDER BY id`
  } catch (error) {
    console.error('Error fetching social links:', error)
    return []
  }
}

export async function addSocialLink(data: any) {
  if (!sql) throw new Error('Database not available')
  const result = await sql`
    INSERT INTO social_links (platform, url, icon, enabled)
    VALUES (${data.platform}, ${data.url}, ${data.icon}, ${data.enabled})
    RETURNING *
  `
  return result[0]
}

export async function updateSocialLink(id: string, data: any) {
  if (!sql) throw new Error('Database not available')
  const result = await sql`
    UPDATE social_links 
    SET platform = ${data.platform}, url = ${data.url}, icon = ${data.icon}, enabled = ${data.enabled}
    WHERE id = ${id}
    RETURNING *
  `
  return result[0]
}

export async function deleteSocialLink(id: string) {
  if (!sql) throw new Error('Database not available')
  await sql`DELETE FROM social_links WHERE id = ${id}`
}

// Skills operations
export async function getSkills() {
  if (!sql) return []
  try {
    return await sql`SELECT * FROM skills ORDER BY category, name`
  } catch (error) {
    console.error('Error fetching skills:', error)
    return []
  }
}

export async function addSkill(data: any) {
  if (!sql) throw new Error('Database not available')
  const result = await sql`
    INSERT INTO skills (name, category, level, enabled)
    VALUES (${data.name}, ${data.category}, ${data.level}, ${data.enabled})
    RETURNING *
  `
  return result[0]
}

export async function updateSkill(id: string, data: any) {
  if (!sql) throw new Error('Database not available')
  const result = await sql`
    UPDATE skills 
    SET name = ${data.name}, category = ${data.category}, level = ${data.level}, enabled = ${data.enabled}
    WHERE id = ${id}
    RETURNING *
  `
  return result[0]
}

export async function deleteSkill(id: string) {
  if (!sql) throw new Error('Database not available')
  await sql`DELETE FROM skills WHERE id = ${id}`
}

// Work experience operations
export async function getWorkExperience() {
  if (!sql) return []
  try {
    return await sql`SELECT * FROM work_experience ORDER BY start_date DESC`
  } catch (error) {
    console.error('Error fetching work experience:', error)
    return []
  }
}

export async function addWorkExperience(data: any) {
  if (!sql) throw new Error('Database not available')
  const result = await sql`
    INSERT INTO work_experience (
      title, company, location, start_date, end_date, current, description,
      achievements, technologies, links, enabled
    ) VALUES (
      ${data.title}, ${data.company}, ${data.location}, ${data.startDate},
      ${data.endDate}, ${data.current}, ${data.description},
      ${data.achievements}, ${data.technologies}, ${JSON.stringify(data.links)}, ${data.enabled}
    )
    RETURNING *
  `
  return result[0]
}

export async function updateWorkExperience(id: string, data: any) {
  if (!sql) throw new Error('Database not available')
  const result = await sql`
    UPDATE work_experience 
    SET 
      title = ${data.title}, company = ${data.company}, location = ${data.location},
      start_date = ${data.startDate}, end_date = ${data.endDate}, current = ${data.current},
      description = ${data.description}, achievements = ${data.achievements},
      technologies = ${data.technologies}, links = ${JSON.stringify(data.links)}, enabled = ${data.enabled}
    WHERE id = ${id}
    RETURNING *
  `
  return result[0]
}

export async function deleteWorkExperience(id: string) {
  if (!sql) throw new Error('Database not available')
  await sql`DELETE FROM work_experience WHERE id = ${id}`
}

// Projects operations
export async function getProjects() {
  if (!sql) return []
  try {
    return await sql`SELECT * FROM projects ORDER BY featured DESC, start_date DESC`
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function addProject(data: any) {
  if (!sql) throw new Error('Database not available')
  const result = await sql`
    INSERT INTO projects (
      title, description, long_description, technologies, image_url, video_url,
      github_url, live_url, category, featured, start_date, end_date, enabled
    ) VALUES (
      ${data.title}, ${data.description}, ${data.longDescription}, ${data.technologies},
      ${data.imageUrl}, ${data.videoUrl}, ${data.githubUrl}, ${data.liveUrl},
      ${data.category}, ${data.featured}, ${data.startDate}, ${data.endDate}, ${data.enabled}
    )
    RETURNING *
  `
  return result[0]
}

export async function updateProject(id: string, data: any) {
  if (!sql) throw new Error('Database not available')
  const result = await sql`
    UPDATE projects 
    SET 
      title = ${data.title}, description = ${data.description}, long_description = ${data.longDescription},
      technologies = ${data.technologies}, image_url = ${data.imageUrl}, video_url = ${data.videoUrl},
      github_url = ${data.githubUrl}, live_url = ${data.liveUrl}, category = ${data.category},
      featured = ${data.featured}, start_date = ${data.startDate}, end_date = ${data.endDate}, enabled = ${data.enabled}
    WHERE id = ${id}
    RETURNING *
  `
  return result[0]
}

export async function deleteProject(id: string) {
  if (!sql) throw new Error('Database not available')
  await sql`DELETE FROM projects WHERE id = ${id}`
}

// Education operations
export async function getEducation() {
  if (!sql) return []
  try {
    return await sql`SELECT * FROM education ORDER BY start_date DESC`
  } catch (error) {
    console.error('Error fetching education:', error)
    return []
  }
}

export async function addEducation(data: any) {
  if (!sql) throw new Error('Database not available')
  const result = await sql`
    INSERT INTO education (
      degree, institution, location, start_date, end_date, description, achievements, enabled
    ) VALUES (
      ${data.degree}, ${data.institution}, ${data.location}, ${data.startDate},
      ${data.endDate}, ${data.description}, ${data.achievements}, ${data.enabled}
    )
    RETURNING *
  `
  return result[0]
}

export async function updateEducation(id: string, data: any) {
  if (!sql) throw new Error('Database not available')
  const result = await sql`
    UPDATE education 
    SET 
      degree = ${data.degree}, institution = ${data.institution}, location = ${data.location},
      start_date = ${data.startDate}, end_date = ${data.endDate}, description = ${data.description},
      achievements = ${data.achievements}, enabled = ${data.enabled}
    WHERE id = ${id}
    RETURNING *
  `
  return result[0]
}

export async function deleteEducation(id: string) {
  if (!sql) throw new Error('Database not available')
  await sql`DELETE FROM education WHERE id = ${id}`
}

// Certifications operations
export async function getCertifications() {
  if (!sql) return []
  try {
    return await sql`SELECT * FROM certifications ORDER BY date DESC`
  } catch (error) {
    console.error('Error fetching certifications:', error)
    return []
  }
}

export async function addCertification(data: any) {
  if (!sql) throw new Error('Database not available')
  const result = await sql`
    INSERT INTO certifications (name, issuer, date, url, credential_id, enabled)
    VALUES (${data.name}, ${data.issuer}, ${data.date}, ${data.url}, ${data.credentialId}, ${data.enabled})
    RETURNING *
  `
  return result[0]
}

export async function updateCertification(id: string, data: any) {
  if (!sql) throw new Error('Database not available')
  const result = await sql`
    UPDATE certifications 
    SET name = ${data.name}, issuer = ${data.issuer}, date = ${data.date},
        url = ${data.url}, credential_id = ${data.credentialId}, enabled = ${data.enabled}
    WHERE id = ${id}
    RETURNING *
  `
  return result[0]
}

export async function deleteCertification(id: string) {
  if (!sql) throw new Error('Database not available')
  await sql`DELETE FROM certifications WHERE id = ${id}`
}

// Testimonials operations
export async function getTestimonials() {
  if (!sql) return []
  try {
    return await sql`SELECT * FROM testimonials ORDER BY created_at DESC`
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

export async function addTestimonial(data: any) {
  if (!sql) throw new Error('Database not available')
  const result = await sql`
    INSERT INTO testimonials (name, role, company, content, image_url, rating, enabled)
    VALUES (${data.name}, ${data.role}, ${data.company}, ${data.content}, ${data.imageUrl}, ${data.rating}, ${data.enabled})
    RETURNING *
  `
  return result[0]
}

export async function updateTestimonial(id: string, data: any) {
  if (!sql) throw new Error('Database not available')
  const result = await sql`
    UPDATE testimonials 
    SET name = ${data.name}, role = ${data.role}, company = ${data.company},
        content = ${data.content}, image_url = ${data.imageUrl}, rating = ${data.rating}, enabled = ${data.enabled}
    WHERE id = ${id}
    RETURNING *
  `
  return result[0]
}

export async function deleteTestimonial(id: string) {
  if (!sql) throw new Error('Database not available')
  await sql`DELETE FROM testimonials WHERE id = ${id}`
}

// Services operations
export async function getServices() {
  if (!sql) return []
  try {
    return await sql`SELECT * FROM services ORDER BY id`
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

export async function addService(data: any) {
  if (!sql) throw new Error('Database not available')
  const result = await sql`
    INSERT INTO services (title, description, icon, features, enabled)
    VALUES (${data.title}, ${data.description}, ${data.icon}, ${data.features}, ${data.enabled})
    RETURNING *
  `
  return result[0]
}

export async function updateService(id: string, data: any) {
  if (!sql) throw new Error('Database not available')
  const result = await sql`
    UPDATE services 
    SET title = ${data.title}, description = ${data.description}, icon = ${data.icon},
        features = ${data.features}, enabled = ${data.enabled}
    WHERE id = ${id}
    RETURNING *
  `
  return result[0]
}

export async function deleteService(id: string) {
  if (!sql) throw new Error('Database not available')
  await sql`DELETE FROM services WHERE id = ${id}`
}

// Section settings operations
export async function getSectionSettings() {
  if (!sql) return null
  try {
    const result = await sql`SELECT * FROM section_settings ORDER BY id DESC LIMIT 1`
    return result[0] || null
  } catch (error) {
    console.error('Error fetching section settings:', error)
    return null
  }
}

export async function updateSectionSettings(data: any) {
  if (!sql) throw new Error('Database not available')
  
  const existing = await getSectionSettings()
  
  if (existing) {
    await sql`
      UPDATE section_settings SET 
        hero = ${data.hero}, about = ${data.about}, skills = ${data.skills},
        experience = ${data.experience}, projects = ${data.projects},
        personal_projects = ${data.personalProjects}, education = ${data.education},
        certifications = ${data.certifications}, services = ${data.services},
        testimonials = ${data.testimonials}, achievements = ${data.achievements},
        languages = ${data.languages}, interests = ${data.interests},
        publications = ${data.publications}, awards = ${data.awards},
        volunteer = ${data.volunteer}, contact = ${data.contact}, timeline = ${data.timeline}
      WHERE id = ${existing.id}
    `
  } else {
    await sql`
      INSERT INTO section_settings (
        hero, about, skills, experience, projects, personal_projects, education,
        certifications, services, testimonials, achievements, languages, interests,
        publications, awards, volunteer, contact, timeline
      ) VALUES (
        ${data.hero}, ${data.about}, ${data.skills}, ${data.experience}, ${data.projects},
        ${data.personalProjects}, ${data.education}, ${data.certifications},
        ${data.services}, ${data.testimonials}, ${data.achievements}, ${data.languages},
        ${data.interests}, ${data.publications}, ${data.awards}, ${data.volunteer},
        ${data.contact}, ${data.timeline}
      )
    `
  }
  
  return await getSectionSettings()
}

// Admin operations
export async function getAdminSettings() {
  if (!sql) return null
  try {
    const result = await sql`SELECT * FROM admin_settings ORDER BY id DESC LIMIT 1`
    return result[0] || null
  } catch (error) {
    console.error('Error fetching admin settings:', error)
    return null
  }
}

export async function updateAdminPassword(password: string) {
  if (!sql) throw new Error('Database not available')
  
  const existing = await getAdminSettings()
  
  if (existing) {
    await sql`UPDATE admin_settings SET admin_password = ${password} WHERE id = ${existing.id}`
  } else {
    await sql`INSERT INTO admin_settings (admin_password) VALUES (${password})`
  }
  
  return await getAdminSettings()
}

export async function checkAdminPassword(password: string) {
  const settings = await getAdminSettings()
  return settings?.admin_password === password
}
