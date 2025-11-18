# Fix 404 Error on Railway Backend

## Why You're Getting 404

The backend is returning 404 because:

1. **Root Directory Not Set** - Railway is looking in the wrong place
2. **App Not Running** - The service might have failed to start
3. **Routes Not Found** - Django isn't finding the URL patterns

## ✅ Step-by-Step Fix

### Step 1: Set Root Directory in Railway

**CRITICAL:** This is the most important step!

1. Go to Railway dashboard
2. Click on **giggh-api** service
3. Click **Settings** tab
4. Scroll to **"Root Directory"** section
5. **Enter:** `backend`
6. Click **Save**

Railway will automatically redeploy.

---

### Step 2: Verify Environment Variables

In Railway → giggh-api → Variables, make sure you have:

```env
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=giggh-api-production.up.railway.app,*.railway.app
CORS_ALLOWED_ORIGINS=https://giggh.up.railway.app
DATABASE_URL=postgresql://... (auto-provided)
```

**Important:** 
- `CORS_ALLOWED_ORIGINS` should NOT have trailing slash: `https://giggh.up.railway.app` ✅ (not `https://giggh.up.railway.app/` ❌)
- `ALLOWED_HOSTS` should include your Railway domain

---

### Step 3: Check Build Logs

1. Go to **Deployments** tab
2. Click on the latest deployment
3. Check **Build Logs**:
   - Should see Python installation
   - Should see pip installing from requirements.txt
   - Should see "Build succeeded"

4. Check **Deploy Logs**:
   - Should see "Running migrations..."
   - Should see "Starting Gunicorn..."
   - Should see "Listening on 0.0.0.0:PORT"

---

### Step 4: Test the API

After setting root directory and redeploying:

```bash
# Test root endpoint
curl https://giggh-api-production.up.railway.app/

# Should return:
# {"message": "GigGH API", "version": "1.0", "endpoints": {...}}

# Test API endpoint
curl https://giggh-api-production.up.railway.app/api/

# Test performers
curl https://giggh-api-production.up.railway.app/api/performers/
```

---

## Common Issues

### Issue 1: "Not Found" even after setting root directory

**Check:**
- Is the service actually running? (Green checkmark in Railway)
- Check Deploy Logs for errors
- Verify Procfile is being used

### Issue 2: Build fails

**Check:**
- Root Directory is set to `backend`
- `requirements.txt` exists in `backend/` (I copied it there)
- Python version is correct (3.11)

### Issue 3: Service starts but returns 404

**Check:**
- ALLOWED_HOSTS includes your Railway domain
- Routes are configured correctly
- Check Deploy Logs for Django errors

---

## Quick Checklist

- [ ] Root Directory set to `backend` in Railway Settings
- [ ] Environment variables set correctly
- [ ] CORS_ALLOWED_ORIGINS has no trailing slash
- [ ] ALLOWED_HOSTS includes Railway domain
- [ ] Service shows green checkmark (running)
- [ ] Build logs show success
- [ ] Deploy logs show Gunicorn started

---

## If Still Not Working

1. **Check Railway Logs:**
   - Go to **Logs** tab
   - Look for errors or warnings
   - Check if Gunicorn is listening

2. **Manual Test:**
   ```bash
   # In Railway, go to service → Deployments → Click deployment → Deploy Logs
   # Look for: "Listening on 0.0.0.0:XXXX"
   ```

3. **Verify URL:**
   - Make sure you're using the correct Railway URL
   - Check if it's `giggh-api-production.up.railway.app` or different

---

## Expected Behavior After Fix

✅ Visiting `https://giggh-api-production.up.railway.app/` should return:
```json
{
  "message": "GigGH API",
  "version": "1.0",
  "endpoints": {
    "auth": "/api/auth/",
    "performers": "/api/performers/",
    "bookings": "/api/bookings/",
    "reviews": "/api/reviews/",
    "admin": "/admin/"
  }
}
```

✅ Visiting `https://giggh-api-production.up.railway.app/api/performers/` should return performer list

---

**Most Important:** Set Root Directory to `backend` in Railway Settings!

