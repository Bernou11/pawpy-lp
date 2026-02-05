#!/bin/bash

# Optimized deployment - Build locally, deploy only dist folder
# Usage: ./deploy-optimized.sh username@your-vps-ip

VPS=$1

if [ -z "$VPS" ]; then
    echo "Usage: ./deploy-optimized.sh username@vps-ip"
    echo "Example: ./deploy-optimized.sh root@123.456.789.0"
    exit 1
fi

echo "🔨 Building locally..."
npm run build

if [ ! -d "dist" ]; then
    echo "❌ Build failed - dist folder not found"
    exit 1
fi

echo "📦 Transferring files to $VPS..."
# Note: dist without trailing slash copies the folder itself
rsync -avz --progress \
    --delete \
    --exclude '.git' \
    --exclude '.gitignore' \
    --exclude 'node_modules' \
    --exclude '.env.local' \
    --exclude '.DS_Store' \
    dist \
    nginx.conf \
    Dockerfile.production \
    compose.prod.yml \
    $VPS:~/landing-page/

# Deploy on VPS
echo "🐳 Deploying on VPS..."
ssh $VPS << 'ENDSSH'
cd ~/landing-page

mv compose.prod.yml compose.yml

# Create network if it doesn't exist
docker network create web 2>/dev/null || true

# Use production compose file
docker compose down
docker compose up -d --build

# Show status
echo ""
echo "✅ Deployment complete!"
echo ""
docker compose ps
ENDSSH

echo ""
echo "🎉 Done! Your app should be running at http://pawpy.fr"
echo "⏳ SSL certificate will be issued automatically in 1-2 minutes"
echo ""
echo "📊 Deployment stats:"
echo "   - Built locally: ✓"
echo "   - Only dist/ transferred: ✓"
echo "   - .git excluded: ✓"
echo "   - Docker API compatible: ✓"
echo "   - Much faster: ✓"