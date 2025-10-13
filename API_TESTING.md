# 🧪 API Testing Guide

## API Endpoints Reference

### Base URL
- Development: `http://localhost:3000`
- Production: `https://yourdomain.com`

---

## 📝 Blog Endpoints

### 1. Get All Blogs
**GET** `/api/blogs`

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `search` (optional): Search term
- `category` (optional): Filter by category
- `published` (optional): Filter by published status (true/false)

**Example Requests:**

```bash
# Get all blogs (first page)
curl http://localhost:3000/api/blogs

# Get page 2 with 5 items
curl "http://localhost:3000/api/blogs?page=2&limit=5"

# Search for "stock market"
curl "http://localhost:3000/api/blogs?search=stock%20market"

# Filter by category
curl "http://localhost:3000/api/blogs?category=Investment"

# Get only published blogs
curl "http://localhost:3000/api/blogs?published=true"

# Combined filters
curl "http://localhost:3000/api/blogs?category=Trading&published=true&page=1&limit=10"
```

**Response:**
```json
{
  "blogs": [
    {
      "id": 1,
      "title": "Understanding Stock Market Basics",
      "slug": "understanding-stock-market-basics",
      "excerpt": "A comprehensive guide to stock market fundamentals",
      "category": "Education",
      "author": "John Doe",
      "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
      "published": true,
      "createdAt": "2025-10-13T06:30:00.000Z",
      "updatedAt": "2025-10-13T06:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
```

---

### 2. Create New Blog
**POST** `/api/blogs`

**Content-Type:** `multipart/form-data`

**Form Fields:**
- `title` (required): Blog title
- `content` (required): Blog content
- `excerpt` (optional): Short description
- `category` (required): Blog category
- `author` (required): Author name
- `published` (optional): "true" or "false" (default: false)
- `image` (optional): Image file

**Example Request:**

```bash
# Using curl
curl -X POST http://localhost:3000/api/blogs \
  -F "title=My First Blog Post" \
  -F "content=This is the full content of my blog post..." \
  -F "excerpt=A short description" \
  -F "category=Stock Market" \
  -F "author=John Doe" \
  -F "published=true" \
  -F "image=@/path/to/image.jpg"
```

**Using JavaScript (Fetch):**
```javascript
const formData = new FormData();
formData.append('title', 'My First Blog Post');
formData.append('content', 'This is the full content...');
formData.append('excerpt', 'A short description');
formData.append('category', 'Stock Market');
formData.append('author', 'John Doe');
formData.append('published', 'true');
formData.append('image', fileInput.files[0]);

const response = await fetch('/api/blogs', {
  method: 'POST',
  body: formData,
});

const data = await response.json();
```

**Response (Success):**
```json
{
  "message": "Blog created successfully",
  "blog": {
    "id": 1,
    "title": "My First Blog Post",
    "slug": "my-first-blog-post",
    "content": "This is the full content...",
    "excerpt": "A short description",
    "category": "Stock Market",
    "author": "John Doe",
    "published": true,
    "createdAt": "2025-10-13T06:30:00.000Z",
    "updatedAt": "2025-10-13T06:30:00.000Z"
  }
}
```

**Response (Error):**
```json
{
  "error": "Missing required fields"
}
```

---

### 3. Get Single Blog by ID
**GET** `/api/blogs/[id]`

**Example Request:**
```bash
curl http://localhost:3000/api/blogs/1
```

**Response:**
```json
{
  "id": 1,
  "title": "Understanding Stock Market Basics",
  "slug": "understanding-stock-market-basics",
  "content": "Full blog content here...",
  "excerpt": "A comprehensive guide",
  "category": "Education",
  "author": "John Doe",
  "image": "data:image/jpeg;base64,/9j/4AAQSkZJRg...",
  "published": true,
  "createdAt": "2025-10-13T06:30:00.000Z",
  "updatedAt": "2025-10-13T06:30:00.000Z"
}
```

---

### 4. Get Blog by Slug (Public)
**GET** `/api/blogs/slug/[slug]`

**Example Request:**
```bash
curl http://localhost:3000/api/blogs/slug/understanding-stock-market-basics
```

**Response:** Same as Get Single Blog by ID

---

### 5. Update Blog
**PUT** `/api/blogs/[id]`

**Content-Type:** `multipart/form-data`

**Form Fields:** Same as Create Blog (all optional except what you want to update)

**Example Request:**
```bash
curl -X PUT http://localhost:3000/api/blogs/1 \
  -F "title=Updated Blog Title" \
  -F "content=Updated content..." \
  -F "published=true" \
  -F "image=@/path/to/new-image.jpg"
```

**Response:**
```json
{
  "message": "Blog updated successfully",
  "blog": {
    "id": 1,
    "title": "Updated Blog Title",
    "slug": "updated-blog-title",
    "content": "Updated content...",
    "published": true,
    "updatedAt": "2025-10-13T07:00:00.000Z"
  }
}
```

---

### 6. Delete Blog
**DELETE** `/api/blogs/[id]`

**Example Request:**
```bash
curl -X DELETE http://localhost:3000/api/blogs/1
```

**Response:**
```json
{
  "message": "Blog deleted successfully"
}
```

---

## 🔐 Authentication Endpoints

### 1. Setup Admin (One-time)
**POST** `/api/auth/setup`

**Example Request:**
```bash
curl -X POST http://localhost:3000/api/auth/setup
```

**Response:**
```json
{
  "message": "Admin created successfully",
  "email": "admin@stockology.com"
}
```

---

### 2. Login (NextAuth)
**POST** `/api/auth/signin`

Handled by NextAuth. Use the login form at `/admin/login` or:

```javascript
import { signIn } from 'next-auth/react';

await signIn('credentials', {
  email: 'admin@example.com',
  password: 'password',
  redirect: false,
});
```

---

### 3. Logout
**POST** `/api/auth/signout`

```javascript
import { signOut } from 'next-auth/react';

await signOut({ callbackUrl: '/admin/login' });
```

---

## 🧪 Testing with Postman

### Import Collection

Create a new Postman collection with these requests:

1. **Get All Blogs**
   - Method: GET
   - URL: `{{baseUrl}}/api/blogs`

2. **Create Blog**
   - Method: POST
   - URL: `{{baseUrl}}/api/blogs`
   - Body: form-data
   - Add fields: title, content, category, author, image (file)

3. **Get Blog by ID**
   - Method: GET
   - URL: `{{baseUrl}}/api/blogs/1`

4. **Update Blog**
   - Method: PUT
   - URL: `{{baseUrl}}/api/blogs/1`
   - Body: form-data

5. **Delete Blog**
   - Method: DELETE
   - URL: `{{baseUrl}}/api/blogs/1`

### Environment Variables
```json
{
  "baseUrl": "http://localhost:3000"
}
```

---

## 🧪 Testing with JavaScript

### Complete Test Suite

```javascript
// Test 1: Create a blog
async function testCreateBlog() {
  const formData = new FormData();
  formData.append('title', 'Test Blog Post');
  formData.append('content', 'This is test content for the blog post.');
  formData.append('excerpt', 'Test excerpt');
  formData.append('category', 'Testing');
  formData.append('author', 'Test Author');
  formData.append('published', 'true');

  const response = await fetch('/api/blogs', {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();
  console.log('Created blog:', data);
  return data.blog.id;
}

// Test 2: Get all blogs
async function testGetAllBlogs() {
  const response = await fetch('/api/blogs?page=1&limit=10');
  const data = await response.json();
  console.log('All blogs:', data);
}

// Test 3: Get single blog
async function testGetBlog(id) {
  const response = await fetch(`/api/blogs/${id}`);
  const data = await response.json();
  console.log('Single blog:', data);
}

// Test 4: Update blog
async function testUpdateBlog(id) {
  const formData = new FormData();
  formData.append('title', 'Updated Test Blog');
  formData.append('published', 'false');

  const response = await fetch(`/api/blogs/${id}`, {
    method: 'PUT',
    body: formData,
  });

  const data = await response.json();
  console.log('Updated blog:', data);
}

// Test 5: Delete blog
async function testDeleteBlog(id) {
  const response = await fetch(`/api/blogs/${id}`, {
    method: 'DELETE',
  });

  const data = await response.json();
  console.log('Deleted blog:', data);
}

// Run all tests
async function runTests() {
  const blogId = await testCreateBlog();
  await testGetAllBlogs();
  await testGetBlog(blogId);
  await testUpdateBlog(blogId);
  await testDeleteBlog(blogId);
}

runTests();
```

---

## 🐛 Common Error Responses

### 400 Bad Request
```json
{
  "error": "Missing required fields"
}
```

### 404 Not Found
```json
{
  "error": "Blog not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to create blog"
}
```

---

## 📊 Response Status Codes

- `200` - Success (GET, PUT, DELETE)
- `201` - Created (POST)
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

---

## 🔍 Search & Filter Examples

### Search in title and content
```bash
curl "http://localhost:3000/api/blogs?search=investment"
```

### Filter by category
```bash
curl "http://localhost:3000/api/blogs?category=Stock%20Market"
```

### Get only published blogs
```bash
curl "http://localhost:3000/api/blogs?published=true"
```

### Combine filters
```bash
curl "http://localhost:3000/api/blogs?category=Trading&published=true&search=strategy&page=1&limit=5"
```

---

## 📝 Notes

1. **Image Upload**: Maximum file size depends on your Next.js configuration (default ~4.5MB)
2. **Slug Generation**: Automatically generated from title (lowercase, hyphenated)
3. **Image Format**: Returned as base64 data URL for easy display
4. **Authentication**: Admin routes require NextAuth session
5. **CORS**: Configure if accessing from different domain

---

## 🚀 Performance Tips

1. Use pagination for large datasets
2. Limit search results with `limit` parameter
3. Cache frequently accessed blogs
4. Optimize images before upload
5. Use CDN for static assets in production

---

## 📚 Additional Resources

- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Prisma Client API](https://www.prisma.io/docs/reference/api-reference/prisma-client-reference)
- [FormData API](https://developer.mozilla.org/en-US/docs/Web/API/FormData)
