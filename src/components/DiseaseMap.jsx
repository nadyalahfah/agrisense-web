import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import L from 'leaflet';

// Custom Icon Marker (Warna Hijau Emerald)
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
      .select('label, latitude, longitude, created_at')
      .not('latitude', 'is', null)
      .order('created_at', { ascending: false });
    
    if (data) setReports(data);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-[2rem] border-2 border-gray-100 shadow-sm p-4 md:p-6 h-[700px] flex flex-col animate-fade-in relative z-0">
      
      {/* Header Kartu */}
      <div className="flex justify-between items-center mb-6 px-2 md:px-4">
        <div className="max-w-2xl">
          {/* Teks diperbesar dan diubah */}
          <p className="text-lg font-medium text-[#0F766E] leading-relaxed">
            Pantau persebaran penyakit padi secara langsung berdasarkan laporan dari petani di seluruh wilayah.
          </p>
        </div>
        <div className="w-12 h-12 bg-[#F0FDF4] rounded-full flex items-center justify-center border border-[#DCFCE7] shrink-0 ml-4">
          <svg className="w-6 h-6 text-[#0F766E]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
        </div>
      </div>
      
      {/* Kontainer Peta */}
      <div className="flex-1 rounded-[1.5rem] overflow-hidden border-2 border-gray-100 relative z-0">
        
        {/* Panel Melayang (Floating Panel) */}
        <div className="absolute top-4 left-4 z-[400] bg-white border border-gray-200 p-4 rounded-2xl shadow-xl flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#F0FDF4] text-[#0F766E] border border-[#DCFCE7] flex items-center justify-center font-black text-lg">
            {reports.length}
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Laporan</p>
            <p className="text-sm font-black text-[#0F766E]">Titik Terdeteksi</p>
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
                  <div className="p-2 text-center font-sans min-w-[150px]">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Terdeteksi</p>
                    <strong className="text-lg font-black text-[#0F766E] block mb-2">{report.label}</strong>
                    <span className="text-xs font-bold text-[#0F766E] bg-[#F0FDF4] px-3 py-1.5 rounded-lg border border-[#DCFCE7] inline-block">
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