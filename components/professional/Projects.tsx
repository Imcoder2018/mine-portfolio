'use client'

import { usePortfolioStore, Project } from '@/lib/store'
import { getYouTubeVideoId, formatDate } from '@/lib/utils'
import { Icon, Github, ExternalLink, Play, Calendar } from '@/components/icons'

export default function Projects() {
  const { projects, sectionSettings } = usePortfolioStore()

  if (!sectionSettings.projects) return null

  const enabledProjects = projects.filter(p => p.enabled)
  const featuredProjects = enabledProjects.filter(p => p.featured)
  const personalProjects = enabledProjects.filter(p => p.category === 'personal')
  const otherProjects = enabledProjects.filter(p => !p.featured && p.category !== 'personal')

  return (
    <section id="projects" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Projects</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Showcasing my work and contributions
          </p>
        </div>

        {/* Featured Projects */}
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-2">
              <Icon name="star" size={24} className="text-yellow-500" />
              Featured Projects
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} featured />
              ))}
            </div>
          </div>
        )}

        {/* Personal Projects */}
        {sectionSettings.personalProjects && personalProjects.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-2">
              <Icon name="folder" size={24} className="text-primary" />
              Personal Projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-2">
              <Icon name="code" size={24} className="text-secondary" />
              Other Projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  const videoId = getYouTubeVideoId(project.videoUrl)

  return (
    <div className={`bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-primary/50 transition-all card-hover ${featured ? 'md:col-span-1' : ''}`}>
      {/* Video or Image */}
      {videoId ? (
        <div className="video-container">
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            title={project.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full aspect-video"
          />
        </div>
      ) : project.imageUrl ? (
        <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <Icon name="image" size={48} className="text-gray-600" />
        </div>
      ) : (
        <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
          <Icon name="code" size={48} className="text-gray-600" />
        </div>
      )}

      <div className="p-6">
        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
          <Calendar size={14} />
          <span>
            {formatDate(project.startDate)} - {project.endDate ? formatDate(project.endDate) : 'Present'}
          </span>
        </div>

        <h4 className="text-xl font-bold text-white mb-2">{project.title}</h4>
        <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 5).map((tech, i) => (
            <span key={i} className="px-2 py-1 bg-slate-700 text-gray-300 rounded text-xs">
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-2 py-1 bg-slate-700 text-gray-400 rounded text-xs">
              +{project.technologies.length - 5} more
            </span>
          )}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {project.githubUrl && project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm"
            >
              <Github size={16} />
              Code
            </a>
          )}
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-primary hover:text-secondary transition-colors text-sm"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
          {project.videoUrl && (
            <a
              href={project.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-red-500 hover:text-red-400 transition-colors text-sm"
            >
              <Play size={16} />
              Video
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
