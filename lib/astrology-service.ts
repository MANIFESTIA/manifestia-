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

            const moonLon = Astronomy.EclipticLongitude(Astronomy.Body.Moon, time);
            const zodiacIndex = Math.floor(moonLon / 30);

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

            // Daha hassas bir Yükselen (Ascendant) hesaplama yaklaşımı
            const date = new Date(Date.UTC(year, month - 1, day, hour, minute));
            const jd = Astronomy.MakeTime(date).tt;
            const t = (jd - 2451545.0) / 36525.0;

            // Greenwich Mean Sidereal Time (GMST)
            let gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * t * t - t * t * t / 38710000.0;
            gmst = gmst % 360;
            if (gmst < 0) gmst += 360;

            // Local Sidereal Time (LST)
            let lst = gmst + longitude;
            lst = lst % 360;
            if (lst < 0) lst += 360;

            // RAMC
            const ramc = lst;

            // Ascendant calculation (Simplified Placidus/Koch approximation)
            const eps = 23.4392911; // Obliquity of the ecliptic
            const ascRad = Math.atan2(
                Math.cos(ramc * Math.PI / 180),
                - (Math.sin(ramc * Math.PI / 180) * Math.cos(eps * Math.PI / 180) + Math.tan(latitude * Math.PI / 180) * Math.sin(eps * Math.PI / 180))
            );

            let ascDeg = ascRad * 180 / Math.PI;
            ascDeg = (ascDeg + 90) % 360;
            if (ascDeg < 0) ascDeg += 360;

            const zodiacIndex = Math.floor(ascDeg / 30);
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
            'adana': { lat: 37.0, lng: 35.3213 },
            'adiyaman': { lat: 37.7644, lng: 38.2764 },
            'afyonkarahisar': { lat: 38.7569, lng: 30.5381 },
            'agri': { lat: 39.7192, lng: 43.0503 },
            'amasya': { lat: 40.6533, lng: 35.8331 },
            'ankara': { lat: 39.9334, lng: 32.8597 },
            'antalya': { lat: 36.8841, lng: 30.7056 },
            'artvin': { lat: 41.1828, lng: 41.8183 },
            'aydin': { lat: 37.8444, lng: 27.8458 },
            'balikesir': { lat: 39.6484, lng: 27.8826 },
            'bilecik': { lat: 40.1419, lng: 29.9793 },
            'bingol': { lat: 38.8847, lng: 40.4939 },
            'bitlis': { lat: 38.4006, lng: 42.1097 },
            'bolu': { lat: 40.735, lng: 31.6061 },
            'burdur': { lat: 37.7203, lng: 30.2908 },
            'bursa': { lat: 40.1826, lng: 29.0665 },
            'canakkale': { lat: 40.1553, lng: 26.4142 },
            'cankiri': { lat: 40.6013, lng: 33.6134 },
            'corum': { lat: 40.5489, lng: 34.9533 },
            'denizli': { lat: 37.7765, lng: 29.0864 },
            'diyarbakir': { lat: 37.9144, lng: 40.2306 },
            'edirne': { lat: 41.6772, lng: 26.5558 },
            'elazig': { lat: 38.681, lng: 39.2264 },
            'erzincan': { lat: 39.75, lng: 39.5 },
            'erzurum': { lat: 39.9, lng: 41.27 },
            'eskisehir': { lat: 39.7767, lng: 30.5206 },
            'gaziantep': { lat: 37.0662, lng: 37.3833 },
            'giresun': { lat: 40.9128, lng: 38.3895 },
            'gumushane': { lat: 40.4608, lng: 39.4814 },
            'hakkari': { lat: 37.5833, lng: 43.7333 },
            'hatay': { lat: 36.2023, lng: 36.1613 },
            'isparta': { lat: 37.7648, lng: 30.5566 },
            'mersin': { lat: 36.8121, lng: 34.6415 },
            'istanbul': { lat: 41.0082, lng: 28.9784 },
            'izmir': { lat: 38.4192, lng: 27.1287 },
            'kars': { lat: 40.6167, lng: 43.1 },
            'kastamonu': { lat: 41.3811, lng: 33.7753 },
            'kayseri': { lat: 38.7312, lng: 35.4787 },
            'kirklareli': { lat: 41.7333, lng: 27.2167 },
            'kirsehir': { lat: 39.1425, lng: 34.1708 },
            'kocaeli': { lat: 40.8533, lng: 29.8815 },
            'konya': { lat: 37.8667, lng: 32.4833 },
            'kutahya': { lat: 39.4167, lng: 29.9833 },
            'malatya': { lat: 38.3552, lng: 38.3095 },
            'manisa': { lat: 38.6191, lng: 27.4289 },
            'kahramanmaras': { lat: 37.5858, lng: 36.9371 },
            'mardin': { lat: 37.3122, lng: 40.735 },
            'mugla': { lat: 37.2153, lng: 28.3636 },
            'mus': { lat: 38.7432, lng: 41.5064 },
            'nevsehir': { lat: 38.6247, lng: 34.7144 },
            'nigde': { lat: 37.9667, lng: 34.6833 },
            'ordu': { lat: 40.9839, lng: 37.8764 },
            'rize': { lat: 41.0201, lng: 40.5234 },
            'sakarya': { lat: 40.7569, lng: 30.3781 },
            'samsun': { lat: 41.2867, lng: 36.33 },
            'siirt': { lat: 37.9333, lng: 41.95 },
            'sinop': { lat: 42.0231, lng: 35.1531 },
            'sivas': { lat: 39.7477, lng: 37.0178 },
            'tekirdag': { lat: 40.9833, lng: 27.5167 },
            'tokat': { lat: 40.3167, lng: 36.55 },
            'trabzon': { lat: 41.0015, lng: 39.7178 },
            'tunceli': { lat: 39.1078, lng: 39.5403 },
            'sanliurfa': { lat: 37.1591, lng: 38.7969 },
            'usak': { lat: 38.6823, lng: 29.4082 },
            'van': { lat: 38.4891, lng: 43.4011 },
            'yozgat': { lat: 39.8181, lng: 34.8147 },
            'zonguldak': { lat: 41.4511, lng: 31.7944 },
            'aksaray': { lat: 38.3687, lng: 34.037 },
            'bayburt': { lat: 40.2552, lng: 40.2249 },
            'karaman': { lat: 37.1759, lng: 33.2287 },
            'kirikkale': { lat: 39.8468, lng: 33.5153 },
            'batman': { lat: 37.8812, lng: 41.1351 },
            'sirnak': { lat: 37.5164, lng: 42.4611 },
            'bartin': { lat: 41.6344, lng: 32.3375 },
            'ardahan': { lat: 41.1105, lng: 42.7022 },
            'igdir': { lat: 39.9167, lng: 44.0333 },
            'yalova': { lat: 40.6551, lng: 29.2769 },
            'karabuk': { lat: 41.2061, lng: 32.6204 },
            'kilis': { lat: 36.7184, lng: 37.1212 },
            'osmaniye': { lat: 37.0742, lng: 36.2473 },
            'duzce': { lat: 40.8438, lng: 31.1565 },
            'kuşadası': { lat: 37.8560, lng: 27.2610 },
            'kusadasi': { lat: 37.8560, lng: 27.2610 }
        };

        const normalizedInput = cityName.toLowerCase().trim();

        // Türkçe karakter normalizasyonu (ı→i, ş→s, ğ→g vb.)
        const turkishToEnglish: Record<string, string> = {
            'ı': 'i', 'İ': 'i', 'ş': 's', 'Ş': 's',
            'ğ': 'g', 'Ğ': 'g', 'ü': 'u', 'Ü': 'u',
            'ö': 'o', 'Ö': 'o', 'ç': 'c', 'Ç': 'c'
        };

        const normalize = (text: string) => {
            let n = text.toLowerCase();
            Object.keys(turkishToEnglish).forEach(t => {
                n = n.replace(new RegExp(t, 'g'), turkishToEnglish[t]);
            });
            return n;
        };

        const searchCity = normalize(normalizedInput);

        // Önce tam eşleşme (normalize edilmiş)
        if (cities[searchCity]) return cities[searchCity];

        // Eşleşme bulunamazsa kelime bazlı ara
        const foundKey = Object.keys(cities).find(key => searchCity.includes(key) || key.includes(searchCity));

        return foundKey ? cities[foundKey] : null;
    }
}