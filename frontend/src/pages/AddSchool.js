import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const AddSchool = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    latitude: '',
    longitude: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/addSchool', {
        name: formData.name.trim(),
        address: formData.address.trim(),
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude)
      });

      if (response.data.success) {
        toast.success('School added successfully!');
        setFormData({
          name: '',
          address: '',
          latitude: '',
          longitude: ''
        });
        navigate('/schools');
      }
    } catch (error) {
      console.error('Error adding school:', error);
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else if (error.response?.data?.errors) {
        const errorMessages = error.response.data.errors.map(err => err.msg).join(', ');
        toast.error(errorMessages);
      } else {
        toast.error('Failed to add school. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#666', textDecoration: 'none', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <svg className="icon-sm" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          Back
        </button>
      </div>

      <div className="card">
        <div className="flex items-center gap-3 mb-6" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <div className="flex items-center justify-center" style={{ width: '48px', height: '48px', backgroundColor: '#e3f2fd', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg className="icon-lg" viewBox="0 0 24 24" fill="#1976d2">
              <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Add New School</h1>
            <p className="text-gray-600">Enter the school details below</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              School Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter school name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address" className="form-label">
              Address *
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="3"
              className="form-input form-textarea"
              placeholder="Enter complete address"
            />
          </div>

          <div className="grid grid-2 gap-4">
            <div>
              <label htmlFor="latitude" className="form-label">
                Latitude *
              </label>
              <input
                type="number"
                id="latitude"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
                required
                step="any"
                min="-90"
                max="90"
                className="form-input"
                placeholder="e.g., 40.7128"
              />
              <p className="form-help">Range: -90 to 90</p>
            </div>

            <div>
              <label htmlFor="longitude" className="form-label">
                Longitude *
              </label>
              <input
                type="number"
                id="longitude"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
                required
                step="any"
                min="-180"
                max="180"
                className="form-input"
                placeholder="e.g., -74.0060"
              />
              <p className="form-help">Range: -180 to 180</p>
            </div>
          </div>

          <div className="alert alert-info">
            <div className="flex items-start gap-3" style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <svg className="icon" viewBox="0 0 24 24" fill="#1976d2" style={{ marginTop: '2px' }}>
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              <div>
                <h3 className="text-sm font-medium" style={{ color: '#1976d2', marginBottom: '4px' }}>Coordinate Help</h3>
                <p className="text-sm" style={{ color: '#1976d2' }}>
                  You can find coordinates using Google Maps. Right-click on a location and select 
                  "What's here?" to see the coordinates.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4" style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
            <button
              type="button"
              onClick={() => navigate('/schools')}
              className="btn btn-secondary"
              style={{ backgroundColor: 'white', color: '#1976d2', border: '1px solid #1976d2' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="icon-sm" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                  Add School
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSchool; 