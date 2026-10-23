import { useState } from "react";

const LOSS_PERCENTAGE = {
  "Bacterial Leaf Blight": 0.30,
  "Brown Spot": 0.20,
  "Healthy": 0,
  "Leaf Blast": 0.40,
  "Leaf Scald": 0.15,
  "Narrow Brown Spot": 0.10,
  "Neck Blast": 0.50,
  "Rice Hispa": 0.25,
  "Sheath Blight": 0.20,
  "Tungro": 0.60,
};

export default function ImpactCalculator({ diseaseLabel }) {
  const [landArea, setLandArea] = useState("");
  const [yieldPerHa, setYieldPerHa] = useState("");
  const [result, setResult] = useState(null);

  const lossPercentage = LOSS_PERCENTAGE[diseaseLabel] || 0;
  const pricePerKg = 6800;

  const handleCalculate = (e) => {
    e.preventDefault();
    const area = parseFloat(landArea);
    const yieldHa = parseFloat(yieldPerHa);

    if (isNaN(area) || isNaN(yieldHa) || area <= 0 || yieldHa <= 0) {
      alert("Mohon masukkan angka yang valid (lebih dari 0).");
      return;
    }

    const totalYieldKg = area * yieldHa * 1000;
    const totalValue = totalYieldKg * pricePerKg;
    const estimatedLoss = totalValue * lossPercentage;

    setResult({
      lossPercentage,
      estimatedLoss: estimatedLoss.toLocaleString("id-ID"),
    });
  };

  if (!lossPercentage) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8 mt-4 animate-fade-in">
      <h2 className="text-base font-semibold text-gray-900 mb-2">
        Simulasi Dampak Ekonomi
      </h2>
      <p className="text-sm text-gray-500 mb-6 leading-relaxed">
        Penyakit <strong className="text-gray-900">{diseaseLabel}</strong> berpotensi menyebabkan kehilangan hasil hingga <strong className="text-red-500">{(lossPercentage * 100)}%</strong>. Mari hitung estimasi kerugian finansial Anda.
      </p>

      <form onSubmit={handleCalculate} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Luas Lahan (Hektar)</label>
          <input
            type="number"
            step="0.1"
            value={landArea}
            onChange={(e) => setLandArea(e.target.value)}
            placeholder="Contoh: 1.5"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] transition-all"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1.5 uppercase tracking-wider">Estimasi Hasil (Ton/Ha)</label>
          <input
            type="number"
            step="0.1"
            value={yieldPerHa}
            onChange={(e) => setYieldPerHa(e.target.value)}
            placeholder="Contoh: 5"
            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E] transition-all"
          />
        </div>
        <div className="sm:col-span-2 mt-2">
          <button
            type="submit"
            className="w-full bg-[#0F766E] hover:bg-[#0D655E] text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-sm"
          >
            Hitung Estimasi Kerugian
          </button>
        </div>
      </form>

      {result && (
        <div className="mt-6 bg-red-50 border border-red-100 p-5 rounded-xl">
          <p className="text-sm text-red-600 font-medium mb-1">
            Dengan harga acuan GKP Rp6.800/kg, potensi kerugian Anda mencapai:
          </p>
          <p className="text-2xl font-bold text-red-600">
            Rp {result.estimatedLoss}
          </p>
        </div>
      )}
    </div>
  );
}