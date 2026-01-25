import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { ProfileManager } from '@/lib/user-profile-manager';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    // Frontend'den hem mesajları hem de kullanıcı verisini (data body içinde) bekliyoruz
    const { messages, data } = await req.json();

    // ProfileManager kullanarak "Cosmic Fingerprint" ve sistem promptunu oluştur
    const systemPrompt = ProfileManager.generateCosmicContext(data || {});

    const result = streamText({
        model: google('gemini-2.0-flash'),
        system: systemPrompt,
        messages,
    });

    return result.toTextStreamResponse();
}
