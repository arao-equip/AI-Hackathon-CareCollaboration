import React from 'react';
import { useSummary } from '../contexts/SummaryContext';
import { 
  FileText, 
  BarChart3, 
  Users, 
  Calendar,
  ClipboardList,
  Activity,
  ChevronDown,
  ChevronRight
} from 'lucide-react';

interface DataSection {
  id: string;
  title: string;
  icon: React.ComponentType<any>;
  data: any[];
  color: string;
}

export default function GranularDataDisplay() {
  const { filters } = useSummary();
  const [expandedSections, setExpandedSections] = React.useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const getDataTypeConfig = (dataTypeId: string): DataSection => {
    const configs: Record<string, DataSection> = {
      'session-summaries': {
        id: 'session-summaries',
        title: 'Session Summaries',
        icon: FileText,
        color: 'blue',
        data: [
          {
            date: '2024-01-08',
            provider: 'Dr. Sarah Mitchell',
            type: 'Individual Therapy',
            duration: '50 minutes',
            summary: 'Patient showed improved mood regulation. Discussed coping strategies for anxiety triggers. Homework assigned: daily mood tracking.',
            goals: ['Mood stability', 'Anxiety management'],
            progress: 'Good engagement, practicing techniques consistently'
          },
          {
            date: '2024-01-05',
            provider: 'Dr. Sarah Mitchell',
            type: 'Individual Therapy',
            duration: '50 minutes',
            summary: 'Focused on cognitive restructuring techniques. Patient identified negative thought patterns related to work stress.',
            goals: ['Cognitive restructuring', 'Stress management'],
            progress: 'Moderate progress, needs more practice with techniques'
          }
        ]
      },
      'assessments': {
        id: 'assessments',
        title: 'Assessment Results',
        icon: BarChart3,
        color: 'green',
        data: [
          {
            date: '2024-01-07',
            assessment: 'PHQ-9 (Depression)',
            score: '12',
            severity: 'Moderate',
            change: '-3 from previous',
            notes: 'Improvement in sleep and appetite items'
          },
          {
            date: '2024-01-07',
            assessment: 'GAD-7 (Anxiety)',
            score: '8',
            severity: 'Mild',
            change: '-2 from previous',
            notes: 'Reduced worry about daily activities'
          }
        ]
      },
      'group-attendance': {
        id: 'group-attendance',
        title: 'Group Sessions',
        icon: Users,
        color: 'purple',
        data: [
          {
            date: '2024-01-09',
            group: 'DBT Skills Group',
            facilitator: 'Dr. Michael Chen',
            attendance: 'Present',
            participation: 'Active',
            topic: 'Distress Tolerance',
            notes: 'Shared personal experience, helped other group members'
          },
          {
            date: '2024-01-06',
            group: 'DBT Skills Group',
            facilitator: 'Dr. Michael Chen',
            attendance: 'Present',
            participation: 'Moderate',
            topic: 'Emotion Regulation',
            notes: 'Listened attentively, completed exercises'
          }
        ]
      },
      'clinical-notes': {
        id: 'clinical-notes',
        title: 'Clinical Notes',
        icon: ClipboardList,
        color: 'amber',
        data: [
          {
            date: '2024-01-08',
            provider: 'Nurse Jennifer Adams',
            type: 'Medication Check',
            observation: 'Patient reports improved sleep since medication adjustment',
            action: 'Continue current dosage, monitor for side effects'
          },
          {
            date: '2024-01-07',
            provider: 'Dr. Sarah Mitchell',
            type: 'Risk Assessment',
            observation: 'No current suicidal ideation reported. Safety plan reviewed.',
            action: 'Continue weekly risk assessments'
          }
        ]
      },
      'utilization': {
        id: 'utilization',
        title: 'Session Utilization',
        icon: Calendar,
        color: 'indigo',
        data: [
          {
            week: 'Week of Jan 1-7',
            scheduled: 3,
            attended: 3,
            cancelled: 0,
            noShow: 0,
            attendanceRate: '100%'
          },
          {
            week: 'Week of Dec 25-31',
            scheduled: 2,
            attended: 1,
            cancelled: 1,
            noShow: 0,
            attendanceRate: '50%',
            notes: 'Holiday cancellation'
          }
        ]
      },
      'lab-results': {
        id: 'lab-results',
        title: 'Lab Data',
        icon: Activity,
        color: 'red',
        data: [
          {
            date: '2024-01-05',
            test: 'Lithium Level',
            result: '0.8 mEq/L',
            range: '0.6-1.2 mEq/L',
            status: 'Normal',
            notes: 'Therapeutic range maintained'
          },
          {
            date: '2024-01-05',
            test: 'TSH',
            result: '2.1 mIU/L',
            range: '0.4-4.0 mIU/L',
            status: 'Normal',
            notes: 'Thyroid function stable'
          }
        ]
      }
    };

    return configs[dataTypeId] || {
      id: dataTypeId,
      title: dataTypeId,
      icon: FileText,
      color: 'gray',
      data: []
    };
  };

  const selectedDataTypes = filters.dataTypes.map(getDataTypeConfig);

  const colorClasses = {
    blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
    green: { bg: 'bg-green-50', text: 'text-green-600', border: 'border-green-200' },
    purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
    amber: { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200' },
    indigo: { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200' },
    red: { bg: 'bg-red-50', text: 'text-red-600', border: 'border-red-200' },
    gray: { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Detailed Data Review</h2>
      
      {selectedDataTypes.map(section => {
        const isExpanded = expandedSections.includes(section.id);
        const IconComponent = section.icon;
        const colors = colorClasses[section.color as keyof typeof colorClasses];

        return (
          <div key={section.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${colors.bg} ${colors.text}`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">{section.title}</h3>
                  <p className="text-sm text-gray-600">{section.data.length} entries</p>
                </div>
              </div>
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>

            {isExpanded && (
              <div className="px-6 pb-6 border-t border-gray-100">
                <div className="space-y-4 mt-4">
                  {section.data.map((item, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${colors.bg} ${colors.border}`}>
                      {section.id === 'session-summaries' && (
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-900">{item.type}</p>
                              <p className="text-sm text-gray-600">{item.provider} • {item.date} • {item.duration}</p>
                            </div>
                          </div>
                          <p className="text-gray-800">{item.summary}</p>
                          <div className="flex flex-wrap gap-2">
                            {item.goals.map((goal: string, i: number) => (
                              <span key={i} className="px-2 py-1 text-xs bg-white rounded border">
                                {goal}
                              </span>
                            ))}
                          </div>
                          <p className="text-sm text-gray-600 italic">{item.progress}</p>
                        </div>
                      )}

                      {section.id === 'assessments' && (
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-900">{item.assessment}</p>
                              <p className="text-sm text-gray-600">{item.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900">{item.score}</p>
                              <p className="text-sm text-gray-600">{item.severity}</p>
                            </div>
                          </div>
                          <p className="text-sm text-green-600">{item.change}</p>
                          <p className="text-sm text-gray-600">{item.notes}</p>
                        </div>
                      )}

                      {section.id === 'group-attendance' && (
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-900">{item.group}</p>
                              <p className="text-sm text-gray-600">{item.facilitator} • {item.date}</p>
                            </div>
                            <div className="text-right">
                              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                                {item.attendance}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-800"><strong>Topic:</strong> {item.topic}</p>
                          <p className="text-sm text-gray-800"><strong>Participation:</strong> {item.participation}</p>
                          <p className="text-sm text-gray-600">{item.notes}</p>
                        </div>
                      )}

                      {section.id === 'clinical-notes' && (
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-900">{item.type}</p>
                              <p className="text-sm text-gray-600">{item.provider} • {item.date}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-800"><strong>Observation:</strong> {item.observation}</p>
                          <p className="text-sm text-gray-800"><strong>Action:</strong> {item.action}</p>
                        </div>
                      )}

                      {section.id === 'utilization' && (
                        <div className="space-y-2">
                          <p className="font-medium text-gray-900">{item.week}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-600">Scheduled: <span className="font-medium">{item.scheduled}</span></p>
                              <p className="text-gray-600">Attended: <span className="font-medium text-green-600">{item.attended}</span></p>
                            </div>
                            <div>
                              <p className="text-gray-600">Cancelled: <span className="font-medium">{item.cancelled}</span></p>
                              <p className="text-gray-600">No Show: <span className="font-medium">{item.noShow}</span></p>
                            </div>
                          </div>
                          <p className="text-sm font-medium">Attendance Rate: {item.attendanceRate}</p>
                          {item.notes && <p className="text-sm text-gray-600 italic">{item.notes}</p>}
                        </div>
                      )}

                      {section.id === 'lab-results' && (
                        <div className="space-y-2">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="font-medium text-gray-900">{item.test}</p>
                              <p className="text-sm text-gray-600">{item.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-gray-900">{item.result}</p>
                              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">
                                {item.status}
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">Reference: {item.range}</p>
                          <p className="text-sm text-gray-600">{item.notes}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}