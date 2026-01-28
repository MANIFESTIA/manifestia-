# Manifestia AWS Deployment Guide

This guide covers how to set up your AWS server and deploy your application.

## Part 1: AWS EC2 Instance Setup (Manual)

1.  **Log in to AWS Console**: Go to [aws.amazon.com](https://aws.amazon.com) and log in.
2.  **Select Region**: Top right corner, select a region close to you (e.g., `Frankfurt (eu-central-1)` or `Ireland`).
3.  **Go to EC2 Service**: Search for "EC2" in the top search bar and click it.
4.  **Launch Instance**:
    *   Click the orange **"Launch Instance"** button.
    *   **Name**: Enter `Manifestia-Server`.
    *   **OS Images**: Select **Ubuntu** (Make sure it says "Free tier eligible", usually Ubuntu Server 24.04 LTS).
    *   **Instance Type**: Select `t2.micro` or `t3.micro` (Free tier eligible).
    *   **Key Pair (Login)**:
        *   Click "Create new key pair".
        *   Name: `manifestia-key`.
        *   Type: `RSA`.
        *   Format: `.pem` (for OpenSSH).
        *   Click **Create key pair**. **IMPORTANT**: A file will download. Save this safely! You cannot download it again.
    *   **Network Settings**:
        *   Check **Allow SSH traffic from**. Select "Anywhere" (0.0.0.0/0) or "My IP" (safer).
        *   Check **Allow HTTPS traffic from the internet**.
        *   Check **Allow HTTP traffic from the internet**.
    *   **Storage**: Default (8 GiB gp3) is fine. You can increase to 20-30 GiB within free tier limits if needed.
    *   Click **Launch Instance**.

5.  **Get Public IP**:
    *   Go back to the "Instances" list.
    *   Click on your new instance.
    *   Copy the **Public IPv4 address** (e.g., `3.120.x.x`).

## Part 2: Connect to Server

1.  Open your terminal on your computer (Powershell or Command Prompt).
2.  Navigate to where you saved the key file (e.g., `cd Downloads`).
3.  Run this command (replace `x.x.x.x` with your server IP):
    ```powershell
    ssh -i manifestia-key.pem ubuntu@x.x.x.x
    ```
    *   If asked "Are you sure you want to continue connecting?", type `yes`.
    *   *Note: If you get a "Permissions" error on Windows, it's usually fine. On Mac/Linux, you'd need `chmod 400 manifestia-key.pem`.*

## Part 3: Deployment

Once logged into the server:

1.  **Clone Your Repository**:
    ```bash
    git clone https://github.com/YOUR_GITHUB_USERNAME/manifestia.git
    cd manifestia
    ```
    *(You may need to log in to GitHub or set up a token if the repo is private)*.

2.  **Run Setup Script**:
    ```bash
    chmod +x scripts/setup-server.sh
    ./scripts/setup-server.sh
    ```
    This script will install Node.js, Nginx, PM2, and configure the firewall.

3.  **Setup Environment Variables**:
    Create the `.env.local` file:
    ```bash
    nano .env.local
    ```
    Paste your environment variables (API credentials, etc.) here. Press `Ctrl+O`, `Enter`, then `Ctrl+X` to save and exit.

4.  **Start Application**:
    ```bash
    chmod +x scripts/deploy.sh
    ./scripts/deploy.sh
    ```

5.  **Access Your Site**:
    Open your browser and verify you can access the site via the IP address.
