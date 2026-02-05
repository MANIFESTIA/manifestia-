// lib/astrology-service.ts

import * as Astronomy from 'astronomy-engine';

export class AstrologyService {

    static getSunSign(birthDate: string): string {
        const date = new Date(birthDate);
        const month = date.getMonth() + 1;
        const day = date.getDate();

        if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Koç';
        if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Boğa';
        if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'İkizler';
        if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Yengeç';
        if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Aslan';
        if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Başak';
        if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Terazi';
        if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Akrep';
        if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Yay';
        if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Oğlak';
        if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Kova';
        if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'Balık';

        return 'Bilinmiyor';
    }

    static getMoonSign(birthDate: string, birthTime: string): string {
        try {
            const [year, month, day] = birthDate.split('-').map(Number);
            const [hour, minute] = birthTime.split(':').map(Number);

            const date = new Date(Date.UTC(year, month - 1, day, hour, minute));
            const time = Astronomy.MakeTime(date);

            const moon = Astronomy.GeoMoon(time);
            const zodiacIndex = Math.floor(moon.lon / 30);

            const signs = ['Koç', 'Boğa', 'İkizler', 'Yengeç', 'Aslan', 'Başak',
                'Terazi', 'Akrep', 'Yay', 'Oğlak', 'Kova', 'Balık'];

            return signs[zodiacIndex];
        } catch (error) {
            console.error('Moon sign error:', error);
            return 'Bilinmiyor';
        }
    }

    static getAscendant(birthDate: string, birthTime: string, latitude: number, longitude: number): string {
        try {
            const [year, month, day] = birthDate.split('-').map(Number);
            const [hour, minute] = birthTime.split(':').map(Number);

            const hoursSinceMidnight = hour + minute / 60;
            const zodiacIndex = Math.floor(((hoursSinceMidnight / 2) + (month - 1)) % 12);

            const signs = ['Koç', 'Boğa', 'İkizler', 'Yengeç', 'Aslan', 'Başak',
                'Terazi', 'Akrep', 'Yay', 'Oğlak', 'Kova', 'Balık'];

            return signs[zodiacIndex];
        } catch (error) {
            console.error('Ascendant error:', error);
            return 'Bilinmiyor';
        }
    }

    static calculateLifePath(birthDate: string): number {
        const digits = birthDate.replace(/-/g, '').split('').map(Number);
        let sum = digits.reduce((a, b) => a + b, 0);

        if (sum === 11 || sum === 22 || sum === 33) return sum;

        while (sum > 9) {
            sum = sum.toString().split('').map(Number).reduce((a, b) => a + b, 0);
        }

        return sum;
    }

    static calculateElementBalance(sunSign: string, moonSign: string, ascendant: string) {
        const elements = { fire: 0, earth: 0, air: 0, water: 0 };

        const signToElement: Record<string, keyof typeof elements> = {
            'Koç': 'fire', 'Aslan': 'fire', 'Yay': 'fire',
            'Boğa': 'earth', 'Başak': 'earth', 'Oğlak': 'earth',
            'İkizler': 'air', 'Terazi': 'air', 'Kova': 'air',
            'Yengeç': 'water', 'Akrep': 'water', 'Balık': 'water',
        };

        [sunSign, moonSign, ascendant].forEach(sign => {
            const element = signToElement[sign];
            if (element) elements[element]++;
        });

        const total = 3;
        return {
            fire: Math.round((elements.fire / total) * 100),
            earth: Math.round((elements.earth / total) * 100),
            air: Math.round((elements.air / total) * 100),
            water: Math.round((elements.water / total) * 100),
        };
    }

    static getCityCoordinates(cityName: string): { lat: number; lng: number } | null {
        const cities: Record<string, { lat: number; lng: number }> = {
            'istanbul': { lat: 41.0082, lng: 28.9784 },
            'ankara': { lat: 39.9334, lng: 32.8597 },
            'izmir': { lat: 38.4192, lng: 27.1287 },
            'antalya': { lat: 36.8969, lng: 30.7133 },
            'bursa': { lat: 40.1826, lng: 29.0665 },
            'kuşadası': { lat: 37.8560, lng: 27.2610 },
            'kusadasi': { lat: 37.8560, lng: 27.2610 },
            'adana': { lat: 37.0000, lng: 35.3213 },
            'konya': { lat: 37.8667, lng: 32.4833 },
            'gaziantep': { lat: 37.0662, lng: 37.3833 },
            'mersin': { lat: 36.8121, lng: 34.6415 },
            'kayseri': { lat: 38.7312, lng: 35.4787 },
            'eskişehir': { lat: 39.7767, lng: 30.5206 },
            'diyarbakır': { lat: 37.9144, lng: 40.2306 },
            'samsun': { lat: 41.2867, lng: 36.3300 },
            'denizli': { lat: 37.7765, lng: 29.0864 },
            'şanlıurfa': { lat: 37.1591, lng: 38.7969 },
            'malatya': { lat: 38.3552, lng: 38.3095 },
            'trabzon': { lat: 41.0015, lng: 39.7178 },
            'balıkesir': { lat: 39.6484, lng: 27.8826 }
        };

        // Büyük/küçük harf duyarlı olmadan kontrol et
        const normalizedInput = cityName.toLowerCase().trim();

        // Önce tam eşleşme ara
        if (cities[normalizedInput]) {
            return cities[normalizedInput];
        }

        // Türkçe karakter normalizasyonu (ı→i, ş→s, ğ→g vb.)
        const turkishToEnglish: Record<string, string> = {
            'ı': 'i', 'İ': 'i', 'ş': 's', 'Ş': 's',
            'ğ': 'g', 'Ğ': 'g', 'ü': 'u', 'Ü': 'u',
            'ö': 'o', 'Ö': 'o', 'ç': 'c', 'Ç': 'c'
        };

        let normalizedCity = normalizedInput;
        Object.keys(turkishToEnglish).forEach(turkish => {
            normalizedCity = normalizedCity.replace(new RegExp(turkish, 'g'), turkishToEnglish[turkish]);
        });

        // Normalize edilmiş versiyonla ara
        const foundKey = Object.keys(cities).find(key => {
            let normalizedKey = key.toLowerCase();
            Object.keys(turkishToEnglish).forEach(turkish => {
                normalizedKey = normalizedKey.replace(new RegExp(turkish, 'g'), turkishToEnglish[turkish]);
            });
            return normalizedKey === normalizedCity;
        });

        return foundKey ? cities[foundKey] : null;
    }
}