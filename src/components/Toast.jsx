import { useEffect } from "react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "bg-[#0F766E]" : type === "error" ? "bg-red-600" : "bg-gray-800";
  const icon = type === "success" ? "✓" : type === "error" ? "!" : "i";

  return (
    <div className={`fixed top-20 right-4 md:right-8 z-[9999] ${bgColor} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-fade-in-down`}>
      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold text-sm">
        {icon}
      </div>
      <p className="font-bold text-sm">{message}</p>
    </div>
  );
}