'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  Settings, 
  Image, 
  MessageSquare, 
  Users, 
  BarChart3, 
  LogOut,
  Menu,
  X,
  Home,
  Eye,
  ThumbsUp,
  Camera
} from 'lucide-react'

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    } else {
      router.push('/admin/login')
    }
  }, [router])

  const handleLogout = () => {
    // LocalStorage'dan auth bilgisini kaldır
    localStorage.removeItem('adminAuth')
    
    // Cookie'yi temizle
    document.cookie = 'adminAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    
    router.push('/admin/login')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin', active: true },
    { icon: Settings, label: 'Site Ayarları', href: '/admin/settings' },
    { icon: Image, label: 'Foto Galeri', href: '/admin/gallery' },
    { icon: MessageSquare, label: 'Yorumlar', href: '/admin/comments' },
    { icon: Users, label: 'Kullanıcılar', href: '/admin/users' },
  ]

  const stats = [
    { label: 'Toplam Ziyaretçi', value: '12,543', icon: Eye, color: 'bg-blue-500' },
    { label: 'Foto Galeri', value: '156', icon: Camera, color: 'bg-green-500' },
    { label: 'Onaylı Yorumlar', value: '89', icon: ThumbsUp, color: 'bg-purple-500' },
    { label: 'Aktif Ürünler', value: '45', icon: BarChart3, color: 'bg-orange-500' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-6 px-3">
          {menuItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-3 mb-2 text-sm font-medium rounded-xl transition-colors duration-200 ${
                item.active
                  ? 'bg-accent text-white'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors duration-200"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Çıkış Yap
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h2 className="ml-2 lg:ml-0 text-xl font-semibold text-gray-900 dark:text-white">
                Dashboard
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                <Home className="w-4 h-4 mr-2" />
                Siteyi Görüntüle
              </a>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Hoş Geldiniz! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Hüsnü Usta Mobilya yönetim paneline hoş geldiniz. Buradan sitenizi yönetebilirsiniz.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center">
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Site Yönetimi */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Site Yönetimi
              </h3>
              <div className="space-y-3">
                <a
                  href="/admin/settings"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <Settings className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Site Ayarları</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Site adı, açıklama ve genel ayarlar</p>
                  </div>
                </a>
                <a
                  href="/admin/gallery"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <Image className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Foto Galeri</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Fotoğraf ekleme ve düzenleme</p>
                  </div>
                </a>
              </div>
            </div>

            {/* İçerik Yönetimi */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                İçerik Yönetimi
              </h3>
              <div className="space-y-3">
                <a
                  href="/admin/comments"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <MessageSquare className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Yorum Yönetimi</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Yorumları görüntüle ve yönet</p>
                  </div>
                </a>
                <a
                  href="/admin/users"
                  className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <Users className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">Kullanıcılar</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Kullanıcı hesaplarını yönet</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}