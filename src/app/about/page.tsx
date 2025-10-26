import { Award, Users, Clock, Target, Eye, Heart, CheckCircle, Star } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: Award,
      title: 'Kalite',
      description: 'Her ürünümüzde en yüksek kalite standartlarını uyguluyoruz'
    },
    {
      icon: Heart,
      title: 'Müşteri Memnuniyeti',
      description: 'Müşterilerimizin memnuniyeti bizim en büyük önceliğimizdir'
    },
    {
      icon: CheckCircle,
      title: 'Güvenilirlik',
      description: '1972\'den beri 53 yıldır sürdürdüğümüz güven ve kalite anlayışımız'
    },
    {
      icon: Users,
      title: 'Ekip Çalışması',
      description: 'Deneyimli ve uzman ekibimizle en iyi hizmeti sunuyoruz'
    }
  ]

  const milestones = [
    {
      year: '1972',
      title: 'Kuruluş',
      description: 'Hüsnü Usta Mobilya, küçük bir atölyede kuruldu'
    },
    {
      year: '1985',
      title: 'İlk Büyük Atölye',
      description: 'Daha büyük atölyeye taşınma ve üretim kapasitesinin artırılması'
    },
    {
      year: '1995',
      title: 'İlk Showroom',
      description: 'İlk showroom açılışı ve müşteri portföyünün genişlemesi'
    },
    {
      year: '2005',
      title: 'Teknoloji Yatırımı',
      description: 'Modern üretim teknolojilerine yatırım ve kapasite artışı'
    },
    {
      year: '2015',
      title: 'Dijital Dönüşüm',
      description: 'Online satış platformu ve dijital hizmetlerin başlatılması'
    },
    {
      year: '2025',
      title: 'Sürdürülebilirlik',
      description: 'Çevre dostu üretim süreçleri ve sürdürülebilir malzemeler'
    }
  ]

  const stats = [
    { number: '53+', label: 'Yıl Deneyim' },
    { number: '5000+', label: 'Mutlu Müşteri' },
    { number: '15000+', label: 'Tamamlanan Proje' },
    { number: '50+', label: 'Uzman Çalışan' }
  ]

  return (
    <div className="min-h-screen bg-background-primary dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-text-primary dark:text-white mb-6">
              Hakkımızda
            </h1>
            <p className="text-xl text-text-secondary dark:text-gray-300 leading-relaxed">
              1972'den beri 53 yıldır mobilya sektöründe faaliyet gösteren Hüsnü Usta Mobilya, 
              kaliteli ahşap işçiliği ve özel tasarımlarıyla binlerce eve dokunmuştur.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-primary dark:text-white">
                Hikayemiz
              </h2>
              <div className="space-y-4 text-text-secondary dark:text-gray-300 leading-relaxed">
                <p>
                  1972 yılında Hüsnü Usta tarafından kurulan firmamız, küçük bir atölyede 
                  başladığı yolculuğunda bugün Türkiye'nin önde gelen mobilya üreticilerinden 
                  biri haline gelmiştir.
                </p>
                <p>
                  Kaliteli ahşap işçiliği ve müşteri memnuniyeti odaklı yaklaşımımızla, 
                  her geçen gün büyüyen müşteri portföyümüze hizmet vermeye devam ediyoruz.
                </p>
                <p>
                  Geleneksel el sanatlarını modern tasarım anlayışıyla birleştirerek, 
                  evinizin her köşesine uygun mobilya çözümleri sunuyoruz.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=traditional%20Turkish%20furniture%20workshop%20with%20skilled%20craftsmen%20working%20on%20wooden%20furniture%20pieces&image_size=landscape_4_3"
                  alt="Hüsnü Usta Mobilya Atölyesi"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-background-secondary dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="text-center p-8 bg-white dark:bg-gray-700 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-text-primary dark:text-white mb-4">
                Misyonumuz
              </h3>
              <p className="text-text-secondary dark:text-gray-300 leading-relaxed">
                Kaliteli ahşap işçiliği ve özel tasarımlarla müşterilerimizin hayallerindeki 
                yaşam alanlarını oluşturmak, geleneksel el sanatlarını modern tasarım anlayışıyla 
                birleştirerek eşsiz mobilya çözümleri sunmak.
              </p>
            </div>

            {/* Vision */}
            <div className="text-center p-8 bg-white dark:bg-gray-700 rounded-xl shadow-lg">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-text-primary dark:text-white mb-4">
                Vizyonumuz
              </h3>
              <p className="text-text-secondary dark:text-gray-300 leading-relaxed">
                Türkiye'nin en güvenilir ve tercih edilen mobilya markası olmak, 
                sürdürülebilir üretim anlayışıyla çevreye duyarlı, kaliteli ve 
                estetik mobilyalar üreterek sektörde öncü konumda yer almak.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-primary dark:text-white mb-4">
              Değerlerimiz
            </h2>
            <p className="text-lg text-text-secondary dark:text-gray-300 max-w-2xl mx-auto">
              İş yapış şeklimizi ve müşteri ilişkilerimizi şekillendiren temel değerlerimiz
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary dark:text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-text-secondary dark:text-gray-300 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-background-secondary dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-primary dark:text-white mb-4">
              Tarihçemiz
            </h2>
            <p className="text-lg text-text-secondary dark:text-gray-300 max-w-2xl mx-auto">
              53 yıllık yolculuğumuzda önemli dönüm noktaları
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-accent/20"></div>

              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}>
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-lg">
                      <div className="text-2xl font-bold text-accent mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="text-xl font-semibold text-text-primary dark:text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-text-secondary dark:text-gray-300">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-white dark:border-gray-900"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-accent mb-2">
                  {stat.number}
                </div>
                <div className="text-text-secondary dark:text-gray-300 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-background-secondary dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-primary dark:text-white mb-4">
              Kurucumuz
            </h2>
            <p className="text-lg text-text-secondary dark:text-gray-300 max-w-2xl mx-auto">
              53 yıllık deneyimi ile geleneksel ahşap işçiliğinin ustası
            </p>
          </div>

          <div className="flex justify-center">
            <div className="text-center bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg max-w-md">
              <div className="w-32 h-32 bg-gradient-to-br from-accent to-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-3xl">Hİ</span>
              </div>
              <h3 className="text-2xl font-semibold text-text-primary dark:text-white mb-3">
                Hüsnü Işıkaş
              </h3>
              <p className="text-accent font-medium mb-4 text-lg">Kurucu & Usta</p>
              <p className="text-text-secondary dark:text-gray-300 leading-relaxed">
                1972'den beri 53 yıllık deneyimi ile geleneksel ahşap işçiliğinin ustası. 
                Her mobilyayı özenle tasarlayıp, el emeği göz nuru ile üretiyor. 
                Kalite ve müşteri memnuniyeti odaklı çalışma anlayışı ile 
                İzmir'in en güvenilir mobilya ustalarından biri.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-primary dark:text-white">
                Kalite Anlayışımız
              </h2>
              <p className="text-lg text-text-secondary dark:text-gray-300 leading-relaxed">
                Her ürünümüzde en yüksek kalite standartlarını uyguluyoruz. 
                Yüksek kaliteli ahşap malzemeler, çevre dostu vernikler ve 
                titiz işçilik anlayışımızla uzun ömürlü mobilyalar üretiyoruz.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-accent" />
                  <span className="text-text-primary dark:text-white">
                    Yüksek kaliteli ahşap malzeme seçimi
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-accent" />
                  <span className="text-text-primary dark:text-white">
                    Çevre dostu vernik ve boyalar
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-accent" />
                  <span className="text-text-primary dark:text-white">
                    Titiz kalite kontrol süreçleri
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-accent" />
                  <span className="text-text-primary dark:text-white">
                    5 yıl kalite garantisi
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=quality%20control%20process%20in%20furniture%20manufacturing%20with%20attention%20to%20detail%20and%20craftsmanship&image_size=landscape_4_3"
                  alt="Kalite Kontrol Süreci"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}