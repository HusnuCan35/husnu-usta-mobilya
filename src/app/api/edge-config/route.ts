import { NextRequest, NextResponse } from 'next/server'
import { get, set, has } from '@vercel/edge-config'

// Edge Config'den veri okuma
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')
    
    if (!key) {
      return NextResponse.json({ error: 'Key parametresi gerekli' }, { status: 400 })
    }

    const value = await get(key)
    const exists = await has(key)
    
    return NextResponse.json({
      success: true,
      key,
      value,
      exists,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Edge Config GET error:', error)
    return NextResponse.json({
      success: false,
      error: 'Edge Config okuma hatası',
      details: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 })
  }
}

// Edge Config'e veri yazma
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { key, value } = body
    
    if (!key || value === undefined) {
      return NextResponse.json({ 
        error: 'Key ve value parametreleri gerekli' 
      }, { status: 400 })
    }

    // Edge Config'e veri yazma (bu işlem Vercel API'si gerektirir)
    // Şimdilik sadece okuma işlemi destekleniyor
    return NextResponse.json({
      success: false,
      error: 'Edge Config yazma işlemi henüz desteklenmiyor',
      message: 'Vercel Dashboard üzerinden Edge Config değerlerini güncelleyebilirsiniz'
    }, { status: 501 })
    
  } catch (error) {
    console.error('Edge Config POST error:', error)
    return NextResponse.json({
      success: false,
      error: 'Edge Config yazma hatası',
      details: error instanceof Error ? error.message : 'Bilinmeyen hata'
    }, { status: 500 })
  }
}