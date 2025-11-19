# GigGH Mobile App - Quick Start Guide

## 🚀 Run the App

### Option 1: Using Expo Go (Easiest)

1. **Install Expo Go** on your phone:
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Start the development server:**
   ```bash
   cd mobile
   npm start
   ```

3. **Scan QR code:**
   - iOS: Open Camera app and scan QR code
   - Android: Open Expo Go app and scan QR code

### Option 2: Using Simulator/Emulator

**For iOS (Mac only):**
```bash
cd mobile
npm run ios
```

**For Android:**
```bash
cd mobile
npm run android
```

(Requires Android Studio and Android SDK installed)

## ⚙️ Configuration

### Update Backend API URL

Edit `mobile/src/services/api.js`:

```javascript
const API_BASE_URL = __DEV__ 
  ? 'http://localhost:8000/api'  // Local development
  : 'https://giggh-production.up.railway.app/api';  // Production
```

**For physical device testing:**
- Replace `localhost` with your computer's IP address
- Example: `http://192.168.1.100:8000/api`

## 📱 Features Available

✅ **Home Screen**
- Hero section
- Category cards
- Featured performers carousel
- How it works section

✅ **Browse Screen**
- Search performers
- Filter by category
- Grid view of performers

✅ **Performer Profile**
- Full profile details
- Videos section
- Reviews
- Book Now button

✅ **Booking**
- Complete booking form
- Form validation
- Submit to backend

✅ **Authentication**
- Login screen
- Sign Up screen
- Auto-login with JWT

✅ **My Bookings**
- View all bookings
- Status indicators
- Pull to refresh

✅ **Profile**
- User information
- Settings
- Logout

## 🎨 Design

- **Colors**: Purple (#7C3AED) and Orange (#FF6B35)
- **Style**: Native mobile feel
- **Navigation**: Bottom tabs + Stack navigation

## 🔧 Troubleshooting

### "Unable to resolve module" errors
```bash
cd mobile
rm -rf node_modules
npm install
```

### Metro bundler cache issues
```bash
npm start -- --reset-cache
```

### Can't connect to backend
- Check API URL in `src/services/api.js`
- For physical device, use your computer's IP, not localhost
- Ensure backend is running and accessible

## 📦 Next Steps

1. Test all screens
2. Add push notifications
3. Add offline support
4. Optimize images
5. Add animations
6. Build for App Store/Play Store

## 🎯 Testing Checklist

- [ ] Home screen loads
- [ ] Browse screen shows performers
- [ ] Can view performer profile
- [ ] Can submit booking
- [ ] Login works
- [ ] Sign up works
- [ ] My bookings loads
- [ ] Profile screen works
- [ ] Logout works

---

**Ready to test!** Run `npm start` and scan the QR code with Expo Go! 🚀

