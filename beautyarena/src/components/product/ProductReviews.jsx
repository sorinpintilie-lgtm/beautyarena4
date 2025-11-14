import React, { useState } from 'react';
import { Star, ThumbsUp, Check } from 'lucide-react';
import { getReviewsByProductId, getRatingDistribution } from '../../data/mockReviews';

const ProductReviews = ({ productId }) => {
  const reviews = getReviewsByProductId(productId);
  const distribution = getRatingDistribution(productId);
  const [sortBy, setSortBy] = useState('recent');

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'helpful':
        return b.helpful - a.helpful;
      case 'rating-high':
        return b.rating - a.rating;
      case 'rating-low':
        return a.rating - b.rating;
      case 'recent':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : 0;

  if (reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-600 mb-4">Acest produs nu are încă recenzii</p>
        <button className="btn-secondary">
          Fii primul care scrie o recenzie
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Overall Rating */}
        <div className="text-center md:text-left">
          <div className="text-5xl font-bold text-gray-900 mb-2">{averageRating}</div>
          <div className="flex items-center justify-center md:justify-start gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(averageRating)
                    ? 'text-beauty-peach fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-600">
            Bazat pe {totalReviews} {totalReviews === 1 ? 'recenzie' : 'recenzii'}
          </p>
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map(rating => {
            const count = distribution[rating];
            const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
            
            return (
              <div key={rating} className="flex items-center gap-2">
                <span className="text-sm text-gray-600 w-12">{rating} stele</span>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-beauty-peach rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sort Options */}
      <div className="flex items-center justify-between border-t border-b border-gray-200 py-4">
        <h3 className="font-semibold text-gray-900">
          {totalReviews} {totalReviews === 1 ? 'recenzie' : 'recenzii'}
        </h3>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-beauty-pink text-sm"
        >
          <option value="recent">Cele mai recente</option>
          <option value="helpful">Cele mai utile</option>
          <option value="rating-high">Rating descrescător</option>
          <option value="rating-low">Rating crescător</option>
        </select>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map(review => (
          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900">{review.userName}</span>
                  {review.verified && (
                    <span className="inline-flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      <Check className="w-3 h-3" />
                      Cumpărător verificat
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'text-beauty-peach fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString('ro-RO')}
                  </span>
                </div>
              </div>
            </div>

            {/* Review Content */}
            <h4 className="font-semibold text-gray-900 mb-2">{review.title}</h4>
            <p className="text-gray-600 leading-relaxed mb-3">{review.comment}</p>

            {/* Review Actions */}
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-beauty-pink transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span>Util ({review.helpful})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Write Review Button */}
      <div className="text-center pt-6 border-t border-gray-200">
        <button className="btn-secondary">
          Scrie o recenzie
        </button>
      </div>
    </div>
  );
};

export default ProductReviews;