import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Chatbot = () => {
  const [chatExpanded, setChatExpanded] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm Gurudev, your Ayurvedic health assistant. What do you need help with?",
      sender: "bot",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState([
    "Diabetes treatment",
    "Best yoga for BP",
    "Remedy for acidity",
    "How to gain weight",
    "Best herbs for skin",
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const responses = {
    // Existing...
    
    immunity: "Boost immunity with herbs like Giloy (Guduchi), Tulsi (Holy Basil), and Amla. Drink Kadha and practice daily yoga and meditation.",
    
    digestion: "For better digestion, take Jeera (Cumin), Ajwain (Carom Seeds), and Hing (Asafoetida). Eat light meals and avoid heavy, oily foods at night.",
    
    skin: "Healthy skin comes from within. Use Neem, Turmeric (Haldi), and Sandalwood (Chandan). Avoid spicy food and apply Aloe Vera topically.",
    
    energy: "To boost energy, consume Ashwagandha, Shilajit, and dates (Khajoor). Practice Surya Namaskar and get proper sleep.",
    
    hairfall: "For hair fall, massage scalp with Bhringraj oil. Use Amla and Hibiscus powder. Avoid excessive shampooing and manage stress.",
    
    pitta: "Pitta Dosha is related to fire. Eat cooling foods like cucumber, coconut, and mint. Avoid spicy food and overexertion.",
    
    vata: "Vata Dosha is linked to air. Keep warm, eat moist foods, and use sesame oil for massage. Avoid cold, dry, or raw foods.",
    
    kapha: "Kapha Dosha relates to water and earth. Avoid dairy, sweets, and heavy foods. Use ginger tea and keep active.",
    
    detox: "Detox your body with Triphala, warm lemon water, and light fasting. Panchakarma therapy is highly recommended.",
    
    ayurveda: "Ayurveda focuses on balance in the body using diet, herbs, and lifestyle. It’s based on the 5 elements and 3 Doshas: Vata, Pitta, and Kapha.",

    diabetes:
    "For Diabetes (Madhumeha), consume Fenugreek (Methi), Bitter Gourd (Karela), and Turmeric (Haldi). Do yoga daily and reduce sugar intake.",
  bp: "For High Blood Pressure, use Garlic (Lahsun), Ashwagandha, and Arjuna Bark (Arjun ki Chaal). Meditation and Pranayama help too.",
  obesity:
    "For weight loss, take Triphala (a mix of Amla, Harad, Baheda), drink warm water, and exercise regularly. Avoid fried foods.",
  acidity:
    "For Acidity (Amlapitta), drink cold milk, Amla (Indian Gooseberry) juice, and chew Fennel (Saunf) after meals. Avoid spicy foods.",
  constipation:
    "For Constipation (Kabz), take Psyllium Husk (Isabgol), Triphala, and warm water. Eat fiber-rich food.",
  arthritis:
    "For Joint Pain (Gathiya), massage with Sesame (Til) oil, take Ashwagandha, and do light exercises.",
  exercise:
    "Recommended Exercises: **Pranayama**, **Surya Namaskar**, **Walking**, and **Stretching**.",
  doctor:
    "You should consult an **Ayurvedic doctor**, **General Physician**, or **Specialist** based on your condition.",
  close: "Goodbye! Reach out whenever you need health advice.",
    
    default:
      "You can ask me about Ayurvedic remedies for **Immunity, Digestion, Skin, Hair Fall, Doshas (Vata, Pitta, Kapha)**, and more.",
  };
  

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleChat = () => {
    setChatExpanded((prevState) => !prevState);
  };

  const closeChat = () => {
    setChatExpanded(false);
  };

  const getBotResponse = (input) => {
    input = input.toLowerCase();
    for (const [key, value] of Object.entries(responses)) {
      if (input.includes(key)) {
        return value;
      }
    }
    return responses.default;
  };

  const addMessage = (message, sender) => {
    const newMessage = { text: message, sender: sender };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const sendMessage = (message) => {
    const userMessage = message || userInput.trim();
    if (!userMessage) return;

    addMessage(userMessage, "user");
    setUserInput("");
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const botMessage = getBotResponse(userMessage);
      addMessage(botMessage, "bot");

      // Updated suggestions
      setSuggestions([
        "Ayurvedic herbs for immunity",
        "Diet for healthy skin",
        "Best yoga for digestion",
        "How to boost energy naturally",
        "Remedy for hair fall",
      ]);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const formatMessage = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  return (
    <div className="z-50">
      {/* Floating button */}
      <motion.div
        className="fixed bottom-8 right-8 cursor-pointer z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleChat}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <div className="rounded-full shadow-lg bg-gradient-to-br from-green-400 to-green-600 p-1">
          <div className="bg-white rounded-full p-2">
            <div className="w-12 h-12 flex items-center justify-center relative">
              {/* <img src="Frontend\src\Assets\logo.png" alt="Ayuleaf Logo" className="w-10 h-10" />
               */}

🤖
              <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Chatbot Window */}
      <AnimatePresence>
        {chatExpanded && (
          <motion.div
            className="fixed bottom-8 right-8 w-80 md:w-96 h-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-2">
                  {/* <img src="Frontend\src\Assets\logo.png" alt="Ayuleaf" className="w-6 h-6" /> */}
                  🤖
                </div>
                <h2 className="text-lg font-semibold">Ayuleaf Assistant</h2>
              </div>
              <motion.button 
                onClick={closeChat} 
                className="text-white text-lg rounded-full w-6 h-6 flex items-center justify-center hover:bg-white hover:bg-opacity-20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✖
              </motion.button>
            </div>

            {/* Messages area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50 bg-opacity-60">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    {message.sender === "bot" && (
                      <div className="w-8 h-8 rounded-full bg-green-100 mr-2 flex-shrink-0 flex items-center justify-center">
                        {/* <img src="Frontend\src\Assets\logo.png" alt="Bot" className="w-6 h-6" /> */}
                     🤖 </div>
                    )}
                    <div
                      className={`p-3 rounded-lg max-w-3/4 shadow-sm ${
                        message.sender === "user"
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-br-none"
                          : "bg-white text-gray-700 rounded-bl-none border border-gray-200"
                      }`}
                      dangerouslySetInnerHTML={{ __html: formatMessage(message.text) }}
                    ></div>
                    {message.sender === "user" && (
                      <div className="w-8 h-8 rounded-full bg-green-500 ml-2 flex-shrink-0 flex items-center justify-center">
                        <span className="text-white text-sm">You</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isTyping && (
                <motion.div 
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 mr-2 flex-shrink-0 flex items-center justify-center">
                    {/* <img src="Frontend\src\Assets\logo.png" alt="Bot" className="w-6 h-6" /> */}
🤖</div>
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <div className="flex space-x-1">
                      <motion.div 
                        className="w-2 h-2 bg-green-500 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-green-500 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
                      />
                      <motion.div 
                        className="w-2 h-2 bg-green-500 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <div className="p-2 bg-gray-50 border-t border-gray-200">
              <div className="flex flex-wrap gap-2 max-h-16 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs hover:bg-green-600 hover:text-white transition"
                    onClick={() => sendMessage(suggestion)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input area */}
            <div className="p-3 flex items-center bg-white border-t border-gray-200">
              <motion.input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your question..."
                className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3 }}
              />
              <motion.button
                onClick={() => sendMessage()}
                className="ml-3 p-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-md"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;