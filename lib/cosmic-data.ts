export interface CosmicEvent {
    id: string;
    title: string;
    type: 'retrograde' | 'moon' | 'eclipse' | 'transit';
    description: string;
    severity: 'low' | 'medium' | 'high';
    icon: string; // Lucide icon name fallback or specific asset
    affectedSigns: string[]; // e.g., ['Aries', 'Libra'] or ['All']
    date: string;
}

export const COSMIC_EVENTS: CosmicEvent[] = [
    {
        id: 'mercury-retro-1',
        title: 'Merkür Retrosu Başlıyor',
        type: 'retrograde',
        description: 'İletişim gezegeni geri harekette. Elektronik aletlere dikkat et, sözlerini iki kere düşün.',
        severity: 'high',
        icon: 'ZapConfig',
        affectedSigns: ['All', 'Gemini', 'Virgo'],
        date: new Date().toISOString().split('T')[0] // Today
    },
    {
        id: 'full-moon-leo',
        title: 'Aslan Burcunda Dolunay',
        type: 'moon',
        description: 'Sahne senin! İçindeki yaratıcı ateşi ortaya çıkar ama egona yenik düşme.',
        severity: 'medium',
        icon: 'Moon',
        affectedSigns: ['Leo', 'Aquarius'],
        date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0] // 2 days later
    },
    {
        id: 'saturn-transit',
        title: 'Satürn Döngüsü',
        type: 'transit',
        description: 'Karmik dersler kapıda. Disiplinli olan kazanır.',
        severity: 'low',
        icon: 'Orbit',
        affectedSigns: ['Capricorn'],
        date: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0] // 5 days later
    }
];
