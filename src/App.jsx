import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Roast from "./pages/Roast";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/roast" element={<Roast />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
