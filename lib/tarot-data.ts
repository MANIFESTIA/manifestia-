export interface TarotCard {
    id: number;
    name: string;
    englishName: string; // API promptu için
    keywords: string[];
    image: string; // Placeholder or path
}

export const MAJOR_ARCANA: TarotCard[] = [
    { id: 0, name: "Joker", englishName: "The Fool", keywords: ["Başlangıç", "Masumiyet", "Özgürlük"], image: "/tarot/0_fool.jpg" },
    { id: 1, name: "Büyücü", englishName: "The Magician", keywords: ["Yetenek", "İrade", "Tezahür"], image: "/tarot/1_magician.jpg" },
    { id: 2, name: "Azize", englishName: "The High Priestess", keywords: ["Sezgi", "Gizem", "Bilinçaltı"], image: "/tarot/2_priestess.jpg" },
    { id: 3, name: "İmparatoriçe", englishName: "The Empress", keywords: ["Bolluk", "Doğa", "Anaçlık"], image: "/tarot/3_empress.jpg" },
    { id: 4, name: "İmparator", englishName: "The Emperor", keywords: ["Otorite", "Yapı", "Disiplin"], image: "/tarot/4_emperor.jpg" },
    { id: 5, name: "Aziz", englishName: "The Hierophant", keywords: ["Gelenek", "İnanç", "Öğreti"], image: "/tarot/5_hierophant.jpg" },
    { id: 6, name: "Aşıklar", englishName: "The Lovers", keywords: ["Aşk", "Uyum", "Seçim"], image: "/tarot/6_lovers.jpg" },
    { id: 7, name: "Savaş Arabası", englishName: "The Chariot", keywords: ["Zafer", "İrade", "İlerleme"], image: "/tarot/7_chariot.jpg" },
    { id: 8, name: "Güç", englishName: "Strength", keywords: ["Cesaret", "Sabır", "Şefkat"], image: "/tarot/8_strength.jpg" },
    { id: 9, name: "Ermiş", englishName: "The Hermit", keywords: ["İçe Dönüş", "Rehberlik", "Yalnızlık"], image: "/tarot/9_hermit.jpg" },
    { id: 10, name: "Kader Çarkı", englishName: "Wheel of Fortune", keywords: ["Değişim", "Şans", "Döngü"], image: "/tarot/10_wheel.jpg" },
    { id: 11, name: "Adalet", englishName: "Justice", keywords: ["Hakikat", "Denge", "Karma"], image: "/tarot/11_justice.jpg" },
    { id: 12, name: "Asılan Adam", englishName: "The Hanged Man", keywords: ["Fedakarlık", "Yeni Bakış", "Bekleyiş"], image: "/tarot/12_hanged.jpg" },
    { id: 13, name: "Ölüm", englishName: "Death", keywords: ["Dönüşüm", "Bitiş", "Yeniden Doğuş"], image: "/tarot/13_death.jpg" },
    { id: 14, name: "Denge", englishName: "Temperance", keywords: ["Uyum", "Sabır", "İyileşme"], image: "/tarot/14_temperance.jpg" },
    { id: 15, name: "Şeytan", englishName: "The Devil", keywords: ["Bağımlılık", "Maddiyat", "Gölge"], image: "/tarot/15_devil.jpg" },
    { id: 16, name: "Yıkılan Kule", englishName: "The Tower", keywords: ["Ani Değişim", "Uyanış", "Yıkım"], image: "/tarot/16_tower.jpg" },
    { id: 17, name: "Yıldız", englishName: "The Star", keywords: ["Umut", "İlham", "Huzur"], image: "/tarot/17_star.jpg" },
    { id: 18, name: "Ay", englishName: "The Moon", keywords: ["İllüzyon", "Korku", "Rüyalar"], image: "/tarot/18_moon.jpg" },
    { id: 19, name: "Güneş", englishName: "The Sun", keywords: ["Mutluluk", "Başarı", "Canlılık"], image: "/tarot/19_sun.jpg" },
    { id: 20, name: "Mahkeme", englishName: "Judgement", keywords: ["Uyanış", "Çağrı", "Arınma"], image: "/tarot/20_judgement.jpg" },
    { id: 21, name: "Dünya", englishName: "The World", keywords: ["Tamamlanma", "Bütünlük", "Yolculuk"], image: "/tarot/21_world.jpg" },
];
