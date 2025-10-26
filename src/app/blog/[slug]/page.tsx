'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Calendar, User, Tag, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import { blogPosts } from '@/data/blog'



export default function BlogPostPage() {
  const params = useParams()
  const slug = params?.slug as string
  
  const post = blogPosts.find(p => p.slug === slug)
  const relatedPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 3)

  if (!post) {
    return (
      <div className="min-h-screen bg-background-primary dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold text-text-primary dark:text-white mb-4">
            Blog Yazısı Bulunamadı
          </h1>
          <p className="text-text-secondary dark:text-gray-300 mb-6">
            Aradığınız blog yazısı mevcut değil.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center space-x-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Blog'a Dön</span>
          </Link>
        </div>
      </div>
    )
  }

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = post.title

  const handleShare = (platform: string) => {
    let url = ''
    
    switch (platform) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
        break
      case 'twitter':
        url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`
        break
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
        break
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400')
    }
  }

  return (
    <div className="min-h-screen bg-background-primary dark:bg-gray-900">
      {/* Back Button */}
      <div className="container mx-auto px-4 pt-8">
        <Link
          href="/blog"
          className="inline-flex items-center space-x-2 text-accent hover:text-accent/80 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Blog'a Dön</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-accent/10 text-accent text-sm font-medium rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-text-primary dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div className="flex items-center space-x-6 text-text-secondary dark:text-gray-400">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>{post.publishDate}</span>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="flex items-center space-x-3">
                <span className="text-text-secondary dark:text-gray-400 text-sm">Paylaş:</span>
                <button
                  onClick={() => handleShare('facebook')}
                  className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
                  title="Facebook'ta Paylaş"
                >
                  <Facebook className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('twitter')}
                  className="p-2 bg-sky-500 hover:bg-sky-600 text-white rounded-full transition-colors"
                  title="Twitter'da Paylaş"
                >
                  <Twitter className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleShare('linkedin')}
                  className="p-2 bg-blue-700 hover:bg-blue-800 text-white rounded-full transition-colors"
                  title="LinkedIn'de Paylaş"
                >
                  <Linkedin className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <div className="aspect-[16/9] rounded-xl overflow-hidden shadow-2xl mb-12">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {/* Excerpt */}
              <div className="text-xl text-text-secondary dark:text-gray-300 leading-relaxed mb-8 p-6 bg-background-secondary dark:bg-gray-800 rounded-xl border-l-4 border-accent">
                {post.excerpt}
              </div>

              {/* Content */}
              <div className="text-text-primary dark:text-gray-300 leading-relaxed space-y-6">
                {post.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-16 bg-background-secondary dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-serif font-bold text-text-primary dark:text-white mb-2">
                İlgili Yazılar
              </h2>
              <div className="w-20 h-1 bg-accent"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost, index) => (
                <article key={index} className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-[4/3]">
                    <img
                      src={relatedPost.featuredImage}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {relatedPost.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <h3 className="text-lg font-serif font-bold text-text-primary dark:text-white mb-3 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    
                    <p className="text-text-secondary dark:text-gray-300 text-sm mb-4 line-clamp-3">
                      {relatedPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs text-text-secondary dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{relatedPost.publishDate}</span>
                        </div>
                      </div>
                      
                      <Link
                        href={`/blog/${relatedPost.slug}`}
                        className="text-accent hover:text-accent/80 text-sm font-medium transition-colors"
                      >
                        Oku
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-accent/10 to-primary/10 dark:from-accent/20 dark:to-primary/20 rounded-xl p-8">
            <h2 className="text-3xl font-serif font-bold text-text-primary dark:text-white mb-4">
              Bu Yazıyı Beğendiniz mi?
            </h2>
            <p className="text-text-secondary dark:text-gray-300 mb-6">
              Benzer içeriklerden haberdar olmak için e-posta listemize katılın
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