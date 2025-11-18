# Frontend Environment Variables Guide

## Required Environment Variables

### For Railway Deployment:

```env
VITE_API_URL=https://your-backend-app.railway.app/api
```

**Important Notes:**
- Variable name **must** start with `VITE_` (Vite requirement)
- Replace `your-backend-app.railway.app` with your actual Railway backend URL
- Must include `/api` at the end
- Set this **before building** (Vite reads env vars at build time)

---

## How to Set in Railway

1. Go to your **Frontend Service** in Railway
2. Click **Variables** tab
3. Click **+ New Variable**
4. Add:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-app.railway.app/api`
5. Click **Add**

---

## Example Values

### Development (Local):
```env
VITE_API_URL=http://localhost:8000/api
```

### Production (Railway):
```env
VITE_API_URL=https://giggh-backend-production.up.railway.app/api
```

---

## How It Works

The frontend code in `frontend/src/services/api.js` reads this variable:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
```

- If `VITE_API_URL` is set, it uses that
- Otherwise, defaults to `http://localhost:8000/api` (for local dev)

---

## Railway Frontend Configuration

### Service Settings:
- **Root Directory**: `frontend`
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run preview -- --host 0.0.0.0 --port $PORT`

### Environment Variables:
- `VITE_API_URL` = Your backend Railway URL + `/api`

---

## Testing Locally

Create `frontend/.env.local` (not committed to git):

```env
VITE_API_URL=http://localhost:8000/api
```

Then run:
```bash
cd frontend
npm run dev
```

---

## Troubleshooting

### API calls failing?
1. Check `VITE_API_URL` is set correctly
2. Verify backend URL is accessible
3. Check CORS settings in backend
4. Look at browser console for errors

### Build fails?
- Make sure `VITE_API_URL` is set before building
- Vite reads env vars at build time, not runtime

### Wrong API URL?
- Rebuild frontend after changing `VITE_API_URL`
- Railway will rebuild automatically when you change variables

