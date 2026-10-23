import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

export default function HistoryList({ history, onClear, t }) {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  if (!history || history.length === 0) {
    return (
      <div className="bg-white rounded-[2rem] border border-gray-200 p-12 text-center shadow-sm">
        <div className="w-20 h-20 bg-[#F8FAF8] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <h3 className="text-xl font-bold text-[#0A1C14] mb-2">Belum Ada Riwayat</h3>
        <p className="text-[#0A1C14] font-medium">Silakan lakukan deteksi pertama Anda di menu Deteksi.</p>
      </div>
    );
  }

  const filteredHistory = history.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm p-6 md:p-10 relative">
      
      {/* Header & Pencarian */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-2xl font-black text-[#0A1C14] tracking-tight">Daftar Riwayat</h2>
          <p className="text-[#0A1C14] font-medium text-sm mt-1">Total {history.length} deteksi tersimpan.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Cari nama penyakit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#F8FAF8] border-2 border-gray-200 rounded-xl text-sm font-medium text-[#0A1C14] placeholder-gray-400 focus:outline-none focus:border-[#0F766E] transition-all"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          
          <button
            onClick={() => setShowModal(true)}
            className="w-full sm:w-auto px-5 py-3 bg-red-50 text-red-600 font-bold rounded-xl text-sm border-2 border-red-100 hover:bg-red-100 transition-colors whitespace-nowrap"
          >
            Hapus Semua
          </button>
        </div>
      </div>
      
      {/* Daftar Riwayat (Timeline) */}
      {filteredHistory.length === 0 ? (
        <p className="text-center text-[#0A1C14] font-bold py-10">Penyakit tidak ditemukan dalam riwayat.</p>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((item, index) => (
            <div 
              key={item.id} 
              className="flex flex-col sm:flex-row items-start sm:items-center gap-5 p-4 rounded-2xl bg-white border-2 border-gray-100 hover:border-[#0F766E]/40 hover:shadow-md transition-all group"
            >
              <div className="relative shrink-0">
                <img
                  src={item.thumbnail}
                  alt={item.label}
                  className="w-20 h-20 object-cover rounded-xl border border-gray-200 shadow-sm group-hover:scale-105 transition-transform"
                />
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-[#0F766E] text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm">
                  {filteredHistory.length - index}
                </div>
              </div>
              
              <div className="flex-1">
                <h4 className="text-xl font-bold text-[#0A1C14] mb-1">{item.label}</h4>
                <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-[#0A1C14]">
                  <span className="bg-[#F0FDF4] text-[#0F766E] px-2.5 py-1 rounded-md border border-[#DCFCE7] flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {(item.confidence * 100).toFixed(1)}% Akurasi
                  </span>
                  <span className="flex items-center gap-1 text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    {new Date(item.created_at || item.timestamp).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          onClear();
          setShowModal(false);
        }}
      />
    </div>
  );
}