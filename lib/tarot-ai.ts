import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

// API Key is automatically loaded from GOOGLE_GENERATIVE_AI_API_KEY environment variable
// If you use GEMINI_API_KEY, you might need to manually set it or use createGoogleGenerativeAI
// For now, let's assume the env var is set correctly or we pass it if needed.

interface TarotCardRequest {
    name: string;
    isReversed?: boolean;
}

interface TarotRequest {
    cards: TarotCardRequest[]; // Kart objeleri ve durumları
    spreadType: 'single' | 'three_card';
    userSign?: string;
    question?: string;
}

export async function generateTarotReadingAI(request: TarotRequest) {
    const { cards, spreadType, userSign, question } = request;

    const formattedCards = cards.map(c => `${c.name} (${c.isReversed ? 'TERS' : 'DÜZ'})`).join(', ');

    const systemPrompt = `
    Sen "Manifestia" uygulamasının mistik, bilge ve derin "Kozmik Kahini"sin. 
    Görevin: Kullanıcının seçtiği tarot kartlarına göre onlara özel, ruhsal ve güçlendirici bir yorum yapmak.
    
    Ton: Mistik ama korkutucu değil. Derin ama anlaşılır. Umut verici ve yönlendirici.
    
    Kurallar:
    1. Kesinlikle JSON formatında cevap ver.
    2. Cevabın sadece geçerli bir JSON objesi olsun, markdown (aaa json ... ) kullanma.
    3. JSON şeması şöyle olmalı:
    {
        "interpretation": "Kartların detaylı yorumu...",
        "affirmation": "Kısa, güçlü bir olumlama cümlesi",
        "suggestion": "Kullanıcının uygulayabileceği somut bir tavsiye (ritüel, eylem, düşünce pratiği vb.)"
    }
    
    Kullanıcı Bilgisi:
    - Burç: ${userSign || "Bilinmiyor"} (Eğer biliniyorsa yorumda elementine -ateş, su, toprak, hava- hafifçe değin)
    - Niyet/Soru: ${question || "Genel Rehberlik"}
    
    Kartlar ve Açılım Türü: ${spreadType === 'three_card' ? '3 Kart (Geçmiş, Şimdi, Gelecek)' : 'Tek Kart (Genel Bakış)'}
    
    Seçilen Kartlar: ${formattedCards}
    
    Yorum Yaparken Dikkat Et:
    - KARTLARIN "TERS" VEYA "DÜZ" OLMASINA ÇOK DİKKAT ET. TERS KARTLAR BLOKAJLARI, GECİKMELERİ VEYA İÇSEL SÜREÇLERİ TEMSİL EDER.
    - Eğer 3 kart ise: Kartların birbirleriyle olan ilişkisini anlat. Geçmişin şimdiye etkisini ve geleceğin potansiyelini bağla.
    - Tek kart ise: Kartın derin sembolizmine odaklan.
    - Kullanıcının burcu ile kartın elementi arasında bir bağ varsa vurgula (Örn: Su grubu burç ve Kupa kartı uyumu).
    `;

    try {
        const { text } = await generateText({
            model: google('gemini-2.0-flash'),
            system: systemPrompt,
            prompt: "Lütfen kartları yorumla.",
            temperature: 0.7,
        });

        // Temizlik (Markdown işaretlerini kaldır)
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        return JSON.parse(cleanText);

    } catch (error) {
        console.error("AI Tarot Generation Failed:", error);
        throw error; // Route handler will catch this and use fallback
    }
}
