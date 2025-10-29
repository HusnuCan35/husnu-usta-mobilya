'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getGalleryImages } from '@/lib/actions'

interface GalleryImage {
  id: string
  src: string
  alt: string
  title: string
  category: string
}

const defaultGalleryImages = [
  '/images/izmir_agac_dunyasi_001_8446a002.jpg',
  '/images/izmir_agac_dunyasi_002_4dae58b2.jpg',
  '/images/izmir_agac_dunyasi_003_52ba9d26.jpg',
  '/images/izmir_agac_dunyasi_004_e0db85bb.jpg',
  '/images/izmir_agac_dunyasi_005_15d10f7b.jpg',
  '/images/izmir_agac_dunyasi_006_f2ef5f0f.jpg',
  '/images/izmir_agac_dunyasi_007_2cf66a29.jpg',
  '/images/izmir_agac_dunyasi_008_eec18c62.jpg',
  '/images/izmir_agac_dunyasi_009_9a9bf6e8.jpg',
  '/images/izmir_agac_dunyasi_010_ac9db25a.jpg',
  '/images/izmir_agac_dunyasi_011_a74d2af5.jpg',
  '/images/izmir_agac_dunyasi_012_e8f61f98.jpg',
]

export function PhotoGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [galleryImages, setGalleryImages] = useState<string[]>(defaultGalleryImages)
  const [isLoading, setIsLoading] = useState(true)

  // Load gallery images from server action
  useEffect(() => {
    const loadGalleryImages = async () => {
      try {
        const result = await getGalleryImages()
        
        if (result.success && result.data && Array.isArray(result.data)) {
          // Server action'dan gelen verileri string array'e çevir
          const imageUrls = result.data.map((img: GalleryImage) => img.src)
          setGalleryImages(imageUrls)
        } else {
          // Fallback olarak varsayılan resimleri kullan
          setGalleryImages(defaultGalleryImages)
        }
      } catch (error) {
        console.error('Galeri resimleri yüklenirken hata:', error)
        // Hata durumunda varsayılan resimleri kullan
        setGalleryImages(defaultGalleryImages)
      } finally {
        setIsLoading(false)
      }
    }

    loadGalleryImages()
  }, [])

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || galleryImages.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, galleryImages.length])

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (isLoading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Çalışmalarımız
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              50 yılı aşkın deneyimimizle ürettiğimiz kaliteli mobilyalardan örnekler
            </p>
          </div>
          <div className="relative max-w-6xl mx-auto">
            <div className="aspect-[16/9] bg-gray-200 dark:bg-gray-700 rounded-2xl animate-pulse flex items-center justify-center">
              <div className="text-gray-400 dark:text-gray-500">Galeri yükleniyor...</div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Çalışmalarımız
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            50 yılı aşkın deneyimimizle ürettiğimiz kaliteli mobilyalardan örnekler
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Main Image */}
          <div 
            className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <img
              src={galleryImages[currentIndex]}
              alt={`Galeri resmi ${currentIndex + 1}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
            
            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Önceki resim"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-3 rounded-full shadow-lg transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Sonraki resim"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {galleryImages.length}
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center mt-6 space-x-2 overflow-x-auto pb-2">
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === currentIndex
                    ? 'border-accent shadow-lg scale-110'
                    : 'border-gray-300 dark:border-gray-600 hover:border-accent hover:scale-105'
                }`}
              >
                <img
                  src={image}
                  alt={`Küçük resim ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-4 space-x-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-accent scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-accent hover:scale-110'
                }`}
                aria-label={`${index + 1}. resme git`}
              />
            ))}
          </div>
        </div>

        {/* Auto-play Control */}
        <div className="text-center mt-8">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-accent transition-colors duration-200"
          >
            {isAutoPlaying ? 'Otomatik geçişi durdur' : 'Otomatik geçişi başlat'}
          </button>
        </div>
      </div>
    </section>
  )
}