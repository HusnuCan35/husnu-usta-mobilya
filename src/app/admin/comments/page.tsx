'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  MessageSquare, 
  Check, 
  X, 
  Trash2, 
  Search,
  Filter,
  Star,
  Clock,
  User,
  Calendar
} from 'lucide-react'

interface Comment {
  id: string
  name: string
  email: string
  message: string
  rating: number
  status: 'pending' | 'approved' | 'rejected'
  date: string
  product?: string
}

export default function AdminCommentsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const router = useRouter()

  // Örnek yorum verileri
  const sampleComments: Comment[] = [
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      message: 'Çok kaliteli işçilik, yatak odası takımımızdan çok memnunuz. Herkese tavsiye ederim.',
      rating: 5,
      status: 'approved',
      date: '2024-01-15T10:30:00Z',
      product: 'Yatak Odası Takımı'
    },
    {
      id: '2',
      name: 'Fatma Demir',
      email: 'fatma@example.com',
      message: 'Mutfak dolabımız harika oldu. Ölçüler tam uydu ve malzeme kalitesi çok iyi.',
      rating: 5,
      status: 'approved',
      date: '2024-01-14T14:20:00Z',
      product: 'Mutfak Dolabı'
    },
    {
      id: '3',
      name: 'Mehmet Kaya',
      email: 'mehmet@example.com',
      message: 'Hizmet çok güzeldi, zamanında teslim ettiler. Teşekkürler.',
      rating: 4,
      status: 'pending',
      date: '2024-01-13T16:45:00Z'
    },
    {
      id: '4',
      name: 'Ayşe Özkan',
      email: 'ayse@example.com',
      message: 'Salon takımımız çok şık oldu. Arkadaşlarım çok beğendi.',
      rating: 5,
      status: 'pending',
      date: '2024-01-12T09:15:00Z',
      product: 'Salon Takımı'
    },
    {
      id: '5',
      name: 'Ali Çelik',
      email: 'ali@example.com',
      message: 'Fiyat performans açısından çok iyi. Kaliteli malzeme kullanıyorlar.',
      rating: 4,
      status: 'approved',
      date: '2024-01-11T11:30:00Z'
    }
  ]

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      // Mevcut yorum verilerini yükle
      const savedComments = localStorage.getItem('comments')
      if (savedComments) {
        setComments(JSON.parse(savedComments))
      } else {
        setComments(sampleComments)
        localStorage.setItem('comments', JSON.stringify(sampleComments))
      }
    } else {
      router.push('/admin/login')
    }
  }, [router])

  const filteredComments = comments.filter(comment => {
    const matchesSearch = comment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comment.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || comment.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const updateCommentStatus = (id: string, status: 'approved' | 'rejected') => {
    setComments(prev => {
      const updated = prev.map(comment => 
        comment.id === id ? { ...comment, status } : comment
      )
      localStorage.setItem('comments', JSON.stringify(updated))
      return updated
    })
  }

  const deleteComment = (id: string) => {
    if (confirm('Bu yorumu silmek istediğinizden emin misiniz?')) {
      setComments(prev => {
        const updated = prev.filter(comment => comment.id !== id)
        localStorage.setItem('comments', JSON.stringify(updated))
        return updated
      })
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'rejected':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Onaylandı'
      case 'rejected':
        return 'Reddedildi'
      case 'pending':
        return 'Bekliyor'
      default:
        return 'Bilinmiyor'
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

  const stats = {
    total: comments.length,
    pending: comments.filter(c => c.status === 'pending').length,
    approved: comments.filter(c => c.status === 'approved').length,
    rejected: comments.filter(c => c.status === 'rejected').length
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
              <MessageSquare className="w-6 h-6 text-accent mr-3" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Yorum Yönetimi
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center">
              <MessageSquare className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Yorum</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Bekleyen</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.pending}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center">
              <Check className="w-8 h-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Onaylanan</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.approved}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center">
              <X className="w-8 h-8 text-red-500 mr-3" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Reddedilen</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.rejected}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Yorum ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent appearance-none"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="pending">Bekleyen</option>
              <option value="approved">Onaylanan</option>
              <option value="rejected">Reddedilen</option>
            </select>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {filteredComments.map((comment) => (
            <div key={comment.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{comment.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{comment.email}</p>
                    <div className="flex items-center mt-1">
                      <div className="flex mr-2">{renderStars(comment.rating)}</div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        ({comment.rating}/5)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(comment.status)}`}>
                    {getStatusText(comment.status)}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 dark:text-gray-300">{comment.message}</p>
                {comment.product && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Ürün: {comment.product}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(comment.date).toLocaleDateString('tr-TR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>

                <div className="flex items-center space-x-2">
                  {comment.status === 'pending' && (
                    <>
                      <button
                        onClick={() => updateCommentStatus(comment.id, 'approved')}
                        className="flex items-center px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800 transition-colors duration-200"
                      >
                        <Check className="w-4 h-4 mr-1" />
                        Onayla
                      </button>
                      <button
                        onClick={() => updateCommentStatus(comment.id, 'rejected')}
                        className="flex items-center px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 transition-colors duration-200"
                      >
                        <X className="w-4 h-4 mr-1" />
                        Reddet
                      </button>
                    </>
                  )}
                  {comment.status === 'approved' && (
                    <button
                      onClick={() => updateCommentStatus(comment.id, 'rejected')}
                      className="flex items-center px-3 py-1 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800 transition-colors duration-200"
                    >
                      <X className="w-4 h-4 mr-1" />
                      Reddet
                    </button>
                  )}
                  {comment.status === 'rejected' && (
                    <button
                      onClick={() => updateCommentStatus(comment.id, 'approved')}
                      className="flex items-center px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 dark:bg-green-900 dark:text-green-300 dark:hover:bg-green-800 transition-colors duration-200"
                    >
                      <Check className="w-4 h-4 mr-1" />
                      Onayla
                    </button>
                  )}
                  <button
                    onClick={() => deleteComment(comment.id)}
                    className="flex items-center px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredComments.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Yorum bulunamadı
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Arama kriterlerinize uygun yorum bulunamadı.
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setStatusFilter('all')
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