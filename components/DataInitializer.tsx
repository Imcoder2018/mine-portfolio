'use client'

import { useEffect, useRef } from 'react'
import { usePortfolioStore } from '@/lib/store-prisma'

// Component to initialize data from database
export default function DataInitializer() {
  const fetchData = usePortfolioStore((state) => state.fetchData)
  const hasFetched = useRef(false)

  useEffect(() => {
    // Only fetch once on mount
    if (!hasFetched.current) {
      hasFetched.current = true
      fetchData()
    }
  }, [fetchData])

  return null
}
