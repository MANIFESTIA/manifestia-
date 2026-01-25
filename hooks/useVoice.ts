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
                    speakNative(text);
                };

                await audio.play();

            } else {
                console.warn("TTS API failed, using browser fallback");
                speakNative(text);
            }

        } catch (error) {
            console.error("Voice Error:", error);
            // Hata durumunda browser'ın kendi sesini kullan (Fallback)
            speakNative(text);
        }
    }, []);

    // Browser Native TTS (Yedek Plan)
    const speakNative = (text: string) => {
        if (!synthRef.current) return;

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'tr-TR';

        // Ses seçimi (Varsa Google Türkçe, yoksa ilk Türkçe)
        const voices = synthRef.current.getVoices();
        const trVoice = voices.find(v => v.lang.includes('tr')) || voices[0];
        if (trVoice) utterance.voice = trVoice;

        utterance.rate = 0.9;
        utterance.pitch = 1;

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
