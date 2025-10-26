import { Product, ProductCategory } from '@/types'

export const categories: ProductCategory[] = [
  {
    id: 'yatak-odasi',
    name: 'Yatak Odası',
    slug: 'yatak-odasi',
    description: 'El işçiliği yatak odası takımları',
    icon: 'bed',
    image: '/images/izmir_agac_dunyasi_001_8446a002.jpg',
    productCount: 1,
    sort_order: 1
  },
  {
    id: 'salon',
    name: 'Salon Takımı',
    slug: 'salon',
    description: 'Geleneksel salon mobilyaları',
    icon: 'sofa',
    image: '/images/izmir_agac_dunyasi_005_15d10f7b.jpg',
    productCount: 1,
    sort_order: 2
  },
  {
    id: 'mutfak',
    name: 'Mutfak',
    slug: 'mutfak',
    description: 'El yapımı mutfak mobilyaları',
    icon: 'chef-hat',
    image: '/images/izmir_agac_dunyasi_009_9a9bf6e8.jpg',
    productCount: 1,
    sort_order: 3
  }
]

export const products: Product[] = [
  {
    id: 'yatak-odasi-takimi-1',
    name: 'El İşçiliği Yatak Odası Takımı',
    description: 'Geleneksel Türk ahşap işçiliği ile üretilen özel yatak odası takımı. Doğal masif ceviz ağacından el işçiliği ile hazırlanmış, her detayında ustalarımızın deneyimi görülür.',
    category: categories[0],
    featured_image: '/images/izmir_agac_dunyasi_001_8446a002.jpg',
    images: [
      '/images/izmir_agac_dunyasi_001_8446a002.jpg',
      '/images/izmir_agac_dunyasi_002_4dae58b2.jpg',
      '/images/izmir_agac_dunyasi_003_52ba9d26.jpg',
      '/images/izmir_agac_dunyasi_004_e0db85bb.jpg'
    ],
    contactForPrice: true,
    rating: 4.9,
    reviewCount: 28,
    inStock: true,
    features: ['Masif Ceviz Yatak', 'El İşçiliği Komodin (2 adet)', 'Geleneksel Şifonyer', 'Doğal Ahşap Ayna Çerçevesi'],
    dimensions: {
      width: 200,
      height: 220,
      depth: 60
    },
    material: 'Masif Ceviz Ağacı',
    color: 'Doğal Ceviz',
    weight: 220,
    warranty: 10,
    tags: ['el-işçiliği', 'yatak-odası', 'masif-ahşap', 'geleneksel'],
    createdAt: '2024-01-15',
    updatedAt: '2024-03-01'
  },
  {
    id: 'salon-takimi-1',
    name: 'Geleneksel Salon Takımı',
    description: 'Türk mobilya ustalarının el emeği ile hazırlanmış salon takımı. Doğal ahşap iskelet ve kaliteli kumaş döşeme ile konfor ve estetik bir arada.',
    category: categories[1],
    featured_image: '/images/izmir_agac_dunyasi_005_15d10f7b.jpg',
    images: [
      '/images/izmir_agac_dunyasi_005_15d10f7b.jpg',
      '/images/izmir_agac_dunyasi_006_f2ef5f0f.jpg',
      '/images/izmir_agac_dunyasi_007_2cf66a29.jpg',
      '/images/izmir_agac_dunyasi_008_eec18c62.jpg'
    ],
    contactForPrice: true,
    rating: 4.8,
    reviewCount: 22,
    inStock: true,
    features: ['El İşçiliği 3\'lü Koltuk', 'Masif Ahşap 2\'li Koltuk', 'Geleneksel Berjer', 'El Yapımı Sehpa'],
    dimensions: {
      width: 250,
      height: 85,
      depth: 95
    },
    material: 'Masif Ahşap İskelet + Doğal Kumaş',
    color: 'Doğal Ahşap + Bej Kumaş',
    weight: 150,
    warranty: 8,
    tags: ['geleneksel', 'salon', 'el-işçiliği', 'masif-ahşap'],
    createdAt: '2024-01-20',
    updatedAt: '2024-02-28'
  },
  {
    id: 'mutfak-dolabi-1',
    name: 'El Yapımı Mutfak Dolabı',
    description: 'Geleneksel ahşap işçiliği ile üretilen mutfak dolabı. Doğal ahşap malzeme ve özenli el işçiliği ile fonksiyonel ve estetik çözüm.',
    category: categories[2],
    featured_image: '/images/izmir_agac_dunyasi_009_9a9bf6e8.jpg',
    images: [
      '/images/izmir_agac_dunyasi_009_9a9bf6e8.jpg',
      '/images/izmir_agac_dunyasi_010_ac9db25a.jpg',
      '/images/izmir_agac_dunyasi_011_a74d2af5.jpg',
      '/images/izmir_agac_dunyasi_012_e8f61f98.jpg'
    ],
    contactForPrice: true,
    rating: 4.7,
    reviewCount: 35,
    inStock: true,
    features: ['El İşçiliği Alt Dolap', 'Masif Ahşap Üst Dolap', 'Geleneksel Çekmeceler', 'Doğal Ahşap Kapaklar'],
    dimensions: {
      width: 300,
      height: 240,
      depth: 60
    },
    material: 'Masif Ahşap',
    color: 'Doğal Ahşap',
    weight: 120,
    warranty: 7,
    tags: ['mutfak', 'el-yapımı', 'masif-ahşap', 'geleneksel'],
    createdAt: '2024-02-01',
    updatedAt: '2024-03-05'
  }
]