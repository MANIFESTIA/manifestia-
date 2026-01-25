export interface CosmicNotification {
    title: string;
    body: string;
    icon?: string;
    tag?: string; // Gruplama için (örn: 'retro-alert')
    url?: string; // Tıklanınca gidilecek yer
}

const QUIET_HOURS_START = 23; // 23:00
const QUIET_HOURS_END = 9;    // 09:00

export const NotificationService = {
    // İzin Durumunu Kontrol Et
    getPermission: (): NotificationPermission => {
        if (typeof window === 'undefined') return 'default';
        return Notification.permission;
    },

    // İzin İste
    requestPermission: async (): Promise<boolean> => {
        if (typeof window === 'undefined') return false;
        if (!('Notification' in window)) {
            console.warn("Tarayıcı bildirimleri desteklemiyor.");
            return false;
        }

        const permission = await Notification.requestPermission();
        return permission === 'granted';
    },

    // Sessiz Saat Kontrolü
    isInQuietHours: (): boolean => {
        const now = new Date();
        const hour = now.getHours();

        // 23:00 - 23:59 VEYA 00:00 - 09:00
        return hour >= QUIET_HOURS_START || hour < QUIET_HOURS_END;
    },

    // Bildirim Gönder
    send: (notification: CosmicNotification, force: boolean = false): boolean => {
        if (typeof window === 'undefined') return false;

        // İzin yoksa gönderme
        if (Notification.permission !== 'granted') return false;

        // Sessiz saatteyse ve zorlanmamışsa gönderme
        if (NotificationService.isInQuietHours() && !force) {
            console.log("Sessiz saatler aktif. Bildirim ertelendi:", notification.title);
            return false;
        }

        // Bildirimi Oluştur
        const notif = new Notification(notification.title, {
            body: notification.body,
            icon: notification.icon || '/icon-192x192.png', // Varsayılan ikon
            tag: notification.tag,
        });

        // Tıklama Olayı
        notif.onclick = () => {
            window.focus();
            if (notification.url) {
                // SPA içinde yönlendirme veya dış link
                // window.location.href = notification.url; 
                // Next.js router kullanımı hook içinde daha doğru olur, bu basit JS versiyonu
            }
            notif.close();
        };

        return true;
    }
};
