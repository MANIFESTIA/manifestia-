import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import { ProfileManager } from '@/lib/user-profile-manager';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    // Kullanıcı verisini body'den alıyoruz (data: UserProfile)
    const { data } = await req.json();

    // ProfileManager ile dinamik sistem bağlamını (System Prompt) oluştur
    const systemPrompt = ProfileManager.generateCosmicContext(data || {});

    // Görevi spesifik olarak "Günün Mesajı" üretmeye uyarla
    const taskPrompt = "Bugün gökyüzünde gerçekleşen en önemli transitlerden birini seç. Benim haritama (yukarıdaki verilere) göre bu transitin beni nasıl etkilediğini analiz et ve bana 'Evrenden Bir Mesajın Var ✨' başlığına uygun, vizyoner, kısa (3 cümleyi geçmeyen) ama çok etkili bir rehberlik mesajı ver.";

    const { text } = await generateText({
        model: google('gemini-2.0-flash'),
        system: systemPrompt,
        prompt: taskPrompt,
    });

    return Response.json({ message: text });
}
