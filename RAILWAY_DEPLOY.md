# Railway Deployment Guide for GigGH

## 🚀 Quick Deploy Steps

### 1. Push to GitHub (✅ DONE)
Your code is already on GitHub: https://github.com/JasraelAyinsakia/giggh

### 2. Deploy Backend to Railway

#### Step 1: Create Backend Service
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `giggh` repository
5. Railway will auto-detect Django

#### Step 2: Configure Backend Service
1. In Railway dashboard, go to your service
2. Click "Settings" → "Root Directory" → Set to `backend`
3. Railway will automatically:
   - Detect Python
   - Install dependencies from `requirements.txt`
   - Run migrations via Procfile
   - Start with Gunicorn

#### Step 3: Add PostgreSQL Database
1. In Railway project, click "+ New" → "Database" → "Add PostgreSQL"
2. Railway automatically provides `DATABASE_URL` environment variable

#### Step 4: Configure Backend Environment Variables

In Railway dashboard → Your Backend Service → Variables tab, add:

```env
# Django Settings
SECRET_KEY=your-secret-key-here-generate-a-new-one
DEBUG=False
ALLOWED_HOSTS=your-backend-app.railway.app,*.railway.app

# Database (Railway auto-provides this, but verify it exists)
DATABASE_URL=postgresql://... (Railway auto-provides)

# CORS - Add your frontend URL here (get this after deploying frontend)
CORS_ALLOWED_ORIGINS=https://your-frontend-app.railway.app

# Email (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

**Generate a new SECRET_KEY:**
```python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

#### Step 5: Get Backend URL
After deployment, Railway will provide a URL like:
`https://your-backend-app.railway.app`

**Save this URL** - you'll need it for the frontend!

---

### 3. Deploy Frontend to Railway

#### Step 1: Create Frontend Service
1. In the same Railway project, click "+ New" → "GitHub Repo"
2. Select the same `giggh` repository
3. This creates a second service

#### Step 2: Configure Frontend Service
1. Go to Frontend Service → Settings
2. Set **Root Directory** to: `frontend`
3. Set **Build Command** to: `npm install && npm run build`
4. Set **Start Command** to: `npm run preview -- --host 0.0.0.0 --port $PORT`
5. Set **Output Directory** to: `dist` (optional, for static serving)

#### Step 3: Configure Frontend Environment Variables

In Railway dashboard → Your Frontend Service → Variables tab, add:

```env
# Backend API URL (use your backend Railway URL from Step 2.5)
VITE_API_URL=https://your-backend-app.railway.app/api

# Example:
# VITE_API_URL=https://giggh-backend-production.up.railway.app/api
```

**Important:** 
- Replace `your-backend-app.railway.app` with your actual backend URL
- Make sure to include `/api` at the end
- The variable name must be `VITE_API_URL` (Vite requires `VITE_` prefix)

#### Step 4: Deploy
Railway will automatically:
1. Install Node.js dependencies
2. Build the React app (reads `VITE_API_URL` at build time)
3. Start the preview server

---

## 📝 Complete Environment Variables Summary

### Backend Service Variables:
```env
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=your-backend-app.railway.app,*.railway.app
DATABASE_URL=postgresql://... (auto-provided by Railway)
CORS_ALLOWED_ORIGINS=https://your-frontend-app.railway.app
```

### Frontend Service Variables:
```env
VITE_API_URL=https://your-backend-app.railway.app/api
```

---

## 🔄 Deployment Order

1. **Deploy Backend First**
   - Get backend URL
   - Note the URL (e.g., `https://giggh-backend.railway.app`)

2. **Update Backend CORS**
   - Add frontend URL to `CORS_ALLOWED_ORIGINS` (you'll get this after step 3)

3. **Deploy Frontend**
   - Set `VITE_API_URL` to your backend URL + `/api`
   - Get frontend URL

4. **Update Backend CORS Again**
   - Update `CORS_ALLOWED_ORIGINS` with actual frontend URL

---

## 🛠️ Railway Configuration Files

### Backend (already created):
- `Procfile` - Runs migrations and starts Gunicorn
- `requirements.txt` - Python dependencies
- `runtime.txt` - Python version

### Frontend (already created):
- `frontend/Procfile` - Starts preview server
- `frontend/package.json` - Node dependencies

---

## ✅ Post-Deployment Checklist

### Backend:
- [ ] Service is running (green status)
- [ ] Database migrations completed
- [ ] API accessible at `https://your-backend.railway.app/api/`
- [ ] Can access admin at `https://your-backend.railway.app/admin/`
- [ ] Create superuser: `railway run python backend/manage.py createsuperuser`

### Frontend:
- [ ] Service is running (green status)
- [ ] Build completed successfully
- [ ] Frontend accessible at `https://your-frontend.railway.app`
- [ ] API calls work (check browser console)
- [ ] CORS configured correctly

---

## 🔧 Useful Railway Commands

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to project
railway link

# View logs
railway logs

# Run Django commands
railway run python backend/manage.py migrate
railway run python backend/manage.py createsuperuser
railway run python backend/manage.py shell

# View environment variables
railway variables
```

---

## 🎯 Recommended Architecture

**Option 1: Railway for Both (Current Setup)**
- Backend: Railway (Django API)
- Frontend: Railway (React static site)
- Database: Railway PostgreSQL

**Option 2: Hybrid (Recommended for Production)**
- Backend: Railway (Django API)
- Frontend: Vercel/Netlify (Better for React, free CDN)
- Database: Railway PostgreSQL

For Option 2, just deploy frontend to Vercel:
1. Go to [vercel.com](https://vercel.com)
2. Import GitHub repo
3. Set root directory to `frontend`
4. Add environment variable: `VITE_API_URL=https://your-backend.railway.app/api`
5. Deploy!

---

## 🐛 Troubleshooting

### Backend Issues:
- **Migrations fail**: Run manually: `railway run python backend/manage.py migrate`
- **Static files 404**: Run: `railway run python backend/manage.py collectstatic --noinput`
- **CORS errors**: Check `CORS_ALLOWED_ORIGINS` includes frontend URL

### Frontend Issues:
- **API calls fail**: Check `VITE_API_URL` is set correctly
- **Build fails**: Check Node version (Railway auto-detects)
- **Blank page**: Check browser console for errors

### Common Fixes:
```bash
# Rebuild backend
railway up

# Rebuild frontend
railway up --service frontend

# Check logs
railway logs --service backend
railway logs --service frontend
```

---

## 📚 Additional Resources

- [Railway Documentation](https://docs.railway.app)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Django Deployment Checklist](https://docs.djangoproject.com/en/4.2/howto/deployment/checklist/)

---

**Last Updated**: January 2025
