export type Theme = 'light' | 'dark'

export interface ProductCategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  image: string
  productCount: number
  sort_order: number
}

export interface Product {
  id: string
  name: string
  description: string
  category: ProductCategory
  featured_image: string
  images: string[]
  price: number
  discountedPrice?: number
  discount?: number
  rating: number
  reviewCount: number
  inStock: boolean
  features: string[]
  dimensions: {
    width: number
    height: number
    depth: number
  }
  material: string
  color: string
  weight: number
  warranty: number
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  publishDate: string
  featuredImage: string
  tags: string[]
  readTime: number
}

export interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export interface Newsletter {
  email: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  avatar: string
  date: string
}

export interface TeamMember {
  id: string
  name: string
  role: string
  bio: string
  avatar: string
  social: {
    linkedin?: string
    twitter?: string
    instagram?: string
  }
}

export interface CompanyStats {
  experience: number
  happyCustomers: number
  completedProjects: number
  expertStaff: number
}

export interface CompanyValue {
  title: string
  description: string
  icon: string
}

export interface TimelineEvent {
  year: string
  title: string
  description: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface ContactInfo {
  address: string
  phone: string
  email: string
  workingHours: string
}

export interface SEOData {
  title: string
  description: string
  keywords: string[]
  ogImage?: string
  canonical?: string
}