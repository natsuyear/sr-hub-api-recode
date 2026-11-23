import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Vagas from "./pages/Vagas";
import Cursos from "./pages/Cursos";
import Usuarias from "./pages/Usuarias";
import Candidaturas from "./pages/Candidaturas";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/vagas" element={<Vagas />} />
        <Route path="/cursos" element={<Cursos />} />
        <Route path="/usuarios" element={<Usuarias />} />
        <Route path="/candidaturas" element={<Candidaturas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;