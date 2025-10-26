import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="text-xl font-bold">Hüsnü Usta Mobilya</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              1972'den beri 53 yıllık deneyimimizle kaliteli ve özel tasarım mobilyalar üretiyoruz. 
              Evinizi hayalinizdeki gibi dekore etmenize yardımcı oluyoruz.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
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
                <Link href="/products" className="text-gray-400 hover:text-accent transition-colors">
                  Ürünler
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

          {/* Product Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Ürün Kategorileri</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=yatak-odasi" className="text-gray-400 hover:text-accent transition-colors">
                  Yatak Odası
                </Link>
              </li>
              <li>
                <Link href="/products?category=oturma-grubu" className="text-gray-400 hover:text-accent transition-colors">
                  Oturma Grubu
                </Link>
              </li>
              <li>
                <Link href="/products?category=yemek-odasi" className="text-gray-400 hover:text-accent transition-colors">
                  Yemek Odası
                </Link>
              </li>
              <li>
                <Link href="/products?category=cocuk-odasi" className="text-gray-400 hover:text-accent transition-colors">
                  Çocuk Odası
                </Link>
              </li>
              <li>
                <Link href="/products?category=ofis" className="text-gray-400 hover:text-accent transition-colors">
                  Ofis Mobilyaları
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">İletişim Bilgileri</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accent" />
                <span className="text-gray-400">0536 355 58 60</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accent" />
                <span className="text-gray-400">info@husnuustamobilya.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accent mt-1" />
                <span className="text-gray-400">
                  Çınarlı, 1569. Sk. No:2<br />
                  35170 Konak / İzmir
                </span>
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