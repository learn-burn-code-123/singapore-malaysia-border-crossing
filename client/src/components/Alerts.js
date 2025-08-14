import React, { useState } from 'react';
import { Bell, Plus, Edit, Trash2, Clock, MapPin, AlertTriangle, CheckCircle } from 'lucide-react';

const Alerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      name: 'Morning Commute Alert',
      crossingPoint: 'woodlands',
      direction: 'malaysia-to-singapore',
      maxWaitTime: 30,
      days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      timeRange: { start: '07:00', end: '09:00' },
      isActive: true,
      lastTriggered: '2024-01-15T08:30:00Z'
    },
    {
      id: 2,
      name: 'Weekend Travel Warning',
      crossingPoint: 'both',
      direction: 'both',
      maxWaitTime: 45,
      days: ['saturday', 'sunday'],
      timeRange: { start: '10:00', end: '18:00' },
      isActive: true,
      lastTriggered: '2024-01-14T14:15:00Z'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingAlert, setEditingAlert] = useState(null);

  const crossingPoints = {
    woodlands: 'Woodlands Checkpoint',
    tuas: 'Tuas Checkpoint',
    both: 'Both Checkpoints'
  };

  const directions = {
    'malaysia-to-singapore': 'Malaysia → Singapore',
    'singapore-to-malaysia': 'Singapore → Malaysia',
    'both': 'Both Directions'
  };

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  const handleDeleteAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const handleToggleAlert = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  const formatLastTriggered = (timestamp) => {
    if (!timestamp) return 'Never';
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Traffic Alerts</h1>
          <p className="text-gray-600 mt-1">
            Configure traffic alerts and monitoring preferences
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Alert</span>
        </button>
      </div>

      {/* Active Alerts */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Active Alerts</h2>
          <p className="text-sm text-gray-600">Configured traffic monitoring alerts</p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {alerts.map((alert) => (
            <div key={alert.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Bell className={`w-5 h-5 ${alert.isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                    <h3 className="text-lg font-medium text-gray-900">{alert.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      alert.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {alert.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4" />
                        <span>{crossingPoints[alert.crossingPoint]}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Alert when wait time > {alert.maxWaitTime} minutes</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{alert.timeRange.start} - {alert.timeRange.end}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>Days: {alert.days.map(day => 
                          days.find(d => d.key === day)?.label
                        ).join(', ')}</span>
                      </div>
                    </div>
                  </div>
                  
                  {alert.lastTriggered && (
                    <div className="mt-3 flex items-center space-x-2 text-xs text-gray-500">
                      <CheckCircle className="w-3 h-3" />
                      <span>Last triggered: {formatLastTriggered(alert.lastTriggered)}</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => handleToggleAlert(alert.id)}
                    className={`p-2 rounded-md transition-colors ${
                      alert.isActive
                        ? 'text-green-600 hover:bg-green-50'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                    title={alert.isActive ? 'Deactivate alert' : 'Activate alert'}
                  >
                    {alert.isActive ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Clock className="w-4 h-4" />
                    )}
                  </button>
                  
                  <button
                    onClick={() => setEditingAlert(alert)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                    title="Edit alert"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={() => handleDeleteAlert(alert.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete alert"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {alerts.length === 0 && (
          <div className="p-12 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No alerts configured</h3>
            <p className="text-gray-600 mb-4">
              Create your first traffic alert to get notified about border congestion
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Create Alert
            </button>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
            <Bell className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-900">Test Notifications</span>
          </button>
          <button className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors">
            <Clock className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-900">Set Quiet Hours</span>
          </button>
          <button className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors">
            <MapPin className="w-5 h-5 text-purple-600" />
            <span className="text-sm font-medium text-gray-900">Location Preferences</span>
          </button>
          <button className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-colors">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <span className="text-sm font-medium text-gray-900">Emergency Alerts</span>
          </button>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <CheckCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-800">Local Alerts</h3>
            <p className="text-sm text-blue-700 mt-1">
              Alerts are stored locally in your browser. No account or database connection required.
              You can configure multiple alerts for different crossing points and time periods.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
