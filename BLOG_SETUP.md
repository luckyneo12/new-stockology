# Blog System Setup Guide

## 📋 Overview

Complete blog CRUD system with:
- ✅ Image upload (stored as BLOB in MySQL)
- ✅ Admin Dashboard with authentication
- ✅ Public blog pages with pagination & search
- ✅ Category filtering
- ✅ SEO-friendly URLs (slug-based)
- ✅ Responsive design

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Database - Replace with your Hostinger MySQL credentials
DATABASE_URL="mysql://username:password@host:port/database_name"

# Example for Hostinger:
# DATABASE_URL="mysql://u123456789_dbuser:YourPassword@localhost:3306/u123456789_stockology"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-a-secret-key-here"

# Admin Credentials (for initial setup)
ADMIN_EMAIL="admin@stockology.com"
ADMIN_PASSWORD="your-secure-password"
```

**Generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### 3. Setup Database

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database
npx prisma db push

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

### 4. Create Admin User

Make a POST request to create the initial admin:

```bash
curl -X POST http://localhost:3000/api/auth/setup
```

Or visit: `http://localhost:3000/api/auth/setup` in your browser

### 5. Run Development Server

```bash
npm run dev
```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── [...nextauth]/route.ts    # NextAuth configuration
│   │   │   └── setup/route.ts            # Admin setup endpoint
│   │   └── blogs/
│   │       ├── route.ts                  # GET all blogs, POST new blog
│   │       ├── [id]/route.ts             # GET, PUT, DELETE by ID
│   │       └── slug/[slug]/route.ts      # GET by slug (public)
│   ├── admin/
│   │   ├── login/page.tsx                # Admin login
│   │   ├── dashboard/page.tsx            # Blog management dashboard
│   │   └── blogs/
│   │       ├── new/page.tsx              # Create new blog
│   │       └── edit/[id]/page.tsx        # Edit existing blog
│   ├── blogs/
│   │   ├── page.tsx                      # Public blog listing
│   │   └── [slug]/page.tsx               # Single blog view
│   └── providers.tsx                     # NextAuth SessionProvider
├── lib/
│   ├── prisma.ts                         # Prisma client instance
│   └── utils.ts                          # Utility functions
└── types/
    └── next-auth.d.ts                    # NextAuth type definitions

prisma/
└── schema.prisma                         # Database schema
```

## 🎯 Features

### Admin Dashboard (`/admin/dashboard`)
- View all blogs in a table
- Search blogs by title/content
- Filter by category
- Delete blogs with confirmation
- Edit existing blogs
- Create new blogs
- Pagination support

### Blog Management
- **Create**: Form with image upload at `/admin/blogs/new`
- **Read**: View all blogs at `/admin/dashboard`
- **Update**: Edit form at `/admin/blogs/edit/[id]`
- **Delete**: Delete button in dashboard

### Public Pages
- **Blog Listing** (`/blogs`): Paginated list with search & filter
- **Blog Detail** (`/blogs/[slug]`): Individual blog page with SEO-friendly URL
- **Image Display**: Images stored as BLOB, displayed via base64

### Image Handling
- Images uploaded via FormData
- Stored as LONGBLOB in MySQL
- Converted to base64 for display
- Image type (MIME) stored separately

## 🔐 Authentication

### Admin Login
- URL: `/admin/login`
- Uses NextAuth with credentials provider
- Protected routes redirect to login

### Protected Routes
All `/admin/*` routes require authentication.

## 📊 Database Schema

### Blog Table
```prisma
model Blog {
  id          Int      @id @default(autoincrement())
  title       String   @db.VarChar(255)
  slug        String   @unique @db.VarChar(255)
  content     String   @db.Text
  excerpt     String?  @db.VarChar(500)
  category    String   @db.VarChar(100)
  author      String   @db.VarChar(100)
  image       Bytes?   @db.LongBlob
  imageType   String?  @db.VarChar(50)
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Admin Table
```prisma
model Admin {
  id        Int      @id @default(autoincrement())
  email     String   @unique @db.VarChar(255)
  password  String   @db.VarChar(255)
  name      String   @db.VarChar(100)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🌐 API Endpoints

### Blogs
- `GET /api/blogs` - Get all blogs (with pagination, search, filter)
- `POST /api/blogs` - Create new blog (FormData with image)
- `GET /api/blogs/[id]` - Get single blog by ID
- `PUT /api/blogs/[id]` - Update blog (FormData with image)
- `DELETE /api/blogs/[id]` - Delete blog
- `GET /api/blogs/slug/[slug]` - Get blog by slug (public)

### Query Parameters for GET /api/blogs
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `search` - Search in title/content/excerpt
- `category` - Filter by category
- `published` - Filter by published status (true/false)

### Authentication
- `POST /api/auth/setup` - Create initial admin (one-time)
- `POST /api/auth/signin` - Login (handled by NextAuth)
- `POST /api/auth/signout` - Logout (handled by NextAuth)

## 🎨 Categories

Default categories:
- Stock Market
- Investment
- Trading
- Analysis
- News
- Education

You can add more in the form select dropdowns.

## 🚢 Deployment to Hostinger

### 1. Database Setup
1. Create MySQL database in Hostinger cPanel
2. Note down: database name, username, password, host
3. Update `DATABASE_URL` in `.env`

### 2. Build Application
```bash
npm run build
```

### 3. Deploy Files
Upload the following to your Hostinger hosting:
- `.next/` folder
- `public/` folder
- `prisma/` folder
- `package.json`
- `package-lock.json`
- `.env` (with production values)
- `next.config.mjs`

### 4. Install Dependencies on Server
```bash
npm install --production
```

### 5. Setup Database
```bash
npx prisma generate
npx prisma db push
```

### 6. Create Admin User
Visit: `https://yourdomain.com/api/auth/setup`

### 7. Start Application
```bash
npm start
```

Or use PM2 for process management:
```bash
npm install -g pm2
pm2 start npm --name "stockology" -- start
pm2 save
pm2 startup
```

## 🔧 Configuration

### Image Upload Limits
Default Next.js limits:
- Max file size: 4.5MB (can be increased in `next.config.mjs`)

To increase:
```javascript
// next.config.mjs
const nextConfig = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};
```

### MySQL BLOB Size
- LONGBLOB supports up to 4GB
- Recommended: Keep images under 5MB for performance

## 📝 Usage Examples

### Creating a Blog Post
1. Login at `/admin/login`
2. Click "Add New Blog" in dashboard
3. Fill in all fields
4. Upload an image (optional)
5. Check "Publish immediately" if ready
6. Click "Create Blog"

### Editing a Blog
1. Go to `/admin/dashboard`
2. Click edit icon on the blog
3. Modify fields
4. Upload new image (optional, keeps old if not changed)
5. Click "Update Blog"

### Viewing Public Blogs
- All blogs: `/blogs`
- Single blog: `/blogs/[slug]` (e.g., `/blogs/stock-market-analysis`)

## 🐛 Troubleshooting

### "Cannot connect to database"
- Check DATABASE_URL in `.env`
- Verify MySQL credentials
- Ensure database exists
- Check if MySQL port is correct (usually 3306)

### "Prisma Client not found"
Run: `npx prisma generate`

### "Admin already exists" error
Admin user already created. Use existing credentials or manually delete from database.

### Images not displaying
- Check if image was uploaded successfully
- Verify BLOB column type is LONGBLOB
- Check browser console for base64 errors

### Authentication not working
- Verify NEXTAUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain
- Clear browser cookies and try again

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Next.js App Router](https://nextjs.org/docs/app)

## ✅ Checklist

- [ ] Dependencies installed
- [ ] `.env` file configured
- [ ] Database connection working
- [ ] Prisma schema pushed to database
- [ ] Admin user created
- [ ] Can login to admin dashboard
- [ ] Can create blog post with image
- [ ] Can view blog on public page
- [ ] Can edit and delete blogs
- [ ] Search and filter working
- [ ] Pagination working

## 🎉 You're Done!

Your blog system is now ready to use. Access:
- **Admin Dashboard**: `http://localhost:3000/admin/dashboard`
- **Public Blogs**: `http://localhost:3000/blogs`
