import Link from 'next/link'
import { ArrowRight, Star, Users, Award } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20luxury%20furniture%20showroom%20with%20warm%20wooden%20furniture%20elegant%20lighting%20and%20sophisticated%20interior%20design&image_size=landscape_16_9')`
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-accent/20 backdrop-blur-sm border border-accent/30 rounded-full px-6 py-2">
            <Award className="w-5 h-5 text-accent" />
            <span className="text-accent font-medium">53 Yıllık Deneyim</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold leading-tight">
            Hayalinizdeki
            <span className="block text-accent">Mobilyalar</span>
            Burada
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Kaliteli ahşap işçiliği ve özel tasarımlarla evinizi hayalinizdeki gibi dekore edin. 
            Her mobilyamız özenle seçilmiş malzemeler ve usta elleriyle üretilir.
          </p>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-accent" />
              <span>5000+ Mutlu Müşteri</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-accent" />
              <span>4.9/5 Müşteri Memnuniyeti</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-accent" />
              <span>Kalite Garantisi</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Link
              href="/products"
              className="group inline-flex items-center space-x-2 bg-accent hover:bg-accent/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <span>Ürünleri İncele</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 border-2 border-white hover:bg-white hover:text-gray-900 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
            >
              <span>İletişime Geç</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}