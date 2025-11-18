# Fix 502 Bad Gateway Error on Railway Backend

## What 502 Means
The backend service is not responding. Railway can't reach your Django app.

---

## 🔍 Step 1: Check Deploy Logs

**This is the most important step!**

1. Go to Railway dashboard
2. Click on **giggh-api** service
3. Click **Deploy Logs** tab
4. Look for errors in the logs

**What to look for:**
- ❌ Python errors
- ❌ Import errors
- ❌ Database connection errors
- ❌ Migration failures
- ❌ Gunicorn startup errors

---

## ✅ Step 2: Verify Root Directory

**CRITICAL:** Make sure Root Directory is set correctly!

1. Go to **giggh-api** service → **Settings** tab
2. Check **Root Directory** field
3. Should be: `backend`
4. If it's empty or wrong, set it to `backend` and save

---

## ✅ Step 3: Check Environment Variables

Go to **giggh-api** → **Variables** tab, verify you have:

### Required Variables:
```env
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=giggh-api-production.up.railway.app,*.railway.app
DATABASE_URL=postgresql://... (Railway auto-provides this)
CORS_ALLOWED_ORIGINS=https://giggh.up.railway.app
```

**Important:**
- `ALLOWED_HOSTS` should include your Railway domain
- `DATABASE_URL` should be automatically provided by Railway (if you added PostgreSQL)
- `CORS_ALLOWED_ORIGINS` should NOT have trailing slash

---

## ✅ Step 4: Check Service Status

1. In Railway dashboard, look at **giggh-api** service card
2. Check if it shows:
   - ✅ **Green checkmark** = Running
   - ❌ **Red X** = Failed
   - ⏳ **Spinner** = Deploying

---

## 🔧 Step 5: Common Fixes

### Fix 1: Missing PostgreSQL Database

If you don't have a PostgreSQL database:
1. In Railway project, click **+ New**
2. Click **Database** → **Add PostgreSQL**
3. Railway will automatically provide `DATABASE_URL`

### Fix 2: Service Crashed

If the service crashed:
1. Go to **Deployments** tab
2. Click on the latest deployment
3. Check **Deploy Logs** for the error
4. Fix the error
5. Click **Redeploy**

### Fix 3: Root Directory Not Set

If Root Directory is not set:
1. Go to **Settings** tab
2. Set **Root Directory** to: `backend`
3. Save
4. Railway will auto-redeploy

### Fix 4: Gunicorn Not Starting

Check if Gunicorn is in requirements.txt:
```bash
# Should be in requirements.txt
gunicorn==23.0.0
```

### Fix 5: Port Binding Issue

The Procfile should use `$PORT`:
```
web: cd backend && python manage.py migrate && python manage.py collectstatic --noinput && gunicorn config.wsgi:application --bind 0.0.0.0:$PORT
```

---

## 🧪 Step 6: Test After Fixes

After making changes:

1. **Wait for Railway to redeploy** (check Deploy Logs)
2. **Test the API:**
   ```bash
   curl https://giggh-api-production.up.railway.app/api/
   ```
   Should return JSON with API endpoints

3. **Check service status:**
   - Should show green checkmark
   - Should be "Active"

---

## 📋 Quick Checklist

- [ ] Root Directory set to `backend`
- [ ] PostgreSQL database added
- [ ] `SECRET_KEY` environment variable set
- [ ] `ALLOWED_HOSTS` includes Railway domain
- [ ] `DATABASE_URL` exists (auto-provided)
- [ ] Service shows green checkmark
- [ ] Deploy Logs show no errors
- [ ] Gunicorn started successfully

---

## 🆘 Still Not Working?

If it's still showing 502:

1. **Share the Deploy Logs** - Copy the error messages
2. **Check Build Logs** - See if build succeeded
3. **Verify all environment variables** - Make sure nothing is missing
4. **Try manual redeploy** - Go to Deployments → Redeploy

---

## Expected Deploy Logs (Success)

You should see something like:
```
Running migrations...
No migrations to apply.
Starting gunicorn 23.0.0
Listening at: http://0.0.0.0:8080
Booting worker with pid: X
```

If you see errors instead, that's what needs to be fixed!

