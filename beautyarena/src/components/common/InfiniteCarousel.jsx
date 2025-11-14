import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const InfiniteCarousel = ({ items, renderItem, autoPlay = true, interval = 3000, itemsPerView = 3, showDots = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);

  // Create extended array with clones for infinite effect
  const extendedItems = [
    ...items.slice(-itemsPerView),
    ...items,
    ...items.slice(0, itemsPerView)
  ];

  const totalItems = items.length;

  useEffect(() => {
    if (!autoPlay || isPaused || items.length === 0) return;

    const timer = setInterval(() => {
      handleNext();
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, autoPlay, isPaused, interval, items.length]);

  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
    
    if (currentIndex >= totalItems) {
      setCurrentIndex(0);
    } else if (currentIndex < 0) {
      setCurrentIndex(totalItems - 1);
    }
  };

  const getTransformValue = () => {
    const offset = currentIndex + itemsPerView;
    return `translateX(-${offset * (100 / itemsPerView)}%)`;
  };

  return (
    <div 
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Carousel Container */}
      <div className="relative">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: getTransformValue(),
            transition: isTransitioning ? 'transform 500ms ease-out' : 'none'
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {extendedItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / itemsPerView}%` }}
            >
              {renderItem(item)}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ml-2"
        aria-label="Previous"
      >
        <ChevronLeft className="w-5 h-5 text-beauty-pink" />
      </button>
      
      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 mr-2"
        aria-label="Next"
      >
        <ChevronRight className="w-5 h-5 text-beauty-pink" />
      </button>

      {/* Progress Indicators */}
      {showDots && (
        <div className="flex justify-center gap-2 mt-6">
          {items.map((_, index) => {
            const activeIndex = currentIndex < 0 ? totalItems - 1 :
                                currentIndex >= totalItems ? 0 : currentIndex;
            return (
              <button
                key={index}
                onClick={() => {
                  setIsTransitioning(true);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-8 bg-beauty-pink'
                    : 'w-2 bg-gray-300 hover:bg-beauty-pink/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default InfiniteCarousel;