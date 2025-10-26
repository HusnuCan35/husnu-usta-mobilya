'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const galleryImages = [
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

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1)
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <section id="foto-galeri" className="py-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Foto Galeri
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            El işçiliği ile üretilen mobilyalarımızdan örnekler
          </p>
        </div>

        {/* Carousel Container */}
        <div 
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Image Display */}
          <div className="relative h-[500px] md:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <div 
              className="flex transition-transform duration-700 ease-in-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {galleryImages.map((image, index) => (
                <div key={index} className="w-full h-full flex-shrink-0 relative">
                  <img
                    src={image}
                    alt={`Mobilya galeri ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/10 hover:bg-black/5 transition-colors duration-300" />
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 text-gray-800 dark:text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              aria-label="Önceki resim"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 text-gray-800 dark:text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 backdrop-blur-sm"
              aria-label="Sonraki resim"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-amber-600 scale-125'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`${index + 1}. resme git`}
              />
            ))}
          </div>

          {/* Thumbnail Preview */}
          <div className="mt-8 hidden md:block">
            <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
              {galleryImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                    index === currentIndex
                      ? 'ring-4 ring-amber-500 scale-105'
                      : 'opacity-70 hover:opacity-100'
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
          </div>
        </div>

        {/* Gallery Stats */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-8 bg-white dark:bg-gray-800 rounded-2xl px-8 py-4 shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">{galleryImages.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Fotoğraf</div>
            </div>
            <div className="w-px h-8 bg-gray-200 dark:bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">El İşçiliği</div>
            </div>
            <div className="w-px h-8 bg-gray-200 dark:bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-600">53+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Yıl Tecrübe</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}