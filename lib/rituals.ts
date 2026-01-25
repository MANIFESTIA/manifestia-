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
        frequencyUrl: '/sounds/528hz-ambient.mp3', // Kullanıcı bu dosyayı eklemeli
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
                duration: 180 // 3 dakika sessizlik
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
    }
];
