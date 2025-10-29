import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://krqbbmjfygfsxelnhlac.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtycWJibWpmeWdmc3hlbG5obGFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NjUwODIsImV4cCI6MjA3NzM0MTA4Mn0.ria3f_oDqxQQYIHvDVMaRaneGPZYzNyfLmdWDzgEmr4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface SiteSettings {
  id: number
  site_name: string
  site_description: string
  contact_email: string
  contact_phone: string
  contact_address: string
  social_media: {
    instagram: string
    facebook: string
    whatsapp: string
  }
  business_hours: {
    weekdays: string
    saturday: string
    sunday: string
  }
  created_at: string
  updated_at: string
}

export interface GalleryImage {
  id: number
  src: string
  alt: string
  title: string
  category: string
  created_at: string
  updated_at: string
}

export interface Comment {
  id: number
  name: string
  location: string
  rating: number
  comment: string
  project: string
  approved: boolean
  created_at: string
  updated_at: string
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image: string
  published: boolean
  created_at: string
  updated_at: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string
  image: string
  created_at: string
  updated_at: string
}