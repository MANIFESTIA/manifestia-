export interface RitualStep {
    id: 'preparation' | 'cleansing' | 'charging' | 'sealing';
    title: string;
    description: string;
    text: string; // TTS ile okunacak metin şablonu
    duration: number; // Saniye cinsinden tahmini süre (veya minimum bekleme)
}

export interface RitualDefinition {
    id: string;
    title: string;
    productId?: string; // Bağlı olduğu ürün kodu (örn: 'citrine-777')
    frequencyName: string; // '528Hz Miracle'
    frequencyUrl: string; // Ambiyans ses dosyası (Placeholder)
    intention: string;
    steps: RitualStep[];
}

export const RITUALS: RitualDefinition[] = [
    {
        id: 'abundance-777',
        title: '777 Bolluk Mührü',
        productId: 'citrine-777',
        frequencyName: '528Hz Mucize Frekansı',
        frequencyUrl: '/sounds/528hz-ambient.mp3',
        intention: 'Bolluk ve Bereket',
        steps: [
            {
                id: 'preparation',
                title: 'Kozmik Hizalanma',
                description: 'Rahat bir pozisyon al ve taşını sol avucuna yerleştir.',
                text: "Hoş geldin {name}. Şimdi, elindeki Sitrin taşını sol avucuna al ve kalbinin üzerine koy. Derin bir nefes al... ve verirken günün tüm ağırlığını toprağa bırak.",
                duration: 15
            },
            {
                id: 'cleansing',
                title: 'Gümüş Işık Arınması',
                description: 'Taşının etrafındaki enerjiyi hisset.',
                text: "Gözlerinin önünde, taşından yayılan gümüşi bir ışık hayal et. Bu ışık, senin alanındaki ve paranın etrafındaki tüm blokajları eritiyor. Sadece ışığa odaklan.",
                duration: 20
            },
            {
                id: 'charging',
                title: 'Niyet Yüklemesi',
                description: 'Niyetini taşa fısılda.',
                text: "Şimdi benimle tekrar et: Evrenin sonsuz bolluğu, bu taş aracılığıyla hayatıma akıyor. Ben bolluğu hak ediyorum. 7-7-7. Mühürlendi.",
                duration: 20
            },
            {
                id: 'sealing',
                title: 'Mühürleme Sessizliği',
                description: 'Enerjinin oturması için bekle.',
                text: "Şimdi seni enerjinle baş başa bırakıyorum. Gözlerini açma ve bu frekansın hücrelerine işlemesine izin ver.",
                duration: 180
            }
        ]
    },
    {
        id: 'love-444',
        title: '444 Aşk Çekimi',
        productId: 'amethyst-444',
        frequencyName: '639Hz İlişki Frekansı',
        frequencyUrl: '/sounds/639hz-ambient.mp3',
        intention: 'Sevgi ve Uyum',
        steps: [
            {
                id: 'preparation',
                title: 'Kalp Açılışı',
                description: 'Ametist taşını iki elinin arasına al.',
                text: "Hoş geldin {name}. Ametist taşını iki avucunun arasına al ve dua eder gibi kalbine yaklaştır. Kalp atışlarını hisset.",
                duration: 15
            },
            {
                id: 'cleansing',
                title: 'Mor Alev',
                description: 'Geçmiş kırgınlıkları serbest bırak.',
                text: "Mor bir alevin ellerinin arasından yükseldiğini ve kalbindeki tüm eski kırgınlıkları yaktığını gör. Hafifliyorsun.",
                duration: 20
            },
            {
                id: 'charging',
                title: 'Aşk Daveti',
                description: 'Sevgi frekansını yay.',
                text: "Tekrar et: Ben sevgiyim. Ben sevilenim. Doğru kalp, doğru zamanda beni buluyor. 4-4-4. Mühürlendi.",
                duration: 20
            },
            {
                id: 'sealing',
                title: 'Mühürleme Sessizliği',
                description: 'Derinleşme zamanı.',
                text: "Sessizliğin içindeki cevabı dinle.",
                duration: 180
            }
        ]
    },
    {
        id: 'moon-ritual',
        title: 'Dolunay Arınması',
        productId: 'moonstone-000',
        frequencyName: '417Hz Değişim Frekansı',
        frequencyUrl: '/sounds/417hz-ambient.mp3',
        intention: 'Arınma ve Bırakma',
        steps: [
            {
                id: 'preparation',
                title: 'Ay Işığı',
                description: 'Ay taşını alnına (3. Gözüne) dokundur.',
                text: "Ayın gümüş ışığı odayı dolduruyor. Zihnindeki tüm karmaşayı bu ışığa teslim etmeye hazır mısın {name}?",
                duration: 15
            },
            {
                id: 'cleansing',
                title: 'Gelgit Etkisi',
                description: 'Duygularını serbest bırak.',
                text: "Denizlerin kabarması gibi, içindeki bastırılmış duyguların yüzeye çıkmasına izin ver. Onları yargılama, sadece izle ve akıp gitmelerine izin ver.",
                duration: 30
            },
            {
                id: 'charging',
                title: 'Yeni Başlangıç',
                description: 'Boşalan yere ışığı doldur.',
                text: "Eskiyi bıraktın. Şimdi tekrar et: Hayatımın kontrolü bende. Geçmişi şifalandırıyor, geleceği kucaklıyorum. Mühürlendi.",
                duration: 20
            },
            {
                id: 'sealing',
                title: 'Mühürleme',
                description: 'Sessizlikte kal.',
                text: "Ruhun şifalanırken sessizce bekle.",
                duration: 120
            }
        ]
    },
    {
        id: 'protection-shield',
        title: 'Koruma Kalkanı',
        productId: 'obsidian-999',
        frequencyName: '396Hz Kök Çakra',
        frequencyUrl: '/sounds/396hz-ambient.mp3',
        intention: 'Korunma ve Güç',
        steps: [
            {
                id: 'preparation',
                title: 'Köklenme',
                description: 'Ayaklarını yere sağlam bas.',
                text: "Kendini dev bir çınar ağacı gibi hisset. Köklerin yerin derinliklerine iniyor. Güvendesin.",
                duration: 15
            },
            {
                id: 'cleansing',
                title: 'Obsidyen Duvarı',
                description: 'Etrafında siyah bir kalkan imgele.',
                text: "Etrafında obsidyen taşından örülmüş, aşılamaz bir enerji duvarı hayal et. Hiçbir negatif titreşim bu duvardan geçemez.",
                duration: 25
            },
            {
                id: 'charging',
                title: 'Güç İlanı',
                description: 'Sınırlarını çiz.',
                text: "Tekrar et: Enerjim sadece bana aittir. İznim olmadan kimse alanıma giremez. Ben gücüm. Korunuyorum.",
                duration: 20
            },
            {
                id: 'sealing',
                title: 'Mühürleme',
                description: 'Gücünü hisset.',
                text: "Bu kalkan gün boyu seninle olacak.",
                duration: 60
            }
        ]
    },
    {
        id: 'career-success',
        title: 'Kariyer ve Başarı',
        productId: 'tigerseye-888',
        frequencyName: '888Hz Başarı Frekansı',
        frequencyUrl: '/sounds/888hz-ambient.mp3',
        intention: 'Odak ve Başarı',
        steps: [
            {
                id: 'preparation',
                title: 'Hedef Belirleme',
                description: 'Gözlerini kapat ve zirveyi hayal et.',
                text: "Zihninde olmak istediğin en yüksek noktayı canlandır. Oradaki sen nasıl görünüyor? Nasıl hissediyor?",
                duration: 20
            },
            {
                id: 'cleansing',
                title: 'Kaplan Gözü',
                description: 'Cesaretini topla.',
                text: "Kaplan Gözü taşının altın rengi hareleri, içindeki erteleme ve korku bulutlarını dağıtıyor. Harekete geçmeye hazırsın.",
                duration: 20
            },
            {
                id: 'charging',
                title: 'Zafer Kodlaması',
                description: 'Potansiyelini kabul et.',
                text: "Söyle: Potansiyelimi gerçekleştirmek için gereken her şeye sahibim. Başarı benim doğal hakkım. 8-8-8. Mühürlendi.",
                duration: 20
            },
            {
                id: 'sealing',
                title: 'Mühürleme',
                description: 'Vizyonu sabitle.',
                text: "Bu vizyon artık senin gerçeğin.",
                duration: 90
            }
        ]
    },
    {
        id: 'self-love',
        title: 'Öz Sevgi',
        productId: 'rosequartz-111',
        frequencyName: '528Hz Sevgi Frekansı',
        frequencyUrl: '/sounds/528hz-ambient.mp3',
        intention: 'Kendini Kabul',
        steps: [
            {
                id: 'preparation',
                title: 'Kendine Dönüş',
                description: 'Ellerini kendine sarılacak şekilde çaprazla.',
                text: "{name}, bu an sadece senin için. Kendine şefkatli bir kucaklama ver.",
                duration: 15
            },
            {
                id: 'cleansing',
                title: 'Pembe Işık',
                description: 'Kalp çakranı yumuşat.',
                text: "Kalbinden yayılan yumuşak pembe bir ışığın tüm bedenini sardığını hisset. Kendine karşı tüm eleştirilerin bu ışıkta eriyip gidiyor.",
                duration: 25
            },
            {
                id: 'charging',
                title: 'Ayna Egzersizi',
                description: 'Kendini onurlandır.',
                text: "Tekrar et: Olduğum halimle tam ve yeterliyim. Kendimi seviyorum, kendimi onaylıyorum. Ben bir mucizeyim.",
                duration: 20
            },
            {
                id: 'sealing',
                title: 'Mühürleme',
                description: 'Sevgiyi demle.',
                text: "Bu sevgi hissi, senin doğal halin.",
                duration: 90
            }
        ]
    }
];
