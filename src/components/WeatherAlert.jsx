import { useEffect, useState } from "react";

export default function WeatherAlert() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolokasi tidak didukung oleh browser ini.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=rain,temperature_2m,relative_humidity_2m`
          );
          const data = await res.json();
          
          setWeather({
            rain: data.current.rain,
            temp: data.current.temperature_2m,
            humidity: data.current.relative_humidity_2m,
          });
        } catch (err) {
          setError("Gagal mengambil data cuaca.");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError("Izin lokasi ditolak. Cuaca tidak dapat dimuat.");
        setLoading(false);
      }
    );
  }, []);

  const getAlert = () => {
    if (!weather) return null;
    if (weather.rain > 5) {
      return {
        type: "danger",
        title: "Waspada Hujan Lebat",
        text: "Curah hujan tinggi terdeteksi. Waspada penyebaran penyakit jamur (Blast/Sheath Blight). Pastikan drainase lancar.",
        icon: "M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
      };
    }
    if (weather.humidity > 80) {
      return {
        type: "warning",
        title: "Kelembapan Tinggi",
        text: "Kelembapan udara sangat tinggi. Risiko penyakit jamur meningkat. Hindari pemupukan Nitrogen berlebih.",
        icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      };
    }
    if (weather.temp > 32) {
      return {
        type: "warning",
        title: "Suhu Udara Panas",
        text: "Suhu udara panas. Waspada serangan hama wereng dan pastikan tanaman cukup air.",
        icon: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      };
    }
    return {
      type: "safe",
      title: "Cuaca Aman",
      text: "Kondisi cuaca saat ini relatif aman. Tetap pantau tanaman secara rutin.",
      icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    };
  };

  const alert = getAlert();

  // --- FITUR BARU: TEXT TO SPEECH ---
  const handleSpeak = () => {
    if ('speechSynthesis' in window && alert) {
      window.speechSynthesis.cancel(); // Hentikan suara sebelumnya
      const textToSpeak = `${alert.title}. ${alert.text}. Suhu saat ini ${weather.temp} derajat celcius, dengan kelembapan ${weather.humidity} persen.`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'id-ID'; // Bahasa Indonesia
      utterance.rate = 0.9; // Sedikit lebih lambat agar jelas
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Browser Anda tidak mendukung fitur suara.");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-[2rem] border-2 border-gray-100 p-12 text-center shadow-sm flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-12 h-12 border-4 border-[#0F766E] border-t-[#DCFCE7] rounded-full animate-spin mb-4"></div>
        <p className="text-[#0A1C14] font-bold text-lg">Mendeteksi lokasi Anda...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-[2rem] border-2 border-gray-100 p-12 text-center shadow-sm">
        <p className="text-[#0A1C14] font-bold text-lg">{error}</p>
        <p className="text-gray-500 font-medium mt-2">Anda tetap bisa menggunakan fitur deteksi.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Kotak Cuaca Utama */}
      <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border-2 border-gray-100 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-[#F0FDF4] rounded-full opacity-50 pointer-events-none"></div>

        <div className="relative z-10 text-center md:text-left">
          <p className="text-sm font-bold text-[#0F766E] uppercase tracking-widest mb-2">Suhu Saat Ini</p>
          <div className="flex items-baseline justify-center md:justify-start gap-2">
            <p className="text-7xl md:text-8xl font-black text-[#0A1C14]">{weather.temp}</p>
            <p className="text-4xl font-bold text-[#0A1C14]">°C</p>
          </div>
          <p className="text-lg font-bold text-gray-500 mt-2">Lokasi Anda Saat Ini</p>
        </div>

        <div className="flex gap-4 md:gap-6 relative z-10">
          <div className="bg-[#F8FAF8] border-2 border-gray-100 rounded-2xl p-5 text-center min-w-[120px]">
            <svg className="w-8 h-8 text-[#0F766E] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
            <p className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider">Kelembapan</p>
            <p className="text-2xl font-black text-[#0A1C14]">{weather.humidity}%</p>
          </div>
          
          <div className="bg-[#F8FAF8] border-2 border-gray-100 rounded-2xl p-5 text-center min-w-[120px]">
            <svg className="w-8 h-8 text-[#0F766E] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
            <p className="text-xs text-gray-500 font-bold mb-1 uppercase tracking-wider">Curah Hujan</p>
            <p className="text-2xl font-black text-[#0A1C14]">{weather.rain} mm</p>
          </div>
        </div>
      </div>

      {/* Kotak Peringatan & Edukasi */}
      <div className={`rounded-[2rem] border-2 p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-sm
        ${alert.type === 'danger' ? 'bg-red-50 border-red-200' : ''}
        ${alert.type === 'warning' ? 'bg-amber-50 border-amber-200' : ''}
        ${alert.type === 'safe' ? 'bg-[#F0FDF4] border-[#DCFCE7]' : ''}
      `}>
        <div className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center shadow-sm
          ${alert.type === 'danger' ? 'bg-red-500 text-white' : ''}
          ${alert.type === 'warning' ? 'bg-amber-500 text-white' : ''}
          ${alert.type === 'safe' ? 'bg-[#0F766E] text-white' : ''}
        `}>
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={alert.icon}></path></svg>
        </div>
        
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h3 className={`text-2xl font-black
              ${alert.type === 'danger' ? 'text-red-700' : ''}
              ${alert.type === 'warning' ? 'text-amber-700' : ''}
              ${alert.type === 'safe' ? 'text-[#0F766E]' : ''}
            `}>{alert.title}</h3>
            
            {/* TOMBOL SPEAKER */}
            <button 
              onClick={handleSpeak}
              className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center hover:bg-white transition-colors border border-black/5"
              title="Dengarkan"
            >
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path></svg>
            </button>
          </div>
          <p className="text-[#0A1C14] leading-relaxed text-lg font-medium">{alert.text}</p>
        </div>
      </div>

      {/* Edukasi Tambahan */}
      <div className="bg-white rounded-[2rem] border-2 border-gray-100 p-8 md:p-10 shadow-sm">
        <h3 className="text-lg font-bold text-[#0A1C14] mb-3">Mengapa Cuaca Penting untuk Padi?</h3>
        <p className="text-[#0A1C14] leading-relaxed font-medium text-lg">
          Penyakit jamur seperti <em>Blast</em> dan <em>Sheath Blight</em> berkembang pesat saat kelembapan tinggi dan curah hujan berlebih. Fitur ini membantu Anda mengambil tindakan preventif sebelum penyakit menyerang tanaman Anda.
        </p>
      </div>
    </div>
  );
}