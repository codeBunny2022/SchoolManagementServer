import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const SchoolList = () => {
  const [location, setLocation] = useState({
    latitude: '',
    longitude: ''
  });
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  // Try to get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6)
          });
        },
        (error) => {
          console.log('Geolocation error:', error);
          // Set default location (New York)
          setLocation({
            latitude: '40.7128',
            longitude: '-74.0060'
          });
        }
      );
    } else {
      // Set default location if geolocation is not available
      setLocation({
        latitude: '40.7128',
        longitude: '-74.0060'
      });
    }
  }, []);

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const searchSchools = async () => {
    if (!location.latitude || !location.longitude) {
      toast.error('Please enter both latitude and longitude');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get('/listSchools', {
        params: {
          latitude: location.latitude,
          longitude: location.longitude
        }
      });

      if (response.data.success) {
        setSchools(response.data.data.schools);
        setSearched(true);
        toast.success(`Found ${response.data.data.schools.length} schools`);
      }
    } catch (error) {
      console.error('Error fetching schools:', error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to fetch schools. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDistance = (distance) => {
    if (distance < 1) {
      return `${(distance * 1000).toFixed(0)} meters`;
    } else {
      return `${distance.toFixed(2)} km`;
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Schools Near You</h1>
        <p className="text-gray-600">
          Enter your location coordinates to find schools sorted by proximity
        </p>
      </div>

      {/* Location Input */}
      <div className="card mb-8">
        <div className="flex items-center gap-3 mb-4" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div className="flex items-center justify-center" style={{ width: '40px', height: '40px', backgroundColor: '#e3f2fd', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg className="icon" viewBox="0 0 24 24" fill="#1976d2">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-semibold">Your Location</h2>
            <p className="text-sm text-gray-600">Enter coordinates to find nearby schools</p>
          </div>
        </div>

        <div className="grid grid-3 gap-4">
          <div>
            <label htmlFor="latitude" className="form-label">
              Latitude
            </label>
            <input
              type="number"
              id="latitude"
              name="latitude"
              value={location.latitude}
              onChange={handleLocationChange}
              step="any"
              className="form-input"
              placeholder="e.g., 40.7128"
            />
          </div>

          <div>
            <label htmlFor="longitude" className="form-label">
              Longitude
            </label>
            <input
              type="number"
              id="longitude"
              name="longitude"
              value={location.longitude}
              onChange={handleLocationChange}
              step="any"
              className="form-input"
              placeholder="e.g., -74.0060"
            />
          </div>

          <div className="flex items-end" style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button
              onClick={searchSchools}
              disabled={loading}
              className="btn btn-primary w-full"
              style={{ width: '100%' }}
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Searching...
                </>
              ) : (
                <>
                  <svg className="icon-sm" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                  </svg>
                  Find Schools
                </>
              )}
            </button>
          </div>
        </div>

        <div className="alert alert-info mt-4">
          <div className="flex items-start gap-3" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <svg className="icon" viewBox="0 0 24 24" fill="#1976d2" style={{ marginTop: '2px' }}>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            <div>
              <h3 className="text-sm font-medium" style={{ color: '#1976d2', marginBottom: '4px' }}>Location Tips</h3>
              <p className="text-sm" style={{ color: '#1976d2' }}>
                We've automatically detected your location. You can also manually enter coordinates 
                or use Google Maps to find specific coordinates.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      {searched && (
        <div className="card">
          <div className="p-6 border-b border-gray-200" style={{ padding: '24px', borderBottom: '1px solid #e5e5e5' }}>
            <h2 className="text-xl font-semibold">
              Schools Near You ({schools.length})
            </h2>
            <p className="text-gray-600 mt-1">
              Sorted by distance from your location
            </p>
          </div>

          {schools.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">No Schools Found</h3>
              <p className="text-gray-600">
                No schools were found near your location. Try adjusting your coordinates or add a new school.
              </p>
            </div>
          ) : (
            <div>
              {schools.map((school, index) => (
                <div key={school.id} className="school-item">
                  <div className="school-header">
                    <span className="school-rank">{index + 1}</span>
                    <h3 className="school-name">{school.name}</h3>
                    <span className="badge badge-success school-distance">
                      {formatDistance(school.distance)}
                    </span>
                  </div>
                  <p className="school-address">{school.address}</p>
                  <div className="school-details">
                    <span>Coordinates: {school.latitude}, {school.longitude}</span>
                    <span>•</span>
                    <span>ID: {school.id}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!searched && (
        <div className="card">
          <div className="empty-state">
            <div className="empty-state-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Ready to Find Schools?</h3>
            <p className="text-gray-600 mb-6">
              Enter your location coordinates above and click "Find Schools" to discover 
              educational institutions near you.
            </p>
            <button
              onClick={searchSchools}
              disabled={loading || !location.latitude || !location.longitude}
              className="btn btn-primary"
            >
              Find Schools
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolList; 