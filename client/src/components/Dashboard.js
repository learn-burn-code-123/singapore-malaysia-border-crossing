import React, { useState, useEffect } from 'react';
import { useTraffic } from '../contexts/TrafficContext';
import { 
  TrendingUp, 
  Clock, 
  MapPin, 
  ArrowRight, 
  ArrowLeft,
  Car,
  Bus,
  Truck,
  Motorcycle,
  AlertTriangle,
  CheckCircle,
  Info,
  Bell,
  Settings
} from 'lucide-react';
import TrafficStatusCard from './TrafficStatusCard';
import TrafficChart from './TrafficChart';
import PeakTimeWidget from './PeakTimeWidget';

const Dashboard = () => {
  const { 
    trafficData, 
    loading, 
    error, 
    lastUpdate,
    fetchHistoricalData,
    fetchTrafficStats,
    fetchPeakTimes
  } = useTraffic();

  const [selectedCrossing, setSelectedCrossing] = useState('woodlands');
  const [selectedDirection, setSelectedDirection] = useState('malaysia-to-singapore');
  const [historicalData, setHistoricalData] = useState([]);
  const [trafficStats, setTrafficStats] = useState(null);
  const [peakTimes, setPeakTimes] = useState([]);
  const [chartHours, setChartHours] = useState(24);

  const crossingPoints = {
    woodlands: {
      name: 'Woodlands Checkpoint',
      description: 'Main land border crossing via BKE',
      coordinates: { lat: 1.4561, lng: 103.7648 }
    },
    tuas: {
      name: 'Tuas Checkpoint',
      description: 'Western crossing via NS Highway',
      coordinates: { lat: 1.3500, lng: 103.6000 }
    }
  };

  const directions = {
    'malaysia-to-singapore': {
      name: 'Malaysia → Singapore',
      icon: ArrowRight,
      color: 'blue'
    },
    'singapore-to-malaysia': {
      name: 'Singapore → Malaysia',
      icon: ArrowLeft,
      color: 'green'
    }
  };

  // Fetch additional data when selections change
  useEffect(() => {
    const loadData = async () => {
      if (selectedCrossing && selectedDirection) {
        const [histData, stats, peakData] = await Promise.all([
          fetchHistoricalData(selectedCrossing, selectedDirection, chartHours),
          fetchTrafficStats(selectedCrossing, selectedDirection, chartHours),
          fetchPeakTimes(selectedCrossing, selectedDirection, 7)
        ]);
        
        setHistoricalData(histData);
        setTrafficStats(stats);
        setPeakTimes(peakData);
      }
    };

    loadData();
  }, [selectedCrossing, selectedDirection, chartHours, fetchHistoricalData, fetchTrafficStats, fetchPeakTimes]);

  const getCurrentStatus = (crossingPoint, direction) => {
    return trafficData[crossingPoint]?.[direction] || null;
  };

  const getOverallStatus = () => {
    const allStatuses = Object.values(trafficData).flatMap(directions => 
      Object.values(directions).filter(Boolean)
    );
    
    if (allStatuses.length === 0) return { level: 'unknown', text: 'No data available' };
    
    const hasSevere = allStatuses.some(s => s.congestionLevel === 'severe');
    const hasHigh = allStatuses.some(s => s.congestionLevel === 'high');
    const hasModerate = allStatuses.some(s => s.congestionLevel === 'moderate');
    
    if (hasSevere) return { level: 'severe', text: 'Severe congestion detected' };
    if (hasHigh) return { level: 'high', text: 'High traffic levels' };
    if (hasModerate) return { level: 'moderate', text: 'Moderate traffic' };
    return { level: 'low', text: 'Low traffic levels' };
  };

  const overallStatus = getOverallStatus();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading traffic information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-red-800 mb-2">Connection Error</h3>
        <p className="text-red-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Traffic Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Real-time border crossing status and congestion monitoring
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="w-4 h-4" />
          <span>Last updated: {lastUpdate ? lastUpdate.toLocaleTimeString() : 'Never'}</span>
        </div>
      </div>

      {/* Overall Status Alert */}
      {overallStatus.level !== 'low' && (
        <div className={`p-4 rounded-lg border ${
          overallStatus.level === 'severe' ? 'bg-red-50 border-red-200' :
          overallStatus.level === 'high' ? 'bg-orange-50 border-orange-200' :
          'bg-yellow-50 border-yellow-200'
        }`}>
          <div className="flex items-center space-x-3">
            <AlertTriangle className={`w-5 h-5 ${
              overallStatus.level === 'severe' ? 'text-red-500' :
              overallStatus.level === 'high' ? 'text-orange-500' :
              'text-yellow-500'
            }`} />
            <div>
              <h3 className="font-medium text-gray-900">Traffic Alert</h3>
              <p className="text-gray-600">{overallStatus.text}</p>
            </div>
          </div>
        </div>
      )}

      {/* Traffic Status Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(crossingPoints).map(([crossingKey, crossing]) => (
          <div key={crossingKey} className="space-y-4">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-gray-500" />
              <div>
                <h2 className="text-lg font-semibold text-gray-900">{crossing.name}</h2>
                <p className="text-sm text-gray-600">{crossing.description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {Object.entries(directions).map(([directionKey, direction]) => {
                const status = getCurrentStatus(crossingKey, directionKey);
                return (
                  <TrafficStatusCard
                    key={directionKey}
                    crossing={crossing}
                    direction={direction}
                    status={status}
                    isSelected={selectedCrossing === crossingKey && selectedDirection === directionKey}
                    onClick={() => {
                      setSelectedCrossing(crossingKey);
                      setSelectedDirection(directionKey);
                    }}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <Bell className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">Set Alert</span>
          </button>
          <button className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors">
            <MapPin className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-900">View Map</span>
          </button>
          <button className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-900">Trends</span>
          </button>
          <button className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors">
            <Settings className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-900">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
