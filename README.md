# GigGH - Entertainment Booking Platform

A modern web platform connecting event celebrants with talented entertainers in Ghana. Built with React (frontend) and Django REST Framework (backend).

## 🚀 Features

- **Browse Performers**: Search and filter musicians, dancers, and comedians
- **Detailed Profiles**: View performer profiles with videos, reviews, and ratings
- **Booking System**: Submit booking requests for events
- **Reviews & Ratings**: Rate and review performers after events
- **User Authentication**: Secure JWT-based authentication
- **Responsive Design**: Mobile-first design with Tailwind CSS

## 📁 Project Structure

```
GigGH/
├── frontend/          # React frontend application
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── services/
│   └── package.json
│
└── backend/           # Django backend API
    ├── accounts/      # User management
    ├── performers/    # Performer models/views
    ├── bookings/     # Booking models/views
    ├── reviews/      # Review models/views
    ├── notifications/# Email notifications
    ├── payments/     # Payment structure
    ├── config/       # Django settings
    └── manage.py     # Django management script
```

## 🛠️ Tech Stack

### Frontend
- React 19
- React Router v6
- Tailwind CSS
- Lucide React (icons)
- Axios (HTTP client)
- Context API (state management)

### Backend
- Django 4.2
- Django REST Framework
- PostgreSQL (SQLite for development)
- JWT Authentication
- Django CORS Headers

## 📦 Installation

### Prerequisites
- Node.js 18+
- Python 3.9+
- pip

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

### Backend Setup

```bash
# Create virtual environment (in project root)
python3 -m venv backend_env
source backend_env/bin/activate  # On Windows: backend_env\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Navigate to backend folder
cd backend

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run server
python manage.py runserver
```

Backend will run on `http://localhost:8000`

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register/` - Register new user
- `POST /api/auth/login/` - Login (get JWT tokens)
- `POST /api/auth/refresh/` - Refresh access token
- `GET /api/auth/me/` - Get current user

### Performers
- `GET /api/performers/` - List all performers (with filters)
- `GET /api/performers/:id/` - Get performer details
- `GET /api/performers/featured/` - Get featured performers
- `GET /api/performers/search/?q=query` - Search performers

### Bookings
- `GET /api/bookings/` - List bookings (filtered by user)
- `POST /api/bookings/` - Create booking
- `GET /api/bookings/:id/` - Get booking details
- `PUT /api/bookings/:id/` - Update booking
- `GET /api/bookings/my-bookings/` - Get user's bookings

### Reviews
- `GET /api/reviews/` - List reviews
- `GET /api/reviews/?performer_id=X` - Get reviews for performer
- `POST /api/reviews/` - Create review

## 🎨 Design

- **Primary Color**: Purple (#7C3AED)
- **Secondary Color**: Orange (#FF6B35)
- **Background**: White (#FFFFFF)
- **Text**: Dark Gray (#1F2937)

## 📝 Development

### Frontend Development
```bash
cd frontend
npm run dev
```

### Backend Development
```bash
source backend_env/bin/activate
python manage.py runserver
```

## 🗄️ Database

The project uses SQLite for development. For production, update `settings.py` to use PostgreSQL:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'giggh_db',
        'USER': 'your_user',
        'PASSWORD': 'your_password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

## 📄 License

This project is private and proprietary.

## 👥 Contributors

Built for connecting talented Ghanaian entertainers with event organizers.

