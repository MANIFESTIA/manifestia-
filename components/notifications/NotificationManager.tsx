"use client";
import { useEffect, useRef } from 'react';
import { getRandomWhisper } from '@/lib/cosmic-whispers';

export default function NotificationManager() {
    // Refs to manage intervals without re-renders
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Function to request permission
        const requestPermission = async () => {
            if (!("Notification" in window)) {
                console.log("This browser does not support desktop notifications");
                return;
            }

            if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
                const permission = await Notification.requestPermission();
                if (permission === 'granted') {
                    // Send an immediate welcome notification (optional)
                    new Notification("Manifestia", {
                        body: "Evrenin mesajlarını almaya hazırsın. 🌌",
                        icon: '/favicon.ico'
                    });
                    scheduleNextNotification();
                }
            } else if (Notification.permission === 'granted') {
                scheduleNextNotification();
            }
        };

        // Core logic to check and schedule
        const scheduleNextNotification = () => {
            // Clear existing to avoid duplicates
            if (intervalRef.current) clearInterval(intervalRef.current);

            // Check immediately on load
            checkAndSend();

            // Then check every minute if it's time (more robust than a single long timeout)
            intervalRef.current = setInterval(() => {
                checkAndSend();
            }, 60 * 1000);
        };

        const checkAndSend = () => {
            if (Notification.permission !== 'granted') return;

            const LAST_NOTIFICATION_KEY = 'manifestia_last_notification';
            const lastTimeStr = localStorage.getItem(LAST_NOTIFICATION_KEY);
            const now = Date.now();

            // 4 Hours in milliseconds = 4 * 60 * 60 * 1000 = 14,400,000
            // Adding variance: 4 to 5 hours.
            // Random variance between 0 and 60 minutes
            // Wait, we need a consistent target time for the *next* one.
            // Better approach: When sending, set the 'next_scheduled_time'

            const NEXT_SCHEDULE_KEY = 'manifestia_next_notification';
            let nextTimeStr = localStorage.getItem(NEXT_SCHEDULE_KEY);

            if (!nextTimeStr) {
                // First time or reset, schedule for 4 hours from now
                const fourHoursLater = now + (4 * 60 * 60 * 1000);
                localStorage.setItem(NEXT_SCHEDULE_KEY, fourHoursLater.toString());
                nextTimeStr = fourHoursLater.toString();
            }

            const nextTime = parseInt(nextTimeStr, 10);

            if (now >= nextTime) {
                // IT IS TIME!
                const whisper = getRandomWhisper();

                // Audio - custom sound if possible, or standard
                // Note: Custom sounds in Web Notifications are limited in support across browsers.

                try {
                    const options: any = {
                        body: whisper.text,
                        icon: '/favicon.ico',
                        tag: 'cosmic-whisper', // Only one at a time
                        renotify: true,
                    };
                    new Notification("Kozmik Mesajın Var 🔮", options);
                    // Create a User Interface sound (subtle chime)
                    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-magic-marimba-chime-2811.mp3');
                    audio.volume = 0.5;
                    audio.play().catch(e => console.log("Audio play blocked", e));

                } catch (e) {
                    console.error("Notification failed", e);
                }

                // Schedule the NEXT one
                // Interval: 4 hours + random(0-60min)
                const baseInterval = 4 * 60 * 60 * 1000;
                const variance = Math.random() * 60 * 60 * 1000;
                const nextTarget = now + baseInterval + variance;

                localStorage.setItem(NEXT_SCHEDULE_KEY, nextTarget.toString());
                localStorage.setItem(LAST_NOTIFICATION_KEY, now.toString()); // Log for debug
            }
        };

        // Start the process
        requestPermission();

        // Cleanup
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    // Visible-less component
    return null;
}
