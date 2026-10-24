import { useEffect } from "react";

export default function PopupAlert({ message, type = "success", onClose }) {
  // Auto close setelah 3 detik (opsional, bisa dihilangkan jika ingin user klik "Tutup")
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";
  const bgColor = isSuccess ? "bg-[#F0FDF4]" : "bg-red-50";
  const borderColor = isSuccess ? "border-[#DCFCE7]" : "border-red-200";
  const iconColor = isSuccess ? "text-[#0F766E]" : "text-red-600";
  const btnColor = isSuccess ? "bg-[#0F766E] hover:bg-[#0D655E]" : "bg-red-600 hover:bg-red-700";

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Latar belakang transparan TANPA BLUR */}
      <div 
        className="absolute inset-0 bg-black/40 transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Kotak Pop-up */}
      <div className={`relative bg-white rounded-[2rem] shadow-2xl border ${borderColor} max-w-sm w-full p-8 animate-fade-in text-center`}>
        <div className={`mx-auto flex items-center justify-center h-20 w-20 rounded-full ${bgColor} mb-6`}>
          {isSuccess ? (
            <svg className={`w-10 h-10 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
          ) : (
            <svg className={`w-10 h-10 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
          )}
        </div>
        
        <h3 className={`text-xl font-black mb-2 ${isSuccess ? 'text-[#0A1C14]' : 'text-red-700'}`}>
          {isSuccess ? "Berhasil!" : "Peringatan!"}
        </h3>
        
        <p className="text-gray-600 font-medium mb-8 leading-relaxed">
          {message}
        </p>

        <button
          onClick={onClose}
          className={`w-full py-3.5 ${btnColor} text-white rounded-xl text-sm font-bold transition-colors shadow-lg`}
        >
          Tutup
        </button>
      </div>
    </div>
  );
}