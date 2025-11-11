import React from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingCart, Star, Check, Minus } from 'lucide-react';
import { useComparison } from '../context/ComparisonContext';
import { useCart } from '../context/CartContext';

const ComparisonPage = () => {
  const { comparisonItems, removeFromComparison, clearComparison } = useComparison();
  const { addToCart } = useCart();

  if (comparisonItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Nu ai produse de comparat
          </h2>
          <p className="text-gray-600 mb-6">
            Adaugă produse pentru a le compara
          </p>
          <Link to="/shop" className="btn-primary">
            Mergi la magazin
          </Link>
        </div>
      </div>
    );
  }

  const allSpecs = Array.from(
    new Set(
      comparisonItems.flatMap(item => 
        item.specifications?.map(spec => spec.key) || []
      )
    )
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-elegant font-bold text-gray-900 mb-4">
              Compară produse
            </h1>
            <p className="text-lg text-gray-600">
              Compari {comparisonItems.length} {comparisonItems.length === 1 ? 'produs' : 'produse'}
            </p>
          </div>
          {comparisonItems.length > 0 && (
            <button
              onClick={clearComparison}
              className="btn-secondary"
            >
              Șterge toate
            </button>
          )}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="p-4 text-left text-sm font-medium text-gray-700 bg-gray-50 sticky left-0 z-10">
                  Caracteristică
                </th>
                {comparisonItems.map(product => (
                  <th key={product.id} className="p-4 min-w-[250px]">
                    <div className="space-y-4">
                      {/* Product Image */}
                      <div className="relative">
                        <Link to={`/product/${product.slug}`}>
                          <div className="aspect-square bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg flex items-center justify-center">
                            <div className="text-6xl">🎨</div>
                          </div>
                        </Link>
                        <button
                          onClick={() => removeFromComparison(product.id)}
                          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>

                      {/* Product Info */}
                      <div className="text-left">
                        <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
                        <Link to={`/product/${product.slug}`}>
                          <h3 className="text-sm font-semibold text-gray-900 hover:text-beauty-pink transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Price Row */}
              <tr className="border-b border-gray-200">
                <td className="p-4 text-sm font-medium text-gray-700 bg-gray-50 sticky left-0">
                  Preț
                </td>
                {comparisonItems.map(product => (
                  <td key={product.id} className="p-4 text-center">
                    <div className="space-y-1">
                      <p className="text-xl font-bold text-beauty-pink">
                        {product.price.toFixed(2)} lei
                      </p>
                      {product.originalPrice && (
                        <p className="text-sm text-gray-500 line-through">
                          {product.originalPrice.toFixed(2)} lei
                        </p>
                      )}
                    </div>
                  </td>
                ))}
              </tr>

              {/* Rating Row */}
              <tr className="border-b border-gray-200">
                <td className="p-4 text-sm font-medium text-gray-700 bg-gray-50 sticky left-0">
                  Rating
                </td>
                {comparisonItems.map(product => (
                  <td key={product.id} className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-4 h-4 text-beauty-gold fill-current" />
                      <span className="font-medium">{product.rating}</span>
                      <span className="text-sm text-gray-500">({product.reviewCount})</span>
                    </div>
                  </td>
                ))}
              </tr>

              {/* Stock Row */}
              <tr className="border-b border-gray-200">
                <td className="p-4 text-sm font-medium text-gray-700 bg-gray-50 sticky left-0">
                  Disponibilitate
                </td>
                {comparisonItems.map(product => (
                  <td key={product.id} className="p-4 text-center">
                    {product.inStock ? (
                      <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                        <Check className="w-4 h-4" />
                        În stoc
                      </span>
                    ) : (
                      <span className="text-red-600 font-medium">Stoc epuizat</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Category Row */}
              <tr className="border-b border-gray-200">
                <td className="p-4 text-sm font-medium text-gray-700 bg-gray-50 sticky left-0">
                  Categorie
                </td>
                {comparisonItems.map(product => (
                  <td key={product.id} className="p-4 text-center text-sm text-gray-600">
                    {product.subcategory || product.category}
                  </td>
                ))}
              </tr>

              {/* Specifications Rows */}
              {allSpecs.map(specKey => (
                <tr key={specKey} className="border-b border-gray-200">
                  <td className="p-4 text-sm font-medium text-gray-700 bg-gray-50 sticky left-0">
                    {specKey}
                  </td>
                  {comparisonItems.map(product => {
                    const spec = product.specifications?.find(s => s.key === specKey);
                    return (
                      <td key={product.id} className="p-4 text-center text-sm text-gray-600">
                        {spec ? spec.value : <Minus className="w-4 h-4 text-gray-300 mx-auto" />}
                      </td>
                    );
                  })}
                </tr>
              ))}

              {/* Action Row */}
              <tr>
                <td className="p-4 text-sm font-medium text-gray-700 bg-gray-50 sticky left-0">
                  Acțiuni
                </td>
                {comparisonItems.map(product => (
                  <td key={product.id} className="p-4">
                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg font-medium transition-all ${
                        product.inStock
                          ? 'btn-primary'
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {product.inStock ? 'Adaugă în coș' : 'Stoc epuizat'}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Add More Products */}
        {comparisonItems.length < 4 && (
          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">
              Poți adăuga până la {4 - comparisonItems.length} produse în plus
            </p>
            <Link to="/shop" className="btn-secondary">
              Adaugă mai multe produse
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComparisonPage;