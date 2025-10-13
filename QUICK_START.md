# 🚀 Quick Start Guide

## 5-Minute Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Create `.env` File
```env
DATABASE_URL="mysql://username:password@host:3306/database_name"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="run: openssl rand -base64 32"
ADMIN_EMAIL="stockology@gmail.com"
ADMIN_PASSWORD="Xmv02441!"
```

### 3. Setup Database
```bash
npx prisma generate
npx prisma db push
```

### 4. Create Admin User
```bash
curl -X POST http://localhost:3000/api/auth/setup
```

### 5. Start Server
```bash
npm run dev
```

## 🎯 Access Points

- **Admin Login**: http://localhost:3000/admin/login
- **Admin Dashboard**: http://localhost:3000/admin/dashboard
- **Create Blog**: http://localhost:3000/admin/blogs/new
- **Public Blogs**: http://localhost:3000/blogs

## 📝 First Blog Post

1. Login with admin credentials
2. Click "Add New Blog"
3. Fill form:
   - Title: "My First Blog Post"
   - Content: Your blog content
   - Category: Select from dropdown
   - Author: Your name
   - Upload image (optional)
   - Check "Publish immediately"
4. Click "Create Blog"
5. View at: http://localhost:3000/blogs

## 🔑 Default Admin Credentials

Use the email and password you set in `.env`:
- Email: Value of `ADMIN_EMAIL`
- Password: Value of `ADMIN_PASSWORD`

## ⚡ Common Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# View database in browser
npx prisma studio

# Reset database (WARNING: Deletes all data)
npx prisma db push --force-reset
```

## 🎨 Features at a Glance

### Admin Dashboard
- ✅ View all blogs
- ✅ Search & filter
- ✅ Create new blog
- ✅ Edit existing blog
- ✅ Delete blog
- ✅ Pagination

### Public Pages
- ✅ Blog listing with pagination
- ✅ Search blogs
- ✅ Filter by category
- ✅ Individual blog pages
- ✅ SEO-friendly URLs
- ✅ Responsive design

### Image Handling
- ✅ Upload via form
- ✅ Store as BLOB in MySQL
- ✅ Display via base64
- ✅ Preview before upload

## 🐛 Quick Fixes

**Can't connect to database?**
```bash
# Check your DATABASE_URL in .env
# Format: mysql://USER:PASSWORD@HOST:PORT/DATABASE
```

**Prisma errors?**
```bash
npx prisma generate
npx prisma db push
```

**Admin already exists?**
```bash
# Admin user already created, use existing credentials
# Or delete from database and run setup again
```

**Port 3000 already in use?**
```bash
# Kill the process or use different port
npm run dev -- -p 3001
```

## 📚 Need More Help?

See `BLOG_SETUP.md` for detailed documentation.
