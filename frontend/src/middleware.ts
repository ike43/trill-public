import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { decrypt } from 'libs/session'

const protectedRoutes = [/^\/sell/, /^\/user/, /^\/item\/edit/]

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some((regex) => regex.test(path))

  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
