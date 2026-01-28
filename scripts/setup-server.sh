#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Starting Server Setup..."

# 1. Update System
echo "Updating system packages..."
sudo apt update && sudo apt upgrade -y

# 2. Install Essentials
echo "Installing Git, Curl, Unzip..."
sudo apt install -y git curl unzip

# 3. Install Node.js (Latest LTS)
echo "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs

# Verify Node installation
node -v
npm -v

# 4. Install PM2 (Process Manager)
echo "Installing PM2..."
sudo npm install -g pm2

# 5. Install Nginx
echo "Installing Nginx..."
sudo apt install -y nginx

# 6. Configure Firewall (UFW)
echo "Configuring Firewall..."
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

echo "Setup Complete! You can now run the deploy script."
