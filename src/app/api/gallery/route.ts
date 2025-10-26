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

// Galeri fotoğrafı ekleme
export async function POST(request: NextRequest) {
  try {
    const newImage = await request.json()
    
    // Basit validasyon
    if (!newImage.src || !newImage.title) {
      return NextResponse.json(
        { error: 'Fotoğraf URL\'si ve başlık gereklidir' },
        { status: 400 }
      )
    }

    // Mevcut galeri verilerini al
    const galleryData = await get('gallery_photos')
    const currentGallery = Array.isArray(galleryData) ? galleryData : []
    
    // Yeni ID oluştur
    const newId = (Math.max(...currentGallery.map((img: any) => parseInt(img.id) || 0), 0) + 1).toString()
    
    // Yeni fotoğrafı ekle
    const imageWithId = {
      ...newImage,
      id: newId,
      createdAt: new Date().toISOString()
    }
    
    const updatedGallery = [...currentGallery, imageWithId]

    // Edge Config'e güncelleme gönder
    const updateResponse = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/edge-config/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: 'gallery_photos',
        value: updatedGallery
      })
    })

    return NextResponse.json({
      success: true,
      message: 'Fotoğraf başarıyla eklendi',
      data: imageWithId,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Gallery add error:', error)
    return NextResponse.json(
      { error: 'Fotoğraf eklenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// Galeri fotoğrafı güncelleme
export async function PUT(request: NextRequest) {
  try {
    const updatedImage = await request.json()
    
    if (!updatedImage.id) {
      return NextResponse.json(
        { error: 'Fotoğraf ID\'si gereklidir' },
        { status: 400 }
      )
    }

    // Mevcut galeri verilerini al
    const galleryData = await get('gallery_photos')
    const currentGallery = Array.isArray(galleryData) ? galleryData : []
    
    // Fotoğrafı güncelle
    const updatedGallery = currentGallery.map((img: any) => 
      img.id === updatedImage.id 
        ? { ...img, ...updatedImage, updatedAt: new Date().toISOString() }
        : img
    )

    // Edge Config'e güncelleme gönder
    const updateResponse = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/edge-config/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: 'gallery_photos',
        value: updatedGallery
      })
    })

    return NextResponse.json({
      success: true,
      message: 'Fotoğraf başarıyla güncellendi',
      data: updatedImage,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Gallery update error:', error)
    return NextResponse.json(
      { error: 'Fotoğraf güncellenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// Galeri fotoğrafı silme
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const imageId = searchParams.get('id')
    
    if (!imageId) {
      return NextResponse.json(
        { error: 'Fotoğraf ID\'si gereklidir' },
        { status: 400 }
      )
    }

    // Mevcut galeri verilerini al
    const galleryData = await get('gallery_photos')
    const currentGallery = Array.isArray(galleryData) ? galleryData : []
    
    // Fotoğrafı sil
    const updatedGallery = currentGallery.filter((img: any) => img.id !== imageId)

    // Edge Config'e güncelleme gönder
    const updateResponse = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/edge-config/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: 'gallery_photos',
        value: updatedGallery
      })
    })

    return NextResponse.json({
      success: true,
      message: 'Fotoğraf başarıyla silindi',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Gallery delete error:', error)
    return NextResponse.json(
      { error: 'Fotoğraf silinirken hata oluştu' },
      { status: 500 }
    )
  }
}