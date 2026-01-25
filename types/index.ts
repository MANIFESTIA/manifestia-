export interface UserProfile {
    name: string;
    birthDate: string;
    birthTime: string;
    birthCity: string;
    sign?: string; // Zodiac Sign (e.g., Akrep, İkizler)
    deviceToken?: string; // For PWA push notifications later
}

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: number;
}
