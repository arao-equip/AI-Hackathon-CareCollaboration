import React from 'react';
import { TrendingUp, Users, Calendar, Target, AlertCircle } from 'lucide-react';

export default function MetricsDashboard() {
  const metrics = [
    {
      title: 'Session Attendance',
      value: '85%',
      change: '+5%',
      trend: 'up',
      icon: Calendar,
      color: 'blue'
    },
    {
      title: 'Goal Progress',
      value: '3/5',
      change: '+1',
      trend: 'up',
      icon: Target,
      color: 'green'
    },
    {
      title: 'Provider Utilization',
      value: '12 sessions',
      change: '+3',
      trend: 'up',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Risk Level',
      value: 'Moderate',
      change: '-1',
      trend: 'down',
      icon: AlertCircle,
      color: 'amber'
    }
  ];

  return (
    <div className="bg-primary-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Treatment Metrics Overview</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          const colorClasses = {
            blue: 'bg-blue-light text-blue-custom',
            green: 'bg-teal-light text-primary-teal',
            purple: 'bg-blue-light text-blue-custom',
            amber: 'bg-marigold-light text-marigold'
          };

          return (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${colorClasses[metric.color as keyof typeof colorClasses]}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className={`flex items-center text-xs ${
                  metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className={`w-3 h-3 mr-1 ${
                    metric.trend === 'down' ? 'rotate-180' : ''
                  }`} />
                  {metric.change}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-xl font-bold text-gray-900">{metric.value}</p>
                <p className="text-xs text-gray-600">{metric.title}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}