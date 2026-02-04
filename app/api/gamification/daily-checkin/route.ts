import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAuth } from '@/lib/auth-middleware';

export async function POST(req: Request) {
    try {
        const userId = await verifyAuth(req);
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { inventory: true }
        });

        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const today = new Date().toISOString().split('T')[0];
        const lastLogin = user.lastLoginDate;

        if (lastLogin === today) {
            return NextResponse.json({ success: false, message: 'Already claimed today', streak: user.streak, diamonds: user.diamonds });
        }

        // Streak Logic
        let newStreak = user.streak;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        if (lastLogin === yesterdayStr) {
            newStreak += 1;
        } else {
            // Reset streak if missed a day (unless it's the very first login)
            newStreak = (lastLogin === null) ? 1 : 1;
        }

        // Calculate Reward
        const cycleDay = ((newStreak - 1) % 7) + 1;
        let rewardAmount = 0;

        switch (cycleDay) {
            case 1: rewardAmount = 5; break;
            case 2: rewardAmount = 10; break;
            case 3: rewardAmount = 15; break;
            case 4: rewardAmount = 20; break;
            case 5: rewardAmount = 25; break;
            case 6: rewardAmount = 30; break;
            case 7: rewardAmount = 100; break;
        }

        // Bonus Logic
        let bonusAmount = 0;
        let newBadges: string[] = [...user.badges];

        if (newStreak === 10 && !newBadges.includes('seeker')) newBadges.push('seeker');
        if (newStreak === 21 && !newBadges.includes('devoted')) newBadges.push('devoted'); // example badge
        if (cycleDay === 7 && !newBadges.includes('aura_master')) newBadges.push('aura_master');

        const totalReward = rewardAmount + bonusAmount;

        // Transaction Record
        const transaction = await prisma.transaction.create({
            data: {
                userId: user.id,
                amount: totalReward,
                type: 'DAILY_REWARD',
                description: `Daily Login Day ${cycleDay}`
            }
        });

        // Update User
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                streak: newStreak,
                lastLoginDate: today,
                diamonds: { increment: totalReward },
                badges: newBadges
            }
        });

        return NextResponse.json({
            success: true,
            streak: newStreak,
            reward: totalReward,
            newBalance: updatedUser.diamonds,
            badges: newBadges
        });

    } catch (error) {
        console.error("Daily check-in error:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
