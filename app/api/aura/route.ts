import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
    try {
        const { image } = await req.json();

        if (!image) {
            return NextResponse.json({ error: 'Görsel gerekli' }, { status: 400 });
        }

        // Base64 başlığını temizle (data:image/jpeg;base64, kısmı)
        const base64Data = image.split(',')[1];

        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const prompt = `
        Sen mistik bir enerji okuyucususun. Bu fotoğraftaki kişinin yüz ifadesine, gözlerindeki ışığa, duruşuna ve ortamın enerjisine bakarak onun "Aura Rengini" analiz et.
        
        Analizini şu JSON formatında döndür (Sadece saf JSON, markdown yok):
        {
            "color": "#HEXCODE", (Örn: #9b5de5 - Mor, #f15bb5 - Pembe, #00bbf9 - Turkuaz, #fee440 - Altın vb.)
            "colorName": "Mistik Mor",
            "meaning": "Kısa, etkileyici ve kişisel bir yorum (Max 2 cümle).",
            "suggestion": "Enerjini dengelemek veya yükseltmek için kısa bir öneri (Doğal taş veya ritüel)."
        }
        
        Tonun pozitif, mistik ve derin olsun. Asla negatif yorum yapma.
        `;

        const result = await model.generateContent([
            prompt,
            {
                inlineData: {
                    data: base64Data,
                    mimeType: 'image/jpeg'
                }
            }
        ]);

        const response = await result.response;
        const text = response.text();

        // Markdown temizliği (Bazen ```json ... ``` içinde dönebilir)
        const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const analysis = JSON.parse(cleanText);

        return NextResponse.json(analysis);

    } catch (error) {
        console.error('Aura analiz hatası:', error);
        return NextResponse.json({ error: 'Enerji okunamadı, bulutlar araya girmiş olabilir.' }, { status: 500 });
    }
}
