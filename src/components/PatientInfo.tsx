import React from 'react';
import { usePatient } from '../contexts/PatientContext';
import { User, Calendar } from 'lucide-react';

export default function PatientInfo() {
  const { selectedPatient } = usePatient();

  if (!selectedPatient) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{selectedPatient.name}</h3>
            <p className="text-sm text-gray-600">{selectedPatient.age} years old • {selectedPatient.gender}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <span>Admitted: {new Date(selectedPatient.admitDate).toLocaleDateString()}</span>
          </div>
          <div>
            <span className="font-medium">{selectedPatient.weeksInTreatment}</span> weeks in treatment
          </div>
          <div>
            <span className="font-medium text-gray-700">Diagnoses:</span>
            <div className="space-y-1">
              {selectedPatient.diagnoses.map((diagnosis, index) => (
                <span key={index} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded ml-1">
                  {diagnosis}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}