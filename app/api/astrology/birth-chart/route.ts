import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AstrologyService } from "../../../../lib/astrology-service";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Tarih formatını dönüştür (DD.MM.YYYY → YYYY-MM-DD)
function convertDateFormat(dateStr: string): string {
    if (dateStr.includes('.')) {
        const [day, month, year] = dateStr.split('.');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return dateStr;
}

export async function POST(req: Request) {
    try {
        let { name, birthDate, birthTime, birthPlace } = await req.json();

        if (!birthDate || !birthPlace) {
            return NextResponse.json({
                error: "Doğum tarihi ve yeri gereklidir."
            }, { status: 400 });
        }

        // Tarih formatını dönüştür
        birthDate = convertDateFormat(birthDate);

        console.log('📊 Astroloji hesaplamaları başlıyor...');
        console.log('📅 Tarih:', birthDate);
        console.log('📍 Şehir:', birthPlace);

        const sunSign = AstrologyService.getSunSign(birthDate);
        const lifePath = AstrologyService.calculateLifePath(birthDate);

        console.log('☀️ Güneş Burcu:', sunSign);
        console.log('🔢 Yaşam Yolu:', lifePath);

        const coordinates = AstrologyService.getCityCoordinates(birthPlace);

        let moonSign = 'Bilinmiyor';
        let ascendant = 'Bilinmiyor';

        if (birthTime && coordinates) {
            console.log('📍 Koordinatlar bulundu:', coordinates);
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
            if (!coordinates) {
                console.log('⚠️ Şehir bulunamadı:', birthPlace);
            }
        }

        const elementBalance = AstrologyService.calculateElementBalance(
            sunSign,
            moonSign,
            ascendant
        );

        console.log('🔥 Element Dengesi:', elementBalance);

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
                    general: "Enerjin güçlü ve özgün. Doğum haritanda derin bir potansiyel var.",
                    love: "İlişkilerde samimi ve tutkulu bir yaklaşımın var.",
                    career: "Yaratıcı ve lider ruhun, kariyerinde seni öne çıkaracak.",
                    soulPurpose: "Bu hayattaki derslerini öğrenmek ve başkalarına ilham vermek."
                }
            };
            console.log('⚠️ Fallback yorum kullanıldı');
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
        console.error("❌ Birth chart hatası:", error);
        return NextResponse.json({
            error: error.message || "Yıldızlar şu an sessiz..."
        }, { status: 500 });
    }
}