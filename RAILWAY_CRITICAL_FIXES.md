# Critical Railway Fixes - Backend 404 & Frontend 502

## 🔴 Current Issues

1. **Backend 404:** `https://giggh-api-production.up.railway.app/` returns 404
2. **Frontend 502:** `https://giggh.up.railway.app/` returns 502 Bad Gateway

---

## 🔧 Fix 1: Backend 404 Error

### Problem
Backend root URL returns 404, even though we have a root endpoint configured.

### Possible Causes
1. Backend service not running
2. Root Directory not set correctly
3. Django app not starting properly
4. URL routing issue

### Step-by-Step Fix

#### Step 1: Verify Backend Service Status
1. Go to Railway → **Backend Service** (giggh-api)
2. Check service status:
   - ✅ Green checkmark = Running
   - ❌ Red X = Failed
   - ⏳ Spinner = Deploying

#### Step 2: Check Root Directory
1. Backend Service → **Settings** tab
2. Verify **Root Directory** = `backend`
3. If wrong, set it to `backend` and save

#### Step 3: Check Deploy Logs
1. Backend Service → **Deploy Logs** tab
2. Look for:
   - ✅ `Starting gunicorn 23.0.0`
   - ✅ `Listening at: http://0.0.0.0:8080`
   - ✅ `Booting worker with pid: X`
   - ❌ Any errors?

#### Step 4: Test Backend Endpoints
Try these URLs in your browser:

1. **Root endpoint:**
   ```
   https://giggh-api-production.up.railway.app/
   ```
   Should return JSON with API info

2. **API endpoint:**
   ```
   https://giggh-api-production.up.railway.app/api/
   ```
   Should return same JSON

3. **Performers endpoint:**
   ```
   https://giggh-api-production.up.railway.app/api/performers/
   ```
   Should return performers list

#### Step 5: Verify Environment Variables
Backend Service → **Variables** tab, check:
- ✅ `SECRET_KEY` is set
- ✅ `DEBUG=False`
- ✅ `ALLOWED_HOSTS` includes `giggh-api-production.up.railway.app`
- ✅ `DATABASE_URL` exists (from Postgres)
- ✅ `CORS_ALLOWED_ORIGINS` = `https://giggh.up.railway.app`

---

## 🔧 Fix 2: Frontend 502 Error

### Problem
Frontend service returns 502 Bad Gateway.

### Possible Causes
1. Frontend service not running
2. Build failed
3. Start command failing
4. Port binding issue
5. Root Directory not set

### Step-by-Step Fix

#### Step 1: Verify Frontend Service Status
1. Go to Railway → **Frontend Service** (gig.gh or giggh-frontend)
2. Check service status:
   - ✅ Green checkmark = Running
   - ❌ Red X = Failed
   - ⏳ Spinner = Deploying

#### Step 2: Check Root Directory
1. Frontend Service → **Settings** tab
2. Verify **Root Directory** = `frontend`
3. If wrong, set it to `frontend` and save

#### Step 3: Check Build Logs
1. Frontend Service → **Build Logs** tab
2. Look for:
   - ✅ `built in X.XXs` - Build succeeded
   - ❌ Build errors?

#### Step 4: Check Deploy Logs
1. Frontend Service → **Deploy Logs** tab
2. Look for:
   - ✅ `Starting Container`
   - ✅ `vite preview`
   - ✅ `Listening at: http://0.0.0.0:PORT`
   - ❌ Any errors?

#### Step 5: Verify Environment Variables
Frontend Service → **Variables** tab, check:
- ✅ `VITE_API_URL` = `https://giggh-api-production.up.railway.app/api`
  - **Important:** Must point to backend URL, not frontend!
  - Must include `/api` at the end

#### Step 6: Verify Build Settings
Frontend Service → **Settings** tab:
- **Root Directory:** `frontend`
- **Build Command:** `npm install && npm run build`
- **Start Command:** (handled by Procfile)

---

## 🎯 Quick Diagnostic Checklist

### Backend (giggh-api)
- [ ] Service shows green checkmark
- [ ] Root Directory = `backend`
- [ ] Deploy Logs show Gunicorn started
- [ ] `ALLOWED_HOSTS` includes backend domain
- [ ] `DATABASE_URL` exists
- [ ] Can access `https://giggh-api-production.up.railway.app/api/`

### Frontend (gig.gh or giggh-frontend)
- [ ] Service shows green checkmark
- [ ] Root Directory = `frontend`
- [ ] Build Logs show "built in X.XXs"
- [ ] Deploy Logs show "Listening at"
- [ ] `VITE_API_URL` points to backend URL
- [ ] Can access `https://giggh.up.railway.app`

---

## 🚨 Common Issues & Solutions

### Issue: Backend 404 but service is running

**Solution:**
1. Check `ALLOWED_HOSTS` includes your backend domain
2. Verify Root Directory = `backend`
3. Check Deploy Logs for Django startup errors
4. Try accessing `/api/` instead of `/`

### Issue: Frontend 502 but build succeeded

**Solution:**
1. Check Deploy Logs for start command errors
2. Verify `VITE_API_URL` is set correctly
3. Check if port binding is correct (`0.0.0.0:$PORT`)
4. Verify Root Directory = `frontend`

### Issue: Frontend can't connect to backend

**Solution:**
1. Verify backend is accessible (test in browser)
2. Check `VITE_API_URL` points to backend URL
3. Verify CORS settings in backend
4. Check browser console for CORS errors

---

## 📋 What to Check in Railway

### Backend Service
1. **Settings:**
   - Root Directory: `backend`
   
2. **Variables:**
   - `SECRET_KEY`
   - `DEBUG=False`
   - `ALLOWED_HOSTS=giggh-api-production.up.railway.app,*.railway.app`
   - `DATABASE_URL` (auto-provided)
   - `CORS_ALLOWED_ORIGINS=https://giggh.up.railway.app`

3. **Deploy Logs:**
   - Should show Gunicorn starting
   - Should show "Listening at"

### Frontend Service
1. **Settings:**
   - Root Directory: `frontend`
   - Build Command: `npm install && npm run build`

2. **Variables:**
   - `VITE_API_URL=https://giggh-api-production.up.railway.app/api`

3. **Build Logs:**
   - Should show "built in X.XXs"

4. **Deploy Logs:**
   - Should show "Listening at"

---

## 🔄 Redeploy Steps

If fixes don't work, try manual redeploy:

1. **Backend:**
   - Go to Deployments tab
   - Click three dots (⋯) on latest deployment
   - Click **Redeploy**

2. **Frontend:**
   - Go to Deployments tab
   - Click three dots (⋯) on latest deployment
   - Click **Redeploy**

---

## ✅ Expected Result

After fixes:

1. **Backend:**
   - ✅ `https://giggh-api-production.up.railway.app/api/` returns JSON
   - ✅ `https://giggh-api-production.up.railway.app/api/performers/` returns performers

2. **Frontend:**
   - ✅ `https://giggh.up.railway.app` loads the app
   - ✅ No 502 errors
   - ✅ API calls work

---

## 🆘 Still Not Working?

Share these details:

1. **Backend Deploy Logs** (last 50 lines)
2. **Frontend Deploy Logs** (last 50 lines)
3. **Backend Build Logs** (if any errors)
4. **Frontend Build Logs** (if any errors)
5. **Service status** (green/red/spinner)

This will help identify the exact issue!

