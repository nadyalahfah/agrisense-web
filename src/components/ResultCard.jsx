import { useState } from "react";
import { CLASS_INFO } from "../utils/classes";
import { supabase } from "../utils/supabaseClient";
import SuccessReminderModal from "./SuccessReminderModal";

export default function ResultCard({ result, user, t, detectionId, showToast }) {
  const [showSuccess, setShowSuccess] = useState(false);

  if (!result) return null;
  const info = CLASS_INFO[result.label] || {};
  const isLowConfidence = result.confidence < 0.70;

  const handleExportPDF = () => {
    if (!user) {
      showToast("Anda harus Login untuk mengunduh laporan PDF.", "error");
      return;
    }
    window.print();
  };

  const handleCreateReminder = async () => {
    if (isLowConfidence) {
      showToast("Tidak bisa membuat jadwal karena gambar tidak dikenali.", "error");
      return;
    }
    if (!user) {
      showToast("Silakan login untuk membuat jadwal perawatan.", "error");
      return;
    }
    if (!detectionId) {
      showToast("Gagal membuat jadwal: ID deteksi tidak ditemukan.", "error");
      return;
    }

    const now = new Date();
    const steps = [
      { title: "Pantau apakah penyakit menyebar", days: 3 },
      { title: "Lakukan pengobatan sesuai anjuran", days: 7 },
      { title: "Evaluasi hasil pengobatan", days: 14 }
    ];

    try {
      for (const step of steps) {
        const dueDate = new Date(now);
        dueDate.setDate(dueDate.getDate() + step.days);
        await supabase.from('reminders').insert([
          { detection_id: detectionId, title: step.title, due_date: dueDate.toISOString() }
        ]);
      }
      setShowSuccess(true);
    } catch (error) {
      showToast("Terjadi kesalahan saat membuat jadwal.", "error");
    }
  };

  const handleConsultTania = () => {
    if (isLowConfidence) {
      showToast("Tidak bisa konsultasi karena gambar tidak dikenali.", "error");
      return;
    }

    const text = `Halo TANIA (Penyuluh Digital Kementan), saya menggunakan aplikasi AgriSense. Saya baru saja mendeteksi penyakit *${result.label}* pada tanaman padi saya dengan akurasi ${(result.confidence * 100).toFixed(1)}%. Mohon arahan dan penanganan lebih lanjut. Terima kasih.`;
    
    const waUrl = `https://wa.me/6285121317419?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
    showToast("Membuka WhatsApp TANIA...", "success");
  };

  return (
    <div className="relative group animate-fade-in print:shadow-none print:border-none">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#0F766E] to-[#DCFCE7] rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>

      <div className="relative bg-white rounded-[2rem] border border-gray-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] overflow-hidden">
        <div className="bg-[#F8FAF8] p-8 md:p-12 border-b border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#DCFCE7] shadow-sm rounded-full mb-4">
                <span className={`w-2 h-2 rounded-full ${isLowConfidence ? 'bg-red-500' : 'bg-[#10B981]'} animate-pulse`}></span>
                <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${isLowConfidence ? 'text-red-500' : 'text-[#0F766E]'}`}>
                  {isLowConfidence ? "Gambar Tidak Valid" : "Diagnosis Selesai"}
                </p>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0A1C14] tracking-tight">
                {isLowConfidence ? "Tidak Dikenali" : result.label}
              </h2>
            </div>
            
            <div className="bg-white rounded-2xl px-6 py-4 shadow-sm border border-gray-100 text-center min-w-[150px]">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Akurasi Model</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className={`text-4xl font-black ${isLowConfidence ? 'text-red-500' : 'text-[#0F766E]'}`}>{(result.confidence * 100).toFixed(1)}</span>
                <span className={`text-xl font-bold ${isLowConfidence ? 'text-red-500' : 'text-[#0F766E]'}`}>%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 bg-white">
          {isLowConfidence ? (
            <div className="bg-red-50 border border-red-200 p-6 rounded-2xl mb-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-red-700 mb-2">Gambar Tidak Dikenali</h3>
              <p className="text-red-600">Sistem tidak yakin objek ini adalah daun padi. Harap unggah foto daun padi yang jelas dan tidak blur.</p>
            </div>
          ) : (
            <>
              <div className="mb-12">
                <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-4">
                  Deskripsi Penyakit
                </h3>
                <p className="text-gray-800 leading-loose font-light text-lg">{info.description}</p>
              </div>

              {info.actionPlan && (
                <div className="mb-12">
                  <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6">
                    {t.actionTitle}
                  </h3>
                  
                  <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#DCFCE7] before:via-gray-200 before:to-transparent">
                    {[
                      { label: "Tindakan Segera", text: info.actionPlan.step1, num: "01" },
                      { label: "Pengobatan", text: info.actionPlan.step2, num: "02" },
                      { label: "Pencegahan", text: info.actionPlan.step3, num: "03" },
                    ].map((step, idx) => (
                      <div key={idx} className="relative flex items-start gap-6 group/step">
                        <div className="w-10 h-10 rounded-full bg-[#F0FDF4] border border-[#DCFCE7] text-[#0F766E] flex items-center justify-center font-bold text-xs shadow-sm shrink-0 group-hover/step:bg-[#0F766E] group-hover/step:text-white transition-colors duration-300 z-10">
                          {step.num}
                        </div>
                        <div className="flex-1 bg-[#F8FAF8] rounded-2xl p-5 border border-gray-100 group-hover/step:border-[#0F766E]/30 transition-colors">
                          <p className="text-xs font-black text-[#0A1C14] uppercase tracking-wider mb-2">{step.label}</p>
                          <p className="text-sm text-gray-600 leading-relaxed font-medium">{step.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-100 gap-4">
            {info.reference && !isLowConfidence ? (
              <a
                href={info.reference}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-gray-500 hover:text-[#0F766E] transition-colors flex items-center gap-2 bg-[#F8FAF8] px-4 py-2.5 rounded-lg border border-gray-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                {t.refLink}
              </a>
            ) : <div></div>}
            
            {/* TATA LETAK TOMBOL BARU (GRID 3 KOLOM) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full sm:w-auto">
              {!isLowConfidence && (
                <>
                  <button
                    onClick={handleConsultTania}
                    className="w-full text-xs font-bold px-5 py-3.5 rounded-xl transition-all bg-[#0F766E] text-white hover:bg-[#0D655E] shadow-md flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                    TANIA
                  </button>

                  <button
                    onClick={handleCreateReminder}
                    className="w-full text-xs font-bold px-5 py-3.5 rounded-xl transition-all bg-[#0A1C14] text-white hover:bg-gray-800 shadow-md flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    Jadwal
                  </button>
                </>
              )}
              
              <button
                onClick={handleExportPDF}
                className={`w-full text-xs font-bold px-5 py-3.5 rounded-xl transition-all print:hidden flex items-center justify-center gap-2 ${
                  user && !isLowConfidence
                    ? "bg-white border-2 border-[#0F766E] text-[#0F766E] hover:bg-[#F0FDF4]" 
                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <SuccessReminderModal 
        isOpen={showSuccess} 
        onClose={() => setShowSuccess(false)} 
      />
    </div>
  );
}