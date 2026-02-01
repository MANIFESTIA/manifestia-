"use client";

import { useState, useEffect, useRef } from 'react';

export const useSoundscape = (trackUrl: string | null) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        if (!trackUrl) return;

        const audio = new Audio(trackUrl);
        audio.loop = true;
        audio.volume = 0; // Start at 0 for fade in
        audioRef.current = audio;

        return () => {
            // Cleanup on unmount or track change
            fadeOutAndStop(audio);
        };
    }, [trackUrl]);

    const play = () => {
        if (!audioRef.current || isPlaying) return;

        const audio = audioRef.current;
        audio.play().catch(e => console.log("Autoplay blocked:", e));
        setIsPlaying(true);

        // Fade In
        const fadeInterval = setInterval(() => {
            if (audio.volume < volume) {
                audio.volume = Math.min(audio.volume + 0.05, volume);
            } else {
                clearInterval(fadeInterval);
            }
        }, 200);
    };

    const stop = () => {
        if (!audioRef.current) return;
        fadeOutAndStop(audioRef.current);
        setIsPlaying(false);
    };

    const toggleMute = () => {
        if (!audioRef.current) return;
        const newMuted = !isMuted;
        setIsMuted(newMuted);
        audioRef.current.muted = newMuted;
    };

    const fadeOutAndStop = (audio: HTMLAudioElement) => {
        const fadeInterval = setInterval(() => {
            if (audio.volume > 0.05) {
                audio.volume -= 0.05;
            } else {
                audio.volume = 0;
                audio.pause();
                clearInterval(fadeInterval);
            }
        }, 100);
    };

    return {
        play,
        stop,
        toggleMute,
        isMuted,
        isPlaying
    };
};
