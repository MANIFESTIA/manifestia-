"use client";

import { useCallback } from 'react';

export const useHaptic = () => {
    // Check if vibration is supported
    const isSupported = typeof navigator !== 'undefined' && !!navigator.vibrate;

    const trigger = useCallback((pattern: number | number[]) => {
        if (!isSupported) return;
        try {
            navigator.vibrate(pattern);
        } catch (e) {
            // Silently fail if blocked by browser policy
            console.warn("Vibration failed:", e);
        }
    }, [isSupported]);

    // Predefined patterns
    const breatheIn = useCallback(() => {
        // Increasing pulses to simulate inhalation tension
        trigger([50, 30, 50, 30, 100, 50, 200]);
    }, [trigger]);

    const breatheOut = useCallback(() => {
        // Soft, decreasing pulses for exhalation release
        trigger([200, 50, 100, 50, 50]);
    }, [trigger]);

    const focus = useCallback(() => {
        // Steady heartbeat
        trigger([50, 500, 50, 500]);
    }, [trigger]);

    const success = useCallback(() => {
        // Celebration pattern
        trigger([100, 50, 100, 50, 200, 50, 400]);
    }, [trigger]);

    return {
        isSupported,
        trigger,
        breatheIn,
        breatheOut,
        focus,
        success
    };
};
