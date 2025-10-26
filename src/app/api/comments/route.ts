import { NextRequest, NextResponse } from 'next/server'
import { get } from '@vercel/edge-config'

// Yorumları Edge Config'den okuma
export async function GET() {
  try {
    // Edge Config'den yorumları al
    const commentsData = await get('testimonials')
    
    // Eğer Edge Config'de veri yoksa varsayılan yorumları kullan
    const defaultComments = [
      {
        id: '1',
        name: 'Ayşe Demir',
        location: 'Konak, İzmir',
        rating: 5,
        comment: 'Mutfak dolabımızı yaptırdık, işçilik ve kalite mükemmel. Hüsnü Usta\'ya teşekkürler!',
        date: '2024-01-15',
        project: 'Mutfak Dolabı',
        approved: true
      },
      {
        id: '2',
        name: 'Mehmet Kaya',
        location: 'Bornova, İzmir',
        rating: 5,
        comment: 'Yatak odası takımımız harika oldu. Zamanında teslim, kaliteli işçilik. Kesinlikle tavsiye ederim.',
        date: '2024-01-10',
        project: 'Yatak Odası Takımı',
        approved: true
      },
      {
        id: '3',
        name: 'Fatma Özkan',
        location: 'Karşıyaka, İzmir',
        rating: 5,
        comment: 'Salon mobilyalarımızı yenilettik. Çok memnun kaldık, fiyat performans açısından çok iyi.',
        date: '2024-01-05',
        project: 'Salon Mobilyası',
        approved: true
      }
    ]

    const comments = Array.isArray(commentsData) ? commentsData : defaultComments

    return NextResponse.json({
      success: true,
      data: comments,
      count: comments.length,
      timestamp: new Date().toISOString(),
      source: commentsData ? 'edge-config' : 'fallback'
    })
  } catch (error) {
    console.error('Comments fetch error:', error)
    
    // Hata durumunda varsayılan yorumları döndür
    const defaultComments = [
      {
        id: '1',
        name: 'Ayşe Demir',
        location: 'Konak, İzmir',
        rating: 5,
        comment: 'Mutfak dolabımızı yaptırdık, işçilik ve kalite mükemmel. Hüsnü Usta\'ya teşekkürler!',
        date: '2024-01-15',
        project: 'Mutfak Dolabı',
        approved: true
      }
    ]

    return NextResponse.json({
      success: true,
      data: defaultComments,
      count: defaultComments.length,
      timestamp: new Date().toISOString(),
      source: 'fallback',
      warning: 'Edge Config bağlantı hatası, varsayılan yorumlar kullanılıyor'
    })
  }
}

// Yorum ekleme
export async function POST(request: NextRequest) {
  try {
    const newComment = await request.json()
    
    // Basit validasyon
    if (!newComment.name || !newComment.comment) {
      return NextResponse.json(
        { error: 'İsim ve yorum metni gereklidir' },
        { status: 400 }
      )
    }

    // Mevcut yorumları al
    const commentsData = await get('testimonials')
    const currentComments = Array.isArray(commentsData) ? commentsData : []
    
    // Yeni ID oluştur
    const newId = (Math.max(...currentComments.map((comment: any) => parseInt(comment.id) || 0), 0) + 1).toString()
    
    // Yeni yorumu ekle
    const commentWithId = {
      ...newComment,
      id: newId,
      date: new Date().toISOString().split('T')[0],
      approved: false, // Yeni yorumlar onay bekler
      createdAt: new Date().toISOString()
    }
    
    const updatedComments = [...currentComments, commentWithId]

    // Edge Config'e güncelleme gönder
    const updateResponse = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/edge-config/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: 'testimonials',
        value: updatedComments
      })
    })

    return NextResponse.json({
      success: true,
      message: 'Yorum başarıyla eklendi ve onay bekliyor',
      data: commentWithId,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Comment add error:', error)
    return NextResponse.json(
      { error: 'Yorum eklenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// Yorum güncelleme (onaylama/reddetme)
export async function PUT(request: NextRequest) {
  try {
    const updatedComment = await request.json()
    
    if (!updatedComment.id) {
      return NextResponse.json(
        { error: 'Yorum ID\'si gereklidir' },
        { status: 400 }
      )
    }

    // Mevcut yorumları al
    const commentsData = await get('testimonials')
    const currentComments = Array.isArray(commentsData) ? commentsData : []
    
    // Yorumu güncelle
    const updatedComments = currentComments.map((comment: any) => 
      comment.id === updatedComment.id 
        ? { ...comment, ...updatedComment, updatedAt: new Date().toISOString() }
        : comment
    )

    // Edge Config'e güncelleme gönder
    const updateResponse = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/edge-config/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: 'testimonials',
        value: updatedComments
      })
    })

    return NextResponse.json({
      success: true,
      message: 'Yorum başarıyla güncellendi',
      data: updatedComment,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Comment update error:', error)
    return NextResponse.json(
      { error: 'Yorum güncellenirken hata oluştu' },
      { status: 500 }
    )
  }
}

// Yorum silme
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const commentId = searchParams.get('id')
    
    if (!commentId) {
      return NextResponse.json(
        { error: 'Yorum ID\'si gereklidir' },
        { status: 400 }
      )
    }

    // Mevcut yorumları al
    const commentsData = await get('testimonials')
    const currentComments = Array.isArray(commentsData) ? commentsData : []
    
    // Yorumu sil
    const updatedComments = currentComments.filter((comment: any) => comment.id !== commentId)

    // Edge Config'e güncelleme gönder
    const updateResponse = await fetch(`${process.env.VERCEL_URL || 'http://localhost:3000'}/api/edge-config/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: 'testimonials',
        value: updatedComments
      })
    })

    return NextResponse.json({
      success: true,
      message: 'Yorum başarıyla silindi',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Comment delete error:', error)
    return NextResponse.json(
      { error: 'Yorum silinirken hata oluştu' },
      { status: 500 }
    )
  }
}