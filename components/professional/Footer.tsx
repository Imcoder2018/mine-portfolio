'use client'

import { usePortfolioStore } from '@/lib/store'
import { Icon, ArrowUp } from '@/components/icons'

export default function Footer() {
  const { profile, socialLinks } = usePortfolioStore()
  const enabledSocialLinks = socialLinks.filter(link => link.enabled)
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold gradient-text mb-2">{profile.name}</h3>
            <p className="text-gray-400 text-sm">{profile.title}</p>
            <p className="text-gray-500 text-sm mt-4">
              © {currentYear} All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-6">
              <a href="#about" className="text-gray-400 hover:text-white transition-colors text-sm">About</a>
              <a href="#experience" className="text-gray-400 hover:text-white transition-colors text-sm">Experience</a>
              <a href="#projects" className="text-gray-400 hover:text-white transition-colors text-sm">Projects</a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors text-sm">Contact</a>
            </div>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex items-center justify-center md:justify-end gap-4">
            <div className="flex gap-2">
              {enabledSocialLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-primary flex items-center justify-center text-gray-400 hover:text-white transition-all"
                  title={link.platform}
                >
                  <Icon name={link.icon} size={16} />
                </a>
              ))}
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-10 h-10 rounded-lg bg-primary hover:bg-secondary flex items-center justify-center text-white transition-all"
              title="Back to Top"
            >
              <ArrowUp size={20} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
