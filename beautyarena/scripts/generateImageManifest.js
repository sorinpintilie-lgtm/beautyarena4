import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsDir = path.join(__dirname, '../public/products');
const outputFile = path.join(__dirname, '../public/data/image-manifest.json');

function generateImageManifest() {
  const manifest = {};
  
  // Read all product folders
  const folders = fs.readdirSync(productsDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  
  console.log(`Found ${folders.length} product folders`);
  
  for (const folder of folders) {
    const folderPath = path.join(productsDir, folder);
    const files = fs.readdirSync(folderPath)
      .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
      .sort(); // Sort to maintain order
    
    if (files.length > 0) {
      manifest[folder] = files.map(file => `/products/${folder}/${file}`);
      console.log(`  ${folder}: ${files.length} images`);
    }
  }
  
  // Ensure data directory exists
  const dataDir = path.dirname(outputFile);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // Write manifest
  fs.writeFileSync(outputFile, JSON.stringify(manifest, null, 2));
  console.log(`\nImage manifest generated: ${outputFile}`);
  console.log(`Total products with images: ${Object.keys(manifest).length}`);
}

generateImageManifest();