import React from 'react';
import { Shield, Lock, Eye, FileText, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-[#0F0F12] text-white p-6 md:p-12 font-sans">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-manifest-muted hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    <span>Ana Sayfaya Dön</span>
                </Link>

                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                        <Shield className="w-8 h-8 text-purple-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-pink-200">
                            Gizlilik Politikası
                        </h1>
                        <p className="text-manifest-muted text-sm mt-1">Son Güncelleme: 5 Şubat 2026</p>
                    </div>
                </div>

                <div className="space-y-8 text-gray-300 leading-relaxed">
                    <section className="bg-white/5 border border-white/5 rounded-2xl p-6 md:p-8">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Lock className="w-5 h-5 text-purple-400" />
                            1. Veri Toplama ve Kullanım
                        </h2>
                        <p className="mb-4">
                            TheManifest ("Uygulama") olarak, gizliliğinize önem veriyoruz. Hizmetlerimizi sunabilmek için aşağıdaki bilgileri topluyoruz:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-sm">
                            <li><strong>Kişisel Bilgiler:</strong> Adınız, doğum tarihiniz, doğum saatiniz ve doğum yeriniz (Astroloji haritası oluşturmak için gereklidir).</li>
                            <li><strong>Hesap Bilgileri:</strong> E-posta adresiniz ve şifreniz (Güvenli giriş için).</li>
                            <li><strong>Kullanım Verileri:</strong> Günlük girişleriniz, aura analiz sonuçlarınız ve tarot okumalarınız (Size kişiselleştirilmiş bir deneyim sunmak için saklanır).</li>
                        </ul>
                    </section>

                    <section className="bg-white/5 border border-white/5 rounded-2xl p-6 md:p-8">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <Eye className="w-5 h-5 text-cyan-400" />
                            2. Verilerinizin Güvenliği
                        </h2>
                        <p className="mb-4">
                            Verileriniz endüstri standardı şifreleme yöntemleri ile korunmaktadır. Doğum haritası ve diğer kişisel verileriniz asla 3. taraflarla paylaşılmaz veya satılmaz.
                        </p>
                        <p className="text-sm">
                            Yapay zeka analizleri için gönderilen veriler anonimleştirilerek işlenir ve model eğitimi için kullanılmaz.
                        </p>
                    </section>

                    <section className="bg-white/5 border border-white/5 rounded-2xl p-6 md:p-8">
                        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                            <FileText className="w-5 h-5 text-pink-400" />
                            3. Haklarınız
                        </h2>
                        <p className="mb-4">
                            Kullanıcı olarak aşağıdaki haklara sahipsiniz:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-sm">
                            <li>Hesabınızı ve tüm verilerinizi dilediğiniz zaman silme.</li>
                            <li>Hangi verilerin saklandığını öğrenme ve talep etme.</li>
                            <li>Yanlış bilgilerin düzeltilmesini isteme.</li>
                        </ul>
                        <p className="mt-4 text-sm text-manifest-muted">
                            Bu talepleriniz için <strong>support@manifestia.app</strong> adresinden bizimle iletişime geçebilirsiniz.
                        </p>
                    </section>
                </div>

                <div className="mt-12 text-center text-xs text-manifest-muted/50 border-t border-white/5 pt-8">
                    &copy; 2026 TheManifest. Tüm hakları saklıdır.
                </div>
            </div>
        </div>
    );
}
