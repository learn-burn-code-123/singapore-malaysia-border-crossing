import React from 'react';
import { Clock, TrendingUp, AlertTriangle } from 'lucide-react';

const PeakTimeWidget = ({ peakTimes }) => {
  if (!peakTimes || peakTimes.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
          <Clock className="w-4 h-4" />
          <span>Peak Times</span>
        </h4>
        <p className="text-sm text-gray-500">No peak time data available</p>
      </div>
    );
  }

  const getDayName = (dayNumber) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[dayNumber - 1] || 'Unknown';
  };

  const getTimeString = (hour) => {
    if (hour === 0) return '12:00 AM';
    if (hour < 12) return `${hour}:00 AM`;
    if (hour === 12) return '12:00 PM';
    return `${hour - 12}:00 PM`;
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'medium':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low':
        return 'text-green-600 bg-green-50 border-green-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'medium':
        return <TrendingUp className="w-4 h-4 text-orange-600" />;
      case 'low':
        return <Clock className="w-4 h-4 text-green-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  // Sort by severity and average wait time
  const sortedPeakTimes = [...peakTimes].sort((a, b) => {
    const severityOrder = { high: 3, medium: 2, low: 1 };
    const aSeverity = severityOrder[a.severity] || 0;
    const bSeverity = severityOrder[b.severity] || 0;
    
    if (aSeverity !== bSeverity) {
      return bSeverity - aSeverity;
    }
    
    return b.avgWaitTime - a.avgWaitTime;
  });

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h4 className="font-medium text-gray-900 mb-3 flex items-center space-x-2">
        <Clock className="w-4 h-4" />
        <span>Peak Times (7 days)</span>
      </h4>
      
      <div className="space-y-3">
        {sortedPeakTimes.slice(0, 8).map((peak, index) => (
          <div key={index} className="flex items-center justify-between p-2 bg-white rounded-md border border-gray-200">
            <div className="flex items-center space-x-3">
              {getSeverityIcon(peak.severity)}
              <div>
                <div className="text-sm font-medium text-gray-900">
                  {getDayName(peak.dayOfWeek)} {getTimeString(peak.hour)}
                </div>
                <div className="text-xs text-gray-500">
                  Avg: {peak.avgWaitTime} min • {peak.count} records
                </div>
              </div>
            </div>
            
            <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(peak.severity)}`}>
              {peak.severity.charAt(0).toUpperCase() + peak.severity.slice(1)}
            </div>
          </div>
        ))}
      </div>
      
      {peakTimes.length > 8 && (
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500">
            Showing top 8 peak times of {peakTimes.length} total
          </p>
        </div>
      )}
    </div>
  );
};

export default PeakTimeWidget;
