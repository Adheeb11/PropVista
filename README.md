# PropVista 🏠

A modern, full-stack real estate platform built with Django REST API and React frontend. PropVista provides a comprehensive solution for property listings, user authentication, and property management with a beautiful, responsive UI and interactive maps.

## 🌟 Features

### For Property Seekers

- **Browse Properties**: Search and filter properties by type, location, and price
- **Interactive Maps**: View property locations on Google Maps with detailed markers
- **Property Categories**: Buy, Rent, Commercial, PG/Co-living, Plots/Land, Luxury, Short Stay, New Projects
- **Detailed Property Pages**: View comprehensive property information with images and location maps
- **Contact Owners**: Direct messaging system to connect with property owners
- **User Dashboard**: Manage saved properties and inquiries

### For Property Owners

- **List Properties**: Easy property listing with detailed information and map-based location selection
- **Interactive Map Picker**: Click on maps to set exact property locations with address auto-completion
- **Property Management**: Dashboard to manage your listings
- **Contact Management**: Track and respond to inquiries
- **Image Upload**: Support for multiple property images

### Platform Features

- **User Authentication**: Secure registration and login system
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI/UX**: Beautiful animations with Framer Motion
- **Google Maps Integration**: Interactive maps for property locations and search
- **Search & Filters**: Advanced search functionality with location-based filtering
- **Real-time Updates**: Dynamic content loading

## 🛠️ Tech Stack

### Backend

- **Django 5.2+**: Web framework
- **Django REST Framework**: API development
- **MySQL**: Database
- **Django CORS Headers**: Cross-origin resource sharing
- **Python-dotenv**: Environment variable management

### Frontend

- **React 19.1**: UI library
- **React Router DOM**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Google Maps API**: Interactive maps and geocoding
- **React Scripts**: Build tools

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- **Python 3.8+**
- **Node.js 16+**
- **MySQL 8.0+**
- **Git**
- **Google Maps API Key** (for maps functionality)

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd PropVista
```

### 2. Backend Setup

#### Navigate to backend directory

```bash
cd backend
```

#### Create and activate virtual environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

#### Install Python dependencies

```bash
pip install -r requirements.txt
```

#### Set up environment variables

Create a `.env` file in the `backend` directory:

```env
DJANGO_SECRET_KEY=your-secret-key-here
DJANGO_DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
MYSQL_DATABASE=estate_db
MYSQL_USER=root
MYSQL_PASSWORD=your-mysql-password
MYSQL_HOST=localhost
MYSQL_PORT=3306
```

#### Set up MySQL database

```sql
CREATE DATABASE estate_db;
```

#### Run Django migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

#### Create superuser (optional)

```bash
python manage.py createsuperuser
```

#### Run the Django development server

```bash
python manage.py runserver
```

The backend API will be available at `http://localhost:8000`

### 3. Frontend Setup

#### Navigate to frontend directory

```bash
cd ../frontend
```

#### Install Node.js dependencies

```bash
npm install
```

#### Set up Google Maps API (Required for maps functionality)

1. Get a Google Maps API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the following APIs:
   - Maps JavaScript API
   - Geocoding API
   - Places API
3. Create a `.env` file in the `frontend` directory:

```env
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

For detailed setup instructions, see [MAPS_SETUP.md](frontend/MAPS_SETUP.md)

#### Start the React development server

```bash
npm start
```

The frontend application will be available at `http://localhost:3000`

## 📁 Project Structure

```
PropVista/
├── backend/                 # Django backend
│   ├── core/               # Main Django app
│   │   ├── models.py       # Database models (includes location fields)
│   │   ├── views.py        # API views
│   │   ├── serializers.py  # DRF serializers
│   │   └── urls.py         # URL routing
│   ├── estate/             # Django project settings
│   ├── manage.py           # Django management script
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   │   ├── PropertyMap.js    # Property location display
│   │   │   └── MapPicker.js      # Interactive map picker
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── App.js          # Main App component
│   ├── public/             # Static assets
│   ├── MAPS_SETUP.md       # Google Maps setup guide
│   └── package.json        # Node.js dependencies
└── README.md              # This file
```

## 🗄️ Database Models

### User

- Custom user model with email authentication
- Name and email fields

### Property

- Title, price, city, type
- **Location fields**: address, area, latitude, longitude
- Multiple property types (Buy, Rent, Commercial, etc.)
- Many-to-many relationship with features
- Owner relationship with User model
- Computed properties: `full_address`, `has_location`

### PropertyImage

- URL field for property images
- Foreign key relationship with Property

### Feature

- Name field for property features (e.g., "3 BHK", "Gym", "Parking")

### ContactMessage

- Contact form submissions
- Name, email, message fields
- Related to specific properties

## 🔧 API Endpoints

### Authentication

- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout

### Properties

- `GET /api/properties/` - List all properties
- `POST /api/properties/` - Create new property (includes location data)
- `GET /api/properties/{id}/` - Get property details
- `PUT /api/properties/{id}/` - Update property
- `DELETE /api/properties/{id}/` - Delete property

### Contact Messages

- `POST /api/contact/` - Submit contact message
- `GET /api/contact/` - List contact messages (authenticated)

## 🎨 Frontend Pages

- **Home** (`/`) - Landing page with featured properties and search
- **Listings** (`/listings`) - Property search and filtering
- **Property Detail** (`/property/:id`) - Individual property page with interactive map
- **Add Property** (`/add-property`) - Property listing form with map picker
- **Dashboard** (`/dashboard`) - User dashboard
- **Login** (`/login`) - User authentication
- **Register** (`/register`) - User registration

## 🗺️ Maps Features

### Property Location Display

- Interactive Google Maps showing property locations
- Custom markers with property information
- Clickable markers with info windows
- Responsive design for mobile and desktop

### Map Picker for Property Creation

- Interactive map for selecting property locations
- Address auto-completion and reverse geocoding
- Current location detection
- Search functionality for specific addresses
- Drag and drop marker positioning

### Location Data

- Latitude and longitude coordinates
- Full address with street, area, and city
- Area/locality information
- Automatic address parsing from coordinates

## 🚀 Deployment

### Backend Deployment

1. Set `DEBUG=False` in production
2. Configure production database
3. Set up static file serving
4. Use environment variables for sensitive data

### Frontend Deployment

1. Build the production version: `npm run build`
2. Deploy the `build` folder to your hosting service
3. Configure API base URL for production
4. Set up Google Maps API key for production domain

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Your Name** - _Initial work_ - [YourGitHub](https://github.com/yourusername)

## 🙏 Acknowledgments

- Django and React communities
- Tailwind CSS for the beautiful UI framework
- Framer Motion for smooth animations
- Google Maps API for interactive mapping
- Unsplash for sample images

## 📞 Support

If you have any questions or need help, please open an issue in the GitHub repository.

---

**PropVista** - Making real estate simple and accessible! 🏠✨
