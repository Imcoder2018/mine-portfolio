'use client'

import { usePortfolioStore } from '@/lib/store'
import { Icon } from '@/components/icons'

export default function Services() {
  const { services, sectionSettings } = usePortfolioStore()

  if (!sectionSettings.services) return null

  const enabledServices = services.filter(s => s.enabled)

  if (enabledServices.length === 0) return null

  return (
    <section id="services" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Services</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            What I can help you with
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enabledServices.map((service, index) => (
            <div
              key={service.id}
              className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-primary/50 transition-all card-hover group"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all group-hover:scale-110 ${
                index % 3 === 0 ? 'bg-primary/20 text-primary' :
                index % 3 === 1 ? 'bg-secondary/20 text-secondary' :
                'bg-accent/20 text-accent'
              }`}>
                <Icon name={service.icon} size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-300 mb-6">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="text-gray-400 text-sm flex items-center gap-2">
                    <Icon name="check" size={16} className="text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
