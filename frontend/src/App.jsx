import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Prediction from './pages/Prediction';
import DataInsights from './pages/DataInsights';
import ModelInfo from './pages/ModelInfo';
import Disclaimer from './pages/Disclaimer';

export default function App() {
  return (
    <Router>
      <div className="bg-cardioscan-ambient min-h-screen flex flex-col justify-between text-slate-100 selection:bg-[#5BC0BE] selection:text-[#0B132B]">
        <div>
          <Header />
          <main className="w-full">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/prediction" element={<Prediction />} />
              <Route path="/data-insights" element={<DataInsights />} />
              <Route path="/model-info" element={<ModelInfo />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
