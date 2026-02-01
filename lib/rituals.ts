import { Flame, Moon, Sun, Wind } from 'lucide-react';

export interface RitualStep {
    text: string;
    duration: number; // seconds
    animation: 'breathe' | 'focus' | 'stars' | 'fire';
}

export interface Ritual {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    type: 'burning' | 'meditation' | 'manifestation';
    xpReward: number;
    duration: string; // e.g. "5 Dk"
    iconName: 'Flame' | 'Moon' | 'Sun' | 'Wind';
    color: string;
    steps?: RitualStep[];
    audioTrack?: string; // URL to mp3
}

export const RITUALS: Ritual[] = [
    {
        id: 'release-burning',
        title: 'Serbest Bırakma Ateşi',
        description: 'Sana hizmet etmeyen korku ve endişeleri evrene teslim et.',
        longDescription: 'Bu ritüel, içinde tuttuğun olumsuz duyguları, pişmanlıkları veya korkuları sembolik bir ateşe atarak ruhundan temizlemeyi amaçlar. Kağıda yazdığın her şeyi kül ederken, yüklerinin hafiflediğini hisset.',
        type: 'burning',
        xpReward: 30,
        duration: '3 Dk',
        iconName: 'Flame',
        color: 'from-orange-500 to-red-600',
        steps: [], // Handled by special component
        audioTrack: '/sounds/fire-crackling.mp3'
    },
    {
        id: 'morning-intention',
        title: 'Sabah Niyeti',
        description: 'Güne başlarken enerjini ve odak noktanı belirle.',
        longDescription: 'Sabahın ilk ışıklarıyla birlikte günün enerjisini çağırmak için kısa bir odaklanma çalışması. Bugün neyi başarmak, nasıl hissetmek istiyorsun?',
        type: 'manifestation',
        xpReward: 20,
        duration: '2 Dk',
        iconName: 'Sun',
        color: 'from-yellow-400 to-orange-500',
        audioTrack: '/sounds/morning-birds.mp3',
        steps: [
            { text: "Rahat bir pozisyon al ve gözlerini kapat.", duration: 5, animation: 'focus' },
            { text: "Derin bir nefes al... Ve yavaşça ver.", duration: 10, animation: 'breathe' },
            { text: "Bugün nasıl hissetmek istiyorsun? Tek bir kelime seç.", duration: 15, animation: 'stars' },
            { text: "Bu kelimenin enerjisinin tüm bedenine yayıldığını hayal et.", duration: 20, animation: 'focus' },
            { text: "Hazır hissettiğinde, gülümseyerek gözlerini aç.", duration: 5, animation: 'breathe' }
        ]
    },
    {
        id: 'full-moon-ceremony',
        title: 'Dolunay Arınması',
        description: 'Ayın ışığıyla ruhsal blokajlarını şifalandır.',
        longDescription: 'Dolunay zamanı, tamamlanma ve arınma zamanıdır. Işığın en güçlü olduğu bu döngüde, hayatından çıkarmak istediklerine odaklan.',
        type: 'meditation',
        xpReward: 50,
        duration: '5 Dk',
        iconName: 'Moon',
        color: 'from-indigo-400 to-purple-600',
        audioTrack: '/sounds/night-crickets.mp3',
        steps: [
            { text: "Ay ışığının altında olduğunu hayal et.", duration: 10, animation: 'stars' },
            { text: "Gümüş rengi bır ışığın başından aşağı süzüldüğünü hisset.", duration: 20, animation: 'focus' },
            { text: "Seni tutan, ağırlık yapan her şeyi nefesinle bırak.", duration: 15, animation: 'breathe' },
            { text: "Işık seni tamamen temizledi ve arındırdı.", duration: 15, animation: 'stars' },
            { text: "Huzur içindesin. Tamamlandın.", duration: 10, animation: 'focus' }
        ]
    },
];

export const getIcon = (name: string) => {
    switch (name) {
        case 'Flame': return Flame;
        case 'Moon': return Moon;
        case 'Sun': return Sun;
        default: return Wind;
    }
};
