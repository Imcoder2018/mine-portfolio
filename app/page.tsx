'use client'

import { usePortfolioStore } from '@/lib/store'
import ProfessionalPortfolio from '@/components/professional/ProfessionalPortfolio'
import BauhausPortfolio from '@/components/bauhaus/BauhausPortfolio'

export default function Home() {
  const { profile } = usePortfolioStore()

  if (profile.theme === 'bauhaus') {
    return <BauhausPortfolio />
  }

  return <ProfessionalPortfolio />
}
