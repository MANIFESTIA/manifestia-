const fs = require('fs');
const { PNG } = require('pngjs');

try {
    console.log('Reading file...');
    const buffer = fs.readFileSync('public/manifest-logo.png');
    const png = PNG.sync.read(buffer);

    console.log('Processing pixels...');
    for (let y = 0; y < png.height; y++) {
        for (let x = 0; x < png.width; x++) {
            const idx = (png.width * y + x) << 2;
            const r = png.data[idx];
            const g = png.data[idx + 1];
            const b = png.data[idx + 2];

            // Aggressive black removal: anything very dark becomes transparent
            if (r < 40 && g < 40 && b < 40) {
                png.data[idx + 3] = 0;
            }
        }
    }

    console.log('Writing file...');
    const bufferOut = PNG.sync.write(png);
    fs.writeFileSync('public/manifest-logo-transparent.png', bufferOut);
    console.log('Success: created manifest-logo-transparent.png');
} catch (error) {
    console.error('Error:', error);
    process.exit(1);
}
