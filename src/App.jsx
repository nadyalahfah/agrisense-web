import { useCallback, useEffect, useState } from "react";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import ModelStatus from "./components/ModelStatus";
import UploadCard from "./components/UploadCard";
import ResultCard from "./components/ResultCard";
import HistoryList from "./components/HistoryList";
import ImpactCalculator from "./components/ImpactCalculator";
import WeatherAlert from "./components/WeatherAlert";
import Statistics from "./components/Statistics";
import ReminderList from "./components/ReminderList";
import DiseaseMap from "./components/DiseaseMap";
import OnboardingModal from "./components/OnboardingModal";
import { useModel } from "./hooks/useModel";
import { predictImage } from "./utils/predict";
import { supabase } from "./utils/supabaseClient";
import { translations } from "./utils/translations";
import { CLASS_INFO } from "./utils/classes"; // Import untuk Mode Darurat

export default function App() {
  const { model, status, error } = useModel();
  const [activeTab, setActiveTab] = useState("deteksi");
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [predicting, setPredicting] = useState(false);
  const [predictError, setPredictError] = useState(null);
  const [lang, setLang] = useState("id");
  const [isInstalled, setIsInstalled] = useState(false);
  
  const [session, setSession] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [showLanding, setShowLanding] = useState(true);
  const [detectionId, setDetectionId] = useState(null);

  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = translations[lang];
  const user = session?.user;

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (session || isGuest) {
      const hasSeenOnboarding = localStorage.getItem('agrisense_onboarding');
      if (!hasSeenOnboarding) {
        setShowOnboarding(true);
      }
      fetchHistory();
    }
  }, [session, isGuest]);

  const handleCloseOnboarding = () => {
    localStorage.setItem('agrisense_onboarding', 'true');
    setShowOnboarding(false);
  };

  const fetchHistory = async () => {
    if (!session && isGuest) {
      const localHistory = JSON.parse(localStorage.getItem('agrisense_guest_history') || "[]");
      setHistory(localHistory);
      return;
    }

    const { data, error } = await supabase
      .from('detections')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (!error) setHistory(data || []);
  };

  const handleImageSelected = useCallback(
    async (file, url) => {
      setPredicting(true);
      setPredictError(null);
      setResult(null);
      setDetectionId(null);

      try {
        const img = new Image();
        img.src = url;
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        const prediction = await predictImage(model, img);
        setResult(prediction);

        if (session) {
          let lat = null;
          let lng = null;
          try {
            const pos = await new Promise((resolve, reject) => {
              navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
            });
            lat = pos.coords.latitude;
            lng = pos.coords.longitude;
          } catch (e) {
            console.log("GPS ditolak atau gagal");
          }

          const { data } = await supabase.from('detections').insert([
            {
              label: prediction.label,
              confidence: prediction.confidence,
              thumbnail: url,
              user_id: user.id,
              latitude: lat,
              longitude: lng
            },
          ]).select();

          if (data && data.length > 0) {
            setDetectionId(data[0].id);
          }
        } else if (isGuest) {
          const localHistory = JSON.parse(localStorage.getItem('agrisense_guest_history') || "[]");
          const newItem = {
            id: Date.now(),
            label: prediction.label,
            confidence: prediction.confidence,
            thumbnail: url,
            created_at: new Date().toISOString()
          };
          const updatedHistory = [newItem, ...localHistory].slice(0, 20);
          localStorage.setItem('agrisense_guest_history', JSON.stringify(updatedHistory));
          setDetectionId(newItem.id);
        }

        await fetchHistory();
      } catch (err) {
        setPredictError(err.message || "Gagal memproses gambar");
      } finally {
        setPredicting(false);
      }
    },
    [model, session, isGuest, user]
  );

  const clearHistory = async () => {
    if (session) {
      const { error } = await supabase.from('detections').delete().eq('user_id', user.id);
      if (!error) setHistory([]);
    } else {
      localStorage.removeItem('agrisense_guest_history');
      setHistory([]);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsGuest(false);
    setHistory([]);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0A1C14] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-[#0F766E] border-t-[#DCFCE7] rounded-full animate-spin mb-6"></div>
        <p className="text-[#DCFCE7] font-bold tracking-widest uppercase text-xs">Memuat Sistem...</p>
      </div>
    );
  }

  if (showLanding) {
    return (
      <LandingPage 
        onStart={() => setShowLanding(false)} 
        lang={lang} 
        setLang={setLang} 
        t={t} 
      />
    );
  }

  if (!session && !isGuest) {
    return (
      <Login 
        onLoginSuccess={() => setIsGuest(false)} 
        onContinueAsGuest={() => setIsGuest(true)} 
      />
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8FAF8] print:h-auto print:overflow-visible font-sans">
      
      {isOffline && (
        <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-2 text-sm font-bold z-[9999] animate-fade-in shadow-lg">
          Koneksi internet terputus. Anda berada dalam Mode Offline.
        </div>
      )}

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        t={t} 
        isInstalled={isInstalled} 
        lang={lang}
        setLang={setLang}
        user={user}
        onLogout={handleLogout}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="flex-1 overflow-y-auto print:overflow-visible relative">
        
        {/* HEADER YANG SUDAH DIPERBAIKI */}
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 px-4 py-3 md:px-6 md:py-4 flex justify-between items-center sticky top-0 z-20 print:hidden">
          
          {/* BAGIAN KIRI: Hamburger + Logo (HP) + Status Akun (Laptop) */}
          <div className="flex items-center gap-3 md:gap-6">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-1.5 text-[#0F766E] bg-[#F0FDF4] rounded-lg border border-[#DCFCE7]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>

            <div className="md:hidden flex items-center gap-2">
              <div className="w-9 h-9 flex items-center justify-center shrink-0">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <h1 className="text-base font-light tracking-widest text-[#0F766E]">
                AGRI<span className="font-bold">SENSE</span>
              </h1>
            </div>

            <div className="hidden md:block">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Status Akun</p>
              <p className="text-sm font-bold text-[#0F766E]">
                {user ? user.email : "Mode Tamu (Guest)"}
              </p>
            </div>
          </div>
          
          {/* BAGIAN KANAN: Dropdown Bahasa & Tombol Keluar/Masuk */}
          <div className="flex items-center gap-2 md:gap-4">
            <select 
              value={lang} 
              onChange={(e) => setLang(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-[#0F766E] text-[10px] md:text-xs font-bold rounded-lg px-2 py-1.5 md:px-3 md:py-2 focus:outline-none focus:border-[#0F766E] cursor-pointer"
            >
              <option value="id">ID</option>
              <option value="en">EN</option>
            </select>

            {user ? (
              <button
                onClick={handleLogout}
                className="text-[10px] md:text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-100 px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-colors"
              >
                Keluar
              </button>
            ) : (
              <button
                onClick={() => setIsGuest(false)}
                className="text-[10px] md:text-xs font-bold text-[#0F766E] bg-[#F0FDF4] hover:bg-[#DCFCE7] border border-[#DCFCE7] px-3 py-1.5 md:px-4 md:py-2 rounded-lg transition-colors"
              >
                Masuk
              </button>
            )}
          </div>
        </header>

        <div className="p-4 pb-10 md:p-10 max-w-5xl mx-auto space-y-8 print:p-0">
          
          <div className="hidden md:block print:hidden">
            <h2 className="text-3xl font-light text-[#0F766E] tracking-tight mb-2">
              {activeTab === 'deteksi' && t.detection}
              {activeTab === 'riwayat' && t.history}
              {activeTab === 'cuaca' && t.weather}
              {activeTab === 'statistik' && t.stats}
              {activeTab === 'jadwal' && "Jadwal Perawatan"}
              {activeTab === 'peta' && "Peta Sebaran Penyakit"}
              {activeTab === 'bantuan_darurat' && "Panduan Darurat"}
            </h2>
            <p className="text-sm text-gray-500 font-medium">
              {activeTab === 'deteksi' && "Unggah foto daun padi untuk mendeteksi penyakit secara instan."}
              {activeTab === 'riwayat' && "Daftar hasil deteksi yang tersimpan di database Anda."}
              {activeTab === 'cuaca' && "Pantau kondisi cuaca dan risiko penyakit di lokasi Anda."}
              {activeTab === 'statistik' && "Analisis data deteksi dan dampak ekonomi Anda."}
              {activeTab === 'jadwal' && "Daftar tugas perawatan tanaman padi Anda."}
              {activeTab === 'peta' && "Sebaran penyakit padi berdasarkan laporan pengguna."}
              {activeTab === 'bantuan_darurat' && "Panduan penanganan pertama saat Anda tidak memiliki akses internet."}
            </p>
          </div>

          {activeTab === "deteksi" && (
            <div className="space-y-8 animate-fade-in print:space-y-4">
              <ModelStatus status={status} error={error} />
              
              {/* TOMBOL MODE DARURAT (MUNCUL JIKA OFFLINE) */}
              {isOffline && (
                <div className="bg-red-50 border-2 border-red-200 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-fade-in">
                  <div>
                    <h3 className="text-lg font-bold text-red-700">Anda Sedang Offline</h3>
                    <p className="text-red-600 text-sm font-medium">Jangan khawatir, Anda tetap bisa membaca panduan penanganan darurat.</p>
                  </div>
                  <button 
                    onClick={() => setActiveTab("bantuan_darurat")}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-colors whitespace-nowrap"
                  >
                    Buka Panduan Darurat
                  </button>
                </div>
              )}

              <UploadCard onImageSelected={handleImageSelected} disabled={predicting} t={t} />
              
              {predicting && (
                <div className="bg-[#0A1C14] rounded-[2rem] border border-gray-800 shadow-2xl p-12 flex flex-col items-center justify-center relative overflow-hidden animate-fade-in min-h-[300px]">
                  <div className="absolute inset-0 opacity-20">
                    <img src="/hero-rice.jpeg" alt="Bg" className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#DCFCE7] to-transparent shadow-[0_0_20px_rgba(220,252,231,0.8)] animate-scan"></div>

                  <div className="relative z-10 flex flex-col items-center">
                    <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
                      <div className="absolute inset-0 border border-[#0F766E]/50 rounded-full animate-ping"></div>
                      <div className="absolute inset-2 border border-[#0F766E]/30 rounded-full animate-pulse"></div>
                      <img src="/logo.png" alt="Loading" className="w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(220,252,231,0.5)]" />
                    </div>
                    <p className="text-xl font-bold text-white tracking-widest uppercase mb-2">Memindai Gambar</p>
                    <p className="text-sm text-[#DCFCE7]/70 font-mono">Mengekstraksi fitur visual...</p>
                  </div>
                </div>
              )}

              {predictError && (
                <div className="bg-red-50 border border-red-100 text-red-600 p-5 rounded-2xl text-sm font-bold">
                  {predictError}
                </div>
              )}

              <ResultCard result={result} t={t} user={user} detectionId={detectionId} />
              {result && <ImpactCalculator diseaseLabel={result.label} />}
            </div>
          )}

          {activeTab === "riwayat" && (
            <div className="animate-fade-in">
              <HistoryList history={history} onClear={clearHistory} t={t} />
            </div>
          )}

          {activeTab === "cuaca" && (
            <div className="animate-fade-in space-y-6">
              <WeatherAlert />
            </div>
          )}

          {activeTab === "statistik" && (
            <div className="animate-fade-in">
              <Statistics history={history} />
            </div>
          )}

          {activeTab === "jadwal" && (
            <div className="animate-fade-in">
              <ReminderList user={user} />
            </div>
          )}

          {activeTab === "peta" && (
            <div className="animate-fade-in">
              <DiseaseMap />
            </div>
          )}

          {/* HALAMAN MODE DARURAT (OFFLINE) */}
          {activeTab === "bantuan_darurat" && (
            <div className="animate-fade-in space-y-6">
              <div className="bg-[#0A1C14] p-8 rounded-3xl text-white shadow-xl mb-8">
                <h2 className="text-3xl font-black mb-2">Panduan Darurat Offline</h2>
                <p className="text-[#DCFCE7]">Daftar tindakan pertama untuk penyakit padi yang paling umum. Halaman ini dapat diakses tanpa internet.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(CLASS_INFO).map(([key, info]) => {
                  if (key === "Healthy") return null;
                  return (
                    <div key={key} className="bg-white rounded-2xl p-6 border-2 border-gray-100 shadow-sm hover:border-[#0F766E]/30 transition-colors">
                      <h3 className="text-xl font-bold text-[#0F766E] mb-4 border-b border-gray-100 pb-2">{key}</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">1. Tindakan Segera</p>
                          <p className="text-sm text-gray-700 font-medium">{info.actionPlan.step1}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">2. Pengobatan</p>
                          <p className="text-sm text-gray-700 font-medium">{info.actionPlan.step2}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">3. Pencegahan</p>
                          <p className="text-sm text-gray-700 font-medium">{info.actionPlan.step3}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      <OnboardingModal isOpen={showOnboarding} onClose={handleCloseOnboarding} />

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
}