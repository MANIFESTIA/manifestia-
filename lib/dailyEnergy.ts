export interface DailyEnergyPalette {
    name: string;
    element: string;
    primary: string;
    secondary: string;
    glowColor: string;
}

const DAILY_PALETTES: DailyEnergyPalette[] = [
    // Sunday (0)
    { name: 'Barış Işığı', element: 'Su', primary: '#22D3EE', secondary: '#06B6D4', glowColor: 'rgba(34, 211, 238, 0.6)' },
    // Monday (1)
    { name: 'Zihin Işığı', element: 'Hava', primary: '#818CF8', secondary: '#6366F1', glowColor: 'rgba(129, 140, 248, 0.6)' },
    // Tuesday (2)
    { name: 'Cesaret Işığı', element: 'Ateş', primary: '#FB923C', secondary: '#F97316', glowColor: 'rgba(251, 146, 60, 0.6)' },
    // Wednesday (3)
    { name: 'Büyüme Işığı', element: 'Toprak', primary: '#34D399', secondary: '#10B981', glowColor: 'rgba(52, 211, 153, 0.6)' },
    // Thursday (4)
    { name: 'Bilgelik Işığı', element: 'Esin', primary: '#C084FC', secondary: '#A855F7', glowColor: 'rgba(192, 132, 252, 0.6)' },
    // Friday (5)
    { name: 'Sevgi Işığı', element: 'Kalp', primary: '#FB7185', secondary: '#F43F5E', glowColor: 'rgba(251, 113, 133, 0.6)' },
    // Saturday (6)
    { name: 'Bolluk Işığı', element: 'Altın', primary: '#FACC15', secondary: '#EAB308', glowColor: 'rgba(250, 204, 21, 0.6)' },
];

export function getDailyEnergy(): DailyEnergyPalette {
    const dayOfWeek = new Date().getDay();
    return DAILY_PALETTES[dayOfWeek];
}
