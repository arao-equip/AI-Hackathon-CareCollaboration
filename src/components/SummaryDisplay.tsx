import React, { useState } from 'react';
import { useSummary } from '../contexts/SummaryContext';
import { 
  Pin, 
  Share2, 
  Download, 
  Edit3, 
  Save, 
  X, 
  Clock, 
  User,
  Tag,
  AlertTriangle,
  FileText,
  TrendingUp
} from 'lucide-react';
import MetricsDashboard from './MetricsDashboard';

export default function SummaryDisplay() {
  const { currentSummary, setCurrentSummary } = useSummary();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [showVersionHistory, setShowVersionHistory] = useState(false);

  if (!currentSummary) {
    return null;
  }

  const handleEdit = () => {
    setEditedContent(currentSummary.content);
    setIsEditing(true);
  };

  const handleSave = () => {
    const updatedSummary = {
      ...currentSummary,
      content: editedContent,
      versions: [
        ...currentSummary.versions,
        {
          id: `v${currentSummary.versions.length + 1}`,
          timestamp: new Date().toISOString(),
          user: 'Dr. Emily Rodriguez',
          content: editedContent,
          reason: 'Clinical update'
        }
      ]
    };
    setCurrentSummary(updatedSummary);
    setIsEditing(false);
  };

  const handlePin = () => {
    setCurrentSummary({
      ...currentSummary,
      isPinned: !currentSummary.isPinned
    });
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([currentSummary.content], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `treatment-summary-${currentSummary.id}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-6">
      {/* Treatment Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">

      {/* Version History Sidebar */}
      {showVersionHistory && (
        <div className="border-b border-gray-200 bg-gray-50 p-4">
          <h4 className="font-medium text-gray-900 mb-3">Version History</h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {currentSummary.versions.slice().reverse().map((version, index) => (
              <div key={version.id} className="text-sm p-2 bg-white rounded border">
                <div className="flex justify-between items-start">
                  <span className="font-medium text-gray-900">Version {currentSummary.versions.length - index}</span>
                  <span className="text-gray-500 text-xs">
                    {new Date(version.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-600 text-xs mt-1">By {version.user}</p>
                {version.reason && (
                  <p className="text-gray-600 text-xs mt-1 italic">"{version.reason}"</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {isEditing ? (
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm"
            placeholder="Edit your treatment summary..."
          />
        ) : (
          <div className="prose prose-blue max-w-none">
            <div 
              className="whitespace-pre-wrap text-gray-800 leading-relaxed"
              dangerouslySetInnerHTML={{ 
                __html: currentSummary.content
                  .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold text-gray-900 mt-6 mb-3">$1</h2>')
                  .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold text-gray-900 mt-4 mb-2">$1</h3>')
                  .replace(/^\*\*(.*?)\*\*/gm, '<strong class="font-semibold text-gray-900">$1</strong>')
                  .replace(/^- (.*$)/gm, '<li class="ml-4 mb-1">$1</li>')
                  .replace(/^(\d+)\. (.*$)/gm, '<li class="ml-4 mb-1 list-decimal">$2</li>')
              }}
            />
          </div>
        )}
      </div>
      
      {/* Metrics Dashboard */}
      <MetricsDashboard />
    </div>
    </div>
  );
}