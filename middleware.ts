import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { get } from '@vercel/edge-config'

export async function middleware(request: NextRequest) {
  // Admin rotalarını kontrol et
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Login sayfası hariç tüm admin sayfaları için auth kontrolü
    if (request.nextUrl.pathname !== '/admin/login') {
      // Cookie'den auth durumunu kontrol et
      const adminAuth = request.cookies.get('adminAuth')?.value
      
      // Eğer auth yoksa login sayfasına yönlendir
      if (!adminAuth || adminAuth !== 'true') {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Admin rotaları için middleware çalıştır
     * - /admin (dashboard)
     * - /admin/settings
     * - /admin/gallery
     * - /admin/comments
     * Ancak /admin/login hariç
     */
    '/admin/((?!login).*)'
  ],
}