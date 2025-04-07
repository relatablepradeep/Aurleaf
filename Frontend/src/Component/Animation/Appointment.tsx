import { useState, useEffect } from 'react';
import image1 from '../../Assets/image (1).jpg'
import image2 from '../../Assets/image (2).jpg'
import image3 from '../../Assets/image.jpg'

const Appointment = () => {
  const [currentDoctorIndex, setCurrentDoctorIndex] = useState(0);
  
  const doctors = [
    {
      id: 1,
      name: "Dr. Arjun Sharma",
      image: image3,
      description: "Certified Ayurvedic practitioner with 20+ years of experience in holistic healing and natural therapies.",
      specialist: "Ayurvedic Specialist",
      rating: 4.9,
      location: "123 Wellness Street, Delhi, India"
    },
    {
      id: 2,
      name: "Dr. Meera Kapoor",
      image: image1,
      description: "Expert in Panchakarma therapy and Ayurvedic diet planning for chronic diseases.",
      specialist: "Panchakarma Specialist",
      rating: 4.8,
      location: "456 Ayurveda Avenue, Mumbai, India"
    },
    {
      id: 3,
      name: "Dr. Rajesh Verma",
      image: image2,
      description: "Specialist in Ayurvedic treatments for skin disorders and natural wellness therapies.",
      specialist: "Ayurvedic Dermatologist",
      rating: 4.7,
      location: "789 Holistic Lane, Bangalore, India"
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDoctorIndex((prevIndex) => 
        prevIndex === doctors.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);
    
    return () => clearInterval(interval);
  }, [doctors.length]);

  const doctor = doctors[currentDoctorIndex];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-lg">
            {i < fullStars ? "★" : i === fullStars && hasHalfStar ? "½" : "☆"}
          </span>
        ))}
        <span className="ml-2 text-sm text-gray-300">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="w-full flex justify-center items-center py-16   bg-gradient-to-t from-black via-gray-800 to-transparent">
      <div className="w-full max-w-4xl p-6 bg-gray-900 rounded-lg shadow-lg text-gray-100">
        <div className="flex flex-col md:flex-row w-full">
         
          <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
            <div className="relative">
              <img 
                src={doctor.image} 
                alt={doctor.name}
                className="max-h-64 object-cover rounded-lg shadow-md"
              />
              <div className="absolute bottom-2 right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
            </div>
          </div>
          
        
          <div className="w-full md:w-1/2 p-4 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-bold text-green-400 mb-2">{doctor.name}</h2>
              <div className="mb-2 text-green-300 font-medium">
                {doctor.specialist}
              </div>
              <p className="text-gray-300 mb-3 text-sm">{doctor.description}</p>
              <div className="mb-3">
                {renderStars(doctor.rating)}
              </div>
              <div className="flex items-start mb-4">
                <svg className="w-4 h-4 text-gray-400 mt-1 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-xs text-gray-400">{doctor.location}</p>
              </div>
            </div>
            
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md flex items-center justify-center transition-all duration-300">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call for Appointment
            </button>
          </div>
        </div>
        
    
        <div className="mt-6 flex justify-center">
          {doctors.map((_, index) => (
            <button
              key={index}
              className={`mx-1 w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentDoctorIndex ? "bg-green-500" : "bg-gray-500"
              }`}
              onClick={() => setCurrentDoctorIndex(index)}
              aria-label={`View doctor ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
