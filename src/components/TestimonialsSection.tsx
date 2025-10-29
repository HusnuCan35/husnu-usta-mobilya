'use client'

import { useState, useEffect } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { testimonials as defaultTestimonials } from '@/data/testimonials'
import { getComments } from '@/lib/actions'

interface ApiTestimonial {
  id: string
  name: string
  location: string
  rating: number
  comment: string
  date: string
  project: string
  approved: boolean
}

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [testimonials, setTestimonials] = useState(defaultTestimonials)
  const [isLoading, setIsLoading] = useState(true)

  // Load testimonials from server action
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const result = await getComments()
        
        if (result.success && result.data && Array.isArray(result.data)) {
          // Server action'dan gelen verileri component formatına çevir
          const apiTestimonials = result.data
            .filter((item: ApiTestimonial) => item.approved)
            .map((item: ApiTestimonial) => ({
              id: parseInt(item.id),
              name: item.name,
              role: 'Müşteri',
              content: item.comment,
              rating: item.rating,
              image: `https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20a%20happy%20Turkish%20person&image_size=square`,
              location: item.location
            }))
          
          if (apiTestimonials.length > 0) {
            setTestimonials(apiTestimonials)
          }
        }
      } catch (error) {
        console.error('Yorumlar yüklenirken hata:', error)
        // Hata durumunda varsayılan yorumları kullan
      } finally {
        setIsLoading(false)
      }
    }

    loadTestimonials()
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
  }

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(nextTestimonial, 6000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ))
  }

  if (isLoading) {
    return (
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Müşteri Yorumları
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Memnun müşterilerimizin deneyimleri
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl p-8 animate-pulse">
              <div className="h-6 bg-gray-200 dark:bg-gray-600 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (testimonials.length === 0) {
    return null
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Müşteri Yorumları
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            50 yılı aşkın deneyimimizle binlerce memnun müşteriye hizmet verdik
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main Testimonial Card */}
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 md:p-12 shadow-lg">
              {/* Quote Icon */}
              <div className="flex justify-center mb-6">
                <Quote className="w-12 h-12 text-accent opacity-50" />
              </div>

              {/* Testimonial Content */}
              <div className="text-center">
                <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  "{currentTestimonial.content}"
                </blockquote>

                {/* Rating */}
                <div className="flex justify-center mb-6">
                  {renderStars(currentTestimonial.rating)}
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-center space-x-4">
                  <img
                    src={currentTestimonial.image}
                    alt={currentTestimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-lg"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {currentTestimonial.name}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {currentTestimonial.role}
                    </p>
                    {currentTestimonial.location && (
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        {currentTestimonial.location}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            {testimonials.length > 1 && (
              <>
                <button
                  onClick={prevTestimonial}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                  aria-label="Önceki yorum"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                
                <button
                  onClick={nextTestimonial}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 text-gray-800 dark:text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                  aria-label="Sonraki yorum"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Dots Indicator */}
          {testimonials.length > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-accent scale-125'
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-accent hover:scale-110'
                  }`}
                  aria-label={`${index + 1}. yoruma git`}
                />
              ))}
            </div>
          )}

          {/* Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">1000+</div>
              <div className="text-gray-600 dark:text-gray-400">Memnun Müşteri</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-400">Yıl Deneyim</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">4.9</div>
              <div className="text-gray-600 dark:text-gray-400">Ortalama Puan</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}