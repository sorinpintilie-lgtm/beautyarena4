// Product Loader Utility for Real Products
import { CategoryParser } from './categoryParser';

class ProductLoader {
  constructor() {
    this.productsCache = null;
    this.productMap = new Map();
    this.imageManifest = null;
    this.categoryTree = null;
  }

  /**
   * Load the image manifest
   */
  async loadImageManifest() {
    if (this.imageManifest) {
      return this.imageManifest;
    }

    try {
      const response = await fetch('/data/image-manifest.json');
      if (response.ok) {
        this.imageManifest = await response.json();
        console.log('[DEBUG] Image manifest loaded successfully');
        return this.imageManifest;
      }
    } catch (error) {
      console.warn('Failed to load image manifest:', error);
    }
    
    return {};
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
   * Map CSV data to React product structure
   */
  static mapToReactProduct(csvData, slug) {
    const images = ProductLoader.extractImages(csvData);
    const specifications = ProductLoader.processSpecifications(csvData);
    
    return {
      id: csvData['Cod Produs (SKU)'] || slug,
      name: csvData['Denumire Produs'] || 'Product Name',
      slug: slug,
      brand: {
        id: ProductLoader.generateSlug(csvData['Marca (Brand)'] || ''),
        name: csvData['Marca (Brand)'] || 'Unknown Brand'
      },
      category: ProductLoader.determineCategory(csvData['Categorie / Categorii']),
      subcategory: ProductLoader.determineSubcategory(csvData['Categorie / Categorii']),
      description: csvData['Descriere Produs'] || '',
      shortDescription: csvData['Descriere Scurta a Produsului'] || '',
      price: (() => {
        const regularPrice = parseFloat(csvData['Pret']) || 0;
        const specialPrice = parseFloat(csvData['Pret Special']) || 0;
        return (specialPrice > 0 && specialPrice < regularPrice) ? specialPrice : regularPrice;
      })(),
      originalPrice: (() => {
        const regularPrice = parseFloat(csvData['Pret']) || 0;
        const specialPrice = parseFloat(csvData['Pret Special']) || 0;
        return (specialPrice > 0 && specialPrice < regularPrice) ? regularPrice : null;
      })(),
      discount: (() => {
        const regularPrice = parseFloat(csvData['Pret']) || 0;
        const specialPrice = parseFloat(csvData['Pret Special']) || 0;
        return (specialPrice > 0 && specialPrice < regularPrice)
          ? Math.round(((regularPrice - specialPrice) / regularPrice) * 100)
          : 0;
      })(),
      images: images,
      thumbnail: images[0] || null,
      rating: 4.5, // Default rating since not in CSV
      reviewCount: Math.floor(Math.random() * 100) + 1, // Random review count
      inStock: csvData['Stare Stoc'] === 'instock',
      stockQuantity: parseInt(csvData['Stoc Cantitativ']) || 0,
      sku: csvData['Cod Produs (SKU)'] || '',
      tags: ProductLoader.extractTags(csvData['Categorie / Categorii']),
      isNew: false,
      isFeatured: false,
      isBestseller: false,
      specifications: specifications
    };
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
   * Load all products from JSON files - Optimized version
   */
  async loadProductsFromCSV() {
    if (this.productsCache) {
      return this.productsCache;
    }

    try {
      // Try to load from pre-generated JSON files first
      const response = await fetch('/data/products.json');
      if (response.ok) {
        const products = await response.json();
        
        console.log(`[DEBUG] Loaded ${products.length} products from JSON`);
        console.log('[DEBUG] Sample product data:', {
          name: products[0]?.name,
          folderName: products[0]?.folderName,
          images: products[0]?.images,
          thumbnail: products[0]?.thumbnail
        });
        
        // Add local images to products that have them
        for (const product of products) {
          if (product.folderName) {
            const localImages = await this.getLocalImages(product.folderName);
            if (localImages.length > 0) {
              product.localImages = localImages;
              product.images = localImages; // Use local images as primary
              product.thumbnail = localImages[0];
              console.log(`[DEBUG] Product "${product.name}" now has ${localImages.length} local images`);
            } else {
              console.warn(`[DEBUG] No local images found for "${product.name}" (folder: ${product.folderName})`);
              console.log(`[DEBUG] Product has these image URLs from JSON:`, product.images);
            }
          }
          this.productMap.set(product.slug, product);
        }
        
        this.productsCache = products;
        return products;
      }
      
      // Fallback to CSV parsing if JSON files are not available
      console.warn('JSON files not found, falling back to CSV parsing');
      return await this.loadProductsFromCSVFallback();
      
    } catch (error) {
      console.error('Failed to load products from JSON, trying CSV fallback:', error);
      return await this.loadProductsFromCSVFallback();
    }
  }

  /**
   * Fallback method to load from CSV files
   */
  async loadProductsFromCSVFallback() {
    const products = [];
    
    // Define the product folders we know have CSV data
    const productFolders = [
      'Pudra de volum cu fixare extrema si efect mat, Idol Volum 30ml',
      'Sampon Calmant Velour pH 5.5  250 ml',
      'Spray de volum cu fixare medie - 150ml - Medavita',
      'Sampon pentru hidratare - Nutrisubstance - 250ml — 250 ml',
      'Masca pentru par cret - Curl Addict - 150ml — 150 ml',
      'Spuma cu keratina antifrizz - KERATIN MIRACLE - 200ml',
      'Ulei antifrizz, anti-incretire - 50ml',
      'Tratament Anticadere - Spray - 100ml - Medavita'
    ];

    for (const folderName of productFolders) {
      try {
        const response = await fetch(`/product_info/${encodeURIComponent(folderName)}/details.csv`);
        if (response.ok) {
          const csvContent = await response.text();
          const csvData = ProductLoader.parseCSV(csvContent);
          
          if (csvData) {
            const slug = ProductLoader.generateSlug(folderName);
            const product = ProductLoader.mapToReactProduct(csvData, slug);
            
            // Check for local images
            const localImages = await this.getLocalImages(folderName);
            if (localImages.length > 0) {
              product.localImages = localImages;
              product.images = localImages; // Use local images as primary
              product.thumbnail = localImages[0];
            }
            
            products.push(product);
            this.productMap.set(slug, product);
          }
        }
      } catch (csvError) {
        console.warn(`Failed to load CSV for ${folderName}:`, csvError.message);
      }
    }
    
    return products;
  }

  /**
   * Get local images for a product - Using manifest
   */
  async getLocalImages(productFolderName) {
    try {
      // Load the image manifest
      const manifest = await this.loadImageManifest();
      
      // Get images from manifest
      const images = manifest[productFolderName] || [];
      
      if (images.length > 0) {
        console.log(`[DEBUG] ✓ Found ${images.length} images for "${productFolderName}" from manifest`);
      } else {
        console.warn(`[DEBUG] ✗ No images in manifest for "${productFolderName}"`);
      }
      
      return images;
    } catch (error) {
      console.error(`[DEBUG] Failed to load local images for ${productFolderName}:`, error);
      return [];
    }
  }

  /**
   * Get product by slug
   */
  async getProductBySlug(slug) {
    const products = await this.loadProductsFromCSV();
    return products.find(p => p.slug === slug) || this.productMap.get(slug);
  }

  /**
   * Load category tree
   */
  async loadCategoryTree() {
    if (this.categoryTree) {
      return this.categoryTree;
    }

    try {
      const response = await fetch('/data/category-tree.json');
      if (response.ok) {
        this.categoryTree = await response.json();
        console.log('[DEBUG] Category tree loaded successfully');
        return this.categoryTree;
      }
    } catch (error) {
      console.error('[DEBUG] Failed to load category tree:', error);
    }
    
    return {};
  }

  /**
   * Get all products
   */
  async getAllProducts() {
    return await this.loadProductsFromCSV();
  }

  /**
   * Get products by legacy category
   */
  async getProductsByCategory(category) {
    const products = await this.loadProductsFromCSV();
    return products.filter(p => p.category === category);
  }

  /**
   * Get products by category slug(s) - supports hierarchical filtering
   * @param {string|string[]} categorySlugs - Single slug or array of slugs
   * @returns {Promise<Array>} - Filtered products
   */
  async getProductsByCategorySlugs(categorySlugs) {
    const products = await this.loadProductsFromCSV();
    const tree = await this.loadCategoryTree();
    
    if (!categorySlugs || (Array.isArray(categorySlugs) && categorySlugs.length === 0)) {
      return products;
    }

    const slugs = Array.isArray(categorySlugs) ? categorySlugs : [categorySlugs];
    return CategoryParser.filterProductsByCategories(slugs, tree, products);
  }

  /**
   * Get category path for breadcrumb
   * @param {string} categorySlug - Category slug
   * @returns {Promise<Array>} - Breadcrumb path
   */
  async getCategoryPath(categorySlug) {
    const tree = await this.loadCategoryTree();
    return CategoryParser.getCategoryPath(categorySlug, tree);
  }

  /**
   * Search categories
   * @param {string} query - Search query
   * @returns {Promise<Array>} - Matching categories
   */
  async searchCategories(query) {
    const tree = await this.loadCategoryTree();
    return CategoryParser.searchCategories(query, tree);
  }

  /**
   * Get featured products
   */
  async getFeaturedProducts() {
    const products = await this.loadProductsFromCSV();
    return products.filter(p => p.isFeatured);
  }

  /**
   * Search products
   */
  async searchProducts(query) {
    const products = await this.loadProductsFromCSV();
    const searchTerm = query.toLowerCase();
    
    return products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.brand.name.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }
}

// Export singleton instance
export const productLoader = new ProductLoader();
export default ProductLoader;