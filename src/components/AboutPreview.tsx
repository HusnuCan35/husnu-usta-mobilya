import Link from 'next/link'
import { ArrowRight, Award, Users, Clock, CheckCircle } from 'lucide-react'

export function AboutPreview() {
  const features = [
    {
      icon: Award,
      title: 'Kalite Garantisi',
      description: 'Tüm ürünlerimizde 5 yıl kalite garantisi'
    },
    {
      icon: Users,
      title: 'Uzman Ekip',
      description: '53 yıllık deneyimli usta ekibimiz'
    },
    {
      icon: Clock,
      title: 'Hızlı Teslimat',
      description: '15 gün içinde üretim ve teslimat'
    },
    {
      icon: CheckCircle,
      title: 'Özel Tasarım',
      description: 'İhtiyaçlarınıza özel tasarım hizmeti'
    }
  ]

  return (
    <section className="py-16 bg-background-secondary dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-primary dark:text-white mb-4">
                53 Yıllık Deneyim,
                <span className="block text-accent">Sonsuz Kalite</span>
              </h2>
              <p className="text-lg text-text-secondary dark:text-gray-300 leading-relaxed">
                1972 yılından bu yana mobilya sektöründe faaliyet gösteren Hüsnü Usta Mobilya, 
                kaliteli ahşap işçiliği ve özel tasarımlarıyla binlerce eve dokunmuştur. 
                Her mobilyamız özenle seçilmiş malzemeler ve usta elleriyle üretilir.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary dark:text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-text-secondary dark:text-gray-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Link
                href="/about"
                className="inline-flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <span>Hikayemizi Keşfet</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
              <img
                src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=experienced%20furniture%20craftsman%20working%20in%20traditional%20woodworking%20workshop%20with%20quality%20wooden%20furniture%20pieces&image_size=portrait_4_3"
                alt="Hüsnü Usta Mobilya Atölyesi"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">5000+</div>
                <div className="text-sm text-text-secondary dark:text-gray-300">Mutlu Müşteri</div>
              </div>
            </div>

            <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">53</div>
                <div className="text-sm text-text-secondary dark:text-gray-300">Yıl Deneyim</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}