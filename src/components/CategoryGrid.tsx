import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { categories } from '@/data/products'

export function CategoryGrid() {
  return (
    <section className="py-16 bg-background-secondary dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-primary dark:text-white mb-4">
            Ürün Kategorilerimiz
          </h2>
          <p className="text-lg text-text-secondary dark:text-gray-300 max-w-2xl mx-auto">
            Her odanız için özel tasarlanmış kaliteli mobilya seçeneklerimizi keşfedin
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Category Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>

              {/* Category Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-200 mb-3 line-clamp-2">
                  {category.description}
                </p>
                <div className="flex items-center space-x-2 text-accent">
                  <span className="text-sm font-medium">Ürünleri Gör</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Product Count Badge */}
              <div className="absolute top-4 right-4 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full">
                {category.productCount} Ürün
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center space-x-2 bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
          >
            <span>Tüm Ürünleri Görüntüle</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}