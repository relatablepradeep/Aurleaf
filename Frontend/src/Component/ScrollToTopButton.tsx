import React, { useState, useEffect } from "react";

const ScrollToTopButton: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    console.log("ScrollToTopButton mounted ✅");

    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      console.log("Scrolled:", scrolled);
      setVisible(scrolled > 50);
    };

    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-20 right-5 sm:bottom-24 sm:right-8 md:bottom-28 md:right-10 lg:bottom-32 lg:right-12
                  bg-green-600 text-white border-2 border-green-800 rounded-full
                  w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
                  text-3xl font-bold cursor-pointer
                  shadow-lg z-50
                  transition-transform duration-200 ease-in-out
                  hover:scale-110
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
                  ${visible ? "inline-block" : "hidden"}`}
      title="Go to top"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;