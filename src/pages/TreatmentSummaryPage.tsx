import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatient } from '../contexts/PatientContext';
import { useSummary } from '../contexts/SummaryContext';
import { ArrowLeft } from 'lucide-react';
import PatientInfo from '../components/PatientInfo';
import SummaryDisplay from '../components/SummaryDisplay';
import GranularDataDisplay from '../components/GranularDataDisplay';

export default function TreatmentSummaryPage() {
  const navigate = useNavigate();
  const { selectedPatient } = usePatient();
  const { currentSummary } = useSummary();

  useEffect(() => {
    // Redirect to home if no patient is selected or no summary exists
    if (!selectedPatient || !currentSummary) {
      navigate('/');
    }
  }, [selectedPatient, currentSummary, navigate]);

  if (!selectedPatient || !currentSummary) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Patient Selection</span>
      </button>

      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Treatment Summary</h1>
        <p className="text-gray-600 mt-1">Comprehensive clinical overview and detailed data analysis</p>
      </div>

      {/* High-Level Patient Context */}
      <PatientInfo />

      {/* Treatment Summary */}
      <SummaryDisplay />

      {/* Granular Data Display */}
      <GranularDataDisplay />
    </div>
  );
}