import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Search } from "lucide-react";

const cityFiles = import.meta.glob("./data/*.json", { eager: true });

// Enhanced animation styles with smoother transitions
const animationDirections = [
  "fade-left-rotate", // first card slides from left with slight rotation
  "fade-right-rotate", // second card slides from right with opposite rotation
  "fade-down-scale", // third card comes from top with scale effect
  "fade-up-scale", // fourth card comes from bottom with scale effect
  "fade-left-flip", // fifth card slides from left with flip effect
  "fade-right-flip", // sixth card slides from right with flip effect
  "fade-zoom", // seventh card zooms in
  "fade-bounce", // eighth card bounces in
];

// Updated color themes focused on amber/gold variations
const cityColors = [
  "from-amber-400 to-yellow-300", // primary amber
  "from-amber-500 to-yellow-400", // deeper amber
  "from-amber-300 to-yellow-200", // lighter amber
  "from-amber-600 to-orange-400", // amber-orange
  "from-amber-400 to-orange-300", // warm amber
  "from-yellow-500 to-amber-300", // golden amber
];

const Ayumed = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const cardsRef = useRef([]);
  
  // Enhanced observer setup with staggered animations
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // Add staggered delay based on index
          setTimeout(() => {
            entry.target.classList.add("in-view");
          }, idx * 100); // 100ms delay between each card
        }
      });
    }, options);

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, [cities, searchTerm]);

  useEffect(() => {
    const cityNames = Object.keys(cityFiles).map((path) => {
      const fileName = path.split("/").pop();
      return fileName.replace(".json", "");
    });
    setCities(cityNames);
  }, []);

  const handleClick = (city) => {
    navigate(`/products/${encodeURIComponent(city)}`);
  };

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header with subtle animation */}
        <div className="text-center mb-10 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-amber-800 mb-3 animate-title">
            Find Ayurvedic Treatments
          </h1>
          <p className="text-base sm:text-lg text-amber-700 max-w-lg mx-auto animate-subtitle">
            Select your city to discover authentic Ayurvedic doctors and treatments near you
          </p>
        </div>

        {/* Search Bar with gentle glow effect */}
        <div className="max-w-md mx-auto mb-12 relative animate-slide-up">
          <div className="relative">
            <input
              type="text"
              placeholder="Search your city..."
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="w-full py-3 pl-12 pr-4 rounded-full border border-amber-200 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-opacity-50 shadow-md text-amber-900 transition-all duration-300"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-amber-500" />
          </div>

          {/* Search Suggestions with smooth entry */}
          {isSearchFocused && searchTerm && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-amber-100 py-2 max-h-64 overflow-y-auto animate-expand">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <div
                    key={`suggestion-${city}`}
                    className="px-4 py-2 hover:bg-amber-50 cursor-pointer transition-colors duration-200"
                    onClick={() => {
                      setSearchTerm(city);
                      handleClick(city);
                    }}
                  >
                    <span className="capitalize">{city}</span>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-amber-500 italic">
                  No cities found
                </div>
              )}
            </div>
          )}
        </div>

        {/* City Grid with enhanced animations */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {(searchTerm ? filteredCities : cities).map((city, index) => (
            <div
              key={city}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`animation-card ${animationDirections[index % animationDirections.length]} cursor-pointer transform transition-all duration-500 hover:scale-105`}
              onClick={() => handleClick(city)}
            >
              <div 
                className={`h-40 flex items-center justify-center rounded-xl shadow-lg bg-gradient-to-br ${cityColors[index % cityColors.length]} overflow-hidden card-glow transition-all duration-300 ease-in-out transform hover:scale-105`}
              >
                <h2 className="text-xl font-bold capitalize text-white tracking-wide text-shadow">
                  {city}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* No Results with fade animation */}
        {searchTerm && filteredCities.length === 0 && (
          <div className="text-center py-10 animate-fade-in">
            <p className="text-amber-600 text-lg">
              No cities found matching "{searchTerm}"
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 px-6 py-2 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition-all duration-300 hover:shadow-md"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* Enhanced CSS for animations */}
      <style jsx>{`
        @keyframes title-animation {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes subtitle-animation {
          0% { opacity: 0; transform: translateY(-10px); }
          30% { opacity: 0; }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes expand {
          0% { opacity: 0; transform: scaleY(0.8); transform-origin: top; }
          100% { opacity: 1; transform: scaleY(1); transform-origin: top; }
        }
        
        .animate-title {
          animation: title-animation 0.8s ease-out forwards;
        }
        
        .animate-subtitle {
          animation: subtitle-animation 1.2s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out 0.4s forwards;
          opacity: 0;
        }
        
        .animate-expand {
          animation: expand 0.3s ease-out forwards;
        }
        
        .animation-card {
          opacity: 0;
          transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        
        .animation-card.in-view {
          opacity: 1;
          transform: translateY(0) translateX(0) rotate(0) scale(1);
        }
        
        .fade-left-rotate {
          transform: translateX(-60px) rotate(-5deg);
        }
        
        .fade-right-rotate {
          transform: translateX(60px) rotate(5deg);
        }
        
        .fade-down-scale {
          transform: translateY(-50px) scale(0.8);
        }
        
        .fade-up-scale {
          transform: translateY(50px) scale(0.8);
        }
        
        .fade-left-flip {
          transform: translateX(-60px) rotateY(15deg);
        }
        
        .fade-right-flip {
          transform: translateX(60px) rotateY(-15deg);
        }
        
        .fade-zoom {
          transform: scale(0.7);
        }
        
        .fade-bounce {
          transform: translateY(40px);
        }
        
        .text-shadow {
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .card-glow {
          box-shadow: 0 5px 15px rgba(245, 158, 11, 0.3);
          transition: all 0.3s ease;
        }
        
        .card-glow:hover {
          box-shadow: 0 8px 25px rgba(245, 158, 11, 0.5);
        }
        
        /* Add subtle pulse animation to cards */
        @keyframes subtle-pulse {
          0% { box-shadow: 0 5px 15px rgba(245, 158, 11, 0.3); }
          50% { box-shadow: 0 8px 20px rgba(245, 158, 11, 0.5); }
          100% { box-shadow: 0 5px 15px rgba(245, 158, 11, 0.3); }
        }
        
        .animation-card.in-view .card-glow {
          animation: subtle-pulse 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Ayumed;