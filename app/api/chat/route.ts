import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';
import { ProfileManager } from '@/lib/user-profile-manager';
import { prisma } from '@/lib/prisma';

// Google Provider'ı bizim API anahtarımızla yapılandır
const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GEMINI_API_KEY || '',
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    // Frontend'den hem mesajları hem de kullanıcı verisini (data body içinde) bekliyoruz
    const { messages, data } = await req.json();

    const userId = data?.userId;
    let sessionId = data?.sessionId;

    // ProfileManager kullanarak "Cosmic Fingerprint" ve sistem promptunu oluştur
    const systemPrompt = ProfileManager.generateCosmicContext(data || {});

    // Kullanıcının son mesajını al
    const lastUserMessage = messages[messages.length - 1];

    // Eğer oturum yoksa ve kullanıcı giriş yapmışsa, yeni oturum başlat
    if (userId && !sessionId) {
        try {
            const session = await prisma.chatSession.create({
                data: {
                    userId,
                    title: lastUserMessage.content.slice(0, 30) + "..."
                }
            });
            sessionId = session.id;
        } catch (e) {
            console.error("Session creation failed", e);
        }
    }

    // Kullanıcı mesajını kaydet
    if (sessionId && lastUserMessage) {
        try {
            await prisma.chatMessage.create({
                data: {
                    sessionId,
                    role: 'user',
                    content: lastUserMessage.content
                }
            });
        } catch (e) {
            console.error("User message save failed", e);
        }
    }

    const result = streamText({
        model: google('gemini-2.0-flash'),
        system: systemPrompt,
        messages,
        onFinish: async ({ text }) => {
            // AI cevabını kaydet
            if (sessionId) {
                try {
                    await prisma.chatMessage.create({
                        data: {
                            sessionId,
                            role: 'assistant',
                            content: text
                        }
                    });
                } catch (e) {
                    console.error("AI message save failed", e);
                }
            }
        }
    });

    // İstemciye sessionId'yi header veya data olarak dönmek ideal olurdu ama stream yanıtı olduğu için,
    // istemci tarafında session yönetimi state ile yapılmalı veya ayrı bir endpoint ile oluşturulmalı.
    // Şimdilik sadece stream dönüyoruz.

    return result.toTextStreamResponse({
        headers: {
            // İstemciye yeni oluşturulan session ID'sini header ile bildirmeyi deneyebiliriz
            'x-manifestia-session-id': sessionId || '',
        }
    });
}
