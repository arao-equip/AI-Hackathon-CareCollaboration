import React from 'react';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-teal-50 rounded-lg">
              <span className="w-6 h-6 text-teal-600 font-bold text-lg flex items-center justify-center">M</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Care Collaboration</h1>
              <p className="text-sm text-gray-600">Treatment Summary Tool</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Dr. Emily Rodriguez</p>
              <p className="text-xs text-gray-600">Licensed Therapist</p>
            </div>
            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-teal-700">ER</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}