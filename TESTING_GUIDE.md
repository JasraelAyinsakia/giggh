# GigGH Testing Guide

Complete testing guide for the GigGH entertainment booking platform.

## 📋 Table of Contents

1. [Testing Overview](#testing-overview)
2. [Frontend Testing](#frontend-testing)
3. [Backend Testing](#backend-testing)
4. [API Testing](#api-testing)
5. [Integration Testing](#integration-testing)
6. [Manual Testing Scenarios](#manual-testing-scenarios)
7. [Test Data Setup](#test-data-setup)
8. [Performance Testing](#performance-testing)
9. [Security Testing](#security-testing)

---

## 🎯 Testing Overview

### Testing Stack
- **Frontend**: React Testing Library, Jest, Vitest
- **Backend**: Django TestCase, pytest-django
- **API**: Postman, Thunder Client, curl
- **E2E**: Playwright, Cypress (optional)

### Test Coverage Goals
- Unit Tests: 70%+
- Integration Tests: 50%+
- API Tests: 90%+
- E2E Tests: Critical paths only

---

## 🎨 Frontend Testing

### Setup

```bash
cd frontend
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest jsdom
```

### Test File Structure

```
frontend/src/
├── components/
│   ├── Navbar.test.jsx
│   ├── PerformerCard.test.jsx
│   └── SearchBar.test.jsx
├── pages/
│   ├── Home.test.jsx
│   ├── Browse.test.jsx
│   └── PerformerProfile.test.jsx
└── services/
    └── api.test.js
```

### Example Component Test

```javascript
// frontend/src/components/PerformerCard.test.jsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PerformerCard from './PerformerCard';

const mockPerformer = {
  id: 1,
  name: 'Kwame Asante',
  category: 'Musicians',
  subCategory: 'Keyboardist',
  priceTier: 'Standard',
  exactPrice: 1500,
  rating: 4.8,
  reviewCount: 24,
  yearsExperience: 8,
  location: 'East Legon',
  profilePhoto: 'https://example.com/photo.jpg',
};

describe('PerformerCard', () => {
  it('renders performer information correctly', () => {
    render(
      <BrowserRouter>
        <PerformerCard performer={mockPerformer} />
      </BrowserRouter>
    );

    expect(screen.getByText('Kwame Asante')).toBeInTheDocument();
    expect(screen.getByText('Musicians • Keyboardist')).toBeInTheDocument();
    expect(screen.getByText('GH₵1,500')).toBeInTheDocument();
    expect(screen.getByText('4.8')).toBeInTheDocument();
  });

  it('displays correct price tier badge', () => {
    render(
      <BrowserRouter>
        <PerformerCard performer={mockPerformer} />
      </BrowserRouter>
    );

    expect(screen.getByText('Standard')).toBeInTheDocument();
  });

  it('links to performer profile page', () => {
    render(
      <BrowserRouter>
        <PerformerCard performer={mockPerformer} />
      </BrowserRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/performer/1');
  });
});
```

### Running Frontend Tests

```bash
cd frontend
npm test                    # Run all tests
npm test -- --watch        # Watch mode
npm test -- --coverage     # With coverage
npm test -- PerformerCard  # Run specific test
```

### Key Frontend Test Cases

#### Navigation Tests
- ✅ Navbar renders all links
- ✅ Active link is highlighted
- ✅ Mobile menu toggles correctly
- ✅ Logo links to home page

#### Browse Page Tests
- ✅ Filter sidebar shows all options
- ✅ Filters update results correctly
- ✅ Search bar filters performers
- ✅ Sort options work
- ✅ Grid/List view toggle works
- ✅ Empty state shows when no results

#### Performer Profile Tests
- ✅ All performer details display
- ✅ Videos embed correctly
- ✅ Reviews display properly
- ✅ Book Now button opens modal
- ✅ Back button navigates correctly

#### Booking Form Tests
- ✅ All required fields validate
- ✅ Email format validation
- ✅ Date must be in future
- ✅ Form submission works
- ✅ Success message displays

---

## 🔧 Backend Testing

### Setup

```bash
cd backend
pip install pytest pytest-django pytest-cov
```

### Test File Structure

```
backend/
├── accounts/
│   ├── tests/
│   │   ├── test_models.py
│   │   ├── test_views.py
│   │   └── test_serializers.py
├── performers/
│   └── tests/
│       ├── test_models.py
│       └── test_views.py
└── bookings/
    └── tests/
        └── test_views.py
```

### Example Model Test

```python
# backend/accounts/tests/test_models.py
from django.test import TestCase
from django.contrib.auth import get_user_model

User = get_user_model()

class UserModelTest(TestCase):
    def test_create_user(self):
        user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123',
            user_type='customer'
        )
        self.assertEqual(user.username, 'testuser')
        self.assertEqual(user.user_type, 'customer')
        self.assertTrue(user.check_password('testpass123'))

    def test_create_performer_user(self):
        user = User.objects.create_user(
            username='performer',
            email='performer@example.com',
            password='testpass123',
            user_type='performer'
        )
        self.assertEqual(user.user_type, 'performer')
```

### Example View Test

```python
# backend/performers/tests/test_views.py
from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from performers.models import Performer, Category

User = get_user_model()

class PerformerViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        
        self.performer = Performer.objects.create(
            user=self.user,
            name='Test Performer',
            bio='Test bio',
            category='Musicians',
            sub_category='Keyboardist',
            price_tier='Standard',
            exact_price=1500.00,
            years_experience=5,
            location='East Legon'
        )

    def test_list_performers(self):
        response = self.client.get('/api/performers/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_get_performer_detail(self):
        response = self.client.get(f'/api/performers/{self.performer.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Test Performer')

    def test_create_performer_requires_auth(self):
        response = self.client.post('/api/performers/', {
            'name': 'New Performer',
            'bio': 'Bio',
            'category': 'Musicians',
            'sub_category': 'DJ',
            'price_tier': 'Basic',
            'exact_price': 500,
            'years_experience': 2,
            'location': 'Osu'
        })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
```

### Running Backend Tests

```bash
cd backend
python manage.py test                    # Run all tests
python manage.py test accounts          # Run specific app tests
python manage.py test accounts.tests    # Run specific test file
pytest                                   # Using pytest
pytest --cov=. --cov-report=html        # With coverage
```

### Key Backend Test Cases

#### User Authentication
- ✅ User registration works
- ✅ Login returns JWT token
- ✅ Protected endpoints require authentication
- ✅ Token refresh works
- ✅ User type (customer/performer) is set correctly

#### Performer CRUD
- ✅ List all performers
- ✅ Get performer detail
- ✅ Create performer (authenticated)
- ✅ Update performer (owner only)
- ✅ Delete performer (admin only)
- ✅ Filter by category, location, price
- ✅ Search performers

#### Booking Management
- ✅ Create booking request
- ✅ List user's bookings
- ✅ Update booking status
- ✅ Cancel booking
- ✅ Booking validation (future dates only)

#### Reviews
- ✅ Create review (after booking)
- ✅ List performer reviews
- ✅ Update review (owner only)
- ✅ Rating calculation updates

---

## 🌐 API Testing

### Using Postman/Thunder Client

#### Authentication Endpoints

**1. Register User**
```
POST /api/auth/register/
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "testpass123",
  "password_confirm": "testpass123",
  "first_name": "Test",
  "last_name": "User",
  "phone": "+233123456789",
  "user_type": "customer"
}
```

**2. Login**
```
POST /api/auth/login/
Content-Type: application/json

{
  "username": "testuser",
  "password": "testpass123"
}

Response:
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**3. Get Current User**
```
GET /api/auth/me/
Authorization: Bearer {access_token}
```

#### Performer Endpoints

**1. List All Performers**
```
GET /api/performers/
Query Params:
  - category: Musicians|Dancers|Comedians
  - location: East Legon|Osu|etc
  - price_tier: Basic|Standard|Premium
  - rating: 4.5 (minimum)
  - search: keyword
```

**2. Get Performer Detail**
```
GET /api/performers/{id}/
```

**3. Create Performer (Authenticated)**
```
POST /api/performers/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "name": "New Performer",
  "bio": "Talented musician...",
  "category": "Musicians",
  "sub_category": "DJ",
  "price_tier": "Standard",
  "exact_price": 1500.00,
  "years_experience": 5,
  "location": "East Legon",
  "areas_served": ["East Legon", "Osu"],
  "video_urls": ["https://youtube.com/embed/..."],
  "skills": ["Afrobeat", "Hip-hop"]
}
```

#### Booking Endpoints

**1. Create Booking**
```
POST /api/bookings/
Authorization: Bearer {access_token}
Content-Type: application/json

{
  "performer_id": 1,
  "event_type": "Wedding",
  "event_date": "2025-06-15",
  "event_location": "East Legon, Accra",
  "event_duration": 4,
  "budget": "Standard",
  "additional_details": "Outdoor event, need sound system"
}
```

**2. Get My Bookings**
```
GET /api/bookings/my-bookings/
Authorization: Bearer {access_token}
```

### Using curl

```bash
# Register
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpass123",
    "password_confirm": "testpass123",
    "user_type": "customer"
  }'

# Login
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpass123"
  }'

# Get Performers (with token)
curl -X GET http://localhost:8000/api/performers/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"

# Create Booking
curl -X POST http://localhost:8000/api/bookings/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "performer_id": 1,
    "event_type": "Wedding",
    "event_date": "2025-06-15",
    "event_location": "East Legon"
  }'
```

---

## 🔗 Integration Testing

### Frontend-Backend Integration

```javascript
// frontend/src/services/api.test.js
import { performersAPI, authAPI } from './api';

describe('API Integration', () => {
  let accessToken;

  beforeAll(async () => {
    // Login to get token
    const response = await authAPI.login({
      username: 'testuser',
      password: 'testpass123'
    });
    accessToken = response.data.access;
  });

  it('fetches performers from backend', async () => {
    const response = await performersAPI.getAll();
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

  it('creates booking successfully', async () => {
    const booking = {
      performer_id: 1,
      event_type: 'Wedding',
      event_date: '2025-06-15',
      event_location: 'East Legon'
    };
    const response = await bookingsAPI.create(booking);
    expect(response.status).toBe(201);
  });
});
```

---

## 👤 Manual Testing Scenarios

### User Registration Flow

1. **Customer Registration**
   - [ ] Navigate to `/signup`
   - [ ] Select "I'm a Customer"
   - [ ] Fill all required fields
   - [ ] Submit form
   - [ ] Verify redirect to login
   - [ ] Login with new credentials
   - [ ] Verify access to customer dashboard

2. **Performer Registration**
   - [ ] Navigate to `/signup`
   - [ ] Select "I'm a Performer"
   - [ ] Complete Step 1: Account creation
   - [ ] Complete Step 2: Profile creation
   - [ ] Verify redirect to performer dashboard
   - [ ] Verify profile appears in browse page

### Browse & Search Flow

1. **Browse Performers**
   - [ ] Navigate to `/browse`
   - [ ] Verify all 12 performers display
   - [ ] Test category filter (Musicians, Dancers, Comedians)
   - [ ] Test sub-category filter
   - [ ] Test price tier filter
   - [ ] Test location filter
   - [ ] Test rating filter
   - [ ] Test search bar
   - [ ] Test sort options
   - [ ] Toggle grid/list view
   - [ ] Click performer card → verify profile page

2. **Search Functionality**
   - [ ] Type in search bar
   - [ ] Verify autocomplete dropdown
   - [ ] Select from dropdown → verify navigation
   - [ ] Search by name
   - [ ] Search by category
   - [ ] Search by sub-category
   - [ ] Clear search

### Performer Profile Flow

1. **View Profile**
   - [ ] Navigate to `/performer/1`
   - [ ] Verify all details display:
     - [ ] Name, category, sub-category
     - [ ] Price tier badge + exact price
     - [ ] Star rating + review count
     - [ ] Years of experience
     - [ ] Location
     - [ ] Bio/description
     - [ ] Embedded videos (2-3)
     - [ ] Skills tags
     - [ ] Reviews section
   - [ ] Click video → verify modal opens
   - [ ] Click "Book Now" → verify modal opens

2. **Booking Flow**
   - [ ] Click "Book Now" on profile
   - [ ] Fill booking form:
     - [ ] Customer name (required)
     - [ ] Phone number (required)
     - [ ] Email (required, validate format)
     - [ ] Event type (required)
     - [ ] Event date (required, future only)
     - [ ] Event location (required)
     - [ ] Event duration (optional)
     - [ ] Budget (optional)
     - [ ] Additional details (optional)
   - [ ] Submit form
   - [ ] Verify success message
   - [ ] Verify form closes
   - [ ] Test validation errors

### Dashboard Flows

1. **Customer Dashboard**
   - [ ] Login as customer
   - [ ] Navigate to `/dashboard/customer`
   - [ ] Verify stats display:
     - [ ] Total bookings
     - [ ] Upcoming bookings
     - [ ] Completed bookings
     - [ ] Cancelled bookings
   - [ ] View booking list
   - [ ] Leave review (after completed booking)

2. **Performer Dashboard**
   - [ ] Login as performer
   - [ ] Navigate to `/dashboard/performer`
   - [ ] Verify stats display:
     - [ ] Total bookings
     - [ ] Upcoming bookings
     - [ ] Total earnings
     - [ ] Average rating
   - [ ] View booking requests
   - [ ] Accept/decline bookings

### Responsive Design Testing

1. **Mobile (< 768px)**
   - [ ] Navbar collapses to hamburger menu
   - [ ] Filters slide out from side
   - [ ] Performer cards stack vertically
   - [ ] Search bar full width
   - [ ] All buttons touch-friendly

2. **Tablet (768px - 1024px)**
   - [ ] 2-column grid for performers
   - [ ] Filters sidebar visible
   - [ ] Navigation links visible

3. **Desktop (> 1024px)**
   - [ ] 3-column grid for performers
   - [ ] Full navigation visible
   - [ ] All features accessible

---

## 📊 Test Data Setup

### Create Test Users

```python
# backend/manage.py shell
from django.contrib.auth import get_user_model
from performers.models import Performer

User = get_user_model()

# Create test customer
customer = User.objects.create_user(
    username='testcustomer',
    email='customer@test.com',
    password='testpass123',
    user_type='customer',
    first_name='Test',
    last_name='Customer'
)

# Create test performer
performer_user = User.objects.create_user(
    username='testperformer',
    email='performer@test.com',
    password='testpass123',
    user_type='performer',
    first_name='Test',
    last_name='Performer'
)

# Create performer profile
performer = Performer.objects.create(
    user=performer_user,
    name='Test Performer',
    bio='Test bio for testing',
    category='Musicians',
    sub_category='DJ',
    price_tier='Standard',
    exact_price=1500.00,
    years_experience=5,
    location='East Legon',
    areas_served=['East Legon', 'Osu']
)
```

### Load Sample Data

```bash
# Create superuser
python manage.py createsuperuser

# Run migrations
python manage.py migrate

# Load fixtures (if you create them)
python manage.py loaddata performers.json
```

---

## ⚡ Performance Testing

### Frontend Performance

```bash
# Build and analyze
cd frontend
npm run build
npm run preview

# Check bundle size
npm run build -- --analyze
```

**Targets:**
- Initial load < 3 seconds
- Time to interactive < 5 seconds
- Bundle size < 500KB (gzipped)

### Backend Performance

```python
# Use Django Debug Toolbar in development
# Monitor query counts
# Use django-silk for profiling
```

**Targets:**
- API response time < 200ms
- Database queries < 10 per request
- Page load < 1 second

---

## 🔒 Security Testing

### Authentication Tests
- [ ] JWT tokens expire correctly
- [ ] Refresh tokens work
- [ ] Invalid tokens rejected
- [ ] Password hashing verified
- [ ] CSRF protection enabled

### Authorization Tests
- [ ] Users can only access their own data
- [ ] Performers can only edit their own profiles
- [ ] Admin endpoints protected
- [ ] CORS configured correctly

### Input Validation
- [ ] SQL injection attempts blocked
- [ ] XSS attempts sanitized
- [ ] File upload validation
- [ ] Email format validation
- [ ] Date validation (future only)

---

## 📝 Test Checklist

### Pre-Deployment Testing

- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] API endpoints tested
- [ ] Frontend components tested
- [ ] Responsive design verified
- [ ] Cross-browser testing (Chrome, Firefox, Safari)
- [ ] Performance benchmarks met
- [ ] Security checks passed
- [ ] Error handling tested
- [ ] Loading states work
- [ ] Empty states display correctly

### Post-Deployment Testing

- [ ] Production API endpoints accessible
- [ ] Database migrations successful
- [ ] Static files served correctly
- [ ] Environment variables set
- [ ] CORS configured for production
- [ ] SSL certificate valid
- [ ] Monitoring/logging working

---

## 🛠️ Testing Tools

### Recommended Tools

1. **Frontend**
   - Vitest / Jest
   - React Testing Library
   - Playwright (E2E)

2. **Backend**
   - Django TestCase
   - pytest-django
   - django-silk (profiling)

3. **API**
   - Postman
   - Thunder Client (VS Code)
   - Insomnia

4. **E2E**
   - Playwright
   - Cypress

---

## 📚 Additional Resources

- [Django Testing Docs](https://docs.djangoproject.com/en/4.2/topics/testing/)
- [React Testing Library](https://testing-library.com/react)
- [REST Framework Testing](https://www.django-rest-framework.org/api-guide/testing/)
- [Postman Documentation](https://learning.postman.com/docs/)

---

## 🎯 Quick Test Commands

```bash
# Frontend
cd frontend && npm test

# Backend
cd backend && python manage.py test

# Coverage
cd backend && pytest --cov=. --cov-report=html

# All tests
cd frontend && npm test && cd ../backend && python manage.py test
```

---

**Last Updated**: January 2025
**Maintained By**: GigGH Development Team

