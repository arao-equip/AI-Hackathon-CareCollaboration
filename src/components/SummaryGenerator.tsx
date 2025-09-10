import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSummary } from '../contexts/SummaryContext';
import { usePatient } from '../contexts/PatientContext';
import { Sparkles, RefreshCw } from 'lucide-react';

export default function SummaryGenerator() {
  const navigate = useNavigate();
  const { selectedPatient } = usePatient();
  const { 
    filters, 
    isGenerating, 
    setIsGenerating, 
    setCurrentSummary, 
    addSummaryToHistory 
  } = useSummary();

  const generateSummary = async () => {
    if (!selectedPatient) return;

    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const mockSummary = {
        id: `summary-${Date.now()}`,
        patientId: selectedPatient.id,
        content: generateMockSummaryContent(selectedPatient, filters),
        filters,
        createdAt: new Date().toISOString(),
        createdBy: 'Dr. Emily Rodriguez',
        versions: [{
          id: 'v1',
          timestamp: new Date().toISOString(),
          user: 'Dr. Emily Rodriguez',
          content: generateMockSummaryContent(selectedPatient, filters)
        }],
        isPinned: false,
        tags: ['recent-session', 'progress-update'],
        riskFlags: selectedPatient.riskIndicators.length > 0 ? ['risk-assessment'] : []
      };

      setCurrentSummary(mockSummary);
      addSummaryToHistory(mockSummary);
      setIsGenerating(false);
      
      // Navigate to treatment summary page
      navigate('/treatment-summary');
    }, 2000);
  };

  const generateMockSummaryContent = (patient: any, filters: any) => {
    const startDate = new Date(filters.dateRange.start).toLocaleDateString();
    const endDate = new Date(filters.dateRange.end).toLocaleDateString();
    
    return `## Treatment Summary for ${patient.name}
**Period:** ${startDate} - ${endDate}

### Clinical Overview
${patient.name} is a ${patient.age}-year-old ${patient.gender.toLowerCase()} who has been in treatment for ${patient.weeksInTreatment} weeks. Primary diagnoses include ${patient.diagnoses.join(', ')}.

### Session Summary
During the reviewed period, the patient attended 85% of scheduled sessions, showing good engagement with the treatment process. Key therapeutic work has focused on ${patient.careGoals.slice(0, 2).join(' and ')}.

### Progress Notes
- **Mood Stability**: Significant improvement noted in daily mood ratings
- **Coping Skills**: Patient demonstrates increased use of learned strategies
- **Social Engagement**: Gradual improvement in interpersonal relationships

### Risk Assessment
Current risk indicators include: ${patient.riskIndicators.join(', ')}. These factors are being actively monitored and addressed in treatment planning.

### Treatment Recommendations
1. Continue current therapeutic approach
2. Monitor medication compliance
3. Increase frequency of risk assessments
4. Consider family therapy integration

### Next Steps
Scheduled follow-up appointments and continued monitoring of treatment goals. Patient will continue with current treatment plan with adjustments as needed.`;
  };

  return (
    <div className="bg-primary-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Generate Summary</h3>
        {filters.dataTypes.length > 0 && (
          <span className="text-sm text-gray-600">
            {filters.dataTypes.length} data types selected
          </span>
        )}
      </div>

      <div className="space-y-4">
        <div className="bg-teal-light rounded-lg p-4">
          <h4 className="font-medium text-deep-teal mb-2">Selected Filters</h4>
          <div className="space-y-2 text-sm text-primary-teal">
            <p>
              <span className="font-medium">Date Range:</span> {' '}
              {new Date(filters.dateRange.start).toLocaleDateString()} - {' '}
              {new Date(filters.dateRange.end).toLocaleDateString()}
            </p>
            <p>
              <span className="font-medium">Data Types:</span> {' '}
              {filters.dataTypes.length} selected
            </p>
          </div>
        </div>

        <button
          onClick={generateSummary}
          disabled={isGenerating || filters.dataTypes.length === 0}
          className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary-teal text-white rounded-lg hover:bg-deep-teal disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Generating Summary...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Generate AI-Powered Summary</span>
            </>
          )}
        </button>

        {filters.dataTypes.length === 0 && (
          <p className="text-sm text-gray-600 text-center">
            Please select at least one data type to generate a summary.
          </p>
        )}
      </div>
    </div>
  );
}

function generateMockSummaryContent(patient: any, filters: any) {
  const startDate = new Date(filters.dateRange.start).toLocaleDateString();
  const endDate = new Date(filters.dateRange.end).toLocaleDateString();
  
  return `## Treatment Summary for ${patient.name}
**Period:** ${startDate} - ${endDate}

### Clinical Overview
${patient.name} is a ${patient.age}-year-old ${patient.gender.toLowerCase()} who has been in treatment for ${patient.weeksInTreatment} weeks. Primary diagnoses include ${patient.diagnoses.join(', ')}.

### Session Summary
During the reviewed period, the patient attended 85% of scheduled sessions, showing good engagement with the treatment process. Key therapeutic work has focused on ${patient.careGoals.slice(0, 2).join(' and ')}.

### Progress Notes
- **Mood Stability**: Significant improvement noted in daily mood ratings
- **Coping Skills**: Patient demonstrates increased use of learned strategies
- **Social Engagement**: Gradual improvement in interpersonal relationships

### Risk Assessment
Current risk indicators include: ${patient.riskIndicators.join(', ')}. These factors are being actively monitored and addressed in treatment planning.

### Treatment Recommendations
1. Continue current therapeutic approach
2. Monitor medication compliance
3. Increase frequency of risk assessments
4. Consider family therapy integration

### Next Steps
Scheduled follow-up appointments and continued monitoring of treatment goals. Patient will continue with current treatment plan with adjustments as needed.`;
}