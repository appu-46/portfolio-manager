import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Portfolios from "./pages/Portfolios";
import Portfoliosv2 from "./pages/Portfoliosv2";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolios" element={<Portfolios />} />
          <Route path="/portfoliosv2" element={<Portfoliosv2 />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
