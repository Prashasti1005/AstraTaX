import React, { useState } from "react";

const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("http://127.0.0.1:8000/ask-ai/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      setResponse(data.answer);
    } catch (error) {
      setResponse("⚠️ Error fetching response. Try again.");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold">AstraTax AI Chatbot</h2>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="w-full p-2 my-4 border border-gray-600 bg-gray-800 rounded"
        placeholder="Ask me a tax question..."
      />
      <button
        onClick={handleAsk}
        className="px-4 py-2 bg-yellow-500 text-black rounded"
        disabled={loading}
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>
      {response && <p className="mt-4 p-2 bg-gray-700 rounded">{response}</p>}
    </div>
  );
};

export default Chatbot;
