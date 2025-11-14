import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsJsonPath = path.join(__dirname, '../public/data/products.json');
const imageManifestPath = path.join(__dirname, '../public/data/image-manifest.json');
const productsDir = path.join(__dirname, '../public/products');
const productInfoDir = path.join(__dirname, '../public/product_info');

console.log('Checking for image mismatches...\n');

// Load products.json
const products = JSON.parse(fs.readFileSync(productsJsonPath, 'utf-8'));

// Load image manifest
const imageManifest = JSON.parse(fs.readFileSync(imageManifestPath, 'utf-8'));

// Get actual product folders
const actualProductFolders = fs.readdirSync(productsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

const actualProductInfoFolders = fs.readdirSync(productInfoDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log(`Total products in JSON: ${products.length}`);
console.log(`Total folders in /products: ${actualProductFolders.length}`);
console.log(`Total folders in /product_info: ${actualProductInfoFolders.length}`);
console.log(`Total entries in image manifest: ${Object.keys(imageManifest).length}\n`);

// Check for mismatches
const mismatches = [];
const productsWithoutImages = [];

for (const product of products) {
  const folderName = product.folderName;
  
  if (!folderName) {
    console.log(`⚠️  Product "${product.name}" has no folderName`);
    continue;
  }
  
  // Check if folder exists in /products
  const hasProductFolder = actualProductFolders.includes(folderName);
  
  // Check if in manifest
  const hasImagesInManifest = imageManifest[folderName] && imageManifest[folderName].length > 0;
  
  if (!hasProductFolder) {
    mismatches.push({
      product: product.name,
      folderName: folderName,
      issue: 'Folder not found in /products'
    });
  } else if (!hasImagesInManifest) {
    productsWithoutImages.push({
      product: product.name,
      folderName: folderName,
      issue: 'No images in manifest (folder exists but empty or no image files)'
    });
  }
}

if (mismatches.length > 0) {
  console.log(`\n❌ Found ${mismatches.length} folder name mismatches:\n`);
  mismatches.slice(0, 10).forEach(m => {
    console.log(`  Product: "${m.product}"`);
    console.log(`  Looking for folder: "${m.folderName}"`);
    console.log(`  Issue: ${m.issue}\n`);
  });
  if (mismatches.length > 10) {
    console.log(`  ... and ${mismatches.length - 10} more\n`);
  }
}

if (productsWithoutImages.length > 0) {
  console.log(`\n⚠️  Found ${productsWithoutImages.length} products with folders but no images:\n`);
  productsWithoutImages.slice(0, 10).forEach(p => {
    console.log(`  Product: "${p.product}"`);
    console.log(`  Folder: "${p.folderName}"`);
    console.log(`  Issue: ${p.issue}\n`);
  });
  if (productsWithoutImages.length > 10) {
    console.log(`  ... and ${productsWithoutImages.length - 10} more\n`);
  }
}

if (mismatches.length === 0 && productsWithoutImages.length === 0) {
  console.log('✅ All products have matching folders and images!');
}

console.log(`\n📊 Summary:`);
console.log(`  Products with images: ${products.length - mismatches.length - productsWithoutImages.length}`);
console.log(`  Folder mismatches: ${mismatches.length}`);
console.log(`  Empty folders: ${productsWithoutImages.length}`);