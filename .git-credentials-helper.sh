#!/bin/bash
# This script helps push to GitHub
# Replace YOUR_TOKEN with your actual GitHub Personal Access Token

read -sp "Enter your GitHub token: " TOKEN
echo ""

if [ -z "$TOKEN" ]; then
    echo "Error: Token is required"
    exit 1
fi

git remote set-url origin https://${TOKEN}@github.com/JasraelAyinsakia/giggh.git
git push -u origin main

echo "✅ Pushed successfully!"
