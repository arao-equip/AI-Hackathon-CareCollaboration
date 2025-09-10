import React from 'react';
import { usePatient } from '../contexts/PatientContext';
import { User, Calendar, AlertTriangle } from 'lucide-react';

export default function PatientInfo() {
  const { selectedPatient } = usePatient();

  if (!selectedPatient) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{selectedPatient.name}</h3>
              <p className="text-gray-600">{selectedPatient.age} years old • {selectedPatient.gender}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Admitted: {new Date(selectedPatient.admitDate).toLocaleDateString()}</span>
          </div>
          <div className="text-sm text-gray-600">
            <span className="font-medium">{selectedPatient.weeksInTreatment}</span> weeks in treatment
          </div>
        </div>

        {/* Diagnoses & Goals */}
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Primary Diagnoses</h4>
            <div className="space-y-1">
              {selectedPatient.diagnoses.map((diagnosis, index) => (
                <span key={index} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                  {diagnosis}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Current Care Goals</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {selectedPatient.careGoals.map((goal, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                  <span>{goal}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Alerts & Preferences */}
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2 flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Risk Indicators</span>
            </h4>
            <div className="space-y-1">
              {selectedPatient.riskIndicators.map((risk, index) => (
                <span key={index} className="inline-block bg-amber-50 text-amber-800 text-xs px-2 py-1 rounded border border-amber-200 mr-1 mb-1">
                  {risk}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Patient Preferences</h4>
            <div className="space-y-1">
              {selectedPatient.preferences.map((preference, index) => (
                <span key={index} className="inline-block bg-green-50 text-green-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                  {preference}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}