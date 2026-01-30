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
# Make sure to not block ssh if enabling enable
# sudo ufw --force enable # Commenting out to avoid accidental lockout if ssh rule fails

# Install PostgreSQL
echo "Installing PostgreSQL..."
sudo apt-get install -y postgresql postgresql-contrib

# Setup Database
echo "Setting up Database..."
sudo systemctl start postgresql
sudo systemctl enable postgresql
# Create user and db strictly if they don't exist is hard in one line, but valid psql commands often fail gracefully or we ignore errors for idempotency
sudo -u postgres psql -c "CREATE USER manifestia WITH PASSWORD 'manifestia123!';" || echo "User likely exists"
sudo -u postgres psql -c "CREATE DATABASE manifestia OWNER manifestia;" || echo "DB likely exists"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE manifestia TO manifestia;" || echo "Privileges likely granted"

echo "Server Setup Complete! Node $(node -v), NPM $(npm -v), and Postgres installed."

