'use client'

import { usePortfolioStore } from '@/lib/store'
import { Icon } from '@/components/icons'

export default function About() {
  const { profile, sectionSettings } = usePortfolioStore()

  if (!sectionSettings.about) return null

  return (
    <section id="about" className="py-20 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-gray-300 leading-relaxed text-lg">
              {profile.bio}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Icon name="briefcase" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{profile.yearsOfExperience}+</div>
                  <div className="text-sm text-gray-400">Years Experience</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <Icon name="folder" size={20} className="text-secondary" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{profile.projectsCompleted}+</div>
                  <div className="text-sm text-gray-400">Projects</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Icon name="users" size={20} className="text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{profile.happyClients}+</div>
                  <div className="text-sm text-gray-400">Happy Clients</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <Icon name="award" size={20} className="text-green-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-sm text-gray-400">Satisfaction</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-6">What I Do</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="brain" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">AI Development</h4>
                    <p className="text-gray-400 text-sm">Building intelligent AI agents and automation systems</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="code" size={24} className="text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Full-Stack Development</h4>
                    <p className="text-gray-400 text-sm">Creating modern web applications with cutting-edge technologies</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="zap" size={24} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">Workflow Automation</h4>
                    <p className="text-gray-400 text-sm">Streamlining processes with smart automation solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
