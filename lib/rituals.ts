import { Flame, Moon, Sun, Wind } from 'lucide-react';

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
        color: 'from-orange-500 to-red-600'
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
        color: 'from-yellow-400 to-orange-500'
    },
    {
        id: 'full-moon-ceremony',
        title: 'Dolunay Arınması',
        description: 'Ayın ışığıyla ruhsal blokajlarını şifalandır.',
        longDescription: 'Dolunay zamanı, tamamlanma ve arınma zamanıdır. Işığın en güçlü olduğu bu döngüde, hayatından çıkarmak istediklerine odaklan.',
        type: 'meditation',
        xpReward: 50,
        duration: '10 Dk',
        iconName: 'Moon',
        color: 'from-indigo-400 to-purple-600'
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
