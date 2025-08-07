-- School Management Database Setup
-- Run this script in your MySQL database

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS school_management;
USE school_management;

-- Create schools table
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add some sample schools for testing
INSERT INTO schools (name, address, latitude, longitude) VALUES
('Central High School', '123 Education Street, Downtown, NY 10001', 40.7128, -74.0060),
('Lincoln Elementary', '456 Learning Avenue, Midtown, NY 10016', 40.7505, -73.9934),
('Washington Middle School', '789 Knowledge Road, Uptown, NY 10025', 40.7910, -73.9641),
('Jefferson Academy', '321 Wisdom Way, Brooklyn, NY 11201', 40.7021, -73.9872),
('Roosevelt High School', '654 Success Street, Queens, NY 11101', 40.7505, -73.9365),
('Madison Elementary', '987 Growth Avenue, Bronx, NY 10451', 40.8448, -73.8648),
('Adams Middle School', '147 Progress Road, Staten Island, NY 10301', 40.5795, -74.1502),
('Monroe Academy', '258 Achievement Way, Long Island, NY 11501', 40.7128, -73.2109),
('Jackson High School', '369 Excellence Street, Westchester, NY 10501', 40.9142, -73.7626),
('Van Buren Elementary', '741 Innovation Avenue, New Jersey, NJ 07001', 40.7357, -74.1724);

-- Create index for better performance on location-based queries
CREATE INDEX idx_location ON schools(latitude, longitude);
CREATE INDEX idx_created_at ON schools(created_at);

-- Verify the data
SELECT * FROM schools ORDER BY created_at DESC; 