# Fix Railway Build Error

## Problem
Railway can't detect how to build because it's looking at the root directory, but your backend is in the `backend/` folder.

## Solution: Set Root Directory in Railway

### Step 1: Configure Backend Service

1. In Railway dashboard, go to your **giggh-api** service
2. Click **Settings** tab
3. Scroll to **"Root Directory"** section
4. Set Root Directory to: `backend`
5. Click **Save**

### Step 2: Verify Build Settings

Railway should now:
- Detect Python automatically (sees `requirements.txt` in root, but that's okay)
- Use the Procfile from root (which has `cd backend` in it)
- Build correctly

### Alternative: If Root Directory doesn't work

If Railway still has issues, you can:

**Option A: Move requirements.txt to backend/**
```bash
# This is already in root, which is fine
# But if needed, Railway will look in backend/ if root is set to backend
```

**Option B: Create nixpacks.toml in backend/**
Create `backend/nixpacks.toml`:
```toml
[phases.setup]
nixPkgs = ["python311"]

[phases.install]
cmds = ["pip install -r ../requirements.txt"]

[start]
cmd = "gunicorn config.wsgi:application --bind 0.0.0.0:$PORT"
```

## Quick Fix (Recommended)

**Just set Root Directory to `backend` in Railway Settings!**

This tells Railway:
- Look for Python files in `backend/`
- Use `manage.py` from `backend/`
- Install from `requirements.txt` (in root, which is fine)
- Run the Procfile command (which already has `cd backend`)

---

## After Setting Root Directory

Railway should:
1. ✅ Detect Python
2. ✅ Install from requirements.txt
3. ✅ Run migrations
4. ✅ Start Gunicorn
5. ✅ Generate public URL

---

## If Still Failing

Check Railway logs for specific errors. Common issues:
- Missing dependencies in requirements.txt
- Database connection issues
- Migration errors

