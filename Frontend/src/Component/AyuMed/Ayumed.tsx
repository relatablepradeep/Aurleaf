import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Search } from "lucide-react";

const cityFiles = import.meta.glob("./data/*.json", { eager: true });

// Custom animation directions for each card position in grid
const animationDirections = [
  "fade-left", // first card comes from left
  "fade-right", // second card comes from right
  "fade-down", // third card comes from top
  "fade-up", // fourth card comes from bottom
  "fade-left", // continue pattern
  "fade-right",
  "fade-down",
  "fade-up",
];

// City color themes - for visual interest (pastel colors)
const cityColors = [
  "from-blue-400 to-cyan-300",
  "from-emerald-400 to-teal-300",
  "from-amber-400 to-yellow-300",
  "from-rose-400 to-pink-300",
  "from-violet-400 to-purple-300",
  "from-indigo-400 to-blue-300",
];

const Ayumed = () => {
  const [cities, setCities] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const cardsRef = useRef([]);
  
  // Observer setup for scroll animations
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-3">
            Find Ayurvedic Treatments
          </h1>
          <p className="text-slate-600 max-w-lg mx-auto">
            Select your city to discover authentic Ayurvedic doctors and treatments near you
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-10 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search your city..."
              value={searchTerm}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
              className="w-full py-3 pl-12 pr-4 rounded-full border border-slate-200 focus:border-blue-500 focus:outline-none shadow-md text-slate-800"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-500" />
          </div>

          {/* Search Suggestions */}
          {isSearchFocused && searchTerm && (
            <div className="absolute z-10 mt-1 w-full bg-white rounded-lg shadow-lg border border-slate-100 py-2 max-h-64 overflow-y-auto">
              {filteredCities.length > 0 ? (
                filteredCities.map((city) => (
                  <div
                    key={`suggestion-${city}`}
                    className="px-4 py-2 hover:bg-blue-50 cursor-pointer"
                    onClick={() => {
                      setSearchTerm(city);
                      handleClick(city);
                    }}
                  >
                    <span className="capitalize">{city}</span>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500 italic">
                  No cities found
                </div>
              )}
            </div>
          )}
        </div>

        {/* City Grid - Simplified Cards with Animations */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {(searchTerm ? filteredCities : cities).map((city, index) => (
            <div
              key={city}
              ref={(el) => (cardsRef.current[index] = el)}
              className={`animation-card ${animationDirections[index % animationDirections.length]} cursor-pointer transform transition-all duration-500 hover:scale-105`}
              onClick={() => handleClick(city)}
            >
              <div className={`h-36 flex items-center justify-center rounded-xl shadow-md bg-gradient-to-br ${cityColors[index % cityColors.length]} overflow-hidden`}>
                <h2 className="text-xl font-bold capitalize text-white tracking-wide">
                  {city}
                </h2>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {searchTerm && filteredCities.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">
              No cities found matching "{searchTerm}"
            </p>
            <button
              onClick={() => setSearchTerm("")}
              className="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        .animation-card {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s ease-out;
        }
        
        .animation-card.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        
        .fade-left {
          transform: translateX(-50px);
        }
        
        .fade-right {
          transform: translateX(50px);
        }
        
        .fade-up {
          transform: translateY(50px);
        }
        
        .fade-down {
          transform: translateY(-50px);
        }
        
        .fade-left.in-view,
        .fade-right.in-view,
        .fade-up.in-view,
        .fade-down.in-view {
          transform: translateX(0) translateY(0);
        }
      `}</style>
    </div>
  );
};

export default Ayumed;