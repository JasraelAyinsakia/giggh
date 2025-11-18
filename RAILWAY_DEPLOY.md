# Railway Deployment Guide for GigGH

## 🚀 Quick Deploy Steps

### 1. Push to GitHub (if not done)

If you haven't pushed yet, use your GitHub token:

```bash
# Option 1: Using token in URL
git remote set-url origin https://YOUR_TOKEN@github.com/JasraelAyinsakia/giggh.git
git push -u origin main

# Option 2: Using GitHub CLI
gh auth login
git push -u origin main

# Option 3: Manual push (will prompt for credentials)
git push -u origin main
```

### 2. Deploy to Railway

#### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"

#### Step 2: Deploy Backend
1. Click "New Project" → "Deploy from GitHub repo"
2. Select your `giggh` repository
3. Railway will auto-detect Django
4. Configure environment variables (see below)
5. Railway will automatically deploy

#### Step 3: Configure Environment Variables

In Railway dashboard, go to your service → Variables tab, add:

```env
# Django Settings
SECRET_KEY=your-secret-key-here-generate-a-new-one
DEBUG=False
ALLOWED_HOSTS=your-app-name.railway.app,*.railway.app

# Database (Railway provides PostgreSQL automatically)
DATABASE_URL=postgresql://... (Railway auto-provides this)

# CORS (for frontend)
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com

# Email (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

#### Step 4: Deploy Frontend (Separate Service)

1. Create a new service in Railway
2. Connect to same GitHub repo
3. Set Root Directory to `frontend`
4. Set Build Command: `npm install && npm run build`
5. Set Start Command: `npm run preview` (or use a static file server)
6. Set Output Directory: `dist`

**OR** Deploy frontend to Vercel/Netlify (easier for React apps):
- Vercel: Connect GitHub repo, set root to `frontend`, auto-deploys
- Netlify: Same process

### 3. Update Settings for Production

The `settings.py` has been updated to read from environment variables.

### 4. Run Migrations

Railway will run migrations automatically via the Procfile, but you can also run manually:

```bash
railway run python backend/manage.py migrate
railway run python backend/manage.py createsuperuser
```

### 5. Static Files (if needed)

For production, you may need to configure static files:

```bash
railway run python backend/manage.py collectstatic --noinput
```

## 📝 Important Notes

1. **Database**: Railway provides PostgreSQL automatically - no setup needed
2. **Environment Variables**: Always set `DEBUG=False` in production
3. **CORS**: Update `CORS_ALLOWED_ORIGINS` with your frontend URL
4. **Secret Key**: Generate a new secret key for production (never use the dev one)
5. **Frontend API URL**: Update `frontend/src/services/api.js` with your Railway backend URL

## 🔗 Useful Commands

```bash
# View logs
railway logs

# Run Django shell
railway run python backend/manage.py shell

# Create superuser
railway run python backend/manage.py createsuperuser

# Run migrations
railway run python backend/manage.py migrate
```

## 🎯 Recommended Architecture

- **Backend**: Railway (Django API)
- **Frontend**: Vercel or Netlify (React static site)
- **Database**: Railway PostgreSQL (auto-provisioned)

This gives you:
- Fast frontend (CDN)
- Reliable backend (Railway)
- Easy deployments (GitHub integration)

