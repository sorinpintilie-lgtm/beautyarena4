import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
      {/* Image skeleton */}
      <div className="aspect-square bg-gray-200 rounded-lg mb-4"></div>
      
      {/* Content skeleton */}
      <div className="space-y-3">
        {/* Brand and rating */}
        <div className="flex items-center justify-between">
          <div className="h-3 bg-gray-200 rounded w-20"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
        
        {/* Title */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
        
        {/* Price */}
        <div className="h-6 bg-gray-200 rounded w-24"></div>
        
        {/* Button */}
        <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;