import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

export function processProfileImages() {
  const publicDir = path.resolve(process.cwd(), 'public');
  const rootDir = process.cwd();

  // Search candidates for profile2.HEIC or profile2.heic
  const candidateDirs = [publicDir, rootDir];
  let foundHeicPath: string | null = null;

  for (const dir of candidateDirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    for (const f of files) {
      if (/^profile2\.(heic|heif)$/i.test(f)) {
        foundHeicPath = path.join(dir, f);
        break;
      }
    }
    if (foundHeicPath) break;
  }

  const targetJpg = path.join(publicDir, 'profile2.jpg');

  if (foundHeicPath) {
    console.log(`[HEIC Processor] Found ${foundHeicPath}, converting to ${targetJpg}...`);
    try {
      execSync(`convert "${foundHeicPath}" -auto-orient -resize 1440x1920\\> -quality 88 "${targetJpg}"`, {
        stdio: 'inherit',
      });
      console.log(`[HEIC Processor] Successfully converted ${foundHeicPath} to ${targetJpg}`);
    } catch (err) {
      console.error(`[HEIC Processor] Error converting HEIC file:`, err);
    }
  } else if (!fs.existsSync(targetJpg)) {
    // Graceful fallback: initialize profile2.jpg from profile.jpg so the app never breaks
    const fallbackJpg = path.join(publicDir, 'profile.jpg');
    if (fs.existsSync(fallbackJpg)) {
      console.log(`[HEIC Processor] No profile2.HEIC found yet; initializing ${targetJpg} from ${fallbackJpg}`);
      fs.copyFileSync(fallbackJpg, targetJpg);
    }
  }
}

processProfileImages();
