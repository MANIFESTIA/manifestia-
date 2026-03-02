"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-900 to-pink-900 p-4 md:p-8">
            {/* Header */}
            <div className="max-w-4xl mx-auto mb-6 flex items-center justify-between">
                <button onClick={() => router.back()} className="flex items-center gap-2 text-white/70 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10">
                    <ArrowLeft className="w-5 h-5" />
                    <span className="hidden sm:inline">Geri Dön</span>
                </button>
                <Link href="/" className="flex items-center gap-3 group">
                    <img src="/logo-ankh.png" alt="Logo" className="w-8 h-8 group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                    <h1 className="text-xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-amber-200 drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                        TheManifest
                    </h1>
                </Link>
            </div>

            <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-6 md:p-8 shadow-2xl">
                <h1 className="text-3xl font-bold text-white mb-6">Gizlilik Politikası</h1>
                <p className="text-white/80 mb-4">TheManifest - Kozmik Rehberin</p>

                <div className="prose prose-invert max-w-none text-white/90 space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold text-purple-300">1. Giriş</h2>
                        <p>
                            TheManifest ("Kozmik Rehberin" veya "Uygulama") olarak, www.themanifest.co web sitemizi ve mobil uygulamamızı ziyaret eden kullanıcılarımızın gizliliğine ve kişisel verilerinin korunmasına büyük önem veriyoruz. Kişiselleştirilmiş Astroloji ve Tarot Uygulaması hizmetlerimizi sunarken, Kişisel Verilerin Korunması Kanunu (KVKK) ve Genel Veri Koruma Yönetmeliği (GDPR) kapsamında veri sorumlusu sıfatı ile hareket etmekteyiz.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-purple-300">2. Toplanan Veriler</h2>
                        <p>
                            Size kişiselleştirilmiş bir deneyim sunabilmek amacıyla aşağıdaki kişisel verilerinizi toplamaktayız:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Kimlik ve İletişim Bilgileri:</strong> İsim, e-posta adresi, hesap şifresi.</li>
                            <li><strong>Astrolojik ve Kişisel Bilgiler:</strong> Doğum tarihi, doğum saati, doğum yeri bilgileri.</li>
                            <li><strong>Kullanım Verileri:</strong> Uygulama içi etkileşimleriniz, tercihleriniz.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-purple-300">3. Verilerin Kullanım Amaçları</h2>
                        <p>Topladığımız veriler yasalara uygun bir şekilde ve şu amaçlarla kullanılmaktadır:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Doğum haritası hesaplamalarını doğru bir şekilde yapabilmek.</li>
                            <li>Sizin için kişiselleştirilmiş tarot ve astroloji yorumları sunabilmek.</li>
                            <li>Yapay zeka (AI) destekli sohbet ve rehberlik hizmeti sağlamak.</li>
                            <li>Uygulama içindeki hesap yönetimi ve güvenliği sağlamak.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-purple-300">4. Veri Güvenliği</h2>
                        <p>
                            Verileriniz Neon PostgreSQL veritabanımızda güvenli bir şekilde saklanmakta olup, veri güvenliğini sağlamak amacıyla uyguladığımız bazı tedbirler şunlardır:
                        </p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Tüm bağlantılar <strong>HTTPS</strong> protokolü üzerinden şifreli bir biçimde sağlanmaktadır.</li>
                            <li>Kullanıcı şifreleri tek yönlü şifreleme algoritması olan <strong>bcrypt</strong> ile şifrelenmektedir.</li>
                            <li>Veritabanına erişimler güvenli, kısıtlanmış ve denetimli tutulmaktadır.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-purple-300">5. Üçüncü Taraf Paylaşımlar (API)</h2>
                        <p>
                            Kişiselleştirilmiş içerik ve AI destekli sohbet imkanları sunabilmek amacıyla <strong>Google Gemini API</strong> altyapısını kullanıyoruz. Sisteme girilen kullanıcı girdileri, uygulamanın amacına uygun yanıtlar ve deneyimler oluşturmak için ilgili altyapıyla anonimleştirilerek paylaşılabilir. Harici olarak kullanıcı bilgileri, onayınız olmadan reklam veya pazarlama amaçlı üçüncü şahıslara satılmaz ve devredilmez.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-purple-300">6. Çerezler (Cookies)</h2>
                        <p>
                            Uygulamamıza giriş yaptığınızda güvenli bir oturum sağlamak için NextAuth session yapısını kullanıyoruz. Çerezler, kullanıcı deneyimini iyileştirmek, giriş sürecini hızlandırmak ve oturum yönetimini sorunsuz bir şekilde yerine getirmek amacıyla kullanılmaktadır.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-purple-300">7. Kullanıcı Hakları (KVKK & GDPR Uyumlu)</h2>
                        <p>KVKK Madde 11 ve GDPR gereğince sistemimize kayıtlı olan her kullanıcının hakları şunlardır:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
                            <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi veya bir kopyasını talep etme (Veri Taşınabilirliği),</li>
                            <li>Verilerinizin eksik veya yanlış işlenmesi durumunda düzeltilmesini isteme,</li>
                            <li>Verilerinizle ilgili yasal şartlar oluştuğunda silinmesini (Unutulma Hakkı) veya yok edilmesini talep etme.</li>
                        </ul>
                        <p className="mt-2 text-white/80">Bu haklarınızı kullanmak için iletişim adresimizden bizimle iletişime geçebilirsiniz.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-purple-300">8. Veri Saklama Süresi</h2>
                        <p>
                            Kişisel bilgileriniz, sunduğumuz hizmetlerden faydalandığınız veya yasal saklama zorunluluğumuz bulunan süre boyunca saklanır. Hesabınızı kapattığınız takdirde verileriniz yasal çerçevede en kısa sürede kalıcı olarak silinir.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-purple-300">9. Değişiklikler</h2>
                        <p>
                            TheManifest, bu Gizlilik Politikası'nda zaman zaman değişiklik yapma hakkını saklı tutar. Değişiklikler sitemizde yayınlandığı an yürürlüğe girer.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-purple-300">10. İletişim</h2>
                        <p>
                            Veri koruması ile ilgili her türlü soru, işlem talepleri veya şikayetleriniz için aşağıdaki mail kanalı ile bize ulaşabilirsiniz:
                            <br /><br />
                            <strong>E-posta adresi:</strong> businessthemanifest@gmail.com
                        </p>
                    </section>

                    <p className="text-sm text-white/50 border-t border-white/20 pt-6 mt-8">
                        Son Güncelleme: 15 Şubat 2025
                    </p>
                </div>
            </div>
        </div>
    );
}
