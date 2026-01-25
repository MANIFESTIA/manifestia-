export interface UserProgress {
    totalRituals: number;
    currentStreak: number;
    lastRitualDate: string | null;
    badges: string[]; // Kazanılan mühür ID'leri
    hasCouponCode: boolean;
}

const STORAGE_KEY = 'manifestia_progress';

export const Gamification = {
    getProgress: (): UserProgress => {
        if (typeof window === 'undefined') return { totalRituals: 0, currentStreak: 0, lastRitualDate: null, badges: [], hasCouponCode: false };

        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);

        return { totalRituals: 0, currentStreak: 0, lastRitualDate: null, badges: [], hasCouponCode: false };
    },

    completeRitual: (ritualId: string): UserProgress => {
        const progress = Gamification.getProgress();
        const today = new Date().toISOString().split('T')[0];

        // Streak Mantığı
        if (progress.lastRitualDate) {
            const lastDate = new Date(progress.lastRitualDate);
            const diffTime = Math.abs(new Date(today).getTime() - lastDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
                progress.currentStreak += 1;
            } else if (diffDays > 1) {
                progress.currentStreak = 1; // Zincir kırıldı :(
            }
            // Aynı gün içindeyse streak artmaz ama total artar
        } else {
            progress.currentStreak = 1;
        }

        progress.lastRitualDate = today;
        progress.totalRituals += 1;

        // Badge Ekleme
        if (!progress.badges.includes(ritualId)) {
            progress.badges.push(ritualId);
        }

        // Ödül Kontrolü (21 Gün)
        if (progress.currentStreak >= 21 && !progress.hasCouponCode) {
            progress.hasCouponCode = true;
            // Burda normalde backend'e istek atılır
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
        return progress;
    }
};
