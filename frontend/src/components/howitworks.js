import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-black text-center text-white">
      <h2 className="text-5xl font-extrabold tracking-wide text-yellow-400 drop-shadow-lg">
        How It Works
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-8 mt-12">
        <div className="relative p-6 bg-gray-800/50 border border-gray-700 shadow-lg rounded-xl max-w-sm">
          <h3 className="text-2xl font-bold text-white">1️⃣ Upload Documents 📄</h3>
          <p className="text-gray-300 mt-2">Securely upload invoices, salary slips, and bank statements.</p>
        </div>

        <div className="relative p-6 bg-gray-800/50 border border-gray-700 shadow-lg rounded-xl max-w-sm">
          <h3 className="text-2xl font-bold text-white">2️⃣ AI Analyzes & Optimizes 🤖</h3>
          <p className="text-gray-300 mt-2">AI extracts key data and suggests tax-saving deductions.</p>
        </div>

        <div className="relative p-6 bg-gray-800/50 border border-gray-700 shadow-lg rounded-xl max-w-sm">
          <h3 className="text-2xl font-bold text-white">3️⃣ File in One Click 🚀</h3>
          <p className="text-gray-300 mt-2">Submit your tax return instantly with a single click.</p>
        </div>
      </div>

      <button
        onClick={() => navigate("/Fileupload")}
        className="mt-12 px-8 py-3 text-black text-lg font-bold rounded-lg shadow-md bg-yellow-500 hover:bg-yellow-600"
      >
        🚀 Try a Live Demo
      </button>
    </section>
  );
};

export default HowItWorks;
