import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import disease_data from './disease_data.json';
import { useNavigate } from 'react-router';

export default function Fitness() {
  const [diseasesData, setDiseasesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDiseases, setFilteredDiseases] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      setLoading(true);
      setDiseasesData(disease_data);
      setFilteredDiseases(disease_data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load disease data');
      setLoading(false);
      console.error('Error loading disease data:', err);
    }
  }, []);

  useEffect(() => {
    if (!diseasesData.length) return;

    if (searchTerm === '') {
      setFilteredDiseases(diseasesData);
    } else {
      const filtered = diseasesData.filter((disease) =>
        (disease.alt_text?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          disease.disease_name?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredDiseases(filtered);
    }
  }, [searchTerm, diseasesData]);

  const handleCardClick = (disease) => {
    navigate(`/fitness/${encodeURIComponent(disease.alt_text || disease.disease_name)}`);
  };

  // Handle click outside suggestions
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Stop propagation on suggestion click
  const handleSuggestionClick = (e, disease) => {
    e.stopPropagation();
    setShowSuggestions(false);
    navigate(`/fitness/${encodeURIComponent(disease.alt_text || disease.disease_name)}`);
  };

  // Stop propagation on search input click
  const handleSearchClick = (e) => {
    e.stopPropagation();
    setShowSuggestions(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-amber-50 font-serif">
        <div className="animate-pulse flex flex-col items-center p-8 bg-white rounded-lg shadow-md">
          <div className="h-16 w-16 bg-amber-200 rounded-full mb-6 animate-spin"></div>
          <div className="h-6 w-64 bg-amber-100 rounded mb-4"></div>
          <div className="h-4 w-48 bg-amber-50 rounded mb-2"></div>
          <div className="h-4 w-32 bg-amber-50 rounded"></div>
          <div className="mt-6 text-amber-600">Loading Ayurvedic remedies...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-amber-50 font-serif">
        <div className="text-center p-8 bg-red-50 rounded-lg shadow-lg max-w-md">
          <div className="text-red-600 text-6xl mb-4">⚠</div>
          <h2 className="text-2xl font-bold text-red-700 mb-4">Error Loading Data</h2>
          <p className="text-amber-900 text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 lg:p-12 font-serif bg-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 opacity-0 animate-fadeIn animation-delay-100">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-amber-800 mb-4">Ayurvedic Remedies</h1>
          <p className="text-lg md:text-xl text-amber-700 max-w-3xl mx-auto">
            Discover ancient wisdom for modern healing through our comprehensive collection of Ayurvedic remedies.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 md:mb-12 relative max-w-3xl mx-auto opacity-0 animate-fadeIn animation-delay-200">
          <div 
            className="flex items-center bg-white shadow-md rounded-lg py-3 px-4 transition-all duration-300 hover:shadow-lg border-2 border-amber-200 focus-within:border-amber-400"
            onClick={handleSearchClick}
          >
            <Search className="text-amber-500 w-7 h-7 mr-3" />
            <input
              type="text"
              placeholder="Search Ayurvedic remedies..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onClick={handleSearchClick}
              className="flex-grow outline-none text-lg md:text-xl bg-transparent text-amber-900 placeholder-amber-400"
            />
          </div>

          {showSuggestions && (
            <div className="absolute z-10 bg-white w-full mt-2 rounded-lg shadow-xl max-h-80 overflow-auto border-2 border-amber-100">
              {filteredDiseases.length > 0 ? (
                filteredDiseases.slice(0, 10).map((disease, index) => (
                  <div
                    key={index}
                    className="p-3 hover:bg-amber-50 cursor-pointer flex items-center border-b border-amber-100 last:border-0 transition-all duration-200"
                    onClick={(e) => handleSuggestionClick(e, disease)}
                  >
                    <img
                      src={disease.image_url || '/api/placeholder/60/60'}
                      alt={disease.alt_text || 'Ayurvedic Remedy'}
                      className="w-10 h-10 object-cover rounded-full border-2 border-amber-200 mr-3"
                      onError={(e) => {
                        e.target.src = '/api/placeholder/60/60';
                      }}
                    />
                    <div>
                      <span className="text-amber-800 font-medium text-lg">{disease.alt_text || 'Unnamed Remedy'}</span>
                      {disease.disease_name && (
                        <p className="text-amber-600 text-sm">{disease.disease_name}</p>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-amber-600 text-center">
                  No remedies found. Try a different search term.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Disease Cards (hidden while suggestions are open) */}
        {!showSuggestions && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8 relative isolate">
            {filteredDiseases.map((disease, index) => (
              <div
                key={index}
                onClick={() => handleCardClick(disease)}
                className={`group relative z-0 flex flex-col border-2 rounded-xl p-4 md:p-5 lg:p-6 cursor-pointer bg-gradient-to-br from-amber-100 to-amber-50 shadow-lg 
                  hover:shadow-2xl transform hover:-translate-y-3 transition-transform duration-500 ease-in-out border-amber-400
                  hover:z-10`}
                style={{ animationDelay: `${100 + index * 75}ms`, animationDuration: '800ms', animationFillMode: 'forwards' }}
              >
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0 overflow-hidden rounded-full ring-2 ring-amber-300 ring-offset-2">
                    <img
                      src={disease.image_url || '/api/placeholder/100/100'}
                      alt={disease.alt_text || 'Ayurvedic Remedy'}
                      className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full shadow-lg transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-6"
                      onError={(e) => {
                        e.target.src = '/api/placeholder/100/100';
                      }}
                    />
                  </div>
                  <div className="ml-4 flex-grow">
                    <h2 className="font-bold text-lg md:text-2xl text-amber-900 transition-colors duration-300 group-hover:text-amber-700">{disease.alt_text || 'Unnamed Remedy'}</h2>
                    <div className="text-sm md:text-md mt-1 text-amber-700 font-medium">
                      {disease.disease_name || 'Traditional remedy'}
                    </div>
                  </div>
                </div>
                {disease.brief_text && (
                  <p className="text-amber-800 text-sm md:text-md mt-2 line-clamp-3 transition-opacity duration-300 group-hover:opacity-90">{disease.brief_text}</p>
                )}
                {disease.symptoms && disease.symptoms.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1 md:gap-2">
                    {disease.symptoms.slice(0, 3).map((symptom, idx) => (
                      <span key={idx} className="bg-amber-200 text-amber-900 text-xs px-2 py-1 rounded-lg transition-transform duration-300 group-hover:scale-105 group-hover:bg-amber-300">
                        {symptom.length > 20 ? symptom.substring(0, 20) + '...' : symptom}
                      </span>
                    ))}
                    {disease.symptoms.length > 3 && (
                      <span className="bg-amber-300 text-amber-900 text-xs px-2 py-1 rounded-lg transition-transform duration-300 group-hover:scale-105 group-hover:bg-amber-400">
                        +{disease.symptoms.length - 3} more
                      </span>
                    )}
                  </div>
                )}
                <div className="mt-auto pt-4 text-right">
                  <span className="text-amber-600 text-sm md:text-md font-semibold transition-colors duration-300 group-hover:text-amber-800 group-hover:underline">View Details →</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results (also hidden while suggestions are open) */}
        {!showSuggestions && filteredDiseases.length === 0 && searchTerm && (
          <div className="text-center py-16 opacity-0 animate-fadeIn animation-delay-300">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold text-amber-800 mb-3">No Remedies Found</h3>
            <p className="text-amber-700 text-lg max-w-lg mx-auto">
              We couldn't find any Ayurvedic remedies matching "{searchTerm}". 
              Try a different search term or browse our complete collection.
            </p>
            <button 
              onClick={() => setSearchTerm('')} 
              className="mt-6 px-5 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-all duration-300"
            >
              View All Remedies
            </button>
          </div>
        )}
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
        .animate-fadeUp {
          animation: fadeUp 0.5s ease-out forwards;
        }
        .animation-delay-100 {
          animation-delay: 100ms;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  );
}