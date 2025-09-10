import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PatientProvider } from './contexts/PatientContext';
import { SummaryProvider } from './contexts/SummaryContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import TreatmentSummaryPage from './pages/TreatmentSummaryPage';

function App() {
  return (
    <Router>
      <PatientProvider>
        <SummaryProvider>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto px-4 py-6 max-w-7xl">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/treatment-summary" element={<TreatmentSummaryPage />} />
              </Routes>
            </main>
          </div>
        </SummaryProvider>
      </PatientProvider>
    </Router>
  );
}

export default App;