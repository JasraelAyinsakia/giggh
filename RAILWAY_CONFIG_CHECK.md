# Railway Configuration Check & Fixes

## 🔍 Issues Found

### ❌ Issue 1: Frontend VITE_API_URL is Wrong

**Current (WRONG):**
```
VITE_API_URL=https://giggh-production.up.railway.app/api
```

**Problem:** This is pointing to the frontend URL, not the backend URL!

**Should be (CORRECT):**
```
VITE_API_URL=https://giggh-api-production.up.railway.app/api
```

**Fix:** Update frontend service variable to point to **backend** URL.

---

### ✅ Issue 2: Backend CORS is Correct

**Current:**
```
CORS_ALLOWED_ORIGINS=https://giggh.up.railway.app
```

**Status:** ✅ **CORRECT!** This is the frontend URL without `/api` path.

---

### ❌ Issue 3: Frontend 502 Bad Gateway

**Problem:** Frontend service is not responding (502 error).

**Possible causes:**
1. Frontend not built properly
2. Start command failing
3. Port binding issue
4. Build failed

---

## 🔧 Fixes Needed

### Fix 1: Update Frontend VITE_API_URL

1. Go to Railway → **Frontend Service** (gig.gh or giggh-frontend)
2. Click **Variables** tab
3. Find `VITE_API_URL`
4. Change from:
   ```
   https://giggh-production.up.railway.app/api
   ```
   To:
   ```
   https://giggh-api-production.up.railway.app/api
   ```
5. Click **Save**
6. Railway will rebuild frontend automatically

**Important:** 
- Use your **backend service URL** (giggh-api-production)
- Must include `/api` at the end
- This tells the frontend where to send API requests

---

### Fix 2: Verify Frontend Service Settings

Go to Frontend Service → **Settings** tab:

1. **Root Directory:** Should be `frontend`
2. **Build Command:** Should be `npm install && npm run build`
3. **Start Command:** Should be handled by `Procfile` (which runs `npm run start`)

---

### Fix 3: Check Frontend Deploy Logs

1. Go to Frontend Service → **Deploy Logs** tab
2. Look for errors:
   - Build failures?
   - Start command errors?
   - Port binding issues?

**What to look for:**
- ✅ `built in X.XXs` - Build succeeded
- ✅ `Starting Container` - Container started
- ✅ `vite preview` - Preview server starting
- ✅ `Listening at: http://0.0.0.0:PORT` - Server running

---

## 📋 Complete Configuration Checklist

### Backend Service (giggh-api)

- [x] **Root Directory:** `backend` ✅
- [x] **SECRET_KEY:** Set ✅
- [x] **DEBUG:** `False` ✅
- [x] **ALLOWED_HOSTS:** `giggh-production.up.railway.app` ✅
- [x] **DATABASE_URL:** Auto-provided ✅
- [x] **CORS_ALLOWED_ORIGINS:** `https://giggh.up.railway.app` ✅

### Frontend Service (gig.gh or giggh-frontend)

- [ ] **Root Directory:** `frontend` ⚠️ Check
- [ ] **VITE_API_URL:** `https://giggh-api-production.up.railway.app/api` ❌ **NEEDS FIX**
- [ ] **Build Command:** `npm install && npm run build` ⚠️ Check
- [ ] **Service Running:** ❌ **502 Error - Needs Fix**

### Database Service (Postgres)

- [x] **DATABASE_URL:** Auto-provided ✅
- [x] **Service Running:** ✅

---

## 🎯 Step-by-Step Fix

### Step 1: Fix Frontend VITE_API_URL

1. Railway Dashboard → Frontend Service → Variables
2. Update `VITE_API_URL` to backend URL:
   ```
   https://giggh-api-production.up.railway.app/api
   ```
3. Save

### Step 2: Verify Frontend Settings

1. Frontend Service → Settings
2. Verify Root Directory = `frontend`
3. Check Build Command = `npm install && npm run build`

### Step 3: Check Deploy Logs

1. Frontend Service → Deploy Logs
2. Look for build/start errors
3. If errors, share them for troubleshooting

### Step 4: Redeploy if Needed

1. Go to Deployments tab
2. Click three dots (⋯) on latest deployment
3. Click **Redeploy**

---

## 🔗 URL Reference

Based on your screenshots:

- **Backend URL:** `https://giggh-api-production.up.railway.app`
- **Frontend URL:** `https://giggh.up.railway.app`
- **Frontend VITE_API_URL should be:** `https://giggh-api-production.up.railway.app/api`

---

## ✅ Expected Result After Fixes

1. ✅ Frontend builds successfully
2. ✅ Frontend starts on port 8080 (or Railway's PORT)
3. ✅ Frontend accessible at `https://giggh.up.railway.app`
4. ✅ API calls go to `https://giggh-api-production.up.railway.app/api`
5. ✅ No more 502 errors

---

## 🆘 If Still Getting 502

Check these:

1. **Build Logs:** Did build succeed?
2. **Deploy Logs:** Is start command running?
3. **Service Status:** Is service showing green checkmark?
4. **Port Binding:** Is it binding to `0.0.0.0:$PORT`?

Share the Deploy Logs if still having issues!

