export default function Navbar() {
  return (
    <nav className="bg-[#2F5D3E] text-white px-6 py-4 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🌾</span>
        <h1 className="text-xl font-bold tracking-tight">AgriSense</h1>
      </div>
      <span className="text-sm opacity-80 hidden sm:block">
        Rice Leaf Disease Detection
      </span>
    </nav>
  );
}