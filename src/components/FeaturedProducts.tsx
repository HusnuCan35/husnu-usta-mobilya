import Link from 'next/link'
import { Star, Heart, ShoppingCart } from 'lucide-react'
import { products } from '@/data/products'

export function FeaturedProducts() {
  // Get first 6 products as featured
  const featuredProducts = products.slice(0, 6)

  return (
    <section className="py-16 bg-background-primary dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-primary dark:text-white mb-4">
            Öne Çıkan Ürünler
          </h2>
          <p className="text-lg text-text-secondary dark:text-gray-300 max-w-2xl mx-auto">
            En çok tercih edilen ve beğenilen mobilya koleksiyonumuzdan seçmeler
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Product Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay Actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <Link
                    href={`/products/${product.id}`}
                    className="px-6 py-2 bg-accent hover:bg-accent/90 text-white rounded-lg font-medium transition-colors"
                  >
                    Detayları Gör
                  </Link>
                  <a
                    href="https://wa.me/905555555555"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                  >
                    İletişim
                  </a>
                </div>

                {/* Handcrafted Badge */}
                <div className="absolute top-4 left-4 bg-amber-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                  El İşçiliği
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-accent font-medium">
                    {product.category.name}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {product.rating}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-text-primary dark:text-white mb-2 line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-sm text-text-secondary dark:text-gray-300 mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Contact for Price */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-accent">
                    Fiyat için iletişime geçin
                  </span>

                  <Link
                    href={`/products/${product.id}`}
                    className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                  >
                    İncele →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <span>Tüm Ürünleri Görüntüle</span>
            <ShoppingCart className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}