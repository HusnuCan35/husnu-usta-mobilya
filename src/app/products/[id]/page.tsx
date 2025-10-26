'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Star, Heart, ShoppingCart, ArrowLeft, Truck, Shield, Award, Phone } from 'lucide-react'
import { products } from '@/data/products'


export default function ProductDetailPage() {
  const params = useParams()
  const productId = params?.id as string
  
  const product = products.find(p => p.id === productId)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="min-h-screen bg-background-primary dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primary dark:text-white mb-4">
            Ürün bulunamadı
          </h1>
          <Link
            href="/products"
            className="text-accent hover:text-accent/80 font-medium"
          >
            Ürünlere geri dön
          </Link>
        </div>
      </div>
    )
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <div className="min-h-screen bg-background-primary dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-text-secondary dark:text-gray-300 mb-8">
          <Link href="/" className="hover:text-accent">Ana Sayfa</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-accent">Ürünler</Link>
          <span>/</span>
          <span className="text-text-primary dark:text-white">{product.name}</span>
        </div>

        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center space-x-2 text-accent hover:text-accent/80 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ürünlere Geri Dön</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index
                      ? 'border-accent'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category & Rating */}
            <div className="flex items-center justify-between">
              <span className="text-accent font-medium">{product.category.name}</span>
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="text-text-primary dark:text-white font-medium">
                  {product.rating}
                </span>
                <span className="text-text-secondary dark:text-gray-300">
                  (127 değerlendirme)
                </span>
              </div>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-text-primary dark:text-white">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center space-x-4">
              {product.discount ? (
                <>
                  <span className="text-3xl font-bold text-accent">
                    ₺{product.discountedPrice?.toLocaleString()}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ₺{product.price.toLocaleString()}
                  </span>
                  <span className="bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                    %{product.discount} İndirim
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-accent">
                  ₺{product.price.toLocaleString()}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-lg text-text-secondary dark:text-gray-300 leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-text-primary dark:text-white">
                Ürün Özellikleri:
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-text-secondary dark:text-gray-300">
                    Yüksek kaliteli ahşap malzeme
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-text-secondary dark:text-gray-300">
                    Çevre dostu vernikler
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-text-secondary dark:text-gray-300">
                    5 yıl kalite garantisi
                  </span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-text-secondary dark:text-gray-300">
                    Ücretsiz montaj hizmeti
                  </span>
                </li>
              </ul>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-text-primary dark:text-white font-medium">
                  Adet:
                </label>
                <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-text-primary dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Sepete Ekle</span>
                </button>
                <button className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 hover:border-accent dark:hover:border-accent text-text-primary dark:text-white rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>Favorilere Ekle</span>
                </button>
              </div>
            </div>

            {/* Contact for Custom Order */}
            <div className="bg-accent/10 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-6 h-6 text-accent" />
                <div>
                  <h4 className="font-semibold text-text-primary dark:text-white">
                    Özel Sipariş
                  </h4>
                  <p className="text-sm text-text-secondary dark:text-gray-300">
                    Farklı ölçü ve renk seçenekleri için bizi arayın
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 mb-16">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-semibold text-text-primary dark:text-white mb-2">
              Ücretsiz Kargo
            </h3>
            <p className="text-sm text-text-secondary dark:text-gray-300">
              Tüm siparişlerde ücretsiz kargo ve montaj hizmeti
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-semibold text-text-primary dark:text-white mb-2">
              5 Yıl Garanti
            </h3>
            <p className="text-sm text-text-secondary dark:text-gray-300">
              Tüm ürünlerimizde 5 yıl kalite garantisi
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-semibold text-text-primary dark:text-white mb-2">
              Kaliteli Malzeme
            </h3>
            <p className="text-sm text-text-secondary dark:text-gray-300">
              Yüksek kaliteli ahşap ve çevre dostu malzemeler
            </p>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-text-primary dark:text-white mb-8">
              Benzer Ürünler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={relatedProduct.images[0]}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-text-primary dark:text-white mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-accent">
                        ₺{relatedProduct.price.toLocaleString()}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {relatedProduct.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}