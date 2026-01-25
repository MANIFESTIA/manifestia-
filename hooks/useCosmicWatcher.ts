import { useEffect, useRef } from 'react';
import { NotificationService } from '@/lib/notifications';

// Simüle edilmiş astrolojik olaylar
const ASTRO_EVENTS = [
    {
        id: 'new-moon-taurus',
        title: 'Yeni Ay Boğa Burcunda 🌑',
        body: 'Toprak elementinin bereketi seninle. Niyet tohumlarını ekmek için en verimli an.',
        type: 'ritual',
        targetId: 'abundance-777'
    },
    {
        id: 'mercury-retro',
        title: 'Merkür Retrosu Başladı ⚠️',
        body: 'İletişimde yavaşla, içine dön. Eski defterleri kapatma vakti.',
        type: 'info',
        targetId: null
    },
    {
        id: 'venus-pisces',
        title: 'Venüs Balık Burcunda ♓',
        body: 'Kalbinin kapıları sonuna kadar açılıyor. Aşk ritüeli için büyülü bir zaman.',
        type: 'ritual',
        targetId: 'love-444'
    }
];

export const useCosmicWatcher = () => {
    const watcherRef = useRef<NodeJS.Timeout | null>(null);

    // Başlangıçta izin iste
    useEffect(() => {
        NotificationService.requestPermission();
    }, []);

    // Gözcüyü Başlat
    useEffect(() => {
        console.log("👁️ Kozmik Gözcü Aktif: Gökyüzü izleniyor...");

        // Demo amacıyla: Her 60 saniyede bir rastgele olay kontrolü yap
        // Gerçek dünyada bu SSE (Server Sent Events) veya Websocket olabilir.
        watcherRef.current = setInterval(() => {
            checkCosmicEvents();
        }, 60000); // 1 dakika

        return () => {
            if (watcherRef.current) clearInterval(watcherRef.current);
        };
    }, []);

    const checkCosmicEvents = () => {
        // %30 ihtimalle bir olay tetikle (Demo için sık tuttum)
        if (Math.random() > 0.7) {
            const randomEvent = ASTRO_EVENTS[Math.floor(Math.random() * ASTRO_EVENTS.length)];
            triggerNotification(randomEvent);
        }
    };

    const triggerNotification = (event: typeof ASTRO_EVENTS[0]) => {
        const sent = NotificationService.send({
            title: event.title,
            body: event.body,
            tag: event.id
        }, true); // force=true yaptık ki test ederken sessiz saate takılmasın

        if (sent) {
            console.log(`Bildirim Gönderildi: ${event.title}`);
        } else {
            console.log(`Bildirim Gönderilemedi (İzin Yok): ${event.title}`);
        }
    };

    // Manuel Test İçin Fonksiyon
    const testNotification = () => {
        triggerNotification(ASTRO_EVENTS[0]);
    };

    return { testNotification };
};
