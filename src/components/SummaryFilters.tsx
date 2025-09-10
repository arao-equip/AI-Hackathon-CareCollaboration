import React from 'react';
import { useSummary } from '../contexts/SummaryContext';
import { Calendar, Filter } from 'lucide-react';

export default function SummaryFilters() {
  const { filters, setFilters } = useSummary();

  const dataTypes = [
    { id: 'session-summaries', label: 'Session Summaries', description: 'Clinical session notes by provider' },
    { id: 'assessments', label: 'Assessment Results', description: 'Standardized assessment scores' },
    { id: 'lab-results', label: 'Lab Data', description: 'Laboratory test results' },
    { id: 'group-attendance', label: 'Group Sessions', description: 'Group therapy participation' },
    { id: 'clinical-notes', label: 'Clinical Notes', description: 'Discrete clinical observations' },
    { id: 'utilization', label: 'Session Utilization', description: 'Attendance and engagement metrics' }
  ];

  const handleDateChange = (field: 'start' | 'end', value: string) => {
    setFilters({
      ...filters,
      dateRange: { ...filters.dateRange, [field]: value }
    });
  };

  const handleDataTypeChange = (dataTypeId: string, checked: boolean) => {
    const newDataTypes = checked 
      ? [...filters.dataTypes, dataTypeId]
      : filters.dataTypes.filter(id => id !== dataTypeId);
    
    setFilters({ ...filters, dataTypes: newDataTypes });
  };

  const setQuickRange = (days: number) => {
    const end = new Date().toISOString().split('T')[0];
    const start = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    setFilters({ ...filters, dateRange: { start, end } });
  };

  const setLastAppointment = () => {
    // Mock last appointment date - in real app this would come from patient data
    const lastAppointment = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    const today = new Date().toISOString().split('T')[0];
    setFilters({ ...filters, dateRange: { start: lastAppointment, end: today } });
  };

  const setSinceStartOfTreatment = () => {
    // Mock treatment start date - in real app this would come from patient data
    const treatmentStart = new Date(Date.now() - 56 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 8 weeks ago
    const today = new Date().toISOString().split('T')[0];
    setFilters({ ...filters, dateRange: { start: treatmentStart, end: today } });
  };

  const handleSelectAll = (checked: boolean) => {
    const newDataTypes = checked ? dataTypes.map(dt => dt.id) : [];
    setFilters({ ...filters, dataTypes: newDataTypes });
  };

  const isAllSelected = dataTypes.length === filters.dataTypes.length;
  const isPartiallySelected = filters.dataTypes.length > 0 && filters.dataTypes.length < dataTypes.length;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Treatment Summary Filters</h3>
      </div>

      {/* Date Range */}
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-3">
          <Calendar className="w-4 h-4 text-gray-600" />
          <h4 className="font-medium text-gray-900">Date Range</h4>
        </div>
        
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={filters.dateRange.start}
                onChange={(e) => handleDateChange('start', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={filters.dateRange.end}
                onChange={(e) => handleDateChange('end', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setQuickRange(7)}
              className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
            >
              Last 7 days
            </button>
            <button
              onClick={() => setQuickRange(30)}
              className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
            >
              Last 30 days
            </button>
            <button
              onClick={() => setQuickRange(90)}
              className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
            >
              Last 90 days
            </button>
            <button
              onClick={setLastAppointment}
              className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors"
            >
              Last Appointment
            </button>
            <button
              onClick={setSinceStartOfTreatment}
              className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors"
            >
              Since Start of Treatment
            </button>
          </div>
        </div>
      </div>

      {/* Data Types */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900">Include Data Types</h4>
          <button
            onClick={() => handleSelectAll(!isAllSelected)}
            className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors"
          >
            {isAllSelected ? 'Deselect All' : 'Select All'}
          </button>
        </div>
        <div className="space-y-3">
          {dataTypes.map(dataType => (
            <label key={dataType.id} className="flex items-start space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.dataTypes.includes(dataType.id)}
                onChange={(e) => handleDataTypeChange(dataType.id, e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {dataType.label}
                </div>
                <div className="text-xs text-gray-600 mt-0.5">
                  {dataType.description}
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}