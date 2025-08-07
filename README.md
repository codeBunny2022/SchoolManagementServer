# School Management System

A complete Node.js and React application for managing schools with proximity-based sorting functionality.

## 🌟 Features

### Backend (Node.js + Express)
- **Add School API**: Add new schools with name, address, and coordinates
- **List Schools API**: Retrieve schools sorted by proximity to user location
- **Data Validation**: Comprehensive input validation for all endpoints
- **Geographic Distance Calculation**: Uses Haversine formula for accurate distance calculation
- **MySQL Database**: Persistent data storage with proper indexing

### Frontend (React + Tailwind CSS)
- **Modern UI**: Beautiful, responsive design with Tailwind CSS
- **Real-time Search**: Find schools by location with automatic geolocation
- **Add Schools**: User-friendly form to add new schools
- **Proximity Sorting**: Schools displayed in order of distance from user
- **Toast Notifications**: Real-time feedback for user actions

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SchoolManagementServer
   ```

2. **Install dependencies**
   ```bash
   npm run setup
   ```

3. **Set up database**
   ```bash
   chmod +x setup_database.sh
   ./setup_database.sh
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

The application will be available at:
- **Frontend**: http://localhost:3000
- **API Health**: http://localhost:3000/health
- **API Docs**: http://localhost:3000/api

## 🌐 Deployment Options

### Option 1: Render.com (Recommended)
1. **Sign up** at [render.com](https://render.com)
2. **Connect your GitHub repository**
3. **Create a new Web Service**
4. **Configure:**
   - Build Command: `npm install && cd frontend && npm install && npm run build`
   - Start Command: `node server.js`
   - Environment Variables: Add your database credentials
5. **Deploy automatically**

### Option 2: Railway.app
1. **Sign up** at [railway.app](https://railway.app)
2. **Connect GitHub repository**
3. **Deploy automatically**
4. **Add environment variables** for database

### Option 3: Heroku
1. **Install Heroku CLI**
2. **Create Heroku app:**
   ```bash
   heroku create your-app-name
   ```
3. **Add buildpacks:**
   ```bash
   heroku buildpacks:add heroku/nodejs
   ```
4. **Set environment variables**
5. **Deploy:**
   ```bash
   git push heroku main
   ```

### Option 4: Replit
1. **Fork this repository** to your Replit account
2. **Click "Run"** - the deployment script will automatically:
   - Install all dependencies
   - Build the React frontend
   - Set up the database
   - Start the server

### Manual Deployment (Any Platform)
If automatic deployment doesn't work:

1. **Install dependencies**
   ```bash
   npm install
   cd frontend && npm install && cd ..
   ```

2. **Build frontend**
   ```bash
   cd frontend && npm run build && cd ..
   ```

3. **Set up database**
   ```bash
   chmod +x setup_database.sh
   ./setup_database.sh
   ```

4. **Start the server**
   ```bash
   npm start
   ```

## 📱 Frontend Features

### Home Page
- Welcome message and feature overview
- Quick access buttons to add schools or find schools
- API documentation section

### Add School Page
- Form to add new schools with validation
- Coordinate input with helpful tips
- Real-time feedback with toast notifications
- Automatic navigation after successful submission

### Find Schools Page
- Automatic geolocation detection
- Manual coordinate input
- Real-time search with loading states
- Distance calculation and sorting
- Beautiful school cards with distance badges

## 🔧 API Endpoints

### 1. Add School
**POST** `/addSchool`

**Request Body:**
```json
{
  "name": "Example School",
  "address": "123 Main Street, City, State 12345",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

### 2. List Schools
**GET** `/listSchools?latitude=40.7128&longitude=-74.0060`

**Query Parameters:**
- `latitude` (required): User's latitude (-90 to 90)
- `longitude` (required): User's longitude (-180 to 180)

### 3. Health Check
**GET** `/health`

## 🗄️ Database Schema

```sql
CREATE TABLE schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address VARCHAR(500) NOT NULL,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🛠️ Technology Stack

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **MySQL**: Database
- **Express Validator**: Input validation
- **CORS**: Cross-origin resource sharing

### Frontend
- **React**: UI library
- **React Router**: Client-side routing
- **Tailwind CSS**: Styling framework
- **Axios**: HTTP client
- **React Hot Toast**: Notifications
- **Lucide React**: Icons

## 📁 Project Structure

```
SchoolManagementServer/
├── server.js                 # Main Express server
├── package.json              # Backend dependencies
├── .env                      # Environment variables
├── setup_database.sh         # Database setup script
├── deploy.sh                 # Deployment script
├── .replit                   # Replit configuration
├── replit.nix               # Replit dependencies
├── frontend/                 # React frontend
│   ├── public/              # Static files
│   ├── src/                 # React source code
│   │   ├── components/      # React components
│   │   ├── pages/          # Page components
│   │   └── App.js          # Main app component
│   ├── package.json         # Frontend dependencies
│   └── tailwind.config.js   # Tailwind configuration
├── README.md                # Documentation
├── database_setup.sql       # Database setup
└── postman_collection.json  # API testing collection
```

## 🎯 Key Features

### Geographic Distance Calculation
- Uses Haversine formula for accurate Earth-surface distances
- Handles edge cases and coordinate validation
- Provides distance in both kilometers and meters

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Beautiful UI with smooth animations
- Accessible design with proper contrast

### Error Handling
- Comprehensive validation on both frontend and backend
- User-friendly error messages
- Graceful fallbacks for network issues

### Performance
- Optimized database queries with proper indexing
- Efficient distance calculations
- Fast React rendering with proper state management

## 🚀 Deployment URLs

After deployment on Replit:
- **Main Application**: `https://your-repl-name.your-username.repl.co`
- **API Health Check**: `https://your-repl-name.your-username.repl.co/health`
- **API Documentation**: `https://your-repl-name.your-username.repl.co/api`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License. 