/**
 * Prokerala API Astrology Service
 * OAuth 2.0 Authentication & Data Fetching
 */

const PROKERALA_CLIENT_ID = process.env.PROKERALA_CLIENT_ID;
const PROKERALA_CLIENT_SECRET = process.env.PROKERALA_CLIENT_SECRET;

let cachedToken: string | null = null;
let tokenExpiry: number = 0;

async function getAccessToken() {
    if (cachedToken && Date.now() < tokenExpiry) {
        return cachedToken;
    }

    const response = await fetch('https://api.prokerala.com/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: PROKERALA_CLIENT_ID || '',
            client_secret: PROKERALA_CLIENT_SECRET || '',
        }),
    });

    const data = await response.json();
    if (data.access_token) {
        cachedToken = data.access_token;
        tokenExpiry = Date.now() + (data.expires_in * 1000) - 60000; // Refresh 1 min before
        return cachedToken;
    }
    throw new Error('Prokerala authentication failed');
}

export async function getAstrologicalContext(birthData: {
    datetime: string;
    latitude: string;
    longitude: string;
}) {
    try {
        const token = await getAccessToken();

        // 1. Western Planetary Positions (Natal or Current)
        const response = await fetch(`https://api.prokerala.com/v2/astrology/western/planet-position?datetime=${birthData.datetime}&coordinates=${birthData.latitude},${birthData.longitude}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();

        // Filter and simplify for Gemini consumption
        const planets = data.data?.planets || [];
        const planetaryContext = planets.map((p: any) =>
            `${p.name} in ${p.zodiac_sign} (${p.degree}°)`
        ).join(', ');

        return {
            planetaryPositions: planetaryContext,
            raw: data.data
        };

    } catch (error) {
        console.error('Prokerala API Error:', error);
        return null;
    }
}

/**
 * Get Daily Transits for a specific user location
 */
export async function getDailyTransits(latitude: string, longitude: string) {
    try {
        const token = await getAccessToken();
        const now = new Date().toISOString();

        const response = await fetch(`https://api.prokerala.com/v2/astrology/western/transit-chart?datetime=${now}&coordinates=${latitude},${longitude}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Prokerala Transit Error:', error);
        return null;
    }
}
