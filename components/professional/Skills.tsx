'use client'

import { usePortfolioStore } from '@/lib/store-prisma'

export default function Skills() {
  const { skills, sectionSettings } = usePortfolioStore()

  if (!sectionSettings?.skills) return null

  const enabledSkills = skills.filter(skill => skill.enabled)
  const categories = Array.from(new Set(enabledSkills.map(skill => skill.category)))

  const categoryColors: Record<string, string> = {
    'Frontend': 'from-blue-500 to-cyan-500',
    'Backend': 'from-green-500 to-emerald-500',
    'AI/ML': 'from-purple-500 to-pink-500',
    'DevOps': 'from-orange-500 to-amber-500',
    'Automation': 'from-red-500 to-rose-500',
    'Languages': 'from-indigo-500 to-violet-500',
    'default': 'from-primary to-secondary'
  }

  return (
    <section id="skills" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Skills & Technologies</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="space-y-12">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full bg-gradient-to-r ${categoryColors[category] || categoryColors.default}`} />
                {category}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {enabledSkills
                  .filter(skill => skill.category === category)
                  .map((skill) => (
                    <div
                      key={skill.id}
                      className="group relative bg-slate-800 rounded-xl p-4 border border-slate-700 hover:border-primary/50 transition-all hover:scale-105"
                    >
                      <div className="text-center">
                        <h4 className="font-medium text-white mb-2">{skill.name}</h4>
                        <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${categoryColors[category] || categoryColors.default} transition-all duration-500`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400 mt-1 block">{skill.level}%</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
