export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Latar belakang transparan tanpa blur */}
      <div 
        className="absolute inset-0 bg-[#0A1C14]/40 transition-opacity" 
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-[2rem] shadow-2xl border border-gray-100 max-w-sm w-full p-6 animate-fade-in text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-50 mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        </div>
        
        <h3 className="text-xl font-bold text-[#0A1C14] mb-2">{title || "Hapus Riwayat"}</h3>
        <p className="text-gray-500 font-medium mb-6 text-sm">{message || "Apakah kamu yakin ingin menghapus data ini? Tindakan ini tidak bisa dibatalkan."}</p>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl text-sm font-bold hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 transition-colors shadow-lg"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
}