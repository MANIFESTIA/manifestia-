import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AstrologyService } from "@/lib/astrology-service";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { name, birthDate, birthTime, birthPlace } = await req.json();

        if (!birthDate || !birthPlace) {
            return NextResponse.json({
                error: "Doğum tarihi ve yeri gereklidir."
            }, { status: 400 });
        }

        // 1. GERÇEK HESAPLAMALAR
        console.log('📊 Astroloji hesaplamaları başlıyor...');

        const sunSign = AstrologyService.getSunSign(birthDate);
        const lifePath = AstrologyService.calculateLifePath(birthDate);

        console.log('☀️ Güneş Burcu:', sunSign);
        console.log('🔢 Yaşam Yolu:', lifePath);

        const coordinates = AstrologyService.getCityCoordinates(birthPlace);

        let moonSign = 'Bilinmiyor';
        let ascendant = 'Bilinmiyor';

        if (birthTime && coordinates) {
            console.log('📍 Koordinatlar:', coordinates);
            try {
                moonSign = AstrologyService.getMoonSign(birthDate, birthTime);
                ascendant = AstrologyService.getAscendant(
                    birthDate,
                    birthTime,
                    coordinates.lat,
                    coordinates.lng
                );
                console.log('🌙 Ay Burcu:', moonSign);
                console.log('⬆️ Yükselen:', ascendant);
            } catch (error) {
                console.error('❌ Ay/Yükselen hatası:', error);
            }
        } else {
            console.log('⚠️ Doğum saati veya koordinat yok');
        }

        const elementBalance = AstrologyService.calculateElementBalance(
            sunSign,
            moonSign,
            ascendant
        );

        console.log('🔥 Element Dengesi:', elementBalance);

        // 2. GEMINI'YE SADECE YORUM İÇİN SOR
        console.log('🤖 Gemini yorumu isteniyor...');

        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `Sen profesyonel astrologsun. Bu verilere göre YORUM yap:

Kişi: ${name}
Güneş: ${sunSign}
Ay: ${moonSign}
Yükselen: ${ascendant}
Yaşam Yolu: ${lifePath}
Element: Ateş %${elementBalance.fire}, Toprak %${elementBalance.earth}, Hava %${elementBalance.air}, Su %${elementBalance.water}

Sadece JSON yanıt ver (Markdown yok):
{
    "interpretation": {
        "general": "Genel karakter (150 kelime MAX)",
        "love": "Aşk hayatı (100 kelime MAX)",
        "career": "Kariyer (100 kelime MAX)",
        "soulPurpose": "Ruhsal amaç (100 kelime MAX)"
    }
}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();

        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        if (text.startsWith('json')) text = text.slice(4).trim();

        let interpretation;
        try {
            interpretation = JSON.parse(text);
            console.log('✅ Gemini başarılı');
        } catch (parseError) {
            console.error("❌ JSON Parse Hatası:", parseError);
            interpretation = {
                interpretation: {
                    general: "Enerjin güçlü ve özgün.",
                    love: "İlişkilerde samimi ve tutkulu.",
                    career: "Yaratıcı ve lider ruhun var.",
                    soulPurpose: "Başkalarına ilham vermek."
                }
            };
            console.log('⚠️ Fallback yorum');
        }

        return NextResponse.json({
            sunSign,
            moonSign,
            risingSign: ascendant,
            lifePath,
            elements: elementBalance,
            interpretation: interpretation.interpretation
        });

    } catch (error: any) {
        console.error("❌ Hata:", error);
        return NextResponse.json({
            error: error.message || "Yıldızlar sessiz..."
        }, { status: 500 });
    }
}