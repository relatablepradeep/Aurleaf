import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import disease_data from "../Ayufit/disease_data.json";

export default function StepProcess() {
  const [current, setCurrent] = useState(0);
  const [diseases, setDiseases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const sliced = disease_data.slice(0, 12);
    setDiseases(sliced);

    // Start from the center
    setCurrent(Math.floor(sliced.length / 2));

    // Auto-slide every 3 seconds
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % sliced.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (disease) => {
    navigate(
      `/fitness/${encodeURIComponent(
        disease.alt_text || disease.disease_name
      )}`
    );
  };

  return (
    <section className="relative w-full py-16 bg-gradient-to-b from-amber-50 via-yellow-50 to-amber-100 flex flex-col items-center justify-center overflow-hidden z-0">
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
        Explore Ayurvedic{" "}
        <span className="text-amber-700 border-b-4 border-amber-600 pb-1">
          Remedies
        </span>
      </h2>

      {/* Carousel Container */}
      <div className="relative w-full min-h-[380px] flex items-center justify-center overflow-hidden perspective-1000">
        {diseases.map((disease, index) => {
          const position = (index - current + diseases.length) % diseases.length;

          let transform = "";
          let opacity = 0;
          let scale = 0.9;
          let filter = "none";

          // Center Card
          if (position === 0) {
            transform = "translateX(0)";
            opacity = 1;
            scale = 1;
            filter = "none";
          }
          // Immediate Right
          else if (position === 1) {
            transform = "translateX(300px)";
            opacity = 0.7;
            scale = 0.9;
            filter = "blur(1px)";
          }
          // Immediate Left
          else if (position === diseases.length - 1) {
            transform = "translateX(-300px)";
            opacity = 0.7;
            scale = 0.9;
            filter = "blur(1px)";
          }
          // Far Right (+2)
          else if (position === 2) {
            transform = "translateX(550px)";
            opacity = 0.4;
            scale = 0.8;
            filter = "blur(3px)";
          }
          // Far Left (-2)
          else if (position === diseases.length - 2) {
            transform = "translateX(-550px)";
            opacity = 0.4;
            scale = 0.8;
            filter = "blur(3px)";
          }
          // Hidden cards
          else {
            transform = "translateX(0)";
            opacity = 0;
            scale = 0.7;
            filter = "blur(5px)";
          }

          return (
            <div
              key={index}
              className="absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-in-out"
              style={{
                transform: `${transform} scale(${scale})`,
                opacity,
                filter,
                zIndex: position === 0 ? 5 : position === 1 || position === diseases.length - 1 ? 4 : 1,
              }}
            >
              <div
                onClick={() => handleCardClick(disease)}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl cursor-pointer w-[460px] md:w-[500px] h-[300px] md:h-[320px] overflow-hidden flex flex-col border border-amber-100 transition-all"
              >
                {/* Image Section */}
                <div className="relative w-full h-[150px] md:h-[160px] overflow-hidden">
                  <img
                    src={disease.image_url || "/api/placeholder/400/300"}
                    alt={disease.alt_text || "Ayurvedic Remedy"}
                    className="w-full h-full object-cover object-center rounded-t-2xl transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-amber-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                      Natural Remedy
                    </span>
                  </div>
                </div>

                {/* Text Section */}
                <div className="flex flex-col justify-between items-center p-4 text-center flex-1">
                  <div>
                    <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                      {disease.alt_text || "Ayurvedic Treatment"}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base mb-3 line-clamp-3">
                      {disease.disease_name ||
                        "Discover holistic healing with natural Ayurvedic treatments for a balanced lifestyle."}
                    </p>
                  </div>
                  <button className="bg-amber-600 hover:bg-amber-700 text-white text-xs md:text-sm font-medium rounded-full px-5 py-2 transition-all">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-8 space-x-2">
        {diseases.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`rounded-full transition-all ${
              idx === current
                ? "bg-amber-700 w-6 h-2"
                : "bg-amber-300 w-2 h-2 hover:bg-amber-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
