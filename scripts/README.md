# Instagram Resim İndirici

Bu script Instagram sayfasından resimleri çeker ve yerel olarak kaydeder.

## Gereksinimler

1. **Python 3.x**
2. **Chrome Browser**
3. **ChromeDriver**
4. **Python Paketleri**

## Kurulum

### 1. ChromeDriver Kurulumu (macOS)
```bash
brew install chromedriver
```

### 2. Python Paketlerini Yükle
```bash
pip install -r requirements.txt
```

## Kullanım

```bash
python instagram_scraper.py
```

Script otomatik olarak `https://www.instagram.com/izmir_agac_dunyasi/` adresinden resimleri çekecek ve `instagram_images` klasörüne kaydedecektir.

## Özellikler

- ✅ Selenium WebDriver kullanarak modern Instagram sayfalarını destekler
- ✅ Otomatik scroll yaparak daha fazla resim yükler
- ✅ Rate limiting ile Instagram'ın kurallarına uygun davranır
- ✅ Profil resmi ve küçük resimleri filtreler
- ✅ Benzersiz dosya adları oluşturur
- ✅ Hata durumlarında detaylı bilgi verir

## Notlar

- Instagram hesabının herkese açık olması gerekir
- Script maksimum 30 resim indirir
- Her resim indirme arasında 1 saniye bekler
- Resimler JPG formatında kaydedilir

## Sorun Giderme

Eğer script çalışmıyorsa:

1. Chrome browser'ın yüklü olduğundan emin olun
2. ChromeDriver'ı yükleyin: `brew install chromedriver`
3. Python paketlerini yükleyin: `pip install -r requirements.txt`
4. Instagram hesabının herkese açık olduğundan emin olun