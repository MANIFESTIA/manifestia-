import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
    try {
        const { name, sign, timeContext } = await req.json();

        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

        const prompt = `
        Sen mistik bir rehbersin. Kullanıcıya günün bu saati (${timeContext || 'genel'}) için kısa, tek cümlelik, etkileyici ve spiritüel bir mesaj ver.
        
        Kullanıcı: ${name || 'Ruh'}
        Burcu: ${sign || 'Bilinmiyor'}
        
        Kurallar:
        1. Sadece TEK BİR CÜMLE yaz.
        2. Mistik, pozitif ve güçlendirici bir dil kullan.
        3. Asla "Merhaba" veya "Selam" deme, doğrudan mesajı ver.
        4. "Bugün" kelimesini çok sık kullanma.
        5. Türkçeyi şiirsel kullan.
        
        Örnek Çıktı: "Yıldızlar senin için parlıyor, içindeki ışığı serbest bırak."
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text().trim();

        return NextResponse.json({ message: text });

    } catch (error) {
        console.error('Guidance generation error:', error);
        return NextResponse.json({ message: "Evrenin fısıltısı şu an duyulamıyor, iç sesine güven." }, { status: 500 });
    }
}
