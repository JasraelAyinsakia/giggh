# Railway Port Configuration Guide

## Why Railway Asks for Port

Railway needs to know what port your application listens on so it can:
1. Generate a public domain for your service
2. Route traffic correctly
3. Expose your service to the internet

## For Django Backend (giggh-api)

### What Port to Enter:

**Enter: `8000`** (or leave it as `8080` - Railway will adjust)

### How It Works:

1. **Railway provides `$PORT`** environment variable automatically
2. **Your Procfile uses `$PORT`**: `gunicorn config.wsgi:application --bind 0.0.0.0:$PORT`
3. **Railway reads the port** you specify to generate the public URL

### Configuration:

In Railway Settings → Networking → Generate Service Domain:

- **Port**: Enter `8000` (or `8080` - both work, Railway handles it)
- Click **"Generate Domain"**

Railway will:
- Generate a URL like: `https://giggh-api-production.up.railway.app`
- Automatically set `$PORT` environment variable
- Your app will listen on that port

---

## For Frontend Service

When you deploy the frontend service:

- **Port**: Enter `5173` (Vite's default) or `3000`
- Railway will provide `$PORT` and Vite preview will use it

---

## Important Notes

1. **Railway provides `$PORT` automatically** - you don't need to set it manually
2. **The port you enter** is just for Railway to know what to expose
3. **Your app must listen on `$PORT`** (which it does via Procfile)
4. **Railway will assign a random port** and set it in `$PORT` env var

---

## Troubleshooting

### If deployment fails:
- Check that your Procfile uses `$PORT`
- Verify Gunicorn is binding to `0.0.0.0:$PORT`
- Check Railway logs for port binding errors

### Common Port Values:
- Django/Gunicorn: `8000` or `8080`
- Vite Preview: `5173` or `3000`
- Node.js: `3000` or `8080`

---

## Quick Answer

**Just enter `8000` in the port field and click "Generate Domain"**

Your Procfile already handles the port correctly with `$PORT`.

