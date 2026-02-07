import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    try {
        const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error("❌ API Key Bulunamadı!");
            return new Response(JSON.stringify({ error: "Server Configuration Error: Missing API Key" }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const google = createGoogleGenerativeAI({
            apiKey: apiKey,
        });

        const body = await req.json();
        const { messages, userProfile } = body;

        // Varsayılan değerler (Eğer profil boşsa)
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

        // KİŞİSELLEŞTİRİLMİŞ SYSTEM PROMPT
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
        - Eğer kullanıcı tarot, rüya veya dertleşme istiyorsa, bu astrolojik bağlamı koruyarak yanıtla.`;

        console.log("🤖 AI Kişiselleştirilmiş Prompt Hazırlandı:", { user: profile.name, sun: profile.sunSign });

        const result = streamText({
            model: google('gemini-2.0-flash'),
            system: systemPrompt,
            messages,
        });

        return result.toTextStreamResponse();

    } catch (error: any) {
        console.error("Chat Route Error:", error);
        return new Response(JSON.stringify({
            error: error.message || "Internal Server Error"
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
