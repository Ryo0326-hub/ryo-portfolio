import sharp from 'sharp';

async function generateAsciiBackground() {
  console.log('Loading /tmp/joshua-kantarges.png...');
  const img = sharp('/tmp/joshua-kantarges.png');
  
  // Grid dimensions matching background2.png
  const cols = 126;
  const rows = 58;
  const outW = 1920;
  const outH = 1080;
  
  const charW = outW / cols;
  const charH = outH / rows;

  const { data, info } = await img.resize(cols, rows).grayscale().raw().toBuffer({ resolveWithObject: true });
  
  // Custom ASCII ramp tuned to basketball court photo
  // ' .:-=+*#%@'
  const ramp = ' .:-=+*#%@';

  const textNodes: string[] = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const val = data[r * cols + c];
      
      // Values under 14 are pure dark background space
      if (val < 14) continue;

      const norm = (val - 14) / (255 - 14);
      const charIndex = Math.min(ramp.length - 1, Math.max(1, Math.floor(norm * (ramp.length - 1)) + 1));
      let char = ramp[charIndex];
      
      // Escape xml entities
      if (char === '<') char = '&lt;';
      else if (char === '>') char = '&gt;';
      else if (char === '&') char = '&amp;';

      const x = (c * charW + charW / 2).toFixed(1);
      const y = (r * charH + charH * 0.78).toFixed(1);

      // Color mapping matching background2.png luminous ice-cyan
      let color = '#7dd3fc';
      let opacity = '0.9';
      let weight = 'normal';

      if (val > 100) {
        color = '#ffffff';
        opacity = '1.0';
        weight = 'bold';
      } else if (val > 65) {
        color = '#bae6fd';
        opacity = '0.95';
      } else if (val > 35) {
        color = '#7dd3fc';
        opacity = '0.85';
      } else {
        color = '#38bdf8';
        opacity = '0.65';
      }

      textNodes.push(
        `<text x="${x}" y="${y}" fill="${color}" opacity="${opacity}" font-weight="${weight}">${char}</text>`
      );
    }
  }

  const svg = `<svg width="${outW}" height="${outH}" xmlns="http://www.w3.org/2000/svg" style="background:#050913; font-family: 'Liberation Mono', 'Courier New', monospace; font-size: 13.5px; text-anchor: middle;">
    <rect width="${outW}" height="${outH}" fill="#050913"/>
    ${textNodes.join('')}
  </svg>`;

  console.log(`Rendering SVG with ${textNodes.length} characters to public/background2.png...`);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 8 }).toFile('public/background2.png');
  // Also copy to public/background1.png so both paths work
  await sharp(Buffer.from(svg)).png({ compressionLevel: 8 }).toFile('public/background1.png');
  console.log('Background generated successfully!');
}

generateAsciiBackground().catch(err => {
  console.error(err);
  process.exit(1);
});
