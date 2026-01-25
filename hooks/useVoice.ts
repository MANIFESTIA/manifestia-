import { useState, useCallback, useRef, useEffect } from 'react';
import { VoicePersona } from '@/lib/voice/voice-service';

export const useVoice = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Audio elementini cleanup yap
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const speak = useCallback(async (text: string, persona: VoicePersona = 'COSMIC_SAGE') => {
        try {
            // Eğer zaten çalıyorsa durdur
            if (audioRef.current) {
                audioRef.current.pause();
                setIsPlaying(false);
            }

            const response = await fetch('/api/tts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, persona }),
            });

            if (!response.ok) throw new Error('TTS Error');

            // Blob olarak al
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            const audio = new Audio(url);
            audioRef.current = audio;

            audio.onplay = () => setIsPlaying(true);
            audio.onended = () => {
                setIsPlaying(false);
                URL.revokeObjectURL(url); // Belleği temizle
            };
            audio.onerror = () => setIsPlaying(false);

            await audio.play();

        } catch (error) {
            console.error("Konuşma hatası:", error);
            setIsPlaying(false);
        }
    }, []);

    const stop = useCallback(() => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        }
    }, []);

    return { speak, stop, isPlaying };
};
