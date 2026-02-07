'use client'

import { usePortfolioStore } from '@/lib/store-prisma'
import { Icon } from '@/components/icons'
import { formatDate, getYouTubeVideoId } from '@/lib/utils'
import Link from 'next/link'
import { Download, Mail, Phone, MapPin, Linkedin, Github, ExternalLink, Star, Calendar, Building, Award, Code, Briefcase, GraduationCap, ChevronDown } from 'lucide-react'

export default function ProfessionalPortfolio() {
  const { profile, socialLinks, skills, workExperience, projects, education, certifications, services, testimonials, sectionSettings, isLoading } = usePortfolioStore()

  if (isLoading || !profile || !sectionSettings) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading Portfolio...</p>
        </div>
      </div>
    )
  }

  const enabledSocialLinks = socialLinks.filter(link => link.enabled)
  const enabledSkills = skills.filter(skill => skill.enabled)
  const enabledExperience = workExperience.filter(exp => exp.enabled)
  const enabledProjects = projects.filter(p => p.enabled)
  const featuredProjects = enabledProjects.filter(p => p.featured)
  const enabledEducation = education.filter(edu => edu.enabled)
  const enabledCerts = certifications.filter(cert => cert.enabled)
  const enabledServices = services.filter(s => s.enabled)
  const enabledTestimonials = testimonials.filter(t => t.enabled)

  const skillsByCategory = enabledSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, typeof enabledSkills>)

  const handleDownloadResume = () => {
    window.open('/resume', '_blank')
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Compact Header */}
      <header className="bg-slate-800/90 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="w-full px-4 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white">{profile.name}</h1>
            {profile.availableForHire && (
              <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs font-medium rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                Available
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4 text-sm text-gray-400">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail size={14} /> {profile.email}
              </a>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} /> {profile.location}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {enabledSocialLinks.slice(0, 3).map(link => (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" 
                   className="p-2 bg-slate-700 hover:bg-primary rounded-lg transition-all">
                  <Icon name={link.icon} size={16} className="text-white" />
                </a>
              ))}
            </div>
            <button onClick={handleDownloadResume}
              className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-primary/25">
              <Download size={16} /> Resume
            </button>
            <Link href="/admin" className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-all">
              <Icon name="settings" size={16} className="text-gray-400" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content - Two Column Layout */}
      <div className="w-full px-4 lg:px-8 py-6">
        <div className="grid lg:grid-cols-[320px,1fr] gap-6">
          
          {/* Left Sidebar - Key Info */}
          <aside className="space-y-4">
            {/* Profile Card */}
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
              <div className="text-center mb-4">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-3xl font-bold text-white mb-3">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h2 className="text-xl font-bold text-white">{profile.name}</h2>
                <p className="text-primary font-medium">{profile.title}</p>
                <p className="text-gray-400 text-sm">{profile.subtitle}</p>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2 py-4 border-t border-b border-slate-700">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{profile.yearsOfExperience}+</div>
                  <div className="text-xs text-gray-400">Years Exp</div>
                </div>
                <div className="text-center border-x border-slate-700">
                  <div className="text-2xl font-bold text-primary">{profile.projectsCompleted}+</div>
                  <div className="text-xs text-gray-400">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{profile.happyClients}+</div>
                  <div className="text-xs text-gray-400">Clients</div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="pt-4 space-y-2 text-sm">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-gray-200 hover:text-primary transition-colors group">
                  <Mail size={16} className="text-primary" /> 
                  <span className="underline decoration-primary/50 underline-offset-2 group-hover:decoration-primary">{profile.email}</span>
                </a>
                {profile.phone && (
                  <a href={`tel:${profile.phone}`} className="flex items-center gap-3 text-gray-200 hover:text-primary transition-colors group">
                    <Phone size={16} className="text-primary" /> 
                    <span className="underline decoration-primary/50 underline-offset-2 group-hover:decoration-primary">{profile.phone}</span>
                  </a>
                )}
                <div className="flex items-center gap-3 text-gray-200">
                  <MapPin size={16} className="text-primary" /> <span className="font-medium">{profile.location}</span>
                </div>
              </div>
            </div>

            {/* Skills Summary */}
            {sectionSettings.skills && (
              <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Code size={18} className="text-primary" /> Technical Skills
                </h3>
                <div className="space-y-4">
                  {Object.entries(skillsByCategory).slice(0, 5).map(([category, categorySkills]) => (
                    <div key={category}>
                      <div className="text-xs font-medium text-gray-400 uppercase mb-2">{category}</div>
                      <div className="flex flex-wrap gap-1.5">
                        {categorySkills.map(skill => (
                          <span key={skill.id} className="px-2 py-1 bg-slate-700 text-gray-300 text-xs rounded-md">
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {sectionSettings.education && enabledEducation.length > 0 && (
              <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <GraduationCap size={18} className="text-primary" /> Education
                </h3>
                <div className="space-y-3">
                  {enabledEducation.map(edu => (
                    <div key={edu.id} className="border-l-2 border-primary pl-3">
                      <h4 className="text-white font-medium text-sm">{edu.degree}</h4>
                      <p className="text-primary text-xs">{edu.institution}</p>
                      <p className="text-gray-500 text-xs">{edu.startDate} - {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {sectionSettings.certifications && enabledCerts.length > 0 && (
              <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Award size={18} className="text-primary" /> Certifications
                </h3>
                <div className="space-y-2">
                  {enabledCerts.map(cert => (
                    <div key={cert.id} className="flex items-start gap-2">
                      <Award size={14} className="text-yellow-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-white text-sm font-medium">{cert.name}</p>
                        <p className="text-gray-500 text-xs">{cert.issuer} • {cert.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Right Content - Main Details */}
          <main className="space-y-6">
            {/* Professional Summary */}
            {sectionSettings.about && (
              <section className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <Briefcase size={18} className="text-primary" /> Professional Summary
                </h3>
                <p className="text-gray-300 leading-relaxed">{profile.bio}</p>
              </section>
            )}

            {/* Work Experience */}
            {sectionSettings.experience && enabledExperience.length > 0 && (
              <section className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Building size={18} className="text-primary" /> Work Experience
                </h3>
                <div className="space-y-5">
                  {enabledExperience.slice(0, 4).map((exp, index) => (
                    <div key={exp.id} className={`${index > 0 ? 'pt-5 border-t border-slate-700' : ''}`}>
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className="text-white font-semibold">{exp.title}</h4>
                          <p className="text-primary">{exp.company}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar size={14} />
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate || '')}
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">{exp.description}</p>
                      {exp.achievements.length > 0 && (
                        <ul className="space-y-1">
                          {exp.achievements.slice(0, 3).map((achievement, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                              <span className="text-primary mt-1">•</span>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      )}
                      {exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {exp.technologies.map((tech, i) => (
                            <span key={i} className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Featured Projects - Grid */}
            {sectionSettings.projects && enabledProjects.length > 0 && (
              <section className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Code size={18} className="text-primary" /> Key Projects
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {enabledProjects.map(project => {
                    const videoId = project.videoUrl ? getYouTubeVideoId(project.videoUrl) : null
                    return (
                      <div key={project.id} className="bg-slate-700/50 rounded-lg overflow-hidden border border-slate-600">
                        {videoId ? (
                          <div className="aspect-video">
                            <iframe
                              src={`https://www.youtube.com/embed/${videoId}`}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        ) : project.imageUrl ? (
                          <div className="aspect-video bg-slate-600">
                            <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="aspect-video bg-gradient-to-br from-primary/30 to-secondary/30 flex flex-col items-center justify-center relative overflow-hidden">
                            <div className="absolute inset-0 opacity-10">
                              <div className="absolute top-4 right-4 w-20 h-20 border-2 border-primary rounded-full" />
                              <div className="absolute bottom-4 left-4 w-16 h-16 border-2 border-secondary" />
                            </div>
                            <Code size={36} className="text-primary mb-2" />
                            <span className="text-white/80 text-sm font-medium text-center px-4">
                              {project.title.length > 25 ? project.title.substring(0, 25) + '...' : project.title}
                            </span>
                          </div>
                        )}
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="text-white font-semibold">{project.title}</h4>
                            {project.featured && (
                              <span className="flex items-center gap-1 px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-[10px] font-medium rounded-full">
                                <Star size={10} className="fill-current" /> Featured
                              </span>
                            )}
                          </div>
                          <p className="text-gray-300 text-sm mb-3 line-clamp-2">{project.description}</p>
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            {project.technologies.slice(0, 4).map((tech, i) => (
                              <span key={i} className="px-2 py-0.5 bg-primary/20 text-primary text-xs font-medium rounded-md border border-primary/30">
                                {tech}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-2 pt-3 border-t border-slate-600">
                            {project.githubUrl && (
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                                 className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-600 text-white text-xs font-medium rounded-md hover:bg-primary transition-all">
                                <Github size={14} /> View Code
                              </a>
                            )}
                            {project.liveUrl && (
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                                 className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-primary to-secondary text-white text-xs font-medium rounded-md hover:opacity-90 transition-all">
                                <ExternalLink size={14} /> Live Demo
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
            )}

            {/* Services - Compact Grid */}
            {sectionSettings.services && enabledServices.length > 0 && (
              <section className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Briefcase size={18} className="text-primary" /> Services
                </h3>
                <div className="grid md:grid-cols-3 gap-3">
                  {enabledServices.map(service => (
                    <div key={service.id} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                      <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center mb-3">
                        <Icon name={service.icon} size={20} className="text-primary" />
                      </div>
                      <h4 className="text-white font-semibold mb-1">{service.title}</h4>
                      <p className="text-gray-300 text-sm line-clamp-2">{service.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Testimonials */}
            {sectionSettings.testimonials && enabledTestimonials.length > 0 && (
              <section className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-4">Client Testimonials</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {enabledTestimonials.slice(0, 2).map(testimonial => (
                    <div key={testimonial.id} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600">
                      <div className="flex gap-0.5 mb-2">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={14} className="text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <p className="text-gray-200 text-sm italic mb-3 leading-relaxed">"{testimonial.content}"</p>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-white text-sm font-medium">{testimonial.name}</p>
                          <p className="text-gray-500 text-xs">{testimonial.role}, {testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </main>
        </div>
      </div>

      {/* Compact Footer */}
      <footer className="bg-slate-800 border-t border-slate-700 py-6 mt-8">
        <div className="w-full px-4 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
          <div className="flex items-center gap-3">
            {enabledSocialLinks.map(link => (
              <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"
                 className="p-2 bg-slate-700 hover:bg-primary rounded-lg transition-all">
                <Icon name={link.icon} size={16} className="text-white" />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
