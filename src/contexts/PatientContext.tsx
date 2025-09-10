import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  admitDate: string;
  weeksInTreatment: number;
  diagnoses: string[];
  careGoals: string[];
  riskIndicators: string[];
  preferences: string[];
}

interface PatientContextType {
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;
  patients: Patient[];
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    age: 28,
    gender: 'Female',
    admitDate: '2024-01-15',
    weeksInTreatment: 8,
    diagnoses: ['Major Depressive Disorder', 'Generalized Anxiety Disorder'],
    careGoals: ['Improve mood stability', 'Develop coping strategies', 'Increase social engagement'],
    riskIndicators: ['History of self-harm'],
    preferences: ['Morning appointments', 'Female therapists preferred']
  },
  {
    id: '2',
    name: 'Michael Chen',
    age: 35,
    gender: 'Male',
    admitDate: '2024-02-01',
    weeksInTreatment: 6,
    diagnoses: ['Bipolar I Disorder', 'Substance Use Disorder'],
    careGoals: ['Maintain sobriety', 'Medication compliance', 'Stress management'],
    riskIndicators: ['Suicidal ideation', 'Substance abuse history'],
    preferences: ['Evening sessions', 'Group therapy participation']
  }
];

export function PatientProvider({ children }: { children: ReactNode }) {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  return (
    <PatientContext.Provider value={{ 
      selectedPatient, 
      setSelectedPatient, 
      patients: mockPatients 
    }}>
      {children}
    </PatientContext.Provider>
  );
}

export function usePatient() {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatient must be used within PatientProvider');
  }
  return context;
}