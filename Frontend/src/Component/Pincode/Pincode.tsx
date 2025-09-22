import React, { useEffect, useState } from "react";
import axios from "axios";

const Pincode = () => {
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [speciality, setSpeciality] = useState("");
  const [pincode, setPincode] = useState("");
  const [isSearched, setIsSearched] = useState(false);
  const [showLocationAnimation, setShowLocationAnimation] = useState(true);

  // Get user's location on load
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
        setShowLocationAnimation(false);
      },
      (err) => {
        console.error("Geolocation error:", err);
        alert("Please allow location access.");
        setShowLocationAnimation(false);
      }
    );
  }, []);

  // Convert pincode to lat/lon using OpenStreetMap Nominatim
  const fetchCoordsFromPincode = async (pin) => {
    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&postalcode=${pin}&countrycodes=in`
      );
      if (res.data.length > 0) {
        const { lat, lon } = res.data[0];
        return { lat, lon };
      }
    } catch (err) {
      console.error("Pincode location error:", err);
    }
    return null;
  };

  const handleSearch = async () => {
    setLoading(true);
    setIsSearched(true);
    let currentLoc = location;

    if (pincode) {
      const pinLoc = await fetchCoordsFromPincode(pincode);
      if (pinLoc) currentLoc = pinLoc;
    }

    if (!currentLoc.lat || !currentLoc.lon) {
      alert("Location not available.");
      setLoading(false);
      return;
    }

    const radius = 5000; // 5km

    const query = `
      [out:json];
      (
        node["amenity"="hospital"](around:${radius},${currentLoc.lat},${currentLoc.lon});
        way["amenity"="hospital"](around:${radius},${currentLoc.lat},${currentLoc.lon});
        relation["amenity"="hospital"](around:${radius},${currentLoc.lat},${currentLoc.lon});
      );
      out center tags;
    `;

    try {
      const res = await axios.post(
        "https://overpass-api.de/api/interpreter",
        query,
        { headers: { "Content-Type": "text/plain" } }
      );

      const data = res.data.elements;

      const hospitalData = data
        .filter((el) => {
          if (!speciality) return true;

          const tags = el.tags || {};
          const spec = tags["healthcare:speciality"]?.toLowerCase() || "";
          const name = tags.name?.toLowerCase() || "";

          return spec.includes(speciality.toLowerCase()) || name.includes(speciality.toLowerCase());
        })
        .map((el) => ({
          id: el.id,
          name: el.tags.name || "Unnamed Hospital",
          address:
            el.tags["addr:full"] ||
            el.tags["addr:street"] ||
            el.tags["addr:city"] ||
            "No address available",
          phone: el.tags.phone || el.tags["contact:phone"] || "No phone available",
          lat: el.lat || el.center?.lat,
          lon: el.lon || el.center?.lon,
        }));

      // Add small delay for smoother animation
      setTimeout(() => {
        setHospitals(hospitalData);
        setLoading(false);
      }, 800);
    } catch (err) {
      console.error("Overpass error:", err);
      alert("Failed to fetch hospitals.");
      setLoading(false);
    }
  };

  const ayurvedicSpecialties = [
    "Ayurvedic",
    "Panchakarma",
    "Naturopathy",
    "Herbal Medicine",
    "Yoga Therapy",
    "Meditation Center",
    "Eye",
    "Dental",
    "Cardiac",
    "Cancer",
    "Orthopedic",
    "ENT",
    "Skin",
    "Neurology",
    "General",
    "Psychiatric",
    "Maternity",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="w-full max-w-6xl mx-auto rounded-2xl shadow-2xl overflow-hidden bg-white relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 via-green-400 to-teal-300"></div>
        <div className="absolute -left-24 -top-24 w-48 h-48 rounded-full bg-green-100 opacity-50"></div>
        <div className="absolute -right-24 -bottom-24 w-48 h-48 rounded-full bg-teal-100 opacity-50"></div>
        
        <div className="md:flex">
          {/* Left sidebar with illustrations and quotes */}
          <div className="hidden lg:block lg:w-1/3 bg-gradient-to-b from-emerald-500 to-teal-600 p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-8 animate-float">
                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"></path>
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold mb-6 font-serif tracking-wide">Discover Holistic Wellness</h2>
              
              <div className="mb-12 space-y-6">
                <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm border border-white border-opacity-20 transform transition-all duration-300 hover:translate-y-1 hover:bg-opacity-20">
                  <p className="italic text-slate-900 font-bold subpixel-antialiased  text-xl text-opacity-90 font-poppins">
                    "Ayurveda is the science of life and it has a very basic, simple kind of approach, which is that we are part of the universe and the universe is intelligent and the human body is part of the cosmic body."
                  </p>
                  <p className="text-right mt-2 text-slate-500 text-opacity-70">— Deepak Chopra</p>
                </div>
                
                <div className="bg-white bg-opacity-10 p-4 rounded-lg backdrop-blur-sm border border-white border-opacity-20 transform transition-all duration-300 hover:translate-y-1 hover:bg-opacity-20">
                  <p className="italic text-slate-900 font-bold subpixel-antialiased text-xl text-opacity-90 font-poppins">
                    "When diet is wrong, medicine is of no use. When diet is correct, medicine is of no need."
                  </p>
                  <p className="text-right mt-2 text-slate-500 text-opacity-70">— Ayurvedic Proverb</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-xl mb-2">Principles of Ayurveda</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <p>Balance of Doshas</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <p>Natural Healing</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <p>Personalized Treatment</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-white"></div>
                  <p>Mind-Body Connection</p>
                </div>
              </div>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute -bottom-20 -right-20 w-40 h-40 border-4 border-white border-opacity-30 rounded-full"></div>
            <div className="absolute top-20 -right-10 w-20 h-20 border-4 border-white border-opacity-20 rounded-full"></div>
          </div>
          
          {/* Main content */}
          <div className="lg:w-2/3 p-6 md:p-12">
            <div className="flex items-center mb-8 animate-fade-in">
              <div className="w-12 h-12 mr-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-emerald-800 font-serif tracking-wide">
                Ayurvedic Healthcare Finder
              </h1>
            </div>

            <div className="bg-emerald-50 p-6 rounded-xl shadow-md border border-emerald-100 mb-8 transform transition-all duration-500 animate-fade-in-up">
              <p className="text-emerald-700 italic mb-6 font-serif text-lg border-l-4 border-emerald-300 pl-4">
                "The natural healing force within each one of us is the greatest force in getting well."
                — Hippocrates
              </p>

              {/* Specialty Dropdown with Enhanced Styling */}
              <div className="mb-6">
                <label className="block text-emerald-700 mb-2 font-medium">Select Specialty</label>
                <div className="relative group">
                  <select
                    className="appearance-none w-full bg-white border-2 border-emerald-200 p-4 rounded-lg pl-5 pr-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer text-gray-700"
                    value={speciality}
                    onChange={(e) => setSpeciality(e.target.value)}
                  >
                    <option value="">All Specialties</option>
                    {ayurvedicSpecialties.map((type) => (
                      <option key={type} value={type.toLowerCase()}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-emerald-500 group-hover:text-emerald-700 transition-colors duration-200">
                    <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></div>
                </div>
              </div>

              {/* Pincode input with Enhanced Styling */}
              <div className="mb-8">
                <label className="block text-emerald-700 mb-2 font-medium">Enter Location Pincode</label>
                <div className="relative group">
                  <input
                    type="text"
                    placeholder="Enter Pincode (optional)"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full bg-white border-2 border-emerald-200 p-4 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md text-gray-700"
                  />
                  <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-500 transition-all duration-300 group-hover:w-full"></div>
                </div>
              </div>

              {/* Location Status Indicator */}
              <div className="flex items-center mb-6 bg-white bg-opacity-70 p-3 rounded-lg">
                <div 
                  className={`h-3 w-3 rounded-full mr-3 ${location.lat ? 'bg-emerald-500' : 'bg-amber-500'} 
                  ${showLocationAnimation ? 'animate-pulse' : ''}`}
                ></div>
                <span className="text-sm text-gray-600">
                  {showLocationAnimation ? "Detecting your location..." : 
                  location.lat ? "Location successfully detected" : "Location unavailable"}
                </span>
              </div>

              <button
                onClick={handleSearch}
                disabled={loading}
                className={`w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-medium py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-102 flex justify-center items-center
                ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg hover:translate-y-1'}`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="animate-pulse">Searching for healing centers...</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Find Ayurvedic Centers
                  </>
                )}
              </button>
            </div>

            <div className="transition-all duration-500">
              {isSearched && !loading && hospitals.length === 0 && (
                <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-6 rounded-r-lg animate-fade-in-up">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-amber-700">
                        No healthcare centers found in this area. Try expanding your search or changing specialties.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid gap-6 md:grid-cols-2 animate-fade-in">
                {hospitals.map((hospital, index) => (
                  <div 
                    key={hospital.id} 
                    className={`bg-white border border-emerald-100 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-500
                      transform hover:-translate-y-2 opacity-0 animate-fade-in`}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-start">
                      <div className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full p-3 mr-4 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a2 2 0 012-2h2a2 2 0 012 2v5" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h2 className="font-semibold text-xl text-emerald-800 mb-2 font-serif">{hospital.name}</h2>
                        <div className="mb-3 flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <span className="text-gray-600">{hospital.address}</span>
                        </div>
                        <div className="mb-5 flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="text-gray-600">{hospital.phone}</span>
                        </div>
                        <div className="flex flex-wrap space-x-2">
                          <a
                            href={`https://www.google.com/maps/search/?api=1&query=${hospital.lat},${hospital.lon}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 border border-emerald-300 text-sm font-medium rounded-lg text-emerald-700 bg-white hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-300 mb-2 sm:mb-0"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                            </svg>
                            View on Map
                          </a>
                          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Contact
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer with Ayurvedic Elements */}
            <div className="mt-12 text-center text-gray-600 text-sm border-t border-emerald-100 pt-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-1 bg-gradient-to-r from-emerald-300 to-teal-400 rounded-full"></div>
              </div>
              <p className="font-serif italic">Promoting holistic wellness through traditional Ayurvedic healthcare</p>
              <div className="flex justify-center mt-4 space-x-8">
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-emerald-200 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <span>Balance</span>
                </div>
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-emerald-200 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <span>Harmony</span>
                </div>
                <div className="flex flex-col items-center group cursor-pointer">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-2 group-hover:bg-emerald-200 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <span>Healing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Poppins:wght@300;400;500;600&display=swap');
        
        body {
          font-family: 'Poppins', sans-serif;
        }
        
        .font-serif {
          font-family: 'Cormorant Garamond', serif;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default Pincode;