# Fix 502 Error - Backend Service Issue

## Problem Identified

From your deploy logs, I can see:
- ✅ Gunicorn started successfully
- ✅ Listening on port 8080
- ❌ But Railway is using the WRONG start command
- ❌ Railway auto-detected Django and ignored our Procfile/nixpacks.toml

**The deploy command Railway used:**
```
python manage.py migrate && gunicorn --bind 0.0.0.0:${PORT:-8000} config.wsgi:application
```

**What it SHOULD be:**
```
cd backend && python manage.py migrate && python manage.py collectstatic --noinput && gunicorn config.wsgi:application --bind 0.0.0.0:$PORT
```

---

## ✅ Solution: Force Railway to Use Our Config

### Step 1: Verify Root Directory

**CRITICAL:** Make sure Root Directory is set!

1. Go to **giggh-api** service → **Settings** tab
2. Check **Root Directory** field
3. **Set it to:** `backend`
4. Click **Save**

### Step 2: Verify Railway Uses nixpacks.toml

Railway should use `nixpacks.toml` from the root. The file is already there with the correct command.

### Step 3: Manual Redeploy

After setting Root Directory:

1. Go to **Deployments** tab
2. Click the three dots (⋯) on the latest deployment
3. Click **Redeploy**

This will force Railway to use the correct configuration.

---

## Alternative: If Root Directory Doesn't Work

If Railway still uses the wrong command, we can:

### Option A: Move nixpacks.toml to backend/

1. Copy `nixpacks.toml` to `backend/nixpacks.toml`
2. Update paths in it (remove `cd backend` since we're already there)
3. Set Root Directory to `backend`

### Option B: Use Procfile Explicitly

Railway should use the Procfile, but if it doesn't:
1. Make sure Procfile is in the root
2. Set Root Directory to empty (root)
3. Procfile already has `cd backend` in it

---

## Expected Result After Fix

After setting Root Directory and redeploying, you should see in Deploy Logs:

```
Starting Container
Running migrations...
No migrations to apply.
Collecting static files...
Starting gunicorn 23.0.0
Listening at: http://0.0.0.0:8080
Booting worker with pid: X
```

And the service should respond to requests!

---

## Quick Checklist

- [ ] Root Directory set to `backend` in Settings
- [ ] Redeployed after setting Root Directory
- [ ] Deploy Logs show correct command (with `cd backend`)
- [ ] Service shows green checkmark
- [ ] Test: `curl https://giggh-api-production.up.railway.app/api/`

---

## Why This Happens

Railway's auto-detection is overriding our custom configuration. Setting Root Directory to `backend` tells Railway:
- Look for Django app in `backend/`
- Use our Procfile/nixpacks.toml commands
- Don't auto-detect from root

This should fix the 502 error!

