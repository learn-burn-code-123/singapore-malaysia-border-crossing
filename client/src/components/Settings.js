import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, MapPin, Clock, Shield, Globe } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('preferences');
  const [settings, setSettings] = useState({
    preferences: {
      defaultCrossingPoint: 'woodlands',
      defaultDirection: 'both',
      vehicleType: 'car',
      maxWaitTime: 45,
      alertFrequency: 'immediate',
      quietHours: {
        enabled: false,
        start: '22:00',
        end: '07:00'
      }
    },
    notifications: {
      email: false,
      push: true,
      sms: false,
      whatsapp: false
    },
    privacy: {
      shareLocation: false,
      shareTravelPatterns: false,
      analytics: true
    }
  });

  const tabs = [
    { id: 'preferences', name: 'Preferences', icon: SettingsIcon },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy', icon: Shield }
  ];

  const crossingPoints = [
    { value: 'woodlands', label: 'Woodlands Checkpoint' },
    { value: 'tuas', label: 'Tuas Checkpoint' },
    { value: 'both', label: 'Both Checkpoints' }
  ];

  const directions = [
    { value: 'malaysia-to-singapore', label: 'Malaysia → Singapore' },
    { value: 'singapore-to-malaysia', label: 'Singapore → Malaysia' },
    { value: 'both', label: 'Both Directions' }
  ];

  const vehicleTypes = [
    { value: 'car', label: 'Car' },
    { value: 'bus', label: 'Bus' },
    { value: 'truck', label: 'Truck' },
    { value: 'motorcycle', label: 'Motorcycle' },
    { value: 'all', label: 'All Vehicles' }
  ];

  const alertFrequencies = [
    { value: 'immediate', label: 'Immediate' },
    { value: '15min', label: 'Every 15 minutes' },
    { value: '30min', label: 'Every 30 minutes' },
    { value: '1hour', label: 'Every hour' }
  ];

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  const handleNestedSettingChange = (category, parentKey, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [parentKey]: {
          ...prev[category][parentKey],
          [key]: value
        }
      }
    }));
  };

  const renderPreferences = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Default Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Crossing Point
            </label>
            <select
              value={settings.preferences.defaultCrossingPoint}
              onChange={(e) => handleSettingChange('preferences', 'defaultCrossingPoint', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {crossingPoints.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Direction
            </label>
            <select
              value={settings.preferences.defaultDirection}
              onChange={(e) => handleSettingChange('preferences', 'defaultDirection', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {directions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vehicle Type
            </label>
            <select
              value={settings.preferences.vehicleType}
              onChange={(e) => handleSettingChange('preferences', 'vehicleType', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {vehicleTypes.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Maximum Wait Time (minutes)
            </label>
            <input
              type="number"
              min="5"
              max="180"
              value={settings.preferences.maxWaitTime}
              onChange={(e) => handleSettingChange('preferences', 'maxWaitTime', parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Alert Preferences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alert Frequency
            </label>
            <select
              value={settings.preferences.alertFrequency}
              onChange={(e) => handleSettingChange('preferences', 'alertFrequency', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {alertFrequencies.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Quiet Hours</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="quietHours"
              checked={settings.preferences.quietHours.enabled}
              onChange={(e) => handleNestedSettingChange('preferences', 'quietHours', 'enabled', e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="quietHours" className="text-sm font-medium text-gray-700">
              Enable quiet hours
            </label>
          </div>
          
          {settings.preferences.quietHours.enabled && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={settings.preferences.quietHours.start}
                  onChange={(e) => handleNestedSettingChange('preferences', 'quietHours', 'start', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={settings.preferences.quietHours.end}
                  onChange={(e) => handleNestedSettingChange('preferences', 'quietHours', 'end', e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Notification Channels</h3>
        <div className="space-y-4">
          {Object.entries(settings.notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-500" />
                <div>
                  <h4 className="font-medium text-gray-900 capitalize">{key}</h4>
                  <p className="text-sm text-gray-500">
                    Receive notifications via {key}
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleSettingChange('notifications', key, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Clock className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-yellow-800">Browser Notifications</h4>
            <p className="text-sm text-yellow-700 mt-1">
              Push notifications require browser permission. Email, SMS, and WhatsApp notifications are not available in this demo version.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Data & Privacy</h3>
        <div className="space-y-4">
          {Object.entries(settings.privacy).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-500" />
                <div>
                  <h4 className="font-medium text-gray-900">
                    {key === 'shareLocation' ? 'Share Location Data' :
                     key === 'shareTravelPatterns' ? 'Share Travel Patterns' :
                     key === 'analytics' ? 'Analytics & Improvements' : key}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {key === 'shareLocation' ? 'Allow sharing your location for better traffic predictions' :
                     key === 'shareTravelPatterns' ? 'Share travel patterns to improve route recommendations' :
                     key === 'analytics' ? 'Help improve the service with anonymous usage data' : ''}
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleSettingChange('privacy', key, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <Globe className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-800">Local Storage</h4>
            <p className="text-sm text-blue-700 mt-1">
              All settings are stored locally in your browser. No data is sent to external servers.
              Your preferences will be saved between sessions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Customize your experience and manage preferences
        </p>
      </div>

      {/* Settings Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'preferences' && renderPreferences()}
          {activeTab === 'notifications' && renderNotifications()}
          {activeTab === 'privacy' && renderPrivacy()}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Settings;
