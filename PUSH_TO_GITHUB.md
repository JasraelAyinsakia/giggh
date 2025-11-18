# Push to GitHub - Quick Guide

## Option 1: Using Personal Access Token (Recommended)

1. **Create a GitHub Personal Access Token:**
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token (classic)"
   - Give it a name (e.g., "GigGH Project")
   - Select scopes: `repo` (full control)
   - Click "Generate token"
   - **Copy the token** (you won't see it again!)

2. **Push using the token:**
   ```bash
   cd /Users/ayinsakiajacob/Documents/projects/GigGH
   git remote set-url origin https://YOUR_TOKEN@github.com/JasraelAyinsakia/giggh.git
   git push -u origin main
   ```

   Replace `YOUR_TOKEN` with your actual token.

## Option 2: Using GitHub CLI

```bash
# Install GitHub CLI if not installed
brew install gh

# Authenticate
gh auth login

# Push
git push -u origin main
```

## Option 3: SSH (if you have SSH keys set up)

```bash
git remote set-url origin git@github.com:JasraelAyinsakia/giggh.git
git push -u origin main
```

## Option 4: Manual (will prompt for username/password)

```bash
git push -u origin main
# Username: JasraelAyinsakia
# Password: [Use your Personal Access Token, NOT your GitHub password]
```

---

## After Pushing

Once pushed, you can deploy to Railway:
1. Go to [railway.app](https://railway.app)
2. Sign up/login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select `giggh` repository
5. Railway will auto-detect and deploy!

See `RAILWAY_DEPLOY.md` for detailed deployment instructions.

