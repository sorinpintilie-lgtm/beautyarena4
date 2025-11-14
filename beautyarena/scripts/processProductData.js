import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Product Data Pre-processor
// Converts CSV files to JSON for better browser compatibility

// Import CategoryParser for category processing
class CategoryParser {
  static generateSlug(name) {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  static parseCategoryString(categoryString) {
    if (!categoryString || typeof categoryString !== 'string') {
      return {
        categoryPaths: [],
        allCategories: [],
        primaryCategory: null,
        primarySubcategory: null,
        categoryString: ''
      };
    }

    const paths = categoryString
      .split('|')
      .map(path => path.trim())
      .filter(path => path.length > 0)
      .map(path => {
        const levels = path.split('>').map(level => level.trim());
        return {
          path: path,
          levels: levels,
          depth: levels.length,
          slug: this.generateSlug(levels[levels.length - 1])
        };
      });

    const allCategories = [...new Set(
      paths.flatMap(p => p.levels)
    )];

    const primaryPath = paths.find(p =>
      !p.levels[0].toLowerCase().includes('brand')
    ) || paths[0];

    return {
      categoryPaths: paths,
      allCategories: allCategories,
      primaryCategory: primaryPath?.levels[0] || null,
      primarySubcategory: primaryPath?.levels[1] || null,
      categoryString: categoryString
    };
  }

  static buildCategoryTree(products) {
    const tree = {};

    products.forEach(product => {
      if (!product.categoryPaths) return;

      product.categoryPaths.forEach(categoryPath => {
        let currentLevel = tree;
        let pathSoFar = [];

        categoryPath.levels.forEach((level, index) => {
          pathSoFar.push(level);
          const slug = this.generateSlug(level);
          const fullPath = pathSoFar.join('>');

          if (!currentLevel[level]) {
            currentLevel[level] = {
              name: level,
              slug: slug,
              fullPath: fullPath,
              count: 0,
              productIds: new Set(),
              children: {},
              level: index,
              parent: pathSoFar.length > 1 ? pathSoFar[pathSoFar.length - 2] : null
            };
          }

          currentLevel[level].count++;
          currentLevel[level].productIds.add(product.id);
          currentLevel = currentLevel[level].children;
        });
      });
    });

    const convertSetsToArrays = (obj) => {
      Object.values(obj).forEach(category => {
        category.productIds = Array.from(category.productIds);
        if (Object.keys(category.children).length > 0) {
          convertSetsToArrays(category.children);
        }
      });
    };
    convertSetsToArrays(tree);

    return tree;
  }
}

class ProductDataProcessor {
  constructor() {
    this.products = [];
    this.productMap = new Map();
  }

  /**
   * Generate a URL-friendly slug from product name
   */
  static generateSlug(name) {
    return name
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim();
  }

  /**
   * Parse CSV content to extract product data
   * Handles quoted fields with commas properly
   */
  static parseCSV(csvContent) {
    const lines = csvContent.trim().split('\n');
    if (lines.length < 2) return null;

    // Parse CSV line respecting quotes
    const parseLine = (line) => {
      const result = [];
      let current = '';
      let inQuotes = false;
      
      for (let i = 0; i < line.length; i++) {
        const char = line[i];
        
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          result.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim());
      return result;
    };

    const headers = parseLine(lines[0]);
    const values = parseLine(lines[1]);
    
    const productData = {};
    headers.forEach((header, index) => {
      productData[header] = values[index] || '';
    });

    return productData;
  }

  /**
   * Extract image URLs from CSV data
   */
  static extractImages(productData) {
    const imageUrls = productData['URL Poza de Produs'];
    if (!imageUrls) return [];
    return imageUrls.split('|').filter(url => url.trim());
  }

  /**
   * Process product specifications from CSV attributes
   */
  static processSpecifications(productData) {
    const specifications = [];
    
    // Extract key attributes that exist in the CSV
    const attributes = {
      'Volum': productData['Atribute: Cantitate (lista)'],
      'Culoare': productData['Atribute: Culoare (lista)'],
      'Brand': productData['Marca (Brand)'],
      'Stoc': productData['Stare Stoc'],
      'Durata Livrare': productData['Produs: Durata de Livrare']
    };

    Object.entries(attributes).forEach(([key, value]) => {
      if (value && value.trim()) {
        specifications.push({ key, value: value.trim() });
      }
    });

    // Extract additional usage instructions if they exist
    const usageFields = [
      'Atribute: Cum Să Folosești? (camp text)',
      'Atribute: Aplicam Samponul Pe Parul Umezit In Prealabil ,Masam, Clatim Si Continuam Cu Masca, (camp text)',
      'Atribute: Aplica Masca Pe Parul Ud, Uscat Bine Din Prosop . Masati In Sensul De Crestere,Dinspre Radacini Spre Varfuri,Lasati Sa Actioneze Minim 10 Minute,Apoi Clatiti . (camp text)',
      'Atribute: Se Aplica Pe Parul Umed, Prin Pulverizare Inainte De A Coafa Parul. Nu Se Clateste. (camp text)'
    ];

    usageFields.forEach(field => {
      if (productData[field] && productData[field].trim()) {
        specifications.push({
          key: 'Utilizare',
          value: productData[field].trim().substring(0, 200) + (productData[field].length > 200 ? '...' : '')
        });
      }
    });

    return specifications;
  }

  /**
   * Determine category from CSV category string
   */
  static determineCategory(categoryString) {
    if (!categoryString) return 'other';
    
    const categoryLower = categoryString.toLowerCase();
    
    if (categoryLower.includes('păr') || categoryLower.includes('hair') || categoryLower.includes('par')) {
      return 'haircare';
    } else if (categoryLower.includes('makeup') || categoryLower.includes('machiaj')) {
      return 'makeup';
    } else if (categoryLower.includes('skin') || categoryLower.includes('ten') || categoryLower.includes('facial')) {
      return 'skincare';
    } else if (categoryLower.includes('nail') || categoryLower.includes('unghii')) {
      return 'nails';
    } else if (categoryLower.includes('scalp')) {
      return 'scalp';
    }
    
    return 'other';
  }

  /**
   * Determine subcategory from CSV category string
   */
  static determineSubcategory(categoryString) {
    if (!categoryString) return 'other';
    
    const categoryLower = categoryString.toLowerCase();
    
    if (categoryLower.includes('sampon')) return 'shampoo';
    if (categoryLower.includes('mască') || categoryLower.includes('mask')) return 'treatment';
    if (categoryLower.includes('spray')) return 'styling';
    if (categoryLower.includes('balsam') || categoryLower.includes('conditioner')) return 'conditioner';
    if (categoryLower.includes('spuma') || categoryLower.includes('mousse')) return 'styling';
    if (categoryLower.includes('ulei') || categoryLower.includes('oil')) return 'treatment';
    if (categoryLower.includes('gel')) return 'styling';
    if (categoryLower.includes('crema') || categoryLower.includes('cream')) return 'moisturizer';
    
    return 'other';
  }

  /**
   * Extract tags from category string
   */
  static extractTags(categoryString) {
    if (!categoryString) return [];
    
    const tags = [];
    const categoryLower = categoryString.toLowerCase();
    
    if (categoryLower.includes('hidratare')) tags.push('hidratare');
    if (categoryLower.includes('volum')) tags.push('volum');
    if (categoryLower.includes('reparator')) tags.push('reparator');
    if (categoryLower.includes('styling')) tags.push('styling');
    if (categoryLower.includes('protecție')) tags.push('protectie');
    if (categoryLower.includes('culoare')) tags.push('culoare');
    if (categoryLower.includes('blond')) tags.push('blond');
    
    return tags;
  }

  /**
   * Map CSV data to React product structure
   */
  static mapToReactProduct(csvData, slug, folderName) {
    const images = ProductDataProcessor.extractImages(csvData);
    const specifications = ProductDataProcessor.processSpecifications(csvData);
    
    // Parse categories using CategoryParser
    const categoryData = CategoryParser.parseCategoryString(csvData['Categorie / Categorii']);
    
    // Parse prices
    const regularPrice = parseFloat(csvData['Pret']) || 0;
    const specialPrice = parseFloat(csvData['Pret Special']) || 0;
    
    // Determine current price and original price
    const hasSpecialPrice = specialPrice > 0 && specialPrice < regularPrice;
    const currentPrice = hasSpecialPrice ? specialPrice : regularPrice;
    const originalPrice = hasSpecialPrice ? regularPrice : null;
    const discount = hasSpecialPrice
      ? Math.round(((regularPrice - specialPrice) / regularPrice) * 100)
      : 0;
    
    return {
      id: csvData['Cod Produs (SKU)'] || slug,
      name: csvData['Denumire Produs'] || 'Product Name',
      slug: slug,
      brand: {
        id: ProductDataProcessor.generateSlug(csvData['Marca (Brand)'] || ''),
        name: csvData['Marca (Brand)'] || 'Unknown Brand'
      },
      // Legacy category fields (kept for backward compatibility)
      category: ProductDataProcessor.determineCategory(csvData['Categorie / Categorii']),
      subcategory: ProductDataProcessor.determineSubcategory(csvData['Categorie / Categorii']),
      // New hierarchical category data
      categoryPaths: categoryData.categoryPaths,
      allCategories: categoryData.allCategories,
      primaryCategory: categoryData.primaryCategory,
      primarySubcategory: categoryData.primarySubcategory,
      categoryString: categoryData.categoryString,
      description: csvData['Descriere Produs'] || '',
      shortDescription: csvData['Descriere Scurta a Produsului'] || '',
      price: currentPrice,
      originalPrice: originalPrice,
      discount: discount,
      images: images,
      thumbnail: images[0] || null,
      rating: 4.5, // Default rating since not in CSV
      reviewCount: Math.floor(Math.random() * 100) + 1, // Random review count
      inStock: csvData['Stare Stoc'] === 'instock',
      stockQuantity: parseInt(csvData['Stoc Cantitativ']) || 0,
      sku: csvData['Cod Produs (SKU)'] || '',
      tags: ProductDataProcessor.extractTags(csvData['Categorie / Categorii']),
      isNew: false,
      isFeatured: false,
      isBestseller: false,
      specifications: specifications,
      folderName: folderName // Keep reference to folder name for image lookup
    };
  }

  /**
   * Process all CSV files and generate JSON
   */
  async processAllProducts() {
    try {
      const productInfoPath = path.join(process.cwd(), 'public', 'product_info');
      const productsPath = path.join(process.cwd(), 'public', 'products');
      
      if (!fs.existsSync(productInfoPath)) {
        console.error('Product info directory not found:', productInfoPath);
        return;
      }

      // Get actual product folders for image matching
      const actualProductFolders = fs.readdirSync(productsPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);

      const entries = fs.readdirSync(productInfoPath, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const csvPath = path.join(productInfoPath, entry.name, 'details.csv');
          
          try {
            if (fs.existsSync(csvPath)) {
              const csvContent = fs.readFileSync(csvPath, 'utf-8');
              const csvData = ProductDataProcessor.parseCSV(csvContent);
              
              if (csvData) {
                const slug = ProductDataProcessor.generateSlug(entry.name);
                
                // Find matching folder in /products by trying variations
                let matchingFolder = entry.name;
                if (!actualProductFolders.includes(entry.name)) {
                  // Try various character replacements
                  const variants = [
                    entry.name.replace(/—/g, ' - '),  // em dash to space-hyphen-space
                    entry.name.replace(/—/g, '  '),   // em dash to double space
                    entry.name.replace(/—/g, '-'),    // em dash to single hyphen
                    entry.name.replace(/  /g, ' - '), // double space to space-hyphen-space
                    entry.name.replace(/  /g, '—'),   // double space to em dash
                    entry.name.replace(/ — /g, ' - '), // space-em dash-space to space-hyphen-space
                  ];
                  
                  for (const variant of variants) {
                    if (actualProductFolders.includes(variant)) {
                      matchingFolder = variant;
                      break;
                    }
                  }
                }
                
                const product = ProductDataProcessor.mapToReactProduct(csvData, slug, matchingFolder);
                
                this.products.push(product);
                this.productMap.set(slug, product);
                
                console.log(`Processed: ${product.name} (${slug})`);
              }
            }
          } catch (csvError) {
            console.warn(`Failed to process CSV for ${entry.name}:`, csvError.message);
          }
        }
      }
      
      console.log(`\nTotal products processed: ${this.products.length}`);
      
      // Generate the output
      await this.generateOutput();
      
    } catch (error) {
      console.error('Failed to process products:', error);
    }
  }

  /**
   * Generate JSON output files
   */
  async generateOutput() {
    try {
      // Ensure output directory exists
      const outputDir = path.join(process.cwd(), 'public', 'data');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Generate products.json
      const productsJsonPath = path.join(outputDir, 'products.json');
      fs.writeFileSync(productsJsonPath, JSON.stringify(this.products, null, 2));
      console.log(`Generated: ${productsJsonPath}`);

      // Generate products-map.json for quick lookups
      const productMapJsonPath = path.join(outputDir, 'products-map.json');
      const mapObject = {};
      this.productMap.forEach((value, key) => {
        mapObject[key] = value;
      });
      fs.writeFileSync(productMapJsonPath, JSON.stringify(mapObject, null, 2));
      console.log(`Generated: ${productMapJsonPath}`);

      // Generate legacy categories.json for backward compatibility
      const categories = {};
      this.products.forEach(product => {
        if (!categories[product.category]) {
          categories[product.category] = [];
        }
        categories[product.category].push({
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          inStock: product.inStock
        });
      });

      const categoriesJsonPath = path.join(outputDir, 'categories.json');
      fs.writeFileSync(categoriesJsonPath, JSON.stringify(categories, null, 2));
      console.log(`Generated: ${categoriesJsonPath}`);

      // Generate hierarchical category tree
      const categoryTree = CategoryParser.buildCategoryTree(this.products);
      const categoryTreePath = path.join(outputDir, 'category-tree.json');
      fs.writeFileSync(categoryTreePath, JSON.stringify(categoryTree, null, 2));
      console.log(`Generated: ${categoryTreePath}`);
      
      // Generate category statistics
      const categoryStats = this.generateCategoryStats(categoryTree);
      const categoryStatsPath = path.join(outputDir, 'category-stats.json');
      fs.writeFileSync(categoryStatsPath, JSON.stringify(categoryStats, null, 2));
      console.log(`Generated: ${categoryStatsPath}`);

      console.log('\n✅ All JSON files generated successfully!');
      console.log(`   Total products: ${this.products.length}`);
      console.log(`   Total categories: ${Object.keys(categoryTree).length}`);
      
    } catch (error) {
      console.error('Failed to generate output:', error);
    }
  }

  /**
   * Generate category statistics
   */
  generateCategoryStats(tree) {
    const stats = {
      totalCategories: 0,
      topLevelCategories: Object.keys(tree).length,
      categoriesByLevel: {},
      topCategories: []
    };

    const countCategories = (currentTree, level = 0) => {
      Object.values(currentTree).forEach(category => {
        stats.totalCategories++;
        
        if (!stats.categoriesByLevel[level]) {
          stats.categoriesByLevel[level] = 0;
        }
        stats.categoriesByLevel[level]++;

        if (Object.keys(category.children).length > 0) {
          countCategories(category.children, level + 1);
        }
      });
    };

    countCategories(tree);

    // Get top 10 categories by product count
    const flatCategories = [];
    const flatten = (currentTree) => {
      Object.values(currentTree).forEach(category => {
        flatCategories.push({
          name: category.name,
          slug: category.slug,
          count: category.count,
          level: category.level
        });
        if (Object.keys(category.children).length > 0) {
          flatten(category.children);
        }
      });
    };
    flatten(tree);

    stats.topCategories = flatCategories
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return stats;
  }
}

// Run the processor
const processor = new ProductDataProcessor();
processor.processAllProducts();

export default ProductDataProcessor;