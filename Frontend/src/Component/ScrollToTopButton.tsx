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
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.2)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      style={{
        display: visible ? "inline" : "inline",
        position: "fixed",
        bottom: "120px",
        right: "48px",
        backgroundColor: "#4caf50",
        color: "white",
        border: "2px solid #388e3c",
        borderRadius: "50%",
        width: "50px",
        height: "50px",
        fontSize: "33px",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
        zIndex: 99999,
        transition: "transform 0.2s",
      }}
      title="Go to top"
      aria-label="Scroll to top"
    >
      ↑
    </button>
  );
};

export default ScrollToTopButton;