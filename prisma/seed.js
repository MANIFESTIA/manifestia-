const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const products = [
        {
            code: "citrine_necklace",
            name: "Kozmik Sitrin Kolye",
            description: "Bolluk ve bereket enerjisini üzerine çek. Saf doğal taş.",
            priceTL: 750,
            priceDiamonds: 600,
            image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=600",
            category: "Bolluk"
        },
        {
            code: "amethyst_bracelet",
            name: "Ametist Koruma Bilekliği",
            description: "Negatif enerjilere karşı kalkan oluştur.",
            priceTL: 450,
            priceDiamonds: 350,
            image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80&w=600",
            category: "Korunma"
        },
        {
            code: "chakra_set",
            name: "7 Çakra Uyumlama Seti",
            description: "Tüm enerji merkezlerini dengele. Tam set.",
            priceTL: 1200,
            priceDiamonds: 950,
            image: "https://images.unsplash.com/photo-1603561596112-0a132b757442?auto=format&fit=crop&q=80&w=600",
            category: "Denge"
        },
        {
            code: "rose_quartz",
            name: "Pembe Kuvars Aşk Taşı",
            description: "Sevgi frekansını yükselt ve kalbi şifalandır.",
            priceTL: 300,
            priceDiamonds: 1500,
            image: "https://images.unsplash.com/photo-1596919248430-1c64ebc6e8e8?auto=format&fit=crop&q=80&w=600",
            category: "Aşk",
            isDigital: false
        }
    ];

    for (const p of products) {
        const upsert = await prisma.product.upsert({
            where: { code: p.code },
            update: p,
            create: p,
        });
        console.log(`Upserted: ${upsert.name}`);
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
