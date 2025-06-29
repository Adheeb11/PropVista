PropVista 🏠
A modern, full-stack real estate platform built with Django REST API and React frontend. PropVista provides a comprehensive solution for property listings, user authentication, and property management with a beautiful, responsive UI.

🌟 Features
For Property Seekers
Browse Properties: Search and filter properties by type, location, and price
Property Categories: Buy, Rent, Commercial, PG/Co-living, Plots/Land, Luxury, Short Stay, New Projects
Detailed Property Pages: View comprehensive property information with images
Contact Owners: Direct messaging system to connect with property owners
User Dashboard: Manage saved properties and inquiries
For Property Owners
List Properties: Easy property listing with detailed information
Property Management: Dashboard to manage your listings
Contact Management: Track and respond to inquiries
Image Upload: Support for multiple property images
Platform Features
User Authentication: Secure registration and login system
Responsive Design: Mobile-first approach with Tailwind CSS
Modern UI/UX: Beautiful animations with Framer Motion
Search & Filters: Advanced search functionality
Real-time Updates: Dynamic content loading
🛠️ Tech Stack
Backend
Django 5.2+: Web framework
Django REST Framework: API development
MySQL: Database
Django CORS Headers: Cross-origin resource sharing
Python-dotenv: Environment variable management
Frontend
React 19.1: UI library
React Router DOM: Client-side routing
Tailwind CSS: Utility-first CSS framework
Framer Motion: Animation library
React Scripts: Build tools
📋 Prerequisites
Before running this project, make sure you have the following installed:

Python 3.8+
Node.js 16+
MySQL 8.0+
Git
🚀 Installation

1. Clone the Repository
   git clone <repository-url>
   cd PropVista
2. Backend Setup
   Navigate to backend directory
   cd backend
   Create and activate virtual environment

# Windows

python -m venv venv
venv\Scripts\activate

# macOS/Linux

python3 -m venv venv
source venv/bin/activate
Install Python dependencies
pip install -r requirements.txt
Set up environment variables
Create a .env file in the backend directory:

DJANGO_SECRET_KEY=your-secret-key-here
DJANGO_DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
MYSQL_DATABASE=estate_db
MYSQL_USER=root
MYSQL_PASSWORD=your-mysql-password
MYSQL_HOST=localhost
MYSQL_PORT=3306
Set up MySQL database
CREATE DATABASE estate_db;
Run Django migrations
python manage.py makemigrations
python manage.py migrate
Create superuser (optional)
python manage.py createsuperuser
Run the Django development server
python manage.py runserver
The backend API will be available at http://localhost:8000

3. Frontend Setup
   Navigate to frontend directory
   cd ../frontend
   Install Node.js dependencies
   npm install
   Start the React development server
   npm start
   The frontend application will be available at http://localhost:3000

📁 Project Structure
PropVista/
├── backend/ # Django backend
│ ├── core/ # Main Django app
│ │ ├── models.py # Database models
│ │ ├── views.py # API views
│ │ ├── serializers.py # DRF serializers
│ │ └── urls.py # URL routing
│ ├── estate/ # Django project settings
│ ├── manage.py # Django management script
│ └── requirements.txt # Python dependencies
├── frontend/ # React frontend
│ ├── src/
│ │ ├── components/ # Reusable React components
│ │ ├── pages/ # Page components
│ │ ├── services/ # API services
│ │ └── App.js # Main App component
│ ├── public/ # Static assets
│ └── package.json # Node.js dependencies
└── README.md # This file
🗄️ Database Models
User
Custom user model with email authentication
Name and email fields
Property
Title, price, city, type
Multiple property types (Buy, Rent, Commercial, etc.)
Many-to-many relationship with features
Owner relationship with User model
PropertyImage
URL field for property images
Foreign key relationship with Property
Feature
Name field for property features (e.g., "3 BHK", "Gym", "Parking")
ContactMessage
Contact form submissions
Name, email, message fields
Related to specific properties
🔧 API Endpoints
Authentication
POST /api/auth/register/ - User registration
POST /api/auth/login/ - User login
POST /api/auth/logout/ - User logout
Properties
GET /api/properties/ - List all properties
POST /api/properties/ - Create new property
GET /api/properties/{id}/ - Get property details
PUT /api/properties/{id}/ - Update property
DELETE /api/properties/{id}/ - Delete property
Contact Messages
POST /api/contact/ - Submit contact message
GET /api/contact/ - List contact messages (authenticated)
🎨 Frontend Pages
Home (/) - Landing page with featured properties and search
Listings (/listings) - Property search and filtering
Property Detail (/property/:id) - Individual property page
Add Property (/add-property) - Property listing form
Dashboard (/dashboard) - User dashboard
Login (/login) - User authentication
Register (/register) - User registration
🚀 Deployment
Backend Deployment
Set DEBUG=False in production
Configure production database
Set up static file serving
Use environment variables for sensitive data
Frontend Deployment
Build the production version: npm run build
Deploy the build folder to your hosting service
Configure API base URL for production
🤝 Contributing
Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request
📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

👥 Authors
Mohamed Adheeb P T - Initial work - YourGitHub
🙏 Acknowledgments
Django and React communities
Tailwind CSS for the beautiful UI framework
Framer Motion for smooth animations
Unsplash for sample images
📞 Support
If you have any questions or need help, please open an issue in the GitHub repository.

PropVista - Making real estate simple and accessible! 🏠✨
