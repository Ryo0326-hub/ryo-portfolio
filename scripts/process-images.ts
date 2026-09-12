import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

export async function processProfileImages() {
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

  // Ensure true ASCII art basketball court backgrounds exist (bg5-desk.png, bg5-mob.png)
  const deskBg = path.join(publicDir, 'bg5-desk.png');
  const mobBg = path.join(publicDir, 'bg5-mob.png');
  if (!fs.existsSync(deskBg) || !fs.existsSync(mobBg)) {
    try {
      execSync('npx tsx scripts/generate-ascii-court.ts', { stdio: 'inherit' });
    } catch (e) {
      console.error('[Image Processor] Failed to generate ASCII backgrounds:', e);
    }
  }

  // Ensure zoomed-out horizontal profile image is generated for mobile overview
  const horizontalJpg = path.join(publicDir, 'profile-horizontal.jpg');
  const origJpg = path.join(publicDir, 'profile2-original.jpg');
  if (!fs.existsSync(horizontalJpg) || fs.statSync(horizontalJpg).size < 100000) {
    try {
      const sharp = (await import('sharp')).default;
      const srcJpg = fs.existsSync(origJpg)
        ? origJpg
        : fs.existsSync(targetJpg)
        ? targetJpg
        : path.join(publicDir, 'profile.jpg');

      const meta = await sharp(srcJpg).metadata();
      const w = meta.width || 4284;
      const h = meta.height || 5712;

      // Extract horizontal region (top: 1520 positions hair at top margin, showing full face and upper body/chest)
      const topOffset = Math.round(h * 0.266); // ~1520px
      const cropH = Math.min(h - topOffset, Math.round(w * 0.688)); // ~2950px

      await sharp(srcJpg)
        .extract({
          left: 0,
          top: topOffset,
          width: w,
          height: cropH,
        })
        .resize(1600, 1102)
        .jpeg({ quality: 95 })
        .toFile(horizontalJpg);
      console.log('[Image Processor] Successfully generated high quality profile-horizontal.jpg');
    } catch (e) {
      console.error('[Image Processor] Could not generate profile-horizontal.jpg:', e);
    }
  }
}

processProfileImages();
