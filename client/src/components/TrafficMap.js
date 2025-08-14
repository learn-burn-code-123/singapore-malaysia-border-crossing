import React from 'react';
import { MapPin, Navigation, Info } from 'lucide-react';

const TrafficMap = () => {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Traffic Map</h1>
        <p className="text-gray-600 mt-1">
          Interactive map showing border crossing locations and real-time traffic status
        </p>
      </div>

      {/* Map Placeholder */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="text-center py-12">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Map Integration Coming Soon</h3>
          <p className="text-gray-600 mb-6">
            This feature will integrate with Google Maps or OpenStreetMap to show:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Navigation className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-blue-800">Real-time traffic flow</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <MapPin className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-800">Border checkpoint locations</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <Info className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-purple-800">Wait time indicators</span>
            </div>
          </div>
        </div>
      </div>

      {/* Border Crossing Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Woodlands Checkpoint */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <h3 className="text-lg font-semibold text-gray-900">Woodlands Checkpoint</h3>
          </div>
          
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Coordinates:</span>
              <span>1.4561°N, 103.7648°E</span>
            </div>
            <div className="flex justify-between">
              <span>Route:</span>
              <span>BKE (Bukit Timah Expressway)</span>
            </div>
            <div className="flex justify-between">
              <span>Distance from SG:</span>
              <span>~2.5 km</span>
            </div>
            <div className="flex justify-between">
              <span>Operating Hours:</span>
              <span>24/7</span>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>Note:</strong> Main land border crossing point, typically busier during peak hours and weekends.
            </p>
          </div>
        </div>

        {/* Tuas Checkpoint */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <h3 className="text-lg font-semibold text-gray-900">Tuas Checkpoint</h3>
          </div>
          
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Coordinates:</span>
              <span>1.3500°N, 103.6000°E</span>
            </div>
            <div className="flex justify-between">
              <span>Route:</span>
              <span>NS Highway (North-South Highway)</span>
            </div>
            <div className="flex justify-between">
              <span>Distance from SG:</span>
              <span>~3.2 km</span>
            </div>
            <div className="flex justify-between">
              <span>Operating Hours:</span>
              <span>24/7</span>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-green-50 rounded-lg">
            <p className="text-xs text-green-800">
              <strong>Note:</strong> Alternative crossing point, often less congested than Woodlands.
            </p>
          </div>
        </div>
      </div>

      {/* Travel Tips */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Travel Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Best Times to Cross</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Early morning (6:00 AM - 8:00 AM)</li>
              <li>• Late evening (10:00 PM - 12:00 AM)</li>
              <li>• Avoid weekends and public holidays</li>
              <li>• Check real-time updates before departure</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Alternative Routes</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Consider Tuas if Woodlands is congested</li>
              <li>• Use public transport during peak hours</li>
              <li>• Plan for extra travel time</li>
              <li>• Monitor weather conditions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficMap;
