# Fix Both 502 (Frontend) and 404 (Backend) Errors

## 🔍 Current Issues

### Issue 1: Frontend 502 Bad Gateway
- **URL:** `https://giggh.up.railway.app/`
- **Error:** Application failed to respond
- **Cause:** Frontend service not running or crashed

### Issue 2: Backend 404 Not Found  
- **URL:** `https://giggh-api-production.up.railway.app/`
- **Error:** 404 Not Found
- **Note:** This is expected if hitting root `/` - should use `/api/` instead

---

## 🔧 Fix Frontend 502 Error

### Step 1: Check Frontend Service Status

1. Go to Railway Dashboard
2. Click on **Frontend Service** (gig.gh or giggh-frontend)
3. Check service status:
   - ✅ Green checkmark = Running
   - ❌ Red X = Failed
   - ⏳ Spinner = Deploying

### Step 2: Check Frontend Deploy Logs

1. Go to **Deploy Logs** tab
2. Look for errors:
   - Build failures?
   - Start command errors?
   - Port binding issues?

**What you should see (SUCCESS):**
```
Starting Container
> frontend@0.0.0 preview
> vite preview
→ Local: http://localhost:8080/
→ Network: http://0.0.0.0:8080/
```

**If you see errors, share them!**

### Step 3: Verify Frontend Configuration

Go to **Settings** tab:

1. **Root Directory:** Should be `frontend`
2. **Build Command:** Should be `npm install && npm run build`
3. **Start Command:** Should be handled by `Procfile`

### Step 4: Check Environment Variables

Go to **Variables** tab:

- **VITE_API_URL:** Should be `https://giggh-api-production.up.railway.app/api`
  - ✅ Must point to **backend** URL
  - ✅ Must include `/api` at the end

### Step 5: Manual Redeploy

If service is stuck:

1. Go to **Deployments** tab
2. Click three dots (⋯) on latest deployment
3. Click **Redeploy**

---

## 🔧 Fix Backend 404 Error

### Understanding the 404

The backend root `/` should return JSON, but if you're getting 404:

1. **Test the correct endpoint:**
   ```
   https://giggh-api-production.up.railway.app/api/
   ```
   This should return JSON with API endpoints.

2. **Root `/` endpoint:**
   ```
   https://giggh-api-production.up.railway.app/
   ```
   Should also return JSON (we added this earlier).

### If Backend Root Still Returns 404

Check backend Deploy Logs:

1. Go to **Backend Service** → **Deploy Logs**
2. Look for:
   - ✅ "Starting gunicorn"
   - ✅ "Listening at: http://0.0.0.0:8080"
   - ❌ Any errors?

### Verify Backend URLs

The backend should have these endpoints:

- ✅ `GET /` → Returns API info
- ✅ `GET /api/` → Returns API info  
- ✅ `GET /api/performers/` → List performers
- ✅ `GET /api/auth/` → Auth endpoints

---

## 📋 Complete Troubleshooting Checklist

### Frontend Service

- [ ] Service shows green checkmark (running)
- [ ] Root Directory = `frontend`
- [ ] Build Command = `npm install && npm run build`
- [ ] VITE_API_URL = `https://giggh-api-production.up.railway.app/api`
- [ ] Deploy Logs show successful build
- [ ] Deploy Logs show "vite preview" starting
- [ ] Deploy Logs show "Listening at" message

### Backend Service

- [ ] Service shows green checkmark (running)
- [ ] Root Directory = `backend`
- [ ] Deploy Logs show "Starting gunicorn"
- [ ] Deploy Logs show "Listening at"
- [ ] Test: `https://giggh-api-production.up.railway.app/api/` returns JSON
- [ ] CORS_ALLOWED_ORIGINS = `https://giggh.up.railway.app`

---

## 🎯 Quick Fixes

### Fix 1: Frontend Not Starting

**If frontend Deploy Logs show errors:**

1. Check Root Directory is `frontend`
2. Verify `VITE_API_URL` is correct
3. Check Build Logs for npm/node errors
4. Try manual redeploy

### Fix 2: Backend 404

**If backend root returns 404:**

1. Test `/api/` endpoint instead: `https://giggh-api-production.up.railway.app/api/`
2. Check Deploy Logs for startup errors
3. Verify Root Directory is `backend`
4. Check if migrations ran successfully

---

## 🧪 Test Endpoints

### Test Backend API:
```bash
# Test root endpoint
curl https://giggh-api-production.up.railway.app/

# Test API endpoint
curl https://giggh-api-production.up.railway.app/api/

# Test performers
curl https://giggh-api-production.up.railway.app/api/performers/
```

### Test Frontend:
1. Visit: `https://giggh.up.railway.app`
2. Open browser console (F12)
3. Check for errors
4. Check Network tab for API calls

---

## 🆘 Common Issues & Solutions

### Frontend 502 - Service Not Running

**Cause:** Frontend service crashed or didn't start

**Fix:**
1. Check Deploy Logs for errors
2. Verify Root Directory = `frontend`
3. Check Build Command is correct
4. Redeploy service

### Frontend 502 - Build Failed

**Cause:** npm build failed

**Fix:**
1. Check Build Logs
2. Verify `VITE_API_URL` is set before build
3. Check for dependency errors
4. Try clearing cache and rebuilding

### Backend 404 - Wrong Endpoint

**Cause:** Hitting root `/` instead of `/api/`

**Fix:**
- Use `/api/` for API endpoints
- Root `/` should work but `/api/` is more reliable

### Backend 404 - Service Not Running

**Cause:** Backend service crashed

**Fix:**
1. Check Deploy Logs
2. Verify Root Directory = `backend`
3. Check environment variables
4. Verify database connection

---

## 📊 Expected Status

### After Fixes:

**Backend:**
- ✅ `https://giggh-api-production.up.railway.app/api/` → Returns JSON
- ✅ Service shows green checkmark
- ✅ Deploy Logs show Gunicorn running

**Frontend:**
- ✅ `https://giggh.up.railway.app` → Shows React app
- ✅ Service shows green checkmark  
- ✅ Deploy Logs show Vite preview running
- ✅ Browser console shows no errors

---

## 🚀 Next Steps

1. **Check Frontend Deploy Logs** - Share any errors you see
2. **Check Backend Deploy Logs** - Verify it's running
3. **Test Backend API** - Try `/api/` endpoint
4. **Update VITE_API_URL** - If not already correct
5. **Redeploy Both** - If needed

---

## 💡 Quick Reference

**Frontend URL:** `https://giggh.up.railway.app`
**Backend URL:** `https://giggh-api-production.up.railway.app`
**Backend API:** `https://giggh-api-production.up.railway.app/api/`

**Frontend VITE_API_URL should be:** `https://giggh-api-production.up.railway.app/api`
**Backend CORS_ALLOWED_ORIGINS should be:** `https://giggh.up.railway.app`

---

Share the Deploy Logs from both services if you need more help!

