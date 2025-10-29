-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  site_name VARCHAR(255) NOT NULL DEFAULT 'Hüsnü Usta Mobilya',
  site_description TEXT DEFAULT 'Kaliteli ve Özel Tasarım Mobilyalar',
  contact_email VARCHAR(255) DEFAULT 'info@husnuustamobilya.com',
  contact_phone VARCHAR(50) DEFAULT '+90 232 123 45 67',
  contact_address TEXT DEFAULT 'İzmir, Türkiye',
  social_media JSONB DEFAULT '{"instagram": "https://instagram.com/husnuustamobilya", "facebook": "https://facebook.com/husnuustamobilya", "whatsapp": "+90 532 123 45 67"}',
  business_hours JSONB DEFAULT '{"weekdays": "09:00 - 18:00", "saturday": "09:00 - 17:00", "sunday": "Kapalı"}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id SERIAL PRIMARY KEY,
  src VARCHAR(500) NOT NULL,
  alt VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
  comment TEXT NOT NULL,
  project VARCHAR(255),
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image VARCHAR(500),
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  image VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_comments_approved ON comments(approved);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Insert default site settings
INSERT INTO site_settings (site_name, site_description, contact_email, contact_phone, contact_address, social_media, business_hours)
VALUES (
  'Hüsnü Usta Mobilya',
  '30 yıllık deneyimimizle kaliteli ve özel tasarım mobilyalar üretiyoruz.',
  'info@husnuustamobilya.com',
  '+90 232 123 45 67',
  'Konak, İzmir, Türkiye',
  '{"instagram": "https://instagram.com/husnuustamobilya", "facebook": "https://facebook.com/husnuustamobilya", "whatsapp": "+90 532 123 45 67"}',
  '{"weekdays": "09:00 - 18:00", "saturday": "09:00 - 17:00", "sunday": "Kapalı"}'
) ON CONFLICT DO NOTHING;

-- Insert sample gallery images
INSERT INTO gallery (src, alt, title, category) VALUES
('/images/izmir_agac_dunyasi_001_8446a002.jpg', 'Özel Tasarım Mobilya 1', 'Ahşap Masa Takımı', 'masa'),
('/images/izmir_agac_dunyasi_002_4dae58b2.jpg', 'Özel Tasarım Mobilya 2', 'Modern Dolap', 'dolap'),
('/images/izmir_agac_dunyasi_003_52ba9d26.jpg', 'Özel Tasarım Mobilya 3', 'Klasik Koltuk Takımı', 'koltuk'),
('/images/izmir_agac_dunyasi_004_e0db85bb.jpg', 'Özel Tasarım Mobilya 4', 'Çalışma Masası', 'masa'),
('/images/izmir_agac_dunyasi_005_15d10f7b.jpg', 'Özel Tasarım Mobilya 5', 'Yatak Odası Takımı', 'yatak'),
('/images/izmir_agac_dunyasi_006_f2ef5f0f.jpg', 'Özel Tasarım Mobilya 6', 'Mutfak Dolabı', 'mutfak'),
('/images/izmir_agac_dunyasi_007_2cf66a29.jpg', 'Özel Tasarım Mobilya 7', 'Salon Mobilyası', 'salon'),
('/images/izmir_agac_dunyasi_008_eec18c62.jpg', 'Özel Tasarım Mobilya 8', 'Özel Tasarım Masa', 'masa'),
('/images/izmir_agac_dunyasi_009_9a9bf6e8.jpg', 'Özel Tasarım Mobilya 9', 'Ahşap Dolap', 'dolap'),
('/images/izmir_agac_dunyasi_010_ac9db25a.jpg', 'Özel Tasarım Mobilya 10', 'Modern Koltuk', 'koltuk'),
('/images/izmir_agac_dunyasi_011_a74d2af5.jpg', 'Özel Tasarım Mobilya 11', 'Yatak Odası', 'yatak'),
('/images/izmir_agac_dunyasi_012_e8f61f98.jpg', 'Özel Tasarım Mobilya 12', 'Mutfak Mobilyası', 'mutfak')
ON CONFLICT DO NOTHING;

-- Insert sample comments
INSERT INTO comments (name, location, rating, comment, project, approved) VALUES
('Ayşe Demir', 'Konak, İzmir', 5, 'Mutfak dolabımızı yaptırdık, işçilik ve kalite mükemmel. Hüsnü Usta''ya teşekkürler!', 'Mutfak Dolabı', true),
('Mehmet Kaya', 'Bornova, İzmir', 5, 'Yatak odası takımımız harika oldu. Zamanında teslim, kaliteli işçilik. Kesinlikle tavsiye ederim.', 'Yatak Odası Takımı', true),
('Fatma Özkan', 'Karşıyaka, İzmir', 5, 'Salon mobilyalarımızı yenilettik. Çok memnun kaldık, fiyat performans açısından çok iyi.', 'Salon Mobilyası', true),
('Ali Yılmaz', 'Buca, İzmir', 4, 'Çalışma masamı yaptırdım. Kaliteli ahşap ve özenli işçilik. Çok beğendim.', 'Çalışma Masası', true)
ON CONFLICT DO NOTHING;

-- Insert sample categories
INSERT INTO categories (name, slug, description, image) VALUES
('Yatak Odası', 'yatak-odasi', 'Özel tasarım yatak odası takımları ve mobilyaları', '/images/izmir_agac_dunyasi_005_15d10f7b.jpg'),
('Salon Mobilyası', 'salon-mobilyasi', 'Modern ve klasik salon mobilyaları', '/images/izmir_agac_dunyasi_003_52ba9d26.jpg'),
('Mutfak Dolabı', 'mutfak-dolabi', 'Fonksiyonel ve şık mutfak dolapları', '/images/izmir_agac_dunyasi_006_f2ef5f0f.jpg'),
('Çalışma Masası', 'calisma-masasi', 'Ergonomik ve modern çalışma masaları', '/images/izmir_agac_dunyasi_004_e0db85bb.jpg'),
('Dolap Sistemleri', 'dolap-sistemleri', 'Özel tasarım dolap ve saklama çözümleri', '/images/izmir_agac_dunyasi_002_4dae58b2.jpg'),
('Masa Takımları', 'masa-takimlari', 'Yemek masası ve masa takımları', '/images/izmir_agac_dunyasi_001_8446a002.jpg')
ON CONFLICT DO NOTHING;

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, content, excerpt, featured_image, published) VALUES
('Ahşap Mobilya Bakımı Nasıl Yapılır?', 'ahsap-mobilya-bakimi', 'Ahşap mobilyalarınızın uzun ömürlü olması için düzenli bakım çok önemlidir...', 'Ahşap mobilyalarınızın uzun ömürlü olması için bakım ipuçları', '/images/izmir_agac_dunyasi_001_8446a002.jpg', true),
('Modern Mutfak Tasarımı Trendleri', 'modern-mutfak-tasarimi', 'Günümüzde mutfak tasarımında en popüler trendler ve öneriler...', 'Modern mutfak tasarımında dikkat edilmesi gereken noktalar', '/images/izmir_agac_dunyasi_006_f2ef5f0f.jpg', true),
('Yatak Odası Dekorasyonu İpuçları', 'yatak-odasi-dekorasyonu', 'Yatak odanızı daha rahat ve şık hale getirmek için dekorasyon önerileri...', 'Yatak odası dekorasyonu için pratik öneriler', '/images/izmir_agac_dunyasi_005_15d10f7b.jpg', true)
ON CONFLICT DO NOTHING;