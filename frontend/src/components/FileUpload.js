import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUpload, FaArrowRight, FaSpinner } from "react-icons/fa";

// Trie Data Structure for Categorizing Tax Terms
class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let char of word.toLowerCase()) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(text) {
    let words = text.toLowerCase().split(/\s+/);
    let foundWords = new Set();
    for (let word of words) {
      let node = this.root;
      for (let char of word) {
        if (!node.children[char]) break;
        node = node.children[char];
      }
      if (node.isEndOfWord) foundWords.add(word);
    }
    return Array.from(foundWords);
  }
}

// Initialize Trie with Tax Keywords
const taxTrie = new Trie();
["income", "deduction", "exemption", "TDS", "HRA", "80C", "80D", "investment", "rebate", "audit", "taxable", "filing"].forEach((word) => taxTrie.insert(word));

const OCRUpload = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [taxInsights, setTaxInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const GOOGLE_VISION_API_KEY = process.env.REACT_APP_GOOGLE_VISION_API_KEY;
  const GEMINI_AI_API_KEY = process.env.REACT_APP_GOOGLE_AI_API_KEY;

  const handleFileChange = async (event) => {
    const uploadedFile = event.target.files[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setLoading(true);
    setExtractedText("");
    setTaxInsights(null);

    try {
      const extractedText = await processOCR(uploadedFile);
      setExtractedText(extractedText);

      const categorizedKeywords = taxTrie.search(extractedText);
      console.log("Tax Categories Identified:", categorizedKeywords);

      await processAITaxAnalysis(extractedText, categorizedKeywords);
    } catch (error) {
      console.error("Error processing file:", error);
    } finally {
      setLoading(false);
    }
  };

  const processOCR = async (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        const base64Image = reader.result.split(",")[1];

        try {
          const response = await axios.post(
            `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_VISION_API_KEY}`,
            {
              requests: [{ image: { content: base64Image }, features: [{ type: "TEXT_DETECTION" }] }],
            }
          );

          const extractedText =
            response.data.responses[0]?.fullTextAnnotation?.text || "No text found.";
          resolve(extractedText);
        } catch (error) {
          console.error("OCR Error:", error);
          reject(error);
        }
      };
    });
  };

  const processAITaxAnalysis = async (text, categories) => {
    if (!text) return;

    const categoryText = categories.length
      ? `The document contains these key tax-related terms: ${categories.join(", ")}.\n`
      : "";

    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${GEMINI_AI_API_KEY}`,
        {
          contents: [{ role: "user", parts: [{ text: `${categoryText} Analyze this document and provide tax-saving insights:\n${text}` }] }],
        }
      );

      const aiSuggestions =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "No tax insights found.";
      setTaxInsights(formatInsights(aiSuggestions));
    } catch (error) {
      console.error("AI Tax Analysis Error:", error);
    }
  };

  const formatInsights = (insights) => {
    const sections = insights.split("**").map((section, index) =>
      index % 2 === 0 ? section : <strong key={index} className="text-yellow-400">{section}</strong>
    );

    return sections.map((section, index) => (
      <p key={index} className="mt-2 text-gray-300 leading-relaxed">
        {section}
      </p>
    ));
  };

  return (
    <section className="py-16 min-h-screen flex flex-col items-center bg-gradient-to-r from-gray-900 to-black relative text-white">
      <div className="absolute inset-0 backdrop-blur-xl opacity-80"></div>

      <div className="z-10 w-full max-w-3xl px-6 py-12 rounded-2xl shadow-2xl border border-gray-800 bg-gray-900 bg-opacity-75">
        <h2 className="text-5xl font-extrabold text-yellow-400 drop-shadow-lg text-center">
          AI Tax Analyzer
        </h2>
        <p className="mt-4 text-gray-300 text-lg text-center">
          Upload your tax document, and let AI optimize your savings.
        </p>

        <label className="mt-8 cursor-pointer flex flex-col items-center justify-center bg-gray-800 border border-gray-600 p-6 rounded-2xl shadow-lg hover:bg-gray-700 transition-all duration-300">
          <FaUpload className="text-6xl text-yellow-400 animate-bounce" />
          <span className="text-gray-300 mt-2 text-lg">Drag & Drop or Click to Upload</span>
          <input type="file" accept="image/*,application/pdf" className="hidden" onChange={handleFileChange} />
        </label>

        {loading && (
          <p className="mt-6 text-gray-400 text-lg flex items-center gap-2 text-center">
            <FaSpinner className="animate-spin text-yellow-400 text-2xl" /> Extracting text & analyzing tax insights...
          </p>
        )}

        {extractedText && (
          <div className="mt-6 p-6 bg-gray-800 rounded-xl shadow-xl border border-gray-700">
            <h3 className="text-2xl font-bold text-yellow-400">📜 Extracted Data</h3>
            <p className="mt-3 text-gray-300 whitespace-pre-line">{extractedText}</p>
          </div>
        )}

        {taxInsights && (
          <div className="mt-6 p-6 bg-gray-800 rounded-xl shadow-xl border border-gray-700">
            <h3 className="text-2xl font-bold text-green-400">💡 AI Tax Insights</h3>
            <div className="mt-3">{taxInsights}</div>
          </div>
        )}

        {taxInsights && (
          <button onClick={() => navigate("/tax-filing")} className="mt-8 px-8 py-4 bg-yellow-500 text-black font-bold text-lg rounded-lg flex items-center justify-center gap-2">
            📄 Proceed to Tax Filing <FaArrowRight />
          </button>
        )}
      </div>
    </section>
  );
};

export default OCRUpload;
