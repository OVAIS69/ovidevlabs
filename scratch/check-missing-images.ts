import fs from 'fs';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src');
const publicDir = path.join(process.cwd(), 'public');
const missing: Array<{ file: string; image: string }> = [];

function checkFile(filePath: string) {
  const content = fs.readFileSync(filePath, 'utf8');
  const matches = content.match(/['"]\/(images|img)\/[^'"]+?\.(webp|png|jpg|jpeg|svg|gif)['"]/g) || [];
  for (const m of matches) {
    const rel = m.slice(1, -1);
    const full = path.join(publicDir, rel);
    if (!fs.existsSync(full)) {
      missing.push({ file: path.relative(srcDir, filePath), image: rel });
    }
  }
}

function walk(dir: string) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) walk(full);
    else if (/\.(tsx|ts|js|jsx)$/.test(f)) checkFile(full);
  }
}

walk(srcDir);
console.log('Missing images check results:');
console.log(JSON.stringify(missing, null, 2));
