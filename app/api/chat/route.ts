import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { prisma } from '@/lib/prisma';
import { ProfileManager } from '@/lib/user-profile-manager';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { userId, sessionId, userProfile } = body;

        // Message extraction
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

        // Gemini API Key control
        if (!process.env.GEMINI_API_KEY) {
            console.error('❌ GEMINI_API_KEY yok!');
            return NextResponse.json({
                error: 'API key eksik'
            }, { status: 500 });
        }

        // Generate professional cosmic context
        const cosmicContext = ProfileManager.generateCosmicContext(userProfile || {});

        const systemInstruction = `${cosmicContext}
        
**EK TALİMAT**: Kullanıcının sorusuna yukarıdaki astrolojik kimliğine (burç, yükselen, element) göre derinlemesine, bilgece ve rehberlik edici bir cevap ver. Eğer burcu biliniyorsa mutlaka buna atıfta bulun. Türkçeyi mükemmel ve mistik bir üslupla kullan. Asla bir yapay zeka olduğunu söyleme, sen Manifestia'nın ruhusun.`;

        console.log('📤 Gemini\'ye gönderilen prompt:', userMessage.substring(0, 50) + '...');

        // Gemini API Call
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: systemInstruction
        });

        const result = await model.generateContent(userMessage);
        const responseText = result.response.text();

        console.log('✅ Gemini yanıtı:', responseText.substring(0, 100) + '...');

        // Save to Database
        if (userId) {
            try {
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
