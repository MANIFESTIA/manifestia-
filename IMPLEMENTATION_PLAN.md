# 🚀 Manifestia v1.0 Yayın Yol Haritası (Implementation Plan)

Bu belge, Manifestia uygulamasını "Canlı" aşamasından tam teşekküllü bir ürün haline getirmek için gereken adımları içerir.

## 📅 Faz 1: Veritabanı ve Altyapı Genişletme (Database & Backend)
**Hedef:** Kullanıcı verilerinin (Chat, Tarot, Günlük) kalıcı olmasını sağlamak.

- [x] **Schema Güncellemesi (`schema.prisma`):**
    - `TarotReading` modeli: Kullanıcının geçmiş tarot açılımlarını kaydetmek için.
    - `JournalEntry` modeli: Kullanıcının ruh halini ve günlük yazılarını saklamak için.
    - `ChatSession` ve `ChatMessage` modeli: Sohbet geçmişini veritabanında tutmak için.
- [x] **API Route Validasyonu:**
    - `api/tarot`: Okumaları kaydetme özelliği eklendi.
    - `api/journal`: Günlük CRUD işlemleri eklendi.
    - `api/chat`: Sohbet geçmişini ve oturumları kaydetme eklendi.

## 🔮 Faz 2: Eksik Özelliklerin Tamamlanması (Feature Completion)
**Hedef:** Uygulamanın vaat ettiği "Spiritüel Rehber" fonksiyonlarını eksiksiz sunmak.

- [ ] **Tarot Modülü:**
    - [ ] Etkileşimli Kart Seçimi (Animasyonlu).
    - [ ] 3 Kart (Geçmiş, Şimdi, Gelecek) veya Tek Kart açılımı mantığı.
    - [ ] Kart anlamlarının ve yorumunun yapay zeka ile zenginleştirilmesi.
- [ ] **Ruh Günlüğü (Soul Journal):**
    - [ ] Günlük yazma arayüzü (Rich Text veya düz metin).
    - [ ] Ruh hali (Mood) seçici (Örn: Mutlu, Durgun, Enerjik).
    - [ ] Geçmiş günlüklerin takvim/liste görünümü.
- [ ] **Ritüeller:**
    - [ ] Basit ritüel listesi (Örn: Sabah Niyeti, Dolunay Ritüeli).
    - [ ] Etkileşimli "Tamamlandı" işaretleme ve XP kazanımı.

## 💎 Faz 3: Oyunlaştırma ve Ekonomi Bağlantısı (Gamification Loop)
**Hedef:** Kullanıcıyı içeride tutacak ödül mekanizmalarının bağlanması.

- [ ] **XP ve Seviye Sistemi:**
    - Günlük yazınca +XP, Tarot açınca +XP tanımlanması.
    - Seviye atlama animasyonu (Level Up).
- [ ] **Mağaza (Store) Entegrasyonu:**
    - Elmas ile "Premium Tarot Açılımı" veya "Özel Ritüel" satın alma kurgusu.
    - Satın alınan ürünlerin envanterde (Inventory) listelenmesi.

## 🎨 Faz 4: Yayına Hazırlık (Production Readiness)
**Hedef:** Profesyonel, hızlı ve hatasız bir deneyim.

- [ ] **SEO Optimizasyonu:**
    - Sayfa başlıkları (Title), Açıklamalar (Meta Description).
    - Sosyal medya paylaşım kartları (OpenGraph images).
- [ ] **Performans:**
    - Görsellerin optimizasyonu (`next/image`).
    - Gereksiz kodların temizlenmesi.
- [ ] **Hata Yönetimi (Error Handling):**
    - 404 Sayfası tasarımı.
    - Beklenmedik hatalar için "Global Error Boundary".

---

## 🏁 Sonraki Adım Önerisi
Hemen **Faz 1** ile başlayıp veritabanı altyapısını güçlendirelim, ardından **Tarot** özelliğini tam interaktif hale getirelim.
