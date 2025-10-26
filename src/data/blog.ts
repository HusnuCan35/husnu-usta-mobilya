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

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Modern Mobilya Trendleri 2024',
    slug: 'modern-mobilya-trendleri-2024',
    excerpt: '2024 yılında mobilya dünyasında öne çıkan trendleri ve modern yaşam alanları için en uygun tasarım önerilerini keşfedin.',
    content: `2024 yılı mobilya dünyasında birçok yenilik ve trend getiriyor. Modern yaşam alanları için en uygun tasarım önerilerini bu yazımızda bulabilirsiniz.

Minimalist tasarımlar bu yıl da popülerliğini koruyor. Sade çizgiler, işlevsellik ve kaliteli malzemeler modern mobilyanın temel taşları olmaya devam ediyor.

Doğal ahşap dokular ve organik formlar, evlerimizde doğayla bağlantı kurma isteğimizi karşılıyor. Özellikle meşe, ceviz ve akçaağaç gibi sert ahşaplar tercih ediliyor.

Sürdürülebilir mobilya üretimi de 2024'ün önemli trendlerinden biri. Geri dönüştürülmüş malzemeler ve çevre dostu üretim yöntemleri önem kazanıyor.

Çok fonksiyonlu mobilyalar, özellikle küçük yaşam alanları için ideal çözümler sunuyor. Açılır kapanır masalar, modüler koltuk takımları ve gizli depolama alanları bu kategoride öne çıkıyor.`,
    author: 'Hüsnü Usta',
    publishDate: '15 Mart 2024',
    featuredImage: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20minimalist%20furniture%20showroom%20with%20natural%20wood%20textures%20and%20clean%20lines&image_size=landscape_16_9',
    tags: ['Modern Tasarım', 'Trendler', 'Minimalizm', 'Doğal Ahşap'],
    readTime: 5
  },
  {
    id: '2',
    title: 'Ahşap Mobilya Bakım Rehberi',
    slug: 'ahsap-mobilya-bakim-rehberi',
    excerpt: 'Ahşap mobilyalarınızın uzun yıllar boyunca güzelliğini koruması için gerekli bakım ipuçları ve öneriler.',
    content: `Ahşap mobilyalar doğru bakım ile yıllarca güzelliğini koruyabilir. Bu rehberde ahşap mobilya bakımının inceliklerini öğreneceksiniz.

Düzenli temizlik ahşap mobilya bakımının temelidir. Haftalık olarak yumuşak, kuru bir bezle tozları alın. Nemli bez kullanırken fazla su kullanmamaya dikkat edin.

Ahşap yüzeyleri korumak için kaliteli ahşap cilası kullanın. Yılda 2-3 kez cila uygulaması yeterlidir. Cila öncesi yüzeyin temiz ve kuru olduğundan emin olun.

Direkt güneş ışığından koruyun. Uzun süre güneş ışığına maruz kalan ahşap yüzeyler renk değiştirebilir ve çatlayabilir.

Nem kontrolü çok önemlidir. Çok kuru veya çok nemli ortamlar ahşabın şekil değiştirmesine neden olabilir. İdeal nem oranı %45-55 arasındadır.

Sıcak nesneleri direkt ahşap yüzeye koymayın. Altlık kullanarak yüzeyi koruyun. Su halkaları oluşmasını önlemek için bardak altlıkları kullanın.`,
    author: 'Mehmet Çelik',
    publishDate: '8 Mart 2024',
    featuredImage: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=wooden%20furniture%20care%20and%20maintenance%20with%20cleaning%20supplies%20and%20polish&image_size=landscape_16_9',
    tags: ['Bakım', 'Ahşap', 'Temizlik', 'Koruma'],
    readTime: 7
  },
  {
    id: '3',
    title: 'Küçük Alanlar İçin Mobilya Seçimi',
    slug: 'kucuk-alanlar-icin-mobilya-secimi',
    excerpt: 'Küçük yaşam alanlarını maksimum verimlilikle kullanmak için akıllı mobilya seçim önerileri.',
    content: `Küçük yaşam alanları doğru mobilya seçimi ile çok daha işlevsel hale getirilebilir. Bu yazımızda küçük alanlar için en uygun mobilya seçim ipuçlarını paylaşıyoruz.

Çok fonksiyonlu mobilyalar küçük alanların kurtarıcısıdır. Açılır kapanır masalar, yatak olabilen koltuklar ve depolama alanı olan pufllar alan tasarrufu sağlar.

Dikey alanları değerlendirin. Yüksek kitaplıklar, duvara monte raflar ve asma dolaplar zemin alanını işgal etmeden depolama imkanı sunar.

Açık renkli mobilyalar alanı daha geniş gösterir. Beyaz, krem ve açık ahşap tonları küçük alanlar için ideal seçimlerdir.

Şeffaf ve cam mobilyalar görsel ağırlık yaratmaz. Cam masalar, şeffaf sandalyeler ve akrilik aksesuarlar alanı havadar gösterir.

Modüler sistemler esneklik sağlar. İhtiyaca göre yeniden düzenlenebilen modüler koltuk takımları ve raf sistemleri küçük alanlar için mükemmeldir.

Aynalar alanı iki katına çıkarır. Büyük aynalar veya aynalı mobilyalar küçük alanları çok daha geniş gösterir.`,
    author: 'Ayşe Demir',
    publishDate: '1 Mart 2024',
    featuredImage: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=small%20apartment%20with%20space%20saving%20multifunctional%20furniture%20and%20smart%20storage%20solutions&image_size=landscape_16_9',
    tags: ['Küçük Alan', 'Fonksiyonel', 'Depolama', 'Tasarruf'],
    readTime: 6
  },
  {
    id: '4',
    title: 'Özel Tasarım Mobilya Süreci',
    slug: 'ozel-tasarim-mobilya-sureci',
    excerpt: 'Hayalinizdeki mobilyayı gerçeğe dönüştürme sürecinde neler yaşanır? Özel tasarım mobilya üretim aşamalarını keşfedin.',
    content: `Özel tasarım mobilya üretimi, hayalinizdeki mobilyayı gerçeğe dönüştürme sanatıdır. Bu süreçte hangi aşamalardan geçildiğini merak ediyorsanız, doğru yerdesiniz.

İlk aşama konsept geliştirmedir. Müşterinin ihtiyaçları, beğenileri ve yaşam tarzı analiz edilir. Ölçüler alınır ve ilk eskizler çizilir.

Tasarım aşamasında detaylı çizimler hazırlanır. 3D modelleme ile mobilyanın son hali görselleştirilir. Müşteri onayı alındıktan sonra üretim aşamasına geçilir.

Malzeme seçimi kritik öneme sahiptir. Ahşap türü, renk, doku ve dayanıklılık faktörleri göz önünde bulundurulur. Kaliteli malzeme kullanımı ürünün ömrünü uzatır.

Üretim aşamasında usta ellerin deneyimi devreye girer. Geleneksel ahşap işçiliği teknikleri modern araçlarla birleşir. Her detay özenle işlenir.

Kalite kontrol sürecinde ürün titizlikle incelenir. Ölçü kontrolü, yüzey kalitesi ve işçilik standartları kontrol edilir.

Son aşama montaj ve teslimdır. Ürün müşterinin adresine özenle taşınır ve profesyonel ekip tarafından monte edilir.`,
    author: 'Hüsnü Usta',
    publishDate: '22 Şubat 2024',
    featuredImage: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=custom%20furniture%20design%20process%20workshop%20with%20craftsman%20working%20on%20wooden%20furniture&image_size=landscape_16_9',
    tags: ['Özel Tasarım', 'Üretim', 'Süreç', 'Kalite'],
    readTime: 8
  }
]