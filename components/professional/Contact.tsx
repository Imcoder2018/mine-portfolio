'use client'

import { useState } from 'react'
import { usePortfolioStore } from '@/lib/store'
import { Icon, Mail, Phone, MapPin, Send } from '@/components/icons'

export default function Contact() {
  const { profile, socialLinks, sectionSettings } = usePortfolioStore()
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })

  if (!sectionSettings.contact) return null

  const enabledSocialLinks = socialLinks.filter(link => link.enabled)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailtoLink = `mailto:${profile.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`From: ${formData.name} (${formData.email})\n\n${formData.message}`)}`
    window.location.href = mailtoLink
  }

  return (
    <section id="contact" className="py-20 bg-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Feel free to reach out for collaborations or just a friendly hello
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
              <h3 className="text-xl font-semibold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Email</h4>
                    <a href={`mailto:${profile.email}`} className="text-gray-400 hover:text-primary transition-colors">
                      {profile.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <Phone size={24} className="text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Phone</h4>
                    <a href={`tel:${profile.phone}`} className="text-gray-400 hover:text-secondary transition-colors">
                      {profile.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white mb-1">Location</h4>
                    <p className="text-gray-400">{profile.location}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t border-slate-700">
                <h4 className="font-medium text-white mb-4">Follow Me</h4>
                <div className="flex gap-3">
                  {enabledSocialLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-lg bg-slate-700 hover:bg-primary flex items-center justify-center text-gray-400 hover:text-white transition-all"
                      title={link.platform}
                    >
                      <Icon name={link.icon} size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            <h3 className="text-xl font-semibold text-white mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="form-label">Your Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-input"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="form-input"
                  placeholder="Project Inquiry"
                />
              </div>
              <div>
                <label className="form-label">Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="form-input resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-opacity"
              >
                <Send size={18} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
