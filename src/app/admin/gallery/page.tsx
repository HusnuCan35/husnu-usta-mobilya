'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  Edit3, 
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  Eye
} from 'lucide-react'

interface GalleryImage {
  id: string
  src: string
  alt: string
  title: string
  category: string
  uploadDate: string
}

export default function AdminGalleryPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [images, setImages] = useState<GalleryImage[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [isUploading, setIsUploading] = useState(false)
  const router = useRouter()

  // Örnek galeri verileri
  const sampleImages: GalleryImage[] = [
    {
      id: '1',
      src: '/images/izmir_agac_dunyasi_001_8446a002.jpg',
      alt: 'Özel Tasarım Yatak Odası',
      title: 'Özel Tasarım Yatak Odası',
      category: 'yatak-odasi',
      uploadDate: '2024-01-15'
    },
    {
      id: '2',
      src: '/images/izmir_agac_dunyasi_002_4dae58b2.jpg',
      alt: 'Modern Mutfak Dolabı',
      title: 'Modern Mutfak Dolabı',
      category: 'mutfak',
      uploadDate: '2024-01-14'
    },
    {
      id: '3',
      src: '/images/izmir_agac_dunyasi_003_52ba9d26.jpg',
      alt: 'Klasik Salon Takımı',
      title: 'Klasik Salon Takımı',
      category: 'salon',
      uploadDate: '2024-01-13'
    },
    {
      id: '4',
      src: '/images/izmir_agac_dunyasi_004_e0db85bb.jpg',
      alt: 'Çalışma Masası',
      title: 'Çalışma Masası',
      category: 'ofis',
      uploadDate: '2024-01-12'
    },
    {
      id: '5',
      src: '/images/izmir_agac_dunyasi_005_15d10f7b.jpg',
      alt: 'Özel Dolap Sistemi',
      title: 'Özel Dolap Sistemi',
      category: 'dolap',
      uploadDate: '2024-01-11'
    },
    {
      id: '6',
      src: '/images/izmir_agac_dunyasi_006_f2ef5f0f.jpg',
      alt: 'Yemek Odası Takımı',
      title: 'Yemek Odası Takımı',
      category: 'yemek-odasi',
      uploadDate: '2024-01-10'
    }
  ]

  const categories = [
    { value: 'all', label: 'Tümü' },
    { value: 'yatak-odasi', label: 'Yatak Odası' },
    { value: 'salon', label: 'Salon' },
    { value: 'mutfak', label: 'Mutfak' },
    { value: 'yemek-odasi', label: 'Yemek Odası' },
    { value: 'ofis', label: 'Ofis' },
    { value: 'dolap', label: 'Dolap' }
  ]

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      // Edge Config'den galeri verilerini yükle
      loadGalleryFromEdgeConfig()
    } else {
      router.push('/admin/login')
    }
  }, [router])

  // Edge Config'den galeri verilerini yükle
  const loadGalleryFromEdgeConfig = async () => {
    try {
      const response = await fetch('/api/gallery')
      const result = await response.json()
      
      if (result.success && result.data) {
        setImages(result.data)
      } else {
        // Fallback olarak örnek verileri kullan
        setImages(sampleImages)
      }
    } catch (error) {
      console.error('Edge Config galeri verileri yüklenirken hata:', error)
      // Hata durumunda örnek verileri kullan
      setImages(sampleImages)
    }
  }

  const filteredImages = images.filter(image => {
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         image.alt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    setIsUploading(true)
    
    // Dosya yükleme simülasyonu
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const reader = new FileReader()
      
      reader.onload = (e) => {
        const newImage: GalleryImage = {
          id: Date.now().toString() + i,
          src: e.target?.result as string,
          alt: file.name,
          title: file.name.replace(/\.[^/.]+$/, ""),
          category: 'uncategorized',
          uploadDate: new Date().toISOString().split('T')[0]
        }
        
        setImages(prev => {
          const updated = [...prev, newImage]
          localStorage.setItem('galleryImages', JSON.stringify(updated))
          return updated
        })
      }
      
      reader.readAsDataURL(file)
    }
    
    setIsUploading(false)
  }

  const handleDeleteImage = (id: string) => {
    if (confirm('Bu fotoğrafı silmek istediğinizden emin misiniz?')) {
      setImages(prev => {
        const updated = prev.filter(img => img.id !== id)
        localStorage.setItem('galleryImages', JSON.stringify(updated))
        return updated
      })
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
              <ImageIcon className="w-6 h-6 text-accent mr-3" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Foto Galeri Yönetimi
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <label className="flex items-center px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 cursor-pointer transition-colors duration-200">
              <Upload className="w-4 h-4 mr-2" />
              {isUploading ? 'Yükleniyor...' : 'Fotoğraf Ekle'}
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={isUploading}
              />
            </label>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Filters and Search */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Fotoğraf ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent appearance-none"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'grid'
                  ? 'bg-accent text-white'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'list'
                  ? 'bg-accent text-white'
                  : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center">
              <ImageIcon className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Fotoğraf</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{images.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center">
              <Filter className="w-8 h-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Filtrelenmiş</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{filteredImages.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center">
              <Eye className="w-8 h-8 text-purple-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Kategori</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {categories.find(c => c.value === selectedCategory)?.label}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image) => (
              <div key={image.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="aspect-square relative">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 hover:opacity-100">
                    <div className="flex space-x-2">
                      <button className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-white rounded-full text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDeleteImage(image.id)}
                        className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1 truncate">
                    {image.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {categories.find(c => c.value === image.category)?.label || 'Kategorisiz'}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(image.uploadDate).toLocaleDateString('tr-TR')}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Fotoğraf
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Başlık
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Kategori
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Tarih
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredImages.map((image) => (
                    <tr key={image.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {image.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {image.alt}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {categories.find(c => c.value === image.category)?.label || 'Kategorisiz'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(image.uploadDate).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteImage(image.id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {filteredImages.length === 0 && (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Fotoğraf bulunamadı
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Arama kriterlerinize uygun fotoğraf bulunamadı.
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              className="text-accent hover:text-accent/80"
            >
              Filtreleri temizle
            </button>
          </div>
        )}
      </main>
    </div>
  )
}