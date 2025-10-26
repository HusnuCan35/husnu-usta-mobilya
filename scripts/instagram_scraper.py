#!/usr/bin/env python3
"""
Instagram Image Scraper
Bu script Instagram sayfasından resimleri çeker ve yerel olarak kaydeder.
Instagram'ın API değişiklikleri nedeniyle alternatif yöntemler kullanır.
"""

import os
import requests
import json
import re
from urllib.parse import urlparse
from pathlib import Path
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import hashlib

class InstagramScraper:
    def __init__(self, download_folder="instagram_images"):
        self.download_folder = download_folder
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        })
        
        # Download klasörünü oluştur
        Path(self.download_folder).mkdir(exist_ok=True)
        print(f"Resimler '{self.download_folder}' klasörüne kaydedilecek")
    
    def setup_driver(self):
        """Selenium WebDriver'ı ayarla"""
        chrome_options = Options()
        chrome_options.add_argument('--headless')  # Tarayıcıyı gizli modda çalıştır
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--disable-gpu')
        chrome_options.add_argument('--window-size=1920,1080')
        chrome_options.add_argument('--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36')
        
        try:
            driver = webdriver.Chrome(options=chrome_options)
            return driver
        except Exception as e:
            print(f"Chrome driver başlatılamadı: {e}")
            print("Chrome driver'ın yüklü olduğundan emin olun: brew install chromedriver")
            return None
    
    def get_image_urls_selenium(self, username, max_images=20):
        """Selenium kullanarak Instagram'dan resim URL'lerini çek"""
        driver = self.setup_driver()
        if not driver:
            return []
        
        image_urls = []
        
        try:
            url = f"https://www.instagram.com/{username}/"
            print(f"Sayfa yükleniyor: {url}")
            driver.get(url)
            
            # Sayfanın yüklenmesini bekle
            WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.TAG_NAME, "img"))
            )
            
            # Scroll yaparak daha fazla içerik yükle
            last_height = driver.execute_script("return document.body.scrollHeight")
            scroll_count = 0
            max_scrolls = 5
            
            while scroll_count < max_scrolls:
                driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
                time.sleep(2)
                
                new_height = driver.execute_script("return document.body.scrollHeight")
                if new_height == last_height:
                    break
                last_height = new_height
                scroll_count += 1
            
            # Resimleri bul
            img_elements = driver.find_elements(By.CSS_SELECTOR, "article img")
            
            for img in img_elements:
                src = img.get_attribute('src')
                if src and 'instagram' in src and len(image_urls) < max_images:
                    # Profil resmi ve küçük resimleri filtrele
                    if 'profile' not in src and 's150x150' not in src and 's320x320' not in src:
                        image_urls.append(src)
            
            print(f"{len(image_urls)} resim URL'si bulundu")
            
        except Exception as e:
            print(f"Selenium ile veri çekerken hata: {e}")
        
        finally:
            driver.quit()
        
        return image_urls
    
    def download_image(self, url, filename):
        """Resmi indirir ve kaydeder"""
        try:
            response = self.session.get(url, stream=True, timeout=30)
            response.raise_for_status()
            
            filepath = os.path.join(self.download_folder, filename)
            
            with open(filepath, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            
            print(f"✓ İndirildi: {filename}")
            return True
            
        except requests.RequestException as e:
            print(f"✗ Resim indirilemedi {filename}: {e}")
            return False
    
    def scrape_instagram(self, username, max_images=20):
        """Ana scraping fonksiyonu"""
        print(f"\nInstagram sayfası taranıyor: @{username}")
        print("=" * 50)
        
        # Selenium ile resim URL'lerini al
        image_urls = self.get_image_urls_selenium(username, max_images)
        
        if not image_urls:
            print("❌ Resim bulunamadı")
            print("\nAlternatif yöntemler:")
            print("1. Instagram hesabının herkese açık olduğundan emin olun")
            print("2. Chrome driver'ın yüklü olduğundan emin olun: brew install chromedriver")
            print("3. Manuel olarak resimleri indirmeyi deneyin")
            return
        
        print(f"📸 {len(image_urls)} resim bulundu, indiriliyor...")
        print("-" * 50)
        
        # Resimleri indir
        downloaded = 0
        for i, url in enumerate(image_urls):
            # Dosya adını URL'den hash oluşturarak belirle
            url_hash = hashlib.md5(url.encode()).hexdigest()[:8]
            filename = f"{username}_{i+1:03d}_{url_hash}.jpg"
            
            if self.download_image(url, filename):
                downloaded += 1
            
            # Rate limiting için bekle
            time.sleep(1)
        
        print("-" * 50)
        print(f"✅ Toplam {downloaded} resim başarıyla indirildi")
        print(f"📁 Resimler '{self.download_folder}' klasörüne kaydedildi")

def main():
    """Ana fonksiyon"""
    # Instagram kullanıcı adını URL'den çıkar
    instagram_url = "https://www.instagram.com/izmir_agac_dunyasi/"
    username = instagram_url.rstrip('/').split('/')[-1]
    
    print("🔍 Instagram Resim İndirici")
    print("=" * 50)
    print(f"🎯 Hedef: {instagram_url}")
    print(f"👤 Kullanıcı: @{username}")
    print(f"📱 Platform: Instagram")
    
    # Gereksinimler kontrolü
    print("\n📋 Gereksinimler:")
    print("- Python 3.x")
    print("- requests: pip install requests")
    print("- selenium: pip install selenium")
    print("- Chrome browser")
    print("- ChromeDriver: brew install chromedriver")
    
    # Scraper'ı başlat
    scraper = InstagramScraper("instagram_images")
    scraper.scrape_instagram(username, max_images=30)
    
    print("\n💡 İpucu: Eğer resimler indirilemediyse:")
    print("1. Instagram hesabının herkese açık olduğundan emin olun")
    print("2. ChromeDriver'ı yükleyin: brew install chromedriver")
    print("3. Gerekli Python paketlerini yükleyin:")
    print("   pip install requests selenium")

if __name__ == "__main__":
    main()