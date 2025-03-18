import React, { useState, useEffect } from 'react';

const Appointment = () => {
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);
  
  // Sample doctor data
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      image: "/api/placeholder/200/240",
      description: "Board-certified physician with 15+ years of experience in treating respiratory conditions and chronic illnesses.",
      specialist: "Pulmonologist",
      rating: 4.9,
      location: "123 Medical Center Dr, Suite 101, New York, NY"
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      image: "/api/placeholder/200/240",
      description: "Expert dermatologist specializing in acne treatment, skin rejuvenation, and cosmetic procedures.",
      specialist: "Dermatologist",
      rating: 4.7,
      location: "456 Wellness Ave, Suite 205, New York, NY"
    },
    {
      id: 3,
      name: "Dr. Priya Patel",
      image: "/api/placeholder/200/240",
      description: "Fellowship-trained cardiologist focusing on preventive care and heart disease management.",
      specialist: "Cardiologist",
      rating: 4.8,
      location: "789 Health Blvd, Floor 3, New York, NY"
    },
  ];

  // Auto-change doctors every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDoctorIndex((prevIndex) => 
        prevIndex === doctors.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);
    
    return () => clearInterval(interval);
  }, [doctors.length]);

  const doctor = doctors[currentDoctorIndex];
  
  // Function to render stars based on rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-500 text-lg">
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
        {/* Doctor Image (Left side) */}
        <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
          <div className="relative">
            <img 
              src={doctor.image} 
              alt={doctor.name}
              className="max-h-64 object-cover rounded-full"
            />
            <div className="absolute bottom-2 right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
          </div>
        </div>
        
        {/* Doctor Details (Right side) */}
        <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-1">{doctor.name}</h2>
            <div className="mb-2 text-blue-600 font-medium">
              {doctor.specialist}
            </div>
            <p className="text-gray-600 mb-3 text-sm">{doctor.description}</p>
            <div className="mb-3">
              {renderStars(doctor.rating)}
            </div>
            <div className="flex items-start mb-4">
              <svg className="w-4 h-4 text-gray-500 mt-1 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-xs text-gray-500">{doctor.location}</p>
            </div>
          </div>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center justify-center">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call for Appointment
          </button>
        </div>
      </div>
      
      {/* Doctor Slider Indicators */}
      <div className="mt-6 flex justify-center">
        {doctors.map((_, index) => (
          <button
            key={index}
            className={`mx-1 w-3 h-3 rounded-full ${
              index === currentDoctorIndex ? "bg-blue-600" : "bg-gray-300"
            }`}
            onClick={() => setCurrentDoctorIndex(index)}
            aria-label={`View doctor ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Appointment;