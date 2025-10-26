import Link from 'next/link'
import { Calendar, User, Tag, ArrowRight, Search } from 'lucide-react'
import { blogPosts } from '@/data/blog'

export default function BlogPage() {
  const featuredPost = blogPosts[0]
  const otherPosts = blogPosts.slice(1)

  const categories = Array.from(new Set(blogPosts.flatMap(post => post.tags)))

  return (
    <div className="min-h-screen bg-background-primary dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 to-accent/10 dark:from-primary/20 dark:to-accent/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-text-primary dark:text-white mb-6">
              Blog
            </h1>
            <p className="text-xl text-text-secondary dark:text-gray-300 leading-relaxed">
              Mobilya dünyasından haberler, dekorasyon ipuçları ve uzman tavsiyeleri
            </p>
          </div>
        </div>
      </section>

      {/* Search & Categories */}
      <section className="py-8 bg-background-secondary dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Blog yazılarında ara..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              <button className="px-4 py-2 bg-accent text-white rounded-full text-sm font-medium">
                Tümü
              </button>
              {categories.slice(0, 4).map((category, index) => (
                <button
                  key={index}
                  className="px-4 py-2 bg-white dark:bg-gray-700 text-text-primary dark:text-white border border-gray-300 dark:border-gray-600 rounded-full text-sm font-medium hover:bg-accent hover:text-white hover:border-accent transition-colors"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-text-primary dark:text-white mb-2">
              Öne Çıkan Yazı
            </h2>
            <div className="w-20 h-1 bg-accent"></div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="aspect-[4/3] lg:aspect-auto">
                <img
                  src={featuredPost.featuredImage}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredPost.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-2xl lg:text-3xl font-serif font-bold text-text-primary dark:text-white mb-4">
                  {featuredPost.title}
                </h3>
                
                <p className="text-text-secondary dark:text-gray-300 mb-6 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-text-secondary dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <User className="w-4 h-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredPost.publishDate}</span>
                    </div>
                  </div>
                  
                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center space-x-2 text-accent hover:text-accent/80 font-medium transition-colors"
                  >
                    <span>Devamını Oku</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Posts */}
      <section className="py-16 bg-background-secondary dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-text-primary dark:text-white mb-2">
              Diğer Yazılar
            </h2>
            <div className="w-20 h-1 bg-accent"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherPosts.map((post, index) => (
              <article key={index} className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="aspect-[4/3]">
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold text-text-primary dark:text-white mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-text-secondary dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 text-xs text-text-secondary dark:text-gray-400">
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{post.publishDate}</span>
                      </div>
                    </div>
                    
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center space-x-1 text-accent hover:text-accent/80 text-sm font-medium transition-colors"
                    >
                      <span>Oku</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-accent/10 to-primary/10 dark:from-accent/20 dark:to-primary/20 rounded-xl p-8">
            <h2 className="text-3xl font-serif font-bold text-text-primary dark:text-white mb-4">
              Blog Güncellemelerini Kaçırmayın
            </h2>
            <p className="text-text-secondary dark:text-gray-300 mb-6">
              Yeni blog yazılarımızdan haberdar olmak için e-posta listemize katılın
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
              <button className="bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap">
                Abone Ol
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}