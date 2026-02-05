'use client'

import { useEffect, useRef, useState } from 'react'
import { usePortfolioStore } from '@/lib/store'
import { formatDate } from '@/lib/utils'
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Download, Printer } from 'lucide-react'
import { Icon } from '@/components/icons'

export default function ResumePage() {
  const resumeRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const { profile, socialLinks, skills, workExperience, projects, education, certifications, sectionSettings } = usePortfolioStore()

  const enabledSocialLinks = socialLinks.filter(link => link.enabled)
  const enabledSkills = skills.filter(skill => skill.enabled)
  const enabledExperience = workExperience.filter(exp => exp.enabled)
  const enabledProjects = projects.filter(p => p.enabled && p.featured)
  const enabledEducation = education.filter(edu => edu.enabled)
  const enabledCerts = certifications.filter(cert => cert.enabled)

  const skillsByCategory = enabledSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, typeof enabledSkills>)

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = async () => {
    setIsGenerating(true)
    try {
      const html2canvas = (await import('html2canvas')).default
      const jsPDF = (await import('jspdf')).default

      if (resumeRef.current) {
        const canvas = await html2canvas(resumeRef.current, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff'
        })

        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4'
        })

        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        const imgWidth = canvas.width
        const imgHeight = canvas.height
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
        const imgX = (pdfWidth - imgWidth * ratio) / 2
        const imgY = 0

        pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)
        pdf.save(`${profile.name.replace(/\s+/g, '_')}_Resume.pdf`)
      }
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try printing instead.')
    }
    setIsGenerating(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Action Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 print:hidden">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a href="/" className="text-gray-600 hover:text-gray-900">← Back to Portfolio</a>
            <span className="text-gray-300">|</span>
            <span className="text-gray-700 font-medium">Resume Preview</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <Printer size={18} /> Print
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Download size={18} /> {isGenerating ? 'Generating...' : 'Download PDF'}
            </button>
          </div>
        </div>
      </div>

      {/* Resume Content */}
      <div className="pt-20 pb-10 print:pt-0 print:pb-0">
        <div 
          ref={resumeRef}
          className="max-w-[210mm] mx-auto bg-white shadow-lg print:shadow-none"
          style={{ minHeight: '297mm' }}
        >
          {/* Resume Content - A4 Optimized */}
          <div className="p-8 print:p-6">
            {/* Header */}
            <header className="border-b-2 border-gray-800 pb-4 mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">{profile.name}</h1>
                  <p className="text-lg text-blue-600 font-medium">{profile.title}</p>
                  {profile.subtitle && <p className="text-gray-600">{profile.subtitle}</p>}
                </div>
                {profile.availableForHire && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                    Available for Hire
                  </span>
                )}
              </div>
              
              {/* Contact Info Row */}
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
                <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 hover:text-blue-600">
                  <Mail size={14} /> {profile.email}
                </a>
                {profile.phone && (
                  <a href={`tel:${profile.phone}`} className="flex items-center gap-1.5 hover:text-blue-600">
                    <Phone size={14} /> {profile.phone}
                  </a>
                )}
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} /> {profile.location}
                </span>
                {enabledSocialLinks.slice(0, 3).map(link => (
                  <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" 
                     className="flex items-center gap-1.5 hover:text-blue-600">
                    <Icon name={link.icon} size={14} /> {link.platform}
                  </a>
                ))}
              </div>
            </header>

            {/* Two Column Layout */}
            <div className="grid grid-cols-[1fr,280px] gap-6">
              {/* Left Column - Main Content */}
              <div className="space-y-5">
                {/* Professional Summary */}
                {sectionSettings.about && (
                  <section>
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
                      Professional Summary
                    </h2>
                    <p className="text-sm text-gray-700 leading-relaxed">{profile.bio}</p>
                  </section>
                )}

                {/* Work Experience */}
                {sectionSettings.experience && enabledExperience.length > 0 && (
                  <section>
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
                      Professional Experience
                    </h2>
                    <div className="space-y-4">
                      {enabledExperience.slice(0, 4).map(exp => (
                        <div key={exp.id}>
                          <div className="flex justify-between items-start mb-1">
                            <div>
                              <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                              <p className="text-blue-600 text-sm">{exp.company} • {exp.location}</p>
                            </div>
                            <span className="text-xs text-gray-500 whitespace-nowrap">
                              {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate || '')}
                            </span>
                          </div>
                          {exp.description && (
                            <p className="text-sm text-gray-600 mb-1">{exp.description}</p>
                          )}
                          {exp.achievements.length > 0 && (
                            <ul className="text-sm text-gray-700 space-y-0.5">
                              {exp.achievements.slice(0, 3).map((achievement, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-blue-600 mt-1">•</span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          {exp.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {exp.technologies.slice(0, 6).map((tech, i) => (
                                <span key={i} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
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

                {/* Key Projects */}
                {sectionSettings.projects && enabledProjects.length > 0 && (
                  <section>
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
                      Key Projects
                    </h2>
                    <div className="space-y-3">
                      {enabledProjects.slice(0, 3).map(project => (
                        <div key={project.id}>
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-gray-900">{project.title}</h3>
                            <div className="flex gap-2 text-xs text-gray-500">
                              {project.githubUrl && <span>GitHub</span>}
                              {project.liveUrl && <span>Live Demo</span>}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{project.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(0, 5).map((tech, i) => (
                              <span key={i} className="px-1.5 py-0.5 bg-blue-50 text-blue-700 text-xs rounded">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>

              {/* Right Column - Sidebar */}
              <div className="space-y-5">
                {/* Quick Stats */}
                <section className="bg-gray-50 p-4 rounded-lg">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <div className="text-xl font-bold text-blue-600">{profile.yearsOfExperience}+</div>
                      <div className="text-xs text-gray-500">Years</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-blue-600">{profile.projectsCompleted}+</div>
                      <div className="text-xs text-gray-500">Projects</div>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-blue-600">{profile.happyClients}+</div>
                      <div className="text-xs text-gray-500">Clients</div>
                    </div>
                  </div>
                </section>

                {/* Skills */}
                {sectionSettings.skills && (
                  <section>
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
                      Technical Skills
                    </h2>
                    <div className="space-y-3">
                      {Object.entries(skillsByCategory).slice(0, 5).map(([category, categorySkills]) => (
                        <div key={category}>
                          <h3 className="text-xs font-semibold text-gray-500 uppercase mb-1">{category}</h3>
                          <div className="flex flex-wrap gap-1">
                            {categorySkills.map(skill => (
                              <span key={skill.id} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
                                {skill.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Education */}
                {sectionSettings.education && enabledEducation.length > 0 && (
                  <section>
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
                      Education
                    </h2>
                    <div className="space-y-2">
                      {enabledEducation.map(edu => (
                        <div key={edu.id}>
                          <h3 className="font-semibold text-gray-900 text-sm">{edu.degree}</h3>
                          <p className="text-blue-600 text-xs">{edu.institution}</p>
                          <p className="text-gray-500 text-xs">{edu.startDate} - {edu.endDate}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Certifications */}
                {sectionSettings.certifications && enabledCerts.length > 0 && (
                  <section>
                    <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider border-b border-gray-300 pb-1 mb-3">
                      Certifications
                    </h2>
                    <div className="space-y-2">
                      {enabledCerts.slice(0, 4).map(cert => (
                        <div key={cert.id}>
                          <h3 className="font-semibold text-gray-900 text-sm">{cert.name}</h3>
                          <p className="text-gray-500 text-xs">{cert.issuer} • {cert.date}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
      `}</style>
    </div>
  )
}
