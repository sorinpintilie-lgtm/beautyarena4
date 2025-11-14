import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsJsonPath = path.join(__dirname, '../public/data/products.json');
const productsDir = path.join(__dirname, '../public/products');

console.log('Fixing folder name mismatches...\n');

// Load products.json
const products = JSON.parse(fs.readFileSync(productsJsonPath, 'utf-8'));

// Get actual product folders
const actualProductFolders = fs.readdirSync(productsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

// Create a map of normalized names to actual folder names
const folderMap = new Map();
actualProductFolders.forEach(folder => {
  // Normalize by replacing em dash with double space and vice versa
  const normalized1 = folder.replace(/—/g, '  ');
  const normalized2 = folder.replace(/  /g, '—');
  folderMap.set(folder, folder);
  folderMap.set(normalized1, folder);
  folderMap.set(normalized2, folder);
});

let fixedCount = 0;

// Fix folder names in products
for (const product of products) {
  if (product.folderName) {
    const actualFolder = folderMap.get(product.folderName);
    if (actualFolder && actualFolder !== product.folderName) {
      console.log(`Fixing: "${product.folderName}" -> "${actualFolder}"`);
      product.folderName = actualFolder;
      fixedCount++;
    }
  }
}

// Save updated products.json
fs.writeFileSync(productsJsonPath, JSON.stringify(products, null, 2));

console.log(`\n✅ Fixed ${fixedCount} folder name mismatches`);
console.log(`Updated: ${productsJsonPath}`);