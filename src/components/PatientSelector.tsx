import React from 'react';
import { usePatient } from '../contexts/PatientContext';
import { User } from 'lucide-react';

export default function PatientSelector() {
  const { selectedPatient, setSelectedPatient, patients } = usePatient();

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      {!selectedPatient ? (
        <>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Patient</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patients.map(patient => (
              <button
                key={patient.id}
                onClick={() => setSelectedPatient(patient)}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{patient.name}</p>
                    <p className="text-sm text-gray-600">{patient.age} years old • {patient.weeksInTreatment} weeks in treatment</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{selectedPatient.name}</p>
              <p className="text-sm text-gray-600">Selected Patient</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedPatient(null)}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            Change Patient
          </button>
        </div>
      )}
    </div>
  );
}