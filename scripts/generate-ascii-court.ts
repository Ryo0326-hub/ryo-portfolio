import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Generate true ASCII art basketball court backgrounds:
// bg5-desk.png (1920x1080) and bg5-mob.png (1080x1920)
// matching the user's uploaded ASCII art courts.

const BG_COLOR = '#060f19';
const TEXT_COLOR = '#c2dae8'; // soft blueprint cyan
const ACCENT_COLOR = '#38bdf8'; // brighter court line cyan

interface AsciiGrid {
  cols: number;
  rows: number;
  cells: string[][];
}

function createGrid(cols: number, rows: number): AsciiGrid {
  const cells: string[][] = [];
  for (let r = 0; r < rows; r++) {
    cells[r] = new Array(cols).fill(' ');
  }
  return { cols, rows, cells };
}

function setChar(grid: AsciiGrid, r: number, c: number, char: string) {
  if (r >= 0 && r < grid.rows && c >= 0 && c < grid.cols) {
    grid.cells[r][c] = char;
  }
}

function drawHLine(grid: AsciiGrid, r: number, c1: number, c2: number, char: string = '-') {
  const start = Math.min(c1, c2);
  const end = Math.max(c1, c2);
  for (let c = start; c <= end; c++) {
    setChar(grid, r, c, char);
  }
}

function drawVLine(grid: AsciiGrid, c: number, r1: number, r2: number, char: string = '|') {
  const start = Math.min(r1, r2);
  const end = Math.max(r1, r2);
  for (let r = start; r <= end; r++) {
    setChar(grid, r, c, char);
  }
}

function drawEllipse(
  grid: AsciiGrid,
  centerR: number,
  centerC: number,
  radiusR: number,
  radiusC: number,
  startAngleDeg: number = 0,
  endAngleDeg: number = 360,
  stepDeg: number = 2
) {
  let a1 = startAngleDeg;
  let a2 = endAngleDeg;
  if (a2 < a1) a2 += 360;

  for (let a = a1; a <= a2; a += stepDeg) {
    const rad = (a * Math.PI) / 180;
    const r = Math.round(centerR + radiusR * Math.sin(rad));
    const c = Math.round(centerC + radiusC * Math.cos(rad));
    
    // Choose character based on tangent angle
    let ch = '*';
    const normAngle = ((a % 360) + 360) % 360;
    if ((normAngle >= 70 && normAngle <= 110) || (normAngle >= 250 && normAngle <= 290)) {
      ch = '-';
    } else if ((normAngle >= 340 || normAngle <= 20) || (normAngle >= 160 && normAngle <= 200)) {
      ch = '|';
    } else if ((normAngle > 20 && normAngle < 70) || (normAngle > 200 && normAngle < 250)) {
      ch = '/';
    } else {
      ch = '\\';
    }
    setChar(grid, r, c, ch);
  }
}

function generateDesktopGrid(): AsciiGrid {
  const cols = 120;
  const rows = 52;
  const grid = createGrid(cols, rows);

  // Margins
  const left = 7;
  const right = cols - 8; // 112
  const top = 4;
  const bottom = rows - 5; // 47

  const midR = Math.floor((top + bottom) / 2); // 25
  const midC = Math.floor((left + right) / 2); // 59

  // 1. Outer perimeter
  drawHLine(grid, top, left, right, '-');
  drawHLine(grid, bottom, left, right, '-');
  drawVLine(grid, left, top, bottom, '|');
  drawVLine(grid, right, top, bottom, '|');
  setChar(grid, top, left, '+');
  setChar(grid, top, right, '+');
  setChar(grid, bottom, left, '+');
  setChar(grid, bottom, right, '+');

  // Inner buffer line
  const buf = 1;
  drawHLine(grid, top + buf, left + buf * 2, right - buf * 2, '.');
  drawHLine(grid, bottom - buf, left + buf * 2, right - buf * 2, '.');
  drawVLine(grid, left + buf * 2, top + buf, bottom - buf, ':');
  drawVLine(grid, right - buf * 2, top + buf, bottom - buf, ':');

  // 2. Center court line
  drawVLine(grid, midC, top + buf, bottom - buf, '|');

  // 3. Center circle (aspect ratio in char cell is ~ 0.8 width/height, so radiusC ~ radiusR * 1.5)
  drawEllipse(grid, midR, midC, 7, 11, 0, 360, 3);
  drawEllipse(grid, midR, midC, 2, 3, 0, 360, 10);
  setChar(grid, midR, midC, 'o');

  // 4. Left Key (Paint area)
  const keyLen = 22; // columns
  const keyHalfH = 8; // rows
  const keyTop = midR - keyHalfH;
  const keyBottom = midR + keyHalfH;
  const keyRight = left + keyLen;

  drawHLine(grid, keyTop, left + buf * 2, keyRight, '-');
  drawHLine(grid, keyBottom, left + buf * 2, keyRight, '-');
  drawVLine(grid, keyRight, keyTop, keyBottom, '|');
  setChar(grid, keyTop, keyRight, '+');
  setChar(grid, keyBottom, keyRight, '+');

  // Left Free-throw circle at keyRight (outer solid half, inner dashed half)
  drawEllipse(grid, midR, keyRight, keyHalfH, 9, -90, 90, 4);
  // Dashed back half
  for (let a = 90; a <= 270; a += 15) {
    const rad = (a * Math.PI) / 180;
    const r = Math.round(midR + keyHalfH * Math.sin(rad));
    const c = Math.round(keyRight + 9 * Math.cos(rad));
    setChar(grid, r, c, '.');
  }

  // Left Free-throw lane hash marks
  for (let offset of [5, 10, 15]) {
    setChar(grid, keyTop - 1, left + offset, '|');
    setChar(grid, keyBottom + 1, left + offset, '|');
  }

  // Left Basket & Backboard
  const bbC = left + 4;
  drawVLine(grid, bbC, midR - 3, midR + 3, '|');
  setChar(grid, midR - 3, bbC, '=');
  setChar(grid, midR + 3, bbC, '=');
  // Rim
  setChar(grid, midR, bbC + 2, 'O');
  drawHLine(grid, midR, bbC, bbC + 1, '-');
  // Restricted area arc
  drawEllipse(grid, midR, bbC + 2, 3, 4, -90, 90, 15);

  // Left Three-Point Line
  const cornerRDist = 18;
  const threeStraightLen = 14;
  drawHLine(grid, midR - cornerRDist, left + buf * 2, left + threeStraightLen, '-');
  drawHLine(grid, midR + cornerRDist, left + buf * 2, left + threeStraightLen, '-');
  drawEllipse(grid, midR, bbC + 2, cornerRDist, 26, -65, 65, 3);

  // 5. Right Key (Paint area - mirror of left)
  const rKeyLeft = right - keyLen;
  drawHLine(grid, keyTop, rKeyLeft, right - buf * 2, '-');
  drawHLine(grid, keyBottom, rKeyLeft, right - buf * 2, '-');
  drawVLine(grid, rKeyLeft, keyTop, keyBottom, '|');
  setChar(grid, keyTop, rKeyLeft, '+');
  setChar(grid, keyBottom, rKeyLeft, '+');

  // Right Free-throw circle at rKeyLeft
  drawEllipse(grid, midR, rKeyLeft, keyHalfH, 9, 90, 270, 4);
  // Dashed back half
  for (let a = -90; a <= 90; a += 15) {
    const rad = (a * Math.PI) / 180;
    const r = Math.round(midR + keyHalfH * Math.sin(rad));
    const c = Math.round(rKeyLeft + 9 * Math.cos(rad));
    setChar(grid, r, c, '.');
  }

  // Right Free-throw lane hash marks
  for (let offset of [5, 10, 15]) {
    setChar(grid, keyTop - 1, right - offset, '|');
    setChar(grid, keyBottom + 1, right - offset, '|');
  }

  // Right Basket & Backboard
  const rBbC = right - 4;
  drawVLine(grid, rBbC, midR - 3, midR + 3, '|');
  setChar(grid, midR - 3, rBbC, '=');
  setChar(grid, midR + 3, rBbC, '=');
  // Rim
  setChar(grid, midR, rBbC - 2, 'O');
  drawHLine(grid, midR, rBbC - 1, rBbC, '-');
  // Restricted area arc
  drawEllipse(grid, midR, rBbC - 2, 3, 4, 90, 270, 15);

  // Right Three-Point Line
  drawHLine(grid, midR - cornerRDist, right - threeStraightLen, right - buf * 2, '-');
  drawHLine(grid, midR + cornerRDist, right - threeStraightLen, right - buf * 2, '-');
  drawEllipse(grid, midR, rBbC - 2, cornerRDist, 26, 115, 245, 3);

  return grid;
}

function generateMobileGrid(): AsciiGrid {
  const cols = 56;
  const rows = 96;
  const grid = createGrid(cols, rows);

  // Margins
  const left = 3;
  const right = cols - 4; // 52
  const top = 5;
  const bottom = rows - 6; // 90

  const midR = Math.floor((top + bottom) / 2); // 47
  const midC = Math.floor((left + right) / 2); // 27

  // 1. Outer perimeter
  drawHLine(grid, top, left, right, '-');
  drawHLine(grid, bottom, left, right, '-');
  drawVLine(grid, left, top, bottom, '|');
  drawVLine(grid, right, top, bottom, '|');
  setChar(grid, top, left, '+');
  setChar(grid, top, right, '+');
  setChar(grid, bottom, left, '+');
  setChar(grid, bottom, right, '+');

  // Inner buffer line
  const buf = 1;
  drawHLine(grid, top + buf, left + buf, right - buf, '.');
  drawHLine(grid, bottom - buf, left + buf, right - buf, '.');
  drawVLine(grid, left + buf, top + buf, bottom - buf, ':');
  drawVLine(grid, right - buf, top + buf, bottom - buf, ':');

  // 2. Midcourt line (horizontal)
  drawHLine(grid, midR, left + buf, right - buf, '-');

  // 3. Center circle
  drawEllipse(grid, midR, midC, 6, 9, 0, 360, 4);
  setChar(grid, midR, midC, 'o');

  // 4. Top Key (Paint area)
  const keyLenR = 19; // rows
  const keyHalfC = 8; // cols
  const keyLeft = midC - keyHalfC;
  const keyRight = midC + keyHalfC;
  const keyBottom = top + keyLenR;

  drawVLine(grid, keyLeft, top + buf, keyBottom, '|');
  drawVLine(grid, keyRight, top + buf, keyBottom, '|');
  drawHLine(grid, keyBottom, keyLeft, keyRight, '-');
  setChar(grid, keyBottom, keyLeft, '+');
  setChar(grid, keyBottom, keyRight, '+');

  // Top Free-throw circle at keyBottom
  drawEllipse(grid, keyBottom, midC, 6, 8, 0, 180, 5);
  // Dashed top half
  for (let a = 180; a <= 360; a += 18) {
    const rad = (a * Math.PI) / 180;
    const r = Math.round(keyBottom + 6 * Math.sin(rad));
    const c = Math.round(midC + 8 * Math.cos(rad));
    setChar(grid, r, c, '.');
  }

  // Top Basket & Backboard
  const bbR = top + 3;
  drawHLine(grid, bbR, midC - 3, midC + 3, '=');
  setChar(grid, bbR + 1, midC, 'O');
  drawEllipse(grid, bbR + 1, midC, 3, 4, 0, 180, 20);

  // Top Three-Point Line
  const cornerCOffset = 20;
  const threeStraightLenR = 12;
  drawVLine(grid, midC - cornerCOffset, top + buf, top + threeStraightLenR, '|');
  drawVLine(grid, midC + cornerCOffset, top + buf, top + threeStraightLenR, '|');
  drawEllipse(grid, bbR + 1, midC, 22, 20, 25, 155, 3);

  // 5. Bottom Key (Paint area - mirror of top)
  const bKeyTop = bottom - keyLenR;
  drawVLine(grid, keyLeft, bKeyTop, bottom - buf, '|');
  drawVLine(grid, keyRight, bKeyTop, bottom - buf, '|');
  drawHLine(grid, bKeyTop, keyLeft, keyRight, '-');
  setChar(grid, bKeyTop, keyLeft, '+');
  setChar(grid, bKeyTop, keyRight, '+');

  // Bottom Free-throw circle at bKeyTop
  drawEllipse(grid, bKeyTop, midC, 6, 8, 180, 360, 5);
  // Dashed bottom half
  for (let a = 0; a <= 180; a += 18) {
    const rad = (a * Math.PI) / 180;
    const r = Math.round(bKeyTop + 6 * Math.sin(rad));
    const c = Math.round(midC + 8 * Math.cos(rad));
    setChar(grid, r, c, '.');
  }

  // Bottom Basket & Backboard
  const bBbR = bottom - 3;
  drawHLine(grid, bBbR, midC - 3, midC + 3, '=');
  setChar(grid, bBbR - 1, midC, 'O');
  drawEllipse(grid, bBbR - 1, midC, 3, 4, 180, 360, 20);

  // Bottom Three-Point Line
  drawVLine(grid, midC - cornerCOffset, bottom - threeStraightLenR, bottom - buf, '|');
  drawVLine(grid, midC + cornerCOffset, bottom - threeStraightLenR, bottom - buf, '|');
  drawEllipse(grid, bBbR - 1, midC, 22, 20, 205, 335, 3);

  return grid;
}

function gridToSvg(grid: AsciiGrid, width: number, height: number): string {
  const cellW = width / grid.cols;
  const cellH = height / grid.rows;
  const fontSize = Math.floor(cellH * 0.88);

  const textLines: string[] = [];

  for (let r = 0; r < grid.rows; r++) {
    const rowChars = grid.cells[r];
    // Group into runs of characters for optimal SVG rendering
    let run = '';
    let startC = -1;

    for (let c = 0; c < grid.cols; c++) {
      const ch = rowChars[c];
      if (ch !== ' ') {
        if (startC === -1) startC = c;
        // Escape xml entities
        if (ch === '<') run += '&lt;';
        else if (ch === '>') run += '&gt;';
        else if (ch === '&') run += '&amp;';
        else run += ch;
      } else {
        if (run.length > 0) {
          const x = (startC * cellW).toFixed(1);
          const y = (r * cellH + cellH * 0.78).toFixed(1);
          textLines.push(
            `<text x="${x}" y="${y}" fill="${TEXT_COLOR}" opacity="0.88">${run}</text>`
          );
          run = '';
          startC = -1;
        }
      }
    }
    if (run.length > 0) {
      const x = (startC * cellW).toFixed(1);
      const y = (r * cellH + cellH * 0.78).toFixed(1);
      textLines.push(
        `<text x="${x}" y="${y}" fill="${TEXT_COLOR}" opacity="0.88">${run}</text>`
      );
    }
  }

  return `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" style="background:${BG_COLOR}; font-family: 'Liberation Mono', 'Courier New', monospace; font-size: ${fontSize}px; letter-spacing: ${cellW - fontSize * 0.6}px;">
    <rect width="${width}" height="${height}" fill="${BG_COLOR}"/>
    ${textLines.join('\n    ')}
  </svg>`;
}

export async function generateAsciiArtBackgrounds() {
  const publicDir = path.resolve(process.cwd(), 'public');
  const distDir = path.resolve(process.cwd(), 'dist');

  console.log('[ASCII Gen] Generating desktop ASCII court blueprint...');
  const deskGrid = generateDesktopGrid();
  const deskSvg = gridToSvg(deskGrid, 1920, 1080);
  const deskPng = await sharp(Buffer.from(deskSvg)).png({ compressionLevel: 8 }).toBuffer();

  console.log('[ASCII Gen] Generating mobile ASCII court blueprint...');
  const mobGrid = generateMobileGrid();
  const mobSvg = gridToSvg(mobGrid, 1080, 1920);
  const mobPng = await sharp(Buffer.from(mobSvg)).png({ compressionLevel: 8 }).toBuffer();

  const files = [
    { name: 'bg5-desk.png', buffer: deskPng },
    { name: 'bg5-mob.png', buffer: mobPng },
    { name: 'background4-desk.png', buffer: deskPng },
    { name: 'background4-mob.png', buffer: mobPng },
    { name: 'background-desk.png', buffer: deskPng },
    { name: 'background-mob.png', buffer: mobPng },
  ];

  for (const f of files) {
    fs.writeFileSync(path.join(publicDir, f.name), f.buffer);
    if (fs.existsSync(distDir)) {
      fs.writeFileSync(path.join(distDir, f.name), f.buffer);
    }
  }

  console.log('[ASCII Gen] Successfully generated bg5-desk.png and bg5-mob.png!');
}

if (process.argv[1] && process.argv[1].includes('generate-ascii-court')) {
  generateAsciiArtBackgrounds().catch(console.error);
}
