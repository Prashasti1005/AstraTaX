import React from "react";
import { useNavigate } from "react-router-dom";

const FloatingChatbot = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="fixed bottom-6 right-6 flex items-center space-x-2 cursor-pointer"
      onClick={() => navigate("/ai-chatbot")}
    >
      {/* Chatbot Avatar */}
      <div className="w-16 h-16 bg-white rounded-full shadow-lg border border-gray-300 flex items-center justify-center transition-transform transform hover:scale-110">
        <img 
          src="/robot-avatar.png"  // ✅ Add your cute robot image here
          alt="AI Chatbot"
          className="w-14 h-14"
        />
      </div>

      {/* Chatbot Label */}
      <div className="bg-yellow-500 px-4 py-2 rounded-lg shadow-md text-black font-bold text-sm hidden md:block">
        Ask AI...
      </div>
    </div>
  );
};

export default FloatingChatbot;
