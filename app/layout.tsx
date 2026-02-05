'use client'

import './globals.css'
import { usePortfolioStore } from '@/lib/store'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { profile } = usePortfolioStore()
  
  return (
    <html lang="en" className={`theme-${profile.theme}`}>
      <head>
        <title>{profile.name} - Portfolio</title>
        <meta name="description" content={profile.shortBio} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`theme-${profile.theme}`}>
        {children}
      </body>
    </html>
  )
}
