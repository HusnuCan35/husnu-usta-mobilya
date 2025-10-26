export interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  rating: number
  image: string
  location: string
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Elif Kaya",
    role: "Müşteri",
    content: "Hüsnü Usta ile çalışmak gerçekten keyifliydi. Mutfak dolabımı yenilettim, işçiliği ve kalitesi mükemmel. Zamanında teslim etti ve fiyatı da çok uygundu. Kesinlikle tavsiye ederim!",
    rating: 5,
    image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20a%20happy%20middle%20aged%20Turkish%20woman%20smiling&image_size=square",
    location: "Konak, İzmir"
  },
  {
    id: 2,
    name: "Ahmet Özdemir",
    role: "Müşteri",
    content: "53 yıllık tecrübesi gerçekten belli oluyor. Yatak odası takımımı yaptırdım, her detayı özenle işlenmiş. Hüsnü Usta'nın ellerine sağlık, çok memnun kaldık.",
    rating: 5,
    image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20a%20confident%20Turkish%20man%20in%20casual%20attire&image_size=square",
    location: "Bornova, İzmir"
  },
  {
    id: 3,
    name: "Ayşe Demir",
    role: "Müşteri",
    content: "Çok güvenilir bir usta. Salon takımımı yenilettim, hem modern hem de sağlam oldu. Fiyat performans açısından çok başarılı. Herkese tavsiye ediyorum.",
    rating: 5,
    image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20a%20stylish%20Turkish%20woman&image_size=square",
    location: "Karşıyaka, İzmir"
  },
  {
    id: 4,
    name: "Mehmet Yılmaz",
    role: "Müşteri",
    content: "Ofisim için özel tasarım masa yaptırdım. Hüsnü Usta'nın işçiliği gerçekten kaliteli. Hem estetik hem de fonksiyonel oldu. Çok memnunum.",
    rating: 5,
    image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20a%20successful%20Turkish%20businessman&image_size=square",
    location: "Alsancak, İzmir"
  },
  {
    id: 5,
    name: "Fatma Arslan",
    role: "Müşteri",
    content: "Çocuk odası mobilyalarını yaptırdım. Çok titiz çalışıyor, her detayı düşünüyor. Güvenli malzemeler kullanıyor. Çocuklarım çok sevdi.",
    rating: 5,
    image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20a%20happy%20young%20Turkish%20mother&image_size=square",
    location: "Gaziemir, İzmir"
  },
  {
    id: 6,
    name: "Hasan Çelik",
    role: "Müşteri",
    content: "Balkon dolabımı yaptırdım. Hava şartlarına dayanıklı malzeme kullandı. 2 yıldır kullanıyorum, hiç sorun yok. Usta işi gerçekten.",
    rating: 5,
    image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20portrait%20of%20a%20Turkish%20man%20in%20his%20home&image_size=square",
    location: "Çiğli, İzmir"
  }
]