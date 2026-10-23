import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import SuccessModal from "./SuccessModal";

export default function Login({ onLoginSuccess, onContinueAsGuest }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setShowSuccess(true);
        setIsLogin(true);
      }
      onLoginSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-sans selection:bg-[#0F766E] selection:text-white">
      
      {/* SISI KIRI: GAMBAR & BRANDING */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img src="/hero-rice.jpeg" alt="Padi" className="w-full h-full object-cover object-center animate-slow-zoom" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1C14] via-[#0A1C14]/70 to-[#0A1C14]/30"></div>
        </div>
        
        <div className="relative z-10 p-16 w-full max-w-lg">
          <div className="w-16 h-16 bg-white rounded-2xl p-2 shadow-2xl mb-8">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-5xl font-light text-white mb-6 leading-tight tracking-tighter">
            Selamat Datang <br />
            <span className="font-bold text-[#DCFCE7]">Kembali.</span>
          </h1>
          <p className="text-gray-300 text-lg leading-relaxed font-light mb-12">
            Platform asisten pertanian cerdas untuk mendeteksi penyakit padi, menghitung dampak ekonomi, dan memantau cuaca secara instan.
          </p>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-4">
              <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-[#0A1C14]"></div>
              <div className="w-10 h-10 rounded-full bg-gray-400 border-2 border-[#0A1C14]"></div>
              <div className="w-10 h-10 rounded-full bg-gray-500 border-2 border-[#0A1C14]"></div>
            </div>
            <p className="text-sm font-medium text-gray-300">
              Bergabung dengan <span className="text-white font-bold">1,200+</span> petani cerdas
            </p>
          </div>
        </div>
      </div>

      {/* SISI KANAN: FORM LOGIN */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        <div className="w-full max-w-md animate-fade-in-up">
          
          {/* Logo Mobile (Hanya Muncul di HP) */}
          <div className="lg:hidden flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-white rounded-2xl p-1 shadow-md border border-gray-100 mb-4">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <h1 className="text-2xl font-light tracking-widest text-[#0A1C14]">AGRI<span className="font-bold text-[#0F766E]">SENSE</span></h1>
          </div>

          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-[#0A1C14] mb-2 tracking-tight">
              {isLogin ? "Masuk ke Akun Anda" : "Buat Akun Baru"}
            </h2>
            <p className="text-gray-500 text-sm">
              {isLogin ? "Silakan masukkan detail akun Anda di bawah ini." : "Lengkapi data diri Anda untuk memulai."}
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm font-medium p-4 rounded-xl mb-6 border border-red-100 flex items-start gap-3">
              <span className="font-bold">!</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 peer transition-all"
                placeholder=" "
              />
              <label 
                htmlFor="email" 
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 px-2 peer-focus:px-2 peer-focus:text-[#0F766E] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 rounded"
              >
                Alamat Email
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/20 peer transition-all"
                placeholder=" "
              />
              <label 
                htmlFor="password" 
                className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-50 px-2 peer-focus:px-2 peer-focus:text-[#0F766E] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 rounded"
              >
                Kata Sandi
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0F766E] text-white font-bold py-4 rounded-xl text-sm hover:bg-[#0D655E] transition-all shadow-[0_10px_20px_-10px_rgba(15,118,110,0.5)] hover:shadow-[0_15px_30px_-10px_rgba(15,118,110,0.7)] hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
            >
              {loading ? "Memproses..." : isLogin ? "Masuk" : "Daftar"}
            </button>
          </form>

          <div className="mt-10 text-center space-y-4">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-medium text-gray-600 hover:text-[#0F766E] transition-colors"
            >
              {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
              <span className="font-bold text-[#0F766E] hover:underline">
                {isLogin ? "Daftar sekarang" : "Masuk di sini"}
              </span>
            </button>
            
            <div className="relative py-2">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200"></div></div>
              <div className="relative flex justify-center text-xs"><span className="bg-white px-2 text-gray-400 font-medium">atau</span></div>
            </div>
            
            <button
              onClick={onContinueAsGuest}
              className="w-full bg-white border border-gray-200 text-gray-700 font-bold py-4 rounded-xl text-sm hover:bg-gray-50 transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              Lanjutkan sebagai Tamu
            </button>
          </div>
        </div>
      </div>

      <SuccessModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
      />
    </div>
  );
}