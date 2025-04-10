import { useState, useEffect, useRef } from 'react';
import { Sparkles, Leaf, Sun, Moon, CloudFog } from 'lucide-react';

const Button = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="relative overflow-hidden px-6 py-2 md:px-8 md:py-3 bg-amber-700 text-white rounded-full font-medium tracking-wide shadow-lg hover:shadow-amber-500/50 transition-all duration-300 group text-sm md:text-base"
  >
    <span className="relative z-10">{text}</span>
    <span className="absolute inset-0 bg-gradient-to-r from-amber-600 to-amber-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
    <span className="absolute -inset-1 rounded-full blur opacity-30 bg-amber-400 group-hover:opacity-50 transition-opacity duration-300"></span>
  </button>
);

const Infinite = () => {
  const [positions, setPositions] = useState([
    { left: '-30%' },
    { left: '0%' },
    { left: '30%' },
    { left: '60%' },
    { left: '90%' }
  ]);

  const [isAnimationPaused, setIsAnimationPaused] = useState(false);
  const boxWidth = 64;
  const animationRef = useRef(null);

  const boxContents = [
    {
      title: "200+",
      detail: "Certified doctors in Aurleaf",
      icon: <Leaf className="text-amber-500" size={28} />
    },
    {
      title: "400+",
      detail: "AI-generated Ayurvedic diet plans for various diseases",
      icon: <Sun className="text-amber-500" size={28} />
    },
    {
      title: "100+",
      detail: "Yoga exercises to cure diseases",
      icon: <Moon className="text-amber-500" size={28} />
    },
    {
      title: "1000+",
      detail: "Certified hospitals & clinics near you",
      icon: <CloudFog className="text-amber-500" size={28} />
    },
    {
      title: "250+",
      detail: "Certified medical products",
      icon: <Sparkles className="text-amber-500" size={28} />
    }
  ];

  useEffect(() => {
    const moveBoxes = () => {
      if (isAnimationPaused) return;

      setPositions(prevPositions => {
        return prevPositions.map((box, idx) => {
          if (parseFloat(box.left) < -boxWidth) {
            const rightmost = Math.max(...prevPositions.map(p => parseFloat(p.left)));
            return { ...box, left: `${rightmost + 30}%` };
          }
          return { ...box, left: `${parseFloat(box.left) - 0.3}%` };
        });
      });
    };

    animationRef.current = setInterval(moveBoxes, 50);
    return () => clearInterval(animationRef.current);
  }, [isAnimationPaused]);

  return (
    <div className="relative w-full h-72 sm:h-80 overflow-hidden flex items-center">
      <div className="absolute inset-0 bg-[url('/api/placeholder/400/320')] bg-cover bg-center opacity-5"></div>
      {positions.map((box, index) => (
        <div
          key={index}
          className="absolute w-48 sm:w-56 md:w-64 h-40 sm:h-48 md:h-64 rounded-xl bg-white flex flex-col items-center justify-center p-4 
          border border-amber-200 shadow-lg text-amber-900 transform transition-all duration-300 
          hover:shadow-amber-500/30 hover:scale-105"
          style={{
            left: box.left,
            top: '50%',
            transform: 'translateY(-50%)',
            transition: 'left 0.1s linear, transform 0.3s ease, box-shadow 0.3s ease',
          }}
          onMouseEnter={() => setIsAnimationPaused(true)}
          onMouseLeave={() => setIsAnimationPaused(false)}
        >
          <div className="mb-3 p-2 rounded-full bg-amber-50 border border-amber-200">
            {boxContents[index % boxContents.length].icon}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-amber-700 tracking-wide font-['Verdana'] relative text-center">
            {boxContents[index % boxContents.length].title}
            <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-center text-amber-800 font-['Georgia']">
            {boxContents[index % boxContents.length].detail}
          </p>
        </div>
      ))}
    </div>
  );
};

const AyurvedicHealthSection = () => {
  const navigate = (path) => console.log(`Navigating to: ${path}`);

  return (
    <section className="w-full flex flex-col justify-center items-center pt-12 pb-20 px-4 sm:px-6 md:px-8 bg-amber-50 relative overflow-hidden">
      {/* Background bubbles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-40 sm:w-56 h-40 sm:h-56 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-40 sm:w-56 h-40 sm:h-56 bg-amber-700 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-700"></div>
      </div>

      {/* Background texture */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('/api/placeholder/400/320')] bg-repeat"></div>

      <div className="relative text-center px-2">
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-wide text-amber-900 font-['Verdana']">
          Personalized Care for a Healthier Tomorrow
        </h2>
        <div className="w-16 sm:w-24 h-1 mx-auto mt-4 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 rounded-full"></div>
        <h4 className="text-base sm:text-xl md:text-3xl font-medium text-amber-800 max-w-3xl mt-6 font-['Georgia'] mx-auto">
          Your one-stop platform for Ayurvedic wellness, medical guidance, and smart health solutions.
        </h4>
      </div>

      <div className="flex justify-center mt-8">
        <Button text="Nearby Hospitals" onClick={() => navigate('/Pincode')} />
      </div>

      <div className="flex justify-center">
  <h3 className="text-2xl font-semibold tracking-wide mb-14 relative text-center">
    <span className="relative z-10 text-amber-700  top-16 font-['Verdana']">
      Rooted in Ayurveda, Trusted by Many
    </span>
    <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></span>
  </h3>

  

</div>

<Infinite />

        
     
    </section>
  );
};

export default AyurvedicHealthSection;
