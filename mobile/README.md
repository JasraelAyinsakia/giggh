# GigGH Mobile App

React Native mobile application for GigGH - Entertainment Booking Platform.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI (installed globally or via npx)
- iOS Simulator (for Mac) or Android Emulator
- Or Expo Go app on your physical device

### Installation

```bash
cd mobile
npm install
```

### Running the App

```bash
# Start Expo development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on web (for testing)
npm run web
```

### Using Expo Go

1. Install Expo Go app on your phone (iOS App Store or Google Play)
2. Run `npm start`
3. Scan the QR code with:
   - iOS: Camera app
   - Android: Expo Go app

## 📱 Features

- ✅ Home screen with featured performers
- ✅ Browse performers with filters
- ✅ Performer profiles with videos and reviews
- ✅ Booking system
- ✅ User authentication (Login/Register)
- ✅ My Bookings screen
- ✅ User profile

## 🔗 Backend Integration

The app connects to your Django REST API backend. Update the API URL in:

`src/services/api.js`

Change `API_BASE_URL` to your backend URL:
- Development: `http://localhost:8000/api`
- Production: `https://giggh-production.up.railway.app/api`

## 🎨 Design

- **Primary Color**: Purple (#7C3AED)
- **Secondary Color**: Orange (#FF6B35)
- **Theme**: Mobile-first, native feel

## 📁 Project Structure

```
mobile/
├── src/
│   ├── screens/          # Screen components
│   ├── components/       # Reusable components
│   ├── navigation/       # Navigation setup
│   ├── services/         # API services
│   ├── context/          # State management
│   ├── utils/            # Utilities
│   └── theme/            # Colors, typography
├── App.js                # Main app component
└── package.json
```

## 🔧 Configuration

### Environment Variables

Create `.env` file (optional):
```
API_URL=https://giggh-production.up.railway.app/api
```

## 📦 Dependencies

- React Native
- Expo
- React Navigation
- Axios (API calls)
- AsyncStorage (local storage)
- React Native Paper (UI components)

## 🚀 Building for Production

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

## 📝 Notes

- Uses the same backend API as the web app
- JWT authentication
- Offline support (caching)
- Push notifications (to be added)

