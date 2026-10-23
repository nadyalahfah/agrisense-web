import { useRef, useState } from "react";

export default function UploadCard({ onImageSelected, disabled, t }) {
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const url = URL.createObjectURL(file);
    setPreview(url);
    onImageSelected(file, url);
  };

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="relative group">
      {/* Efek Pendaran di Belakang Kartu */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#0F766E] via-[#DCFCE7] to-[#0F766E] rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      
      <div className="relative bg-white rounded-[2rem] border border-gray-100 shadow-2xl p-2">
        <div
          onClick={() => !disabled && inputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`rounded-[1.5rem] p-12 text-center transition-all duration-500 flex flex-col items-center justify-center min-h-[350px] relative overflow-hidden
            ${disabled ? "opacity-50 cursor-not-allowed bg-[#F8FAF8]" : "cursor-pointer bg-[#F8FAF8]"}
            ${isDragging ? "bg-[#F0FDF4] scale-[0.99]" : "hover:bg-[#F0FDF4]"}
          `}
        >
          {/* Latar Belakang Titik-titik Halus */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#0F766E 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>

          {preview ? (
            <div className="space-y-6 w-full h-full flex flex-col items-center justify-center animate-fade-in relative z-10">
              <div className="relative group/img">
                <div className="absolute -inset-4 bg-[#0F766E]/20 rounded-[2rem] blur-xl"></div>
                <img
                  src={preview}
                  alt="Preview"
                  className="relative max-h-64 rounded-xl object-contain shadow-2xl bg-white p-2 border border-gray-100"
                />
              </div>
              <p className="text-xs font-bold text-[#0F766E] uppercase tracking-widest bg-white/80 backdrop-blur-md px-6 py-3 rounded-full shadow-sm border border-[#DCFCE7]">
                Ganti Gambar
              </p>
            </div>
          ) : (
            <div className="text-gray-500 space-y-8 animate-fade-in flex flex-col items-center relative z-10">
              <div className="w-24 h-24 bg-white rounded-full shadow-[0_0_40px_rgba(15,118,110,0.15)] border border-gray-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <svg className="w-10 h-10 text-[#0F766E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
              </div>
              <div>
                <p className="font-bold text-[#0A1C14] text-2xl tracking-tight mb-2">{t.uploadHint}</p>
                <p className="text-sm text-gray-500 font-medium">{t.uploadFormat}</p>
              </div>
            </div>
          )}
        </div>
        
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>
    </div>
  );
}