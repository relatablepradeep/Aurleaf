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
    <div className="p-6 max-w-3xl mx-auto bg-green-50 rounded-lg shadow-lg border border-green-200">
      <div className="flex items-center mb-6">
        <img 
          src="/api/placeholder/48/48" 
          alt="Ayurvedic Logo" 
          className="h-12 w-12 mr-3"
        />
        <h1 className="text-3xl font-bold text-green-800">Ayurvedic Healthcare Finder</h1>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md border border-green-100 mb-6">
        <p className="text-green-700 italic mb-4">
          "The natural healing force within each one of us is the greatest force in getting well."
          — Hippocrates
        </p>

        {/* Specialty Dropdown with Enhanced Styling */}
        <div className="mb-4">
          <label className="block text-green-700 mb-2 font-medium">Select Specialty</label>
          <div className="relative">
            <select
              className="appearance-none w-full bg-green-50 border border-green-300 p-3 rounded-lg pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
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
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-green-700">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Pincode input with Enhanced Styling */}
        <div className="mb-6">
          <label className="block text-green-700 mb-2 font-medium">Enter Location Pincode</label>
          <input
            type="text"
            placeholder="Enter Pincode (optional)"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="w-full bg-green-50 border border-green-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
          />
        </div>

        {/* Location Status Indicator */}
        <div className="flex items-center mb-4">
          <div 
            className={`h-3 w-3 rounded-full mr-2 ${location.lat ? 'bg-green-500' : 'bg-yellow-500'} 
            ${showLocationAnimation ? 'animate-pulse' : ''}`}
          ></div>
          <span className="text-sm text-gray-600">
            {showLocationAnimation ? "Detecting location..." : 
             location.lat ? "Location detected" : "Location unavailable"}
          </span>
        </div>

        <button
          onClick={handleSearch}
          disabled={loading}
          className={`w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-102 flex justify-center items-center
          ${loading ? 'opacity-75 cursor-not-allowed' : 'hover:shadow-lg'}`}
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Searching for healing centers...
            </>
          ) : (
            "Find Ayurvedic Centers"
          )}
        </button>
      </div>

      <div className="transition-all duration-500">
        {isSearched && !loading && hospitals.length === 0 && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  No healthcare centers found in this area. Try expanding your search or changing specialties.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid gap-4 animate-fade-in">
          {hospitals.map((hospital, index) => (
            <div 
              key={hospital.id} 
              className={`bg-white border border-green-100 p-5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300
                transform hover:-translate-y-1 opacity-0 animate-fade-in`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="flex items-start">
                <div className="bg-green-100 rounded-full p-3 mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a2 2 0 012-2h2a2 2 0 012 2v5" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-xl text-green-800 mb-2">{hospital.name}</h2>
                  <div className="mb-2 flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-600">{hospital.address}</span>
                  </div>
                  <div className="mb-4 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-600">{hospital.phone}</span>
                  </div>
                  <div className="flex space-x-2">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${hospital.lat},${hospital.lon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 border border-green-300 text-sm font-medium rounded-md text-green-700 bg-white hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      View on Map
                    </a>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300">
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
      <div className="mt-8 text-center text-gray-500 text-sm border-t border-green-100 pt-4">
        <p>Promoting holistic wellness through traditional Ayurvedic healthcare</p>
        <div className="flex justify-center mt-2 space-x-4">
          <span>Balance</span>
          <span>•</span>
          <span>Harmony</span>
          <span>•</span>
          <span>Healing</span>
        </div>
      </div>

      {/* Add CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </div>
  );
};

export default Pincode;