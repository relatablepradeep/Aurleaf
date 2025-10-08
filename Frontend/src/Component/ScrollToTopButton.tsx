import React, { useState, useEffect } from "react";

const ScrollButton: React.FC = () => {
  const [showTop, setShowTop] = useState(false); // false = ↓ by default

  useEffect(() => {
    const toggleButton = () => {
      const scrollTop = document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      const halfway = (scrollHeight - clientHeight) / 2;

      // If scrolled past halfway → show top button
      if (scrollTop > halfway) {
        setShowTop(true);
      } else {
        setShowTop(false);
      }
    };

    window.addEventListener("scroll", toggleButton);
    toggleButton(); // run once on mount
    return () => window.removeEventListener("scroll", toggleButton);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
  };

  return (
    <button
      onClick={showTop ? scrollToTop : scrollToBottom}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      style={{
        position: "fixed",
        bottom: "120px",
        right: "48px",
        backgroundColor: "#4caf50",
        color: "white",
        border: "2px solid #388e3c",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        fontSize: "28px",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        zIndex: 99999,
        transition: "transform 0.2s",
      }}
      title={showTop ? "Go to top" : "Go to bottom"}
      aria-label={showTop ? "Scroll to top" : "Scroll to bottom"}
    >
      {showTop ? "↑" : "↓"}
    </button>
  );
};

export default ScrollButton;