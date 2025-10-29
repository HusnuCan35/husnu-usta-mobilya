'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft, 
  MessageSquare, 
  Star, 
  Check, 
  X, 
  Trash2, 
  Clock,
  User,
  Mail
} from 'lucide-react'
import { getComments, updateCommentStatus, deleteComment } from '@/lib/actions'

interface Comment {
  id: string
  name: string
  email: string
  message: string
  rating: number
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
}

export default function AdminCommentsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
      loadComments()
    } else {
      router.push('/admin/login')
    }
  }, [router])

  const loadComments = async () => {
    setIsLoading(true)
    try {
      const result = await getComments()
      if (result.success) {
        setComments(result.data)
      } else {
        console.error('Yorumlar yüklenirken hata:', result.error)
      }
    } catch (error) {
      console.error('Yorumlar yüklenirken hata:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdateStatus = async (id: string, status: 'approved' | 'rejected' | 'pending') => {
    try {
      const result = await updateCommentStatus(id, status)
      if (result.success) {
        await loadComments() // Yorumları yeniden yükle
      } else {
        console.error('Yorum durumu güncellenirken hata:', result.error)
        alert('Yorum durumu güncellenirken hata oluştu')
      }
    } catch (error) {
      console.error('Yorum durumu güncellenirken hata:', error)
      alert('Yorum durumu güncellenirken hata oluştu')
    }
  }

  const handleDeleteComment = async (id: string) => {
    if (confirm('Bu yorumu silmek istediğinizden emin misiniz?')) {
      try {
        const result = await deleteComment(id)
        if (result.success) {
          await loadComments() // Yorumları yeniden yükle
        } else {
          console.error('Yorum silinirken hata:', result.error)
          alert('Yorum silinirken hata oluştu')
        }
      } catch (error) {
        console.error('Yorum silinirken hata:', error)
        alert('Yorum silinirken hata oluştu')
      }
    }
  }

  const filteredComments = comments.filter(comment => {
    if (filter === 'all') return true
    return comment.status === filter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved': return 'Onaylandı'
      case 'rejected': return 'Reddedildi'
      case 'pending': return 'Beklemede'
      default: return 'Bilinmiyor'
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
    return <div>Yetkilendiriliyor...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <a
                href="/admin"
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Admin Panel
              </a>
              <div className="ml-4 h-6 w-px bg-gray-300 dark:bg-gray-600"></div>
              <h1 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">
                Yorum Yönetimi
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <MessageSquare className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Toplam</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{comments.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Beklemede</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {comments.filter(c => c.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <Check className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Onaylandı</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {comments.filter(c => c.status === 'approved').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center">
              <X className="w-8 h-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Reddedildi</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {comments.filter(c => c.status === 'rejected').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { key: 'all', label: 'Tümü', count: comments.length },
                { key: 'pending', label: 'Beklemede', count: comments.filter(c => c.status === 'pending').length },
                { key: 'approved', label: 'Onaylandı', count: comments.filter(c => c.status === 'approved').length },
                { key: 'rejected', label: 'Reddedildi', count: comments.filter(c => c.status === 'rejected').length }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key as any)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    filter === tab.key
                      ? 'border-accent text-accent'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Comments List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto"></div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">Yorumlar yükleniyor...</p>
            </div>
          ) : filteredComments.length === 0 ? (
            <div className="p-8 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">Henüz yorum bulunmuyor.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredComments.map((comment) => (
                <div key={comment.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <User className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="font-medium text-gray-900 dark:text-white">{comment.name}</span>
                        <Mail className="w-4 h-4 text-gray-400 ml-4 mr-2" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{comment.email}</span>
                      </div>
                      
                      <div className="flex items-center mb-3">
                        <div className="flex items-center mr-4">
                          {renderStars(comment.rating)}
                        </div>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(comment.status)}`}>
                          {getStatusText(comment.status)}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-300 mb-3">{comment.message}</p>
                      
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(comment.created_at).toLocaleDateString('tr-TR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      {comment.status !== 'approved' && (
                        <button
                          onClick={() => handleUpdateStatus(comment.id, 'approved')}
                          className="p-2 text-green-600 hover:bg-green-100 dark:hover:bg-green-900/20 rounded-lg transition-colors duration-200"
                          title="Onayla"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      {comment.status !== 'rejected' && (
                        <button
                          onClick={() => handleUpdateStatus(comment.id, 'rejected')}
                          className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                          title="Reddet"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-colors duration-200"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}