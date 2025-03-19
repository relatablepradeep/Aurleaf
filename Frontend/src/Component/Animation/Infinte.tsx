import { useState, useEffect, useRef } from 'react';

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
    { title: "200+", detail: "Certified doctors in Aurleaf" },
    { title: "400+", detail: "AI-generated Ayurvedic diet plans for various diseases" },
    { title: "100+", detail: "Yoga exercises to cure diseases" },
    { title: "1000+", detail: "Certified hospitals & clinics near you" },
    { title: "250+", detail: "Certified medical products" }
  ];

  useEffect(() => {
    const moveBoxes = () => {
      if (isAnimationPaused) return;

      setPositions(prevPositions => {
        return prevPositions.map((box, idx) => {
          if (parseFloat(box.left) < -boxWidth) {
            const rightmostPosition = Math.max(...prevPositions.map(p => parseFloat(p.left)));
            return { ...box, left: `${rightmostPosition + 30}%` };
          }
          return { ...box, left: `${parseFloat(box.left) - 0.75}%` };
        });
      });
    };

    animationRef.current = setInterval(moveBoxes, 100);

    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [isAnimationPaused]);

  const handleMouseEnter = () => {
    setIsAnimationPaused(true);
  };

  const handleMouseLeave = () => {
    setIsAnimationPaused(false);
  };

  return (
    <div className="relative w-full h-72 bg-gradient-to-t from-gray-950 via-gray-800 to-transparent overflow-hidden flex items-center">
      {positions.map((box, index) => (
        <div
          key={index}
          className="absolute h-36 w-48 sm:h-48 sm:w-56 md:h-64 md:w-64 rounded-xl bg-gray-800 flex flex-col items-center justify-center p-4 
          shadow-2xl text-white transform transition-all duration-300 hover:shadow-green-500/50 hover:scale-105"
          style={{
            left: box.left,
            top: '50%',
            transform: 'translateY(-50%)',
            transition: 'left 0.1s linear, transform 0.3s ease, box-shadow 0.3s ease',
            marginRight: '12px'
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400 tracking-wide">
            {boxContents[index].title}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-center text-gray-300">
            {boxContents[index].detail}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Infinite;
