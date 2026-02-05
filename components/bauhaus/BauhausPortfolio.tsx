'use client'

import { usePortfolioStore } from '@/lib/store'
import { Icon } from '@/components/icons'
import { formatDate, getYouTubeVideoId } from '@/lib/utils'
import Link from 'next/link'
import { Download, Mail, Phone, MapPin, Github, ExternalLink, Calendar, Star, Award, Code, Briefcase, GraduationCap } from 'lucide-react'

export default function BauhausPortfolio() {
  const { profile, socialLinks, skills, workExperience, projects, education, certifications, services, testimonials, sectionSettings } = usePortfolioStore()

  const enabledSocialLinks = socialLinks.filter(link => link.enabled)
  const enabledSkills = skills.filter(skill => skill.enabled)
  const enabledExperience = workExperience.filter(exp => exp.enabled)
  const enabledProjects = projects.filter(p => p.enabled)
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
    <div className="min-h-screen bg-white">
      {/* Bauhaus Header - Compact */}
      <header className="bg-black text-white sticky top-0 z-50">
        <div className="w-full px-4 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#E53935]" />
              <div className="w-3 h-3 bg-[#1E88E5]" />
              <div className="w-3 h-3 bg-[#FDD835]" />
            </div>
            <h1 className="text-xl font-black tracking-wider">{profile.name.toUpperCase()}</h1>
            {profile.availableForHire && (
              <span className="px-2 py-0.5 bg-[#FDD835] text-black text-xs font-bold">AVAILABLE</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-4 text-sm">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 hover:text-[#FDD835] transition-colors">
                <Mail size={14} /> {profile.email}
              </a>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} /> {profile.location}
              </span>
            </div>
            <div className="flex items-center gap-1">
              {enabledSocialLinks.slice(0, 3).map((link, i) => (
                <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"
                   className={`p-2 hover:opacity-80 transition-all ${i === 0 ? 'bg-[#E53935]' : i === 1 ? 'bg-[#1E88E5]' : 'bg-[#FDD835] text-black'}`}>
                  <Icon name={link.icon} size={16} />
                </a>
              ))}
            </div>
            <button onClick={handleDownloadResume}
              className="flex items-center gap-2 bg-[#E53935] text-white px-4 py-2 text-sm font-bold hover:bg-[#FDD835] hover:text-black transition-all">
              <Download size={16} /> CV
            </button>
            <Link href="/admin" className="p-2 hover:text-[#FDD835] transition-colors">
              <Icon name="settings" size={16} />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content - Full Width Two Column */}
      <div className="w-full px-4 lg:px-8 py-6">
        <div className="grid lg:grid-cols-[300px,1fr] gap-6">
          
          {/* Left Sidebar */}
          <aside className="space-y-4">
            {/* Profile Card - Bauhaus Style */}
            <div className="bg-black text-white p-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-[#E53935]" />
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#1E88E5]" />
              <div className="relative z-10">
                <div className="w-24 h-24 mx-auto bg-[#FDD835] flex items-center justify-center text-3xl font-black text-black mb-4">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-black">{profile.name.toUpperCase()}</h2>
                  <p className="text-[#FDD835] font-bold text-sm">{profile.title}</p>
                  <p className="text-gray-400 text-xs">{profile.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Quick Stats - Bauhaus Grid */}
            <div className="grid grid-cols-3 gap-1">
              <div className="bg-[#E53935] text-white p-3 text-center">
                <div className="text-2xl font-black">{profile.yearsOfExperience}+</div>
                <div className="text-[10px] font-bold">YEARS</div>
              </div>
              <div className="bg-[#1E88E5] text-white p-3 text-center">
                <div className="text-2xl font-black">{profile.projectsCompleted}+</div>
                <div className="text-[10px] font-bold">PROJECTS</div>
              </div>
              <div className="bg-[#FDD835] text-black p-3 text-center">
                <div className="text-2xl font-black">{profile.happyClients}+</div>
                <div className="text-[10px] font-bold">CLIENTS</div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-100 p-4 space-y-2">
              <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-sm hover:text-[#E53935] transition-colors">
                <div className="w-8 h-8 bg-[#E53935] text-white flex items-center justify-center"><Mail size={14} /></div>
                <span className="truncate">{profile.email}</span>
              </a>
              {profile.phone && (
                <a href={`tel:${profile.phone}`} className="flex items-center gap-3 text-sm hover:text-[#1E88E5] transition-colors">
                  <div className="w-8 h-8 bg-[#1E88E5] text-white flex items-center justify-center"><Phone size={14} /></div>
                  <span>{profile.phone}</span>
                </a>
              )}
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-[#FDD835] text-black flex items-center justify-center"><MapPin size={14} /></div>
                <span>{profile.location}</span>
              </div>
            </div>

            {/* Skills - Bauhaus Tags */}
            {sectionSettings.skills && (
              <div className="bg-white border-4 border-black p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-4 h-4 bg-[#1E88E5]" />
                  <h3 className="font-black text-sm">SKILLS</h3>
                </div>
                <div className="space-y-3">
                  {Object.entries(skillsByCategory).slice(0, 4).map(([category, categorySkills], i) => (
                    <div key={category}>
                      <div className="text-[10px] font-bold text-gray-500 uppercase mb-1">{category}</div>
                      <div className="flex flex-wrap gap-1">
                        {categorySkills.map((skill, j) => (
                          <span key={skill.id} 
                            className={`px-2 py-0.5 text-xs font-bold ${
                              j % 4 === 0 ? 'bg-[#E53935] text-white' :
                              j % 4 === 1 ? 'bg-[#1E88E5] text-white' :
                              j % 4 === 2 ? 'bg-[#FDD835] text-black' :
                              'bg-black text-white'
                            }`}>
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
              <div className="bg-white border-4 border-black p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-4 h-4 bg-[#FDD835]" />
                  <h3 className="font-black text-sm">EDUCATION</h3>
                </div>
                <div className="space-y-3">
                  {enabledEducation.map((edu, i) => (
                    <div key={edu.id} className={`pl-3 border-l-4 ${i % 3 === 0 ? 'border-[#E53935]' : i % 3 === 1 ? 'border-[#1E88E5]' : 'border-[#FDD835]'}`}>
                      <h4 className="font-bold text-sm">{edu.degree}</h4>
                      <p className="text-xs text-gray-600">{edu.institution}</p>
                      <p className="text-[10px] text-gray-400">{edu.startDate} - {edu.endDate}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {sectionSettings.certifications && enabledCerts.length > 0 && (
              <div className="bg-white border-4 border-black p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-4 h-4 bg-[#E53935]" />
                  <h3 className="font-black text-sm">CERTIFICATIONS</h3>
                </div>
                <div className="space-y-2">
                  {enabledCerts.map(cert => (
                    <div key={cert.id} className="flex items-start gap-2">
                      <Award size={14} className="text-[#FDD835] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-bold">{cert.name}</p>
                        <p className="text-[10px] text-gray-500">{cert.issuer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>

          {/* Right Content */}
          <main className="space-y-6">
            {/* Professional Summary */}
            {sectionSettings.about && (
              <section className="bg-black text-white p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 flex">
                  <div className="flex-1 bg-[#E53935]" />
                  <div className="flex-1 bg-[#1E88E5]" />
                  <div className="flex-1 bg-[#FDD835]" />
                </div>
                <div className="pt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-4 h-4 bg-[#FDD835]" />
                    <h3 className="font-black">PROFESSIONAL SUMMARY</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{profile.bio}</p>
                </div>
              </section>
            )}

            {/* Work Experience */}
            {sectionSettings.experience && enabledExperience.length > 0 && (
              <section className="bg-white border-4 border-black p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 bg-[#E53935]" />
                  <h3 className="font-black text-lg">WORK EXPERIENCE</h3>
                </div>
                <div className="space-y-6">
                  {enabledExperience.slice(0, 4).map((exp, i) => (
                    <div key={exp.id} className={`pl-4 border-l-4 ${i % 3 === 0 ? 'border-[#E53935]' : i % 3 === 1 ? 'border-[#1E88E5]' : 'border-[#FDD835]'}`}>
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className="font-black">{exp.title}</h4>
                          <p className={`font-bold text-sm ${i % 3 === 0 ? 'text-[#E53935]' : i % 3 === 1 ? 'text-[#1E88E5]' : 'text-[#FDD835]'}`}>{exp.company}</p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500 bg-gray-100 px-2 py-1">
                          <Calendar size={12} />
                          {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate || '')}
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">{exp.description}</p>
                      {exp.achievements.length > 0 && (
                        <ul className="space-y-1 mb-2">
                          {exp.achievements.slice(0, 3).map((achievement, j) => (
                            <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                              <span className={`mt-1.5 w-2 h-2 flex-shrink-0 ${j % 3 === 0 ? 'bg-[#E53935]' : j % 3 === 1 ? 'bg-[#1E88E5]' : 'bg-[#FDD835]'}`} />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      )}
                      {exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {exp.technologies.map((tech, j) => (
                            <span key={j} className="px-2 py-0.5 bg-gray-200 text-xs font-bold">{tech}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects - Bauhaus Grid */}
            {sectionSettings.projects && enabledProjects.length > 0 && (
              <section className="bg-white border-4 border-black p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 bg-[#1E88E5]" />
                  <h3 className="font-black text-lg">KEY PROJECTS</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {enabledProjects.slice(0, 4).map((project, i) => {
                    const videoId = project.videoUrl ? getYouTubeVideoId(project.videoUrl) : null
                    return (
                      <div key={project.id} className="border-2 border-black overflow-hidden">
                        {videoId ? (
                          <div className="aspect-video">
                            <iframe
                              src={`https://www.youtube.com/embed/${videoId}`}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                        ) : (
                          <div className={`aspect-video flex items-center justify-center text-4xl font-black text-white ${
                            i % 3 === 0 ? 'bg-[#E53935]' : i % 3 === 1 ? 'bg-[#1E88E5]' : 'bg-[#FDD835] text-black'
                          }`}>
                            {project.title.substring(0, 2).toUpperCase()}
                          </div>
                        )}
                        <div className="p-4 bg-gray-50">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="font-black">{project.title}</h4>
                            {project.featured && <Star size={14} className="text-[#FDD835] fill-[#FDD835]" />}
                          </div>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {project.technologies.slice(0, 4).map((tech, j) => (
                              <span key={j} className={`px-1.5 py-0.5 text-[10px] font-bold ${
                                j % 3 === 0 ? 'bg-[#E53935] text-white' : j % 3 === 1 ? 'bg-[#1E88E5] text-white' : 'bg-[#FDD835] text-black'
                              }`}>{tech}</span>
                            ))}
                          </div>
                          <div className="flex items-center gap-2">
                            {project.githubUrl && (
                              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                                 className="flex items-center gap-1 text-xs text-gray-600 hover:text-black transition-colors">
                                <Github size={14} /> Code
                              </a>
                            )}
                            {project.liveUrl && (
                              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                                 className="flex items-center gap-1 text-xs text-gray-600 hover:text-black transition-colors">
                                <ExternalLink size={14} /> Live
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

            {/* Services - Bauhaus Blocks */}
            {sectionSettings.services && enabledServices.length > 0 && (
              <section className="bg-white border-4 border-black p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 bg-[#FDD835]" />
                  <h3 className="font-black text-lg">SERVICES</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-3">
                  {enabledServices.map((service, i) => (
                    <div key={service.id} className={`p-4 ${
                      i % 3 === 0 ? 'bg-[#E53935] text-white' :
                      i % 3 === 1 ? 'bg-[#1E88E5] text-white' :
                      'bg-[#FDD835] text-black'
                    }`}>
                      <Icon name={service.icon} size={28} className="mb-2" />
                      <h4 className="font-black mb-1">{service.title}</h4>
                      <p className="text-sm opacity-90 line-clamp-2">{service.description}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Testimonials */}
            {sectionSettings.testimonials && enabledTestimonials.length > 0 && (
              <section className="bg-black text-white p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-6 h-6 bg-[#FDD835]" />
                  <h3 className="font-black text-lg">TESTIMONIALS</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {enabledTestimonials.slice(0, 2).map((testimonial, i) => (
                    <div key={testimonial.id} className={`p-4 ${i === 0 ? 'bg-[#E53935]' : 'bg-[#1E88E5]'}`}>
                      <div className="flex gap-0.5 mb-2">
                        {[...Array(testimonial.rating)].map((_, j) => (
                          <Star key={j} size={12} className="text-[#FDD835] fill-[#FDD835]" />
                        ))}
                      </div>
                      <p className="text-sm italic mb-3">"{testimonial.content}"</p>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white text-black flex items-center justify-center text-xs font-black">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p className="text-sm font-bold">{testimonial.name}</p>
                          <p className="text-[10px] opacity-80">{testimonial.role}, {testimonial.company}</p>
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

      {/* Bauhaus Footer */}
      <footer className="bg-black text-white py-6 mt-8">
        <div className="w-full px-4 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#E53935]" />
            <div className="w-3 h-3 bg-[#1E88E5]" />
            <div className="w-3 h-3 bg-[#FDD835]" />
            <span className="font-black ml-2">{profile.name.toUpperCase()}</span>
          </div>
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} All Rights Reserved</p>
          <div className="flex gap-1">
            {enabledSocialLinks.map((link, i) => (
              <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer"
                 className={`p-2 hover:opacity-80 transition-all ${i % 3 === 0 ? 'bg-[#E53935]' : i % 3 === 1 ? 'bg-[#1E88E5]' : 'bg-[#FDD835] text-black'}`}>
                <Icon name={link.icon} size={16} />
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
