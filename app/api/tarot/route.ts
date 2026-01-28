import { NextResponse } from 'next/server';
import { generateReading } from '@/lib/tarot-content';

export async function POST(req: Request) {
    let cardName = '';

    try {
        const body = await req.json();
        cardName = body.cardName;
        const { userSign } = body;

        // "Cosmic Oracle Engine" - Yerel ve Anlık Üretim
        // API gecikmesi veya maliyeti olmadan, binlerce varyasyon.
        const reading = generateReading(cardName, userSign);

        // Yapay bir düşünme süresi ekleyelim (daha gerçekçi hissettirsin)
        await new Promise(resolve => setTimeout(resolve, 1000));

        return NextResponse.json(reading);
    } catch (error) {
        console.error('Tarot yorumlama hatası (Sistem Mock Cevap Döndürüyor):', error);

        // MOCK BACKUP RESPONSE
        // Eğer API çalışmazsa bu cevap döner, böylece kullanıcı asla hata görmez.
        const mockResponse = {
            interpretation: `Kartların bilgeliği şu an evrensel akışla bütünleşiyor. ${cardName || 'Bu kart'}, senin için derin bir dönüşümün habercisi. İçsel gücüne güven ve akışta kal.`,
            affirmation: "Evrenin sonsuz olasılıklarına kendimi açıyorum.",
            suggestion: "Bu enerjiyi mühürlemek için derin bir nefes al ve niyetini tekrarla."
        };

        return NextResponse.json(mockResponse);
    }
}
