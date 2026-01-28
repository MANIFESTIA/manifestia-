import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
    try {
        const { birthDate, birthTime, birthCity, name } = await req.json();

        // Safe default if API key is missing (for development)
        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({
                type: "insight",
                title: "Kozmik Bağlantı",
                message: "Yıldızlar seninle konuşmak istiyor, ancak kozmik hatlarda (API Key) bir yoğunluk var.",
                action: "Daha sonra dene"
            });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `
            Act as a mystical astrological guide for a user named ${name}.
            Birth Data: ${birthDate} ${birthTime} in ${birthCity}.
            Current Date: ${new Date().toLocaleDateString()}.

            Analyze the current planetary transits relative to their birth chart.
            Identify ONE key theme for today: either a generic daily insight OR a specific urgent warning (Retrograde, Full Moon, Squares).
            
            Return ONLY a valid JSON object with this structure:
            {
                "type": "warning" | "opportunity" | "insight",
                "title": "Short, Punchy Title (e.g., Merkür Retrosu!)",
                "message": "A 2-sentence mystical advice in Turkish.",
                "action": "One short action advice (e.g., İmza atma, Meditasyon yap)."
            }
        `;

        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Clean markdown if present
        const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(jsonStr);

        return NextResponse.json(data);

    } catch (error) {
        console.error("Cosmic Watcher Error:", error);
        return NextResponse.json({
            type: "insight",
            title: "Evrenin Sessizliği",
            message: "Şu an yıldızların fısıltısını duyamıyoruz. İç sesine güven.",
            action: "Nefes al"
        });
    }
}
