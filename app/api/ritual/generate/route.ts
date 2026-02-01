import { NextResponse } from 'next/server';
import { generateRitualAI } from '@/lib/ritual-ai';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { emotion } = body;

        if (!emotion) {
            return NextResponse.json({ error: 'Emotion is required' }, { status: 400 });
        }

        const ritual = await generateRitualAI(emotion);
        return NextResponse.json(ritual);

    } catch (error) {
        console.error("Ritual API Error:", error);
        return NextResponse.json({ error: 'Failed to generate ritual' }, { status: 500 });
    }
}
