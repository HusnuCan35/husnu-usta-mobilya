'use client'

import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react'
import { useState, useEffect } from 'react'

interface SiteSettings {
  siteName: string
  siteDescription: string
  contactEmail: string
  contactPhone: string
  address: string
  socialMedia: {
    facebook: string
    instagram: string
    twitter: string
    linkedin: string
  }
}

export function Footer() {
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    siteName: 'Hüsnü Usta Mobilya',
    siteDescription: '1972\'den beri 53 yıllık deneyimimizle kaliteli ve özel tasarım mobilyalar üretiyoruz.',
    contactEmail: 'husnuisiktas@gmail.com',
    contactPhone: '0536 355 58 60',
    address: 'Çınarlı, 1569. Sk. No:2, 35170 Konak / İzmir',
    socialMedia: {
      facebook: 'https://www.facebook.com/husnuustamobilya',
      instagram: 'https://www.instagram.com/izmir_agac_dunyasi/',
      twitter: '',
      linkedin: ''
    }
  })

  // Load site settings from API
  useEffect(() => {
    const loadSiteSettings = async () => {
      try {
        const response = await fetch('/api/site-settings')
        const result = await response.json()
        
        if (result.success && result.data) {
          setSiteSettings({
            siteName: result.data.siteName || 'Hüsnü Usta Mobilya',
            siteDescription: result.data.siteDescription || '1972\'den beri 53 yıllık deneyimimizle kaliteli ve özel tasarım mobilyalar üretiyoruz.',
            contactEmail: result.data.contactEmail || 'husnuisiktas@gmail.com',
            contactPhone: result.data.contactPhone || '0536 355 58 60',
            address: result.data.contactAddress || 'Çınarlı, 1569. Sk. No:2, 35170 Konak / İzmir',
            socialMedia: {
              facebook: result.data.socialMedia?.facebook || 'https://www.facebook.com/husnuustamobilya',
              instagram: result.data.socialMedia?.instagram || 'https://www.instagram.com/izmir_agac_dunyasi/',
              twitter: result.data.socialMedia?.twitter || '',
              linkedin: result.data.socialMedia?.linkedin || ''
            }
          })
        }
      } catch (error) {
        console.error('Site ayarları yüklenirken hata:', error)
        // Hata durumunda varsayılan ayarları kullan
      }
    }

    loadSiteSettings()
  }, [])
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">{siteSettings.siteName.charAt(0)}</span>
              </div>
              <span className="text-xl font-bold">{siteSettings.siteName}</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {siteSettings.siteDescription}
            </p>
            <div className="flex space-x-4">
              {siteSettings.socialMedia.facebook && (
                <a href={siteSettings.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {siteSettings.socialMedia.instagram && (
                <a href={siteSettings.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-accent transition-colors">
                  Ana Sayfa
                </Link>
              </li>
              <li>
                <Link href="/#foto-galeri" className="text-gray-400 hover:text-accent transition-colors">
                  Foto Galeri
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-accent transition-colors">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-accent transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-accent transition-colors">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Hizmetlerimiz</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-400">Özel Tasarım Mobilya</span>
              </li>
              <li>
                <span className="text-gray-400">El İşçiliği</span>
              </li>
              <li>
                <span className="text-gray-400">Kaliteli Ahşap</span>
              </li>
              <li>
                <span className="text-gray-400">Ücretsiz Keşif</span>
              </li>
              <li>
                <span className="text-gray-400">Montaj Hizmeti</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">İletişim Bilgileri</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent" />
                <a href={`tel:+90${siteSettings.contactPhone.replace(/\s/g, '')}`} className="text-gray-400 hover:text-accent transition-colors">
                  {siteSettings.contactPhone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent" />
                <a href={`mailto:${siteSettings.contactEmail}`} className="text-gray-400 hover:text-accent transition-colors">
                  {siteSettings.contactEmail}
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent mt-1" />
                <a 
                  href={`https://www.google.com/maps/search/${encodeURIComponent(siteSettings.address)}`}
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-accent transition-colors"
                >
                  {siteSettings.address.split(',').map((line, index) => (
                    <span key={index}>
                      {line.trim()}
                      {index < siteSettings.address.split(',').length - 1 && <br />}
                    </span>
                  ))}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Hüsnü Usta Mobilya. Tüm hakları saklıdır.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-accent text-sm transition-colors">
              Gizlilik Politikası
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-accent text-sm transition-colors">
              Kullanım Şartları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}