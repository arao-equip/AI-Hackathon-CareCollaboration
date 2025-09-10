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
      {/* Metrics Dashboard */}
      <MetricsDashboard />
      
      {/* Treatment Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="w-5 h-5 text-gray-600" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Clinical Summary</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{new Date(currentSummary.createdAt).toLocaleString()}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <User className="w-3 h-3" />
                  <span>{currentSummary.createdBy}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowVersionHistory(!showVersionHistory)}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Version History"
            >
              <Clock className="w-4 h-4" />
            </button>
            <button
              onClick={handlePin}
              className={`p-2 rounded-lg transition-colors ${
                currentSummary.isPinned 
                  ? 'text-blue-600 bg-blue-100 hover:bg-blue-200' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              title={currentSummary.isPinned ? 'Unpin Summary' : 'Pin Summary'}
            >
              <Pin className="w-4 h-4" />
            </button>
            <button
              onClick={() => alert('Share functionality would integrate with Maud chat system')}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Share Summary"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              title="Download Summary"
            >
              <Download className="w-4 h-4" />
            </button>
            {isEditing ? (
              <div className="flex items-center space-x-1">
                <button
                  onClick={handleSave}
                  className="p-2 text-green-600 hover:text-green-700 hover:bg-green-100 rounded-lg transition-colors"
                  title="Save Changes"
                >
                  <Save className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  title="Cancel Edit"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleEdit}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Edit Summary"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tags and Risk Flags */}
        <div className="flex items-center space-x-4 mt-3">
          {currentSummary.tags.length > 0 && (
            <div className="flex items-center space-x-2">
              <Tag className="w-3 h-3 text-gray-500" />
              <div className="flex space-x-1">
                {currentSummary.tags.map(tag => (
                  <span key={tag} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {currentSummary.riskFlags.length > 0 && (
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-3 h-3 text-amber-500" />
              <div className="flex space-x-1">
                {currentSummary.riskFlags.map(flag => (
                  <span key={flag} className="px-2 py-1 text-xs bg-amber-100 text-amber-800 rounded border border-amber-200">
                    {flag}
                  </span>
                ))}
              </div>
            </div>
          )}
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
    </div>
    </div>
  );
}