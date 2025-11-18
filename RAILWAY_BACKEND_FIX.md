# Fix Railway Backend Build Error

## Current Issue
Railway can't create a build plan because it's confused about the project structure.

## ✅ Solution: Set Root Directory in Railway

### Step 1: Configure Backend Service

1. In Railway dashboard, go to **giggh-api** service
2. Click **Settings** tab
3. Scroll to **"Root Directory"** section
4. **Set Root Directory to:** `backend`
5. Click **Save**

### Step 2: Verify Configuration

After setting root directory to `backend`, Railway will:
- Look for `manage.py` in `backend/` ✅
- Find `requirements.txt` in `backend/` ✅ (I copied it there)
- Use the Procfile from root (which has `cd backend` in it)

### Step 3: Redeploy

Railway should automatically redeploy. If not:
1. Go to **Deployments** tab
2. Click **"Redeploy"** or trigger a new deployment

---

## Alternative: If Root Directory Doesn't Work

If setting root directory doesn't work, Railway should use the `nixpacks.toml` I created, which:
- Installs Python 3.11
- Installs from `requirements.txt` (in root)
- Runs migrations and starts Gunicorn from `backend/`

---

## What I Fixed

1. ✅ Updated `nixpacks.toml` - Removed migration from install phase (migrations should run at start)
2. ✅ Copied `requirements.txt` to `backend/` - So Railway can find it if root is set to backend
3. ✅ Simplified build process

---

## Expected Result

After setting root directory to `backend`:
- ✅ Build succeeds
- ✅ Dependencies install
- ✅ Migrations run
- ✅ Gunicorn starts
- ✅ Service becomes available

---

## Check Build Logs

If it still fails, check the **Build Logs** tab in Railway to see the exact error message.

