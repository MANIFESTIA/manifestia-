
// --- Abstraction Layer ---
export interface IVoiceConfig {
  voiceId: string; // Google için "tr-TR-Neural2-A" gibi
  name: string;    // "Kozmik Bilge"
  gender: 'MALE' | 'FEMALE';
}

export type VoicePersona =
  | 'COSMIC_SAGE'
  | 'EARTH_MOTHER'
  | 'SIRIUS_VOICE'
  | 'ANCIENT_ASTROLOGER'
  | 'NIGHT_GUIDE'
  | 'SOLAR_GUARDIAN'
  | 'LUNAR_MUSE'
  | 'MYSTIC_SEER'
  | 'ETHEREAL_WHISPER'
  | 'GALACTIC_NAVIGATOR';

export const VOICE_GALLERY: Record<VoicePersona, IVoiceConfig> = {
  // --- KADIN SESLERİ ---
  'COSMIC_SAGE': { name: "Kozmik Bilge", gender: 'FEMALE', voiceId: "tr-TR-Neural2-A" },
  'EARTH_MOTHER': { name: "Toprak Ana", gender: 'FEMALE', voiceId: "tr-TR-Neural2-C" },
  'SIRIUS_VOICE': { name: "Sirius'un Sesi", gender: 'FEMALE', voiceId: "tr-TR-Wavenet-C" },
  'LUNAR_MUSE': { name: "Ay İlham Perisi", gender: 'FEMALE', voiceId: "tr-TR-Standard-A" },
  'ETHEREAL_WHISPER': { name: "Esiri Fısıltı", gender: 'FEMALE', voiceId: "tr-TR-Wavenet-A" },

  // --- ERKEK SESLERİ ---
  'ANCIENT_ASTROLOGER': { name: "Kadim Astrolog", gender: 'MALE', voiceId: "tr-TR-Neural2-B" },
  'NIGHT_GUIDE': { name: "Gece Rehberi", gender: 'MALE', voiceId: "tr-TR-Neural2-D" },
  'SOLAR_GUARDIAN': { name: "Güneş Muhafızı", gender: 'MALE', voiceId: "tr-TR-Wavenet-B" },
  'MYSTIC_SEER': { name: "Mistik Kâhin", gender: 'MALE', voiceId: "tr-TR-Standard-B" },
  'GALACTIC_NAVIGATOR': { name: "Galaktik Gezgin", gender: 'MALE', voiceId: "tr-TR-Wavenet-D" },
};

export class VoiceService {
  private apiKey: string;

  constructor() {
    // API anahtarını .env.local'dan al (Hem Google hem Gemini değişkenine bak)
    this.apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY || '';

    // Only warn on server side where it matters
    if (!this.apiKey && typeof window === 'undefined') {
      console.warn("TTS Uyarısı: API Anahtarı bulunamadı (GOOGLE_GENERATIVE_AI_API_KEY veya GEMINI_API_KEY eksik).");
    }
  }

  async synthesize(text: string, persona: VoicePersona = 'COSMIC_SAGE'): Promise<Uint8Array | null> {
    if (!this.apiKey) return null;

    const config = VOICE_GALLERY[persona];
    const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${this.apiKey}`;

    const payload = {
      input: { text },
      voice: { languageCode: 'tr-TR', name: config.voiceId },
      audioConfig: { audioEncoding: 'MP3', speakingRate: 0.95, pitch: -1.0 },
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.error) {
        console.error("Google TTS API Error:", data.error);
        return null;
      }

      // Google TTS base64 string döndürür
      const audioContent = data.audioContent;
      if (!audioContent) return null;

      // Base64 to Uint8Array/Buffer
      const buffer = Buffer.from(audioContent, 'base64');
      return buffer;

    } catch (error) {
      console.error("TTS Fetch Error:", error);
      return null;
    }
  }
}

export const voiceService = new VoiceService();
