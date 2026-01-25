import { useState, useCallback, useRef, useEffect } from 'react';
import { VoicePersona } from '@/lib/voice/voice-service';

export const useVoice = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const synthRef = useRef<SpeechSynthesis | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            synthRef.current = window.speechSynthesis;
        }
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            if (synthRef.current) {
                synthRef.current.cancel();
            }
        };
    }, []);

    const speak = useCallback(async (text: string, persona: VoicePersona = 'COSMIC_SAGE') => {
        try {
            // Önceki sesleri durdur
            stop();

            // 1. Yöntem: API üzerinden Google TTS Dene
            const response = await fetch('/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, persona }),
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = URL.createObjectURL(blob);
                const audio = new Audio(url);
                audioRef.current = audio;

                audio.onplay = () => setIsPlaying(true);
                audio.onended = () => {
                    setIsPlaying(false);
                    URL.revokeObjectURL(url);
                };
                audio.onerror = () => {
                    // Audio element hatası olursa fallback'e geç
                    console.warn("Audio element failed, switching to browser TTS");
                    speakNative(text, persona);
                };

                await audio.play();

            } else {
                console.warn("TTS API failed, using browser fallback");
                speakNative(text, persona);
            }

        } catch (error) {
            console.error("Voice Error:", error);
            // Hata durumunda browser'ın kendi sesini kullan (Fallback)
            speakNative(text, persona);
        }
    }, []);

    // Browser Native TTS (Gelişmiş Yedek Plan)
    const speakNative = (text: string, persona: VoicePersona) => {
        if (!synthRef.current) return;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'tr-TR';

        // Ses Varyasyon Ayarları (Persona'ya göre)
        const voices = synthRef.current.getVoices();
        const trVoices = voices.filter(v => v.lang.includes('tr'));

        let selectedVoice = trVoices[0] || voices[0];
        let pitch = 1.0;
        let rate = 1.0;

        switch (persona) {
            // --- KADIN KARAKTERLER ---
            case 'COSMIC_SAGE': pitch = 0.9; rate = 0.85; break;
            case 'EARTH_MOTHER': pitch = 0.8; rate = 0.9; break;
            case 'LUNAR_MUSE': pitch = 1.4; rate = 0.95; break;
            case 'SIRIUS_VOICE': pitch = 1.1; rate = 1.1; break;
            case 'ETHEREAL_WHISPER': pitch = 1.6; rate = 0.7; break;

            // --- ERKEK KARAKTERLER ---
            case 'ANCIENT_ASTROLOGER': pitch = 0.6; rate = 0.8; break;
            case 'NIGHT_GUIDE': pitch = 0.7; rate = 0.85; break;
            case 'SOLAR_GUARDIAN': pitch = 1.0; rate = 1.2; break;
            case 'GALACTIC_NAVIGATOR': pitch = 0.9; rate = 1.1; break;
            default: pitch = 1.0; rate = 1.0;
        }

        // Cinsiyete göre eğer sistemde farklı ses varsa onu seçmeye çalış
        if (['ANCIENT_ASTROLOGER', 'NIGHT_GUIDE', 'SOLAR_GUARDIAN', 'GALACTIC_NAVIGATOR', 'MYSTIC_SEER'].includes(persona)) {
            const maleVoice = trVoices.find(v => v.name.toLowerCase().includes('male') || v.name.includes('Tolga'));
            if (maleVoice) selectedVoice = maleVoice;
        } else {
            const femaleVoice = trVoices.find(v => v.name.toLowerCase().includes('female') || v.name.includes('Google'));
            if (femaleVoice) selectedVoice = femaleVoice;
        }

        if (selectedVoice) utterance.voice = selectedVoice;
        utterance.pitch = pitch;
        utterance.rate = rate;

        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = (e) => {
            console.error("Native TTS Error", e);
            setIsPlaying(false);
        };

        synthRef.current.speak(utterance);
    };

    const stop = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
        if (synthRef.current) {
            synthRef.current.cancel();
            setIsPlaying(false);
        }
    }, []);

    return { speak, stop, isPlaying };
};
