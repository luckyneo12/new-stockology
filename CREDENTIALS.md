# 🔐 Stockology Blog - Credentials & Access

## 📊 Database Credentials (Hostinger MySQL)

### Connection Details
```
Hostname: srv1753.hstgr.io
Alternative IP: 193.203.184.192
Port: 3306
Database Name: u569154749_stockologyDB
Username: u569154749_StockologyDB
Password: Stockology@123
```

### Connection String
```
mysql://u569154749_StockologyDB:Stockology@123@srv1753.hstgr.io:3306/u569154749_stockologyDB
```

### phpMyAdmin Access
Login to Hostinger cPanel → phpMyAdmin to manage database visually.

---

## 👤 Admin Credentials

### Login Details
```
Email: stockology@gmail.com
Password: Xmv02441!
```

### Admin Panel URLs
- **Login**: http://localhost:3000/admin/login
- **Dashboard**: http://localhost:3000/admin/dashboard
- **Create Blog**: http://localhost:3000/admin/blogs/new

---

## 🔑 NextAuth Configuration

### Secret Key
```
NEXTAUTH_SECRET="kJ8mN2pQ5rT9vX3zA6bC8eF1gH4jK7lM9nP2qR5sT8uV1wX4yZ7aB0cD3eF6gH9j"
```

### URLs
```
Development: http://localhost:3000
Production: https://yourdomain.com
```

---

## 🌐 Access Points

### Local Development
| Service | URL |
|---------|-----|
| Homepage | http://localhost:3000 |
| Admin Login | http://localhost:3000/admin/login |
| Admin Dashboard | http://localhost:3000/admin/dashboard |
| Create Blog | http://localhost:3000/admin/blogs/new |
| Public Blogs | http://localhost:3000/blogs |
| Prisma Studio | http://localhost:5555 |
| API Docs | See API_TESTING.md |

### Production (After Deployment)
| Service | URL |
|---------|-----|
| Homepage | https://yourdomain.com |
| Admin Login | https://yourdomain.com/admin/login |
| Admin Dashboard | https://yourdomain.com/admin/dashboard |
| Public Blogs | https://yourdomain.com/blogs |

---

## 📝 Quick Commands

### Database Setup
```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# Open database GUI
npx prisma studio

# Test connection
npx prisma db pull
```

### Create Admin User
```bash
# Start dev server first
npm run dev

# Then in new terminal or browser
curl -X POST http://localhost:3000/api/auth/setup

# Or visit in browser:
# http://localhost:3000/api/auth/setup
```

### Login
```bash
# Open browser
http://localhost:3000/admin/login

# Enter credentials:
Email: stockology@gmail.com
Password: Xmv02441!
```

---

## 🔒 Security Notes

### ⚠️ Important for Production

1. **Change Admin Password**
   - Login to admin dashboard
   - Go to settings (when implemented)
   - Change password to something more secure

2. **Secure Database Access**
   - In Hostinger cPanel → Remote MySQL
   - Whitelist only your server IP
   - Don't use `%` (all IPs) in production

3. **Environment Variables**
   - Never commit `.env` to Git
   - Use different credentials for production
   - Keep `.env` file permissions restricted: `chmod 600 .env`

4. **HTTPS in Production**
   - Always use HTTPS in production
   - Update `NEXTAUTH_URL` to use `https://`
   - Enable SSL certificate in Hostinger

---

## 🗄️ Database Tables

### Tables Created
1. **Blog** - Stores all blog posts with images (BLOB)
2. **Admin** - Stores admin user credentials (hashed)

### View Tables
```bash
# Using Prisma Studio
npx prisma studio

# Using MySQL command line
mysql -h srv1753.hstgr.io -u u569154749_StockologyDB -p u569154749_stockologyDB
# Enter password: Stockology@123

# Then run:
SHOW TABLES;
DESCRIBE Blog;
DESCRIBE Admin;
```

---

## 🧪 Test Credentials

### For Testing API
```bash
# Login to get session
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"stockology@gmail.com","password":"Xmv02441!"}'
```

---

## 📋 Checklist

### First Time Setup
- [ ] npm install completed
- [ ] .env file configured
- [ ] Prisma Client generated
- [ ] Database schema pushed
- [ ] Admin user created
- [ ] Can login to dashboard
- [ ] Can create blog post
- [ ] Can upload image

### Before Production
- [ ] Change admin password
- [ ] Update NEXTAUTH_URL to production domain
- [ ] Whitelist server IP in Hostinger
- [ ] Enable HTTPS
- [ ] Test all features
- [ ] Setup database backups
- [ ] Configure monitoring

---

## 🆘 Emergency Access

### If You Forget Admin Password

**Option 1: Reset via Database**
```sql
-- Login to phpMyAdmin or MySQL
UPDATE Admin 
SET password = '$2a$10$YourNewHashedPassword' 
WHERE email = 'stockology@gmail.com';
```

**Option 2: Create New Admin**
```sql
-- Delete old admin
DELETE FROM Admin WHERE email = 'stockology@gmail.com';

-- Then run setup again
curl -X POST http://localhost:3000/api/auth/setup
```

### If Database Connection Fails

1. Check if MySQL service is running in Hostinger
2. Verify credentials in `.env`
3. Try IP address instead of hostname
4. Check if IP is whitelisted in Remote MySQL
5. Test connection: `npx prisma db pull`

---

## 📞 Support Contacts

### Hostinger Support
- Login to Hostinger account
- Go to Help → Contact Support
- For database issues, mention: u569154749_stockologyDB

### Technical Documentation
- See `BLOG_SETUP.md` for detailed setup
- See `API_TESTING.md` for API reference
- See `DEPLOYMENT.md` for production deployment
- See `TROUBLESHOOTING.md` for common issues

---

## ✅ Verification

### Test Everything Works
```bash
# 1. Test database connection
npx prisma db pull

# 2. Test dev server
npm run dev
# Should start on http://localhost:3000

# 3. Test admin creation
curl -X POST http://localhost:3000/api/auth/setup
# Should return: {"message":"Admin created successfully"}

# 4. Test login
# Open: http://localhost:3000/admin/login
# Use credentials above

# 5. Test API
curl http://localhost:3000/api/blogs
# Should return: {"blogs":[],"pagination":{...}}
```

---

## 🎯 Quick Reference Card

```
┌─────────────────────────────────────────────────┐
│         STOCKOLOGY BLOG - QUICK ACCESS          │
├─────────────────────────────────────────────────┤
│                                                 │
│  DATABASE                                       │
│  Host: srv1753.hstgr.io                        │
│  DB: u569154749_stockologyDB                   │
│  User: u569154749_StockologyDB                 │
│  Pass: Stockology@123                          │
│                                                 │
│  ADMIN LOGIN                                    │
│  Email: stockology@gmail.com                   │
│  Pass: Xmv02441!                               │
│  URL: http://localhost:3000/admin/login        │
│                                                 │
│  QUICK COMMANDS                                 │
│  Setup: npx prisma generate && npx prisma db push │
│  Start: npm run dev                            │
│  Admin: curl -X POST localhost:3000/api/auth/setup │
│  GUI: npx prisma studio                        │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

**🔐 Keep this file secure and never commit to public repositories!**

**Last Updated**: 2025-10-13
