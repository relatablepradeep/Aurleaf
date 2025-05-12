import { useEffect, useState, useRef } from "react";
import productsData from "../Ayumedical/medical/amazon_medical_products.json"; // adjust the path if needed

function MiniShop() {
  const [products, setProducts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(2);
  const rotationTimerRef = useRef(null);
  const autoRotateRef = useRef(true);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    setProducts(productsData.slice(0, 7));

    // Handle window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    rotationTimerRef.current = setInterval(() => {
      if (autoRotateRef.current) {
        setActiveIndex((prev) => (prev + 1) % products.length);
      }
    }, 3000);

    return () => {
      clearInterval(rotationTimerRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [products.length]);

  const handleCardInteraction = (index) => {
    autoRotateRef.current = false;
    setActiveIndex(index);

    clearTimeout(rotationTimerRef.current);
    rotationTimerRef.current = setTimeout(() => {
      autoRotateRef.current = true;
    }, 8000);
  };

  const getCardStyle = (index) => {
    const isCenterCard = index === activeIndex;
    const distanceFromCenter = Math.abs(index - activeIndex);
    const productsCount = products.length;
    const wrappedDistance = Math.min(distanceFromCenter, productsCount - distanceFromCenter);

    let transform = '';
    let zIndex = 10 - wrappedDistance;
    let opacity = 1;

    // Adjust translation values based on screen size
    const xTranslationFactor = windowWidth < 768 ? 25 : windowWidth < 1024 ? 30 : 40;
    const yTranslationFactor = windowWidth < 768 ? 5 : 10;
    const scaleFactor = windowWidth < 768 ? 0.07 : 0.1;

    if (wrappedDistance > 0) {
      let direction = index < activeIndex ? -1 : 1;
      if (distanceFromCenter > productsCount - distanceFromCenter) {
        direction *= -1;
      }
      
      // Only show a limited number of cards on smaller screens
      if (windowWidth < 640 && wrappedDistance > 1) {
        opacity = 0;
        zIndex = -1;
      } else {
        transform = `translateX(${direction * (wrappedDistance * xTranslationFactor)}%) translateY(${wrappedDistance * yTranslationFactor}%) scale(${1 - wrappedDistance * scaleFactor})`;
        opacity = 1 - (wrappedDistance * 0.2);
      }
    } else {
      transform = 'translateY(-5%) scale(1.08)';
      zIndex = 20;
    }

    return {
      transform,
      zIndex,
      opacity,
      transition: 'all 0.6s ease-in-out'
    };
  };

  // Calculate card width based on screen size
  const getCardWidth = () => {
    if (windowWidth < 640) return 'min-w-[200px] max-w-[200px]';
    if (windowWidth < 768) return 'min-w-[220px] max-w-[220px]';
    return 'min-w-[250px] max-w-[250px]';
  };

  return (
    <div className="w-full max-w-6xl px-4 sm:px-6 mx-auto text-center overflow-hidden">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-8 sm:mb-14 text-amber-900 font-['Georgia'] relative inline-block">
        <span>🌿 Featured Health Products</span>
        <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 rounded-full"></span>
      </h2>

      <div className="relative h-80 sm:h-96 mb-6 sm:mb-10">
        <div className="absolute inset-0 flex justify-center items-center">
          {products.map((product, index) => (
            <div
              key={product.asin || index}
              onClick={() => handleCardInteraction(index)}
              className={`absolute cursor-pointer ${getCardWidth()} flex-shrink-0 rounded-2xl shadow-md p-3 sm:p-4 bg-gradient-to-b from-white via-amber-50 to-white border border-amber-100 hover:shadow-xl`}
              style={getCardStyle(index)}
            >
              <div className="relative overflow-hidden rounded-lg mb-2 sm:mb-3">
                <img
                  src={product.image_url || '/api/placeholder/250/150'}
                  alt={product.title}
                  className="h-32 sm:h-40 w-full object-contain rounded-md mb-2 transition-transform duration-500 ease-in-out hover:scale-105"
                />
                {index === activeIndex && (
                  <div className="absolute top-0 right-0 bg-amber-600 text-white text-xs px-2 py-1 rounded-bl-md shadow">
                    Featured
                  </div>
                )}
              </div>
              <h3 className="text-sm sm:text-md font-semibold line-clamp-2 text-amber-900 font-['Georgia']">{product.title}</h3>
              <p className="text-amber-700 font-bold mt-1">{product.actual_price}</p>
              <div className="flex items-center mt-1">
                <span className="text-amber-700 text-xs sm:text-sm">{product.rating}</span>
                <div className="ml-1 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill={i < Math.floor(parseFloat(product.rating)) ? "#D97706" : "#FDE68A"}
                      className="w-3 h-3 sm:w-4 sm:h-4"
                    >
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
              </div>
              {index === activeIndex && (
                <a
                  href={product.price_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 sm:mt-3 inline-block w-full py-1 sm:py-2 text-center bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors text-sm sm:text-base font-semibold font-['Georgia']"
                  onClick={(e) => e.stopPropagation()}
                >
                  View on Amazon
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center gap-1 sm:gap-2">
        {products.map((_, idx) => (
          <button
            key={idx}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              idx === activeIndex ? 'bg-amber-800 w-4 sm:w-6' : 'bg-amber-300 hover:bg-amber-500'
            }`}
            onClick={() => handleCardInteraction(idx)}
            aria-label={`View product ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MiniShop;