export default function SuccessModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-[#0A1C14]/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-sm w-full p-8 animate-fade-in">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-[#F0FDF4] mb-6">
            <span className="text-[#0F766E] text-3xl font-bold">✓</span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">
            Registrasi Berhasil
          </h3>
          
          <p className="text-sm text-gray-500 mb-8 leading-relaxed">
            Silakan cek email Anda untuk verifikasi (jika diaktifkan) atau langsung login.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full px-4 py-3 bg-[#0A1C14] text-white rounded-xl text-sm font-bold hover:bg-black transition-colors shadow-lg"
        >
          Mengerti
        </button>
      </div>
    </div>
  );
}