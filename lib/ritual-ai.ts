import { GoogleGenerativeAI } from "@google/generative-ai";
import { Ritual, RitualStep } from "./rituals";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function generateRitualAI(emotion: string, duration: number = 2): Promise<Ritual> {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
    You are a grand mystic and spiritual guide. Create a personalized meditation ritual for a user who is feeling: "${emotion}".
    The ritual should last approximately ${duration} minutes.

    Return ONLY a JSON object matching this structure (no markdown, no code blocks):
    {
        "title": "Short, mystical title (Turkish)",
        "description": "One sentence comforting description (Turkish)",
        "longDescription": "Detailed explanation of why this ritual helps (Turkish)",
        "iconName": "One of: 'Flame', 'Sun', 'Moon', 'Wind'",
        "color": "Tailwind gradient string (e.g., 'from-blue-500 to-purple-600')",
        "audioTrack": "One of: '/sounds/zen.ogg', '/sounds/cosmos.ogg', '/sounds/amazon.ogg', '/sounds/528hz-ambient.mp3'",
        "steps": [
            {
                "text": "Instruction for this step (Turkish)",
                "duration": number (seconds),
                "animation": "One of: 'breathe', 'focus', 'stars'"
            }
        ]
    }

    Rules:
    - 'breathe': Used for breathing exercises.
    - 'focus': Used for visualization or holding a thought.
    - 'stars': Used for opening or closing cosmic connection.
    - Total duration of steps should be roughly ${duration * 60} seconds.
    - Language: Turkish.
    `;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean markdown if present
        const jsonStr = text.replace(/```json/g, '').replace(/```/g, '').trim();
        const data = JSON.parse(jsonStr);

        return {
            id: `ai-${Date.now()}`,
            baseTitle: data.title,
            baseDescription: data.description,
            type: 'meditation',
            xpReward: 50,
            duration: `${duration} Dk`,
            iconName: data.iconName,
            color: data.color,
            audioTrack: data.audioTrack,
            variations: [
                {
                    title: data.title,
                    description: data.longDescription || data.description,
                    steps: data.steps
                }
            ]
        };
    } catch (error) {
        console.error("AI Ritual Generation Failed:", error);
        // Fallback Ritual
        return {
            id: 'fallback-calm',
            baseTitle: 'Anlık Dinginlik',
            baseDescription: 'Derin bir nefes al ve merkeze dön.',
            type: 'meditation',
            xpReward: 20,
            duration: '2 Dk',
            iconName: 'Wind',
            color: 'from-blue-400 to-cyan-300',
            audioTrack: '/sounds/zen.ogg',
            variations: [
                {
                    title: 'Anlık Dinginlik',
                    description: 'Yıldızların mesajı bazen sessizlikte gelir. Bu kısa ritüel ile zihnini sakinleştir.',
                    steps: [
                        { text: "Gözlerini kapat ve derin bir nefes al.", duration: 10, animation: 'focus' },
                        { text: "Nefes verken tüm gerginliği bırak.", duration: 10, animation: 'breathe' },
                        { text: "Sadece şu ana odaklan.", duration: 20, animation: 'stars' }
                    ]
                }
            ]
        };
    }
}
