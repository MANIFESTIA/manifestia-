import { Flame, Moon, Sun, Wind, Heart, Shield, Coins, Eye, Zap, Sparkles, Cloud, Star } from 'lucide-react';

export interface RitualStep {
    text: string;
    duration: number; // seconds
    animation: 'breathe' | 'focus' | 'stars' | 'fire';
}

export interface Ritual {
    id: string;
    baseTitle: string; // The core name
    baseDescription: string;
    type: 'burning' | 'meditation' | 'manifestation';
    xpReward: number;
    duration: string;
    iconName: string;
    color: string;
    audioTrack?: string;
    // Variations for daily rotation
    variations: {
        title: string;
        description: string;
        steps: RitualStep[];
    }[];
}

// 10 "Real" Rituals
export const RITUALS: Ritual[] = [
    {
        id: 'release-burning',
        baseTitle: 'Serbest Bırakma Ateşi',
        baseDescription: 'Sana hizmet etmeyen korku ve endişeleri evrene teslim et.',
        type: 'burning',
        xpReward: 30,
        duration: '3 Dk',
        iconName: 'Flame',
        color: 'from-orange-500 to-red-600',
        audioTrack: '/sounds/zen.ogg',
        variations: [
            {
                title: 'Korku Ateşi',
                description: 'Bugün sadece seni durduran korkularını yakmaya odaklanıyoruz.',
                steps: [
                    { text: "Önünde, kutsal ve güvenli bir ateşin yandığını hayal et.", duration: 15, animation: 'focus' },
                    { text: "Seni en çok korkutan düşünceyi bir kağıda yazdığını düşün.", duration: 20, animation: 'focus' },
                    { text: "Kağıdı ateşe at. Yanışını ve küle dönüşmesini izle.", duration: 25, animation: 'fire' },
                    { text: "Dumanın gökyüzüne karışıp yok oluşunu hisset.", duration: 20, animation: 'breathe' },
                    { text: "Korku gitti. Sen özgürsün.", duration: 15, animation: 'stars' }
                ]
            },
            {
                title: 'Geçmişi Bırakma',
                description: 'Geçmişteki pişmanlıklarını ve yüklerini ateşe ver.',
                steps: [
                    { text: "Sırtında taşıdığın ağır yükü yere indir.", duration: 15, animation: 'breathe' },
                    { text: "Bu yük, artık değiştiremeyeceğin geçmişindir.", duration: 20, animation: 'focus' },
                    { text: "Mor bir alevin bu yükü yavaşça sardığını gör.", duration: 25, animation: 'fire' },
                    { text: "Alevler yükseldikçe geçmişin ağırlığı hafifliyor.", duration: 20, animation: 'stars' },
                    { text: "Şimdi ve buradasın. Geçmiş bitti.", duration: 15, animation: 'breathe' }
                ]
            },
            {
                title: 'Endişe Arınması',
                description: 'Gelecek kaygılarını şimdi ve burada, ateşe teslim et.',
                steps: [
                    { text: "Derin bir nefes al ve zihnindeki gürültüyü fark et.", duration: 15, animation: 'focus' },
                    { text: "Her bir endişe, birer kuru yaprak gibi elinde.", duration: 20, animation: 'stars' },
                    { text: "Yaprakları teker teker ateşe at.", duration: 30, animation: 'fire' },
                    { text: "Çatırtılarını duy. Enerjinin temizlendiğini hisset.", duration: 20, animation: 'breathe' },
                    { text: "Güvendesin. Her şey yolunda.", duration: 15, animation: 'focus' }
                ]
            }
        ]
    },
    {
        id: 'cosmic-shield',
        baseTitle: 'Kozmik Kalkan',
        baseDescription: 'Negatif enerjilere karşı auranı koruma altına al.',
        type: 'meditation',
        xpReward: 25,
        duration: '4 Dk',
        iconName: 'Shield',
        color: 'from-blue-500 to-cyan-400',
        audioTrack: '/sounds/cosmos.ogg',
        variations: [
            {
                title: 'Korunma Ritüeli',
                description: 'Etrafında geçilmez bir mavi ışık küresi oluştur.',
                steps: [
                    { text: "Gözlerini kapat ve derin bir nefes al.", duration: 10, animation: 'focus' },
                    { text: "Tepenizden masmavi bir ışığın döküldüğünü hayal et.", duration: 20, animation: 'stars' },
                    { text: "Bu ışık tüm bedenini sararak bir küre oluşturuyor.", duration: 20, animation: 'breathe' },
                    { text: "Dışarıdan gelen her negatif enerji bu kalkana çarpıp eriyor.", duration: 30, animation: 'focus' },
                    { text: "Güvendesin. Korumadasın.", duration: 10, animation: 'breathe' }
                ]
            },
            {
                title: 'Ayna Koruması',
                description: 'Sana yönelen kem gözleri kaynağına sevgiyle iade et.',
                steps: [
                    { text: "Derin nefeslerle merkezine dön.", duration: 15, animation: 'breathe' },
                    { text: "Bedeninin etrafında dışa dönük aynalar olduğunu imgele.", duration: 20, animation: 'focus' },
                    { text: "Sana gelen her enerji aynadan yansıyıp evrene karışıyor.", duration: 20, animation: 'stars' },
                    { text: "Sen sadece kendi ışığını yayıyorsun.", duration: 20, animation: 'breathe' },
                    { text: "Hafifledin.", duration: 10, animation: 'focus' }
                ]
            }
        ]
    },
    {
        id: 'abundance-magnet',
        baseTitle: 'Bolluk Mıknatısı',
        baseDescription: 'Evrenin sınırsız bereketini hayatına çek.',
        type: 'manifestation',
        xpReward: 40,
        duration: '3 Dk',
        iconName: 'Coins',
        color: 'from-emerald-400 to-green-600',
        audioTrack: '/sounds/amazon.ogg',
        variations: [
            {
                title: 'Altın Yağmuru',
                description: 'Gökten yağan bereket enerjisine kendini aç.',
                steps: [
                    { text: "Avuçlarını yukarıya bakacak şekilde aç.", duration: 10, animation: 'focus' },
                    { text: "Gökyüzünden altın renkli bir yağmurun yağdığını hayal et.", duration: 20, animation: 'stars' },
                    { text: "Her damla sana şans, para ve bolluk getiriyor.", duration: 20, animation: 'breathe' },
                    { text: "Duyduğun şükran hissini kalbinde büyüt.", duration: 20, animation: 'focus' },
                    { text: "Bereketi kabul ediyorum de.", duration: 10, animation: 'breathe' }
                ]
            },
            {
                title: 'Yeşil Enerji Akışı',
                description: 'Doğanın büyüme enerjisiyle finansal kanallarını aç.',
                steps: [
                    { text: "Ayaklarının toprağa bastığını hisset.", duration: 15, animation: 'focus' },
                    { text: "Topraktan gelen zümrüt yeşili bir ışık bedenine doluyor.", duration: 25, animation: 'breathe' },
                    { text: "Tıkanmış tüm para akışlarını açtığını imgele.", duration: 20, animation: 'stars' },
                    { text: "Ben mıknatısım, bolluk bana akar.", duration: 20, animation: 'focus' }
                ]
            }
        ]
    },
    {
        id: 'love-frequency',
        baseTitle: 'Aşk Frekansı',
        baseDescription: 'Kalp çakranı aç ve koşulsuz sevgiyi davet et.',
        type: 'meditation',
        xpReward: 35,
        duration: '5 Dk',
        iconName: 'Heart',
        color: 'from-pink-400 to-rose-600',
        audioTrack: '/sounds/zen.ogg',
        variations: [
            {
                title: 'Gül Kuvars Şifası',
                description: 'Kalbindeki kırgınlıkları pembe bir ışıkla sar.',
                steps: [
                    { text: "Ellerini kalbinin üzerine koy.", duration: 10, animation: 'breathe' },
                    { text: "Kalbinde yumuşak, pembe bir ışığın yandığını gör.", duration: 20, animation: 'focus' },
                    { text: "Bu ışık tüm acıları ve hayal kırıklıklarını eritiyor.", duration: 30, animation: 'stars' },
                    { text: "Ben sevgiyim, sevilmeye layığım.", duration: 20, animation: 'breathe' }
                ]
            },
            {
                title: 'Ruh Eşi Çağrısı',
                description: 'Ruhundaki eş parçaya manyetik bir sinyal gönder.',
                steps: [
                    { text: "Gözlerini kapat ve en mutlu anını düşün.", duration: 15, animation: 'focus' },
                    { text: "Bu mutluluğu paylaşacağın o enerjiyi hisset.", duration: 20, animation: 'stars' },
                    { text: "Kalbinden çıkan altın bir ipin ona uzandığını hayal et.", duration: 25, animation: 'focus' },
                    { text: "Seni bekliyorum, sana hazırım.", duration: 15, animation: 'breathe' }
                ]
            }
        ]
    },
    {
        id: 'morning-clarity',
        baseTitle: 'Sabah Berraklığı',
        baseDescription: 'Zihnindeki sisi dağıt ve güne odaklı başla.',
        type: 'meditation',
        xpReward: 20,
        duration: '2 Dk',
        iconName: 'Sun',
        color: 'from-yellow-300 to-amber-500',
        audioTrack: '/sounds/amazon.ogg',
        variations: [
            {
                title: 'Güneş Selamlaması',
                description: 'İçindeki güneşi uyandır.',
                steps: [
                    { text: "Derin bir nefes al ve omurganı dikleştir.", duration: 10, animation: 'focus' },
                    { text: "Yüzüne vuran sıcak sabah güneşini hisset.", duration: 15, animation: 'stars' },
                    { text: "Zihnindeki tüm sisin bu ışıkla dağıldığını gör.", duration: 20, animation: 'breathe' },
                    { text: "Bugün netim. Bugün hazırım.", duration: 10, animation: 'focus' }
                ]
            }
        ]
    },
    {
        id: 'quantum-leap',
        baseTitle: 'Kuantum Sıçraması',
        baseDescription: 'Hayallerindeki versiyonuna enerjik bir adım at.',
        type: 'manifestation',
        xpReward: 50,
        duration: '4 Dk',
        iconName: 'Zap',
        color: 'from-violet-500 to-fuchsia-600',
        audioTrack: '/sounds/cosmos.ogg',
        variations: [
            {
                title: 'Gelecekteki Ben',
                description: 'Olmak istediğin kişiyle el sıkış.',
                steps: [
                    { text: "Zamanın ve mekanın silindiği bir boşluktasın.", duration: 15, animation: 'stars' },
                    { text: "Karşında 1 yıl sonraki en başarılı halin duruyor.", duration: 20, animation: 'focus' },
                    { text: "Ona sarıl ve enerjisini kendine çek.", duration: 25, animation: 'breathe' },
                    { text: "Onun bilgeliği artık senin zihninde.", duration: 20, animation: 'focus' }
                ]
            }
        ]
    },
    {
        id: 'inner-child',
        baseTitle: 'İç Çocuk Şifası',
        baseDescription: 'İçindeki masum çocuğa şefkat göster.',
        type: 'meditation',
        xpReward: 30,
        duration: '5 Dk',
        iconName: 'Cloud',
        color: 'from-sky-300 to-blue-400',
        audioTrack: '/sounds/zen.ogg',
        variations: [
            {
                title: 'Oyun Parkı',
                description: 'İçindeki çocukla güvenli bir yerde buluş.',
                steps: [
                    { text: "Hatıralarındaki en güvenli yeri düşün.", duration: 15, animation: 'focus' },
                    { text: "Orada küçük halini gör. Ne yapıyor?", duration: 20, animation: 'stars' },
                    { text: "Yanına git, elini tut ve 'seni seviyorum' de.", duration: 30, animation: 'breathe' },
                    { text: "Sen güvendesin, ben buradayım.", duration: 15, animation: 'focus' }
                ]
            }
        ]
    },
    {
        id: 'third-eye',
        baseTitle: '3. Göz Uyanışı',
        baseDescription: 'Sezgilerini güçlendir ve gerçeği gör.',
        type: 'meditation',
        xpReward: 45,
        duration: '4 Dk',
        iconName: 'Eye',
        color: 'from-purple-600 to-indigo-800',
        audioTrack: '/sounds/cosmos.ogg',
        variations: [
            {
                title: 'İndigo Işık',
                description: 'İki kaşının arasındaki enerji merkezini aktive et.',
                steps: [
                    { text: "Gözlerini kapat ve alnının ortasına odaklan.", duration: 15, animation: 'focus' },
                    { text: "Orada dönen mor bir girdap hayal et.", duration: 20, animation: 'stars' },
                    { text: "Rüyalarım ve sezgilerim bana rehberlik eder.", duration: 20, animation: 'breathe' },
                    { text: "Görüyorum. Biliyorum.", duration: 15, animation: 'focus' }
                ]
            }
        ]
    },
    {
        id: 'sleep-sanctuary',
        baseTitle: 'Uyku Tapınağı',
        baseDescription: 'Derin ve şifalı bir uykuya geçiş yap.',
        type: 'meditation',
        xpReward: 15,
        duration: '6 Dk',
        iconName: 'Moon',
        color: 'from-slate-700 to-slate-900',
        audioTrack: '/sounds/zen.ogg',
        variations: [
            {
                title: 'Yıldız Tozu',
                description: 'Bedenini gevşet ve zihnini sustur.',
                steps: [
                    { text: "Yatağında tamamen gevşe.", duration: 10, animation: 'breathe' },
                    { text: "Ayak parmaklarından başlayarak tüm kaslarını sık ve bırak.", duration: 30, animation: 'focus' },
                    { text: "Üzerine dökülen yıldız tozlarının seni ağırlaştırdığını hisset.", duration: 30, animation: 'stars' },
                    { text: "İyi geceler...", duration: 10, animation: 'breathe' }
                ]
            }
        ]
    },
    {
        id: 'universal-gratitude',
        baseTitle: 'Evrensel Şükran',
        baseDescription: 'Varlığını kutla ve frekansını yükselt.',
        type: 'manifestation',
        xpReward: 25,
        duration: '3 Dk',
        iconName: 'Sparkles',
        color: 'from-amber-200 to-yellow-400',
        audioTrack: '/sounds/amazon.ogg',
        variations: [
            {
                title: '3 Mucize',
                description: 'Hayatındaki 3 küçük mucizeyi hatırla.',
                steps: [
                    { text: "Bugün seni gülümseten bir şeyi düşün.", duration: 15, animation: 'stars' },
                    { text: "Şimdi, sağlığın için bedenine teşekkür et.", duration: 15, animation: 'focus' },
                    { text: "Ve seni seven birinin varlığına şükret.", duration: 15, animation: 'stars' },
                    { text: "Teşekkür ederim. Teşekkür ederim. Teşekkür ederim.", duration: 20, animation: 'breathe' }
                ]
            }
        ]
    }
];

export const getIcon = (name: string) => {
    switch (name) {
        case 'Flame': return Flame;
        case 'Moon': return Moon;
        case 'Sun': return Sun;
        case 'Wind': return Wind;
        case 'Heart': return Heart;
        case 'Shield': return Shield;
        case 'Coins': return Coins;
        case 'Eye': return Eye;
        case 'Zap': return Zap;
        case 'Sparkles': return Sparkles;
        case 'Cloud': return Cloud;
        default: return Star;
    }
};

// Helper to get today's specific variation based on seed
export const getDailyRitual = (ritual: Ritual) => {
    const today = new Date();
    const seed = today.getDate() + today.getMonth() * 31 + today.getFullYear() * 365; // Simple daily seed

    // Pseudo-random index based on ritual ID and date
    // Convert string ID to number sum
    const idSum = ritual.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const variationIndex = (seed + idSum) % ritual.variations.length;

    // Fallback if variation has no steps (should not happen anymore)
    const variation = ritual.variations[variationIndex];
    if (!variation.steps || variation.steps.length === 0) {
        // Fallback to first variation or a default
        if (ritual.variations[0].steps.length > 0) return ritual.variations[0];
    }

    return variation;
};
