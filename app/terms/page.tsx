import React from 'react';
import { Scale, AlertCircle, FileText, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-[#0F0F12] text-white p-6 md:p-12 font-sans">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-manifest-muted hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    <span>Ana Sayfaya Dön</span>
                </Link>

                <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                        <Scale className="w-8 h-8 text-indigo-400" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-blue-200">
                            Kullanım Koşulları
                        </h1>
                        <p className="text-manifest-muted text-sm mt-1">Son Güncelleme: 5 Şubat 2026</p>
                    </div>
                </div>

                <div className="space-y-8 text-gray-300 leading-relaxed">
                    <section className="bg-white/5 border border-white/5 rounded-2xl p-6 md:p-8">
                        <h2 className="text-xl font-bold text-white mb-4">
                            1. Hizmetin Niteliği
                        </h2>
                        <p className="mb-4">
                            TheManifest ("Uygulama"), eğlence ve kişisel gelişim amaçlı bir astroloji, tarot ve spiritüel rehberlik uygulamasıdır.
                        </p>
                        <div className="flex items-start gap-3 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                            <AlertCircle className="w-6 h-6 text-orange-400 flex-shrink-0" />
                            <p className="text-sm text-orange-200">
                                <strong>Yasal Uyarı:</strong> Uygulama tarafından sunulan içerikler, tavsiyeler ve öngörüler profesyonel tıbbi, hukuki veya finansal danışmanlık yerine geçmez. Hayati kararlarınızda lütfen uzmanlara danışınız.
                            </p>
                        </div>
                    </section>

                    <section className="bg-white/5 border border-white/5 rounded-2xl p-6 md:p-8">
                        <h2 className="text-xl font-bold text-white mb-4">
                            2. Üyelik ve Hesap Güvenliği
                        </h2>
                        <ul className="list-disc pl-5 space-y-2 text-sm">
                            <li>Uygulamayı kullanmak için 18 yaşından büyük olmanız gerekmektedir.</li>
                            <li>Hesap bilgilerinizin güvenliğinden siz sorumlusunuz.</li>
                            <li>Tek bir kullanıcı hesabının birden fazla kişi tarafından paylaşılması yasaktır.</li>
                        </ul>
                    </section>

                    <section className="bg-white/5 border border-white/5 rounded-2xl p-6 md:p-8">
                        <h2 className="text-xl font-bold text-white mb-4">
                            3. Ödemeler ve Şartlar
                        </h2>
                        <p className="mb-4 text-sm">
                            Uygulama içi satın alımlar (Elmaslar, premium özellikler) Apple App Store ve Google Play Store üzerinden gerçekleştirilir. İadeler, ilgili mağazanın politikalarına tabidir.
                        </p>
                    </section>

                    <section className="bg-white/5 border border-white/5 rounded-2xl p-6 md:p-8">
                        <h2 className="text-xl font-bold text-white mb-4">
                            4. Davranış Kuralları
                        </h2>
                        <p className="mb-2 text-sm">Aşağıdaki eylemler kesinlikle yasaktır:</p>
                        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-400">
                            <li>Uygulamanın tersine mühendislik ile çözülmeye çalışılması.</li>
                            <li>Otomatik botlar veya scriptler ile veri çekilmesi.</li>
                            <li>Diğer kullanıcılara rahatsızlık verici davranışlar.</li>
                        </ul>
                    </section>
                </div>

                <div className="mt-12 text-center text-xs text-manifest-muted/50 border-t border-white/5 pt-8">
                    &copy; 2026 TheManifest. Hizmeti kullanarak bu koşulları kabul etmiş sayılırsınız.
                </div>
            </div>
        </div>
    );
}
