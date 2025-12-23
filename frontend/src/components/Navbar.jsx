import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (id) => {
    setOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  // 🔥 NEW: scroll to upload (top of home)
  const handleUpload = () => {
    setOpen(false);

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0f1117]/90 backdrop-blur border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Brand */}
        <Link to="/" className="flex flex-col leading-tight">
          <span className="text-xl font-bold text-white">
            Nastyy Resume
          </span>
          <span className="text-xs text-gray-400">
            This roasts you — because sugarcoating gets you rejected.
          </span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm">

          <button
            onClick={() => handleScroll("how")}
            className="text-gray-300 hover:text-white transition"
          >
            How It Works
          </button>

          <button
            onClick={() => handleScroll("about")}
            className="text-gray-300 hover:text-white transition"
          >
            About
          </button>

          <button
            onClick={handleUpload}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
          >
            Upload Resume
          </button>
        </div>

        {/* Mobile Toggle */}
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

          <button
            onClick={() => handleScroll("how")}
            className="block w-full text-left text-gray-300 hover:text-white"
          >
            How It Works
          </button>

          <button
            onClick={() => handleScroll("about")}
            className="block w-full text-left text-gray-300 hover:text-white"
          >
            About
          </button>

          <button
            onClick={handleUpload}
            className="block text-center w-full px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium"
          >
            Upload Resume
          </button>
        </div>
      )}
    </nav>
  );
}
