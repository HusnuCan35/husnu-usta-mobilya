import { NextRequest, NextResponse } from 'next/server'
import { get } from '@vercel/edge-config'

// Site ayarlarını Edge Config'den okuma
export async function GET() {
  try {
    // Edge Config'den site ayarlarını al
    const [
      siteName,
      siteDescription,
      contactEmail,
      contactPhone,
      contactAddress,
      socialMedia,
      businessHours
    ] = await Promise.all([
      get('site_name'),
      get('site_description'),
      get('contact_email'),
      get('contact_phone'),
      get('contact_address'),
      get('social_media'),
      get('business_hours')
    ])

    const siteSettings = {
      siteName: siteName || 'Hüsnü Usta Mobilya',
      siteDescription: siteDescription || 'Kaliteli ve Özel Tasarım Mobilyalar',
      contactEmail: contactEmail || 'info@husnuustamobilya.com',
      contactPhone: contactPhone || '+90 232 123 45 67',
      contactAddress: contactAddress || 'İzmir, Türkiye',
      socialMedia: socialMedia || {
        instagram: 'https://instagram.com/husnuustamobilya',
        facebook: 'https://facebook.com/husnuustamobilya',
        whatsapp: '+90 532 123 45 67'
      },
      businessHours: businessHours || {
        weekdays: '09:00 - 18:00',
        saturday: '09:00 - 17:00',
        sunday: 'Kapalı'
      }
    }

    return NextResponse.json({
      success: true,
      data: siteSettings,
      timestamp: new Date().toISOString(),
      source: 'edge-config'
    })
  } catch (error) {
    console.error('Site settings fetch error:', error)
    
    // Edge Config hatası durumunda varsayılan değerleri döndür
    const defaultSettings = {
      siteName: 'Hüsnü Usta Mobilya',
      siteDescription: 'Kaliteli ve Özel Tasarım Mobilyalar',
      contactEmail: 'info@husnuustamobilya.com',
      contactPhone: '+90 232 123 45 67',
      contactAddress: 'İzmir, Türkiye',
      socialMedia: {
        instagram: 'https://instagram.com/husnuustamobilya',
        facebook: 'https://facebook.com/husnuustamobilya',
        whatsapp: '+90 532 123 45 67'
      },
      businessHours: {
        weekdays: '09:00 - 18:00',
        saturday: '09:00 - 17:00',
        sunday: 'Kapalı'
      }
    }

    return NextResponse.json({
      success: true,
      data: defaultSettings,
      timestamp: new Date().toISOString(),
      source: 'fallback',
      warning: 'Edge Config bağlantı hatası, varsayılan değerler kullanılıyor'
    })
  }
}