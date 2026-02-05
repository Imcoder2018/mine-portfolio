'use client'

import { usePortfolioStore } from '@/lib/store-new'
import ProfessionalPortfolio from '@/components/professional/ProfessionalPortfolio'
import BauhausPortfolio from '@/components/bauhaus/BauhausPortfolio'

export default function Home() {
  const { profile, isLoading } = usePortfolioStore()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading portfolio...</p>
        </div>
      </div>
    )
  }

  if (profile?.theme === 'bauhaus') {
    return <BauhausPortfolio />
  }

  return <ProfessionalPortfolio />
}
