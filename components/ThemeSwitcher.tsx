'use client'

import { usePortfolioStore } from '@/lib/store-prisma'
import { Palette, Sun, Moon } from 'lucide-react'

export default function ThemeSwitcher() {
  const { profile, setTheme, isLoading } = usePortfolioStore()

  if (isLoading || !profile) {
    return null
  }

  const handleThemeChange = async (theme: 'professional' | 'bauhaus') => {
    await setTheme(theme)
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg border border-gray-200">
        <button
          onClick={() => handleThemeChange('professional')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            profile.theme === 'professional'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
          title="Professional Theme"
        >
          <Sun size={16} />
          <span className="hidden sm:inline">Professional</span>
        </button>
        <button
          onClick={() => handleThemeChange('bauhaus')}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
            profile.theme === 'bauhaus'
              ? 'bg-red-600 text-white shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
          title="Bauhaus Theme"
        >
          <Palette size={16} />
          <span className="hidden sm:inline">Bauhaus</span>
        </button>
      </div>
    </div>
  )
}
