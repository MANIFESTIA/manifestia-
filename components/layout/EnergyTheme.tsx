"use client";

import { useEffect } from 'react';
import { getDailyEnergy } from '@/lib/dailyEnergy';

export default function EnergyTheme() {
    useEffect(() => {
        const palette = getDailyEnergy();
        const root = document.documentElement;

        root.style.setProperty('--daily-primary', palette.primary);
        root.style.setProperty('--daily-secondary', palette.secondary);
        root.style.setProperty('--daily-glow', palette.glowColor);

        // Optional: Log to confirm it's working
        console.log(`[TheManifest] Daily Energy: ${palette.name} (${palette.element}) loaded.`);
    }, []);

    return null; // Headless component, just effects
}
