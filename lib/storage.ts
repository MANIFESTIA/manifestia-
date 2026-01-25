export interface StoredAura {
    id: string;
    date: string;
    color: string;
    colorName: string;
    meaning: string;
    suggestion: string;
    imageBase64?: string; // Opsiyonel: Çok yer kaplayabilir, belki sadece rengi tutarız? Şimdilik tutalım.
}

export interface StoredTarot {
    id: string;
    date: string;
    cardName: string;
    interpretation: string;
    affirmation: string;
    suggestion: string;
}

const KEYS = {
    AURA: 'manifestia_aura_history',
    TAROT: 'manifestia_tarot_history'
};

export const StorageService = {
    // --- AURA ---
    getAuraHistory: (): StoredAura[] => {
        if (typeof window === 'undefined') return [];
        const data = localStorage.getItem(KEYS.AURA);
        return data ? JSON.parse(data) : [];
    },

    saveAura: (aura: Omit<StoredAura, 'id' | 'date'>) => {
        if (typeof window === 'undefined') return;
        const history = StorageService.getAuraHistory();

        const newItem: StoredAura = {
            ...aura,
            id: Date.now().toString(),
            date: new Date().toISOString()
        };

        // En yeni en başta olsun, max 10 kayıt tutalım
        const updated = [newItem, ...history].slice(0, 10);
        localStorage.setItem(KEYS.AURA, JSON.stringify(updated));
        return newItem;
    },

    // --- TAROT ---
    getTarotHistory: (): StoredTarot[] => {
        if (typeof window === 'undefined') return [];
        const data = localStorage.getItem(KEYS.TAROT);
        return data ? JSON.parse(data) : [];
    },

    saveTarot: (reading: Omit<StoredTarot, 'id' | 'date'>) => {
        if (typeof window === 'undefined') return;
        const history = StorageService.getTarotHistory();

        const newItem: StoredTarot = {
            ...reading,
            id: Date.now().toString(),
            date: new Date().toISOString()
        };

        const updated = [newItem, ...history].slice(0, 20); // Tarot geçmişi biraz daha uzun olabilir
        localStorage.setItem(KEYS.TAROT, JSON.stringify(updated));
        return newItem;
    }
};
