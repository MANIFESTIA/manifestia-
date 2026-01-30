export type CosmicMessage = {
    id: string;
    text: string;
    category: 'motivation' | 'calm' | 'love' | 'abundance' | 'mystery';
};

export const COSMIC_WHISPERS: CosmicMessage[] = [
    // MOTIVATION
    { id: 'm1', text: "Bugün senin günün. Işığınla parlamaktan korkma.", category: 'motivation' },
    { id: 'm2', text: "Yürüdüğün yolda yalnız değilsin, tüm evren seni destekliyor.", category: 'motivation' },
    { id: 'm3', text: "Engeller sadece senin ne kadar güçlü olduğunu hatırlatmak için var.", category: 'motivation' },
    { id: 'm4', text: "İçindeki gücü serbest bırak. Yapabileceklerinin sınırı yok.", category: 'motivation' },
    { id: 'm5', text: "Küçük bir adım at. O adım seni hayallerine götürecek mucizenin başlangıcı olabilir.", category: 'motivation' },

    // CALM
    { id: 'c1', text: "Derin bir nefes al. Her şey olması gerektiği gibi akıyor.", category: 'calm' },
    { id: 'c2', text: "Şu an güvendesin. Kaosun içinde bile huzuru bulabilirsin.", category: 'calm' },
    { id: 'c3', text: "Zihnindeki gürültüyü sustur, kalbinin fısıltısını dinle.", category: 'calm' },
    { id: 'c4', text: "Acele etme. Doğa acele etmez ama yine de her şey zamanında olur.", category: 'calm' },
    { id: 'c5', text: "Bu anın tadını çıkar. Geçmiş geçti, gelecek henüz gelmedi.", category: 'calm' },

    // LOVE
    { id: 'l1', text: "Sen sevgisin. Sevgiyle titreş, sevgiyi kendine çek.", category: 'love' },
    { id: 'l2', text: "Kendini olduğun gibi sev. Sen evrenin eşsiz bir parçasısın.", category: 'love' },
    { id: 'l3', text: "Kalbini aç. Mucizeler sevgi dolu kalplere gelir.", category: 'love' },
    { id: 'l4', text: "Affetmek özgürleşmektir. Yüklerini sevgiyle bırak.", category: 'love' },
    { id: 'l5', text: "Etrafına sevgi saçtığında, o sevgi katlanarak sana döner.", category: 'love' },

    // ABUNDANCE
    { id: 'a1', text: "Evrenin bolluğu sınırsızdır ve sen bu bolluğun bir parçasısın.", category: 'abundance' },
    { id: 'a2', text: "Refah ve bereket sana doğru akıyor. Kapılarını aç.", category: 'abundance' },
    { id: 'a3', text: "Sahip olduğun her şey için şükret. Şükür, bereketi çoğaltır.", category: 'abundance' },
    { id: 'a4', text: "Yeni fırsatlar yolda. Onları fark etmeye hazır ol.", category: 'abundance' },
    { id: 'a5', text: "Sen mıknatıs gibisin. İstediğin her şeyi hayatına çekebilirsin.", category: 'abundance' },

    // MYSTERY
    { id: 'x1', text: "Tesadüf diye bir şey yoktur. Bugün karşına çıkan işaretlere dikkat et.", category: 'mystery' },
    { id: 'x2', text: "Rüyaların sana bir şeyler anlatmaya çalışıyor olabilir.", category: 'mystery' },
    { id: 'x3', text: "Bir sayı, bir şarkı, bir kelime... Evren seninle konuşuyor.", category: 'mystery' },
    { id: 'x4', text: "Sezgilerine güven. Onlar senin en eski rehberindir.", category: 'mystery' },
    { id: 'x5', text: "Bazen kaybolmak, yeni bir yol bulmanın tek yoludur.", category: 'mystery' },

    // NOTIFICATIONS (Call to Action)
    { id: 'n1', text: "Yıldızlar hizalandı. Kartını seçtin mi? ✨", category: 'mystery' },
    { id: 'n2', text: "Enerjin bugün çok yüksek hissediliyor. Gel bakalım. 🔮", category: 'motivation' },
    { id: 'n3', text: "Merkür retrosu bitmiş olabilir ama senin hikayen yeni başlıyor. 🌠", category: 'motivation' },
    { id: 'n4', text: "Manifest defterin seni bekliyor. Niyetini yazdın mı? ✍️", category: 'abundance' },
    { id: 'n5', text: "Evrenin sana bir mesajı var. Duymak için tıkla. 🌌", category: 'mystery' }
];

export const getRandomWhisper = (): CosmicMessage => {
    const randomIndex = Math.floor(Math.random() * COSMIC_WHISPERS.length);
    return COSMIC_WHISPERS[randomIndex];
};
