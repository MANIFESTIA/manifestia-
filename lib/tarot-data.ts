export interface TarotCard {
    id: number;
    name: string;
    englishName: string;
    meaning: string;
    themeColor: string; // Hex for neon glow
}

export const MAJOR_ARCANA: TarotCard[] = [
    {
        id: 0,
        name: "Mecnun",
        englishName: "The Fool",
        meaning: "Yeni başlangıçlar, risk almak, saflık, potansiyel.",
        themeColor: "#22D3EE" // Cyan
    },
    {
        id: 1,
        name: "Büyücü",
        englishName: "The Magician",
        meaning: "Beceri, yaratım gücü, potansiyel, ustalık.",
        themeColor: "#A855F7" // Purple
    },
    {
        id: 2,
        name: "Azize",
        englishName: "The High Priestess",
        meaning: "Sezgi, gizem, bilinçaltı, içsel bilgi.",
        themeColor: "#818CF8" // Indigo
    },
    {
        id: 3,
        name: "İmparatoriçe",
        englishName: "The Empress",
        meaning: "Bereket, doğurganlık, dişil enerji, yaratıcılık.",
        themeColor: "#F472B6" // Pink
    },
    {
        id: 4,
        name: "İmparator",
        englishName: "The Emperor",
        meaning: "Otorite, düzen, eril güç, yapı, liderlik.",
        themeColor: "#EF4444" // Red
    },
    {
        id: 5,
        name: "Aziz",
        englishName: "The Hierophant",
        meaning: "Gelenekler, inançlar, ruhsal rehberlik, bilgelik.",
        themeColor: "#FBBF24" // Amber
    },
    {
        id: 6,
        name: "Aşıklar",
        englishName: "The Lovers",
        meaning: "Seçimler, uyum, ilişkiler, tutku.",
        themeColor: "#F43F5E" // Rose
    },
    {
        id: 7,
        name: "Araba",
        englishName: "The Chariot",
        meaning: "İrade, zafer, kontrolü ele alma, ilerleme.",
        themeColor: "#34D399" // Emerald
    },
    {
        id: 8,
        name: "Güç",
        englishName: "Strength",
        meaning: "Sabır, içsel güç, şefkatli kontrol, cesaret.",
        themeColor: "#F59E0B" // Orange
    },
    {
        id: 9,
        name: "Ermiş",
        englishName: "The Hermit",
        meaning: "İç gözlem, yalnızlık, bilgelik arayışı, rehberlik.",
        themeColor: "#60A5FA" // Blue
    },
    {
        id: 10,
        name: "Kader Çarkı",
        englishName: "Wheel of Fortune",
        meaning: "Şans, kaderin değişimi, döngüler, sürprizler.",
        themeColor: "#D946EF" // Fuchsia
    },
    {
        id: 11,
        name: "Adalet",
        englishName: "Justice",
        meaning: "Hak, hukuk, sebep-sonuç ilişkisi, denge.",
        themeColor: "#10B981" // Green
    },
    {
        id: 12,
        name: "Asılan Adam",
        englishName: "The Hanged Man",
        meaning: "Fedakarlık, duraklama, farklı bakış açısı, teslimiyet.",
        themeColor: "#8B5CF6" // Violet
    },
    {
        id: 13,
        name: "Ölüm",
        englishName: "Death",
        meaning: "Sonlanmalar, dönüşüm, yeniden doğuş, bitişler.",
        themeColor: "#94A3B8" // Slate
    },
    {
        id: 14,
        name: "Denge",
        englishName: "Temperance",
        meaning: "Ölçülü olmak, uyum, sabır, simya.",
        themeColor: "#2DD4BF" // Teal
    },
    {
        id: 15,
        name: "Şeytan",
        englishName: "The Devil",
        meaning: "Bağlılıklar, tutku, gölge yanlar, illüzyon.",
        themeColor: "#DC2626" // Dark Red
    },
    {
        id: 16,
        name: "Yıkılan Kule",
        englishName: "The Tower",
        meaning: "Ani değişim, sarsıcı gerçekler, yıkım, uyanış.",
        themeColor: "#EA580C" // Burnt Orange
    },
    {
        id: 17,
        name: "Yıldız",
        englishName: "The Star",
        meaning: "Umut, ilham, şifa, iyimserlik, huzur.",
        themeColor: "#67E8F9" // Cyan-light
    },
    {
        id: 18,
        name: "Ay",
        englishName: "The Moon",
        meaning: "Yanılsamalar, korkular, belirsizlik, sezgi.",
        themeColor: "#C084FC" // Purple-light
    },
    {
        id: 19,
        name: "Güneş",
        englishName: "The Sun",
        meaning: "Başarı, mutluluk, netlik, neşe, canlılık.",
        themeColor: "#FACC15" // Yellow
    },
    {
        id: 20,
        name: "Mahkeme",
        englishName: "Judgement",
        meaning: "Uyanış, karar verme, yüzleşme, çağrı.",
        themeColor: "#FB923C" // Orange-light
    },
    {
        id: 21,
        name: "Dünya",
        englishName: "The World",
        meaning: "Tamamlanma, bütünlük, başarıyla bitiriş, evren.",
        themeColor: "#4ADE80" // Green-light
    }
];
