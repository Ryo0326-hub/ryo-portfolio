import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Generate background4-desk.png (1920x1080) and background4-mob.png (1080x1920)
// matching the user's clean ASCII / dotted basketball court blueprints.

const BG_COLOR = '#060f19';
const DOT_COLOR = '#c2dae8';

function createDottedLine(x1: number, y1: number, x2: number, y2: number, step: number = 14): string {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const steps = Math.max(1, Math.round(dist / step));
  const dots: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = (x1 + dx * t).toFixed(1);
    const y = (y1 + dy * t).toFixed(1);
    dots.push(`<circle cx="${x}" cy="${y}" r="1.3" fill="${DOT_COLOR}" />`);
  }
  return dots.join('\n');
}

function createDottedArc(
  cx: number,
  cy: number,
  r: number,
  startAngleDeg: number,
  endAngleDeg: number,
  stepDeg: number = 4
): string {
  const dots: string[] = [];
  let a1 = startAngleDeg;
  let a2 = endAngleDeg;
  if (a2 < a1) a2 += 360;
  for (let a = a1; a <= a2; a += stepDeg) {
    const rad = (a * Math.PI) / 180;
    const x = (cx + r * Math.cos(rad)).toFixed(1);
    const y = (cy + r * Math.sin(rad)).toFixed(1);
    dots.push(`<circle cx="${x}" cy="${y}" r="1.3" fill="${DOT_COLOR}" />`);
  }
  return dots.join('\n');
}

function generateDesktopSvg(): string {
  const W = 1920;
  const H = 1080;

  // Outer court boundaries (court length: 94ft, width: 50ft)
  // Scale factor: court width 760px -> 50ft => 15.2 px/ft
  // Court length: 94 * 15.2 = 1428.8px
  const courtW = 1440;
  const courtH = 766;
  const left = (W - courtW) / 2; // 240
  const top = (H - courtH) / 2;  // 157
  const right = left + courtW;   // 1680
  const bottom = top + courtH;   // 923
  const midX = W / 2;            // 960
  const midY = H / 2;            // 540

  const elements: string[] = [];

  // 1. Perimeter border (outer boundary)
  elements.push(createDottedLine(left, top, right, top));
  elements.push(createDottedLine(right, top, right, bottom));
  elements.push(createDottedLine(right, bottom, left, bottom));
  elements.push(createDottedLine(left, bottom, left, top));

  // Inner sideline buffer markers (the double edge line shown in the diagram)
  const buffer = 20;
  elements.push(createDottedLine(left + buffer, top + buffer, right - buffer, top + buffer));
  elements.push(createDottedLine(right - buffer, top + buffer, right - buffer, bottom - buffer));
  elements.push(createDottedLine(right - buffer, bottom - buffer, left + buffer, bottom - buffer));
  elements.push(createDottedLine(left + buffer, bottom - buffer, left + buffer, top + buffer));

  // 2. Center dividing line (half court)
  elements.push(createDottedLine(midX, top + buffer, midX, bottom - buffer));

  // 3. Center circle (radius ~90px, 6ft radius)
  elements.push(createDottedArc(midX, midY, 90, 0, 360, 4));

  // 4. Left Key (Paint area): length 290px (~19ft), width 244px (~16ft)
  const keyLen = 290;
  const keyHalfW = 122;
  const keyTop = midY - keyHalfW;
  const keyBottom = midY + keyHalfW;
  const keyRight = left + buffer + keyLen;

  elements.push(createDottedLine(left + buffer, keyTop, keyRight, keyTop));
  elements.push(createDottedLine(keyRight, keyTop, keyRight, keyBottom));
  elements.push(createDottedLine(keyRight, keyBottom, left + buffer, keyBottom));

  // Left Free-throw circle at keyRight, radius 90px
  elements.push(createDottedArc(keyRight, midY, 90, -90, 90, 5));
  elements.push(createDottedArc(keyRight, midY, 90, 90, 270, 7)); // dashed/spaced inner half

  // Left Three-point line: straight corners + arc
  // Radius ~ 360px (~23.75ft)
  const threeR = 360;
  // Corner lines from baseline (length ~210px)
  const cornerYOffset = 310;
  elements.push(createDottedLine(left + buffer, midY - cornerYOffset, left + buffer + 160, midY - cornerYOffset));
  elements.push(createDottedLine(left + buffer, midY + cornerYOffset, left + buffer + 160, midY + cornerYOffset));
  // Arc connecting corners: angle from -60 deg to 60 deg
  elements.push(createDottedArc(left + buffer + 60, midY, threeR, -60, 60, 3.5));

  // Left Basket & Backboard
  // Backboard: 4ft (~60px) from baseline, length 80px
  const bbX = left + buffer + 60;
  elements.push(createDottedLine(bbX, midY - 40, bbX, midY + 40));
  // Rim / hoop: radius 15px at (bbX + 24, midY)
  elements.push(createDottedArc(bbX + 24, midY, 16, 0, 360, 15));
  // Restricted area arc: radius 60px from hoop
  elements.push(createDottedArc(bbX + 24, midY, 60, -90, 90, 8));

  // 5. Right Key (Paint area): mirror of left
  const rKeyLeft = right - buffer - keyLen;
  elements.push(createDottedLine(right - buffer, keyTop, rKeyLeft, keyTop));
  elements.push(createDottedLine(rKeyLeft, keyTop, rKeyLeft, keyBottom));
  elements.push(createDottedLine(rKeyLeft, keyBottom, right - buffer, keyBottom));

  // Right Free-throw circle at rKeyLeft, radius 90px
  elements.push(createDottedArc(rKeyLeft, midY, 90, 90, 270, 5));
  elements.push(createDottedArc(rKeyLeft, midY, 90, -90, 90, 7)); // dashed/spaced inner half

  // Right Three-point line: straight corners + arc
  elements.push(createDottedLine(right - buffer, midY - cornerYOffset, right - buffer - 160, midY - cornerYOffset));
  elements.push(createDottedLine(right - buffer, midY + cornerYOffset, right - buffer - 160, midY + cornerYOffset));
  elements.push(createDottedArc(right - buffer - 60, midY, threeR, 120, 240, 3.5));

  // Right Basket & Backboard
  const rBbX = right - buffer - 60;
  elements.push(createDottedLine(rBbX, midY - 40, rBbX, midY + 40));
  elements.push(createDottedArc(rBbX - 24, midY, 16, 0, 360, 15));
  elements.push(createDottedArc(rBbX - 24, midY, 60, 90, 270, 8));

  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${H}" fill="${BG_COLOR}" />
    ${elements.join('\n')}
  </svg>`;
}

function generateMobileSvg(): string {
  const W = 1080;
  const H = 1920;

  // Court width: 680px, Court length: 1280px
  const courtW = 680;
  const courtH = 1280;
  const left = (W - courtW) / 2; // 200
  const right = left + courtW;   // 880
  const top = (H - courtH) / 2;  // 320
  const bottom = top + courtH;   // 1600
  const midX = W / 2;            // 540
  const midY = H / 2;            // 960

  const elements: string[] = [];

  // Outer boundary
  elements.push(createDottedLine(left, top, right, top));
  elements.push(createDottedLine(right, top, right, bottom));
  elements.push(createDottedLine(right, bottom, left, bottom));
  elements.push(createDottedLine(left, bottom, left, top));

  // Inner buffer line
  const buffer = 18;
  elements.push(createDottedLine(left + buffer, top + buffer, right - buffer, top + buffer));
  elements.push(createDottedLine(right - buffer, top + buffer, right - buffer, bottom - buffer));
  elements.push(createDottedLine(right - buffer, bottom - buffer, left + buffer, bottom - buffer));
  elements.push(createDottedLine(left + buffer, bottom - buffer, left + buffer, top + buffer));

  // Half-court line (horizontal)
  elements.push(createDottedLine(left + buffer, midY, right - buffer, midY));

  // Center circle
  elements.push(createDottedArc(midX, midY, 82, 0, 360, 4.5));

  // Top Key (Paint): length ~260px, width ~216px
  const keyLen = 260;
  const keyHalfW = 108;
  const keyLeft = midX - keyHalfW;
  const keyRight = midX + keyHalfW;
  const keyBottom = top + buffer + keyLen;

  elements.push(createDottedLine(keyLeft, top + buffer, keyLeft, keyBottom));
  elements.push(createDottedLine(keyLeft, keyBottom, keyRight, keyBottom));
  elements.push(createDottedLine(keyRight, keyBottom, keyRight, top + buffer));

  // Top Free-throw circle at keyBottom
  elements.push(createDottedArc(midX, keyBottom, 82, 0, 180, 5));
  elements.push(createDottedArc(midX, keyBottom, 82, 180, 360, 7)); // dashed top half

  // Top Three-point line: corners + arc
  const threeR = 320;
  const cornerXOffset = 275;
  elements.push(createDottedLine(midX - cornerXOffset, top + buffer, midX - cornerXOffset, top + buffer + 140));
  elements.push(createDottedLine(midX + cornerXOffset, top + buffer, midX + cornerXOffset, top + buffer + 140));
  elements.push(createDottedArc(midX, top + buffer + 54, threeR, 30, 150, 3.5));

  // Top Basket & Backboard
  const bbY = top + buffer + 54;
  elements.push(createDottedLine(midX - 36, bbY, midX + 36, bbY));
  elements.push(createDottedArc(midX, bbY + 22, 15, 0, 360, 15));
  elements.push(createDottedArc(midX, bbY + 22, 54, 0, 180, 8));

  // Bottom Key (Paint)
  const bKeyTop = bottom - buffer - keyLen;
  elements.push(createDottedLine(keyLeft, bottom - buffer, keyLeft, bKeyTop));
  elements.push(createDottedLine(keyLeft, bKeyTop, keyRight, bKeyTop));
  elements.push(createDottedLine(keyRight, bKeyTop, keyRight, bottom - buffer));

  // Bottom Free-throw circle at bKeyTop
  elements.push(createDottedArc(midX, bKeyTop, 82, 180, 360, 5));
  elements.push(createDottedArc(midX, bKeyTop, 82, 0, 180, 7));

  // Bottom Three-point line
  elements.push(createDottedLine(midX - cornerXOffset, bottom - buffer, midX - cornerXOffset, bottom - buffer - 140));
  elements.push(createDottedLine(midX + cornerXOffset, bottom - buffer, midX + cornerXOffset, bottom - buffer - 140));
  elements.push(createDottedArc(midX, bottom - buffer - 54, threeR, 210, 330, 3.5));

  // Bottom Basket & Backboard
  const bBbY = bottom - buffer - 54;
  elements.push(createDottedLine(midX - 36, bBbY, midX + 36, bBbY));
  elements.push(createDottedArc(midX, bBbY - 22, 15, 0, 360, 15));
  elements.push(createDottedArc(midX, bBbY - 22, 54, 180, 360, 8));

  return `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${W}" height="${H}" fill="${BG_COLOR}" />
    ${elements.join('\n')}
  </svg>`;
}

async function run() {
  const publicDir = path.resolve(process.cwd(), 'public');
  const distDir = path.resolve(process.cwd(), 'dist');

  console.log('Generating desktop blueprint SVG...');
  const deskSvg = generateDesktopSvg();
  const deskPng = await sharp(Buffer.from(deskSvg)).png().toBuffer();

  console.log('Generating mobile blueprint SVG...');
  const mobSvg = generateMobileSvg();
  const mobPng = await sharp(Buffer.from(mobSvg)).png().toBuffer();

  const files = [
    { name: 'background4-desk.png', buffer: deskPng },
    { name: 'background4-mob.png', buffer: mobPng },
    // Also save as background-desktop.png and background-mobile.png
    { name: 'background-desk.png', buffer: deskPng },
    { name: 'background-mob.png', buffer: mobPng },
  ];

  for (const f of files) {
    fs.writeFileSync(path.join(publicDir, f.name), f.buffer);
    if (fs.existsSync(distDir)) {
      fs.writeFileSync(path.join(distDir, f.name), f.buffer);
    }
  }

  console.log('Done! Generated background4-desk.png and background4-mob.png in public and dist');
}

run().catch(console.error);
