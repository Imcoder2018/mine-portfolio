'use client'

import { usePortfolioStore } from '@/lib/store'
import { Star } from '@/components/icons'

export default function Testimonials() {
  const { testimonials, sectionSettings } = usePortfolioStore()

  if (!sectionSettings.testimonials) return null

  const enabledTestimonials = testimonials.filter(t => t.enabled)

  if (enabledTestimonials.length === 0) return null

  return (
    <section id="testimonials" className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Testimonials</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            What people say about working with me
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {enabledTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-primary/50 transition-all"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-600'}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-300 mb-6 italic">"{testimonial.content}"</p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-semibold text-white">{testimonial.name}</h4>
                  <p className="text-gray-400 text-sm">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
