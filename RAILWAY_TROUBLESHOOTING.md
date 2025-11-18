# Railway Troubleshooting Guide

## Current Issues & Fixes

### Issue 1: Backend Returns 404

**Problem:** Visiting `https://giggh-api-production.up.railway.app/` returns 404

**Cause:** Django doesn't have a root URL handler

**Fix Applied:** ✅ Added root API endpoint that shows available endpoints

**Test:** Visit `https://giggh-api-production.up.railway.app/api/` - should show API info

---

### Issue 2: Frontend Returns 502

**Problem:** Frontend at `https://giggh.up.railway.app/` returns 502 Bad Gateway

**Possible Causes:**
1. Frontend service not running
2. Build failed
3. Start command incorrect
4. Port binding issue

**Fixes Applied:**
1. ✅ Updated `vite.config.js` to bind to `0.0.0.0` and use `$PORT`
2. ✅ Updated `frontend/Procfile` to use correct command
3. ✅ Added `serve` script to package.json

---

## Quick Fixes Checklist

### Backend (giggh-api):

1. **Set Root Directory to `backend`** in Railway Settings
2. **Verify Environment Variables:**
   - `SECRET_KEY` ✅
   - `DEBUG=False` ✅
   - `ALLOWED_HOSTS` ✅
   - `DATABASE_URL` ✅
   - `CORS_ALLOWED_ORIGINS` ✅

3. **Check Build Logs:**
   - Go to **Deployments** tab
   - Click on latest deployment
   - Check **Build Logs** for errors

4. **Test API:**
   - Visit: `https://giggh-api-production.up.railway.app/api/`
   - Should return JSON with API endpoints

---

### Frontend (giggh-frontend):

1. **Verify Root Directory:** Should be `frontend`
2. **Verify Build Command:** `npm install && npm run build`
3. **Verify Start Command:** `npm run preview -- --host 0.0.0.0 --port $PORT`
4. **Verify Environment Variable:**
   - `VITE_API_URL=https://giggh-api-production.up.railway.app/api`

5. **Check Build Logs:**
   - Go to **Deployments** tab
   - Check if build succeeded
   - Check if start command is running

---

## Common Railway Errors

### "Application failed to respond" (502)
- Service not running
- Port binding issue
- Start command failed
- Check **Deploy Logs** tab

### "Not Found" (404)
- Routes not configured
- Wrong URL path
- Service running but routes missing

### Build Fails
- Missing dependencies
- Wrong root directory
- Build command error
- Check **Build Logs** tab

---

## Testing Your Deployment

### Backend API:
```bash
# Test root endpoint
curl https://giggh-api-production.up.railway.app/api/

# Test performers endpoint
curl https://giggh-api-production.up.railway.app/api/performers/

# Test auth endpoint
curl https://giggh-api-production.up.railway.app/api/auth/register/
```

### Frontend:
- Visit: `https://giggh.up.railway.app/`
- Should load the React app
- Check browser console for API connection errors

---

## Railway Settings Checklist

### Backend Service (giggh-api):
- [ ] Root Directory: `backend`
- [ ] Build Command: (auto-detected)
- [ ] Start Command: (from Procfile)
- [ ] Port: `8000` or `8080`
- [ ] Environment Variables: All set ✅

### Frontend Service (giggh-frontend):
- [ ] Root Directory: `frontend`
- [ ] Build Command: `npm install && npm run build`
- [ ] Start Command: `npm run preview -- --host 0.0.0.0 --port $PORT`
- [ ] Port: `5173` or `3000`
- [ ] Environment Variables: `VITE_API_URL` set ✅

---

## Next Steps

1. **Set Root Directory** for backend to `backend` in Railway
2. **Redeploy** both services
3. **Check logs** if still failing
4. **Test endpoints** using curl or browser

---

## Getting Help

If still having issues:
1. Check **Build Logs** in Railway
2. Check **Deploy Logs** in Railway
3. Check **HTTP Logs** for request errors
4. Share the error messages for further help

