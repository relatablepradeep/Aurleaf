import { useState, useEffect } from 'react';
import inhaler from '../../Assets/inhaler.jpg'
import blood from '../../Assets/download.jpeg'
import face from '../../Assets/face.jpg'

const MiniShop = () => {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  
  const products = [
    {
      id: 1,
      name: "Asthma Relief Inhaler",
      image: inhaler, 
      description: "Fast-acting relief for asthma symptoms. Provides immediate breathing support for asthma patients.",
      rating: 4.8,
      price: 24.99,
    },
    {
      id: 2,
      name: "Clear Skin Facewash",
      image: face,
      description: "Advanced formula that helps remove pimples and prevents breakouts. Contains salicylic acid.",
      rating: 4.5,
      price: 16.99,
    },
    {
      id: 3,
      name: "Digital Blood Pressure Monitor",
      image: blood,
      description: "Accurate and easy-to-use blood pressure monitor for home use. Stores up to 60 readings.",
      rating: 4.7,
      price: 39.99,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProductIndex((prevIndex) => 
        prevIndex === products.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);
    
    return () => clearInterval(interval);
  }, [products.length]);

  const product = products[currentProductIndex];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-xl text-yellow-400">
            {i < fullStars ? "★" : i === fullStars && hasHalfStar ? "½" : "☆"}
          </span>
        ))}
        <span className="ml-2 text-sm text-gray-300">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="w-full flex justify-center items-center py-16  bg-gradient-to-t from-gray-950 via-gray-800 to-transparent">
      <div className="w-full max-w-4xl p-6 bg-gray-900 rounded-lg shadow-lg text-gray-100">
        <div className="flex flex-col md:flex-row w-full">
         
          <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.name}
              className="max-h-64 object-contain rounded-lg shadow-md"
            />
          </div>
          
         
          <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-green-400 mb-2">{product.name}</h2>
              <p className="text-gray-300 mb-4">{product.description}</p>
              <div className="mb-4">
                {renderStars(product.rating)}
              </div>
              <p className="text-xl font-bold text-green-400 mb-4">${product.price.toFixed(2)}</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <button className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded transition-all duration-300">
                Add to Cart
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition-all duration-300">
                Buy Now
              </button>
            </div>
          </div>
        </div>
        
     
        <div className="mt-6 flex justify-center">
          {products.map((_, index) => (
            <button
              key={index}
              className={`mx-1 w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentProductIndex ? "bg-green-500" : "bg-gray-500"
              }`}
              onClick={() => setCurrentProductIndex(index)}
              aria-label={`View product ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MiniShop;
