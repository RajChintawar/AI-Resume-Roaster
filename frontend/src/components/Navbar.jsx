import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0f1117]/90 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex flex-col leading-tight">
          <span className="text-xl font-bold text-white tracking-wide">
            Nastyy Resume
          </span>
          <span className="text-xs text-gray-400">
            This roasts you — because sugarcoating gets you rejected.
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm">
          <a href="#roast" className="text-gray-300 hover:text-white transition">
            Roast Me
          </a>
          <a href="#how" className="text-gray-300 hover:text-white transition">
            How It Works
          </a>
          <a href="#about" className="text-gray-300 hover:text-white transition">
            About
          </a>
          <a
            href="#try"
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
          >
            Try Now
          </a>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-2xl"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-[#0f1117] border-t border-white/10 px-6 py-4 space-y-4">
          <a href="#roast" className="block text-gray-300 hover:text-white">
            Roast Me
          </a>
          <a href="#how" className="block text-gray-300 hover:text-white">
            How It Works
          </a>
          <a href="#about" className="block text-gray-300 hover:text-white">
            About
          </a>
          <a
            href="#try"
            className="block text-center px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium"
          >
            Try Now
          </a>
        </div>
      )}
    </nav>
  );
}
