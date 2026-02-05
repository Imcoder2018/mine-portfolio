import { 
  updateProfile, 
  updateTheme,
  addSocialLink, 
  updateSocialLink, 
  deleteSocialLink,
  addSkill,
  updateSkill,
  deleteSkill,
  addWorkExperience,
  updateWorkExperience,
  deleteWorkExperience,
  addProject,
  updateProject,
  deleteProject,
  addEducation,
  updateEducation,
  deleteEducation,
  addCertification,
  updateCertification,
  deleteCertification,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  addService,
  updateService,
  deleteService,
  updateSectionSettings,
  updateAdminPassword,
  checkAdminPassword
} from '@/lib/prisma-db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, data, id } = body

    // Check admin authentication for write operations (except theme switching)
    if (action !== 'login' && action !== 'checkAuth' && action !== 'updateTheme') {
      const isAuthenticated = await checkAdminPassword(data.adminPassword || '')
      if (!isAuthenticated) {
        return Response.json(
          { error: 'Unauthorized' },
          { status: 401 }
        )
      }
    }

    let result

    switch (action) {
      // Theme (public operation)
      case 'updateTheme':
        result = await updateTheme(data.theme)
        break

      // Profile
      case 'updateProfile':
        result = await updateProfile(data)
        break

      // Social Links
      case 'addSocialLink':
        result = await addSocialLink(data)
        break
      case 'updateSocialLink':
        result = await updateSocialLink(id, data)
        break
      case 'deleteSocialLink':
        await deleteSocialLink(id)
        result = { success: true }
        break

      // Skills
      case 'addSkill':
        result = await addSkill(data)
        break
      case 'updateSkill':
        result = await updateSkill(id, data)
        break
      case 'deleteSkill':
        await deleteSkill(id)
        result = { success: true }
        break

      // Work Experience
      case 'addWorkExperience':
        result = await addWorkExperience(data)
        break
      case 'updateWorkExperience':
        result = await updateWorkExperience(id, data)
        break
      case 'deleteWorkExperience':
        await deleteWorkExperience(id)
        result = { success: true }
        break

      // Projects
      case 'addProject':
        result = await addProject(data)
        break
      case 'updateProject':
        result = await updateProject(id, data)
        break
      case 'deleteProject':
        await deleteProject(id)
        result = { success: true }
        break

      // Education
      case 'addEducation':
        result = await addEducation(data)
        break
      case 'updateEducation':
        result = await updateEducation(id, data)
        break
      case 'deleteEducation':
        await deleteEducation(id)
        result = { success: true }
        break

      // Certifications
      case 'addCertification':
        result = await addCertification(data)
        break
      case 'updateCertification':
        result = await updateCertification(id, data)
        break
      case 'deleteCertification':
        await deleteCertification(id)
        result = { success: true }
        break

      // Testimonials
      case 'addTestimonial':
        result = await addTestimonial(data)
        break
      case 'updateTestimonial':
        result = await updateTestimonial(id, data)
        break
      case 'deleteTestimonial':
        await deleteTestimonial(id)
        result = { success: true }
        break

      // Services
      case 'addService':
        result = await addService(data)
        break
      case 'updateService':
        result = await updateService(id, data)
        break
      case 'deleteService':
        await deleteService(id)
        result = { success: true }
        break

      // Section Settings
      case 'updateSectionSettings':
        result = await updateSectionSettings(data)
        break

      // Admin
      case 'updateAdminPassword':
        await updateAdminPassword(data.newPassword)
        result = { success: true }
        break
      case 'login':
        const isValid = await checkAdminPassword(data.password)
        result = { success: isValid }
        break
      case 'checkAuth':
        const authValid = await checkAdminPassword(data.password)
        result = { authenticated: authValid }
        break

      default:
        return Response.json(
          { error: 'Invalid action' },
          { status: 400 }
        )
    }

    return Response.json(result)
  } catch (error) {
    console.error('Error in portfolio API:', error)
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
