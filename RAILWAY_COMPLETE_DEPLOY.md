# Complete Railway Deployment Guide - Database, Backend & Frontend

## 🎯 Overview

This guide will help you deploy all three services to Railway:
1. **PostgreSQL Database**
2. **Backend API (Django)**
3. **Frontend (React)**

---

## 📋 Prerequisites

- ✅ GitHub repository: https://github.com/JasraelAyinsakia/giggh
- ✅ Railway account (sign up at https://railway.app)
- ✅ Code pushed to GitHub (already done ✅)

---

## 🗄️ Step 1: Deploy PostgreSQL Database

### 1.1 Create New Project
1. Go to [railway.app](https://railway.app)
2. Click **"New Project"**
3. Select **"Empty Project"** or **"Deploy from GitHub repo"**
4. Name it: `GigGH` or `giggh-production`

### 1.2 Add PostgreSQL Database
1. In your Railway project, click **"+ New"**
2. Select **"Database"**
3. Choose **"Add PostgreSQL"**
4. Railway will automatically:
   - Create a PostgreSQL database
   - Provide `DATABASE_URL` environment variable
   - Set up persistent storage

### 1.3 Get Database URL
1. Click on the **Postgres** service
2. Go to **Variables** tab
3. Copy the `DATABASE_URL` value (you'll need this for backend)

**✅ Database is now deployed!**

---

## 🔧 Step 2: Deploy Backend API

### 2.1 Create Backend Service
1. In the same Railway project, click **"+ New"**
2. Select **"GitHub Repo"**
3. Choose your repository: `JasraelAyinsakia/giggh`
4. Railway will create a new service

### 2.2 Configure Backend Service

#### A. Set Root Directory
1. Click on the **backend service** (might be named `giggh` or similar)
2. Go to **Settings** tab
3. Find **"Root Directory"** section
4. Enter: `backend`
5. Click **Save**

#### B. Configure Environment Variables
Go to **Variables** tab and add:

```env
# Django Settings
SECRET_KEY=your-secret-key-here-generate-a-new-one
DEBUG=False
ALLOWED_HOSTS=giggh-api-production.up.railway.app,*.railway.app

# Database (Railway auto-provides this - verify it exists)
DATABASE_URL=postgresql://... (Auto-provided by Railway)

# CORS - Add your frontend URL (get this after deploying frontend)
CORS_ALLOWED_ORIGINS=https://giggh.up.railway.app

# Optional: Email settings
EMAIL_BACKEND=django.core.mail.backends.console.EmailBackend
```

**Generate SECRET_KEY:**
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

#### C. Verify Build Settings
Railway should auto-detect:
- ✅ Python 3.11 (from `runtime.txt`)
- ✅ Dependencies from `requirements.txt`
- ✅ Start command from `Procfile` or `nixpacks.toml`

### 2.3 Get Backend URL
1. After deployment, Railway will provide a public URL
2. It will look like: `https://giggh-api-production.up.railway.app`
3. **Save this URL** - you'll need it for frontend!

**✅ Backend is now deployed!**

---

## 🎨 Step 3: Deploy Frontend

### 3.1 Create Frontend Service
1. In the same Railway project, click **"+ New"**
2. Select **"GitHub Repo"**
3. Choose the same repository: `JasraelAyinsakia/giggh`
4. Railway will create another service

### 3.2 Configure Frontend Service

#### A. Set Root Directory
1. Click on the **frontend service**
2. Go to **Settings** tab
3. Find **"Root Directory"** section
4. Enter: `frontend`
5. Click **Save**

#### B. Configure Build Settings
In **Settings** → **Build**:
- **Build Command**: `npm install && npm run build`
- **Output Directory**: `dist` (optional)
- **Start Command**: (handled by `frontend/Procfile`)

#### C. Configure Environment Variables
Go to **Variables** tab and add:

```env
# Backend API URL (use your backend Railway URL from Step 2.3)
VITE_API_URL=https://giggh-api-production.up.railway.app/api
```

**Important:**
- Replace `giggh-api-production.up.railway.app` with your actual backend URL
- Must include `/api` at the end
- Variable name **must** be `VITE_API_URL` (Vite requirement)

### 3.3 Get Frontend URL
1. After deployment, Railway will provide a public URL
2. It will look like: `https://giggh.up.railway.app`
3. **Save this URL**

**✅ Frontend is now deployed!**

---

## 🔄 Step 4: Update CORS Settings

After deploying frontend, update backend CORS:

1. Go to **Backend Service** → **Variables** tab
2. Update `CORS_ALLOWED_ORIGINS`:
   ```
   CORS_ALLOWED_ORIGINS=https://giggh.up.railway.app
   ```
   - Use your actual frontend URL
   - **NO trailing slash** (remove `/` at the end)
3. Railway will auto-redeploy backend

---

## ✅ Step 5: Verify Deployment

### Test Backend
```bash
# Test root endpoint
curl https://giggh-api-production.up.railway.app/api/

# Should return JSON with API endpoints
```

### Test Frontend
1. Visit: `https://giggh.up.railway.app`
2. Open browser console (F12)
3. Check for any errors
4. Test navigation and API calls

### Test Database Connection
1. Go to Backend → **Deploy Logs**
2. Check for: "No migrations to apply" ✅
3. If migrations failed, check database connection

---

## 📊 Railway Project Structure

Your Railway project should look like:

```
GigGH Project
├── Postgres (Database)
│   └── Variables: DATABASE_URL (auto-provided)
│
├── giggh-api (Backend)
│   ├── Root Directory: backend
│   ├── Variables:
│   │   ├── SECRET_KEY
│   │   ├── DEBUG=False
│   │   ├── ALLOWED_HOSTS
│   │   ├── DATABASE_URL (from Postgres)
│   │   └── CORS_ALLOWED_ORIGINS
│   └── URL: https://giggh-api-production.up.railway.app
│
└── giggh-frontend (Frontend)
    ├── Root Directory: frontend
    ├── Variables:
    │   └── VITE_API_URL
    └── URL: https://giggh.up.railway.app
```

---

## 🔍 Troubleshooting

### Backend Issues

**502 Bad Gateway:**
- ✅ Check Root Directory is set to `backend`
- ✅ Check Deploy Logs for errors
- ✅ Verify `DATABASE_URL` exists
- ✅ Check `SECRET_KEY` is set

**404 Not Found:**
- ✅ Verify Root Directory is `backend`
- ✅ Check URL patterns in `backend/config/urls.py`
- ✅ Test: `https://your-backend-url.railway.app/api/`

**Database Connection Error:**
- ✅ Verify `DATABASE_URL` is set correctly
- ✅ Check Postgres service is running
- ✅ Check Deploy Logs for connection errors

### Frontend Issues

**502 Bad Gateway:**
- ✅ Check Root Directory is set to `frontend`
- ✅ Verify build completed successfully
- ✅ Check Deploy Logs for errors

**API Calls Failing:**
- ✅ Verify `VITE_API_URL` is set correctly
- ✅ Check backend CORS settings
- ✅ Check browser console for errors
- ✅ Verify backend URL is accessible

**Build Fails:**
- ✅ Check `VITE_API_URL` is set before building
- ✅ Verify all dependencies in `package.json`
- ✅ Check Build Logs for specific errors

---

## 📝 Environment Variables Summary

### Backend Variables:
```env
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=your-backend-url.railway.app,*.railway.app
DATABASE_URL=postgresql://... (auto-provided)
CORS_ALLOWED_ORIGINS=https://your-frontend-url.railway.app
```

### Frontend Variables:
```env
VITE_API_URL=https://your-backend-url.railway.app/api
```

---

## 🚀 Deployment Order

**Recommended order:**
1. ✅ **Database** (PostgreSQL) - First
2. ✅ **Backend** (Django API) - Second
3. ✅ **Frontend** (React) - Third
4. ✅ **Update CORS** - After frontend is deployed

---

## 📞 Quick Reference

### Railway Dashboard URLs:
- **Project**: https://railway.app/project/[your-project-id]
- **Backend Service**: Settings → Root Directory: `backend`
- **Frontend Service**: Settings → Root Directory: `frontend`

### Your URLs (after deployment):
- **Backend**: `https://giggh-api-production.up.railway.app`
- **Frontend**: `https://giggh.up.railway.app`
- **API Endpoint**: `https://giggh-api-production.up.railway.app/api/`

---

## ✅ Checklist

- [ ] PostgreSQL database created
- [ ] Backend service created with Root Directory = `backend`
- [ ] Backend environment variables set
- [ ] Backend deployed successfully
- [ ] Frontend service created with Root Directory = `frontend`
- [ ] Frontend `VITE_API_URL` set to backend URL
- [ ] Frontend deployed successfully
- [ ] CORS updated with frontend URL
- [ ] Backend API accessible
- [ ] Frontend accessible
- [ ] API calls working from frontend

---

## 🎉 You're Done!

Your complete application is now deployed on Railway:
- ✅ Database running
- ✅ Backend API running
- ✅ Frontend running
- ✅ All connected and working!

Visit your frontend URL to see your app live! 🚀

