'use client'

import { useEffect, useState } from 'react'
import { usePortfolioStore } from '@/lib/store-prisma'
import ProfessionalPortfolio from '@/components/professional/ProfessionalPortfolio'
import BauhausPortfolio from '@/components/bauhaus/BauhausPortfolio'
import ThemeSwitcher from '@/components/ThemeSwitcher'

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const profile = usePortfolioStore((state) => state.profile)
  const isLoading = usePortfolioStore((state) => state.isLoading)
  const error = usePortfolioStore((state) => state.error)
  const fetchData = usePortfolioStore((state) => state.fetchData)

  useEffect(() => {
    setMounted(true)
    // Fetch data on mount
    fetchData()
  }, [fetchData])

  // Show loading during SSR or before hydration
  if (!mounted || isLoading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Portfolio</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    )
  }

  const PortfolioComponent = profile.theme === 'bauhaus' ? BauhausPortfolio : ProfessionalPortfolio

  return (
    <>
      <ThemeSwitcher />
      <PortfolioComponent />
    </>
  )
}
