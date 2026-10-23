export default function ModelStatus({ status, error }) {
  if (status === "loading") {
    return (
      <div className="bg-gray-50 border border-gray-200 text-gray-500 px-4 py-3 rounded-xl text-sm font-medium">
        Memuat model AI...
      </div>
    );
  }
  
  if (status === "error") {
    return (
      <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
        Model belum tersedia. {error}
      </div>
    );
  }
  
  return (
    <div className="bg-[#F0FDF4] border border-[#DCFCE7] text-[#0F766E] px-4 py-3 rounded-xl text-sm font-medium">
      Model siap digunakan
    </div>
  );
}