import { useEffect, useState } from "react";

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
      
      // google script
      const addScript = document.createElement("script");
      addScript.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      addScript.async = true;
      addScript.onerror = () => {
        console.error("Failed to load Google Translate script");
        setIsTranslateLoaded(true); // Allow UI to work anyway
        clearTimeout(safetyTimeout);
      };
      document.body.appendChild(addScript);
      scriptAdded = true;
    }

  
    const handleClickOutside = (event: any) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('.language-selector-container')) {
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
    // Update UI state immediately
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
      
    
      <div className="fixed bottom-10 left-6 z-50 language-selector-container">
        

        {isOpen && (
          <div className="bg-white rounded-lg shadow-lg mb-4">
            <div className="max-h-64 overflow-y-auto">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
                  onClick={() => changeLanguage(lang.code)}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
        )}
        
       
        <button
          onClick={toggleDrawer}
          className="bg-gradient-to-b text-2xl from-black via-gray-800 to-black   text-white w-28 h-28 rounded-full flex items-center justify-center shadow-lg focus:outline-none hover:bg-green-600 transition-colors"
        >
          {currentLanguage.toUpperCase()}
        </button>
      </div>
    </>
  );
};

export default Translate;