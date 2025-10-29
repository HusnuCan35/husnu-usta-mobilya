'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Save, 
  Settings, 
  Globe, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Linkedin
} from 'lucide-react'
import { getSiteSettings, updateSiteSettings } from '@/lib/actions'

export default function AdminSettingsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const router = useRouter()

  // Site ayarları state'leri
  const [settings, setSettings] = useState({
    siteName: 'Hüsnü Usta Mobilya',
    siteTitle: 'Hüsnü Usta Mobilya - 1972\'den Beri Kaliteli Mobilya',
    siteDescription: 'İzmir\'de 1972\'den beri faaliyet gösteren Hüsnü Usta Mobilya, kaliteli ve özel tasarım mobilyalar üretmektedir.',
    contactEmail: 'husnuisiktas@gmail.com',
    contactPhone: '0536 355 58 60',
    address: 'Çınarlı, 1569. Sk. No:2, 35170 Konak / İzmir',
    socialMedia: {
      facebook: '',
      instagram: 'https://instagram.com/husnuustamobilya',
      twitter: '',
      linkedin: ''
    }
  })

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      // Supabase'den ayarları yükle
      loadSettingsFromSupabase()
    } else {
      router.push('/admin/login')
    }
  }, [router])

  // Supabase'den ayarları yükle
  const loadSettingsFromSupabase = async () => {
    try {
      const result = await getSiteSettings()
      
      if (result.success && result.data) {
        setSettings({
          siteName: result.data.siteName || 'Hüsnü Usta Mobilya',
          siteTitle: result.data.siteTitle || 'Hüsnü Usta Mobilya - 1972\'den Beri Kaliteli Mobilya',
          siteDescription: result.data.siteDescription || 'İzmir\'de 1972\'den beri faaliyet gösteren Hüsnü Usta Mobilya, kaliteli ve özel tasarım mobilyalar üretmektedir.',
          contactEmail: result.data.contactEmail || 'husnuisiktas@gmail.com',
          contactPhone: result.data.contactPhone || '0536 355 58 60',
          address: result.data.contactAddress || 'Çınarlı, 1569. Sk. No:2, 35170 Konak / İzmir',
          socialMedia: {
            facebook: result.data.socialMedia?.facebook || '',
            instagram: result.data.socialMedia?.instagram || 'https://instagram.com/husnuustamobilya',
            twitter: result.data.socialMedia?.twitter || '',
            linkedin: result.data.socialMedia?.linkedin || ''
          }
        })
      }
    } catch (error) {
      console.error('Supabase ayarları yüklenirken hata:', error)
      // Hata durumunda varsayılan ayarları kullan
    }
  }

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }))
    } else {
      setSettings(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setSuccessMessage('')

    try {
      // Ayarları server action ile güncelle
      const result = await updateSiteSettings(settings)

      if (result.success) {
        // Başarı mesajı göster
        setSuccessMessage('Ayarlar başarıyla kaydedildi!')
        
        // Ayarları yeniden yükle
        await loadSettingsFromSupabase()
      } else {
        throw new Error(result.error || 'Ayarlar kaydedilemedi')
      }
      
      // 3 saniye sonra mesajı temizle
      setTimeout(() => {
        setSuccessMessage('')
      }, 3000)
    } catch (error) {
      console.error('Ayarlar kaydedilirken hata:', error)
      setSuccessMessage('Hata: Ayarlar kaydedilemedi!')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center">
            <button
              onClick={() => router.push('/admin')}
              className="p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 mr-4"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center">
              <Settings className="w-6 h-6 text-accent mr-3" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Site Ayarları
              </h1>
            </div>
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        </div>
      </header>

      {/* Success Message */}
      {successMessage && (
        <div className={`mx-6 mt-4 p-4 rounded-lg ${
          successMessage.includes('Hata') 
            ? 'bg-red-100 border border-red-400 text-red-700' 
            : 'bg-green-100 border border-green-400 text-green-700'
        }`}>
          {successMessage}
        </div>
      )}

      {/* Main Content */}
      <main className="p-6">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
          {/* Genel Bilgiler */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center mb-6">
              <Globe className="w-5 h-5 text-accent mr-2" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Genel Bilgiler
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Site Adı
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => handleInputChange('siteName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Site adını girin"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Site Başlığı
                </label>
                <input
                  type="text"
                  value={settings.siteTitle}
                  onChange={(e) => handleInputChange('siteTitle', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Site başlığını girin"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Site Açıklaması
                </label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => handleInputChange('siteDescription', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Site açıklamasını girin"
                />
              </div>
            </div>
          </div>

          {/* İletişim Bilgileri */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center mb-6">
              <Mail className="w-5 h-5 text-accent mr-2" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                İletişim Bilgileri
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  E-posta Adresi
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="E-posta adresini girin"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Telefon Numarası
                </label>
                <input
                  type="tel"
                  value={settings.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Telefon numarasını girin"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Adres
                </label>
                <textarea
                  value={settings.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Adres bilgisini girin"
                />
              </div>
            </div>
          </div>

          {/* Sosyal Medya */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center mb-6">
              <Instagram className="w-5 h-5 text-accent mr-2" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Sosyal Medya Hesapları
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Facebook className="w-4 h-4 inline mr-1" />
                  Facebook
                </label>
                <input
                  type="url"
                  value={settings.socialMedia.facebook}
                  onChange={(e) => handleInputChange('socialMedia.facebook', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Facebook profil URL'si"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Instagram className="w-4 h-4 inline mr-1" />
                  Instagram
                </label>
                <input
                  type="url"
                  value={settings.socialMedia.instagram}
                  onChange={(e) => handleInputChange('socialMedia.instagram', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Instagram profil URL'si"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Twitter className="w-4 h-4 inline mr-1" />
                  Twitter
                </label>
                <input
                  type="url"
                  value={settings.socialMedia.twitter}
                  onChange={(e) => handleInputChange('socialMedia.twitter', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="Twitter profil URL'si"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <Linkedin className="w-4 h-4 inline mr-1" />
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={settings.socialMedia.linkedin}
                  onChange={(e) => handleInputChange('socialMedia.linkedin', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  placeholder="LinkedIn profil URL'si"
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? 'Kaydediliyor...' : 'Ayarları Kaydet'}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}