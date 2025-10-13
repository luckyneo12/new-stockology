# 🚀 Hostinger MySQL Setup Guide

## ✅ Your Database Credentials

**MySQL Server Details:**
- **Hostname**: `srv1753.hstgr.io` (or IP: `193.203.184.192`)
- **Database Name**: `u569154749_stockologyDB`
- **Username**: `u569154749_StockologyDB`
- **Password**: `Stockology@123`
- **Port**: `3306`

**Connection String:**
```
mysql://u569154749_StockologyDB:Stockology@123@srv1753.hstgr.io:3306/u569154749_stockologyDB
```

---

## 🔧 Quick Setup Steps

### 1. Environment is Already Configured ✓

The `.env` file has been created with your Hostinger credentials:

```env
DATABASE_URL="mysql://u569154749_StockologyDB:Stockology@123@srv1753.hstgr.io:3306/u569154749_stockologyDB"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="kJ8mN2pQ5rT9vX3zA6bC8eF1gH4jK7lM9nP2qR5sT8uV1wX4yZ7aB0cD3eF6gH9j"
ADMIN_EMAIL="stockology@gmail.com"
ADMIN_PASSWORD="Xmv02441!"
```

### 2. Wait for Dependencies to Install

The `npm install` command is currently running. Wait for it to complete.

### 3. Setup Database Schema

Once npm install completes, run:

```bash
npx prisma generate
npx prisma db push
```

This will:
- Generate Prisma Client
- Create the `Blog` and `Admin` tables in your Hostinger MySQL database

### 4. Create Admin User

Start the dev server and create admin:

```bash
# Terminal 1: Start dev server
npm run dev

# Terminal 2: Create admin user (in a new terminal)
curl -X POST http://localhost:3000/api/auth/setup
```

Or simply visit in your browser:
```
http://localhost:3000/api/auth/setup
```

### 5. Login to Admin Dashboard

Open your browser and go to:
```
http://localhost:3000/admin/login
```

**Login Credentials:**
- Email: `admin@stockology.com`
- Password: `Admin@Stockology2025`

---

## 📊 Database Tables Created

After running `npx prisma db push`, these tables will be created:

### Blog Table
```sql
CREATE TABLE Blog (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt VARCHAR(500),
  category VARCHAR(100) NOT NULL,
  author VARCHAR(100) NOT NULL,
  image LONGBLOB,
  imageType VARCHAR(50),
  published BOOLEAN DEFAULT FALSE,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_category (category),
  INDEX idx_published (published)
);
```

### Admin Table
```sql
CREATE TABLE Admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
);
```

---

## 🔍 Verify Database Connection

### Option 1: Using Prisma Studio
```bash
npx prisma studio
```
This opens a GUI at `http://localhost:5555` to view your database.

### Option 2: Using MySQL Command Line
```bash
mysql -h srv1753.hstgr.io -u u569154749_StockologyDB -p u569154749_stockologyDB
# Enter password: Stockology@123
```

### Option 3: Test Connection with Prisma
```bash
npx prisma db pull
```
If successful, your connection is working!

---

## 🎯 Access Points

Once everything is set up:

### Local Development
- **Homepage**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **Admin Dashboard**: http://localhost:3000/admin/dashboard
- **Create Blog**: http://localhost:3000/admin/blogs/new
- **Public Blogs**: http://localhost:3000/blogs
- **Prisma Studio**: http://localhost:5555 (run `npx prisma studio`)

### Admin Credentials
- **Email**: stockology@gmail.com
- **Password**: Xmv02441!

---

## 🐛 Troubleshooting

### Connection Refused Error

If you get a connection error, try the IP address instead:

Edit `.env`:
```env
DATABASE_URL="mysql://u569154749_StockologyDB:Stockology@123@193.203.184.192:3306/u569154749_stockologyDB"
```

### Access Denied Error

1. Check if your IP is whitelisted in Hostinger cPanel
2. Go to cPanel → Remote MySQL
3. Add your IP address or use `%` for all IPs (not recommended for production)

### Prisma Connection Error

If Prisma can't connect, check:
```bash
# Test with mysql command
mysql -h srv1753.hstgr.io -u u569154749_StockologyDB -p
# Enter password when prompted
```

### Database Already Exists Error

If tables already exist:
```bash
# Reset database (WARNING: Deletes all data)
npx prisma db push --force-reset

# Or manually drop tables in phpMyAdmin
```

---

## 📝 Next Steps After Setup

1. ✅ Create your first blog post
2. ✅ Upload an image
3. ✅ Test search and filter
4. ✅ View on public page
5. ✅ Test edit and delete

---

## 🚀 Production Deployment

When ready to deploy to Hostinger hosting:

### Update Environment Variables
```env
# For production
NEXTAUTH_URL="https://yourdomain.com"
DATABASE_URL="mysql://u569154749_StockologyDB:Stockology@123@srv1753.hstgr.io:3306/u569154749_stockologyDB"
```

### Build and Deploy
```bash
npm run build
npm start
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.

---

## 📊 Database Size

Your current database: **1 MB**

**Estimated Capacity:**
- Text-only blogs: ~1000 posts
- Blogs with images (500KB each): ~2 posts

**Recommendation**: 
- Upgrade database size if planning many image-heavy posts
- Consider external image hosting (Cloudinary, AWS S3) for production
- Current BLOB storage is fine for testing and small-scale use

---

## 🔐 Security Notes

### Important for Production:

1. **Change Admin Password**
   ```sql
   -- After first login, change password in admin settings
   ```

2. **Whitelist IPs**
   - In Hostinger cPanel → Remote MySQL
   - Add only your server IP
   - Don't use `%` (all IPs) in production

3. **Use Strong Passwords**
   - Current password is for development only
   - Use a password manager for production

4. **Enable SSL**
   - Hostinger supports SSL connections
   - Update connection string with `?ssl=true`

---

## ✅ Setup Checklist

- [x] Database credentials configured in `.env`
- [ ] Dependencies installed (`npm install`)
- [ ] Prisma Client generated (`npx prisma generate`)
- [ ] Database schema pushed (`npx prisma db push`)
- [ ] Admin user created (visit `/api/auth/setup`)
- [ ] Can login to admin dashboard
- [ ] Can create blog post
- [ ] Can upload image
- [ ] Can view blog on public page
- [ ] Search and filter working

---

## 🎉 You're All Set!

Your Hostinger MySQL database is configured and ready to use. Just complete the setup steps above and start blogging!

**Need Help?**
- Check [BLOG_SETUP.md](./BLOG_SETUP.md) for detailed setup
- See [API_TESTING.md](./API_TESTING.md) for API documentation
- Review [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment

---

**Database Status**: ✅ Configured and Ready
**Next Step**: Wait for `npm install` to complete, then run database setup commands
