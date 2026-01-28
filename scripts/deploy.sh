#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Starting Deployment..."

# 1. Pull latest changes
echo "Pulling latest git changes..."
git pull

# 2. Install dependencies
echo "Installing dependencies..."
npm install

# 3. Build the application
echo "Building the application..."
npm run build

# 4. Restart/Start with PM2
echo "Restarting application with PM2..."
# Check if pm2 process exists, if not start it, else restart it
if pm2 list | grep -q "manifestia"; then
    pm2 restart manifestia
else
    pm2 start npm --name "manifestia" -- start
fi

# 5. Save PM2 list so it restarts on reboot
pm2 save

echo "Deployment Successful! Your app is running."
