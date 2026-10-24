import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function DiseaseMap() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('detections')
      .select('label, confidence, latitude, longitude, created_at')
      .not('latitude', 'is', null)
      .order('created_at', { ascending: false });
    
    if (data) setReports(data);
    setLoading(false);
  };

  const handleExportCSV = () => {
    if (reports.length === 0) {
      alert("Belum ada data untuk diekspor.");
      return;
    }

    const headers = ["Tanggal", "Penyakit", "Akurasi (%)", "Latitude", "Longitude"];
    
    const csvRows = reports.map(r => [
      new Date(r.created_at).toLocaleDateString('id-ID'),
      `"${r.label}"`,
      (r.confidence * 100).toFixed(1),
      r.latitude,
      r.longitude
    ]);

    const csvContent = [
      headers.join(","),
      ...csvRows.map(row => row.join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Laporan_AgriSense_${new Date().getTime()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-[2rem] border-2 border-gray-100 shadow-sm p-4 md:p-6 h-[700px] flex flex-col animate-fade-in relative z-0">
      
      {/* Header Peta (Responsif: Menumpuk di HP, Menyamping di Laptop) */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4 px-2 md:px-4">
        <div className="max-w-xl">
          <p className="text-lg font-medium text-[#0F766E] leading-relaxed">
            Pantau persebaran penyakit padi secara langsung berdasarkan laporan dari petani di seluruh wilayah.
          </p>
        </div>

        {/* TOMBOL EKSPOR CSV (Selalu Muncul di HP & Laptop) */}
        <button 
          onClick={handleExportCSV}
          className="w-full md:w-auto bg-[#0A1C14] hover:bg-[#0F766E] text-white text-sm md:text-xs font-bold px-4 py-3 md:py-2.5 rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <svg className="w-5 h-5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
          Unduh Laporan (CSV)
        </button>
      </div>
      
      {/* Kontainer Peta */}
      <div className="flex-1 rounded-[1.5rem] overflow-hidden border-2 border-gray-100 relative z-0">
        
        <div className="absolute top-4 left-4 z-[400] bg-white border border-gray-200 p-3 md:p-4 rounded-2xl shadow-xl flex items-center gap-3 md:gap-4">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#F0FDF4] text-[#0F766E] border border-[#DCFCE7] flex items-center justify-center font-black text-sm md:text-lg">
            {reports.length}
          </div>
          <div>
            <p className="text-[8px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Laporan</p>
            <p className="text-xs md:text-sm font-black text-[#0F766E]">Titik Terdeteksi</p>
          </div>
        </div>

        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-[#F8FAF8] z-[500]">
            <div className="w-10 h-10 border-4 border-[#0F766E] border-t-[#DCFCE7] rounded-full animate-spin"></div>
          </div>
        ) : (
          <MapContainer center={[-2.5489, 118.0149]} zoom={5} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {reports.map((report, idx) => (
              <Marker key={idx} position={[report.latitude, report.longitude]} icon={customIcon}>
                <Popup className="custom-popup">
                  <div className="p-2 text-center font-sans min-w-[120px] md:min-w-[150px]">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Terdeteksi</p>
                    <strong className="text-base md:text-lg font-black text-[#0F766E] block mb-2">{report.label}</strong>
                    <span className="text-[10px] md:text-xs font-bold text-[#0F766E] bg-[#F0FDF4] px-2 md:px-3 py-1 md:py-1.5 rounded-lg border border-[#DCFCE7] inline-block">
                      {new Date(report.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </div>
  );
}