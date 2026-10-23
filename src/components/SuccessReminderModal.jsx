export default function SuccessReminderModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      {/* Latar belakang transparan tanpa blur */}
      <div 
        className="absolute inset-0 bg-[#0A1C14]/30 transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Kotak Modal */}
      <div className="relative bg-white rounded-[2rem] shadow-2xl border border-gray-100 max-w-sm w-full p-8 animate-fade-in text-center">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-[#F0FDF4] mb-6 shadow-sm border border-[#DCFCE7]">
          <svg className="w-10 h-10 text-[#0F766E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
        </div>
        
        <h3 className="text-2xl font-black text-[#0A1C14] mb-3 tracking-tight">
          Jadwal Dibuat!
        </h3>
        
        <p className="text-[#0A1C14] font-medium mb-8 leading-relaxed">
          3 Jadwal perawatan berhasil disimpan. Silakan buka menu <span className="font-bold text-[#0F766E]">"Jadwal"</span> di sidebar untuk melihatnya.
        </p>

        <button
          onClick={onClose}
          className="w-full px-6 py-3.5 bg-[#0F766E] text-white rounded-xl text-sm font-bold hover:bg-[#0D655E] transition-colors shadow-lg"
        >
          Mengerti
        </button>
      </div>
    </div>
  );
}