import { Product, ProductCategory } from '@/types'

export const categories: ProductCategory[] = [
  {
    id: 'yatak-odasi',
    name: 'Yatak Odası',
    slug: 'yatak-odasi',
    description: 'Modern ve klasik yatak odası takımları',
    icon: 'bed',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20bedroom%20furniture%20category&image_size=landscape_4_3',
    productCount: 1,
    sort_order: 1
  },
  {
    id: 'salon',
    name: 'Salon Takımı',
    slug: 'salon',
    description: 'Şık ve konforlu salon mobilyaları',
    icon: 'sofa',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20living%20room%20furniture%20category&image_size=landscape_4_3',
    productCount: 1,
    sort_order: 2
  },
  {
    id: 'mutfak',
    name: 'Mutfak',
    slug: 'mutfak',
    description: 'Fonksiyonel mutfak mobilyaları',
    icon: 'chef-hat',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20kitchen%20furniture%20category&image_size=landscape_4_3',
    productCount: 1,
    sort_order: 3
  }
]

export const products: Product[] = [
  {
    id: 'yatak-odasi-takimi-1',
    name: 'Modern Yatak Odası Takımı',
    description: 'Minimalist tasarım anlayışıyla üretilen modern yatak odası takımı. Kaliteli MDF malzeme ve şık ceviz rengi ile yatak odanıza zarif bir görünüm kazandırır.',
    category: categories[0],
    featured_image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20bedroom%20furniture%20set%20with%20walnut%20finish%20minimalist%20design&image_size=landscape_4_3',
    images: [
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20bedroom%20furniture%20set%20with%20walnut%20finish%20minimalist%20design&image_size=landscape_4_3',
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=bedroom%20wardrobe%20with%20sliding%20doors%20modern%20design&image_size=landscape_4_3'
    ],
    price: 15000,
    discountedPrice: 12750,
    discount: 15,
    rating: 4.8,
    reviewCount: 24,
    inStock: true,
    features: ['Yatak', 'Komodin (2 adet)', 'Şifonyer', 'Ayna'],
    dimensions: {
      width: 200,
      height: 220,
      depth: 60
    },
    material: 'MDF + Ceviz Kaplama',
    color: 'Ceviz',
    weight: 180,
    warranty: 5,
    tags: ['modern', 'yatak-odası', 'takım'],
    createdAt: '2024-01-15',
    updatedAt: '2024-03-01'
  },
  {
    id: 'salon-takimi-1',
    name: 'Lüks Salon Takımı',
    description: 'Konforlu ve şık tasarımıyla öne çıkan salon takımı. Yüksek kaliteli kumaş döşeme ve sağlam ahşap iskelet yapısı.',
    category: categories[1],
    featured_image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20living%20room%20furniture%20set%20with%20sofa%20and%20armchairs&image_size=landscape_4_3',
    images: [
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20living%20room%20furniture%20set%20with%20sofa%20and%20armchairs&image_size=landscape_4_3',
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20coffee%20table%20with%20wooden%20finish&image_size=landscape_4_3'
    ],
    price: 25000,
    rating: 4.9,
    reviewCount: 18,
    inStock: true,
    features: ['3\'lü Koltuk', '2\'li Koltuk', 'Berjer', 'Sehpa'],
    dimensions: {
      width: 250,
      height: 85,
      depth: 95
    },
    material: 'Ahşap İskelet + Kumaş Döşeme',
    color: 'Bej',
    weight: 120,
    warranty: 3,
    tags: ['lüks', 'salon', 'takım'],
    createdAt: '2024-01-20',
    updatedAt: '2024-02-28'
  },
  {
    id: 'mutfak-dolabi-1',
    name: 'Modern Mutfak Dolabı',
    description: 'Fonksiyonel ve estetik mutfak dolabı. Su geçirmez malzeme ve geniş depolama alanı.',
    category: categories[2],
    featured_image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20kitchen%20cabinet%20with%20white%20finish%20and%20handles&image_size=landscape_4_3',
    images: [
      'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20kitchen%20cabinet%20with%20white%20finish%20and%20handles&image_size=landscape_4_3'
    ],
    price: 8500,
    rating: 4.7,
    reviewCount: 32,
    inStock: true,
    features: ['Alt Dolap', 'Üst Dolap', 'Çekmeceler', 'Soft Close'],
    dimensions: {
      width: 300,
      height: 240,
      depth: 60
    },
    material: 'Laminant + MDF',
    color: 'Beyaz',
    weight: 85,
    warranty: 2,
    tags: ['mutfak', 'dolap', 'modern'],
    createdAt: '2024-02-01',
    updatedAt: '2024-03-05'
  }
]