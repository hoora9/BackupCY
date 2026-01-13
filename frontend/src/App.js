import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CompanyPage from "./pages/CompanyPage";
import MissionPage from "./pages/MissionPage";
import ExpertisePage from "./pages/ExpertisePage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import ImpactPage from "./pages/ImpactPage";
import ManifestoPage from "./pages/ManifestoPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/mission" element={<MissionPage />} />
          <Route path="/manifesto" element={<ManifestoPage />} />
          <Route path="/expertise" element={<ExpertisePage />} />
          <Route path="/impact" element={<ImpactPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
