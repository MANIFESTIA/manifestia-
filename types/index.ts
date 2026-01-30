export interface UserProfile {
    id?: string; // Backend ID
    email?: string; // Backend Email
    name: string;
    birthDate: string;
    birthTime: string;
    birthCity: string;
    sign?: string; // Zodiac Sign (e.g., Akrep, İkizler)
    deviceToken?: string; // For PWA push notifications later

    // Gamification & Onboarding
    intents?: string[]; // Niyetler (min 1, max 3)
    voiceGuide?: string; // Seçilen rehber (A-J)
    diamonds?: number; // "Kozmik Işıltı" (Para birimi)
    avatar?: string;
    streak?: {
        count: number;
        lastLoginDate: string;
    };
    xp?: number;
    level?: number;
    // Hook Model Fields
    badges?: string[];     // IDs of earned badges (e.g., 'seeker', 'aura_master')
    inventory?: string[];  // IDs of owned items/coupons (e.g., 'coupon_10')
    lastStreakFreeze?: string; // Date string of last freeze usage
    lastTarotDate?: string; // Date of last free reading usage (YYYY-MM-DD or locale date)
    transactions?: Transaction[]; // History of diamond usage
}

export interface Transaction {
    id: string;
    amount: number;
    type: 'earn' | 'spend' | 'purchase';
    description: string;
    date: number; // Timestamp
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
}
