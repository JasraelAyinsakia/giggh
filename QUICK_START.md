# GigGH - Quick Start Guide

## 🚀 Getting Started

### 1. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Visit: `http://localhost:5173`

### 2. Backend Setup

```bash
# Activate virtual environment
source backend_env/bin/activate

# Navigate to backend folder
cd backend

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Run server
python manage.py runserver
```

Visit: `http://localhost:8000`

### 3. Connect Frontend to Backend

Update `frontend/.env` (create if doesn't exist):
```
VITE_API_URL=http://localhost:8000/api
```

## 📝 Initial Setup

### Create Sample Data

You can use Django admin or create a management command to populate initial performer data.

### Access Admin Panel

1. Create superuser: `python manage.py createsuperuser`
2. Visit: `http://localhost:8000/admin`
3. Login and add performers, categories, etc.

## 🔑 API Testing

### Register User
```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpass123",
    "password_confirm": "testpass123",
    "user_type": "customer"
  }'
```

### Login
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpass123"
  }'
```

### Get Performers
```bash
curl http://localhost:8000/api/performers/
```

## 🎯 Next Steps

1. **Populate Database**: Add performers through admin or API
2. **Test Frontend**: Browse performers, view profiles, submit bookings
3. **Configure Payments**: Set up Paystack/Flutterwave for Phase 3
4. **Deploy**: Prepare for production deployment

## 🐛 Troubleshooting

### CORS Issues
- Ensure `CORS_ALLOWED_ORIGINS` in `backend/settings.py` includes your frontend URL

### Database Issues
- Run `python manage.py makemigrations` then `python manage.py migrate`

### Frontend Not Loading
- Check if Vite dev server is running
- Verify `package.json` dependencies are installed

### Backend Not Starting
- Activate virtual environment: `source backend_env/bin/activate`
- Check if port 8000 is available
- Verify all dependencies: `pip install -r requirements.txt`

