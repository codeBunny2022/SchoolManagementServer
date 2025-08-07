const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { body, validationResult } = require('express-validator');
const mysql = require('mysql2/promise');
const path = require('path');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Database configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'school_management',
  port: process.env.DB_PORT || 3306
};

// Create database connection pool
let pool;

async function initializeDatabase() {
  try {
    pool = mysql.createPool(dbConfig);
    
    // Test connection
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release();
    
    // Create schools table if it doesn't exist
    await createSchoolsTable();
  } catch (error) {
    console.error('Database connection failed:', error);
    // Don't exit in production, just log the error
    if (process.env.NODE_ENV === 'production') {
      console.log('Running without database in production mode');
    } else {
      console.log('Database connection failed, but continuing...');
    }
  }
}

async function createSchoolsTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(500) NOT NULL,
      latitude FLOAT NOT NULL,
      longitude FLOAT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `;
  
  try {
    await pool.execute(createTableQuery);
    console.log('Schools table created/verified successfully');
    
    // Add sample data if table is empty
    const [rows] = await pool.execute('SELECT COUNT(*) as count FROM schools');
    if (rows[0].count === 0) {
      await addSampleData();
    }
  } catch (error) {
    console.error('Error creating schools table:', error);
  }
}

async function addSampleData() {
  const sampleSchools = [
    ['Central High School', '123 Education Street, Downtown, NY 10001', 40.7128, -74.0060],
    ['Lincoln Elementary', '456 Learning Avenue, Midtown, NY 10016', 40.7505, -73.9934],
    ['Washington Middle School', '789 Knowledge Road, Uptown, NY 10025', 40.7910, -73.9641],
    ['Jefferson Academy', '321 Wisdom Way, Brooklyn, NY 11201', 40.7021, -73.9872],
    ['Roosevelt High School', '654 Success Street, Queens, NY 11101', 40.7505, -73.9365],
    ['Madison Elementary', '987 Growth Avenue, Bronx, NY 10451', 40.8448, -73.8648],
    ['Adams Middle School', '147 Progress Road, Staten Island, NY 10301', 40.5795, -74.1502],
    ['Monroe Academy', '258 Achievement Way, Long Island, NY 11501', 40.7128, -73.2109],
    ['Jackson High School', '369 Excellence Street, Westchester, NY 10501', 40.9142, -73.7626],
    ['Van Buren Elementary', '741 Innovation Avenue, New Jersey, NJ 07001', 40.7357, -74.1724]
  ];

  const insertQuery = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
  
  try {
    for (const school of sampleSchools) {
      await pool.execute(insertQuery, school);
    }
    console.log('Sample schools added successfully');
  } catch (error) {
    console.error('Error adding sample data:', error);
  }
}

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in kilometers
}

// Validation middleware for addSchool
const validateAddSchool = [
  body('name').trim().notEmpty().withMessage('School name is required'),
  body('address').trim().notEmpty().withMessage('Address is required'),
  body('latitude').isFloat({ min: -90, max: 90 }).withMessage('Latitude must be between -90 and 90'),
  body('longitude').isFloat({ min: -180, max: 180 }).withMessage('Longitude must be between -180 and 180')
];

// API Routes

// Add School API
app.post('/addSchool', validateAddSchool, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { name, address, latitude, longitude } = req.body;

    // Insert new school
    const insertQuery = `
      INSERT INTO schools (name, address, latitude, longitude) 
      VALUES (?, ?, ?, ?)
    `;
    
    const [result] = await pool.execute(insertQuery, [name, address, latitude, longitude]);
    
    res.status(201).json({
      success: true,
      message: 'School added successfully',
      data: {
        id: result.insertId,
        name,
        address,
        latitude,
        longitude
      }
    });
  } catch (error) {
    console.error('Error adding school:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// List Schools API
app.get('/listSchools', async (req, res) => {
  try {
    const { latitude, longitude } = req.query;
    
    // Validate coordinates
    if (!latitude || !longitude) {
      return res.status(400).json({
        success: false,
        message: 'Latitude and longitude are required query parameters'
      });
    }
    
    const userLat = parseFloat(latitude);
    const userLon = parseFloat(longitude);
    
    if (isNaN(userLat) || isNaN(userLon)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid latitude or longitude values'
      });
    }
    
    if (userLat < -90 || userLat > 90 || userLon < -180 || userLon > 180) {
      return res.status(400).json({
        success: false,
        message: 'Latitude must be between -90 and 90, longitude must be between -180 and 180'
      });
    }

    // Fetch all schools
    const [schools] = await pool.execute('SELECT * FROM schools ORDER BY created_at DESC');
    
    // Calculate distances and sort by proximity
    const schoolsWithDistance = schools.map(school => ({
      ...school,
      distance: calculateDistance(userLat, userLon, school.latitude, school.longitude)
    }));
    
    // Sort by distance (closest first)
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);
    
    res.json({
      success: true,
      message: 'Schools retrieved successfully',
      data: {
        userLocation: { latitude: userLat, longitude: userLon },
        schools: schoolsWithDistance,
        totalSchools: schoolsWithDistance.length
      }
    });
  } catch (error) {
    console.error('Error listing schools:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'School Management API is running',
    timestamp: new Date().toISOString()
  });
});

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'School Management API',
    version: '1.0.0',
    endpoints: {
      'POST /addSchool': 'Add a new school',
      'GET /listSchools': 'Get schools sorted by proximity',
      'GET /health': 'Health check'
    }
  });
});

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Start server
async function startServer() {
  await initializeDatabase();
  
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
    console.log(`📚 API documentation: http://localhost:${PORT}/api`);
    console.log(`🌐 Frontend: http://localhost:${PORT}/`);
  });
}

startServer().catch(console.error); 