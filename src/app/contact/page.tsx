'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'

interface FormData {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  phone?: string
  subject?: string
  message?: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Ad Soyad gereklidir'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-posta gereklidir'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz'
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon numarası gereklidir'
    } else if (!/^[0-9\s\-\+\(\)]{10,}$/.test(formData.phone)) {
      newErrors.phone = 'Geçerli bir telefon numarası giriniz'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Konu gereklidir'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mesaj gereklidir'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Mesaj en az 10 karakter olmalıdır'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Create WhatsApp message
      const whatsappMessage = `Merhaba! Web sitesinden iletişim formu dolduruldu:

*Ad Soyad:* ${formData.name}
*E-posta:* ${formData.email}
*Telefon:* ${formData.phone}
*Konu:* ${formData.subject}
*Mesaj:* ${formData.message}`

      const encodedMessage = encodeURIComponent(whatsappMessage)
      const whatsappURL = `https://wa.me/905363555860?text=${encodedMessage}`
      
      // Open WhatsApp in new tab
      window.open(whatsappURL, '_blank')
      
      // Show success message
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Adres',
      content: 'Çınarlı, 1569. Sk. No:2\n35170 Konak/İzmir'
    },
    {
      icon: Phone,
      title: 'Telefon',
      content: '0536 355 58 60\nHalkapınar Metro Durağı Yakını'
    },
    {
      icon: Mail,
      title: 'E-posta',
      content: 'info@husnuustamobilya.com\nsatis@husnuustamobilya.com'
    },
    {
      icon: Clock,
      title: 'Çalışma Saatleri',
      content: 'Pazartesi - Cumartesi: 09:00 - 18:00\nPazar: 10:00 - 16:00'
    }
  ]

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background-primary dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-text-primary dark:text-white mb-4">
            Mesajınız Gönderildi!
          </h2>
          <p className="text-text-secondary dark:text-gray-300 mb-6">
            En kısa sürede size geri dönüş yapacağız.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Yeni Mesaj Gönder
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background-primary dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-text-primary dark:text-white mb-6">
              İletişim
            </h1>
            <p className="text-xl text-text-secondary dark:text-gray-300 leading-relaxed">
              Sorularınız, özel tasarım talepleriniz veya projeleriniz için bizimle iletişime geçin.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <info.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary dark:text-white mb-3">
                  {info.title}
                </h3>
                <p className="text-text-secondary dark:text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                  {info.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-background-secondary dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg">
              <h2 className="text-3xl font-serif font-bold text-text-primary dark:text-white mb-6">
                Bize Ulaşın
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-text-primary dark:text-white mb-2">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white ${
                        errors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'
                      }`}
                      placeholder="Adınız ve soyadınız"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-text-primary dark:text-white mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white ${
                        errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'
                      }`}
                      placeholder="Telefon numaranız"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-primary dark:text-white mb-2">
                    E-posta *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white ${
                      errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'
                    }`}
                    placeholder="E-posta adresiniz"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-text-primary dark:text-white mb-2">
                    Konu *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white ${
                      errors.subject ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'
                    }`}
                  >
                    <option value="">Konu seçiniz</option>
                    <option value="genel-bilgi">Genel Bilgi</option>
                    <option value="ozel-tasarim">Özel Tasarım</option>
                    <option value="fiyat-teklifi">Fiyat Teklifi</option>
                    <option value="satis-sonrasi">Satış Sonrası Hizmet</option>
                    <option value="sikayet">Şikayet</option>
                    <option value="diger">Diğer</option>
                  </select>
                  {errors.subject && (
                    <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-text-primary dark:text-white mb-2">
                    Mesaj *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent dark:bg-gray-600 dark:border-gray-500 dark:text-white resize-none ${
                      errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-500'
                    }`}
                    placeholder="Mesajınızı buraya yazın..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/90 disabled:bg-accent/50 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Gönderiliyor...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Mesaj Gönder</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-8">
              {/* Map */}
              <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-serif font-bold text-text-primary dark:text-white mb-6">
                  Konumumuz
                </h3>
                <div className="aspect-video bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3124.8!2d27.1428!3d38.4237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14bbd862a0e7c5a5%3A0x9e8b8e8b8e8b8e8b!2zw4fEsW5hcmzEsSwgMTU2OS4gU2suIE5vOjIsIDM1MTcwIEtvbmFrL8Swem1pciwgVMO8cmtpeWU!5e0!3m2!1str!2str!4v1640995200000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Hüsnü Usta Mobilya Konumu - Çınarlı, İzmir"
                  />
                </div>
                
                {/* Google Maps Link */}
                <div className="mt-4">
                  <a
                    href="https://share.google/0eTQl0ujdz4gQVX8F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 text-accent hover:text-accent/80 font-medium transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Google Maps'te Aç</span>
                  </a>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-serif font-bold text-text-primary dark:text-white mb-6">
                  Neden Bizi Tercih Etmelisiniz?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-text-primary dark:text-white">
                        Ücretsiz Keşif
                      </h4>
                      <p className="text-text-secondary dark:text-gray-300 text-sm">
                        Evinize gelerek ücretsiz ölçüm ve keşif hizmeti sunuyoruz
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-text-primary dark:text-white">
                        Özel Tasarım
                      </h4>
                      <p className="text-text-secondary dark:text-gray-300 text-sm">
                        İhtiyaçlarınıza özel tasarım ve üretim hizmeti
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-text-primary dark:text-white">
                        Hızlı Teslimat
                      </h4>
                      <p className="text-text-secondary dark:text-gray-300 text-sm">
                        Siparişlerinizi en kısa sürede teslim ediyoruz
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-text-primary dark:text-white">
                        5 Yıl Garanti
                      </h4>
                      <p className="text-text-secondary dark:text-gray-300 text-sm">
                        Tüm ürünlerimizde 5 yıl kalite garantisi
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}