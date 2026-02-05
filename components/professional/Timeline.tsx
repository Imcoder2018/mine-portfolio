'use client'

import { usePortfolioStore, WorkExperience } from '@/lib/store'
import { formatDate, sortByDate } from '@/lib/utils'
import { Icon, ExternalLink, Calendar } from '@/components/icons'

export default function Timeline() {
  const { workExperience, sectionSettings } = usePortfolioStore()

  if (!sectionSettings.experience && !sectionSettings.timeline) return null

  const enabledExperience = sortByDate(workExperience.filter(exp => exp.enabled))

  return (
    <section id="experience" className="py-20 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Work Experience</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            My professional journey and career milestones
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-secondary to-primary rounded-full" />

          <div className="space-y-12">
            {enabledExperience.map((exp, index) => (
              <TimelineItem key={exp.id} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineItem({ experience, index }: { experience: WorkExperience; index: number }) {
  const isLeft = index % 2 === 0

  return (
    <div className={`relative flex flex-col md:flex-row items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      {/* Timeline Dot */}
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-primary rounded-full border-4 border-slate-900 z-10 shadow-lg shadow-primary/50" />

      {/* Content */}
      <div className={`w-full md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
        <div className={`bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-primary/50 transition-all card-hover ${isLeft ? 'md:mr-6' : 'md:ml-6'}`}>
          {/* Date Badge */}
          <div className={`flex items-center gap-2 text-sm text-primary mb-3 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
            <Calendar size={14} />
            <span>
              {formatDate(experience.startDate)} - {experience.current ? 'Present' : formatDate(experience.endDate)}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-1">{experience.title}</h3>
          <p className="text-secondary font-medium mb-2">{experience.company}</p>
          {experience.location && (
            <p className="text-gray-400 text-sm mb-3 flex items-center gap-1 ${isLeft ? 'md:justify-end' : 'md:justify-start'}">
              <Icon name="location" size={14} />
              {experience.location}
            </p>
          )}

          <p className="text-gray-300 mb-4">{experience.description}</p>

          {/* Achievements */}
          {experience.achievements.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-400 mb-2">Key Achievements:</h4>
              <ul className={`space-y-2 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
                {experience.achievements.map((achievement, i) => (
                  <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          {experience.technologies.length > 0 && (
            <div className={`flex flex-wrap gap-2 mb-4 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
              {experience.technologies.map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-slate-700 text-gray-300 rounded-full text-xs">
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Links */}
          {experience.links.length > 0 && (
            <div className={`flex flex-wrap gap-3 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
              {experience.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:text-secondary transition-colors text-sm"
                >
                  <ExternalLink size={14} />
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Empty space for opposite side */}
      <div className="hidden md:block w-1/2" />
    </div>
  )
}
