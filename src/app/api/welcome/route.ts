import { NextResponse } from 'next/server'
import { get } from '@vercel/edge-config'

export async function GET() {
  try {
    const greeting = await get('greeting')
    return NextResponse.json({ 
      message: greeting || 'Merhaba! Edge Config bağlantısı başarılı.',
      timestamp: new Date().toISOString(),
      path: '/api/welcome'
    })
  } catch (error) {
    return NextResponse.json({ 
      error: 'Edge Config bağlantı hatası',
      details: error instanceof Error ? error.message : 'Bilinmeyen hata',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}