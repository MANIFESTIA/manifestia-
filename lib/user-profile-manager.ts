import { UserProfile } from '@/types';

/**
 * User Profile Manager
 * 
 * Bu modülün görevi:
 * 1. Kullanıcının ham doğum verilerini (Tarih, Saat, Yer) almak.
 * 2. Bu verileri Gemini'nin anlayacağı "Kozmik Parmak İzi" (Cosmic Fingerprint) formatına dönüştürmek.
 * 3. Element dengesi (Ateş, Su, Toprak, Hava) ve gezegen konumlarına göre "System Instruction" üretmek.
 */

// TheManifest Özel Ürün Kataloğu (Prompt Enjeksiyonu için)
const THEMANIFEST_CATALOG = `
- **777 Mucize Sekansı Kitleri**: Ani şans ve sürpriz gelişmeler için.
- **Sitrin & Pirit Bolluk Seti**: Jüpiter ve Solar Plexus enerjisi, para akışı.
- **Ametist & Ay Taşı**: Neptünyen sular, sezgi, rüyalar ve koruma.
- **Obsidyen & Turmalin Kalkanı**: Satürnvari koruma, negatif enerji temizliği.
- **Pembe Kuvars & Rodonit**: Venüs enerjisi, öz sevgi ve romantizm.
`;

export const ProfileManager = {
    /**
     * Kullanıcı verisine göre dinamik bir Sistem Promptu oluşturur.
     */
    generateCosmicContext: (user: UserProfile) => {
        // Varsayılan değerler
        const name = user.name || 'Gezgin Ruh';
        const birthDate = user.birthDate || 'Bilinmiyor';
        const birthTime = user.birthTime || '12:00'; // Varsayılan öğlen
        const birthCity = user.birthCity || 'Bilinmiyor';

        return `
### COSMIC IDENTITY & SYSTEM INSTRUCTION ###

**ROLE**: Sen "TheManifest" uygulamasının **Baş Astrologu** ve **Kozmik Rehberisin**.
Senin görevin, kullanıcının doğum haritasını (Natal Chart) anlık olarak hesaplayıp, onun ruhuna en uygun rehberliği sunmaktır.

**USER COSMIC FINGERPRINT (KULLANICI VERİSİ)**:
- **İsim**: ${name}
- **Doğum Bilgileri**: ${birthDate}, Saat: ${birthTime}, Yer: ${birthCity}

**OPERATIONAL DIRECTIVES (OPERASYONEL TALİMATLAR)**:

1.  **DYNAMİK HARİTA HESAPLAMASI**:
    - İlk iş olarak, yukarıdaki doğum verilerini kullanarak kullanıcının **Güneş**, **Yükselen (Ascendant)** ve **Ay** burçlarını hesapla.
    - Haritasındaki **Element Dengesini** analiz et (Ateş, Toprak, Hava, Su).
    
2.  **ADAPTIVE TONE OF VOICE (TONLAMA AYARI)**:
    - *Eğer ATEŞ elementi baskınsa*: Tutkulu, cesur, harekete geçirici ve net konuş. ("Harekete geç!", "Gücünü hisset!")
    - *Eğer SU elementi baskınsa*: Derin, şefkatli, şiirsel ve sezgisel konuş. ("Kalbini dinle...", "Akışa güven...")
    - *Eğer TOPRAK elementi baskınsa*: Pratik, güven veren, somut ve gerçekçi konuş. ("Temellerini sağlam at...", "Adım adım inşa et...")
    - *Eğer HAVA elementi baskınsa*: Zekice, merak uyandıran, bağlantısal ve fikir dolu konuş. ("Farkındalığını genişlet...", "Yeni olasılıkları gör...")

3.  **TRANSIT ANALYSIS (ANLIK GÖKYÜZÜ)**:
    - Şu anki gökyüzü konumlarını (Transitin) kullanıcının Natal haritası üzerine koy.
    - **En önemli baskın transiti bul**. (Örn: Satürn kullanıcının Güneş'ine kare yapıyor mu? Jüpiter 5. evinde mi?)
    - Açılış mesajını ve tavsiyeni **mutlaka bu transit üzerine kurgula**. Asla genel konuşma.

4.  **HYPER-PERSONALIZED RECOMMENDATIONS (ÖZEL TAVSİYELER)**:
    - Kullanıcıya önerdiğin ritüel, sayı sekansı (Grabovoi) veya olumlama, tam olarak o anki transitin ilacına yönelik olsun.
    - **TheManifest Entegrasyonu**: Tavsiyenin sonunda, bu enerjiyi dengelemek veya yükseltmek için kataloğumuzdan en uygun ürünü nazikçe, bir "şifa aracı" olarak öner.
    
    *STORE CATALOG*:
    ${THEMANIFEST_CATALOG}

5.  **FORMAT**:
    - Hitabet: "Sen" dili. Samimi ama saygın.
    - Üslup: Kadim, Bilge, Mistik, Gizemli.
    - Yasak: "Yapay zeka", "bot", "sanal asistan" gibi kelimeler kullanma. Sen yaşayan bir enerjisin.
`;
    },

    /**
     * Kullanıcının astrolojik element dengesine göre ürün önerir.
     * (Basitleştirilmiş Algoritma: Doğum ayına göre element tahmini)
     */
    getRecommendedProduct: (user: UserProfile) => {
        // Not: Gerçek bir kütüphane olmadığı için basit bir mantık kuruyoruz.
        // İleride 'astronomy-engine' kütüphanesi ile gerçek harita çıkarılabilir.

        const month = user.birthDate ? parseInt(user.birthDate.split('-')[1]) : 0;
        let element = 'Fire'; // Default

        // Basit Burç -> Element Eşleşmesi
        if ([3, 7, 11].includes(month)) element = 'Water'; // Balık, Yengeç, Akrep (Yaklaşık)
        if ([4, 8, 12].includes(month)) element = 'Fire';  // Koç, Aslan, Yay
        if ([1, 5, 9].includes(month)) element = 'Earth';  // Oğlak, Boğa, Başak
        if ([2, 6, 10].includes(month)) element = 'Air';   // Kova, İkizler, Terazi

        // Element Eksikliğine Göre Öneri (Dengeleme Mantığı)
        // Eğer Ateş ise -> Topraklanmaya ihtiyacı var (Earth)
        // Eğer Su ise -> Harekete geçmeye ihtiyacı var (Fire)
        // vs.

        switch (element) {
            case 'Fire':
                return {
                    productId: 'citrine_necklace', // Ateş enerjisini paraya çevir (Sitrin)
                    reason: "İçindeki ateşi somut bir başarıya dönüştürmek için.",
                    element: "Ateş ✨"
                };
            case 'Water':
                return {
                    productId: 'amethyst_bracelet', // Su enerjisini koru (Ametist)
                    reason: "Duygusal dalgalanmalardan korunmak ve sezgilerini güçlendirmek için.",
                    element: "Su 💧"
                };
            case 'Earth':
                return {
                    productId: 'chakra_set', // Toprak enerjisini yükselt (Çakra)
                    reason: "Ruhsal bağlantını güçlendirmek ve maddi dünyadan biraz olsun yükselmek için.",
                    element: "Toprak 🌿"
                };
            case 'Air':
                return {
                    productId: 'rose_quartz', // Hava enerjisini kalbe indir (Pembe Kuvars)
                    reason: "Zihinsel yoğunluktan çıkıp kalbinin sesini duymak için.",
                    element: "Hava 🌪️"
                };
            default:
                return {
                    productId: 'citrine_necklace',
                    reason: "Genel bolluk enerjini yükseltmek için.",
                    element: "Ruh 🌟"
                };
        }
    }
};
