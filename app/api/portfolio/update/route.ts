import { auth } from '@clerk/nextjs/server'
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
  reorderProjects,
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
} from '@/lib/prisma-db'

export async function POST(request: Request) {
  try {
    // Require Clerk authentication for all write operations
    const { userId } = await auth()
    if (!userId) {
      return Response.json(
        { error: 'Unauthorized - please sign in' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { action, data, id } = body

    let result

    switch (action) {
      // Theme
      case 'updateTheme':
        result = await updateTheme(userId, data.theme)
        break

      // Profile
      case 'updateProfile':
        result = await updateProfile(userId, data)
        break

      // Social Links
      case 'addSocialLink':
        result = await addSocialLink(userId, data)
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
        result = await addSkill(userId, data)
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
        result = await addWorkExperience(userId, data)
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
        result = await addProject(userId, data)
        break
      case 'updateProject':
        result = await updateProject(id, data)
        break
      case 'deleteProject':
        await deleteProject(id)
        result = { success: true }
        break
      case 'reorderProjects':
        await reorderProjects(userId, data.oldIndex, data.newIndex)
        result = { success: true }
        break

      // Education
      case 'addEducation':
        result = await addEducation(userId, data)
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
        result = await addCertification(userId, data)
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
        result = await addTestimonial(userId, data)
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
        result = await addService(userId, data)
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
        result = await updateSectionSettings(userId, data)
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
