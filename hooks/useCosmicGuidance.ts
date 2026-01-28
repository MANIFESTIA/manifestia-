import { useState, useEffect } from 'react';

interface UseCosmicGuidanceProps {
    name?: string;
    sign?: string;
}

export function useCosmicGuidance({ name, sign }: UseCosmicGuidanceProps) {
    const [message, setMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchGuidance = async (force = false) => {
        // Oturum süresince aynı mesajı göstermek için cache kontrolü (isteğe bağlı)
        // Şimdilik her seferinde yeni çeksin diye cache'i devre dışı bırakıyoruz veya
        // sadece kullanıcı yenilemek isterse 'force' ile çekiyoruz.

        if (!name) return;

        setLoading(true);
        try {
            const timeContext = new Date().getHours() < 12 ? 'Sabah' : (new Date().getHours() < 18 ? 'Öğle' : 'Akşam');

            const res = await fetch('/api/guidance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, sign, timeContext })
            });

            const data = await res.json();
            if (data.message) {
                setMessage(data.message);
            }
        } catch (error) {
            console.error("Rehberlik alınamadı:", error);
            setMessage("Işık içindeki sessizlikte saklıdır.");
        } finally {
            setLoading(false);
        }
    };

    // İlk yüklemede çalıştır
    useEffect(() => {
        if (name && !message) {
            fetchGuidance();
        }
    }, [name]);

    return { message, loading, refresh: () => fetchGuidance(true) };
}
