export default function OnboardingModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#0A1C14]/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-[2rem] shadow-2xl border border-gray-100 max-w-lg w-full p-8 md:p-12 animate-fade-in text-center">
        
        {/* Wadah Logo diubah dari bulat menjadi kotak dengan sudut membulat */}
        <div className="w-24 h-24 bg-white rounded-2xl border border-gray-200 p-3 flex items-center justify-center mx-auto mb-6 shadow-sm">
          <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
        </div>
        
        <h2 className="text-2xl font-black text-[#0F766E] mb-3 tracking-tight">
          Selamat Datang di AgriSense!
        </h2>
        
        <p className="text-gray-600 font-medium mb-8 leading-relaxed">
          Asisten pintar untuk mendeteksi penyakit padi. Berikut adalah 3 hal yang bisa Anda lakukan:
        </p>

        <div className="space-y-4 text-left mb-10">
          <div className="flex items-center gap-4 bg-[#F8FAF8] p-4 rounded-xl border border-gray-100">
            <div className="w-10 h-10 rounded-lg bg-[#F0FDF4] text-[#0F766E] flex items-center justify-center font-bold shrink-0">1</div>
            <p className="text-sm font-bold text-gray-700">Upload foto daun padi di menu Deteksi.</p>
          </div>
          <div className="flex items-center gap-4 bg-[#F8FAF8] p-4 rounded-xl border border-gray-100">
            <div className="w-10 h-10 rounded-lg bg-[#F0FDF4] text-[#0F766E] flex items-center justify-center font-bold shrink-0">2</div>
            <p className="text-sm font-bold text-gray-700">Buat jadwal otomatis untuk perawatan.</p>
          </div>
          <div className="flex items-center gap-4 bg-[#F8FAF8] p-4 rounded-xl border border-gray-100">
            <div className="w-10 h-10 rounded-lg bg-[#F0FDF4] text-[#0F766E] flex items-center justify-center font-bold shrink-0">3</div>
            <p className="text-sm font-bold text-gray-700">Pantau cuaca dan sebaran penyakit.</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-4 bg-[#0F766E] text-white rounded-xl text-sm font-bold hover:bg-[#0D655E] transition-colors shadow-lg"
        >
          Mulai Gunakan AgriSense
        </button>
      </div>
    </div>
  );
}