import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Send from "./pages/Send";
import Retrieve from "./pages/Retrieve";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/send" element={<Send />} />
          <Route path="/retrieve" element={<Retrieve />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;