import { useState, useEffect, useMemo } from "react";

// Import the product JSON (make sure the file is named `products.json`)
import productData from "./medical/amazon_medical_products.json";

const Ayumedical = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  
  const PRODUCTS_PER_PAGE = 20;

  // Process and clean product data on initial load
  useEffect(() => {
    if (Array.isArray(productData)) {
      const processedProducts = productData.map(product => {
        // Clean price strings and convert to numbers for filtering
        const priceString = product.actual_price?.replace(/[^\d.]/g, '') || "0";
        const numericPrice = parseFloat(priceString);
        
        return {
          ...product,
          numericPrice: isNaN(numericPrice) ? 0 : numericPrice
        };
      });
      
      setProducts(processedProducts);
      
      // Find maximum price for the range slider
      const highestPrice = Math.max(...processedProducts.map(p => p.numericPrice));
      setMaxPrice(Math.ceil(highestPrice / 100) * 100); // Round up to nearest 100
      setPriceRange([0, Math.ceil(highestPrice / 100) * 100]);
    } else {
      console.error("Invalid product data");
    }
  }, []);

  // Filter products based on search and price range
  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = searchTerm === "" || 
        product.title?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = product.numericPrice >= priceRange[0] && 
        product.numericPrice <= priceRange[1];
      
      return matchesSearch && matchesPrice;
    });
    
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchTerm, priceRange, products]);

  // Generate search suggestions
  useEffect(() => {
    if (searchTerm.length > 1) {
      const uniqueTitles = new Set();
      const suggestions = products
        .filter(product => 
          product.title?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .slice(0, 5)
        .map(product => {
          const title = product.title || "";
          // Find the part of the title that matches the search term
          const index = title.toLowerCase().indexOf(searchTerm.toLowerCase());
          if (index !== -1) {
            const suggestion = title.substring(index, index + 25) + (title.length > index + 25 ? "..." : "");
            if (!uniqueTitles.has(suggestion)) {
              uniqueTitles.add(suggestion);
              return suggestion;
            }
          }
          return null;
        })
        .filter(Boolean);
      
      setSearchSuggestions(suggestions);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchTerm, products]);

  // Calculate current page items
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  // Handle pagination
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo(0, 0);
    }
  };

  // Handle price range change
  const handlePriceChange = (value, end) => {
    const newRange = [...priceRange];
    newRange[end ? 1 : 0] = parseInt(value);
    setPriceRange(newRange);
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(e.target.value.length > 1);
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.replace("...", ""));
    setShowSuggestions(false);
  };

  return (
    <div className="bg-amber-50 min-h-screen">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-2">Ayurveda Products</h1>
          <p className="text-green-700">Natural healing for mind, body, and spirit</p>
        </div>

        {/* Search and Filters Section */}
        <div className="mb-8 bg-white rounded-lg shadow-md p-4">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            {/* Search Bar with Suggestions */}
            <div className="flex-1 relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Ayurvedic products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  onFocus={() => setShowSuggestions(searchTerm.length > 1)}
                  className="w-full p-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                />
                <span className="absolute right-3 top-3 text-green-600">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>
              </div>

              {/* Search Suggestions */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-green-200 rounded-md shadow-lg">
                  <ul>
                    {searchSuggestions.map((suggestion, idx) => (
                      <li 
                        key={idx} 
                        className="px-4 py-2 hover:bg-green-50 cursor-pointer border-b border-green-100 last:border-b-0"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Price Range Filter */}
            <div className="md:w-1/3">
              <label className=" block mb-2 font-medium text-green-800">Price Range</label>
              <div className="flex items-center gap-2">
                <div className="flex items-center border border-green-300 rounded p-2 w-1/2">
                  <span className="text-green-700 mr-1">₹</span>
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(e.target.value, false)}
                    min="0"
                    max={priceRange[1]}
                    className="w-full outline-none"
                  />
                </div>
                <span className="text-green-700">to</span>
                <div className="flex items-center border border-green-300 rounded p-2 w-1/2">
                  <span className="text-green-700 mr-1">₹</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(e.target.value, true)}
                    min={priceRange[0]}
                    max={maxPrice}
                    className="w-full outline-none"
                  />
                </div>
              </div>
              <div className="mt-2 px-2">
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e.target.value, true)}
                  className="w-full accent-green-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results and View Toggle */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <p className="text-green-700 mb-2 md:mb-0">
            Showing {currentProducts.length} of {filteredProducts.length} products
          </p>
          
          {/* View Toggle Button */}
          <div className="flex items-center border border-green-300 rounded-lg">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1 rounded-l-lg ${viewMode === "grid" ? "bg-green-600 text-white" : "bg-white text-green-700"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1 rounded-r-lg ${viewMode === "list" ? "bg-green-600 text-white" : "bg-white text-green-700"}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Products Grid/List */}
        {currentProducts.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto text-green-600 mb-4">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <h2 className="text-xl font-semibold text-green-800 mb-2">No products found</h2>
            <p className="text-green-700">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className={viewMode === "grid" 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" 
            : "flex flex-col gap-4"
          }>
            {currentProducts.map((item, idx) => (
              viewMode === "grid" ? (
                <div key={idx} className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden">
                  <div className="relative bg-amber-50 p-4 h-48 flex items-center justify-center">
                    <img
                      src={item.image_url || "/api/placeholder/180/180"}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="text-md font-medium text-green-800 line-clamp-2 h-12">{item.title}</h2>
                    
                    {item.rating && (
                      <div className="flex items-center my-2">
                        <div className="text-amber-500 flex">
                          {Array(5).fill(0).map((_, i) => (
                            <span key={i}>
                              {parseFloat(item.rating) >= i + 1 ? "★" : "☆"}
                            </span>
                          ))}
                        </div>
                        <span className="ml-1 text-gray-600 text-sm">{item.rating}</span>
                      </div>
                    )}
                    
                    <p className="text-green-700 font-bold mt-2 text-lg">{item.actual_price}</p>
                    
                    <a
                      href={item.price_link}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="block w-full text-center mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              ) : (
                <div key={idx} className="bg-white rounded-lg shadow-md hover:shadow-lg transition flex flex-col md:flex-row overflow-hidden">
                  <div className="md:w-1/4 bg-amber-50 p-4 flex items-center justify-center">
                    <img
                      src={item.image_url || "/api/placeholder/120/120"}
                      alt={item.title}
                      className="max-h-32 md:max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div className="md:w-3/4 p-4 flex flex-col md:flex-row">
                    <div className="flex-1">
                      <h2 className="text-lg font-medium text-green-800">{item.title}</h2>
                      
                      {item.rating && (
                        <div className="flex items-center my-2">
                          <div className="text-amber-500 flex">
                            {Array(5).fill(0).map((_, i) => (
                              <span key={i}>
                                {parseFloat(item.rating) >= i + 1 ? "★" : "☆"}
                              </span>
                            ))}
                          </div>
                          <span className="ml-1 text-gray-600 text-sm">{item.rating}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 md:mt-0 md:ml-4 flex flex-col items-end justify-between">
                      <p className="text-green-700 font-bold text-xl">{item.actual_price}</p>
                      
                      <a
                        href={item.price_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-center mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                      >
                        Buy Now
                      </a>
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
              >
                &laquo; Prev
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`w-8 h-8 flex items-center justify-center rounded-full ${currentPage === pageNum ? 'bg-green-600 text-white' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-green-100 text-green-700 hover:bg-green-200'}`}
              >
                Next &raquo;
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ayumedical;