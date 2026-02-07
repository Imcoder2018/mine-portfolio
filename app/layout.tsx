import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import DataInitializer from '@/components/DataInitializer'
import ClientBody from '@/components/ClientBody'

export const metadata = {
  title: 'Portfolio',
  description: 'Portfolio Website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <ClientBody>
          <DataInitializer />
          {children}
        </ClientBody>
      </html>
    </ClerkProvider>
  )
}
