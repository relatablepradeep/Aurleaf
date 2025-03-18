import React, { useState, useEffect, useRef } from 'react';

const Infinte = () => {
  // Set wider spacing between initial positions with precise gap
  const [positions, setPositions] = useState([
    { left: '100%' },
    { left: '130%' },
    { left: '160%' },
    { left: '190%' },
    { left: '220%' }
  ]);

  // Global animation pause state
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);
  const boxWidth = 64; // Width in relative units (matching the largest md:w-64)
  const animationRef = useRef(null);

  // Content for each box
  const boxContents = [
    { title: "16", detail: "First milestone in our journey" },
    { title: "17", detail: "Expanding our horizons" },
    { title: "18", detail: "Coming of age moment" },
    { title: "19", detail: "Steps toward excellence" },
    { title: "20", detail: "Two decades of progress" }
  ];

  useEffect(() => {
    const moveBoxes = () => {
      // Skip movement if animation is paused globally
      if (isAnimationPaused) return;
      
      setPositions(prevPositions => {
        return prevPositions.map((box, idx) => {
          // If box moves completely off screen to the left, reset it to right side
          if (parseFloat(box.left) < -boxWidth) {
            // Find the rightmost box
            const rightmostPosition = Math.max(...prevPositions.map(p => parseFloat(p.left)));
            // Place this box at a fixed distance from the rightmost box
            return { ...box, left: `${rightmostPosition + 30}%` };
          }
          
          // Move box left by 0.75% (slightly faster than before)
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

  // Global pause handlers that affect all boxes
  const handleMouseEnter = () => {
    setIsAnimationPaused(true);
  };

  const handleMouseLeave = () => {
    setIsAnimationPaused(false);
  };

  return (
    <div className="relative w-full  h-72 bg-gray-900 overflow-hidden  flex items-center">
      {positions.map((box, index) => (
        <div
          key={index}
          className="absolute h-36 w-48 sm:h-48 sm:w-56 md:h-64 md:w-64 rounded-xl bg-blue-500 flex flex-col items-center justify-center text-white p-4 transform transition-all duration-300 hover:shadow-lg hover:scale-105"
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
            {boxContents[index].title}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-center">
            {boxContents[index].detail}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Infinte;