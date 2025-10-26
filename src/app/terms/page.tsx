import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kullanım Şartları - Hüsnü Usta Mobilya',
  description: 'Hüsnü Usta Mobilya web sitesi kullanım şartları ve koşulları.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Kullanım Şartları
          </h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Genel Hükümler
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Bu kullanım şartları, Hüsnü Usta Mobilya web sitesini (husnuustamobilya.com) 
                kullanımınızı düzenler. Sitemizi kullanarak bu şartları kabul etmiş sayılırsınız.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Bu şartları kabul etmiyorsanız, lütfen sitemizi kullanmayınız.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Hizmet Tanımı
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Hüsnü Usta Mobilya, 1972'den beri faaliyet gösteren bir mobilya üretim ve 
                satış işletmesidir. Web sitemiz aracılığıyla:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Ürün ve hizmetlerimiz hakkında bilgi sağlıyoruz</li>
                <li>Foto galeri ve referans çalışmalarımızı paylaşıyoruz</li>
                <li>İletişim imkanı sunuyoruz</li>
                <li>Şirket hakkında bilgi veriyoruz</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. Kullanıcı Sorumlulukları
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Sitemizi kullanırken aşağıdaki kurallara uymanız gerekmektedir:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Doğru ve güncel bilgiler sağlamak</li>
                <li>Yasalara aykırı içerik paylaşmamak</li>
                <li>Diğer kullanıcıların haklarına saygı göstermek</li>
                <li>Siteye zarar verebilecek faaliyetlerde bulunmamak</li>
                <li>Telif hakları ve fikri mülkiyet haklarına saygı göstermek</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Fikri Mülkiyet Hakları
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Bu web sitesindeki tüm içerik, tasarım, logo, fotoğraf ve diğer materyaller 
                Hüsnü Usta Mobilya'nın mülkiyetindedir ve telif hakları ile korunmaktadır.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                İçeriklerin izinsiz kopyalanması, çoğaltılması, dağıtılması veya ticari 
                amaçlarla kullanılması yasaktır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Hizmet Kesintileri
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Teknik bakım, güncelleme veya beklenmeyen durumlar nedeniyle hizmetimizde 
                kesintiler yaşanabilir. Bu durumlardan dolayı sorumluluk kabul etmiyoruz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Sorumluluk Reddi
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Web sitemizde yer alan bilgiler genel bilgilendirme amaçlıdır. Bilgilerin 
                doğruluğu, güncelliği ve eksiksizliği konusunda garanti vermiyoruz.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Sitemizin kullanımından doğabilecek doğrudan veya dolaylı zararlardan 
                sorumlu değiliz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Üçüncü Taraf Bağlantıları
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Sitemizde üçüncü taraf web sitelerine bağlantılar bulunabilir. Bu sitelerin 
                içeriği ve gizlilik politikalarından sorumlu değiliz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                8. Ürün ve Hizmet Bilgileri
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Web sitemizde gösterilen ürünler ve hizmetler hakkındaki bilgiler tanıtım 
                amaçlıdır. Gerçek ürünlerle renk, boyut ve detaylarda farklılıklar olabilir.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Kesin fiyat ve özellikler için lütfen bizimle iletişime geçiniz.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                9. İletişim ve Şikayetler
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Kullanım şartları hakkında sorularınız veya şikayetleriniz için bizimle 
                iletişime geçebilirsiniz:
              </p>
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>E-posta:</strong> husnuisiktas@gmail.com<br />
                  <strong>Telefon:</strong> 0536 355 58 60<br />
                  <strong>Adres:</strong> Çınarlı, 1569. Sk. No:2, 35170 Konak / İzmir
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                10. Değişiklikler
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Bu kullanım şartlarını önceden haber vermeksizin değiştirme hakkımız saklıdır. 
                Değişiklikler web sitemizde yayınlandığı anda yürürlüğe girer.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                11. Uygulanacak Hukuk
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Bu kullanım şartları Türkiye Cumhuriyeti hukukuna tabidir. Uyuşmazlıkların 
                çözümünde İzmir mahkemeleri yetkilidir.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}