import { useState } from "react";

export default function Sidebar({ 
  activeTab, 
  setActiveTab, 
  t, 
  isInstalled, 
  lang, 
  setLang, 
  user, 
  onLogout,
  isDarkMode,
  setIsDarkMode,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) {
  const [showSettings, setShowSettings] = useState(false);

  // Daftar menu (termasuk mode darurat)
  const menus = [
    { id: "deteksi", label: t.detection },
    { id: "riwayat", label: t.history },
    { id: "cuaca", label: t.weather },
    { id: "statistik", label: t.stats },
    { id: "jadwal", label: "Jadwal" },
    { id: "peta", label: "Peta" },
    { id: "bantuan_darurat", label: "Darurat" },
  ];

  const handleMenuClick = (id) => {
    setActiveTab(id);
    setIsMobileMenuOpen(false); // Tutup menu otomatis saat menu diklik di HP
  };

  return (
    <>
      {/* Latar Belakang Gelap saat Menu HP Terbuka */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[90] md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* SIDEBAR (Tampil di Desktop, Meluncur di HP) */}
      <aside className={`
        fixed md:static top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-[100] flex flex-col print:hidden transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
      `}>
        
        {/* Tombol Tutup (Hanya di HP) */}
        <div className="md:hidden absolute top-4 right-4">
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-500 hover:text-red-500 p-2 bg-gray-50 rounded-full"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-11 h-11 flex items-center justify-center shrink-0">
            <img src="/logo.png" alt="AgriSense Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-xl font-light text-[#0F766E] tracking-tight leading-none">
              Agri<span className="font-semibold">Sense</span>
            </h1>
            <p className="text-[9px] uppercase tracking-widest text-gray-400 mt-1 font-medium">
              Rice Disease AI
            </p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {menus.map((menu) => (
            <button
              key={menu.id}
              onClick={() => handleMenuClick(menu.id)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                ${activeTab === menu.id 
                  ? "bg-[#F0FDF4] text-[#0F766E] border border-[#DCFCE7]" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-[#0F766E]"}
              `}
            >
              {menu.label}
            </button>
          ))}
        </nav>

        {!isInstalled && (
          <div className="p-4 mx-4 mb-4 bg-gray-50 border border-gray-100 rounded-lg">
            <p className="text-[10px] text-gray-500 leading-tight">
              <strong className="text-[#0F766E] block mb-1">PWA Ready</strong>
              Aplikasi ini dapat diinstal di HP Anda.
            </p>
          </div>
        )}

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => setShowSettings(true)}
            className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-500 hover:text-[#0F766E] transition-colors rounded-lg hover:bg-gray-50"
          >
            <span>Pengaturan</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
      </aside>

      {/* MODAL PENGATURAN */}
      {showSettings && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-[#0A1C14]/40 transition-opacity" 
            onClick={() => setShowSettings(false)}
          ></div>
          
          <div className="relative bg-white rounded-[2rem] shadow-2xl border border-gray-100 max-w-md w-full overflow-hidden animate-fade-in">
            <div className="bg-[#F8FAF8] p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-black text-[#0F766E]">Pengaturan</h3>
              <button 
                onClick={() => setShowSettings(false)}
                className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-red-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Profil Akun */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Informasi Akun</p>
                <div className="flex items-center gap-4 bg-[#F8FAF8] p-4 rounded-xl border border-gray-100">
                  <div className="w-12 h-12 bg-[#0F766E] text-white rounded-full flex items-center justify-center font-bold text-lg">
                    {user ? user.email[0].toUpperCase() : "G"}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-bold text-[#0F766E] truncate">{user ? user.email : "Mode Tamu (Guest)"}</p>
                    <p className="text-xs font-medium text-[#0F766E]/70">{user ? "Akun Terverifikasi" : "Akses Terbatas"}</p>
                  </div>
                </div>
              </div>

              {/* Preferensi Bahasa */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Bahasa Aplikasi</p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setLang("id")}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold border transition-colors ${lang === 'id' ? 'bg-[#0F766E] text-white border-[#0F766E]' : 'bg-white text-gray-600 border-gray-200 hover:bg-[#F0FDF4] hover:text-[#0F766E]'}`}
                  >
                    Indonesia
                  </button>
                  <button 
                    onClick={() => setLang("en")}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-bold border transition-colors ${lang === 'en' ? 'bg-[#0F766E] text-white border-[#0F766E]' : 'bg-white text-gray-600 border-gray-200 hover:bg-[#F0FDF4] hover:text-[#0F766E]'}`}
                  >
                    English
                  </button>
                </div>
              </div>

              {/* Mode Gelap */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Tampilan</p>
                <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`w-full py-3 rounded-xl text-sm font-bold border transition-colors flex items-center justify-between px-4 ${isDarkMode ? 'bg-[#0F766E] text-white border-[#0F766E]' : 'bg-white text-gray-600 border-gray-200'}`}
                >
                  <span>Mode Gelap (Dark Mode)</span>
                  <div className={`w-10 h-6 rounded-full flex items-center p-1 transition-colors ${isDarkMode ? 'bg-white' : 'bg-gray-300'}`}>
                    <div className={`w-4 h-4 rounded-full bg-[#0F766E] transform transition-transform ${isDarkMode ? 'translate-x-4' : 'translate-x-0'}`}></div>
                  </div>
                </button>
              </div>

              {/* Info Aplikasi */}
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Tentang Aplikasi</p>
                <div className="bg-[#F8FAF8] p-4 rounded-xl border border-gray-100 text-sm font-medium text-gray-600 space-y-1">
                  <p className="flex justify-between"><span>Versi</span> <span className="font-bold text-[#0F766E]">1.0.0</span></p>
                  <p className="flex justify-between"><span>Model AI</span> <span className="font-bold text-[#0F766E]">MobileNetV2</span></p>
                  <p className="flex justify-between"><span>Status</span> <span className="font-bold text-[#0F766E]">Aktif</span></p>
                </div>
              </div>

              {/* Tombol Logout */}
              {user && (
                <button
                  onClick={() => {
                    setShowSettings(false);
                    onLogout();
                  }}
                  className="w-full py-3 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100 hover:bg-red-100 transition-colors"
                >
                  Keluar dari Akun
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}