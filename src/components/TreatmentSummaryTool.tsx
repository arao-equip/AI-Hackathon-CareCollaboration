import React from 'react';
import { usePatient } from '../contexts/PatientContext';
import SummaryFilters from './SummaryFilters';
import SummaryGenerator from './SummaryGenerator';

export default function TreatmentSummaryTool() {
  const { selectedPatient } = usePatient();

  if (!selectedPatient) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1">
        <SummaryFilters />
      </div>
      <div className="lg:col-span-2">
        <SummaryGenerator />
      </div>
    </div>
  );
}