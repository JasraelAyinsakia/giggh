#!/bin/bash
# Push to GitHub using token
# Usage: ./push.sh YOUR_GITHUB_TOKEN

TOKEN=$1

if [ -z "$TOKEN" ]; then
    echo "Error: Please provide your GitHub token"
    echo "Usage: ./push.sh YOUR_GITHUB_TOKEN"
    exit 1
fi

# Update remote URL with token
git remote set-url origin https://${TOKEN}@github.com/JasraelAyinsakia/giggh.git

# Push to GitHub
git push -u origin main

echo "✅ Successfully pushed to GitHub!"

