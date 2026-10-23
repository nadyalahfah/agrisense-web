import { useState, useEffect } from "react";

export default function LandingPage({ onStart, lang, setLang, t }) {
  const [typedText, setTypedText] = useState("");
  const fullText = t.landing.heroTitle2;

  useEffect(() => {
    setTypedText("");
    let i = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="min-h-screen bg-[#FDFDFD] font-sans overflow-x-hidden selection:bg-[#0F766E] selection:text-white">
      
      {/* NAVBAR */}
      <nav className="absolute top-0 left-0 right-0 z-50 px-4 py-4 md:px-6 md:py-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="w-10 h-10 md:w-14 md:h-14 bg-white rounded-xl md:rounded-2xl p-1 shadow-xl flex items-center justify-center">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <div>
            <h1 className="text-xl md:text-3xl font-light tracking-tight text-white drop-shadow-lg leading-none">
              Agri<span className="font-bold text-[#DCFCE7]">Sense</span>
            </h1>
            <p className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-[#DCFCE7]/80 mt-1 font-bold">
              Rice Disease AI
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)}
            className="bg-white/10 border border-white/20 text-white text-[10px] md:text-xs font-bold rounded-full px-2 py-1.5 md:px-4 md:py-2 focus:outline-none backdrop-blur-lg cursor-pointer appearance-none shadow-lg"
          >
            <option value="id" className="text-gray-900">ID</option>
            <option value="en" className="text-gray-900">EN</option>
          </select>
          <button
            onClick={onStart}
            className="text-[10px] md:text-sm font-bold text-[#0F766E] bg-white hover:bg-gray-50 px-3 py-1.5 md:px-8 md:py-3 rounded-full transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 whitespace-nowrap"
          >
            {t.landing.navStart}
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/hero-rice.jpeg" alt="Padi" className="w-full h-full object-cover object-center scale-105 animate-slow-zoom" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1C14]/90 via-[#0A1C14]/75 to-[#0A1C14]/95"></div>
        </div>

        <div className="relative z-10 text-center px-4 w-full max-w-6xl mx-auto mt-24">
          <div className="inline-block mb-8 px-6 py-2.5 bg-white/10 border border-white/20 rounded-full backdrop-blur-xl animate-fade-in-up shadow-lg">
            <span className="text-xs font-bold text-[#DCFCE7] tracking-[0.2em] uppercase">
              {t.landing.heroBadge}
            </span>
          </div>
          
          <h1 className="text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[6.5rem] font-light tracking-tighter text-white mb-8 leading-[1.05] animate-fade-in-up drop-shadow-2xl" style={{ animationDelay: '100ms' }}>
            <span className="whitespace-nowrap">{t.landing.heroTitle1}</span> <br />
            <span className="font-bold text-[#DCFCE7] whitespace-nowrap">
              {typedText}<span className="animate-pulse font-thin text-white/50">|</span>
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto font-light animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {t.landing.heroDesc}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <button onClick={onStart} className="w-full sm:w-auto px-12 py-4 bg-[#0F766E] text-white font-bold rounded-full hover:bg-[#0D655E] transition-all shadow-[0_0_50px_rgba(15,118,110,0.5)] hover:shadow-[0_0_70px_rgba(15,118,110,0.8)] hover:-translate-y-1 text-lg">
              {t.landing.heroBtn1}
            </button>
            <a href="#fitur" className="w-full sm:w-auto px-12 py-4 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 backdrop-blur-xl transition-all border border-white/30 text-lg shadow-lg">
              {t.landing.heroBtn2}
            </a>
          </div>
        </div>
      </section>

      {/* STATISTIK MELAYANG */}
      <section className="relative z-30 -mt-16 max-w-6xl mx-auto px-6">
        <div className="bg-white/90 backdrop-blur-2xl border border-white shadow-2xl rounded-3xl p-4 grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-100">
          <div className="p-6 text-center group">
            <p className="text-4xl font-black text-[#0F766E] mb-1 group-hover:scale-110 transition-transform">90%+</p>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Akurasi AI</p>
          </div>
          <div className="p-6 text-center group">
            <p className="text-4xl font-black text-[#0F766E] mb-1 group-hover:scale-110 transition-transform">10+</p>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Jenis Penyakit</p>
          </div>
          <div className="p-6 text-center group">
            <p className="text-4xl font-black text-[#0F766E] mb-1 group-hover:scale-110 transition-transform">&lt; 3s</p>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Waktu Deteksi</p>
          </div>
          <div className="p-6 text-center group">
            <p className="text-4xl font-black text-[#0F766E] mb-1 group-hover:scale-110 transition-transform">100%</p>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">Privasi Lokal</p>
          </div>
        </div>
      </section>

      {/* FITUR UTAMA (MOCKUP + TEKS) */}
      <section id="fitur" className="py-32 bg-[#F8FAF8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <div className="order-2 lg:order-1">
              <div className="inline-block px-5 py-2 bg-white border border-[#DCFCE7] rounded-full mb-8 shadow-sm">
                <span className="text-xs font-bold text-[#0F766E] tracking-widest uppercase">Fitur Unggulan</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-[#0A1C14] mb-8 leading-[1.1] tracking-tight">{t.landing.featTitle}</h2>
              <p className="text-xl text-gray-600 font-light leading-relaxed mb-10">{t.landing.featDesc}</p>
              <button onClick={onStart} className="px-10 py-4 bg-[#0F766E] text-white font-bold rounded-2xl hover:bg-[#0D655E] transition-all shadow-xl hover:-translate-y-1 text-sm">
                Coba Deteksi Sekarang
              </button>
            </div>
            
            <div className="relative order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0F766E] to-[#DCFCE7] rounded-[3rem] transform rotate-3 scale-105 opacity-30 blur-2xl"></div>
              <div className="relative bg-white border border-gray-100 p-8 rounded-[2.5rem] shadow-2xl">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-5 mb-6">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-400"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-amber-400"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-green-400"></div>
                  <p className="text-xs text-gray-400 font-mono ml-4 font-semibold">agrisense-dashboard.app</p>
                </div>
                <div className="space-y-5">
                  <div className="h-48 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center relative overflow-hidden">
                     <img src="/hero-rice.jpeg" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                     <span className="relative z-10 bg-white/95 backdrop-blur px-6 py-3 rounded-xl text-sm font-bold text-gray-900 shadow-md">Upload Foto Daun Padi</span>
                  </div>
                  <div className="bg-[#F0FDF4] rounded-2xl p-5 border border-[#DCFCE7]">
                    <p className="text-base font-bold text-[#0F766E] mb-1">Hasil Deteksi: Leaf Blast</p>
                    <p className="text-sm font-medium text-[#0F766E]/80">Tingkat keyakinan: 94.2%</p>
                  </div>
                  <div className="bg-red-50 rounded-2xl p-5 border border-red-100">
                    <p className="text-base font-bold text-red-600 mb-1">Potensi Kerugian: Rp 13.600.000</p>
                    <p className="text-sm font-medium text-red-600/80">Berdasarkan luas lahan 1 Hektar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3 PILAR FITUR */}
          <div className="text-center mb-20">
            <h3 className="text-3xl md:text-5xl font-bold text-[#0A1C14] mb-6 tracking-tight">Lebih dari Sekadar Diagnosis</h3>
            <p className="text-gray-500 text-xl max-w-2xl mx-auto">Tiga pilar utama AgriSense untuk mendukung produktivitas Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl hover:border-[#0F766E]/30 transition-all duration-500 hover:-translate-y-3">
              <div className="w-16 h-16 shrink-0 bg-[#F0FDF4] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <span className="text-[#0F766E] font-black text-2xl">1</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.landing.feat1Title}</h3>
              <p className="text-gray-500 leading-relaxed text-lg">{t.landing.feat1Desc}</p>
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0F766E] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 rounded-b-[2.5rem]"></div>
            </div>

            <div className="group relative p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl hover:border-[#0F766E]/30 transition-all duration-500 hover:-translate-y-3">
              <div className="w-16 h-16 shrink-0 bg-[#F0FDF4] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <span className="text-[#0F766E] font-black text-2xl">2</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.landing.feat2Title}</h3>
              <p className="text-gray-500 leading-relaxed text-lg">{t.landing.feat2Desc}</p>
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0F766E] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 rounded-b-[2.5rem]"></div>
            </div>

            <div className="group relative p-10 rounded-[2.5rem] bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-2xl hover:border-[#0F766E]/30 transition-all duration-500 hover:-translate-y-3">
              <div className="w-16 h-16 shrink-0 bg-[#F0FDF4] rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                <span className="text-[#0F766E] font-black text-2xl">3</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.landing.feat3Title}</h3>
              <p className="text-gray-500 leading-relaxed text-lg">{t.landing.feat3Desc}</p>
              <div className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#0F766E] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 rounded-b-[2.5rem]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 3 LANGKAH */}
      <section id="langkah" className="py-32 bg-white relative overflow-hidden border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A1C14] mb-6 tracking-tight">{t.landing.howTitle}</h2>
            <p className="text-gray-500 text-xl font-light max-w-2xl mx-auto">{t.landing.howDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
            <div className="hidden md:block absolute top-16 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-[#0F766E]/30 to-transparent -z-0"></div>

            <div className="relative z-10 bg-[#F8FAF8] rounded-[2.5rem] p-10 border border-gray-100 shadow-xl text-center group hover:-translate-y-2 hover:bg-white transition-all duration-300">
              <div className="w-24 h-24 mx-auto bg-[#0F766E] text-white rounded-3xl flex items-center justify-center text-4xl font-light mb-8 shadow-[0_10px_30px_rgba(15,118,110,0.4)] group-hover:rotate-6 transition-transform duration-300">
                01
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.landing.how1Title}</h3>
              <p className="text-gray-500 leading-relaxed text-lg">{t.landing.how1Desc}</p>
            </div>

            <div className="relative z-10 bg-[#F8FAF8] rounded-[2.5rem] p-10 border border-gray-100 shadow-xl text-center group hover:-translate-y-2 hover:bg-white transition-all duration-300">
              <div className="w-24 h-24 mx-auto bg-[#0F766E] text-white rounded-3xl flex items-center justify-center text-4xl font-light mb-8 shadow-[0_10px_30px_rgba(15,118,110,0.4)] group-hover:rotate-6 transition-transform duration-300">
                02
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.landing.how2Title}</h3>
              <p className="text-gray-500 leading-relaxed text-lg">{t.landing.how2Desc}</p>
            </div>

            <div className="relative z-10 bg-[#F8FAF8] rounded-[2.5rem] p-10 border border-gray-100 shadow-xl text-center group hover:-translate-y-2 hover:bg-white transition-all duration-300">
              <div className="w-24 h-24 mx-auto bg-[#0F766E] text-white rounded-3xl flex items-center justify-center text-4xl font-light mb-8 shadow-[0_10px_30px_rgba(15,118,110,0.4)] group-hover:rotate-6 transition-transform duration-300">
                03
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.landing.how3Title}</h3>
              <p className="text-gray-500 leading-relaxed text-lg">{t.landing.how3Desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION TEKNOLOGI */}
      <section id="teknologi" className="py-32 bg-[#F8FAF8] relative overflow-hidden border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A1C14] mb-6 tracking-tight">Teknologi di Balik AgriSense</h2>
            <p className="text-gray-500 text-xl font-light max-w-2xl mx-auto">Kami menggabungkan AI ringan dengan arsitektur web modern untuk performa maksimal.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-[#F0FDF4] text-[#0F766E] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-[#0A1C14] mb-3">TensorFlow.js</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Model AI dijalankan langsung di browser pengguna (Client-side inference), memastikan privasi data dan kecepatan tanpa server.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-[#F0FDF4] text-[#0F766E] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-[#0A1C14] mb-3">MobileNetV2</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Arsitektur CNN (Convolutional Neural Network) yang ringan dan efisien, dioptimalkan melalui Transfer Learning.</p>
            </div>
            
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
              <div className="w-12 h-12 bg-[#F0FDF4] text-[#0F766E] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-[#0A1C14] mb-3">Supabase Cloud</h3>
              <p className="text-gray-500 text-sm leading-relaxed">Database PostgreSQL yang aman untuk menyimpan riwayat deteksi, jadwal, dan peta sebaran secara real-time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA PENUTUP */}
      <section id="tentang" className="relative py-40 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/hero-rice.jpeg" alt="Padi" className="w-full h-full object-cover object-center animate-slow-zoom" />
          <div className="absolute inset-0 bg-[#0A1C14]/90"></div>
        </div>
        
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
          <div className="w-[800px] h-[800px] bg-[#0F766E] rounded-full blur-[180px] opacity-40"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tighter leading-[1.1] drop-shadow-2xl">
            {t.landing.ctaTitle}
          </h2>
          <p className="text-[#DCFCE7] text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-light leading-relaxed">
            {t.landing.ctaDesc}
          </p>
          <button onClick={onStart} className="px-14 py-5 bg-white text-[#0F766E] font-bold rounded-full hover:bg-gray-50 transition-all shadow-[0_0_50px_rgba(255,255,255,0.4)] hover:shadow-[0_0_70px_rgba(255,255,255,0.6)] hover:-translate-y-1 text-lg">
            {t.landing.ctaBtn}
          </button>
        </div>
      </section>

      {/* FOOTER LIGHT & MEGAH */}
      <footer className="bg-white pt-24 pb-12 border-t border-gray-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
            
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white rounded-xl p-1 shadow-md border border-gray-100">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <h1 className="text-3xl font-light tracking-tight text-gray-900">Agri<span className="font-bold text-[#0F766E]">Sense</span></h1>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm mb-8">
                Platform asisten pertanian cerdas untuk mendeteksi penyakit padi, menghitung dampak ekonomi, dan memantau cuaca secara instan.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#0F766E] hover:border-[#0F766E] transition-all shadow-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#0F766E] hover:border-[#0F766E] transition-all shadow-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-500 hover:text-white hover:bg-[#0F766E] hover:border-[#0F766E] transition-all shadow-sm">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider">Produk</h4>
              <ul className="space-y-3 text-sm text-gray-500 font-medium">
                <li><a href="#fitur" className="hover:text-[#0F766E] transition-colors">Deteksi AI</a></li>
                <li><a href="#fitur" className="hover:text-[#0F766E] transition-colors">Kalkulasi Ekonomi</a></li>
                <li><a href="#fitur" className="hover:text-[#0F766E] transition-colors">Peringatan Cuaca</a></li>
                <li><a href="#" className="hover:text-[#0F766E] transition-colors">Peta Sebaran</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider">Perusahaan</h4>
              <ul className="space-y-3 text-sm text-gray-500 font-medium">
                <li><a href="#" className="hover:text-[#0F766E] transition-colors">Tentang Kami</a></li>
                <li><a href="#" className="hover:text-[#0F766E] transition-colors">Tim Kami</a></li>
                <li><a href="#" className="hover:text-[#0F766E] transition-colors">Karier</a></li>
                <li><a href="#" className="hover:text-[#0F766E] transition-colors">Kontak</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-wider">Legal</h4>
              <ul className="space-y-3 text-sm text-gray-500 font-medium">
                <li><a href="#" className="hover:text-[#0F766E] transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-[#0F766E] transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-[#0F766E] transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-[#0F766E] transition-colors">Lisensi</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm font-medium text-gray-400">&copy; 2026 AgriSense. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slow-zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite alternate;
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fade-in-up 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}} />
    </div>
  );
}