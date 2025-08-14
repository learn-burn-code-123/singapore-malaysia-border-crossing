import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTraffic } from '../contexts/TrafficContext';
import { 
  Home, 
  Map, 
  Bell, 
  Settings, 
  RefreshCw, 
  Wifi, 
  WifiOff,
  Clock
} from 'lucide-react';

const Header = () => {
  const location = useLocation();
  const { loading, error, lastUpdate, refreshData, getAllCurrentStatuses } = useTraffic();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Traffic Map', href: '/map', icon: Map },
    { name: 'Alerts', href: '/alerts', icon: Bell },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const getConnectionStatus = () => {
    if (error) return { status: 'error', icon: WifiOff, text: 'Disconnected' };
    if (loading) return { status: 'loading', icon: RefreshCw, text: 'Loading...' };
    return { status: 'connected', icon: Wifi, text: 'Connected' };
  };

  const getLastUpdateText = () => {
    if (!lastUpdate) return 'Never';
    
    const now = new Date();
    const diffMs = now - lastUpdate;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  const getOverallTrafficStatus = () => {
    const allStatuses = getAllCurrentStatuses();
    if (allStatuses.length === 0) return 'unknown';
    
    const hasHighTraffic = allStatuses.some(status => 
      status.congestionLevel === 'high' || status.congestionLevel === 'severe'
    );
    
    if (hasHighTraffic) return 'high';
    
    const hasModerateTraffic = allStatuses.some(status => 
      status.congestionLevel === 'moderate'
    );
    
    if (hasModerateTraffic) return 'moderate';
    
    return 'low';
  };

  const connectionStatus = getConnectionStatus();
  const overallTrafficStatus = getOverallTrafficStatus();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">BM</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Border Monitor</h1>
              <p className="text-xs text-gray-500">Malaysia-Singapore Transit</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Status and Actions */}
          <div className="flex items-center space-x-4">
            {/* Overall Traffic Status */}
            <div className="hidden sm:flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                overallTrafficStatus === 'high' ? 'bg-red-500' :
                overallTrafficStatus === 'moderate' ? 'bg-yellow-500' :
                overallTrafficStatus === 'low' ? 'bg-green-500' : 'bg-gray-400'
              }`} />
              <span className="text-xs text-gray-600 capitalize">
                {overallTrafficStatus} traffic
              </span>
            </div>

            {/* Last Update */}
            <div className="hidden sm:flex items-center space-x-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              <span>{getLastUpdateText()}</span>
            </div>

            {/* Connection Status */}
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
              connectionStatus.status === 'connected' ? 'bg-green-100 text-green-700' :
              connectionStatus.status === 'loading' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              <connectionStatus.icon className="w-3 h-3" />
              <span className="hidden sm:inline">{connectionStatus.text}</span>
            </div>

            {/* Refresh Button */}
            <button
              onClick={refreshData}
              disabled={loading}
              className={`p-2 rounded-md transition-colors ${
                loading
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
              title="Refresh data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <nav className="flex space-x-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
