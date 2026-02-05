'use client'

import './globals.css'
import { usePortfolioStore } from '@/lib/store-prisma'
import DataInitializer from '@/components/DataInitializer'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { profile } = usePortfolioStore()
  
  return (
    <html lang="en" className={`theme-${profile?.theme || 'professional'}`}>
      <head>
        <title>{profile?.name || 'Portfolio'} - Portfolio</title>
        <meta name="description" content={profile?.shortBio || 'Portfolio Website'} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`theme-${profile?.theme || 'professional'}`}>
        <DataInitializer />
        {children}
      </body>
    </html>
  )
}
