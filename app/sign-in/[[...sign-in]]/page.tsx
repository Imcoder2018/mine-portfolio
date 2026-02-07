'use client'

import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center">
      <SignIn 
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'bg-slate-800 border border-slate-700',
          }
        }}
        fallbackRedirectUrl="/admin"
      />
      <div className="mt-6 text-center">
        <Link href="/" className="text-blue-400 hover:text-blue-300 text-sm">
          &larr; Back to Portfolio
        </Link>
      </div>
    </div>
  )
}
