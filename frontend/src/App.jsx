/* import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Roast from "./pages/Roast";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/roast" element={<Roast />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App; */

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Roast from "./pages/Roast";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      
      {/* Global Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roast" element={<Roast />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

    </div>
  );
}

export default App;
