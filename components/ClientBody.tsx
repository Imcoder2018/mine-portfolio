'use client'

import { usePortfolioStore } from '@/lib/store-prisma'

export default function ClientBody({ children }: { children: React.ReactNode }) {
  const { profile } = usePortfolioStore()
  
  return (
    <body className={`theme-${profile?.theme || 'professional'}`}>
      {children}
    </body>
  )
}
