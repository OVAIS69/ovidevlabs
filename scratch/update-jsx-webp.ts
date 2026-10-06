import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

function walkAndReplace(dir: string) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkAndReplace(fullPath);
    } else if (entry.isFile() && /\.(tsx|ts|js|jsx)$/.test(entry.name)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace image extensions (.png, .jpg, .jpeg) with .webp for images in /img/ or /images/
      // but avoid touching fonts, audio, video (.mp4), or external URLs
      const updated = content.replace(/(['"]\/images\/[^'"]+|\/img\/[^'"]+)\.(png|jpg|jpeg)(['"])/gi, (match, p1, p2, p3) => {
        const targetPath = path.join(process.cwd(), 'public', `${p1}.webp`);
        if (fs.existsSync(targetPath)) {
          return `${p1}.webp${p3}`;
        }
        return match;
      });

      if (updated !== content) {
        fs.writeFileSync(fullPath, updated);
        console.log(`Updated image references in: ${path.relative(process.cwd(), fullPath)}`);
      }
    }
  }
}

console.log('Updating component image references to .webp...');
walkAndReplace(srcDir);
console.log('Finished updating JSX/TSX image sources!');
