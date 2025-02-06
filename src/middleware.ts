import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // List of public paths that don't require authentication
        const publicPaths = [
          '/auth/signin',
          '/auth/error',
          '/api/auth'
        ]
        
        const isPublicPath = publicPaths.some(path => 
          req.nextUrl.pathname.startsWith(path)
        )

        // Allow access to public paths, require authentication for everything else
        return isPublicPath || !!token
      }
    }
  }
)

// Configure which routes to protect
export const config = {
  matcher: [
    // Protect all routes except public ones
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
} 