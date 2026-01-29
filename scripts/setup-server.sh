#!/bin/bash

# Update and Upgrade
echo "Updating system..."
sudo apt-get update
sudo apt-get upgrade -y

# Install Essentials
echo "Installing essentials..."
sudo apt-get install -y curl git nginx certbot python3-certbot-nginx build-essential

# Install Node.js 20
echo "Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2
echo "Installing PM2..."
sudo npm install -g pm2

# Setup Firewall (UFW)
echo "Configuring firewall..."
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

echo "Server Setup Complete! Node $(node -v) and NPM $(npm -v) installed."
