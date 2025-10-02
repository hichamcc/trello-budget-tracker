#!/bin/bash

# Budget Tracker - Quick Deploy Script for DigitalOcean VPS
# Usage: ./deploy.sh YOUR_VPS_IP

set -e

if [ -z "$1" ]; then
    echo "Usage: ./deploy.sh YOUR_VPS_IP [PORT]"
    echo "Example: ./deploy.sh 123.45.67.89 3001"
    exit 1
fi

VPS_IP=$1
PORT=${2:-3001}
DEPLOY_PATH="/var/www/card-budget-trello"

echo "🚀 Deploying Budget Tracker to $VPS_IP:$PORT"

# 1. Upload files to VPS
echo "📦 Uploading files..."
ssh root@$VPS_IP "mkdir -p $DEPLOY_PATH"
rsync -avz --exclude 'node_modules' --exclude '.git' ./ root@$VPS_IP:$DEPLOY_PATH/

# 2. Install dependencies and PM2
echo "📥 Installing dependencies..."
ssh root@$VPS_IP << EOF
cd $DEPLOY_PATH
npm install

# Install PM2 globally if not installed
if ! command -v pm2 &> /dev/null; then
    npm install -g pm2
fi

# Update ecosystem config with correct path and port
sed -i "s|cwd: '/var/www/card-budget-trello'|cwd: '$DEPLOY_PATH'|g" ecosystem.config.js
sed -i "s|-p 3001|-p $PORT|g" ecosystem.config.js

# Start/Restart with PM2
pm2 delete trello-budget-tracker 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save

# Configure firewall
ufw allow $PORT/tcp
ufw reload

echo "✅ Deployment complete!"
echo ""
echo "📝 Trello Power-Up URL:"
echo "   http://$VPS_IP:$PORT/index.html"
echo ""
echo "🔍 Check status with: pm2 status"
echo "📊 View logs with: pm2 logs trello-budget-tracker"
EOF
