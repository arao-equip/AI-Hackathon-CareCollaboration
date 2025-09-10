import React from 'react';
import { PatientProvider } from './contexts/PatientContext';
import { SummaryProvider } from './contexts/SummaryContext';
import Header from './components/Header';
import PatientSelector from './components/PatientSelector';
import TreatmentSummaryTool from './components/TreatmentSummaryTool';

function App() {
  return (
    <PatientProvider>
      <SummaryProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="container mx-auto px-4 py-6 max-w-7xl">
            <PatientSelector />
            <TreatmentSummaryTool />
          </main>
        </div>
      </SummaryProvider>
    </PatientProvider>
  );
}

export default App;