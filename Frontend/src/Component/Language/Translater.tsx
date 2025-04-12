import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
  }
}

const Translate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [isTranslateLoaded, setIsTranslateLoaded] = useState(false);
  const [hoverLanguage, setHoverLanguage] = useState("");
  const languageMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scriptAdded = false;
    
    if (!document.querySelector('script[src*="translate_a/element.js"]')) {
      const safetyTimeout = setTimeout(() => {
        setIsTranslateLoaded(true); 
      }, 5000);
      
      window.googleTranslateElementInit = function() {
        try {
          if (window.google?.translate) {
            new window.google.translate.TranslateElement(
              {
                pageLanguage: "hi",
                includedLanguages: "en,fr,de,es,zh,hi,gu,kn,mr,sa,ta,te,ru",
                layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
                autoDisplay: false
              },
              "google_translate_element"
            );
            
            setIsTranslateLoaded(true);
            clearTimeout(safetyTimeout);
          }
        } catch (error) {
          console.error("Error initializing Google Translate:", error);
          setIsTranslateLoaded(true);
          clearTimeout(safetyTimeout);
        }
      };
      
      const addScript = document.createElement("script");
      addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      addScript.async = true;
      addScript.onerror = () => {
        console.error("Failed to load Google Translate script");
        setIsTranslateLoaded(true);
        clearTimeout(safetyTimeout);
      };
      document.body.appendChild(addScript);
      scriptAdded = true;
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && languageMenuRef.current && !languageMenuRef.current.contains(target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (langCode: string) => {
    setCurrentLanguage(langCode);
    setIsOpen(false);
    
    try {
      const selectElement = document.querySelector(".goog-te-combo") as HTMLSelectElement;
      if (selectElement) {
        selectElement.value = langCode;
        selectElement.dispatchEvent(new Event("change", { bubbles: true }));
      } else {
        console.log("Google Translate not found, updating UI only");
      }
    } catch (error) {
      console.error("Error changing language:", error);
    }
  };

  const getFlagEmoji = (langCode: string) => {
    const flagMap: {[key: string]: string} = {
      en: "🇺🇸",
      hi: "🇮🇳",
      mr: "🇮🇳",
      kn: "🇮🇳",
      te: "🇮🇳",
      fr: "🇫🇷",
      ru: "🇷🇺",
      de: "🇩🇪",
      es: "🇪🇸",
      zh: "🇨🇳",
      gu: "🇮🇳",
      ta: "🇮🇳",
      sa: "🇮🇳",
    };
    
    return flagMap[langCode] || "🌐";
  };

  const getLanguageFullName = (langCode: string) => {
    const language = languages.find(lang => lang.code === langCode);
    return language ? language.name : "Unknown";
  };

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "Hindi" },
    { code: "mr", name: "Marathi" },
    { code: "kn", name: "Kannada" },
    { code: "te", name: "Telugu" },
    { code: "fr", name: "French" },
    { code: "ru", name: "Russian" },
    { code: "de", name: "German" },
    { code: "es", name: "Spanish" },
    { code: "zh", name: "Chinese" },
    { code: "gu", name: "Gujarati" },
    { code: "ta", name: "Tamil" },
    { code: "sa", name: "Sanskrit" },
  ];

  return (
    <>
      <div id="google_translate_element" style={{ position: 'absolute', top: '-9999px', left: '-9999px', width: '1px', height: '1px' }}></div>
      
      <div className="fixed bottom-6 left-6 z-50 language-selector-container">
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              ref={languageMenuRef}
              className="bg-white rounded-2xl shadow-2xl mb-4 p-2 border border-gray-100"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="max-h-64 sm:max-h-80 overflow-y-auto rounded-xl p-1">
                {languages.map((lang) => (
                  <motion.button
                    key={lang.code}
                    className={`block w-full text-left px-4 py-3 rounded-xl transition-colors flex items-center space-x-3 ${
                      currentLanguage === lang.code ? "from-amber-100 via-amber-50 to-white transition-all" : "hover:bg-gray-50"
                    }`}
                    onClick={() => changeLanguage(lang.code)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onMouseEnter={() => setHoverLanguage(lang.code)}
                    onMouseLeave={() => setHoverLanguage("")}
                  >
                    <span className="text-2xl">{getFlagEmoji(lang.code)}</span>
                    <span className="font-medium">{lang.name}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.button
          onClick={toggleDrawer}
          className="relative group overflow-hidden"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={isTranslateLoaded ? { y: [10, 0] } : { opacity: 0.8 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <motion.div 
            className="relative z-10 bg-gradient-to-r from-amber-200 via-amber-50 to-amber-200 transition-all text-black rounded-full shadow-lg flex flex-col items-center justify-center focus:outline-none"
            animate={{ 
              boxShadow: isOpen 
                ? "0 10px 25px -5px rgba(59, 130, 246, 0.5)" 
                : "0 4px 6px -1px rgba(59, 130, 246, 0.3)" 
            }}
            whileHover={{ 
              boxShadow: "0 20px 25px -5px rgba(59, 130, 246, 0.4)"
            }}
            style={{
              width: isOpen ? "4rem" : "3.5rem",
              height: isOpen ? "4rem" : "3.5rem",
            }}
          >
            <span className="text-2xl mb-1">{getFlagEmoji(currentLanguage)}</span>
            <span className="text-xs font-semibold">{currentLanguage.toUpperCase()}</span>
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 bg-blue-400 rounded-full opacity-20"
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 2,
              ease: "easeInOut" 
            }}
          />
        </motion.button>
        
        <AnimatePresence>
          {!isOpen && (
            <motion.div 
              className="absolute top-1/2 -translate-y-1/2 left-full ml-3"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -5 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white rounded-lg shadow-md py-1 px-3 text-sm whitespace-nowrap">
                <span>{getLanguageFullName(currentLanguage)}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Translate;