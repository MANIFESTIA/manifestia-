import 'dotenv/config';
import { generateText } from 'ai';
import { google } from '@ai-sdk/google';
import { ProfileManager } from '../lib/user-profile-manager';
import { UserProfile } from '../types';

import fs from 'fs';
import path from 'path';

const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
    const envConfig = require('dotenv').parse(fs.readFileSync(envPath));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}

async function testCosmicBrain() {
    console.log("🌌 Kozmik Beyin Testi (Tekil Mod)...\n");

    const userFire: UserProfile = {
        name: "Alev",
        birthDate: "1995-07-25", // Aslan (Ateş)
        birthTime: "12:00",
        birthCity: "İzmir",
        birthYear: "1995"
    } as any;

    console.log(`🔥 TEST: Ateş Elementi (Aslan) - ${userFire.name}`);
    const promptFire = ProfileManager.generateCosmicContext(userFire);

    const resultFire = await generateText({
        model: google('gemini-2.0-flash'),
        system: promptFire,
        prompt: "Bugün benim için evrenin mesajı nedir? Tek bir cümle yeterli.",
    });
    console.log(`🤖 YANIT:\n"${resultFire.text}"\n`);
}

testCosmicBrain().catch(console.error);
