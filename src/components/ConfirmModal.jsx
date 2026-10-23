export default function ConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-gray-900/20 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 max-w-sm w-full p-6 animate-fade-in">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 tracking-tight">
            Hapus Riwayat
          </h3>
          
          <p className="text-sm text-gray-500 mb-8 leading-relaxed">
            Apakah kamu yakin ingin menghapus seluruh riwayat deteksi? Tindakan ini tidak bisa dibatalkan.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 bg-red-500 text-white rounded-xl text-sm font-semibold hover:bg-red-600 transition-colors shadow-sm"
          >
            Ya, Hapus
          </button>
        </div>
      </div>
    </div>
  );
}