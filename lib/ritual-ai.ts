import { GoogleGenerativeAI } from "@google/generative-ai";
import { Ritual, RitualStep } from "./rituals";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function generateRitualAI(emotion: string, duration: number = 2): Promise<Ritual> {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
    Sen ulu bir mistik ve ruhsal rehbersin. Şu an "${emotion}" hisseden bir kullanıcı için kişiselleştirilmiş bir meditasyon ritüeli oluştur.
    Ritüel yaklaşık ${duration} dakika sürmeli.

    SADECE aşağıdaki yapıya uygun bir JSON nesnesi döndür (markdown veya kod bloğu kullanma):
    {
        "title": "Kısa, mistik başlık",
        "description": "Tek cümlelik rahatlatıcı açıklama",
        "longDescription": "Bu ritüelin neden yardımcı olduğuna dair detaylı açıklama",
        "iconName": "Şunlardan biri: 'Flame', 'Sun', 'Moon', 'Wind'",
        "color": "Tailwind gradyan stringi (örn: 'from-blue-500 to-purple-600')",
        "audioTrack": "Şunlardan biri: '/sounds/zen.ogg', '/sounds/cosmos.ogg', '/sounds/amazon.ogg', '/sounds/528hz-ambient.mp3'",
        "steps": [
            {
                "text": "Bu adım için talimat (Türkçe)",
                "duration": sayı (saniye),
                "animation": "Şunlardan biri: 'breathe', 'focus', 'stars'"
            }
        ]
    }

    Kurallar:
    - 'breathe': Nefes egzersizleri için.
    - 'focus': Görselleştirme veya bir düşünceye odaklanma için.
    - 'stars': Kozmik bağlantı açılış veya kapanışı için.
    - Adımların toplam süresi kabaca ${duration * 60} saniye olmalı.
    - Dil: Tamamen Türkçe.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean markdown if present
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(jsonStr);

        return {
            id: `ai-${Date.now()}`,
            baseTitle: data.title,
            baseDescription: data.description,
            type: 'meditation',
            xpReward: 50,
            duration: `${duration} Dk`,
            iconName: data.iconName,
            color: data.color,
            audioTrack: data.audioTrack,
            variations: [
                {
                    title: data.title,
                    description: data.longDescription || data.description,
                    steps: data.steps
                }
            ]
        };
    } catch (error) {
        console.error("AI Ritual Generation Failed:", error);
        // Fallback Ritual
        return {
            id: 'fallback-calm',
            baseTitle: 'Anlık Dinginlik',
            baseDescription: 'Derin bir nefes al ve merkeze dön.',
            type: 'meditation',
            xpReward: 20,
            duration: '2 Dk',
            iconName: 'Wind',
            color: 'from-blue-400 to-cyan-300',
            audioTrack: '/sounds/zen.ogg',
            variations: [
                {
                    title: 'Anlık Dinginlik',
                    description: 'Yıldızların mesajı bazen sessizlikte gelir. Bu kısa ritüel ile zihnini sakinleştir.',
                    steps: [
                        { text: "Gözlerini kapat ve derin bir nefes al.", duration: 10, animation: 'focus' },
                        { text: "Nefes verken tüm gerginliği bırak.", duration: 10, animation: 'breathe' },
                        { text: "Sadece şu ana odaklan.", duration: 20, animation: 'stars' }
                    ]
                }
            ]
        };
    }
}
