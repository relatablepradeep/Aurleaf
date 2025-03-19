import { useState } from "react";

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

  const responses = {
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
      "You can ask me about Ayurvedic remedies for **Diabetes, BP, Acidity, Weight Loss, Joint Pain**, etc.",
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

    setTimeout(() => {
      const botMessage = getBotResponse(userMessage);
      addMessage(botMessage, "bot");

      // Always show suggestions after bot reply
      setSuggestions([
        "Ayurvedic herbs for immunity",
        "Diet for healthy skin",
        "Best yoga for digestion",
        "How to boost energy naturally",
        "Remedy for hair fall",
      ]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="z-[9999]">
      {/* Chatbot Avatar */}
      <div
        className="fixed bottom-8 right-8 cursor-pointer transition-transform duration-300 hover:scale-110 z-[9999]"
        onClick={toggleChat}
      >
        <div className="rounded-full flex items-center justify-center shadow-lg">
          <img src="src/Assets/logo.png" alt="Chatbot Logo" className="w-36 h-36" />
        </div>
      </div>

      {/* Chatbox Container */}
      {chatExpanded && (
        <div className="fixed bottom-8 right-8 w-96 h-1/2 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[9999]">
          {/* Chat Header */}
          <div className="bg-green-500 text-white p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Ayuleaf</h2>
            <button onClick={closeChat} className="text-white text-lg">
              ✖
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-100">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg text-sm ${
                    message.sender === "user"
                      ? "bg-green-500 text-white rounded-br-none"
                      : "bg-gray-200 text-gray-700 rounded-bl-none"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Suggestions (Always Show After User Input) */}
          {suggestions.length > 0 && (
            <div className="p-3 bg-gray-200 flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className="bg-green-500 text-white px-3 py-1 rounded-full text-xs hover:bg-green-600 transition"
                  onClick={() => sendMessage(suggestion)}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Chat Input */}
          <div className="p-3 flex items-center bg-white border-t">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your question..."
              className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={() => sendMessage()}
              className="ml-3 p-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
