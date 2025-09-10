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
  const [showShareModal, setShowShareModal] = useState(false);

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
      <div className="bg-primary-white rounded-lg shadow-sm border border-gray-200">
        {/* Header with Action Buttons */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <FileText className="w-6 h-6 text-gray-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Treatment Summary</h2>
              <p className="text-sm text-gray-600">
                Generated on {new Date(currentSummary.createdAt).toLocaleDateString()} by {currentSummary.createdBy}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {/* Pin Button */}
            <button
              onClick={handlePin}
              className={`p-2 rounded-lg transition-colors ${
                currentSummary.isPinned
                  ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={currentSummary.isPinned ? 'Unpin summary' : 'Pin summary'}
            >
              <Pin className={`w-4 h-4 ${currentSummary.isPinned ? 'fill-current' : ''}`} />
            </button>

            {/* Share Button */}
            <button
              onClick={() => setShowShareModal(true)}
              className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              title="Share summary"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              title="Download summary"
            >
              <Download className="w-4 h-4" />
            </button>

            {/* Edit Button */}
            {isEditing ? (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="px-3 py-2 bg-primary-teal text-white rounded-lg hover:bg-deep-teal transition-colors flex items-center space-x-1"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors flex items-center space-x-1"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleEdit}
             className="px-3 py-2 bg-primary-teal text-white rounded-lg hover:bg-deep-teal transition-colors flex items-center space-x-1"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit</span>
              </button>
            )}

            {/* Version History Toggle */}
            <button
              onClick={() => setShowVersionHistory(!showVersionHistory)}
              className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              title="View version history"
            >
              <Clock className="w-4 h-4" />
            </button>
          </div>
        </div>

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
          className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-teal focus:border-transparent resize-none font-mono text-sm"
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

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
       <div className="bg-primary-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Share Treatment Summary</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Share with team members
                </label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-blue-700">SM</span>
                      </div>
                      <span className="text-sm text-gray-900">Dr. Sarah Mitchell</span>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-green-700">MC</span>
                      </div>
                      <span className="text-sm text-gray-900">Dr. Michael Chen</span>
                    </div>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-medium text-purple-700">JA</span>
                      </div>
                      <span className="text-sm text-gray-900">Nurse Jennifer Adams</span>
                    </div>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add a message (optional)
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="Add a note about this summary..."
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle share logic here
                  setShowShareModal(false);
                }}
               className="px-4 py-2 bg-primary-teal text-white rounded-lg hover:bg-deep-teal transition-colors"
              >
                Share Summary
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}