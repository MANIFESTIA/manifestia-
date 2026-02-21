import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { prisma } from '@/lib/prisma';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, sessionId } = body;

        // Mesajı al (farklı formatları destekle)
        let userMessage = '';

        if (body.message) {
            userMessage = body.message;
        } else if (body.messages && body.messages.length > 0) {
            const lastMsg = body.messages[body.messages.length - 1];
            userMessage = lastMsg.content || lastMsg.message || '';
        }

        console.log('📨 Gelen mesaj:', userMessage);

        if (!userMessage || userMessage.trim() === '') {
            return NextResponse.json({
                error: 'Mesaj boş olamaz'
            }, { status: 400 });
        }

        // Gemini API Key kontrolü
        if (!process.env.GEMINI_API_KEY) {
            console.error('❌ GEMINI_API_KEY yok!');
            return NextResponse.json({
                error: 'API key eksik'
            }, { status: 500 });
        }

        // Basit prompt
        const prompt = `Sen "Manifestia" uygulamasının bilge astroloji asistanısın. 
Kullanıcının adı: ${body.userProfile?.name || 'Gezgin'}
Burcu: ${body.userProfile?.sunSign || 'Bilinmiyor'}

Kullanıcı: ${userMessage}

Kısa, mistik ve samimi bir yanıt ver (max 100 kelime):`;

        console.log('📤 Gemini\'ye gönderilen prompt:', prompt.substring(0, 100) + '...');

        // Gemini API çağrısı
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash"
        });

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        console.log('✅ Gemini yanıtı:', responseText.substring(0, 100) + '...');

        // 3. Veritabanına Kaydet (Opsiyonel)
        if (userId) {
            try {
                // Mevcut session'ı bul veya yeni oluştur
                let targetSessionId = sessionId;

                if (!targetSessionId) {
                    const session = await prisma.chatSession.create({
                        data: {
                            userId: userId,
                            title: userMessage.substring(0, 30) + '...'
                        }
                    });
                    targetSessionId = session.id;
                }

                // Mesajları kaydet
                await prisma.chatMessage.createMany({
                    data: [
                        { sessionId: targetSessionId, role: 'user', content: userMessage },
                        { sessionId: targetSessionId, role: 'assistant', content: responseText }
                    ]
                });
            } catch (dbError) {
                console.error('❌ Chat DB kayıt hatası:', dbError);
            }
        }

        return NextResponse.json({
            content: responseText,
            role: 'assistant'
        });

    } catch (error: any) {
        console.error('❌ Chat API hatası:', error);
        return NextResponse.json({
            error: 'Bir hata oluştu',
            details: error.message
        }, { status: 500 });
    }
}
