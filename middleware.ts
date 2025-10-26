import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { get } from '@vercel/edge-config'

export async function middleware(request: NextRequest) {
  // Edge Config test endpoint'i
  if (request.nextUrl.pathname === '/welcome') {
    try {
      const greeting = await get('greeting')
      return NextResponse.json({ 
        message: greeting || 'Merhaba! Edge Config bağlantısı başarılı.',
        timestamp: new Date().toISOString(),
        path: request.nextUrl.pathname
      })
    } catch (error) {
      return NextResponse.json({ 
        error: 'Edge Config bağlantı hatası',
        details: error instanceof Error ? error.message : 'Bilinmeyen hata',
        timestamp: new Date().toISOString()
      }, { status: 500 })
    }
  }

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
    '/admin/((?!login).*)',
    /*
     * Edge Config test endpoint'i
     */
    '/welcome',
  ],
}