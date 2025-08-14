import React from 'react';
import { Clock, TrendingUp, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const TrafficStatusCard = ({ crossing, direction, status, isSelected, onClick }) => {
  const getCongestionColor = (level) => {
    switch (level) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'severe':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCongestionIcon = (level) => {
    switch (level) {
      case 'low':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'moderate':
        return <Info className="w-5 h-5 text-yellow-600" />;
      case 'high':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'severe':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <Info className="w-5 h-5 text-gray-600" />;
    }
  };

  const getWaitTimeText = (waitTime) => {
    if (waitTime === 0) return 'No delay';
    if (waitTime < 15) return `${waitTime} min`;
    if (waitTime < 60) return `${waitTime} min`;
    const hours = Math.floor(waitTime / 60);
    const mins = waitTime % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const getWaitTimeColor = (waitTime) => {
    if (waitTime <= 15) return 'text-green-600';
    if (waitTime <= 30) return 'text-yellow-600';
    if (waitTime <= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  const getRecommendation = (waitTime, congestionLevel) => {
    if (congestionLevel === 'severe' || waitTime > 60) {
      return {
        text: 'Avoid travel',
        color: 'text-red-600',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200'
      };
    }
    if (congestionLevel === 'high' || waitTime > 30) {
      return {
        text: 'Consider delaying',
        color: 'text-orange-600',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200'
      };
    }
    if (congestionLevel === 'moderate' || waitTime > 15) {
      return {
        text: 'Moderate delay',
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        borderColor: 'border-yellow-200'
      };
    }
    return {
      text: 'Good to go',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200'
    };
  };

  if (!status) {
    return (
      <div 
        className={`p-4 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 cursor-pointer transition-all hover:border-gray-400 hover:bg-gray-100 ${
          isSelected ? 'ring-2 ring-blue-500 ring-offset-2' : ''
        }`}
        onClick={onClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <direction.icon className="w-5 h-5 text-gray-400" />
            <div>
              <h3 className="font-medium text-gray-900">{direction.name}</h3>
              <p className="text-sm text-gray-500">No data available</p>
            </div>
          </div>
          <Info className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    );
  }

  const recommendation = getRecommendation(status.waitTime, status.congestionLevel);

  return (
    <div 
      className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
        isSelected 
          ? 'ring-2 ring-blue-500 ring-offset-2 border-blue-300' 
          : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <direction.icon className={`w-5 h-5 text-${direction.color}-600`} />
          <div>
            <h3 className="font-medium text-gray-900">{direction.name}</h3>
            <p className="text-xs text-gray-500">
              {status.timestamp ? status.timestamp.toLocaleTimeString() : 'Unknown time'}
            </p>
          </div>
        </div>
        {getCongestionIcon(status.congestionLevel)}
      </div>

      {/* Wait Time */}
      <div className="mb-3">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-500" />
          <span className={`text-lg font-bold ${getWaitTimeColor(status.waitTime)}`}>
            {getWaitTimeText(status.waitTime)}
          </span>
        </div>
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCongestionColor(status.congestionLevel)}`}>
          {status.congestionLevel.charAt(0).toUpperCase() + status.congestionLevel.slice(1)} congestion
        </div>
      </div>

      {/* Recommendation */}
      <div className={`p-2 rounded-md ${recommendation.bgColor} border ${recommendation.borderColor}`}>
        <div className="flex items-center space-x-2">
          <TrendingUp className={`w-4 h-4 ${recommendation.color}`} />
          <span className={`text-sm font-medium ${recommendation.color}`}>
            {recommendation.text}
          </span>
        </div>
      </div>

      {/* Additional Info */}
      {status.dataSource && (
        <div className="mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Data source: {status.dataSource}</span>
            {status.confidence && (
              <span>Confidence: {Math.round(status.confidence * 100)}%</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TrafficStatusCard;
