import { useState, useEffect } from 'react';
import { StorageService, StoredAura, StoredTarot } from '@/lib/storage';

export const useCosmicMemory = () => {
    const [auraHistory, setAuraHistory] = useState<StoredAura[]>([]);
    const [tarotHistory, setTarotHistory] = useState<StoredTarot[]>([]);

    // İlk yüklemede verileri çek
    useEffect(() => {
        refresh();
    }, []);

    const refresh = () => {
        setAuraHistory(StorageService.getAuraHistory());
        setTarotHistory(StorageService.getTarotHistory());
    };

    const saveAura = (analysis: Omit<StoredAura, 'id' | 'date'>) => {
        StorageService.saveAura(analysis);
        refresh(); // State'i güncelle
    };

    const saveTarot = (reading: Omit<StoredTarot, 'id' | 'date'>) => {
        StorageService.saveTarot(reading);
        refresh();
    };

    return {
        auraHistory,
        tarotHistory,
        saveAura,
        saveTarot,
        refresh
    };
};
