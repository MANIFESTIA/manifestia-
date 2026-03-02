import React from 'react';

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-purple-900 to-pink-900 p-8">
            <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-2xl">
                <h1 className="text-3xl font-bold text-white mb-6">Kullanım Şartları</h1>
                <p className="text-white/80 mb-4">TheManifest - Kozmik Rehberin</p>

                <div className="prose prose-invert max-w-none text-white/90 space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold text-purple-300">1. Hizmet Tanımı</h2>
                        <p>
                            TheManifest (www.themanifest.co), kişiselleştirilmiş astroloji, doğum haritası ve yapay zeka destekli tarot rehberliği sunan dijital bir platformdur. Kullanıcılar hesap oluşturarak sağladığımız bu eğlence ve kişisel gelişim araçlarından yararlanabilirler.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-purple-300">2. Kullanım Şartları ve Ön Koşullar</h2>
                        <p>
                            Hizmetlerimizi kullanarak veya sitemize erişim sağlayarak burada yer alan şartları okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan edersiniz. ABD'nin COPPA yasaları başta olmak üzere uluslararası standartları gözetmekteyiz; bu sebeple TheManifest'i kullanabilmek için en az 13 yaşında olmanız gerekmektedir.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-purple-300">3. Kullanıcı Hesabı ve Sorumlulukları</h2>
                        <p>
                            Kullanıcı hesabı oluşturulurken sunulan verilerin doğruluğu tamamen kullanıcının sorumluluğundadır. Hesap bilgilerinizin gizliliğinden veya şifrenizin üçüncü şahıslar ile paylaşılmasından doğabilecek zararlardan uygulamamız sorumlu değildir.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-purple-300">4. Abonelik ve Ödemeler</h2>
                        <p>TheManifest aşağıdaki üyelik modellerini desteklemektedir:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li><strong>Free (Ücretsiz) Abonelik:</strong> Günlük 1 tarot çekimi ve temel harita özellikleri sunulur.</li>
                            <li><strong>Pro Abonelik:</strong> Sınırsız tarot imkanı ve yapay zeka tarafından sağlanan özel gelişmiş sohbet özellikleri barındırır.</li>
                        </ul>
                        <p className="mt-2">Ödemeler belirlenen hizmet sağlayıcılar üzerinden tahsil edilecek olup, aboneliğinizi dilediğiniz fatura döneminden önce iptal edebilirsiniz.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-purple-300">5. İptal ve İade</h2>
                        <p>
                            Sunduğumuz dijital abonelik koşullarına göre, hizmetlerden yararlanmaktan vazgeçtiğiniz durumlarda 14 gün içinde cayma ve iade hakkınız mevcuttur. Eğer hizmet (kişiselleştirilmiş dijital ürün / anında kullanım) satın alımdan sonra aktif bir şekilde kullanılmış ve tüketilmiş ise iade değerlendirme sonuçları değişiklik gösterebilir.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-purple-300">6. Fikri Mülkiyet</h2>
                        <p>
                            TheManifest marka ismi, sitede bulunan tüm tasarım öğeleri, algoritmik hesaplamalar, logolar ve yazılım yapısı bütünüyle TheManifest'e ait olup koruma altındadır. Kodların kopyalanması veya tasarımların ticari kullanım amacıyla yeniden dağıtılması yasaktır.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-purple-300">7. Sorumluluk Reddi (Disclaimer)</h2>
                        <p>
                            TheManifest tarafından sunulan astrolojik analizler veya tarot yorumları yalnızca eğlence ve kişisel gelişim amaçlıdır. Verilen mesajlar, öngörüler ve yapay zeka tavsiyeleri; hiçbir koşulda profesyonel <strong>tıbbi, hukuki veya finansal tavsiye</strong> yerine geçmez. Sistemden alınan sonuçlar üzerinden alacağınız kararlar tamamen size aittir, oluşabilecek sonuçlardan yapımcı firma sorumlu tutulamaz.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-purple-300">8. Yasaklanan Kullanımlar</h2>
                        <p>
                            Uygulamamızı yasadışı, zarar verici ve tehdit içerikli bir şekilde kullanılamaz. Açıklanmış zafiyet aramak, ters mühendislik, platform aracılığıyla spam mesajlar oluşturmak ya da sahte hesaplar ile suistimale yeltenmek açıkça yasaklanmıştır.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-purple-300">9. Hesap Askıya Alma ve Kapatma</h2>
                        <p>
                            TheManifest; platform kurallarını, şartları, yasal mevzuatı veya nezaket kurallarını ihlal eden hesapları önceden uyarı yapmaksızın dondurma veya geri alınamaz şekilde kalıcı olarak kapatma hakkını saklı tutar.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-purple-300">10. Değişiklikler</h2>
                        <p>
                            Mevcut hizmet şartları önceden haber verilmeksizin değiştirilebilir veya güncellenebilir. Güncel sürümler yayımlandıkları tarihten itibaren platformda bulunan tüm kullanıcılar için geçerli sayılır.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-purple-300">11. İletişim</h2>
                        <p>
                            Soru, görüş, destek ve iletişim için belirlenmiş kanalımızı kullanarak bizlere ulaşabilirsiniz:
                            <br /><br />
                            <strong>E-posta:</strong> businessthemanifest@gmail.com
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
