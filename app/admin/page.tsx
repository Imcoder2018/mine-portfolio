'use client'

import { useState, useEffect } from 'react'
import { usePortfolioStore, generateId, SectionSettings } from '@/lib/store-prisma'
import { Icon, Save, Plus, Trash2, Edit, Eye, EyeOff, LogOut, Settings, User, Briefcase, Code, GraduationCap, Award, MessageSquare, Zap, Globe, Lock } from '@/components/icons'
import Link from 'next/link'

export default function AdminPage() {
  const [isClient, setIsClient] = useState(false)
  const { isAdminAuthenticated, login, logout } = usePortfolioStore()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const success = login(password)
    if (!success) {
      setError('Invalid password')
    } else {
      setError('')
    }
  }

  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="text-primary" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
            <p className="text-gray-400 mt-2">Enter password to access</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Enter admin password"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-secondary text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity"
            >
              Login
            </button>
          </form>
          <p className="text-gray-500 text-xs text-center mt-4">Default password: admin123</p>
          <div className="mt-6 text-center">
            <Link href="/" className="text-primary hover:text-secondary text-sm">
              ← Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return <AdminDashboard />
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('profile')
  const { logout, profile, setTheme, isLoading } = usePortfolioStore()

  // Show loading if profile not loaded yet
  if (isLoading || !profile) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'sections', label: 'Sections', icon: Settings },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'skills', label: 'Skills', icon: Zap },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'services', label: 'Services', icon: Globe },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'social', label: 'Social Links', icon: Globe },
  ]

  return (
    <div className="min-h-screen bg-slate-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold text-white">Admin Panel</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your portfolio</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'text-gray-400 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700 space-y-2">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-gray-400 text-sm">Theme:</span>
            <select
              value={profile.theme}
              onChange={(e) => setTheme(e.target.value as 'professional' | 'bauhaus')}
              className="bg-slate-700 text-white text-sm rounded px-2 py-1 border-none"
            >
              <option value="professional">Professional</option>
              <option value="bauhaus">Bauhaus</option>
            </select>
          </div>
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
          >
            <Eye size={18} />
            View Portfolio
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {activeTab === 'profile' && <ProfileEditor />}
        {activeTab === 'sections' && <SectionsEditor />}
        {activeTab === 'experience' && <ExperienceEditor />}
        {activeTab === 'projects' && <ProjectsEditor />}
        {activeTab === 'skills' && <SkillsEditor />}
        {activeTab === 'education' && <EducationEditor />}
        {activeTab === 'services' && <ServicesEditor />}
        {activeTab === 'testimonials' && <TestimonialsEditor />}
        {activeTab === 'social' && <SocialLinksEditor />}
      </div>
    </div>
  )
}

function ProfileEditor() {
  const { profile, setProfile } = usePortfolioStore()
  const [formData, setFormData] = useState(profile!)

  if (!profile) return <div className="text-gray-400">Loading profile...</div>

  const handleSave = () => {
    if (formData) {
      setProfile(formData)
      alert('Profile saved successfully!')
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Profile Settings</h2>
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Full Name</label>
            <input
              type="text"
              value={formData?.name || ''}
              onChange={(e) => setFormData({ ...formData!, name: e.target.value })}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Title</label>
            <input
              type="text"
              value={formData?.title || ''}
              onChange={(e) => setFormData({ ...formData!, title: e.target.value })}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Subtitle</label>
            <input
              type="text"
              value={formData?.subtitle || ''}
              onChange={(e) => setFormData({ ...formData!, subtitle: e.target.value })}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              value={formData?.email || ''}
              onChange={(e) => setFormData({ ...formData!, email: e.target.value })}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Phone</label>
            <input
              type="tel"
              value={formData?.phone || ''}
              onChange={(e) => setFormData({ ...formData!, phone: e.target.value })}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Location</label>
            <input
              type="text"
              value={formData?.location || ''}
              onChange={(e) => setFormData({ ...formData!, location: e.target.value })}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Resume URL</label>
            <input
              type="text"
              value={formData?.resumeUrl || ''}
              onChange={(e) => setFormData({ ...formData!, resumeUrl: e.target.value })}
              className="form-input"
              placeholder="/resume.pdf"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="form-label mb-0">Available for Hire</label>
            <button
              onClick={() => setFormData({ ...formData!, availableForHire: !formData?.availableForHire })}
              className={`w-12 h-6 rounded-full transition-all ${formData?.availableForHire ? 'bg-green-500' : 'bg-slate-600'}`}
            >
              <div className={`w-5 h-5 bg-white rounded-full transform transition-all ${formData?.availableForHire ? 'translate-x-6' : 'translate-x-0.5'}`} />
            </button>
          </div>
        </div>

        <div>
          <label className="form-label">Short Bio</label>
          <textarea
            value={formData?.shortBio || ''}
            onChange={(e) => setFormData({ ...formData!, shortBio: e.target.value })}
            className="form-input resize-none"
            rows={2}
          />
        </div>

        <div>
          <label className="form-label">Full Bio</label>
          <textarea
            value={formData?.bio || ''}
            onChange={(e) => setFormData({ ...formData!, bio: e.target.value })}
            className="form-input resize-none"
            rows={4}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <label className="form-label">Years of Experience</label>
            <input
              type="number"
              value={formData?.yearsOfExperience || 0}
              onChange={(e) => setFormData({ ...formData!, yearsOfExperience: parseInt(e.target.value) || 0 })}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Projects Completed</label>
            <input
              type="number"
              value={formData?.projectsCompleted || 0}
              onChange={(e) => setFormData({ ...formData!, projectsCompleted: parseInt(e.target.value) || 0 })}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Happy Clients</label>
            <input
              type="number"
              value={formData?.happyClients || 0}
              onChange={(e) => setFormData({ ...formData!, happyClients: parseInt(e.target.value) || 0 })}
              className="form-input"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-medium px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
        >
          <Save size={18} />
          Save Changes
        </button>
      </div>
    </div>
  )
}

function SectionsEditor() {
  const { sectionSettings, toggleSection } = usePortfolioStore()

  if (!sectionSettings) return <div className="text-gray-400">Loading sections...</div>

  const sections: { key: keyof SectionSettings; label: string; description: string }[] = [
    { key: 'hero', label: 'Hero Section', description: 'Main landing section with profile info' },
    { key: 'about', label: 'About Section', description: 'Detailed bio and statistics' },
    { key: 'skills', label: 'Skills Section', description: 'Technical skills and proficiency' },
    { key: 'experience', label: 'Work Experience', description: 'Professional work history' },
    { key: 'timeline', label: 'Timeline View', description: 'Timeline layout for experience' },
    { key: 'projects', label: 'Projects Section', description: 'Portfolio projects showcase' },
    { key: 'personalProjects', label: 'Personal Projects', description: 'Personal/side projects' },
    { key: 'education', label: 'Education Section', description: 'Academic background' },
    { key: 'certifications', label: 'Certifications', description: 'Professional certifications' },
    { key: 'services', label: 'Services Section', description: 'Services offered' },
    { key: 'testimonials', label: 'Testimonials', description: 'Client testimonials' },
    { key: 'achievements', label: 'Achievements', description: 'Awards and achievements' },
    { key: 'languages', label: 'Languages', description: 'Language proficiency' },
    { key: 'interests', label: 'Interests', description: 'Personal interests' },
    { key: 'contact', label: 'Contact Section', description: 'Contact form and info' },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Section Visibility</h2>
      <p className="text-gray-400 mb-6">Toggle sections on/off to customize your portfolio</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <div
            key={section.key}
            className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex items-center justify-between"
          >
            <div>
              <h3 className="text-white font-medium">{section.label}</h3>
              <p className="text-gray-400 text-sm">{section.description}</p>
            </div>
            <button
              onClick={() => toggleSection(section.key)}
              className={`w-12 h-6 rounded-full transition-all flex-shrink-0 ${
                sectionSettings[section.key] ? 'bg-green-500' : 'bg-slate-600'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transform transition-all ${
                  sectionSettings[section.key] ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function ExperienceEditor() {
  const { workExperience, addWorkExperience, updateWorkExperience, deleteWorkExperience } = usePortfolioStore()
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleAdd = () => {
    const newExp = {
      id: generateId(),
      title: 'New Position',
      company: 'Company Name',
      location: 'Location',
      startDate: new Date().toISOString().slice(0, 7),
      endDate: '',
      current: true,
      description: 'Description of your role and responsibilities',
      achievements: [],
      technologies: [],
      links: [],
      enabled: true,
    }
    addWorkExperience(newExp)
    setEditingId(newExp.id)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Work Experience</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-all"
        >
          <Plus size={18} />
          Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {workExperience.map((exp) => (
          <div key={exp.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            {editingId === exp.id ? (
              <ExperienceForm
                experience={exp}
                onSave={(data) => {
                  updateWorkExperience(exp.id, data)
                  setEditingId(null)
                }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-white">{exp.title}</h3>
                    {!exp.enabled && (
                      <span className="px-2 py-0.5 bg-gray-600 text-gray-300 text-xs rounded">Hidden</span>
                    )}
                  </div>
                  <p className="text-primary">{exp.company}</p>
                  <p className="text-gray-400 text-sm">{exp.startDate} - {exp.current ? 'Present' : exp.endDate}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateWorkExperience(exp.id, { enabled: !exp.enabled })}
                    className={`p-2 rounded-lg transition-all ${exp.enabled ? 'bg-green-500/20 text-green-500' : 'bg-slate-700 text-gray-400'}`}
                  >
                    {exp.enabled ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <button
                    onClick={() => setEditingId(exp.id)}
                    className="p-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => deleteWorkExperience(exp.id)}
                    className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ExperienceForm({ experience, onSave, onCancel }: { experience: any; onSave: (data: any) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState(experience)
  const [achievementsText, setAchievementsText] = useState(experience.achievements.join('\n'))
  const [techText, setTechText] = useState(experience.technologies.join(', '))

  const handleSave = () => {
    onSave({
      ...formData,
      achievements: achievementsText.split('\n').filter(Boolean),
      technologies: techText.split(',').map((t: string) => t.trim()).filter(Boolean),
    })
  }

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="form-label">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Company</label>
          <input
            type="text"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Start Date</label>
          <input
            type="month"
            value={formData.startDate}
            onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">End Date</label>
          <input
            type="month"
            value={formData.endDate}
            onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
            className="form-input"
            disabled={formData.current}
          />
          <label className="flex items-center gap-2 mt-2 text-sm text-gray-400">
            <input
              type="checkbox"
              checked={formData.current}
              onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
            />
            Currently working here
          </label>
        </div>
      </div>
      <div>
        <label className="form-label">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="form-input resize-none"
          rows={3}
        />
      </div>
      <div>
        <label className="form-label">Achievements (one per line)</label>
        <textarea
          value={achievementsText}
          onChange={(e) => setAchievementsText(e.target.value)}
          className="form-input resize-none"
          rows={3}
        />
      </div>
      <div>
        <label className="form-label">Technologies (comma separated)</label>
        <input
          type="text"
          value={techText}
          onChange={(e) => setTechText(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-all"
        >
          <Save size={18} />
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

function ProjectsEditor() {
  const { projects, addProject, updateProject, deleteProject } = usePortfolioStore()
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleAdd = () => {
    const newProject = {
      id: generateId(),
      title: 'New Project',
      description: 'Project description',
      longDescription: '',
      technologies: [],
      imageUrl: '',
      videoUrl: '',
      githubUrl: '',
      liveUrl: '',
      category: 'personal',
      featured: false,
      startDate: new Date().toISOString().slice(0, 7),
      endDate: '',
      enabled: true,
    }
    addProject(newProject)
    setEditingId(newProject.id)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Projects</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-all"
        >
          <Plus size={18} />
          Add Project
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            {editingId === project.id ? (
              <ProjectForm
                project={project}
                onSave={(data) => {
                  updateProject(project.id, data)
                  setEditingId(null)
                }}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                      {project.featured && (
                        <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-500 text-xs rounded">Featured</span>
                      )}
                      {!project.enabled && (
                        <span className="px-2 py-0.5 bg-gray-600 text-gray-300 text-xs rounded">Hidden</span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{project.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateProject(project.id, { enabled: !project.enabled })}
                    className={`p-2 rounded-lg transition-all ${project.enabled ? 'bg-green-500/20 text-green-500' : 'bg-slate-700 text-gray-400'}`}
                  >
                    {project.enabled ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                  <button
                    onClick={() => setEditingId(project.id)}
                    className="p-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectForm({ project, onSave, onCancel }: { project: any; onSave: (data: any) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState(project)
  const [techText, setTechText] = useState(project.technologies.join(', '))

  const handleSave = () => {
    onSave({
      ...formData,
      technologies: techText.split(',').map((t: string) => t.trim()).filter(Boolean),
    })
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="form-label">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="form-input"
        />
      </div>
      <div>
        <label className="form-label">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="form-input resize-none"
          rows={2}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="form-label">GitHub URL</label>
          <input
            type="text"
            value={formData.githubUrl}
            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
            className="form-input"
          />
        </div>
        <div>
          <label className="form-label">Live URL</label>
          <input
            type="text"
            value={formData.liveUrl}
            onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
            className="form-input"
          />
        </div>
      </div>
      <div>
        <label className="form-label">YouTube Video URL (for demo)</label>
        <input
          type="text"
          value={formData.videoUrl}
          onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
          className="form-input"
          placeholder="https://www.youtube.com/watch?v=..."
        />
      </div>
      <div>
        <label className="form-label">Technologies (comma separated)</label>
        <input
          type="text"
          value={techText}
          onChange={(e) => setTechText(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="flex items-center gap-4">
        <label className="flex items-center gap-2 text-sm text-gray-400">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          />
          Featured Project
        </label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="bg-slate-700 text-white text-sm rounded px-3 py-2 border-none"
        >
          <option value="personal">Personal</option>
          <option value="work">Work</option>
          <option value="opensource">Open Source</option>
        </select>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-all"
        >
          <Save size={18} />
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

function SkillsEditor() {
  const { skills, addSkill, updateSkill, deleteSkill } = usePortfolioStore()
  const [newSkill, setNewSkill] = useState({ name: '', category: 'Languages', level: 80 })

  const handleAdd = () => {
    if (!newSkill.name) return
    addSkill({
      id: generateId(),
      ...newSkill,
      enabled: true,
    })
    setNewSkill({ name: '', category: 'Languages', level: 80 })
  }

  const categories = ['Languages', 'Frontend', 'Backend', 'AI/ML', 'DevOps', 'Automation', 'Database', 'Tools']

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Skills</h2>

      {/* Add new skill */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Add New Skill</h3>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="form-label">Skill Name</label>
            <input
              type="text"
              value={newSkill.name}
              onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
              className="form-input"
              placeholder="e.g., React, Python, Docker"
            />
          </div>
          <div>
            <label className="form-label">Category</label>
            <select
              value={newSkill.category}
              onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
              className="form-input"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="w-24">
            <label className="form-label">Level %</label>
            <input
              type="number"
              min="0"
              max="100"
              value={newSkill.level}
              onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) || 0 })}
              className="form-input"
            />
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-all h-10"
          >
            <Plus size={18} />
            Add
          </button>
        </div>
      </div>

      {/* Skills list */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {skills.map((skill) => (
          <div key={skill.id} className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">{skill.name}</h4>
              <p className="text-gray-400 text-sm">{skill.category} • {skill.level}%</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateSkill(skill.id, { enabled: !skill.enabled })}
                className={`p-2 rounded-lg transition-all ${skill.enabled ? 'bg-green-500/20 text-green-500' : 'bg-slate-700 text-gray-400'}`}
              >
                {skill.enabled ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
              <button
                onClick={() => deleteSkill(skill.id)}
                className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function EducationEditor() {
  const { education, addEducation, updateEducation, deleteEducation } = usePortfolioStore()

  const handleAdd = () => {
    addEducation({
      id: generateId(),
      degree: 'New Degree',
      institution: 'Institution Name',
      location: 'Location',
      startDate: '2020',
      endDate: '2024',
      description: '',
      achievements: [],
      enabled: true,
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Education</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-all"
        >
          <Plus size={18} />
          Add Education
        </button>
      </div>

      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{edu.degree}</h3>
                <p className="text-primary">{edu.institution}</p>
                <p className="text-gray-400 text-sm">{edu.startDate} - {edu.endDate}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateEducation(edu.id, { enabled: !edu.enabled })}
                  className={`p-2 rounded-lg transition-all ${edu.enabled ? 'bg-green-500/20 text-green-500' : 'bg-slate-700 text-gray-400'}`}
                >
                  {edu.enabled ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                <button
                  onClick={() => deleteEducation(edu.id)}
                  className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ServicesEditor() {
  const { services, addService, updateService, deleteService } = usePortfolioStore()

  const handleAdd = () => {
    addService({
      id: generateId(),
      title: 'New Service',
      description: 'Service description',
      icon: 'code',
      features: [],
      enabled: true,
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Services</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-all"
        >
          <Plus size={18} />
          Add Service
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {services.map((service) => (
          <div key={service.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                <p className="text-gray-400 text-sm mt-1">{service.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateService(service.id, { enabled: !service.enabled })}
                  className={`p-2 rounded-lg transition-all ${service.enabled ? 'bg-green-500/20 text-green-500' : 'bg-slate-700 text-gray-400'}`}
                >
                  {service.enabled ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                <button
                  onClick={() => deleteService(service.id)}
                  className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TestimonialsEditor() {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial } = usePortfolioStore()

  const handleAdd = () => {
    addTestimonial({
      id: generateId(),
      name: 'Client Name',
      role: 'Role',
      company: 'Company',
      content: 'Testimonial content...',
      imageUrl: '',
      rating: 5,
      enabled: true,
    })
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Testimonials</h2>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-all"
        >
          <Plus size={18} />
          Add Testimonial
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                <p className="text-primary text-sm">{testimonial.role} at {testimonial.company}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateTestimonial(testimonial.id, { enabled: !testimonial.enabled })}
                  className={`p-2 rounded-lg transition-all ${testimonial.enabled ? 'bg-green-500/20 text-green-500' : 'bg-slate-700 text-gray-400'}`}
                >
                  {testimonial.enabled ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                <button
                  onClick={() => deleteTestimonial(testimonial.id)}
                  className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <p className="text-gray-400 text-sm italic">"{testimonial.content}"</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function SocialLinksEditor() {
  const { socialLinks, addSocialLink, updateSocialLink, deleteSocialLink } = usePortfolioStore()
  const [newLink, setNewLink] = useState({ platform: '', url: '', icon: 'globe' })

  const handleAdd = () => {
    if (!newLink.platform || !newLink.url) return
    addSocialLink({
      id: generateId(),
      ...newLink,
      enabled: true,
    })
    setNewLink({ platform: '', url: '', icon: 'globe' })
  }

  const iconOptions = ['linkedin', 'github', 'twitter', 'youtube', 'mail', 'globe', 'instagram', 'facebook']

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Social Links</h2>

      {/* Add new link */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Add New Link</h3>
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="form-label">Platform</label>
            <input
              type="text"
              value={newLink.platform}
              onChange={(e) => setNewLink({ ...newLink, platform: e.target.value })}
              className="form-input"
              placeholder="e.g., LinkedIn, GitHub"
            />
          </div>
          <div className="flex-1">
            <label className="form-label">URL</label>
            <input
              type="text"
              value={newLink.url}
              onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
              className="form-input"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="form-label">Icon</label>
            <select
              value={newLink.icon}
              onChange={(e) => setNewLink({ ...newLink, icon: e.target.value })}
              className="form-input"
            >
              {iconOptions.map((icon) => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80 transition-all h-10"
          >
            <Plus size={18} />
            Add
          </button>
        </div>
      </div>

      {/* Links list */}
      <div className="space-y-4">
        {socialLinks.map((link) => (
          <div key={link.id} className="bg-slate-800 rounded-xl p-4 border border-slate-700 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Icon name={link.icon} size={24} className="text-primary" />
              <div>
                <h4 className="text-white font-medium">{link.platform}</h4>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 text-sm hover:text-primary">
                  {link.url}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateSocialLink(link.id, { enabled: !link.enabled })}
                className={`p-2 rounded-lg transition-all ${link.enabled ? 'bg-green-500/20 text-green-500' : 'bg-slate-700 text-gray-400'}`}
              >
                {link.enabled ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
              <button
                onClick={() => deleteSocialLink(link.id)}
                className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
