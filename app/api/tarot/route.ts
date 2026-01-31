import { NextResponse } from 'next/server';
import { generateReading } from '@/lib/tarot-content';
import { prisma } from '@/lib/prisma'; // Singleton instance
import { generateTarotReadingAI } from '@/lib/tarot-ai';

export async function POST(req: Request) {
    let cardName = '';
    let reading;

    try {
        const body = await req.json();
        const { cardName: requestedCard, userSign, userId, spreadType, cards } = body;

        // Determine spread context
        const isThreeCard = spreadType === 'three_card' && Array.isArray(cards) && cards.length === 3;

        // Normalize cards input to objects [{name, isReversed}]
        let targetCards: { name: string, isReversed: boolean }[] = [];

        if (isThreeCard) {
            // If raw strings come in (legacy), map them. If objects come (future), use them.
            // Currently frontend sends strings in 'cards' array. We need to handle reversed logic potentially from frontend if passed.
            // For now, let's assume frontend sends strings, and we might RANDOMIZE reversed status here or accept object array.
            // Let's support object array from frontend.
            targetCards = cards.map((c: any) => typeof c === 'string' ? { name: c, isReversed: false } : c);
        } else {
            const singleName = requestedCard || (Array.isArray(cards) ? cards[0] : '');
            // If input was object?
            if (typeof cards?.[0] === 'object') {
                targetCards = [cards[0]];
            } else {
                targetCards = [{ name: singleName, isReversed: false }];
            }
        }

        cardName = targetCards.map(c => c.name).join(', ');

        try {
            // 1. ÖNCELİK: AI İLE CANLI YORUM (COSMIC INTELLIGENCE)
            console.log("AI Tarot Reading Başlatılıyor...", { targetCards, spreadType, userSign });

            reading = await generateTarotReadingAI({
                cards: targetCards, // Now passing objects
                spreadType: isThreeCard ? 'three_card' : 'single',
                userSign,
                question: body.question
            });

            console.log("AI Yorum Başarılı.");

        } catch (aiError) {
            console.error("AI Tarot Başarısız, Statik İçeriğe Dönülüyor:", aiError);

            // 2. FALLBACK: STATİK İÇERİK (Eski Sistem)
            if (isThreeCard) {
                const readings = cards.map((c: string) => generateReading(c, userSign));

                const combinedInterpretation = `
**GEÇMİŞ (${cards[0]}):** ${readings[0].interpretation}

**ŞİMDİ (${cards[1]}):** ${readings[1].interpretation}

**GELECEK (${cards[2]}):** ${readings[2].interpretation}
                `.trim();

                const combinedSuggestion = `Geçmiş: ${readings[0].suggestion}; Şimdi: ${readings[1].suggestion}; Gelecek: ${readings[2].suggestion}`;

                reading = {
                    interpretation: combinedInterpretation,
                    affirmation: readings[1].affirmation,
                    suggestion: combinedSuggestion
                };
            } else {
                reading = generateReading(cardName, userSign);
            }
        }

        // 3. Veritabanına Kaydet
        if (userId) {
            try {
                await prisma.tarotReading.create({
                    data: {
                        userId: userId,
                        question: body.question || (isThreeCard ? "Üç Kart Açılımı" : "Günlük Rehberlik"),
                        spreadType: isThreeCard ? "three_card" : "single",
                        cards: targetCards.map((c, i) => ({
                            name: c.name,
                            isReversed: c.isReversed, // Save reversed status
                            position: isThreeCard ? (i === 0 ? 'Past' : i === 1 ? 'Present' : 'Future') : 'Single',
                            interpretation: isThreeCard ? 'See main interpretation' : reading.interpretation
                        })),
                        interpretation: reading.interpretation,
                    }
                });
            } catch (dbError) {
                console.error("DB Save Error:", dbError);
            }
        }

        return NextResponse.json(reading);

    } catch (error) {
        console.error('Tarot kritik hata:', error);
        // Disaster Recovery Response
        return NextResponse.json({
            interpretation: "Enerjiler şu an çok yoğun, kartların mesajı sisli... İç sesine odaklan.",
            affirmation: "Kendi rehberliğime güveniyorum.",
            suggestion: "Biraz sonra tekrar dene."
        });
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get('userId');

        if (!userId) {
            return NextResponse.json({ error: 'UserId gerekli.' }, { status: 400 });
        }

        const readings = await prisma.tarotReading.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: 20 // Son 20 okuma
        });

        return NextResponse.json(readings);

    } catch (error) {
        console.error('Tarot geçmişi alınamadı:', error);
        return NextResponse.json({ error: 'Geçmiş alınamadı.' }, { status: 500 });
    }
}
