
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth-middleware';
import { AstrologyService } from '@/lib/astrology-service';

export async function GET(req: Request) {
    try {
        const userId = await verifyAuth(req);
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                birthDate: true,
                birthTime: true,
                birthCity: true,
                sign: true, // Stored Sun Sign
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Default profile structure
        let profile = {
            name: user.name || 'Gezgin',
            birthDate: user.birthDate,
            birthTime: user.birthTime,
            birthCity: user.birthCity,
            sunSign: user.sign || 'Bilinmiyor',
            moonSign: 'Bilinmiyor',
            risingSign: 'Bilinmiyor',
            lifePathNumber: 0,
            elementBalance: { fire: 0, earth: 0, air: 0, water: 0 }
        };

        // If birth data exists, calculate astrological details
        if (user.birthDate && user.birthTime) {
            // 1. Sun Sign (Recalculate to be sure, or fallback to stored)
            const calculatedSunSign = AstrologyService.getSunSign(user.birthDate);
            if (calculatedSunSign !== 'Bilinmiyor') {
                profile.sunSign = calculatedSunSign;
            }

            // 2. Moon Sign
            profile.moonSign = AstrologyService.getMoonSign(user.birthDate, user.birthTime);

            // 3. Rising Sign (Ascendant) - Needs City Coordinates
            if (user.birthCity) {
                const coords = AstrologyService.getCityCoordinates(user.birthCity);
                if (coords) {
                    profile.risingSign = AstrologyService.getAscendant(
                        user.birthDate,
                        user.birthTime,
                        coords.lat,
                        coords.lng
                    );
                }
            }

            // 4. Life Path Number
            profile.lifePathNumber = AstrologyService.calculateLifePath(user.birthDate);

            // 5. Element Balance
            profile.elementBalance = AstrologyService.calculateElementBalance(
                profile.sunSign,
                profile.moonSign,
                profile.risingSign
            );
        }

        return NextResponse.json({ success: true, profile });

    } catch (error) {
        console.error('Profile API Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
