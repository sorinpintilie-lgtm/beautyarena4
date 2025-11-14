/**
 * Category Parser Utility
 * Parses hierarchical categories from CSV pipe-delimited format
 */

export class CategoryParser {
  /**
   * Generate a URL-friendly slug from category name
   */
  static generateSlug(name) {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
  }

  /**
   * Parse pipe-delimited category string from CSV
   * Example: "Branduri Premium|Tratamente Scalp>Anticadere Femei|Produse pentru Barbati"
   */
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

    // Split by pipe to get individual category paths
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
          slug: this.generateSlug(levels[levels.length - 1]) // Slug of deepest level
        };
      });

    // Extract all unique categories (flattened)
    const allCategories = [...new Set(
      paths.flatMap(p => p.levels)
    )];

    // Determine primary category (first non-brand category path)
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

  /**
   * Build a hierarchical category tree from all products
   */
  static buildCategoryTree(products) {
    const tree = {};
    const categoryMap = new Map(); // For quick lookups

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
            categoryMap.set(slug, currentLevel[level]);
          }

          // Increment count and add product ID
          currentLevel[level].count++;
          currentLevel[level].productIds.add(product.id);

          // Move to next level
          currentLevel = currentLevel[level].children;
        });
      });
    });

    // Convert Sets to Arrays for JSON serialization
    const convertSetsToArrays = (obj) => {
      Object.values(obj).forEach(category => {
        category.productIds = Array.from(category.productIds);
        if (Object.keys(category.children).length > 0) {
          convertSetsToArrays(category.children);
        }
      });
    };
    convertSetsToArrays(tree);

    return { tree, categoryMap };
  }

  /**
   * Flatten category tree to a list for easier searching
   */
  static flattenTree(tree, result = []) {
    Object.values(tree).forEach(category => {
      result.push({
        name: category.name,
        slug: category.slug,
        fullPath: category.fullPath,
        count: category.count,
        level: category.level,
        parent: category.parent
      });

      if (Object.keys(category.children).length > 0) {
        this.flattenTree(category.children, result);
      }
    });

    return result;
  }

  /**
   * Get all unique categories at any level
   */
  static getAllCategories(products) {
    const categories = new Set();

    products.forEach(product => {
      if (product.allCategories) {
        product.allCategories.forEach(cat => categories.add(cat));
      }
    });

    return Array.from(categories).sort();
  }

  /**
   * Find a category in the tree by slug
   */
  static findCategoryBySlug(tree, slug) {
    for (const category of Object.values(tree)) {
      if (category.slug === slug) {
        return category;
      }
      if (Object.keys(category.children).length > 0) {
        const found = this.findCategoryBySlug(category.children, slug);
        if (found) return found;
      }
    }
    return null;
  }

  /**
   * Get category path for breadcrumb navigation
   */
  static getCategoryPath(categorySlug, tree) {
    const path = [];
    
    const findPath = (currentTree, targetSlug, currentPath = []) => {
      for (const category of Object.values(currentTree)) {
        const newPath = [...currentPath, {
          name: category.name,
          slug: category.slug
        }];

        if (category.slug === targetSlug) {
          return newPath;
        }

        if (Object.keys(category.children).length > 0) {
          const found = findPath(category.children, targetSlug, newPath);
          if (found) return found;
        }
      }
      return null;
    };

    return findPath(tree, categorySlug) || [];
  }

  /**
   * Search categories by name
   */
  static searchCategories(query, tree) {
    const results = [];
    const searchTerm = query.toLowerCase();

    const search = (currentTree) => {
      Object.values(currentTree).forEach(category => {
        if (category.name.toLowerCase().includes(searchTerm)) {
          results.push({
            name: category.name,
            slug: category.slug,
            fullPath: category.fullPath,
            count: category.count,
            level: category.level
          });
        }

        if (Object.keys(category.children).length > 0) {
          search(category.children);
        }
      });
    };

    search(tree);
    return results;
  }

  /**
   * Get all products for a category (including subcategories)
   */
  static getProductsForCategory(categorySlug, tree, products) {
    const category = this.findCategoryBySlug(tree, categorySlug);
    if (!category) return [];

    const productIds = new Set(category.productIds);

    // Recursively collect product IDs from subcategories
    const collectProductIds = (currentTree) => {
      Object.values(currentTree).forEach(cat => {
        cat.productIds.forEach(id => productIds.add(id));
        if (Object.keys(cat.children).length > 0) {
          collectProductIds(cat.children);
        }
      });
    };

    if (Object.keys(category.children).length > 0) {
      collectProductIds(category.children);
    }

    // Return actual product objects
    return products.filter(p => productIds.has(p.id));
  }

  /**
   * Filter products by multiple category slugs
   */
  static filterProductsByCategories(categorySlugs, tree, products) {
    if (!categorySlugs || categorySlugs.length === 0) {
      return products;
    }

    const allProductIds = new Set();

    categorySlugs.forEach(slug => {
      const categoryProducts = this.getProductsForCategory(slug, tree, products);
      categoryProducts.forEach(p => allProductIds.add(p.id));
    });

    return products.filter(p => allProductIds.has(p.id));
  }
}

export default CategoryParser;