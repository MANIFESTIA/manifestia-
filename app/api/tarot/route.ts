import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
    try {
        const { cardName, intention, userSign } = await req.json();

        if (!cardName) {
            return NextResponse.json({ error: 'Kart bilgisi gerekli' }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const prompt = `
        Sen mistik bir Tarot okuyucususun. Bir kullanıcın şu kartı çekti: "${cardName}".
        
        Bağlam:
        - Kullanıcının Niyeti: "${intention || 'Genel Rehberlik'}"
        - Kullanıcının Burcu: "${userSign || 'Bilinmiyor'}"
        
        Görevin:
        Bu kartı, kullanıcının burcu ve niyetiyle harmanlayarak kısaca yorumla.
        
        Aşağıdaki JSON formatında yanıt ver (Markdown yok, sadece JSON):
        {
            "interpretation": "Burada kartın anlamı ve kullanıcıya özel mesajın olacak (Max 3 cümle). Mistik ve bilge bir ton kullan.",
            "affirmation": "Kullanıcının gün boyu tekrar etmesi gereken kısa, güçlü bir olumlama cümlesi.",
            "suggestion": "Bu enerjiyi dengelemek veya yükseltmek için kısa bir doğal taş veya ritüel önerisi (Örn: Ametist taşı ile meditasyon)."
        }
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const analysis = JSON.parse(cleanText);

        return NextResponse.json(analysis);

    } catch (error) {
        console.error('Tarot yorumlama hatası:', error);
        return NextResponse.json({ error: 'Kartların fısıltısı duyulamadı.' }, { status: 500 });
    }
}
