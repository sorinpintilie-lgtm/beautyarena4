import { useState, useEffect } from 'react';
import { productLoader } from '../utils/productLoader';

/**
 * Custom hook for managing real products
 */
export const useRealProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const productList = await productLoader.getAllProducts();
      setProducts(productList);
    } catch (err) {
      console.error('Error loading products:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    loading,
    error,
    refreshProducts: loadProducts
  };
};

/**
 * Hook for fetching a single product by slug
 */
export const useProductBySlug = (slug) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        setError(null);
        const foundProduct = await productLoader.getProductBySlug(slug);
        setProduct(foundProduct);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  return { product, loading, error };
};

/**
 * Hook for filtering products by category
 */
export const useProductsByCategory = (category) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!category) return;
      
      try {
        setLoading(true);
        setError(null);
        const filteredProducts = await productLoader.getProductsByCategory(category);
        setProducts(filteredProducts);
      } catch (err) {
        console.error('Error fetching products by category:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return { products, loading, error };
};

/**
 * Hook for searching products
 */
export const useProductSearch = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (query) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const searchResults = await productLoader.searchProducts(query);
      setResults(searchResults);
    } catch (err) {
      console.error('Error searching products:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    loading,
    error,
    search
  };
};

/**
 * Hook for featured products
 */
export const useFeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        setError(null);
        const featuredProducts = await productLoader.getFeaturedProducts();
        setProducts(featuredProducts);
      } catch (err) {
        console.error('Error fetching featured products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return { products, loading, error };
};

export default useRealProducts;