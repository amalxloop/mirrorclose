import React, { useState } from "react";

export default function CloserForm() {
  const [offer, setOffer] = useState("");
  const [niche, setNiche] = useState("");
  const [objection, setObjection] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ offer, niche, objection })
    });

    const data = await response.json();
    setResult(data.result);
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-2xl shadow-lg space-y-6">
      <div>
        <label className="block text-sm mb-1">Your Offer</label>
        <input type="text" value={offer} onChange={(e) => setOffer(e.target.value)} className="w-full p-2 rounded bg-gray-900 border border-gray-700" required />
      </div>
      <div>
        <label className="block text-sm mb-1">Your Niche</label>
        <input type="text" value={niche} onChange={(e) => setNiche(e.target.value)} className="w-full p-2 rounded bg-gray-900 border border-gray-700" required />
      </div>
      <div>
        <label className="block text-sm mb-1">Top Objection</label>
        <input type="text" value={objection} onChange={(e) => setObjection(e.target.value)} className="w-full p-2 rounded bg-gray-900 border border-gray-700" required />
      </div>
      <button type="submit" className="bg-purple-600 hover:bg-purple-700 transition px-4 py-2 rounded-xl text-white font-semibold">
        {loading ? "Generating..." : "Generate Sales Scripts"}
      </button>

      {result && (
        <div className="mt-6 p-4 border border-gray-700 rounded-xl bg-gray-900 whitespace-pre-wrap">
          <h3 className="text-xl font-bold mb-2">Your Sales Mirror™:</h3>
          <p>{result}</p>
        </div>
      )}
    </form>
  );
}
