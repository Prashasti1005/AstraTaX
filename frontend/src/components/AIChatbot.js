import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown"; // 📌 For formatting AI responses
import { FaRobot, FaPaperPlane, FaUser } from "react-icons/fa";

const AIChatbot = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  // Securely fetch API key from .env
  const GOOGLE_AI_API_KEY = process.env.REACT_APP_GOOGLE_AI_API_KEY;
  const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${GOOGLE_AI_API_KEY}`;

  const handleAsk = async () => {
    if (!question.trim()) return;

    const userMessage = { text: question, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: question }] }],
        }),
      });

      const data = await response.json();
      console.log("📜 API Response:", data);

      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        const botResponse = data.candidates[0].content.parts[0].text;
        setMessages((prev) => [...prev, { text: botResponse, sender: "bot" }]);
      } else {
        setMessages((prev) => [...prev, { text: "⚠️ AI response error. Please try again.", sender: "bot" }]);
      }
    } catch (error) {
      console.error("❌ Error fetching AI response:", error);
      setMessages((prev) => [...prev, { text: "⚠️ Error contacting AI.", sender: "bot" }]);
    }

    setLoading(false);
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    chatContainerRef.current?.scrollTo(0, chatContainerRef.current.scrollHeight);
  }, [messages]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6 pt-20">
      <div className="max-w-3xl w-full h-[90vh] bg-gray-950/60 backdrop-blur-2xl border border-gray-700 shadow-2xl rounded-3xl flex flex-col overflow-hidden">
        
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-700 p-5 text-center text-lg font-semibold flex items-center justify-center border-b border-gray-700 rounded-t-3xl shadow-lg">
          <FaRobot className="text-black text-2xl mr-3 animate-pulse" />
          <span className="text-black font-bold tracking-widest uppercase">AstraTax AI Chatbot</span>
        </div>

        {/* Chat Messages */}
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar bg-gray-900/30 backdrop-blur-lg">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"} items-center`}>
              {msg.sender === "bot" && <FaRobot className="text-yellow-400 text-2xl self-end mr-3" />}
              
              {/* 📌 Format AI responses with markdown */}
              <div className={`p-4 rounded-2xl max-w-xs text-lg shadow-lg transition-transform transform hover:scale-105 ${msg.sender === "user" ? "bg-gradient-to-br from-blue-500 to-blue-700 text-white self-end" : "bg-gray-800/90 text-white"}`}>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>

              {msg.sender === "user" && <FaUser className="text-blue-400 text-2xl self-end ml-3" />}
            </div>
          ))}

          {loading && (
            <div className="flex justify-start items-center space-x-3 animate-pulse">
              <FaRobot className="text-yellow-400 text-2xl" />
              <div className="p-4 bg-gray-800/90 text-white rounded-2xl max-w-xs">Typing...</div>
            </div>
          )}
        </div>

        {/* Input Box */}
        <div className="p-5 border-t border-gray-700 flex items-center space-x-4 bg-gray-900/80 rounded-b-3xl shadow-lg">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 p-4 bg-gray-800/90 border border-gray-700 rounded-xl text-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-400 transition-all duration-300"
            placeholder="Ask me a tax question..."
          />
          <button onClick={handleAsk} className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-xl hover:scale-110 transition-transform duration-300 shadow-lg" disabled={loading}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;
