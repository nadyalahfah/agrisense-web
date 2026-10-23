import { useState } from "react";
import { CLASS_INFO } from "../utils/classes";
import { supabase } from "../utils/supabaseClient";
import SuccessReminderModal from "./SuccessReminderModal";

export default function ResultCard({ result, user, t, detectionId }) {
  const [showSuccess, setShowSuccess] = useState(false);

  if (!result) return null;
  const info = CLASS_INFO[result.label] || {};

  const handleExportPDF = () => {
    if (!user) {
      alert("Anda harus Login untuk mengunduh laporan PDF.");
      return;
    }
    window.print();
  };

  const handleCreateReminder = async () => {
    if (!user) {
      alert("Silakan login untuk membuat jadwal perawatan.");
      return;
    }
    
    if (!detectionId) {
      alert("Gagal membuat jadwal: ID deteksi tidak ditemukan.");
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
      alert("Terjadi kesalahan saat membuat jadwal.");
    }
  };

  // --- FITUR BARU: BAGIKAN KE WHATSAPP ---
  const handleShareWA = () => {
    const text = `Halo, AgriSense mendeteksi tanaman padi saya terkena *${result.label}* dengan akurasi ${(result.confidence * 100).toFixed(1)}%. Apa yang harus saya lakukan? Mohon sarannya.`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="relative group animate-fade-in print:shadow-none print:border-none">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#0F766E] to-[#DCFCE7] rounded-[2.5rem] blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>

      <div className="relative bg-white rounded-[2rem] border border-gray-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] overflow-hidden">
        <div className="bg-[#F8FAF8] p-8 md:p-12 border-b border-gray-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#DCFCE7] shadow-sm rounded-full mb-4">
                <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                <p className="text-[10px] font-bold text-[#0F766E] uppercase tracking-[0.2em]">Diagnosis Selesai</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-[#0A1C14] tracking-tight">{result.label}</h2>
            </div>
            
            <div className="bg-white rounded-2xl px-6 py-4 shadow-sm border border-gray-100 text-center min-w-[150px]">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Akurasi Model</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-black text-[#0F766E]">{(result.confidence * 100).toFixed(1)}</span>
                <span className="text-xl font-bold text-[#0F766E]">%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 bg-white">
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

          <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-gray-100 gap-4">
            {info.reference ? (
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
            
            <div className="flex flex-wrap gap-3 w-full sm:w-auto">
              
              {/* TOMBOL SHARE WA */}
              <button
                onClick={handleShareWA}
                className="text-xs font-bold px-4 py-3 rounded-xl transition-all bg-[#25D366] text-white hover:bg-[#1EBE5D] shadow-lg flex items-center gap-2 justify-center flex-1 sm:flex-none"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Bagikan
              </button>

              <button
                onClick={handleCreateReminder}
                className="text-xs font-bold px-4 py-3 rounded-xl transition-all bg-[#0A1C14] text-white hover:bg-[#0F766E] shadow-lg flex items-center gap-2 justify-center flex-1 sm:flex-none"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                Buat Jadwal
              </button>

              <button
                onClick={handleExportPDF}
                className={`text-xs font-bold px-4 py-3 rounded-xl transition-all print:hidden flex items-center gap-2 justify-center flex-1 sm:flex-none ${
                  user 
                    ? "bg-[#0F766E] text-white hover:bg-[#0D655E] shadow-lg" 
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