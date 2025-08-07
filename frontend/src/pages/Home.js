import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      {/* Hero Section */}
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to School Management System
        </h1>
        <p className="text-xl text-gray-600 mb-8" style={{ maxWidth: '800px', margin: '0 auto 32px' }}>
          Find schools near you, add new schools to our database, and discover educational institutions 
          sorted by proximity to your location.
        </p>
        <div className="flex flex-col items-center gap-4" style={{ flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <Link
            to="/add-school"
            className="btn btn-primary"
          >
            <svg className="icon-sm" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </svg>
            Add New School
          </Link>
          <Link
            to="/schools"
            className="btn btn-secondary"
          >
            <svg className="icon-sm" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
            Find Schools
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="grid grid-3 py-12">
        <div className="card">
          <div className="flex items-center justify-center" style={{ width: '48px', height: '48px', backgroundColor: '#e3f2fd', borderRadius: '8px', marginBottom: '16px' }}>
            <svg className="icon-lg" viewBox="0 0 24 24" fill="#1976d2">
              <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Add Schools</h3>
          <p className="text-gray-600">
            Easily add new schools to our database with complete information including 
            name, address, and precise coordinates.
          </p>
        </div>

        <div className="card">
          <div className="flex items-center justify-center" style={{ width: '48px', height: '48px', backgroundColor: '#e3f2fd', borderRadius: '8px', marginBottom: '16px' }}>
            <svg className="icon-lg" viewBox="0 0 24 24" fill="#1976d2">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Find by Location</h3>
          <p className="text-gray-600">
            Search for schools near your location. Our system automatically sorts schools 
            by proximity to help you find the closest options.
          </p>
        </div>

        <div className="card">
          <div className="flex items-center justify-center" style={{ width: '48px', height: '48px', backgroundColor: '#e3f2fd', borderRadius: '8px', marginBottom: '16px' }}>
            <svg className="icon-lg" viewBox="0 0 24 24" fill="#1976d2">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">Accurate Results</h3>
          <p className="text-gray-600">
            Get precise distance calculations using advanced geographic algorithms 
            to ensure accurate proximity-based results.
          </p>
        </div>
      </div>

      {/* API Information */}
      <div className="card mt-8">
        <h2 className="text-2xl font-bold mb-4">API Endpoints</h2>
        <div className="grid grid-2 gap-4">
          <div style={{ borderLeft: '4px solid #1976d2', paddingLeft: '16px' }}>
            <h3 className="font-semibold">Add School</h3>
            <p className="text-sm text-gray-600">POST /addSchool</p>
            <p className="text-xs text-gray-500 mt-1">
              Add a new school with name, address, latitude, and longitude
            </p>
          </div>
          <div style={{ borderLeft: '4px solid #1976d2', paddingLeft: '16px' }}>
            <h3 className="font-semibold">List Schools</h3>
            <p className="text-sm text-gray-600">GET /listSchools</p>
            <p className="text-xs text-gray-500 mt-1">
              Get schools sorted by proximity to specified coordinates
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 