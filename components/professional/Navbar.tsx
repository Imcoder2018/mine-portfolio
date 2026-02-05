'use client'

import { useState, useEffect } from 'react'
import { usePortfolioStore } from '@/lib/store'
import { Menu, X, Download, Settings } from '@/components/icons'
import Link from 'next/link'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { profile, sectionSettings } = usePortfolioStore()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { label: 'About', href: '#about', show: sectionSettings.about },
    { label: 'Experience', href: '#experience', show: sectionSettings.experience },
    { label: 'Projects', href: '#projects', show: sectionSettings.projects },
    { label: 'Skills', href: '#skills', show: sectionSettings.skills },
    { label: 'Education', href: '#education', show: sectionSettings.education },
    { label: 'Contact', href: '#contact', show: sectionSettings.contact },
  ].filter(item => item.show)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center space-x-2">
            <span className="text-xl font-bold gradient-text">{profile.name.split(' ')[0]}</span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {profile.resumeUrl && (
              <a
                href={profile.resumeUrl}
                download
                className="flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary px-4 py-2 rounded-full text-white text-sm font-medium hover:opacity-90 transition-opacity"
              >
                <Download size={16} />
                <span>Resume</span>
              </a>
            )}
            <Link
              href="/admin"
              className="p-2 text-gray-400 hover:text-white transition-colors"
              title="Admin Panel"
            >
              <Settings size={20} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-800">
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block text-gray-300 hover:text-white transition-colors py-2"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-slate-800 flex items-center space-x-4">
              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  download
                  className="flex items-center space-x-2 bg-gradient-to-r from-primary to-secondary px-4 py-2 rounded-full text-white text-sm"
                >
                  <Download size={16} />
                  <span>Resume</span>
                </a>
              )}
              <Link href="/admin" className="p-2 text-gray-400 hover:text-white">
                <Settings size={20} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
