import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');

function replaceInFile(filePath: string) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace string literals ending in .png, .jpg, .jpeg
  const updated = content.replace(/(['"])([^'"]+?\.(png|jpg|jpeg))\1/gi, (match, quote, url) => {
    const cleanUrl = url.startsWith('/') ? url : '/' + url;
    const webpPath = path.join(process.cwd(), 'public', cleanUrl.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
    if (fs.existsSync(webpPath)) {
      return quote + url.replace(/\.(png|jpg|jpeg)$/i, '.webp') + quote;
    }
    return match;
  });

  if (updated !== content) {
    fs.writeFileSync(filePath, updated);
    console.log('Updated:', path.relative(process.cwd(), filePath));
  }
}

function walk(dir: string) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (/\.(tsx|ts|js|jsx)$/.test(f)) replaceInFile(full);
  }
}

walk(srcDir);
console.log('Finished WebP replacement!');
