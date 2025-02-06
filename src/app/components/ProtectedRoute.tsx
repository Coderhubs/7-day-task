'use client'

import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const publicPaths = ['/auth/signin', '/auth/error']
    const isPublicPath = publicPaths.includes(pathname)

    if (status === 'unauthenticated' && !isPublicPath) {
      router.push('/auth/signin')
    } else if (status === 'authenticated' && isPublicPath) {
      router.push('/')
    }
  }, [session, status, router, pathname])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return <>{children}</>
} 