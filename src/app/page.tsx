import { HeroSection } from '@/components/HeroSection'
import { CategoryGrid } from '@/components/CategoryGrid'
import { FeaturedProducts } from '@/components/FeaturedProducts'
import { AboutPreview } from '@/components/AboutPreview'
import { TestimonialsSection } from '@/components/TestimonialsSection'
import { StructuredData, organizationSchema, localBusinessSchema, websiteSchema } from '@/components/StructuredData'

export default function HomePage() {
  return (
    <>
      <StructuredData data={organizationSchema} />
      <StructuredData data={localBusinessSchema} />
      <StructuredData data={websiteSchema} />
      
      <div className="min-h-screen">
        <HeroSection />
        <CategoryGrid />
        <FeaturedProducts />
        <AboutPreview />
        <TestimonialsSection />
      </div>
    </>
  )
}