import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { name, birthDate, birthTime, birthPlace } = await req.json();

        if (!birthDate || !birthPlace) {
            return NextResponse.json({ error: "Doğum tarihi ve yeri gereklidir." }, { status: 400 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
        Sen profesyonel, bilge ve mistik bir astrologsun. Aşağıdaki bilgilere sahip kişi için detaylı bir Doğum Haritası (Natal Chart) yorumu yap.
        
        Kişi Bilgileri:
        İsim: ${name}
        Doğum Tarihi: ${birthDate}
        Doğum Saati: ${birthTime || "Bilinmiyor"}
        Doğum Yeri: ${birthPlace}

        Lütfen çıktıyı şu JSON formatında ver (Markdown değil, saf JSON):
        {
            "sunSign": "Güneş Burcu Adı (Örn: Boğa)",
            "moonSign": "Ay Burcu Adı (Örn: Akrep) - Eğer saat yoksa 'Bilinmiyor' veya tahmini yaz",
            "risingSign": "Yükselen Burç Adı (Örn: Aslan) - Eğer saat yoksa 'Bilinmiyor' yaz",
            "elements": {
                "fire": "%Yüzde",
                "earth": "%Yüzde",
                "air": "%Yüzde",
                "water": "%Yüzde"
            },
            "interpretation": {
                "general": "Kişinin genel karakter analizi, güçlü ve zayıf yönleri. Mistik ve derin bir dille yaz.",
                "love": "Aşk ve ilişkilerdeki potansiyeli, nelerden hoşlandığı.",
                "career": "Kariyer ve finansal yetenekleri.",
                "soulPurpose": "Ruhsal amacı ve bu hayattaki dersi."
            }
        }
        
        Analiz tone of voice: Gizemli, etkileyici, profesyonel ama anlaşılır. Kullanıcıya özel olduğunu hissettir.
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;

        let text = response.text();
        // Clean markdown ```json if present
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();

        const data = JSON.parse(text);

        return NextResponse.json(data);

    } catch (error) {
        console.error("Birth chart generation failed:", error);
        return NextResponse.json({ error: "Yıldızlar şu an sessiz... Lütfen daha sonra tekrar dene." }, { status: 500 });
    }
}
