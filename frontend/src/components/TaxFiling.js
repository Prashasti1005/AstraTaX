import React, { useState } from "react";

const TaxFiling = () => {
  const [filed, setFiled] = useState(false);

  const handleFileTaxes = () => {
    setTimeout(() => {
      setFiled(true);
      alert("🎉 Your taxes have been filed successfully!");
    }, 2000);
  };

  return (
    <div className="p-4 bg-gray-700 text-white rounded-lg">
      <button 
        onClick={handleFileTaxes} 
        className="bg-green-500 px-4 py-2 rounded-lg"
        disabled={filed}
      >
        {filed ? "✅ Taxes Filed" : "📤 File Taxes Now"}
      </button>
    </div>
  );
};

export default TaxFiling;
