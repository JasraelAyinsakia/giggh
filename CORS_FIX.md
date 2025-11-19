# Fix CORS Error on Railway

## ❌ Current Error

```
SystemCheckError: Origin 'htpps://giggh.up.railway.app/api' in CORS_ALLOWED_ORIGINS should not have path
```

## 🔍 Issues Found

1. **Typo**: `htpps://` should be `https://`
2. **Wrong URL**: `CORS_ALLOWED_ORIGINS` should be the **frontend URL**, not backend API URL
3. **Has path**: Should NOT include `/api` path

---

## ✅ Fix: Update Railway Environment Variable

### Step 1: Go to Backend Service in Railway

1. Open Railway dashboard
2. Click on your **backend service** (giggh-api)
3. Go to **Variables** tab

### Step 2: Update CORS_ALLOWED_ORIGINS

**Current (WRONG):**
```
CORS_ALLOWED_ORIGINS=htpps://giggh.up.railway.app/api
```

**Should be (CORRECT):**
```
CORS_ALLOWED_ORIGINS=https://giggh.up.railway.app
```

**Key changes:**
- ✅ Fix typo: `htpps` → `https`
- ✅ Remove `/api` path (CORS origins should be domain only)
- ✅ Use your **frontend URL**, not backend URL

### Step 3: Save and Redeploy

1. Click **Save** or **Update**
2. Railway will automatically redeploy
3. Check Deploy Logs - error should be gone!

---

## 📝 Understanding CORS_ALLOWED_ORIGINS

**CORS_ALLOWED_ORIGINS** tells Django which **frontend domains** are allowed to make API requests.

### ✅ Correct Examples:
```
CORS_ALLOWED_ORIGINS=https://giggh.up.railway.app
```

Or multiple origins (comma-separated):
```
CORS_ALLOWED_ORIGINS=https://giggh.up.railway.app,https://www.giggh.com
```

### ❌ Wrong Examples:
```
# Wrong: Has path
CORS_ALLOWED_ORIGINS=https://giggh.up.railway.app/api

# Wrong: Typo
CORS_ALLOWED_ORIGINS=htpps://giggh.up.railway.app

# Wrong: Backend URL (should be frontend)
CORS_ALLOWED_ORIGINS=https://giggh-api-production.up.railway.app
```

---

## 🔄 Quick Fix Steps

1. **Railway Dashboard** → Backend Service → Variables
2. Find `CORS_ALLOWED_ORIGINS`
3. Change to: `https://giggh.up.railway.app` (your frontend URL, no `/api`)
4. **Save**
5. Wait for redeploy
6. ✅ Error fixed!

---

## 🎯 What I Fixed in Code

I've updated `backend/config/settings.py` to:
- ✅ Automatically fix `htpps` → `https` typos
- ✅ Automatically remove paths from CORS origins
- ✅ Better validation and cleaning

But you still need to **update the Railway variable** to the correct value!

---

## ✅ After Fix

Your backend should start successfully and you'll see:
```
Starting gunicorn 23.0.0
Listening at: http://0.0.0.0:8080
```

No more CORS errors! 🎉

