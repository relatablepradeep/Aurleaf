import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Heart, Activity, Zap } from 'lucide-react';
import disease_data from '../Ayufit/disease_data.json';

export default function StepProcess() {
  const [diseases, setDiseases] = useState([]);
  const [activeCardIndex, setActiveCardIndex] = useState(4); // Center card (assuming 9 cards)
  const navigate = useNavigate();
  const cardsContainerRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    setDiseases(disease_data.slice(0, 9)); // Show only 9 remedies for the ladder display
    
    // Handle window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCardClick = (disease, index) => {
    if (index === activeCardIndex) {
      navigate(`/fitness/${encodeURIComponent(disease.alt_text || disease.disease_name)}`);
    } else {
      setActiveCardIndex(index);
    }
  };

  // Calculate card positions and styles
  const getCardStyle = (index) => {
    const isCenterCard = index === activeCardIndex;
    const distanceFromCenter = Math.abs(index - activeCardIndex);
    
    // Base styles
    let transform = '';
    let zIndex = 10 - distanceFromCenter;
    let opacity = 1;
    
    // Scale factors based on screen size
    const xTranslationFactor = windowWidth < 640 ? 20 : windowWidth < 768 ? 30 : 40;
    const yTranslationFactor = windowWidth < 640 ? 3 : 5;
    const scaleFactor = windowWidth < 640 ? 0.08 : 0.1;
    
    // Hide cards that are too far from center on small screens
    if (windowWidth < 640 && distanceFromCenter > 1) {
      opacity = 0;
      zIndex = -1;
    } else if (windowWidth < 768 && distanceFromCenter > 2) {
      opacity = 0;
      zIndex = -1;
    } else if (distanceFromCenter > 0) {
      // Side cards
      const direction = index < activeCardIndex ? -1 : 1; // -1 for left, 1 for right
      transform = `translateX(${direction * (distanceFromCenter * xTranslationFactor)}%) translateY(${distanceFromCenter * yTranslationFactor}%) scale(${1 - distanceFromCenter * scaleFactor})`;
      opacity = 1 - (distanceFromCenter * 0.2);
    } else {
      // Center card
      transform = 'translateY(-5%) scale(1.05)';
      zIndex = 20;
    }
    
    return {
      transform,
      zIndex,
      opacity,
      transition: 'all 0.4s ease-out'
    };
  };

  // Process step boxes - commented out in original code but keeping for reference
  const processSteps = [
    {
      icon: <Activity className="text-amber-500" size={28} />,
      title: "Tell Us Your Condition",
      description: "Share your health concerns and symptoms with our AI"
    },
    {
      icon: <Zap className="text-amber-500" size={28} />,
      title: "Get Personalized Plan",
      description: "Receive custom Ayurvedic diet & workout recommendations"
    },
    {
      icon: <Heart className="text-amber-500" size={28} />,
      title: "Improve Your Health",
      description: "Follow the plan and track your progress over time"
    }
  ];

  // Calculate dynamic card width based on screen size
  const getCardWidth = () => {
    if (windowWidth < 640) return 'min-w-[200px]';
    if (windowWidth < 768) return 'min-w-[220px]';
    return 'min-w-[260px]';
  };

  return (
    <section className="w-full flex flex-col justify-center items-center pt-8 sm:pt-12 pb-16 sm:pb-20 bg-gradient-to-b from-amber-100 via-amber-100 to-amber-200 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-amber-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-700"></div>
      </div>
      
      {/* Main Process Steps - uncomment if needed */}
      <div className="w-full max-w-6xl px-4 mb-8 sm:mb-16">
        {/* <div className="flex flex-col md:flex-row justify-between gap-4 sm:gap-6">
          {processSteps.map((step, idx) => (
            <div 
              key={idx} 
              className="flex-1 bg-white p-4 sm:p-6 rounded-xl border border-amber-200 shadow-md transition-all duration-300 hover:shadow-lg hover:border-amber-500 relative overflow-hidden group"
              style={{
                animation: `fadeSlideUp 0.8s ease-out ${idx * 0.2}s both`
              }}
            >
              <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-amber-100 rounded-full -translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-amber-50 rounded-full border border-amber-200 inline-block relative z-10">
                {step.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-amber-800 mb-1 sm:mb-2 font-['Verdana'] relative z-10">{step.title}</h3>
              <p className="text-sm sm:text-base text-amber-700 font-['Georgia'] relative z-10">{step.description}</p>
              <div className="absolute bottom-3 right-3 text-xl sm:text-2xl font-bold text-amber-200">{idx + 1}</div>
            </div>
          ))}
        </div> */}
      </div>

      {/* Staggered Card Layout */}
      <div className="w-full max-w-6xl px-4 text-center">
        <h3 className="text-xl sm:text-2xl font-bold text-amber-800 mb-6 sm:mb-8 font-['Verdana'] relative inline-block">
          <span>Explore Ayurvedic Remedies</span>
          <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500"></span>
        </h3>
        
        <div className="relative h-80 sm:h-96 mb-8 sm:mb-16" ref={cardsContainerRef}>
          <div className="absolute inset-0 flex justify-center items-center">
            {diseases.map((disease, idx) => (
              <div
                key={idx}
                onClick={() => handleCardClick(disease, idx)}
                className={`absolute transition-all duration-300 cursor-pointer ${getCardWidth()} bg-white border border-amber-200 rounded-xl p-3 sm:p-4 shadow-md hover:shadow-xl`}
                style={getCardStyle(idx)}
              >
                <div className="relative overflow-hidden rounded-lg mb-3 sm:mb-4">
                  <img
                    src={disease.image_url || '/api/placeholder/260/150'}
                    alt={disease.alt_text || 'Remedy'}
                    className="w-full h-32 sm:h-40 object-cover rounded-lg transition-all duration-500 hover:scale-110"
                  />
                  {idx === activeCardIndex && (
                    <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 to-transparent flex items-end">
                      <span className="text-white text-xs sm:text-sm font-medium p-2 sm:p-3">View Details</span>
                    </div>
                  )}
                </div>
                <h2 className="text-base sm:text-lg font-bold text-amber-800 font-['Verdana'] line-clamp-1">{disease.alt_text || 'Unnamed Remedy'}</h2>
                <p className="text-xs sm:text-sm text-amber-700 font-['Georgia'] line-clamp-1">{disease.disease_name || 'Traditional remedy'}</p>
                {disease.symptoms?.length > 0 && idx === activeCardIndex && (
                  <div className="mt-1 sm:mt-2 flex flex-wrap gap-1">
                    {disease.symptoms.slice(0, 2).map((s, i) => (
                      <span key={i} className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">
                        {s.length > 15 ? s.substring(0, 15) + '...' : s}
                      </span>
                    ))}
                  </div>
                )}
                {idx === activeCardIndex && (
                  <button className="mt-2 sm:mt-3 w-full py-1.5 sm:py-2 bg-amber-700 text-white rounded-lg hover:bg-amber-800 transition-colors font-medium text-xs sm:text-sm">
                    Learn More
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Card Navigation Dots */}
        <div className="flex justify-center gap-1 sm:gap-2 mb-4 sm:mb-8">
          {diseases.map((_, idx) => (
            <button
              key={idx}
              className={`w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                idx === activeCardIndex ? 'bg-amber-700 w-4 sm:w-6' : 'bg-amber-300 hover:bg-amber-500'
              }`}
              onClick={() => setActiveCardIndex(idx)}
              aria-label={`View card ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}