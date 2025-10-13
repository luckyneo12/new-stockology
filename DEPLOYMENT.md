# 🚀 Deployment Guide - Hostinger

## Prerequisites

- Hostinger hosting account with Node.js support
- MySQL database created in cPanel
- Domain name configured
- SSH access (recommended)

---

## 📋 Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] Database schema finalized
- [ ] Environment variables documented
- [ ] Build succeeds without errors
- [ ] Admin user credentials secured
- [ ] Images tested and working
- [ ] API endpoints tested

---

## 🗄️ Step 1: Database Setup

### 1.1 Create MySQL Database in cPanel

1. Login to Hostinger cPanel
2. Go to **MySQL Databases**
3. Create new database:
   - Database name: `u123456789_stockology`
4. Create database user:
   - Username: `u123456789_admin`
   - Password: Generate strong password
5. Add user to database with **ALL PRIVILEGES**
6. Note down:
   - Database name
   - Username
   - Password
   - Host (usually `localhost`)

### 1.2 Get Database Connection Details

```
Host: localhost
Port: 3306
Database: u123456789_stockology
Username: u123456789_admin
Password: [your-password]
```

---

## 🔧 Step 2: Prepare Application

### 2.1 Update Environment Variables

Create `.env.production`:

```env
# Database
DATABASE_URL="mysql://u123456789_admin:YOUR_PASSWORD@localhost:3306/u123456789_stockology"

# NextAuth
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="your-production-secret-key"

# Admin
ADMIN_EMAIL="admin@yourdomain.com"
ADMIN_PASSWORD="secure-production-password"
```

### 2.2 Update next.config.mjs

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // For optimized deployment
  images: {
    domains: ['yourdomain.com'],
  },
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Adjust based on your needs
    },
  },
};

export default nextConfig;
```

### 2.3 Build Application Locally

```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Build for production
npm run build
```

Test the build:
```bash
npm start
```

---

## 📤 Step 3: Upload Files

### Option A: Using File Manager (cPanel)

1. Compress your project:
```bash
# Exclude node_modules
tar -czf stockology.tar.gz \
  --exclude=node_modules \
  --exclude=.git \
  --exclude=.next/cache \
  .
```

2. Upload to Hostinger:
   - Go to cPanel → File Manager
   - Navigate to `public_html` or your domain folder
   - Upload `stockology.tar.gz`
   - Extract the archive

### Option B: Using FTP/SFTP

Use FileZilla or similar:
- Host: ftp.yourdomain.com
- Username: Your cPanel username
- Password: Your cPanel password
- Port: 21 (FTP) or 22 (SFTP)

Upload these files/folders:
- `src/`
- `public/`
- `prisma/`
- `.next/` (if pre-built)
- `package.json`
- `package-lock.json`
- `next.config.mjs`
- `tsconfig.json`
- `.env.production` (rename to `.env`)

### Option C: Using Git (Recommended)

```bash
# SSH into your server
ssh username@yourdomain.com

# Clone repository
cd public_html
git clone https://github.com/yourusername/stockology.git
cd stockology

# Copy environment file
cp .env.example .env
# Edit .env with production values
nano .env
```

---

## 🔨 Step 4: Server Setup

### 4.1 SSH into Server

```bash
ssh username@yourdomain.com
cd public_html/stockology
```

### 4.2 Install Node.js (if not installed)

Check Node.js version:
```bash
node --version
npm --version
```

If not installed, use Hostinger's Node.js selector in cPanel or install via nvm:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
```

### 4.3 Install Dependencies

```bash
npm install --production
```

### 4.4 Setup Prisma

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Verify connection
npx prisma db pull
```

### 4.5 Build Application (if not pre-built)

```bash
npm run build
```

---

## 🚀 Step 5: Start Application

### Option A: Using PM2 (Recommended)

```bash
# Install PM2 globally
npm install -g pm2

# Start application
pm2 start npm --name "stockology" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup

# Check status
pm2 status

# View logs
pm2 logs stockology
```

PM2 Commands:
```bash
pm2 restart stockology    # Restart app
pm2 stop stockology       # Stop app
pm2 delete stockology     # Remove app
pm2 logs stockology       # View logs
pm2 monit                 # Monitor resources
```

### Option B: Using Node directly

```bash
# Start in background
nohup npm start > app.log 2>&1 &

# Check if running
ps aux | grep node

# View logs
tail -f app.log
```

### Option C: Using systemd service

Create `/etc/systemd/system/stockology.service`:

```ini
[Unit]
Description=Stockology Blog Application
After=network.target

[Service]
Type=simple
User=your-username
WorkingDirectory=/home/your-username/public_html/stockology
ExecStart=/usr/bin/npm start
Restart=on-failure
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable stockology
sudo systemctl start stockology
sudo systemctl status stockology
```

---

## 🌐 Step 6: Configure Web Server

### For Apache (.htaccess)

Create `.htaccess` in your domain root:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteRule ^$ http://127.0.0.1:3000/ [P,L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]
</IfModule>
```

### For Nginx

Edit Nginx configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Restart Nginx:
```bash
sudo systemctl restart nginx
```

---

## 🔐 Step 7: Setup Admin User

Visit your domain:
```
https://yourdomain.com/api/auth/setup
```

Or use curl:
```bash
curl -X POST https://yourdomain.com/api/auth/setup
```

---

## 🔒 Step 8: Security Hardening

### 8.1 Secure Environment Variables

```bash
# Set proper permissions
chmod 600 .env

# Ensure .env is not publicly accessible
# Add to .htaccess:
<Files .env>
    Order allow,deny
    Deny from all
</Files>
```

### 8.2 Enable HTTPS

1. In cPanel, go to **SSL/TLS Status**
2. Enable AutoSSL or install Let's Encrypt certificate
3. Update `NEXTAUTH_URL` in `.env` to use `https://`

### 8.3 Configure Firewall

```bash
# Allow only necessary ports
sudo ufw allow 22    # SSH
sudo ufw allow 80    # HTTP
sudo ufw allow 443   # HTTPS
sudo ufw enable
```

### 8.4 Secure MySQL

```bash
# Run MySQL secure installation
mysql_secure_installation

# Create database backup user with read-only access
```

---

## 📊 Step 9: Monitoring & Maintenance

### 9.1 Setup Logging

```bash
# Create logs directory
mkdir -p logs

# Update PM2 to use custom logs
pm2 start npm --name "stockology" -- start \
  --log logs/app.log \
  --error logs/error.log
```

### 9.2 Database Backups

Create backup script `backup.sh`:

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/home/username/backups"
DB_NAME="u123456789_stockology"
DB_USER="u123456789_admin"
DB_PASS="your-password"

mkdir -p $BACKUP_DIR

mysqldump -u $DB_USER -p$DB_PASS $DB_NAME > $BACKUP_DIR/backup_$DATE.sql

# Keep only last 7 days
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete
```

Make executable and add to cron:
```bash
chmod +x backup.sh

# Add to crontab (daily at 2 AM)
crontab -e
0 2 * * * /home/username/backup.sh
```

### 9.3 Monitor Application

```bash
# Check PM2 status
pm2 status

# Monitor resources
pm2 monit

# View logs
pm2 logs stockology --lines 100

# Check disk space
df -h

# Check memory
free -m
```

---

## 🔄 Step 10: Updates & Maintenance

### Deploying Updates

```bash
# SSH into server
ssh username@yourdomain.com
cd public_html/stockology

# Pull latest changes (if using Git)
git pull origin main

# Install new dependencies
npm install --production

# Regenerate Prisma Client (if schema changed)
npx prisma generate
npx prisma db push

# Rebuild application
npm run build

# Restart application
pm2 restart stockology

# Check status
pm2 status
pm2 logs stockology
```

### Database Migrations

```bash
# Create migration
npx prisma migrate dev --name migration_name

# Apply migration in production
npx prisma migrate deploy
```

---

## 🐛 Troubleshooting

### Application won't start

```bash
# Check logs
pm2 logs stockology

# Check if port 3000 is in use
netstat -tuln | grep 3000

# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Restart
pm2 restart stockology
```

### Database connection errors

```bash
# Test MySQL connection
mysql -u u123456789_admin -p u123456789_stockology

# Check DATABASE_URL in .env
cat .env | grep DATABASE_URL

# Test Prisma connection
npx prisma db pull
```

### 502 Bad Gateway

- Check if Node.js app is running: `pm2 status`
- Check Nginx/Apache configuration
- Check firewall rules
- Verify proxy settings

### Out of Memory

```bash
# Increase Node.js memory limit
NODE_OPTIONS="--max-old-space-size=2048" npm start

# Or in PM2
pm2 start npm --name "stockology" -- start --node-args="--max-old-space-size=2048"
```

---

## ✅ Post-Deployment Checklist

- [ ] Application accessible via domain
- [ ] HTTPS enabled and working
- [ ] Admin login working
- [ ] Can create blog posts
- [ ] Images uploading and displaying
- [ ] Public blog pages working
- [ ] Search and filter working
- [ ] Database backups configured
- [ ] Monitoring setup
- [ ] Error logs accessible
- [ ] PM2 auto-restart enabled
- [ ] Firewall configured
- [ ] Environment variables secured

---

## 📞 Support

If you encounter issues:

1. Check application logs: `pm2 logs stockology`
2. Check web server logs: `/var/log/nginx/error.log` or `/var/log/apache2/error.log`
3. Verify database connection: `npx prisma studio`
4. Test API endpoints: See `API_TESTING.md`
5. Contact Hostinger support for server-specific issues

---

## 🎉 Success!

Your blog system is now deployed and running on Hostinger!

**Access Points:**
- Website: https://yourdomain.com
- Admin: https://yourdomain.com/admin/login
- Blogs: https://yourdomain.com/blogs

**Next Steps:**
1. Create your first blog post
2. Customize design and branding
3. Setup analytics (Google Analytics, etc.)
4. Configure SEO settings
5. Add social media sharing
6. Setup email notifications
