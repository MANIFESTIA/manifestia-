# Project Context & Handoff Checklist

**Tarih:** 30.01.2026 (Son Güncelleme)
**Durum:** Canlı (Live) - UI ve Branding İyileştirmeleri

## 📌 Proje Özeti: Manifestia
Manifestia, kullanıcıların spiritüel yolculuklarına rehberlik eden, AI destekli bir web uygulamasıdır. GitHub üzerinden Vercel/AWS Pipeline ile otomatik deploy olmaktadır.

## 🚀 Son Yapılan Geliştirmeler (UI & Branding)
1.  **Chat Arayüzü (UI Polish):**
    - Sohbet barı sola hizalandı, genişlik sınırı kaldırıldı.
    - Sesli asistan butonu büyütüldü (80px), ayrıldı ve sağa alındı.
    - İkon: `AudioWaveform` (Ses dalgası) olarak güncellendi.
    - Stil: ChatGPT benzeri, daha modern ve ferah bir görünüm sağlandı.

2.  **Branding (Marka Kimliği):**
    - **Intro Splash Logo:** Giriş ekranındaki dönen yıldız, yeni yüklenen **Ankh** sembolü ile değiştirildi.
    - **Favicon & App Icon:** Tarayıcı sekmesindeki ve uygulama ikonu yeni **Ankh** logosu ile güncellendi.

3.  **Deployment:**
    - Tüm değişiklikler `main` branch'ine push edildi (`git push origin main`).
    - Vercel/AWS otomatik build sürecindedir.

## 📋 Sıradaki Adımlar (Yarın)
- [ ] **1. Doğrulama:**
    - Canlı sitede (telefonda) yapılan ikon ve UI değişikliklerinin önbellek temizlendikten sonra görüldüğünün teyidi.
- [ ] **2. Yeni Özellikler:**
    - Kullanıcının isteği üzerine yeni özelliklerin (Tarot, Ritüel vb.) geliştirilmesine devam edilecek.

## 📂 Önemli Dosya Yolları
- **Chat UI:** `components/chat/ChatInterface.tsx`
- **Intro Splash:** `components/layout/IntroSplash.tsx`
- **Assets:** `public/logo-ankh.png`, `public/icon.png`, `app/icon.png`

## 💬 Notlar
- Canlı sitede değişikliklerin görünmesi tarayıcı önbelleğine (Cache/Service Worker) bağlı olarak gecikebilir.
- Kodlar GitHub'da günceldir.
