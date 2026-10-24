import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

export default function HistoryList({ history, onClear, onDeleteSingle, onDeleteMultiple, t }) {
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [isSelectionMode, setIsSelectionMode] = useState(false); // State untuk mode pilih
  const [deleteTarget, setDeleteTarget] = useState(null); 

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

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectAll = () => {
    if (selectedIds.length === filteredHistory.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredHistory.map(item => item.id));
    }
  };

  const cancelSelection = () => {
    setIsSelectionMode(false);
    setSelectedIds([]);
  };

  return (
    <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm p-6 md:p-10 relative">
      
      {/* Header & Pencarian */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 border-b border-gray-100 pb-6">
        <div>
          <h2 className="text-2xl font-black text-[#0A1C14] tracking-tight">Daftar Riwayat</h2>
          <p className="text-[#0A1C14] font-medium text-sm mt-1">Total {history.length} deteksi tersimpan.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Cari penyakit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F8FAF8] border-2 border-gray-200 rounded-xl text-sm font-medium text-[#0A1C14] placeholder-gray-400 focus:outline-none focus:border-[#0F766E] transition-all"
            />
            <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          
          {/* Tombol Mode Pilih / Batal */}
          {!isSelectionMode ? (
            <button
              onClick={() => setIsSelectionMode(true)}
              className="w-full sm:w-auto px-5 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl text-sm hover:bg-gray-200 transition-colors whitespace-nowrap"
            >
              Pilih
            </button>
          ) : (
            <button
              onClick={cancelSelection}
              className="w-full sm:w-auto px-5 py-2.5 bg-red-50 text-red-600 font-bold rounded-xl text-sm border border-red-100 hover:bg-red-100 transition-colors whitespace-nowrap"
            >
              Batal
            </button>
          )}
        </div>
      </div>

      {/* Toolbar Aksi (Muncul hanya di Mode Pilih) */}
      {isSelectionMode && (
        <div className="flex flex-wrap items-center justify-between bg-[#F8FAF8] p-4 rounded-xl border border-gray-200 mb-6 gap-4">
          <button onClick={selectAll} className="text-sm font-bold text-[#0F766E] hover:underline">
            {selectedIds.length === filteredHistory.length ? "Batal Pilih Semua" : "Pilih Semua"}
          </button>
          
          {selectedIds.length > 0 && (
            <button
              onClick={() => setShowModal(true)}
              className="px-4 py-2 bg-red-500 text-white font-bold rounded-lg text-sm hover:bg-red-600 transition-colors shadow-md flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              Hapus {selectedIds.length} Terpilih
            </button>
          )}
        </div>
      )}
      
      {/* Daftar Riwayat */}
      {filteredHistory.length === 0 ? (
        <p className="text-center text-[#0A1C14] font-bold py-10">Penyakit tidak ditemukan dalam riwayat.</p>
      ) : (
        <div className="space-y-4">
          {filteredHistory.map((item, index) => {
            const isSelected = selectedIds.includes(item.id);

            return (
              <div 
                key={item.id} 
                className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-2xl border-2 transition-all group
                  ${isSelected ? 'border-[#0F766E] bg-[#F0FDF4]' : 'bg-white border-gray-100 hover:border-[#0F766E]/30 hover:shadow-sm'}
                `}
              >
                {/* Checkbox (Hanya Muncul di Mode Pilih) */}
                {isSelectionMode && (
                  <button 
                    onClick={() => toggleSelect(item.id)}
                    className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-[#0F766E] border-[#0F766E]' : 'bg-white border-gray-300'}`}
                  >
                    {isSelected && <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                  </button>
                )}

                <div className="relative shrink-0">
                  <img
                    src={item.thumbnail}
                    alt={item.label}
                    className="w-20 h-20 object-cover rounded-xl border border-gray-200 shadow-sm"
                  />
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

                {/* Tombol Hapus Satuan (Hanya Muncul di Mode Pilih) */}
                {isSelectionMode && (
                  <button
                    onClick={() => setDeleteTarget(item.id)}
                    className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                    title="Hapus item ini"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Modal Hapus Massal */}
      <ConfirmModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          onDeleteMultiple(selectedIds);
          setSelectedIds([]);
          setIsSelectionMode(false);
          setShowModal(false);
        }}
        title="Hapus Riwayat Terpilih"
        message={`Apakah kamu yakin ingin menghapus ${selectedIds.length} data riwayat yang dipilih?`}
      />

      {/* Modal Hapus Satuan */}
      <ConfirmModal 
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          onDeleteSingle(deleteTarget);
          setSelectedIds(selectedIds.filter(id => id !== deleteTarget));
          setDeleteTarget(null);
        }}
        title="Hapus Riwayat Ini"
        message="Apakah kamu yakin ingin menghapus data riwayat ini?"
      />
    </div>
  );
}