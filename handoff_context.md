# Project Context & Handoff Checklist

**Tarih:** 27.01.2026
**Durum:** Aktif Geliştirme (Restoration & Feature Implementation)

## 📌 Proje Özeti: Manifestia
Manifestia, kullanıcıların spiritüel yolculuklarına rehberlik eden, AI destekli bir web uygulamasıdır. Next.js, Tailwind CSS ve Google Gemini AI kullanılarak geliştirilmektedir.

### 🛠 Teknik Yığın
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS, Framer Motion (Animasyonlar)
- **AI:** Google Gemini (Tarot yorumları ve Kozmik Rehberlik için)
- **3D/Visuals:** React Three Fiber (`Antigravity.tsx`), Lucide React (İkonlar)

## 🔄 Son Yapılan Değişiklikler (Session Restore)
1.  **Dosya Kurtarma:**
    - `app/api/guidance/route.ts` (Kozmik Rehberlik API)
    - `components/ui/Antigravity.tsx` (Arka plan efekti)
    - `hooks/useCosmicGuidance.ts` (Frontend kancası)
    - Bu dosyalar silinmişti, git geçmişinden geri getirildi.
2.  **Entegrasyon:**
    - `SanctuaryView.tsx` dosyasına `Antigravity` ve `useCosmicGuidance` tekrar eklendi.
    - Mükerrer kodlar temizlendi.
3.  **Sunucu:**
    - Geliştirme sunucusu (`npm run dev`) çalışır duruma getirildi.

## 📋 Aktif Görevler (Yapılacaklar)
Şu anki odak noktası Tarot özelliğinin kusursuz çalışması ve Kozmik Rehberlik modülünün test edilmesidir.

- [ ] **Tarot Modülü:**
    - Kart çekme animasyonları çalışıyor mu?
    - API yanıt veriyor mu? (Mock data mı dönüyor gerçek data mı?)
- [ ] **Kozmik Rehberlik:**
    - Ana ekranda "Günün Mesajı" görünüyor mu?
    - `Antigravity` arka planı performanslı çalışıyor mu?
- [ ] **Deployment:**
    - Vercel kurulumu için hazırlık.

## 📂 Önemli Dosya Yolları
- **Ana Görünüm:** `components/dashboard/SanctuaryView.tsx`
- **Tarot:** `components/tarot/TarotView.tsx` & `TarotCard.tsx`
- **AI Logic:** `app/api/` altındaki route'lar.
- **Global Store:** `lib/UserContext.tsx` (Kullanıcı adı, burcu vb.)

## 🚀 Nasıl Devam Edilir?
Bu klasörü (`manifestia`) Workspace olarak eklediğinde:
1.  `.env.local` dosyasında `GEMINI_API_KEY` olduğunu doğrula.
2.  `npm run dev` komutuyla projeyi ayağa kaldır.
3.  Kaldığın yerden (Tarot ve Rehberlik testleri) devam et.
