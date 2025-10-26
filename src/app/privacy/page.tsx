import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gizlilik Politikası - Hüsnü Usta Mobilya',
  description: 'Hüsnü Usta Mobilya gizlilik politikası ve kişisel verilerin korunması hakkında bilgiler.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Gizlilik Politikası
          </h1>
          
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Giriş
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Hüsnü Usta Mobilya olarak, kişisel verilerinizin güvenliği bizim için son derece önemlidir. 
                Bu gizlilik politikası, web sitemizi ziyaret ettiğinizde hangi bilgileri topladığımızı, 
                bu bilgileri nasıl kullandığımızı ve koruduğumuzu açıklamaktadır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Topladığımız Bilgiler
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    2.1 Kişisel Bilgiler
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    İletişim formları aracılığıyla gönderdiğiniz ad, soyad, e-posta adresi, 
                    telefon numarası ve mesaj içeriği gibi bilgileri topluyoruz.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    2.2 Teknik Bilgiler
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Web sitemizi ziyaret ettiğinizde IP adresiniz, tarayıcı türü, işletim sistemi, 
                    ziyaret edilen sayfalar ve ziyaret süresi gibi teknik bilgiler otomatik olarak toplanır.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. Bilgilerin Kullanım Amacı
              </h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>İletişim taleplerinize yanıt vermek</li>
                <li>Ürün ve hizmetlerimiz hakkında bilgi sağlamak</li>
                <li>Web sitemizin performansını iyileştirmek</li>
                <li>Yasal yükümlülüklerimizi yerine getirmek</li>
                <li>Müşteri memnuniyetini artırmak</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Çerezler (Cookies)
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Web sitemiz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır. 
                Çerezler, tarayıcınızda saklanan küçük metin dosyalarıdır ve site tercihlerinizi 
                hatırlamamıza yardımcı olur.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                Tarayıcı ayarlarınızdan çerezleri devre dışı bırakabilirsiniz, ancak bu durumda 
                web sitemizin bazı özelliklerinin düzgün çalışmayabileceğini unutmayın.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Veri Güvenliği
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Kişisel verilerinizi yetkisiz erişim, değişiklik, ifşa veya imhaya karşı korumak için 
                uygun teknik ve idari güvenlik önlemleri almaktayız. Verileriniz güvenli sunucularda 
                saklanmakta ve şifreleme teknolojileri kullanılmaktadır.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Veri Paylaşımı
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Kişisel verilerinizi üçüncü taraflarla paylaşmıyoruz. Sadece aşağıdaki durumlarda 
                verileriniz paylaşılabilir:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Yasal zorunluluklar gereği</li>
                <li>Açık rızanızın bulunması durumunda</li>
                <li>Hizmet sağlayıcılarımızla (sadece hizmet sunumu için gerekli olan kısım)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Haklarınız
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                KVKK kapsamında aşağıdaki haklara sahipsiniz:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                <li>İşlenen kişisel verileriniz hakkında bilgi talep etme</li>
                <li>Kişisel verilerinizin düzeltilmesini isteme</li>
                <li>Kişisel verilerinizin silinmesini isteme</li>
                <li>İşleme faaliyetine itiraz etme</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                8. İletişim
              </h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Gizlilik politikamız hakkında sorularınız varsa veya haklarınızı kullanmak istiyorsanız, 
                bizimle aşağıdaki iletişim bilgileri üzerinden iletişime geçebilirsiniz:
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
                9. Politika Güncellemeleri
              </h2>
              <p className="text-gray-700 dark:text-gray-300">
                Bu gizlilik politikası zaman zaman güncellenebilir. Önemli değişiklikler olduğunda 
                sizi bilgilendireceğiz. Politikayı düzenli olarak gözden geçirmenizi öneririz.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}