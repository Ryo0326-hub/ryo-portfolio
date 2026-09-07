import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import { execSync } from 'child_process';
import { defineConfig, Plugin } from 'vite';

function heicConverterPlugin(): Plugin {
  const processImages = () => {
    try {
      const publicDir = path.resolve(process.cwd(), 'public');
      const rootDir = process.cwd();
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
        execSync(`convert "${foundHeicPath}" -auto-orient -resize 1440x1920\\> -quality 88 "${targetJpg}"`);
        console.log(`[Vite HEIC] Converted ${foundHeicPath} to ${targetJpg}`);
      }
    } catch (e) {
      // Quietly continue
    }
  };

  return {
    name: 'vite-heic-converter',
    buildStart() {
      processImages();
    },
    configureServer(server) {
      processImages();
      server.middlewares.use((req, res, next) => {
        const url = req.url?.split('?')[0] || '';
        if (/\.(heic|heif)$/i.test(url)) {
          processImages();
          const targetJpg = path.resolve(process.cwd(), 'public/profile2.jpg');
          const fallbackJpg = path.resolve(process.cwd(), 'public/profile.jpg');
          const fileToServe = fs.existsSync(targetJpg) ? targetJpg : fallbackJpg;
          if (fs.existsSync(fileToServe)) {
            res.setHeader('Content-Type', 'image/jpeg');
            fs.createReadStream(fileToServe).pipe(res);
            return;
          }
        }
        if (/^\/(resume\.pdf|ryo_kitano_ai_ml_resume\.pdf)$/i.test(url)) {
          const pdfFile = path.resolve(process.cwd(), 'public/Ryo_Kitano_AI_ML_Resume.pdf');
          if (fs.existsSync(pdfFile)) {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'inline; filename="Ryo_Kitano_AI_ML_Resume.pdf"');
            fs.createReadStream(pdfFile).pipe(res);
            return;
          }
        }
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), heicConverterPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
      strictPort: true,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
