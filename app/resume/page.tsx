'use client'

import { useRef, useState } from 'react'
import { usePortfolioStore } from '@/lib/store-new'
import { formatDate } from '@/lib/utils'
import { Mail, Phone, MapPin, Download, Printer, FileText, Palette, ExternalLink, Github } from 'lucide-react'
import { Icon } from '@/components/icons'
import Link from 'next/link'

type ThemeType = 'professional' | 'bauhaus'

export default function ResumePage() {
  const resumeRef = useRef<HTMLDivElement>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<ThemeType>('professional')
  const { profile, socialLinks, skills, workExperience, projects, education, certifications, sectionSettings, isLoading } = usePortfolioStore()

  // Handle loading state
  if (isLoading || !profile || !sectionSettings) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading resume...</p>
        </div>
      </div>
    )
  }

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
      // Create a new window for clean PDF generation
      const printWindow = window.open('', '_blank')
      if (!printWindow) {
        throw new Error('Could not open print window')
      }

      // Get the resume HTML without action bar
      const resumeHTML = resumeRef.current?.innerHTML || ''
      
      // Build the complete HTML for PDF
      const colors = selectedTheme === 'bauhaus' 
        ? { primary: '#E53935', secondary: '#1E88E5', accent: '#FDD835', text: '#212121' }
        : { primary: '#0EA5E9', secondary: '#14B8A6', accent: '#F59E0B', text: '#1e293b' }

      const pdfHTML = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>${profile.name} - Resume</title>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
          <style>
            ${selectedTheme === 'bauhaus' ? `
              :root {
                --primary: #E53935;
                --secondary: #1E88E5;
                --accent: #FDD835;
                --text: #212121;
              }
              .font-black { font-weight: 900; }
              .tracking-wide { letter-spacing: 0.05em; }
            ` : `
              :root {
                --primary: #0EA5E9;
                --secondary: #14B8A6;
                --accent: #F59E0B;
                --text: #1e293b;
              }
            `}
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              margin: 0;
              padding: 20px;
              background: white;
              color: var(--text);
            }
            .max-w-\\[210mm\\] {
              max-width: 210mm;
              margin: 0 auto;
            }
            a {
              color: var(--primary);
              text-decoration: underline;
            }
            .print\\:hidden { display: none !important; }
            @media print {
              body { margin: 0; padding: 0; }
              .max-w-\\[210mm\\] { margin: 0; }
            }
          </style>
        </head>
        <body>
          <div class="max-w-[210mm]">
            ${resumeHTML}
          </div>
          <script>
            setTimeout(() => {
              window.print();
              setTimeout(() => window.close(), 1000);
            }, 500);
          </script>
        </body>
        </html>
      `

      printWindow.document.write(pdfHTML)
      printWindow.document.close()

      // Alternative: Use browser's native print-to-pdf functionality
      setTimeout(() => {
        printWindow.focus()
      }, 100)

    } catch (error) {
      console.error('Error generating PDF:', error)
      // Fallback to regular print
      alert('PDF generation failed. Opening print dialog instead...')
      window.print()
    }
    setIsGenerating(false)
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Action Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 print:hidden">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium">
              ← Back to Portfolio
            </Link>
            <span className="text-gray-300">|</span>
            <span className="text-gray-700 font-semibold flex items-center gap-2">
              <FileText size={18} className="text-blue-600" /> Resume Preview
            </span>
          </div>
          <div className="flex items-center gap-3">
            {/* Theme Selector */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setSelectedTheme('professional')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  selectedTheme === 'professional' 
                    ? 'bg-blue-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Palette size={14} /> Professional
              </button>
              <button
                onClick={() => setSelectedTheme('bauhaus')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  selectedTheme === 'bauhaus' 
                    ? 'bg-red-600 text-white shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Palette size={14} /> Bauhaus
              </button>
            </div>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              <Printer size={18} /> Print
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={isGenerating}
              className={`flex items-center gap-2 px-4 py-2 text-white rounded-lg transition-colors disabled:opacity-50 font-medium shadow-lg ${
                selectedTheme === 'bauhaus' 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
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
          className={`max-w-[210mm] mx-auto shadow-lg print:shadow-none ${
            selectedTheme === 'bauhaus' ? 'bg-white' : 'bg-white'
          }`}
          style={{ minHeight: '297mm' }}
        >
          {/* Theme-specific accent bar */}
          {selectedTheme === 'bauhaus' && (
            <div className="h-2 flex">
              <div className="flex-1 bg-[#E53935]" />
              <div className="flex-1 bg-[#1E88E5]" />
              <div className="flex-1 bg-[#FDD835]" />
            </div>
          )}
          
          {/* Resume Content - A4 Optimized */}
          <div className="p-8 print:p-6">
            {/* Header */}
            <header className={`pb-4 mb-6 ${
              selectedTheme === 'bauhaus' 
                ? 'border-b-4 border-black' 
                : 'border-b-2 border-gray-800'
            }`}>
              <div className="flex justify-between items-start">
                <div>
                  <h1 className={`text-3xl mb-1 ${
                    selectedTheme === 'bauhaus' 
                      ? 'font-black text-black tracking-wide' 
                      : 'font-bold text-gray-900'
                  }`}>{selectedTheme === 'bauhaus' ? profile.name.toUpperCase() : profile.name}</h1>
                  <p className={`text-lg font-medium ${
                    selectedTheme === 'bauhaus' ? 'text-[#E53935]' : 'text-blue-600'
                  }`}>{profile.title}</p>
                  {profile.subtitle && <p className="text-gray-600">{profile.subtitle}</p>}
                </div>
                {profile.availableForHire && (
                  <span className={`px-3 py-1 text-sm font-medium ${
                    selectedTheme === 'bauhaus'
                      ? 'bg-[#FDD835] text-black font-bold'
                      : 'bg-green-100 text-green-700 rounded-full'
                  }`}>
                    {selectedTheme === 'bauhaus' ? 'AVAILABLE' : 'Available for Hire'}
                  </span>
                )}
              </div>
              
              {/* Contact Info Row */}
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-700">
                <a href={`mailto:${profile.email}`} className={`flex items-center gap-1.5 font-medium ${
                  selectedTheme === 'bauhaus' 
                    ? 'text-[#E53935] hover:underline' 
                    : 'text-blue-600 hover:text-blue-800 underline underline-offset-2'
                }`}>
                  <Mail size={14} /> {profile.email}
                </a>
                {profile.phone && (
                  <a href={`tel:${profile.phone}`} className={`flex items-center gap-1.5 font-medium ${
                    selectedTheme === 'bauhaus' 
                      ? 'text-[#1E88E5] hover:underline' 
                      : 'text-blue-600 hover:text-blue-800 underline underline-offset-2'
                  }`}>
                    <Phone size={14} /> {profile.phone}
                  </a>
                )}
                <span className="flex items-center gap-1.5 font-medium text-gray-700">
                  <MapPin size={14} /> {profile.location}
                </span>
                {enabledSocialLinks.slice(0, 3).map(link => (
                  <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" 
                     className={`flex items-center gap-1.5 font-medium ${
                       selectedTheme === 'bauhaus' 
                         ? 'text-[#1E88E5] hover:underline' 
                         : 'text-blue-600 hover:text-blue-800 underline underline-offset-2'
                     }`}>
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
                    <h2 className={`text-sm uppercase tracking-wider pb-1 mb-3 flex items-center gap-2 ${
                      selectedTheme === 'bauhaus'
                        ? 'font-black text-black border-b-2 border-black'
                        : 'font-bold text-gray-900 border-b border-gray-300'
                    }`}>
                      {selectedTheme === 'bauhaus' && <span className="w-3 h-3 bg-[#FDD835]" />}
                      Professional Summary
                    </h2>
                    <p className="text-sm text-gray-700 leading-relaxed">{profile.bio}</p>
                  </section>
                )}

                {/* Work Experience */}
                {sectionSettings.experience && enabledExperience.length > 0 && (
                  <section>
                    <h2 className={`text-sm uppercase tracking-wider pb-1 mb-3 flex items-center gap-2 ${
                      selectedTheme === 'bauhaus'
                        ? 'font-black text-black border-b-2 border-black'
                        : 'font-bold text-gray-900 border-b border-gray-300'
                    }`}>
                      {selectedTheme === 'bauhaus' && <span className="w-3 h-3 bg-[#E53935]" />}
                      Professional Experience
                    </h2>
                    <div className="space-y-4">
                      {enabledExperience.slice(0, 4).map((exp, idx) => (
                        <div key={exp.id} className={selectedTheme === 'bauhaus' ? `pl-3 border-l-4 ${idx % 3 === 0 ? 'border-[#E53935]' : idx % 3 === 1 ? 'border-[#1E88E5]' : 'border-[#FDD835]'}` : ''}>
                          <div className="flex justify-between items-start mb-1">
                            <div>
                              <h3 className={selectedTheme === 'bauhaus' ? 'font-black text-gray-900' : 'font-semibold text-gray-900'}>{exp.title}</h3>
                              <p className={`text-sm ${selectedTheme === 'bauhaus' ? 'text-[#E53935] font-bold' : 'text-blue-600'}`}>{exp.company} • {exp.location}</p>
                            </div>
                            <span className={`text-xs whitespace-nowrap ${selectedTheme === 'bauhaus' ? 'bg-gray-100 px-2 py-0.5 font-medium text-gray-600' : 'text-gray-500'}`}>
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
                                  <span className={`mt-1.5 ${selectedTheme === 'bauhaus' ? `w-2 h-2 ${i % 3 === 0 ? 'bg-[#E53935]' : i % 3 === 1 ? 'bg-[#1E88E5]' : 'bg-[#FDD835]'}` : 'text-blue-600'}`}>
                                    {selectedTheme !== 'bauhaus' && '•'}
                                  </span>
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                          {exp.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {exp.technologies.slice(0, 6).map((tech, i) => (
                                <span key={i} className={`px-1.5 py-0.5 text-xs ${
                                  selectedTheme === 'bauhaus' 
                                    ? 'bg-gray-800 text-white font-bold' 
                                    : 'bg-gray-100 text-gray-600 rounded'
                                }`}>
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
                    <h2 className={`text-sm uppercase tracking-wider pb-1 mb-3 flex items-center gap-2 ${
                      selectedTheme === 'bauhaus'
                        ? 'font-black text-black border-b-2 border-black'
                        : 'font-bold text-gray-900 border-b border-gray-300'
                    }`}>
                      {selectedTheme === 'bauhaus' && <span className="w-3 h-3 bg-[#1E88E5]" />}
                      Key Projects
                    </h2>
                    <div className="space-y-3">
                      {enabledProjects.slice(0, 3).map(project => (
                        <div key={project.id} className={selectedTheme === 'bauhaus' ? 'border-2 border-black p-3' : ''}>
                          <div className="flex items-start justify-between gap-2">
                            <h3 className={selectedTheme === 'bauhaus' ? 'font-black text-gray-900' : 'font-semibold text-gray-900'}>{project.title}</h3>
                            <div className="flex gap-2">
                              {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" 
                                   className={`flex items-center gap-1 text-xs font-medium ${
                                     selectedTheme === 'bauhaus' 
                                       ? 'bg-black text-white px-2 py-0.5 hover:bg-[#1E88E5]' 
                                       : 'text-blue-600 hover:underline'
                                   }`}>
                                  <Github size={10} /> Code
                                </a>
                              )}
                              {project.liveUrl && (
                                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" 
                                   className={`flex items-center gap-1 text-xs font-medium ${
                                     selectedTheme === 'bauhaus' 
                                       ? 'bg-[#E53935] text-white px-2 py-0.5 hover:bg-[#FDD835] hover:text-black' 
                                       : 'text-blue-600 hover:underline'
                                   }`}>
                                  <ExternalLink size={10} /> Live
                                </a>
                              )}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                          <div className="flex flex-wrap gap-1">
                            {project.technologies.slice(0, 5).map((tech, i) => (
                              <span key={i} className={`px-1.5 py-0.5 text-xs ${
                                selectedTheme === 'bauhaus'
                                  ? `font-bold ${i % 3 === 0 ? 'bg-[#E53935] text-white' : i % 3 === 1 ? 'bg-[#1E88E5] text-white' : 'bg-[#FDD835] text-black'}`
                                  : 'bg-blue-50 text-blue-700 rounded'
                              }`}>
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
                <section className={selectedTheme === 'bauhaus' ? '' : 'bg-gray-50 p-4 rounded-lg'}>
                  <div className={`grid grid-cols-3 gap-2 text-center ${selectedTheme === 'bauhaus' ? 'gap-1' : ''}`}>
                    <div className={selectedTheme === 'bauhaus' ? 'bg-[#E53935] text-white p-3' : ''}>
                      <div className={`text-xl font-bold ${selectedTheme === 'bauhaus' ? 'text-white font-black' : 'text-blue-600'}`}>{profile.yearsOfExperience}+</div>
                      <div className={`text-xs ${selectedTheme === 'bauhaus' ? 'text-white font-bold' : 'text-gray-500'}`}>Years</div>
                    </div>
                    <div className={selectedTheme === 'bauhaus' ? 'bg-[#1E88E5] text-white p-3' : ''}>
                      <div className={`text-xl font-bold ${selectedTheme === 'bauhaus' ? 'text-white font-black' : 'text-blue-600'}`}>{profile.projectsCompleted}+</div>
                      <div className={`text-xs ${selectedTheme === 'bauhaus' ? 'text-white font-bold' : 'text-gray-500'}`}>Projects</div>
                    </div>
                    <div className={selectedTheme === 'bauhaus' ? 'bg-[#FDD835] text-black p-3' : ''}>
                      <div className={`text-xl font-bold ${selectedTheme === 'bauhaus' ? 'text-black font-black' : 'text-blue-600'}`}>{profile.happyClients}+</div>
                      <div className={`text-xs ${selectedTheme === 'bauhaus' ? 'text-black font-bold' : 'text-gray-500'}`}>Clients</div>
                    </div>
                  </div>
                </section>

                {/* Skills */}
                {sectionSettings.skills && (
                  <section className={selectedTheme === 'bauhaus' ? 'border-4 border-black p-3' : ''}>
                    <h2 className={`text-sm uppercase tracking-wider pb-1 mb-3 flex items-center gap-2 ${
                      selectedTheme === 'bauhaus'
                        ? 'font-black text-black border-b-2 border-black'
                        : 'font-bold text-gray-900 border-b border-gray-300'
                    }`}>
                      {selectedTheme === 'bauhaus' && <span className="w-3 h-3 bg-[#1E88E5]" />}
                      Technical Skills
                    </h2>
                    <div className="space-y-3">
                      {Object.entries(skillsByCategory).slice(0, 5).map(([category, categorySkills]) => (
                        <div key={category}>
                          <h3 className={`text-xs uppercase mb-1 ${selectedTheme === 'bauhaus' ? 'font-bold text-gray-600' : 'font-semibold text-gray-500'}`}>{category}</h3>
                          <div className="flex flex-wrap gap-1">
                            {categorySkills.map((skill, i) => (
                              <span key={skill.id} className={`px-2 py-0.5 text-xs ${
                                selectedTheme === 'bauhaus'
                                  ? `font-bold ${i % 4 === 0 ? 'bg-[#E53935] text-white' : i % 4 === 1 ? 'bg-[#1E88E5] text-white' : i % 4 === 2 ? 'bg-[#FDD835] text-black' : 'bg-black text-white'}`
                                  : 'bg-gray-100 text-gray-700 rounded'
                              }`}>
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
                  <section className={selectedTheme === 'bauhaus' ? 'border-4 border-black p-3' : ''}>
                    <h2 className={`text-sm uppercase tracking-wider pb-1 mb-3 flex items-center gap-2 ${
                      selectedTheme === 'bauhaus'
                        ? 'font-black text-black border-b-2 border-black'
                        : 'font-bold text-gray-900 border-b border-gray-300'
                    }`}>
                      {selectedTheme === 'bauhaus' && <span className="w-3 h-3 bg-[#FDD835]" />}
                      Education
                    </h2>
                    <div className="space-y-2">
                      {enabledEducation.map((edu, idx) => (
                        <div key={edu.id} className={selectedTheme === 'bauhaus' ? `pl-2 border-l-4 ${idx % 3 === 0 ? 'border-[#E53935]' : idx % 3 === 1 ? 'border-[#1E88E5]' : 'border-[#FDD835]'}` : ''}>
                          <h3 className={`text-sm ${selectedTheme === 'bauhaus' ? 'font-bold text-gray-900' : 'font-semibold text-gray-900'}`}>{edu.degree}</h3>
                          <p className={`text-xs ${selectedTheme === 'bauhaus' ? 'text-[#1E88E5] font-medium' : 'text-blue-600'}`}>{edu.institution}</p>
                          <p className="text-gray-500 text-xs">{edu.startDate} - {edu.endDate}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Certifications */}
                {sectionSettings.certifications && enabledCerts.length > 0 && (
                  <section className={selectedTheme === 'bauhaus' ? 'border-4 border-black p-3' : ''}>
                    <h2 className={`text-sm uppercase tracking-wider pb-1 mb-3 flex items-center gap-2 ${
                      selectedTheme === 'bauhaus'
                        ? 'font-black text-black border-b-2 border-black'
                        : 'font-bold text-gray-900 border-b border-gray-300'
                    }`}>
                      {selectedTheme === 'bauhaus' && <span className="w-3 h-3 bg-[#E53935]" />}
                      Certifications
                    </h2>
                    <div className="space-y-2">
                      {enabledCerts.slice(0, 4).map(cert => (
                        <div key={cert.id}>
                          <h3 className={`text-sm ${selectedTheme === 'bauhaus' ? 'font-bold text-gray-900' : 'font-semibold text-gray-900'}`}>{cert.name}</h3>
                          <p className={`text-xs ${selectedTheme === 'bauhaus' ? 'text-[#E53935]' : 'text-gray-500'}`}>{cert.issuer} • {cert.date}</p>
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
