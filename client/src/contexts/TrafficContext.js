import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import toast from 'react-hot-toast';

const TrafficContext = createContext();

export const useTraffic = () => {
  const context = useContext(TrafficContext);
  if (!context) {
    throw new Error('useTraffic must be used within a TrafficProvider');
  }
  return context;
};

export const TrafficProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [trafficData, setTrafficData] = useState({
    woodlands: {
      'malaysia-to-singapore': null,
      'singapore-to-malaysia': null
    },
    tuas: {
      'malaysia-to-singapore': null,
      'singapore-to-malaysia': null
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  // Initialize Socket.IO connection
  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');
    
    newSocket.on('connect', () => {
      console.log('Connected to server');
      setError(null);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setError('Connection lost. Trying to reconnect...');
    });

    newSocket.on('traffic-update', (data) => {
      console.log('Received traffic update:', data);
      updateTrafficData(data.data);
      setLastUpdate(new Date());
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
      setError('Failed to connect to server');
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  // Update traffic data
  const updateTrafficData = useCallback((newData) => {
    setTrafficData(prevData => {
      const updated = { ...prevData };
      
      newData.forEach(item => {
        if (updated[item.crossingPoint] && updated[item.crossingPoint][item.direction]) {
          updated[item.crossingPoint][item.direction] = {
            ...item,
            timestamp: new Date(item.timestamp)
          };
        }
      });
      
      return updated;
    });
  }, []);

  // Fetch initial traffic data
  const fetchTrafficData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/traffic/status');
      
      if (response.data.success) {
        updateTrafficData(response.data.data);
        setLastUpdate(new Date());
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching traffic data:', err);
      setError('Failed to fetch traffic data');
      toast.error('Failed to load traffic information');
    } finally {
      setLoading(false);
    }
  }, [updateTrafficData]);

  // Fetch historical data
  const fetchHistoricalData = useCallback(async (crossingPoint, direction, hours = 24) => {
    try {
      const response = await axios.get(`/api/traffic/history/${crossingPoint}/${direction}`, {
        params: { hours }
      });
      
      if (response.data.success) {
        return response.data.data;
      }
      return [];
    } catch (err) {
      console.error('Error fetching historical data:', err);
      toast.error('Failed to load historical data');
      return [];
    }
  }, []);

  // Fetch traffic statistics
  const fetchTrafficStats = useCallback(async (crossingPoint, direction, hours = 24) => {
    try {
      const response = await axios.get(`/api/traffic/stats/${crossingPoint}/${direction}`, {
        params: { hours }
      });
      
      if (response.data.success) {
        return response.data.statistics;
      }
      return null;
    } catch (err) {
      console.error('Error fetching traffic stats:', err);
      toast.error('Failed to load traffic statistics');
      return null;
    }
  }, []);

  // Fetch peak time analysis
  const fetchPeakTimes = useCallback(async (crossingPoint, direction, days = 7) => {
    try {
      const response = await axios.get(`/api/traffic/peak-times/${crossingPoint}/${direction}`, {
        params: { days }
      });
      
      if (response.data.success) {
        return response.data.peakTimes;
      }
      return [];
    } catch (err) {
      console.error('Error fetching peak times:', err);
      toast.error('Failed to load peak time analysis');
      return [];
    }
  }, []);

  // Join monitoring for a specific crossing
  const joinMonitoring = useCallback((crossingPoint) => {
    if (socket) {
      socket.emit('join-monitoring', { crossingPoint });
    }
  }, [socket]);

  // Get current status for a specific crossing and direction
  const getCurrentStatus = useCallback((crossingPoint, direction) => {
    return trafficData[crossingPoint]?.[direction] || null;
  }, [trafficData]);

  // Get all current statuses
  const getAllCurrentStatuses = useCallback(() => {
    const allStatuses = [];
    
    Object.entries(trafficData).forEach(([crossingPoint, directions]) => {
      Object.entries(directions).forEach(([direction, data]) => {
        if (data) {
          allStatuses.push({
            crossingPoint,
            direction,
            ...data
          });
        }
      });
    });
    
    return allStatuses;
  }, [trafficData]);

  // Refresh data manually
  const refreshData = useCallback(() => {
    fetchTrafficData();
  }, [fetchTrafficData]);

  // Initial data fetch
  useEffect(() => {
    fetchTrafficData();
  }, [fetchTrafficData]);

  const value = {
    trafficData,
    loading,
    error,
    lastUpdate,
    socket,
    fetchTrafficData,
    fetchHistoricalData,
    fetchTrafficStats,
    fetchPeakTimes,
    joinMonitoring,
    getCurrentStatus,
    getAllCurrentStatuses,
    refreshData
  };

  return (
    <TrafficContext.Provider value={value}>
      {children}
    </TrafficContext.Provider>
  );
};
