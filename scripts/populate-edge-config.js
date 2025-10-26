const fs = require('fs');
const path = require('path');

// Gerçek site ayarları
const siteSettings = {
  siteName: "Hüsnü Usta Mobilya",
  siteDescription: "İzmir'de kaliteli mobilya ve ahşap işçiliği. Özel tasarım mobilyalar, mutfak dolapları, yatak odası takımları ve daha fazlası.",
  contactInfo: {
    phone: "+90 232 123 45 67",
    email: "info@husnuustamobilya.com",
    address: "Konak, İzmir, Türkiye",
    workingHours: "Pazartesi - Cumartesi: 09:00 - 18:00"
  },
  socialMedia: {
    instagram: "https://instagram.com/husnuustamobilya",
    facebook: "https://facebook.com/husnuustamobilya",
    whatsapp: "+90 532 123 45 67"
  },
  seo: {
    keywords: "mobilya, ahşap, İzmir, özel tasarım, mutfak dolabı, yatak odası",
    author: "Hüsnü Usta Mobilya"
  }
};

// Gerçek galeri verileri (public/images klasöründeki fotoğraflar)
const galleryImages = [
  {
    id: "1",
    src: "/images/izmir_agac_dunyasi_001_8446a002.jpg",
    alt: "Özel tasarım mutfak dolabı",
    title: "Modern Mutfak Dolabı",
    category: "mutfak",
    description: "Özel tasarım modern mutfak dolabı, kaliteli ahşap malzeme"
  },
  {
    id: "2", 
    src: "/images/izmir_agac_dunyasi_002_4dae58b2.jpg",
    alt: "Ahşap yatak odası takımı",
    title: "Klasik Yatak Odası",
    category: "yatak-odasi",
    description: "Klasik tarzda ahşap yatak odası takımı"
  },
  {
    id: "3",
    src: "/images/izmir_agac_dunyasi_003_52ba9d26.jpg", 
    alt: "Özel tasarım gardırop",
    title: "Modern Gardırop",
    category: "yatak-odasi",
    description: "Geniş ve fonksiyonel modern gardırop tasarımı"
  },
  {
    id: "4",
    src: "/images/izmir_agac_dunyasi_004_e0db85bb.jpg",
    alt: "Salon mobilyası takımı",
    title: "Salon Takımı", 
    category: "salon",
    description: "Konforlu ve şık salon mobilyası takımı"
  },
  {
    id: "5",
    src: "/images/izmir_agac_dunyasi_005_15d10f7b.jpg",
    alt: "Ahşap masa sandalye takımı",
    title: "Yemek Masası Takımı",
    category: "yemek-odasi", 
    description: "Kaliteli ahşap yemek masası ve sandalye takımı"
  },
  {
    id: "6",
    src: "/images/izmir_agac_dunyasi_006_f2ef5f0f.jpg",
    alt: "Özel tasarım kitaplık",
    title: "Modern Kitaplık",
    category: "ofis",
    description: "Fonksiyonel ve estetik kitaplık tasarımı"
  },
  {
    id: "7",
    src: "/images/izmir_agac_dunyasi_007_2cf66a29.jpg",
    alt: "Ahşap çalışma masası",
    title: "Çalışma Masası",
    category: "ofis",
    description: "Ergonomik ahşap çalışma masası"
  },
  {
    id: "8",
    src: "/images/izmir_agac_dunyasi_008_eec18c62.jpg",
    alt: "Özel tasarım dolap",
    title: "Özel Dolap Tasarımı",
    category: "ozel-tasarim",
    description: "Müşteri isteğine göre özel tasarım dolap"
  },
  {
    id: "9",
    src: "/images/izmir_agac_dunyasi_009_9a9bf6e8.jpg",
    alt: "Ahşap banyo dolabı",
    title: "Banyo Dolabı",
    category: "banyo",
    description: "Su geçirmez ahşap banyo dolabı"
  },
  {
    id: "10",
    src: "/images/izmir_agac_dunyasi_010_ac9db25a.jpg",
    alt: "Klasik mobilya detayı",
    title: "Klasik Detay İşçiliği",
    category: "ozel-tasarim",
    description: "El işçiliği klasik mobilya detayları"
  },
  {
    id: "11",
    src: "/images/izmir_agac_dunyasi_011_a74d2af5.jpg",
    alt: "Modern mutfak tasarımı",
    title: "Modern Mutfak",
    category: "mutfak",
    description: "Çağdaş tasarım mutfak dolap sistemi"
  },
  {
    id: "12",
    src: "/images/izmir_agac_dunyasi_012_e8f61f98.jpg",
    alt: "Ahşap işçiliği örneği",
    title: "Kaliteli İşçilik",
    category: "ozel-tasarim", 
    description: "Usta işi ahşap işçiliği örneği"
  }
];

// Gerçek yorumlar
const testimonials = [
  {
    id: "1",
    name: "Ayşe Demir",
    location: "Konak, İzmir",
    rating: 5,
    comment: "Mutfak dolabımızı yaptırdık, işçilik ve kalite mükemmel. Hüsnü Usta'ya teşekkürler!",
    date: "2024-01-15",
    project: "Mutfak Dolabı",
    approved: true
  },
  {
    id: "2", 
    name: "Mehmet Kaya",
    location: "Bornova, İzmir",
    rating: 5,
    comment: "Yatak odası takımımız harika oldu. Zamanında teslim, kaliteli işçilik. Kesinlikle tavsiye ederim.",
    date: "2024-01-10",
    project: "Yatak Odası Takımı",
    approved: true
  },
  {
    id: "3",
    name: "Fatma Özkan", 
    location: "Karşıyaka, İzmir",
    rating: 5,
    comment: "Salon mobilyalarımızı yenilettik. Çok memnun kaldık, fiyat performans açısından çok iyi.",
    date: "2024-01-05",
    project: "Salon Mobilyası",
    approved: true
  },
  {
    id: "4",
    name: "Ali Yılmaz",
    location: "Alsancak, İzmir", 
    rating: 5,
    comment: "Özel tasarım gardırop için teşekkürler. Tam istediğimiz gibi oldu.",
    date: "2023-12-28",
    project: "Özel Gardırop",
    approved: true
  }
];

// Blog yazıları
const blogPosts = [
  {
    id: "1",
    title: "Ahşap Mobilya Bakımı İpuçları",
    slug: "ahsap-mobilya-bakimi-ipuclari",
    excerpt: "Ahşap mobilyalarınızın uzun yıllar dayanması için önemli bakım ipuçları.",
    content: "Ahşap mobilyalar doğru bakım ile yıllarca kullanılabilir...",
    author: "Hüsnü Usta",
    publishDate: "2024-01-20",
    category: "Bakım",
    tags: ["ahşap", "bakım", "mobilya"],
    featured: true
  },
  {
    id: "2",
    title: "2024 Mutfak Tasarım Trendleri", 
    slug: "2024-mutfak-tasarim-trendleri",
    excerpt: "Bu yıl mutfak tasarımında öne çıkan trendler ve renk seçimleri.",
    content: "2024 yılında mutfak tasarımında minimalizm ve doğal malzemeler...",
    author: "Hüsnü Usta",
    publishDate: "2024-01-18",
    category: "Tasarım",
    tags: ["mutfak", "tasarım", "trend"],
    featured: true
  },
  {
    id: "3",
    title: "Özel Tasarım Mobilya Süreci",
    slug: "ozel-tasarim-mobilya-sureci", 
    excerpt: "Özel tasarım mobilya siparişi nasıl verilir, süreç nasıl işler?",
    content: "Özel tasarım mobilya süreci müşteri görüşmesi ile başlar...",
    author: "Hüsnü Usta",
    publishDate: "2024-01-15",
    category: "Süreç",
    tags: ["özel tasarım", "süreç", "sipariş"],
    featured: false
  }
];

// Ürün kategorileri
const productCategories = [
  {
    id: "mutfak",
    name: "Mutfak Mobilyaları",
    description: "Modern ve klasik mutfak dolap sistemleri",
    image: "/images/izmir_agac_dunyasi_001_8446a002.jpg",
    products: ["Mutfak Dolabı", "Tezgah", "Dolap Kapağı", "Çekmece Sistemi"]
  },
  {
    id: "yatak-odasi", 
    name: "Yatak Odası",
    description: "Yatak odası takımları ve gardıroplar",
    image: "/images/izmir_agac_dunyasi_002_4dae58b2.jpg", 
    products: ["Yatak", "Gardırop", "Şifonyer", "Komodin"]
  },
  {
    id: "salon",
    name: "Salon Mobilyaları", 
    description: "Oturma grupları ve salon takımları",
    image: "/images/izmir_agac_dunyasi_004_e0db85bb.jpg",
    products: ["Koltuk Takımı", "Sehpa", "TV Ünitesi", "Vitrin"]
  },
  {
    id: "yemek-odasi",
    name: "Yemek Odası",
    description: "Yemek masaları ve sandalye takımları", 
    image: "/images/izmir_agac_dunyasi_005_15d10f7b.jpg",
    products: ["Yemek Masası", "Sandalye", "Büfe", "Vitrin"]
  },
  {
    id: "ofis",
    name: "Ofis Mobilyaları",
    description: "Çalışma masaları ve ofis dolapları",
    image: "/images/izmir_agac_dunyasi_006_f2ef5f0f.jpg",
    products: ["Çalışma Masası", "Kitaplık", "Dosya Dolabı", "Ofis Sandalyesi"]
  },
  {
    id: "banyo", 
    name: "Banyo Mobilyaları",
    description: "Su geçirmez banyo dolapları",
    image: "/images/izmir_agac_dunyasi_009_9a9bf6e8.jpg",
    products: ["Banyo Dolabı", "Ayna", "Lavabo Altı", "Banyo Rafı"]
  },
  {
    id: "ozel-tasarim",
    name: "Özel Tasarım",
    description: "Müşteri isteğine göre özel tasarım mobilyalar",
    image: "/images/izmir_agac_dunyasi_008_eec18c62.jpg", 
    products: ["Özel Dolap", "Özel Masa", "Özel Raf", "Özel Tasarım"]
  }
];

// Verileri Edge Config'e yükleme fonksiyonu
async function uploadToEdgeConfig() {
  const baseUrl = 'http://localhost:3000';
  
  const dataToUpload = [
    { key: 'site-settings', value: siteSettings },
    { key: 'gallery_photos', value: galleryImages },
    { key: 'testimonials', value: testimonials },
    { key: 'blog-posts', value: blogPosts },
    { key: 'product-categories', value: productCategories },
    { key: 'greeting', value: 'Hüsnü Usta Mobilya - Kaliteli Ahşap İşçiliği' }
  ];

  console.log('Edge Config\'e veriler yükleniyor...\n');

  for (const data of dataToUpload) {
    try {
      const response = await fetch(`${baseUrl}/api/edge-config/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      
      if (response.ok) {
        console.log(`✅ ${data.key}: Başarıyla yüklendi`);
      } else {
        console.log(`❌ ${data.key}: Hata - ${result.error}`);
      }
    } catch (error) {
      console.log(`❌ ${data.key}: Bağlantı hatası - ${error.message}`);
    }
  }

  console.log('\n🎉 Tüm veriler Edge Config\'e yüklenmeye çalışıldı!');
  console.log('Vercel dashboard\'dan Edge Config Items bölümünü kontrol edin.');
}

// Script çalıştırma
if (require.main === module) {
  uploadToEdgeConfig().catch(console.error);
}

module.exports = { uploadToEdgeConfig };