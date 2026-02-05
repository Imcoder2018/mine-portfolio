'use client'

import { usePortfolioStore } from '@/lib/store'
import { Icon, Download, ArrowRight, MapPin, Mail, Phone } from '@/components/icons'
import Image from 'next/image'

export default function Hero() {
  const { profile, socialLinks, sectionSettings } = usePortfolioStore()

  if (!sectionSettings.hero) return null

  const enabledSocialLinks = socialLinks.filter(link => link.enabled)

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="mb-4">
              {profile.availableForHire && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                  Available for Hire
                </span>
              )}
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              {profile.name}
            </h1>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold gradient-text mb-2">
              {profile.title}
            </h2>

            <p className="text-lg text-gray-400 mb-6">{profile.subtitle}</p>

            <p className="text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              {profile.shortBio}
            </p>

            {/* Contact Info */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <span>{profile.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <a href={`mailto:${profile.email}`} className="hover:text-white transition-colors">
                  {profile.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <a href={`tel:${profile.phone}`} className="hover:text-white transition-colors">
                  {profile.phone}
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-4 mb-8">
              {enabledSocialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all hover:scale-110 text-gray-400 hover:text-white"
                  title={link.platform}
                >
                  <Icon name={link.icon} size={20} />
                </a>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  download
                  className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-all hover:scale-105"
                >
                  <Download size={18} />
                  Download Resume
                </a>
              )}
              <a
                href="#contact"
                className="flex items-center gap-2 border border-primary text-primary px-6 py-3 rounded-lg font-medium hover:bg-primary hover:text-white transition-all"
              >
                Get in Touch
                <ArrowRight size={18} />
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-slate-700">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white">{profile.yearsOfExperience}+</div>
                <div className="text-sm text-gray-400">Years Experience</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white">{profile.projectsCompleted}+</div>
                <div className="text-sm text-gray-400">Projects Completed</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-white">{profile.happyClients}+</div>
                <div className="text-sm text-gray-400">Happy Clients</div>
              </div>
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/50 shadow-2xl shadow-primary/20">
                <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-6xl font-bold">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </div>
              </div>
              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary rounded-full opacity-50 animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-primary rounded-full opacity-50 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#about" className="text-gray-400 hover:text-white transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  )
}
