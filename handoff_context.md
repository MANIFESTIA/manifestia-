# Project Context & Handoff Checklist

**Tarih:** 29.01.2026 (Son Güncelleme)
**Durum:** Beklemede (AWS Hesap Onayı & Sunucu Kurulumu)

## 📌 Proje Özeti: Manifestia
Manifestia, kullanıcıların spiritüel yolculuklarına rehberlik eden, AI destekli bir web uygulamasıdır. AWS üzerinde host edilecektir.

## 🚀 Son Yapılan Geliştirmeler (Auth & AWS)
1.  **AWS Hesabı:**
    - Hesap açıldı (Stockholm -> Frankfurt bölgesi ayarlandı).
    - `manifestia-admin` IAM kullanıcısı oluşturuldu (Şifreler `.csv` olarak yedeklendi).
    - **Durum:** Hesap aktivasyonu bekleniyor (24h süre).

2.  **Kimlik Doğrulama (Authentication):**
    - **Backend:** `Register`, `Login`, `Forgot Password`, `Reset Password` API'leri yazıldı.
    - **Frontend:** Tüm sayfalar (`/auth/*`) tasarlandı ve bağlandı.
    - **Database:** Prisma (v5) ile PostgreSQL şeması (`User` modeli) hazırlandı.
    - **Email:** Nodemailer + AWS SES altyapısı kuruldu (Mail gönderimi aktif).

3.  **Git & Versiyon Kontrolü:**
    - Tüm değişiklikler `git commit` ile kaydedildi.
    - Mesaj: `"feat: Implement full authentication system"`

## 📋 Sıradaki Adımlar (Yarın)
AWS hesabı onaylandıktan sonra yapılacaklar:

- [ ] **1. Sunucu Hazırlığı:**
    - EC2 Instance başlat (Ubuntu).
    - RDS (PostgreSQL) veritabanı oluştur.
- [ ] **2. Kurulum:**
    - GitHub'dan kodu sunucuya çek.
    - `.env` ayarlarını yap.
    - `npm run build` ve `pm2` ile uygulamayı başlat.
    - Domain (Godaddy) yönlendirmesini yap.

## 📂 Önemli Dosya Yolları
- **Auth Sayfaları:** `app/auth/` (Login, Register, vb.)
- **Auth API:** `app/api/auth/`
- **Veritabanı Şeması:** `prisma/schema.prisma`
- **Email Servisi:** `lib/email.ts`

## 💬 Notlar
- AWS MFA kurulumu ertelendi, daha sonra yapılabilir.
- Vercel iptal edildi, tamamen AWS altyapısı kullanılıyor.
- Kodların yedeği Git üzerinde güvende.
