import React from 'react';
import { usePatient } from '../contexts/PatientContext';
import { useSummary } from '../contexts/SummaryContext';
import SummaryFilters from './SummaryFilters';
import SummaryGenerator from './SummaryGenerator';
import SummaryDisplay from './SummaryDisplay';
import MetricsDashboard from './MetricsDashboard';
import PatientInfo from './PatientInfo';
import GranularDataDisplay from './GranularDataDisplay';

export default function TreatmentSummaryTool() {
  const { selectedPatient } = usePatient();
  const { currentSummary } = useSummary();

  if (!selectedPatient) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <SummaryFilters />
        </div>
        <div className="lg:col-span-2">
          <SummaryGenerator />
        </div>
      </div>

      {currentSummary && (
        <>
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Treatment Summary</h1>
            <PatientInfo />
          </div>
          <SummaryDisplay />
          <GranularDataDisplay />
        </>
      )}
    </div>
  );
}