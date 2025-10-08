import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import disease_data from '../Ayufit/disease_data.json';

export default function StepProcess() {
  const [diseases, setDiseases] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const navigate = useNavigate();
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    setDiseases(disease_data.slice(0, 12));

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardsPerView(1);
      } else if (width < 768) {
        setCardsPerView(2);
      } else if (width < 1024) {
        setCardsPerView(3);
      } else {
        setCardsPerView(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCardClick = (disease) => {
    navigate(`/fitness/${encodeURIComponent(disease.alt_text || disease.disease_name)}`);
  };

  const nextSlide = () => {
    setCurrentIndex(prev =>
      prev + cardsPerView >= diseases.length ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prev =>
      prev <= 0 ? Math.max(0, diseases.length - cardsPerView) : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const maxStartIndex = Math.max(0, diseases.length - cardsPerView);

  return (
    <section className="w-full flex flex-col justify-center items-center pt-8 sm:pt-12 pb-16 sm:pb-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-float"></div>
        <div className="absolute top-1/3 right-20 w-16 h-16 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-gradient-to-r from-orange-400 to-red-400 rounded-full mix-blend-multiply filter blur-2xl opacity-15 animate-float"></div>
      </div>

      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Explore Ayurvedic
            <span className="block bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              Remedies
            </span>
          </h2>
        </div>

        <div className="relative">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-5 h-5 text-gray-600 group-hover:text-amber-600 transition-colors" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm hover:bg-white border border-gray-200 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group"
            disabled={currentIndex + cardsPerView >= diseases.length}
          >
            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-amber-600 transition-colors" />
          </button>

          <div className="mx-12 overflow-hidden">
            <div
              ref={cardsContainerRef}
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`
              }}
            >
              {diseases.map((disease, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / cardsPerView}%` }}
                >
                  <div
                    onClick={() => handleCardClick(disease)}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-amber-200 transform hover:-translate-y-2"
                  >
                    <div className="relative overflow-hidden">
                      <div className="aspect-[4/3] relative bg-gray-100">
                        <img
                          src={disease.image_url || '/api/placeholder/1200/900'}
                          alt={disease.alt_text || 'Ayurvedic Remedy'}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="eager"
                          style={{
                            imageRendering: 'auto',
                            WebkitFontSmoothing: 'antialiased',
                            MozOsxFontSmoothing: 'grayscale'
                          }}
                          onLoad={(e) => {
                            e.target.style.opacity = '1';
                          }}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                            <ArrowRight className="w-6 h-6 text-amber-600" />
                          </div>
                        </div>
                      </div>

                      <div className="absolute top-4 left-4">
                        <span className="bg-amber-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                          Natural Remedy
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors">
                        {disease.alt_text || 'Ayurvedic Treatment'}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {disease.disease_name || 'Traditional natural healing approach for better health'}
                      </p>

                      {disease.symptoms?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {disease.symptoms.slice(0, 2).map((symptom, i) => (
                            <span
                              key={i}
                              className="bg-amber-50 text-amber-700 text-xs px-3 py-1 rounded-full border border-amber-200"
                            >
                              {symptom.length > 12 ? symptom.substring(0, 12) + '...' : symptom}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-amber-600 font-medium text-sm group-hover:text-amber-700 transition-colors">
                          Learn More
                        </span>
                        <ArrowRight className="w-4 h-4 text-amber-600 group-hover:text-amber-700 group-hover:translate-x-1 transition-all duration-200" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(diseases.length / cardsPerView) }, (_, idx) => {
            const slideIndex = idx * cardsPerView;
            return (
              <button
                key={idx}
                className={`transition-all duration-300 rounded-full ${
                  Math.floor(currentIndex / cardsPerView) === idx
                    ? 'w-8 h-2 bg-amber-600'
                    : 'w-2 h-2 bg-amber-300 hover:bg-amber-400'
                }`}
                onClick={() => goToSlide(slideIndex)}
                aria-label={`Go to slide group ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite 2s;
        }

        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }

        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        img {
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
        }
      `}</style>
    </section>
  );
}