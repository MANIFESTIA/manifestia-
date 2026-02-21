import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { prisma } from '@/lib/prisma';
import { ProfileManager } from '@/lib/user-profile-manager';
import { getAstrologicalContext } from '@/lib/astrology-api';

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

        if (!userMessage || userMessage.trim() === '') {
            return NextResponse.json({ error: 'Mesaj boş olamaz' }, { status: 400 });
        }

        // 1. Prokerala'dan Profesyonel Veri Çekme
        // Not: Kullanıcı profiline lat/lon eklendiğinde tam isabet olur. 
        // Şimdilik standart TR koordinatları veya profil verisinden bir tahmin yapıyoruz.
        const birthDateTime = `${userProfile?.birthDate}T${userProfile?.birthTime}:00Z`;
        const astroData = await getAstrologicalContext({
            datetime: birthDateTime,
            latitude: "37.8590", // Örn: Kuşadası/Aydın
            longitude: "27.2560"
        });

        // 2. Cosmic Context Oluşturma
        const cosmicContext = ProfileManager.generateCosmicContext(userProfile || {});

        const systemInstruction = `
${cosmicContext}

**PROFESYONEL ASTROLOJİK VERİLER (GERÇEK ZAMANLI)**:
${astroData?.planetaryPositions || 'Gezegen konumları şu an hesaplanamıyor ama genel burç yorumu yap.'}

**EK TALİMAT**: 
Sen sadece bir AI değil, Manifestia'nın ruhusun. Yukarıdaki GERÇEK gezegen konumlarını (Evler, Burçlar ve Dereceler) analiz et. 
Kullanıcının sorusuna bu teknik verileri "bir bilgenin dilinden" süzerek cevap ver. 
Örneğin eğer kullanıcının Merkür'ü Boğa'daysa, onun düşünce yapısının ne kadar sağlam ve pratik olduğunu konuşmalarına yedir. 
Asla teknik terimleri (Örn: "Mars 23 derecede") doğrudan verme, onları mistik bir hikayeye dönüştür.`;

        // 3. Gemini Call
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: systemInstruction
        });

        const result = await model.generateContent(userMessage);
        const responseText = result.response.text();

        // 4. Save to Database (Async)
        if (userId) {
            try {
                let targetSessionId = sessionId;
                if (!targetSessionId) {
                    const session = await prisma.chatSession.create({
                        data: { userId, title: userMessage.substring(0, 30) + '...' }
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
                console.error('❌ Chat DB error:', dbError);
            }
        }

        return NextResponse.json({ content: responseText, role: 'assistant' });

    } catch (error: any) {
        console.error('❌ Chat API hatası:', error);
        return NextResponse.json({ error: 'Bir hata oluştu', details: error.message }, { status: 500 });
    }
}
