import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

export default function Statistics({ history }) {
  const [stats, setStats] = useState({ total: 0, mostCommon: "-", totalLoss: 0, chartData: [] });

  useEffect(() => {
    if (!history || history.length === 0) return;

    const total = history.length;
    
    const counts = {};
    history.forEach(item => {
      counts[item.label] = (counts[item.label] || 0) + 1;
    });
    
    const mostCommon = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    const chartData = Object.keys(counts).map(key => ({ name: key, total: counts[key] })).sort((a,b) => b.total - a.total);

    const estimatedLoss = total * 1500000;

    setStats({ total, mostCommon, totalLoss: estimatedLoss, chartData });
  }, [history]);

  if (!history || history.length === 0) {
    return (
      <div className="bg-white rounded-[2rem] border border-gray-200 p-12 text-center shadow-sm">
        <div className="w-20 h-20 bg-[#F8FAF8] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
        </div>
        <h3 className="text-xl font-bold text-[#0A1C14] mb-2">Belum Ada Data Statistik</h3>
        <p className="text-[#0A1C14] font-medium">Lakukan deteksi pertama Anda untuk melihat analisis data.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Bento Grid Atas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Kotak Total Deteksi (Putih Bersih) */}
        <div className="bg-white rounded-[2rem] p-8 border-2 border-gray-100 shadow-sm flex flex-col justify-center relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#F0FDF4] rounded-full"></div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 relative z-10">Total Deteksi</p>
          <div className="flex items-baseline gap-2 relative z-10">
            <p className="text-6xl font-black text-[#0F766E]">{stats.total}</p>
            <p className="text-lg font-bold text-[#0A1C14]">Kali</p>
          </div>
        </div>

        {/* Kotak Penyakit Terbanyak */}
        <div className="bg-white rounded-[2rem] p-8 border-2 border-gray-100 shadow-sm flex flex-col justify-center relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#F0FDF4] rounded-full"></div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 relative z-10">Penyakit Terbanyak</p>
          <p className="text-3xl font-black text-[#0A1C14] truncate relative z-10">{stats.mostCommon}</p>
        </div>

        {/* Kotak Kerugian */}
        <div className="bg-[#F0FDF4] rounded-[2rem] p-8 border-2 border-[#DCFCE7] shadow-sm flex flex-col justify-center relative overflow-hidden">
          <p className="text-xs font-bold text-[#0F766E] uppercase tracking-widest mb-2">Est. Kerugian Dicegah</p>
          <p className="text-3xl font-black text-[#0A1C14]">Rp {stats.totalLoss.toLocaleString('id-ID')}</p>
        </div>
      </div>

      {/* Grafik */}
      <div className="bg-white rounded-[2rem] border-2 border-gray-100 shadow-sm p-8 md:p-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-xl font-bold text-[#0A1C14]">Frekuensi Penyakit</h3>
            <p className="text-sm font-medium text-gray-500">Berdasarkan hasil deteksi Anda.</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#F8FAF8] flex items-center justify-center">
            <svg className="w-5 h-5 text-[#0F766E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
          </div>
        </div>
        
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12, fill: '#0A1C14', fontWeight: 'bold' }} 
                interval={0} 
                angle={-15} 
                textAnchor="end" 
                height={70} 
                axisLine={{ stroke: '#E5E7EB' }}
                tickLine={false}
              />
              <YAxis 
                tick={{ fontSize: 12, fill: '#0A1C14', fontWeight: 'bold' }} 
                allowDecimals={false} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                cursor={{ fill: '#F0FDF4' }} 
                contentStyle={{ borderRadius: '12px', border: '2px solid #E5E7EB', fontSize: '14px', fontWeight: 'bold', color: '#0A1C14' }} 
              />
              <Bar dataKey="total" radius={[6, 6, 0, 0]}>
                {stats.chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? "#0F766E" : "#DCFCE7"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}