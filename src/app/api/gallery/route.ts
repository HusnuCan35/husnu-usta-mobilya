import { NextRequest, NextResponse } from 'next/server'
import { get } from '@vercel/edge-config'

// Galeri fotoğraflarını Edge Config'den okuma
export async function GET() {
  try {
    // Edge Config'den galeri verilerini al
    const galleryData = await get('gallery_photos')
    
    // Eğer Edge Config'de veri yoksa varsayılan galeri fotoğraflarını kullan
    const defaultGallery = [
      {
        id: '1',
        src: '/images/izmir_agac_dunyasi_001_8446a002.jpg',
        alt: 'Özel Tasarım Mobilya 1',
        title: 'Ahşap Masa Takımı',
        category: 'masa'
      },
      {
        id: '2',
        src: '/images/izmir_agac_dunyasi_002_4dae58b2.jpg',
        alt: 'Özel Tasarım Mobilya 2',
        title: 'Modern Dolap',
        category: 'dolap'
      },
      {
        id: '3',
        src: '/images/izmir_agac_dunyasi_003_52ba9d26.jpg',
        alt: 'Özel Tasarım Mobilya 3',
        title: 'Klasik Koltuk Takımı',
        category: 'koltuk'
      },
      {
        id: '4',
        src: '/images/izmir_agac_dunyasi_004_e0db85bb.jpg',
        alt: 'Özel Tasarım Mobilya 4',
        title: 'Çalışma Masası',
        category: 'masa'
      },
      {
        id: '5',
        src: '/images/izmir_agac_dunyasi_005_15d10f7b.jpg',
        alt: 'Özel Tasarım Mobilya 5',
        title: 'Yatak Odası Takımı',
        category: 'yatak'
      },
      {
        id: '6',
        src: '/images/izmir_agac_dunyasi_006_f2ef5f0f.jpg',
        alt: 'Özel Tasarım Mobilya 6',
        title: 'Mutfak Dolabı',
        category: 'mutfak'
      }
    ]

    const gallery = Array.isArray(galleryData) ? galleryData : defaultGallery

    return NextResponse.json({
      success: true,
      data: gallery,
      count: gallery.length,
      timestamp: new Date().toISOString(),
      source: galleryData ? 'edge-config' : 'fallback'
    })
  } catch (error) {
    console.error('Gallery fetch error:', error)
    
    // Hata durumunda varsayılan galeri fotoğraflarını döndür
    const defaultGallery = [
      {
        id: '1',
        src: '/images/izmir_agac_dunyasi_001_8446a002.jpg',
        alt: 'Özel Tasarım Mobilya 1',
        title: 'Ahşap Masa Takımı',
        category: 'masa'
      },
      {
        id: '2',
        src: '/images/izmir_agac_dunyasi_002_4dae58b2.jpg',
        alt: 'Özel Tasarım Mobilya 2',
        title: 'Modern Dolap',
        category: 'dolap'
      }
    ]

    return NextResponse.json({
      success: true,
      data: defaultGallery,
      count: defaultGallery.length,
      timestamp: new Date().toISOString(),
      source: 'fallback',
      warning: 'Edge Config bağlantı hatası, varsayılan galeri kullanılıyor'
    })
  }
}