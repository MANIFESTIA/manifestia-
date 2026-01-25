import { NextRequest, NextResponse } from 'next/server';
import { voiceService, VoicePersona } from '@/lib/voice/voice-service';

export async function POST(req: NextRequest) {
    try {
        const { text, persona } = await req.json();

        if (!text) {
            return NextResponse.json({ error: 'Text is required' }, { status: 400 });
        }

        const audioData = await voiceService.synthesize(text, persona as VoicePersona);

        if (!audioData) {
            return NextResponse.json({ error: 'TTS Service Unavailable' }, { status: 503 });
        }

        // Audio verisini buffer olarak döndür
        return new NextResponse(new Blob([audioData as any]), {
            headers: {
                'Content-Type': 'audio/mpeg',
                'Content-Length': audioData.length.toString(),
            },
        });

    } catch (error) {
        console.error('TTS API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
