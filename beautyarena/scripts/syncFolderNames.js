import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsJsonPath = path.join(__dirname, '../public/data/products.json');
const productsDir = path.join(__dirname, '../public/products');

console.log('Syncing folder names between products.json and /products directory...\n');

// Load products
const products = JSON.parse(fs.readFileSync(productsJsonPath, 'utf-8'));

// Get actual product folders
const actualFolders = fs.readdirSync(productsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log(`Products in JSON: ${products.length}`);
console.log(`Folders in /products: ${actualFolders.length}\n`);

// Manual mappings for edge cases
const manualMappings = {
  "Elisier - Ser si Spuma Fortifianta": "Elisier - Ser fortifiant cu efect regenerator - 50ml",
  "Ulei revelator de stralucire Huile d'Etoile  15 ml": "Ulei revelator de stralucire Huile d'étoile — 15 ml",
};

// Create fuzzy matching function
function findBestMatch(searchName, folderList) {
  // Check manual mappings first
  if (manualMappings[searchName]) {
    return manualMappings[searchName];
  }
  
  // Try exact match
  if (folderList.includes(searchName)) {
    return searchName;
  }
  
  // Try direct replacements
  const variants = [
    searchName.replace(/  /g, ' — '),  // double space to space-em dash-space
    searchName.replace(/  /g, '—'),    // double space to em dash
    searchName.replace(/—/g, '  '),    // em dash to double space
    searchName.replace(/è/g, 'e'),     // accented è to regular e (Elisièr -> Elisier)
    searchName.replace(/É/g, 'é'),     // capital É to lowercase é
    searchName.replace(/`/g, "'"),     // backtick to apostrophe
  ];
  
  // Also try combinations
  variants.push(searchName.replace(/  /g, ' — ').replace(/`/g, "'"));
  variants.push(searchName.replace(/  /g, '—').replace(/É/g, 'é'));
  
  for (const variant of variants) {
    if (folderList.includes(variant)) {
      return variant;
    }
  }
  
  return null;
}

let fixedCount = 0;
let notFoundCount = 0;

for (const product of products) {
  if (!product.folderName) continue;
  
  const bestMatch = findBestMatch(product.folderName, actualFolders);
  
  if (bestMatch && bestMatch !== product.folderName) {
    console.log(`Fixing: "${product.folderName}"`);
    console.log(`     -> "${bestMatch}"\n`);
    product.folderName = bestMatch;
    fixedCount++;
  } else if (!bestMatch) {
    console.warn(`⚠️  No match found for: "${product.folderName}"`);
    notFoundCount++;
  }
}

// Save updated products.json
fs.writeFileSync(productsJsonPath, JSON.stringify(products, null, 2));

console.log(`\n✅ Sync complete!`);
console.log(`  Fixed: ${fixedCount}`);
console.log(`  Not found: ${notFoundCount}`);
console.log(`  Total: ${products.length}`);