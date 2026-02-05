'use client'

import { useEffect } from 'react'
import { usePortfolioStore } from '@/lib/store-new'

// Component to initialize data from database
export default function DataInitializer() {
  const { fetchData, profile } = usePortfolioStore()

  useEffect(() => {
    // Only fetch data if we don't have it yet
    if (!profile) {
      fetchData()
    }
  }, [fetchData, profile])

  return null
}
