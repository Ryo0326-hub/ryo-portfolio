import sharp from 'sharp';
import fs from 'fs';

// Generate ASCII art background that faithfully reproduces the basketball court ASCII art
// with center circle, inner ring, diagonal slash, shadow columns, corner arcs, and cyan glow.

async function run() {
  const outW = 1920;
  const outH = 1080;
  const cols = 108;
  const rows = 50;

  const charW = outW / cols;
  const charH = outH / rows;

  // Load the original basketball court photo
  const photo = sharp('/tmp/joshua-kantarges.png');
  // Resize to cols x rows
  const { data: rawData, info } = await photo
    .resize(cols, rows, { fit: 'fill' })
    .grayscale()
    .raw()
    .toBuffer({ resolveWithObject: true });

  // Simple gradient / edge detection on rawData
  const edgeData = new Uint8Array(cols * rows);
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const idx = r * cols + c;
      const v = rawData[idx];
      const right = c < cols - 1 ? rawData[idx + 1] : v;
      const down = r < rows - 1 ? rawData[idx + cols] : v;
      const gx = Math.abs(right - v);
      const gy = Math.abs(down - v);
      edgeData[idx] = Math.min(255, (gx + gy) * 2);
    }
  }

  const grid: { char: string; color: string; opacity: number; weight: string }[][] = [];

  for (let r = 0; r < rows; r++) {
    grid[r] = [];
    for (let c = 0; c < cols; c++) {
      grid[r][c] = { char: ' ', color: '#38bdf8', opacity: 0, weight: 'normal' };
    }
  }

  // Normalized coordinates: x in [0, 1], y in [0, 1]
  const centerX = 0.48;
  const centerY = 0.50;

  // Center circle radii (in aspect-corrected units)
  // Aspect ratio is 16:9 ~ 1.777
  const aspect = outW / outH;

  for (let r = 0; r < rows; r++) {
    const ny = r / (rows - 1);
    for (let c = 0; c < cols; c++) {
      const nx = c / (cols - 1);
      const val = rawData[r * cols + c];
      const edge = edgeData[r * cols + c];

      // Elliptical distance to center to match circle in monospace aspect
      const dx = (nx - centerX) * aspect;
      const dy = ny - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Court Geometry:
      // 1. Center Circle (outer ring): dist around 0.32
      const isOuterRing = Math.abs(dist - 0.32) < 0.018;
      
      // 2. Inner Circle: dist around 0.11
      const isInnerRing = Math.abs(dist - 0.11) < 0.015;

      // 3. Center point / bullseye: dist < 0.04
      const isCenterDot = dist < 0.035;

      // 4. Center dividing line / diagonal slash: from bottom-left to top-right
      // Line equation: roughly dy - 0.65 * dx = 0
      const diagDist = Math.abs(dy - 0.72 * dx);
      const isDiagLine = diagDist < 0.014 && (dist < 0.55 || (nx > 0.55 && ny < 0.45) || (nx < 0.40 && ny > 0.55));

      // 5. Corner arcs:
      // Top-right corner arc (three-point line): centered at (0.95, -0.05), radius ~0.35
      const trDist = Math.sqrt(Math.pow((nx - 0.96) * aspect, 2) + Math.pow(ny - 0.02, 2));
      const isTrArc = Math.abs(trDist - 0.40) < 0.016 && nx > 0.65 && ny < 0.35;

      // Bottom-right corner arc: centered at (0.85, 1.05), radius ~0.45
      const brDist = Math.sqrt(Math.pow((nx - 0.82) * aspect, 2) + Math.pow(ny - 0.98, 2));
      const isBrArc = Math.abs(brDist - 0.42) < 0.018 && nx > 0.58 && ny > 0.65;

      // Top-left arc / lines:
      const tlDist = Math.sqrt(Math.pow((nx - 0.05) * aspect, 2) + Math.pow(ny - 0.05, 2));
      const isTlArc = Math.abs(tlDist - 0.32) < 0.016 && nx < 0.35 && ny < 0.30;

      // Bottom-left diagonal line / arc:
      const blDist = Math.sqrt(Math.pow((nx - 0.02) * aspect, 2) + Math.pow(ny - 0.98, 2));
      const isBlArc = Math.abs(blDist - 0.28) < 0.016 && nx < 0.30 && ny > 0.70;

      // 6. Horizontal hash marks / lane lines
      const isLaneLineL = (r === 20 || r === 21) && nx > 0.01 && nx < 0.22;
      const isLaneLineR = (r === 29 || r === 30) && nx > 0.78 && nx < 0.99;

      // 7. Vertical shadow columns (the wood court planks & cast shadows from windows)
      // These appear at specific column ranges:
      // Col bands: ~0.08, ~0.16, ~0.24, ~0.33, ~0.42, ~0.52, ~0.60, ~0.72-0.80 (heavy shadow)
      const inShadowPlank = 
        (nx >= 0.06 && nx <= 0.12) ||
        (nx >= 0.18 && nx <= 0.23) ||
        (nx >= 0.31 && nx <= 0.36) ||
        (nx >= 0.44 && nx <= 0.48) ||
        (nx >= 0.54 && nx <= 0.59) ||
        (nx >= 0.69 && nx <= 0.82) || // Heavy right shadow
        (nx >= 0.88 && nx <= 0.93);

      // Character selection matching background2.png:
      let char = ' ';
      let color = '#38bdf8';
      let opacity = 0;
      let weight = 'normal';

      if (isOuterRing) {
        // Outer center circle: made of *, +, =, :, -, #
        const angle = Math.atan2(dy, dx);
        const chars = ['*', '+', '=', ':', '-', '+', '*', '=', '#'];
        char = chars[Math.abs(Math.floor(angle * 4)) % chars.length];
        color = '#ffffff';
        opacity = 1.0;
        weight = 'bold';
      } else if (isInnerRing) {
        // Inner circle: made of +, =, -, :
        const angle = Math.atan2(dy, dx);
        const chars = ['+', '=', '=', '-', ':', '+', '='];
        char = chars[Math.abs(Math.floor(angle * 3)) % chars.length];
        color = '#e0f2fe';
        opacity = 0.95;
        weight = 'bold';
      } else if (isCenterDot) {
        char = (r % 2 === 0) ? '+' : ':';
        color = '#bae6fd';
        opacity = 0.9;
        weight = 'bold';
      } else if (isDiagLine) {
        // Diagonal slash through court
        char = (c % 3 === 0) ? '+' : (c % 3 === 1 ? '-' : '=');
        color = '#ffffff';
        opacity = 1.0;
        weight = 'bold';
      } else if (isTrArc || isBrArc || isTlArc || isBlArc || isLaneLineL || isLaneLineR) {
        // Court markings / corner arcs
        if (isTrArc) char = (r % 2 === 0) ? '\\' : '-';
        else if (isBlArc) char = (r % 2 === 0) ? '\\' : '=';
        else if (isBrArc) char = (c % 2 === 0) ? '*' : '=';
        else if (isTlArc) char = (r % 2 === 0) ? '|' : '-';
        else char = '=';
        color = '#e0f2fe';
        opacity = 0.95;
        weight = 'bold';
      } else if (edge > 45 || val > 115) {
        // Edge/bright features from the real photo
        char = val > 140 ? '#' : (val > 100 ? '*' : '+');
        color = '#ffffff';
        opacity = 0.95;
        weight = 'bold';
      } else if (inShadowPlank) {
        // Inside shadow columns:
        // The heavy right shadow (nx between 0.69 and 0.82) has dense +, -, =, :, |
        if (nx >= 0.69 && nx <= 0.82) {
          const chars = [':', '+', '-', '=', '|', '+', '-'];
          char = chars[(r * 3 + c) % chars.length];
          color = '#7dd3fc';
          opacity = 0.85;
        } else {
          // Other plank columns: vertical pipes | and colons : and dots .
          const chars = ['|', ':', '.', ':', '|', ':'];
          char = chars[(r + c) % chars.length];
          color = '#38bdf8';
          opacity = 0.75;
        }
      } else if (val > 30) {
        // Semi-lit floor between planks: sparse colons and dots
        if ((r + c) % 2 === 0) {
          char = val > 60 ? ':' : '.';
          color = '#38bdf8';
          opacity = 0.55;
        }
      } else if (val > 12) {
        // Dark floor: subtle dots
        if ((r + c) % 3 === 0) {
          char = '.';
          color = '#0284c7';
          opacity = 0.40;
        }
      }

      grid[r][c] = { char, color, opacity, weight };
    }
  }

  // Render SVG
  const textNodes: string[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = grid[r][c];
      if (cell.char === ' ' || cell.opacity === 0) continue;

      let escapedChar = cell.char;
      if (escapedChar === '<') escapedChar = '&lt;';
      else if (escapedChar === '>') escapedChar = '&gt;';
      else if (escapedChar === '&') escapedChar = '&amp;';

      const x = (c * charW + charW / 2).toFixed(1);
      const y = (r * charH + charH * 0.78).toFixed(1);

      textNodes.push(
        `<text x="${x}" y="${y}" fill="${cell.color}" opacity="${cell.opacity}" font-weight="${cell.weight}">${escapedChar}</text>`
      );
    }
  }

  const svg = `<svg width="${outW}" height="${outH}" xmlns="http://www.w3.org/2000/svg" style="background:#030712; font-family: 'Liberation Mono', 'Courier New', monospace; font-size: 17px; text-anchor: middle;">
    <rect width="${outW}" height="${outH}" fill="#030712"/>
    ${textNodes.join('')}
  </svg>`;

  console.log(`Writing ${textNodes.length} characters to public/background2.png & background1.png...`);
  await sharp(Buffer.from(svg)).png({ compressionLevel: 7 }).toFile('public/background2.png');
  await sharp(Buffer.from(svg)).png({ compressionLevel: 7 }).toFile('public/background1.png');
  console.log('Done!');
}

run().catch(console.error);
