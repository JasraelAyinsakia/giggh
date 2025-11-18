# Quick Fix for Railway Build Error

## The Problem
Railway can't detect how to build because your Django app is in the `backend/` folder.

## ✅ Solution: Set Root Directory

### In Railway Dashboard:

1. Go to your **giggh-api** service
2. Click **Settings** tab
3. Find **"Root Directory"** section
4. Enter: `backend`
5. Click **Save**

That's it! Railway will now:
- Look in `backend/` for Python files
- Find `manage.py` in `backend/`
- Use `requirements.txt` (I've copied it to `backend/` too)
- Run your Procfile command

---

## Alternative: If Root Directory Setting Doesn't Work

I've also created `nixpacks.toml` in the root which explicitly tells Railway how to build.

Railway should now detect it automatically.

---

## What I Did

1. ✅ Created `nixpacks.toml` - Explicit build instructions
2. ✅ Copied `requirements.txt` to `backend/` - So Railway can find it
3. ✅ Updated `railway.json` - Simplified configuration

---

## Next Steps

1. **Set Root Directory to `backend`** in Railway Settings
2. Railway will redeploy automatically
3. Check logs if it still fails

---

## If Still Failing

Check Railway logs. The error message will tell you exactly what's missing.

Common fixes:
- Make sure `requirements.txt` is accessible
- Verify `manage.py` is in `backend/`
- Check that all dependencies are in `requirements.txt`

