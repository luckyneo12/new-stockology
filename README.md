# 📈 Stockology - Stock Market Blog Platform

A complete blog management system built with Next.js 14, TypeScript, Prisma, and MySQL. Features include full CRUD operations, image upload (stored as BLOB), admin dashboard, and public blog pages with search and pagination.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748)
![MySQL](https://img.shields.io/badge/MySQL-8-4479A1)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC)

## ✨ Features

- ✅ **Complete CRUD Operations** - Create, Read, Update, Delete blogs
- ✅ **Image Upload** - Store images as BLOB in MySQL database
- ✅ **Admin Dashboard** - Manage all blogs with search and filters
- ✅ **Authentication** - Secure admin login with NextAuth
- ✅ **Public Blog Pages** - Beautiful, responsive blog listing and detail pages
- ✅ **Search & Filter** - Full-text search and category filtering
- ✅ **Pagination** - Efficient pagination for large datasets
- ✅ **SEO Optimized** - Meta tags, Open Graph, and semantic URLs
- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **TypeScript** - Full type safety

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MySQL database (Hostinger or local)
- npm or yarn

### Installation

```bash
# 1. Install dependencies
npm install

# 2. Setup environment variables
cp .env.example .env
# Edit .env with your database credentials

# 3. Setup database
npx prisma generate
npx prisma db push

# 4. Create admin user
curl -X POST http://localhost:3000/api/auth/setup

# 5. Start development server
npm run dev
```

Visit `http://localhost:3000/admin/login` to access the admin dashboard.

### Automated Setup (Windows)

```powershell
.\setup.ps1
```

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/          # NextAuth & admin setup
│   │   └── blogs/         # Blog CRUD endpoints
│   ├── admin/
│   │   ├── login/         # Admin login page
│   │   ├── dashboard/     # Blog management
│   │   └── blogs/         # Create/Edit forms
│   ├── blogs/
│   │   ├── page.tsx       # Public blog listing
│   │   └── [slug]/        # Individual blog page
│   └── providers.tsx      # NextAuth provider
├── lib/
│   └── prisma.ts          # Prisma client
└── types/
    └── next-auth.d.ts     # NextAuth types

prisma/
└── schema.prisma          # Database schema
```

## 🗄️ Database Schema

### Blog Model
- `id` - Auto-increment primary key
- `title` - Blog title
- `slug` - SEO-friendly URL (auto-generated)
- `content` - Full blog content
- `excerpt` - Short description
- `category` - Blog category
- `author` - Author name
- `image` - Image stored as LONGBLOB
- `imageType` - MIME type of image
- `published` - Published status
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Admin Model
- `id` - Auto-increment primary key
- `email` - Admin email (unique)
- `password` - Hashed password
- `name` - Admin name
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## 🎯 Usage

### Admin Dashboard
1. Login at `/admin/login`
2. View all blogs at `/admin/dashboard`
3. Create new blog at `/admin/blogs/new`
4. Edit blog at `/admin/blogs/edit/[id]`
5. Delete blogs from dashboard

### Public Pages
- Blog listing: `/blogs`
- Individual blog: `/blogs/[slug]`

### API Endpoints
- `GET /api/blogs` - Get all blogs (with pagination, search, filter)
- `POST /api/blogs` - Create new blog
- `GET /api/blogs/[id]` - Get single blog
- `PUT /api/blogs/[id]` - Update blog
- `DELETE /api/blogs/[id]` - Delete blog
- `GET /api/blogs/slug/[slug]` - Get blog by slug

See [API_TESTING.md](./API_TESTING.md) for detailed API documentation.

## 🔧 Tech Stack

### Core
- **Next.js 14** - React framework with App Router
- **TypeScript 5** - Type safety
- **React 18** - UI library

### Database & ORM
- **Prisma 5** - Modern ORM
- **MySQL 8** - Database

### Authentication
- **NextAuth 4** - Authentication
- **bcryptjs** - Password hashing

### Styling
- **TailwindCSS 3** - Utility-first CSS
- **Lucide React** - Icon library
- **Framer Motion** - Animations

### Additional
- **React Hook Form** - Form handling
- **MUI** - Some UI components

## 📚 Documentation

- [📖 Quick Start Guide](./QUICK_START.md) - 5-minute setup
- [📘 Complete Setup Guide](./BLOG_SETUP.md) - Detailed documentation
- [🧪 API Testing Guide](./API_TESTING.md) - API endpoints and testing
- [🚀 Deployment Guide](./DEPLOYMENT.md) - Deploy to Hostinger
- [✨ Features List](./FEATURES.md) - All features and capabilities

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="mysql://username:password@host:3306/database_name"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Admin Credentials
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="your-password"
```

Generate `NEXTAUTH_SECRET`:
```bash
openssl rand -base64 32
```

## 🚢 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Hostinger

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.

Quick steps:
1. Setup MySQL database in cPanel
2. Configure environment variables
3. Upload files via FTP/Git
4. Install dependencies: `npm install --production`
5. Setup database: `npx prisma generate && npx prisma db push`
6. Start with PM2: `pm2 start npm --name "stockology" -- start`

## 🛠️ Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Open Prisma Studio (database GUI)
npx prisma studio

# Reset database (WARNING: Deletes all data)
npx prisma db push --force-reset
```

## 📊 Project Statistics

- **Total Files**: 20+ files created
- **API Endpoints**: 6 RESTful endpoints
- **Database Models**: 2 models
- **Admin Pages**: 4 pages
- **Public Pages**: 2 pages
- **Documentation**: 5 comprehensive guides
- **Lines of Code**: 3000+

## 🎨 Screenshots

### Admin Dashboard
- View all blogs with search and filters
- Create, edit, and delete blogs
- Image upload with preview
- Pagination support

### Public Blog Pages
- Responsive blog listing
- Individual blog detail pages
- Search and category filtering
- SEO-optimized URLs

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Test Prisma connection
npx prisma db pull

# Check DATABASE_URL in .env
cat .env | grep DATABASE_URL
```

### Prisma Client Issues
```bash
# Regenerate Prisma Client
npx prisma generate
```

### Port Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

See [BLOG_SETUP.md](./BLOG_SETUP.md) for more troubleshooting tips.

## 📝 License

Proprietary © Stockology Securities Private Limited

## 🤝 Contributing

This is a private project. For questions or issues, contact the development team.

## 📞 Support

For technical support:
1. Check documentation files
2. Review API testing guide
3. Check application logs
4. Contact system administrator

## 🎉 Acknowledgments

Built with modern web technologies for optimal performance and developer experience.

---

**Made with ❤️ for Stockology Securities**
