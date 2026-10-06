import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');

let convertedCount = 0;
let bytesSaved = 0;

async function processDirectory(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        const stat = fs.statSync(fullPath);
        // Only process files larger than 150KB
        if (stat.size > 150 * 1024) {
          const webpPath = fullPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
          
          try {
            const image = sharp(fullPath);
            const metadata = await image.metadata();

            // Resize ultra high-res images to max 1920px width while keeping aspect ratio
            let pipeline = image;
            if (metadata.width && metadata.width > 1920) {
              pipeline = pipeline.resize(1920, null, { withoutEnlargement: true });
            }

            const webpBuffer = await pipeline
              .webp({ quality: 82, effort: 6 })
              .toBuffer();

            if (webpBuffer.length < stat.size) {
              fs.writeFileSync(webpPath, webpBuffer);
              bytesSaved += (stat.size - webpBuffer.length);
              convertedCount++;
              console.log(`Compressed: ${path.relative(publicDir, fullPath)} (${(stat.size/1024/1024).toFixed(2)}MB -> ${(webpBuffer.length/1024/1024).toFixed(2)}MB)`);
            }
          } catch (err) {
            console.error(`Failed to convert ${fullPath}:`, err);
          }
        }
      }
    }
  }
}

async function run() {
  console.log('Starting image compression and WebP conversion...');
  await processDirectory(publicDir);
  console.log(`\nCompleted! Converted ${convertedCount} images.`);
  console.log(`Total space saved: ${(bytesSaved / 1024 / 1024).toFixed(2)} MB`);
}

run();
