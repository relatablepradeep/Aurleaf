import { useState, useEffect } from 'react';

const MiniShop = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  
  // Sample product data
  const products = [
    {
      id: 1,
      name: "Asthma Relief Inhaler",
      image: "/api/placeholder/200/240", 
      description: "Fast-acting relief for asthma symptoms. Provides immediate breathing support for asthma patients.",
      rating: 4.8,
      price: 24.99,
    },
    {
      id: 2,
      name: "Clear Skin Facewash",
      image: "/api/placeholder/200/240",
      description: "Advanced formula that helps remove pimples and prevents breakouts. Contains salicylic acid.",
      rating: 4.5,
      price: 16.99,
    },
    {
      id: 3,
      name: "Digital Blood Pressure Monitor",
      image: "/api/placeholder/200/240",
      description: "Accurate and easy-to-use blood pressure monitor for home use. Stores up to 60 readings.",
      rating: 4.7,
      price: 39.99,
    },
  ];

  // Auto-change products every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProductIndex((prevIndex) => 
        prevIndex === products.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);
    
    return () => clearInterval(interval);
  }, [products.length]);

  const product = products[currentProductIndex];
  
  // Function to render stars based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-xl">
            {i < fullStars ? "★" : i === fullStars && hasHalfStar ? "½" : "☆"}
          </span>
        ))}
        <span className="ml-2 text-sm">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="w-full p-4 mx-auto bg-white rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row w-full">
        {/* Product Image (Left side) */}
        <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.name}
            className="max-h-64 object-contain"
          />
        </div>
        
        {/* Product Details (Right side) */}
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="mb-4 text-yellow-500">
              {renderStars(product.rating)}
            </div>
            <p className="text-xl font-bold mb-4">${product.price.toFixed(2)}</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2">
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded">
              Add to Cart
            </button>
            <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      
      {/* Product Slider Indicators */}
      <div className="mt-6 flex justify-center">
        {products.map((_, index) => (
          <button
            key={index}
            className={`mx-1 w-3 h-3 rounded-full ${
              index === currentProductIndex ? "bg-blue-600" : "bg-gray-300"
            }`}
            onClick={() => setCurrentProductIndex(index)}
            aria-label={`View product ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MiniShop;