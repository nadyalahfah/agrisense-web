import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";

export default function ReminderList({ user }) {
  const [groupedReminders, setGroupedReminders] = useState({});

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    if (!user) return;
    
    // Ambil jadwal beserta data penyakit dari tabel detections
    const { data } = await supabase
      .from('reminders')
      .select(`
        *,
        detections!inner (
          label,
          created_at,
          user_id
        )
      `)
      .eq('detections.user_id', user.id)
      .order('due_date', { ascending: true });
    
    if (data) {
      // Kelompokkan berdasarkan ID Deteksi
      const grouped = data.reduce((acc, item) => {
        const detId = item.detection_id;
        if (!acc[detId]) {
          acc[detId] = {
            label: item.detections.label,
            date: new Date(item.detections.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
            tasks: []
          };
        }
        acc[detId].tasks.push(item);
        return acc;
      }, {});
      
      setGroupedReminders(grouped);
    }
  };

  const toggleComplete = async (id, currentStatus) => {
    await supabase.from('reminders').update({ is_completed: !currentStatus }).eq('id', id);
    fetchReminders();
  };

  const deleteReminder = async (id) => {
    await supabase.from('reminders').delete().eq('id', id);
    fetchReminders();
  };

  if (!user) {
    return (
      <div className="bg-white rounded-[2rem] border-2 border-gray-100 p-12 text-center shadow-sm">
        <div className="w-20 h-20 bg-[#F8FAF8] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
        </div>
        <h3 className="text-xl font-bold text-[#0A1C14] mb-2">Akses Terbatas</h3>
        <p className="text-[#0A1C14] font-medium">Silakan Login terlebih dahulu untuk melihat jadwal perawatan Anda.</p>
      </div>
    );
  }

  const groupKeys = Object.keys(groupedReminders);

  return (
    <div className="space-y-8 animate-fade-in">
      {groupKeys.length === 0 ? (
        <div className="bg-white rounded-[2rem] border-2 border-gray-100 p-12 text-center shadow-sm">
          <p className="text-[#0A1C14] font-bold text-lg mb-2">Belum ada jadwal perawatan.</p>
          <p className="text-gray-500 font-medium">Lakukan deteksi lalu klik "Buat Jadwal" di halaman hasil.</p>
        </div>
      ) : (
        groupKeys.map((detId) => {
          const group = groupedReminders[detId];
          
          return (
            <div key={detId} className="bg-white rounded-[2rem] border-2 border-gray-100 shadow-sm overflow-hidden">
              
              {/* Header Grup (Nama Penyakit & Tgl Deteksi) */}
              <div className="bg-[#F8FAF8] p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Jadwal Perawatan untuk</p>
                  <h3 className="text-2xl font-black text-[#0F766E]">{group.label}</h3>
                </div>
                <div className="bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm text-sm font-bold text-[#0A1C14] flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0F766E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                  Deteksi: {group.date}
                </div>
              </div>

              {/* List Tugas */}
              <div className="p-6 space-y-3">
                {group.tasks.map((task) => {
                  const dueDateObj = new Date(task.due_date);
                  const today = new Date();
                  const isOverdue = dueDateObj < today && !task.is_completed;

                  return (
                    <div 
                      key={task.id} 
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                        task.is_completed ? 'bg-gray-50 border-gray-100 opacity-60' : 'bg-white border-gray-200 hover:border-[#0F766E]'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <button 
                          onClick={() => toggleComplete(task.id, task.is_completed)}
                          className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                            task.is_completed ? 'bg-[#0F766E] border-[#0F766E]' : 'bg-white border-gray-300 hover:border-[#0F766E]'
                          }`}
                        >
                          {task.is_completed && <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                        </button>
                        
                        <div>
                          <p className={`text-base font-bold ${task.is_completed ? 'line-through text-gray-400' : 'text-[#0A1C14]'}`}>
                            {task.title}
                          </p>
                          <p className={`text-xs font-bold mt-1 ${isOverdue ? 'text-red-500' : 'text-gray-500'}`}>
                            Target: {dueDateObj.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} {isOverdue && "(Terlewat)"}
                          </p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => deleteReminder(task.id)}
                        className="text-xs font-bold text-red-500 hover:text-red-700 bg-red-50 px-3 py-2 rounded-lg transition-colors"
                      >
                        Hapus
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}