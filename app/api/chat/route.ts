import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { generateText } from 'ai';
import { NextResponse } from 'next/server';

// Allow responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error("API Key Bulunamadi!");
            return NextResponse.json({ error: "Server Configuration Error: Missing API Key" }, { status: 500 });
        }

        const google = createGoogleGenerativeAI({ apiKey });

        const body = await req.json();
        const { messages, userProfile } = body;

        if (!messages || !Array.isArray(messages) || messages.length === 0) {
            return NextResponse.json({ error: "messages array is required" }, { status: 400 });
        }

        // Varsayilan degerler
        const profile = {
            name: userProfile?.name || 'Gezgin',
            sunSign: userProfile?.sunSign || 'Bilinmiyor',
            moonSign: userProfile?.moonSign || 'Bilinmiyor',
            risingSign: userProfile?.risingSign || 'Bilinmiyor',
            lifePath: userProfile?.lifePathNumber || 'Bilinmiyor',
            fire: userProfile?.elementBalance?.fire || 0,
            earth: userProfile?.elementBalance?.earth || 0,
            air: userProfile?.elementBalance?.air || 0,
            water: userProfile?.elementBalance?.water || 0,
        };

        const systemPrompt = `Sen ${profile.name} için kişisel astroloji rehberisin.

KULLANICI PROFİLİ:
- Güneş Burcu: ${profile.sunSign}
- Ay Burcu: ${profile.moonSign}
- Yükselen: ${profile.risingSign}
- Yaşam Yolu: ${profile.lifePath}
- Element Dengesi: Ateş %${profile.fire}, Toprak %${profile.earth}, Hava %${profile.air}, Su %${profile.water}

GÖREVİN:
- Her yanıtı bu bilgilere göre kişiselleştir.
- Kullanıcının ismini (${profile.name}) fırsat buldukça nazikçe kullan.
- Burç özelliklerine (${profile.sunSign}, ${profile.moonSign}, ${profile.risingSign}) referans vererek tavsiyeler sun.
- Samimi, mistik ama anlaşılır ve destekleyici bir dil kullan.
- Genel geçer cevaplar verme, kullanıcının enerjisine özel konuş.
- Türkçe yanıt ver.
- Yanıtlarını 2-3 paragrafla sınırla, çok uzun yazma.`;

        const result = await generateText({
            model: google('gemini-2.0-flash'),
            system: systemPrompt,
            messages: messages.map((m: any) => ({ role: m.role, content: m.content })),
        });

        return NextResponse.json({ response: result.text });

    } catch (error: any) {
        console.error("Chat Route Error:", error);
        return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
    }
}
