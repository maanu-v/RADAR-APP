import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { auth } from "@/lib/auth/auth"

export async function proxy(request: NextRequest) {
  const session = await auth()      
  const isLoggedIn = !!session?.user
  
  const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard")
  const isAuthPage = request.nextUrl.pathname.startsWith("/auth")

  if (isOnDashboard) {
    if (isLoggedIn) return NextResponse.next()
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  if (isAuthPage) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.next()
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - logo.png (logo file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|logo.png).*)',
  ],
}