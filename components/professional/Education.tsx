'use client'

import { usePortfolioStore } from '@/lib/store'
import { Icon, GraduationCap, Award, Calendar } from '@/components/icons'
import { formatDate } from '@/lib/utils'

export default function Education() {
  const { education, certifications, sectionSettings } = usePortfolioStore()

  const showEducation = sectionSettings.education && education.some(e => e.enabled)
  const showCertifications = sectionSettings.certifications && certifications.some(c => c.enabled)

  if (!showEducation && !showCertifications) return null

  return (
    <section id="education" className="py-20 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Education & Certifications</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education */}
          {showEducation && (
            <div>
              <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-2">
                <GraduationCap size={28} className="text-primary" />
                Education
              </h3>
              <div className="space-y-6">
                {education.filter(e => e.enabled).map((edu) => (
                  <div key={edu.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-primary/50 transition-all">
                    <div className="flex items-center gap-2 text-sm text-primary mb-2">
                      <Calendar size={14} />
                      <span>{edu.startDate} - {edu.endDate}</span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-1">{edu.degree}</h4>
                    <p className="text-secondary font-medium mb-2">{edu.institution}</p>
                    {edu.location && (
                      <p className="text-gray-400 text-sm mb-3 flex items-center gap-1">
                        <Icon name="location" size={14} />
                        {edu.location}
                      </p>
                    )}
                    {edu.description && (
                      <p className="text-gray-300 mb-3">{edu.description}</p>
                    )}
                    {edu.achievements.length > 0 && (
                      <ul className="space-y-1">
                        {edu.achievements.map((achievement, i) => (
                          <li key={i} className="text-gray-400 text-sm flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {showCertifications && (
            <div>
              <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-2">
                <Award size={28} className="text-secondary" />
                Certifications
              </h3>
              <div className="space-y-4">
                {certifications.filter(c => c.enabled).map((cert) => (
                  <div key={cert.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-secondary/50 transition-all">
                    <div className="flex items-center gap-2 text-sm text-secondary mb-2">
                      <Calendar size={14} />
                      <span>{cert.date}</span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1">{cert.name}</h4>
                    <p className="text-gray-400 mb-2">{cert.issuer}</p>
                    {cert.credentialId && (
                      <p className="text-xs text-gray-500">Credential ID: {cert.credentialId}</p>
                    )}
                    {cert.url && cert.url !== '#' && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:text-secondary transition-colors text-sm mt-2"
                      >
                        <Icon name="external" size={14} />
                        View Certificate
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
