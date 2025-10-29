'use server'

import { supabase } from './supabase'
import { revalidatePath } from 'next/cache'

// Site Settings Actions
export async function getSiteSettings() {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .single()

    if (error) {
      console.error('Site ayarları yüklenirken hata:', error)
      return {
        success: false,
        data: null,
        error: error.message
      }
    }

    return {
      success: true,
      data: data,
      error: null
    }
  } catch (error) {
    console.error('Site ayarları yüklenirken hata:', error)
    return {
      success: false,
      data: null,
      error: 'Site ayarları yüklenemedi'
    }
  }
}

export async function updateSiteSettings(formData: FormData) {
  try {
    const siteName = formData.get('siteName') as string
    const siteTitle = formData.get('siteTitle') as string
    const siteDescription = formData.get('siteDescription') as string
    const contactEmail = formData.get('contactEmail') as string
    const contactPhone = formData.get('contactPhone') as string
    const address = formData.get('address') as string
    const facebook = formData.get('facebook') as string
    const instagram = formData.get('instagram') as string
    const twitter = formData.get('twitter') as string
    const linkedin = formData.get('linkedin') as string

    const settingsData = {
      siteName,
      siteTitle,
      siteDescription,
      contactEmail,
      contactPhone,
      contactAddress: address,
      socialMedia: {
        facebook,
        instagram,
        twitter,
        linkedin
      },
      updated_at: new Date().toISOString()
    }

    const { error } = await supabase
      .from('site_settings')
      .upsert(settingsData, { onConflict: 'id' })

    if (error) {
      console.error('Site ayarları güncellenirken hata:', error)
      return {
        success: false,
        error: error.message
      }
    }

    revalidatePath('/admin/settings')
    revalidatePath('/')

    return {
      success: true,
      error: null
    }
  } catch (error) {
    console.error('Site ayarları güncellenirken hata:', error)
    return {
      success: false,
      error: 'Site ayarları güncellenemedi'
    }
  }
}

// Gallery Actions
export async function getGalleryImages() {
  try {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Galeri yüklenirken hata:', error)
      return {
        success: false,
        data: [],
        error: error.message
      }
    }

    return {
      success: true,
      data: data || [],
      error: null
    }
  } catch (error) {
    console.error('Galeri yüklenirken hata:', error)
    return {
      success: false,
      data: [],
      error: 'Galeri yüklenemedi'
    }
  }
}

export async function addGalleryImage(formData: FormData) {
  try {
    const src = formData.get('src') as string
    const alt = formData.get('alt') as string
    const title = formData.get('title') as string
    const category = formData.get('category') as string
    const description = formData.get('description') as string

    const imageData = {
      src,
      alt,
      title,
      category,
      description,
      created_at: new Date().toISOString()
    }

    const { error } = await supabase
      .from('gallery')
      .insert([imageData])

    if (error) {
      console.error('Fotoğraf eklenirken hata:', error)
      return {
        success: false,
        error: error.message
      }
    }

    revalidatePath('/admin/gallery')
    revalidatePath('/')

    return {
      success: true,
      error: null
    }
  } catch (error) {
    console.error('Fotoğraf eklenirken hata:', error)
    return {
      success: false,
      error: 'Fotoğraf eklenemedi'
    }
  }
}

export async function updateGalleryImage(formData: FormData) {
  try {
    const id = formData.get('id') as string
    const src = formData.get('src') as string
    const alt = formData.get('alt') as string
    const title = formData.get('title') as string
    const category = formData.get('category') as string
    const description = formData.get('description') as string

    const imageData = {
      src,
      alt,
      title,
      category,
      description,
      updated_at: new Date().toISOString()
    }

    const { error } = await supabase
      .from('gallery')
      .update(imageData)
      .eq('id', id)

    if (error) {
      console.error('Fotoğraf güncellenirken hata:', error)
      return {
        success: false,
        error: error.message
      }
    }

    revalidatePath('/admin/gallery')
    revalidatePath('/')

    return {
      success: true,
      error: null
    }
  } catch (error) {
    console.error('Fotoğraf güncellenirken hata:', error)
    return {
      success: false,
      error: 'Fotoğraf güncellenemedi'
    }
  }
}

export async function deleteGalleryImage(id: string) {
  try {
    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Fotoğraf silinirken hata:', error)
      return {
        success: false,
        error: error.message
      }
    }

    revalidatePath('/admin/gallery')
    revalidatePath('/')

    return {
      success: true,
      error: null
    }
  } catch (error) {
    console.error('Fotoğraf silinirken hata:', error)
    return {
      success: false,
      error: 'Fotoğraf silinemedi'
    }
  }
}

// Comments Actions
export async function getComments() {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Yorumlar yüklenirken hata:', error)
      return {
        success: false,
        data: [],
        error: error.message
      }
    }

    return {
      success: true,
      data: data || [],
      error: null
    }
  } catch (error) {
    console.error('Yorumlar yüklenirken hata:', error)
    return {
      success: false,
      data: [],
      error: 'Yorumlar yüklenemedi'
    }
  }
}

export async function getApprovedComments() {
  try {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Onaylanmış yorumlar yüklenirken hata:', error)
      return {
        success: false,
        data: [],
        error: error.message
      }
    }

    return {
      success: true,
      data: data || [],
      error: null
    }
  } catch (error) {
    console.error('Onaylanmış yorumlar yüklenirken hata:', error)
    return {
      success: false,
      data: [],
      error: 'Onaylanmış yorumlar yüklenemedi'
    }
  }
}

export async function addComment(formData: FormData) {
  try {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const message = formData.get('message') as string
    const rating = parseInt(formData.get('rating') as string)

    const commentData = {
      name,
      email,
      message,
      rating,
      status: 'pending',
      created_at: new Date().toISOString()
    }

    const { error } = await supabase
      .from('comments')
      .insert([commentData])

    if (error) {
      console.error('Yorum eklenirken hata:', error)
      return {
        success: false,
        error: error.message
      }
    }

    revalidatePath('/admin/comments')

    return {
      success: true,
      error: null
    }
  } catch (error) {
    console.error('Yorum eklenirken hata:', error)
    return {
      success: false,
      error: 'Yorum eklenemedi'
    }
  }
}

export async function updateCommentStatus(id: string, status: 'approved' | 'rejected' | 'pending') {
  try {
    const { error } = await supabase
      .from('comments')
      .update({ 
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)

    if (error) {
      console.error('Yorum durumu güncellenirken hata:', error)
      return {
        success: false,
        error: error.message
      }
    }

    revalidatePath('/admin/comments')
    revalidatePath('/')

    return {
      success: true,
      error: null
    }
  } catch (error) {
    console.error('Yorum durumu güncellenirken hata:', error)
    return {
      success: false,
      error: 'Yorum durumu güncellenemedi'
    }
  }
}

export async function deleteComment(id: string) {
  try {
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Yorum silinirken hata:', error)
      return {
        success: false,
        error: error.message
      }
    }

    revalidatePath('/admin/comments')
    revalidatePath('/')

    return {
      success: true,
      error: null
    }
  } catch (error) {
    console.error('Yorum silinirken hata:', error)
    return {
      success: false,
      error: 'Yorum silinemedi'
    }
  }
}