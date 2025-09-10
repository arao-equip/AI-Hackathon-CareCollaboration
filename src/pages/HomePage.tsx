import React from 'react';
import { usePatient } from '../contexts/PatientContext';
import PatientSelector from '../components/PatientSelector';
import SummaryFilters from '../components/SummaryFilters';
import SummaryGenerator from '../components/SummaryGenerator';

export default function HomePage() {
  const { selectedPatient } = usePatient();

  return (
    <div className="space-y-6">
      <PatientSelector />
      
      {selectedPatient && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <SummaryFilters />
          </div>
          <div className="lg:col-span-2">
            <SummaryGenerator />
          </div>
        </div>
      )}
    </div>
  );
}