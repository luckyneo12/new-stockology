import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all blogs with pagination and search
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const published = searchParams.get('published');
    
    const skip = (page - 1) * limit;
    
    const where: any = {};
    
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { content: { contains: search } },
        { excerpt: { contains: search } },
      ];
    }
    
    if (category) {
      where.category = category;
    }
    
    if (published !== null && published !== undefined) {
      where.published = published === 'true';
    }
    
    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          slug: true,
          excerpt: true,
          category: true,
          author: true,
          image: true,
          imageType: true,
          published: true,
          createdAt: true,
          updatedAt: true,
        },
      }),
      prisma.blog.count({ where }),
    ]);
    
    // Convert image BLOB to base64
    const blogsWithBase64 = blogs.map((blog) => ({
      ...blog,
      image: blog.image && blog.imageType
        ? `data:${blog.imageType};base64,${blog.image.toString('base64')}`
        : null,
    }));
    
    return NextResponse.json({
      blogs: blogsWithBase64,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}

// POST - Create new blog
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const excerpt = formData.get('excerpt') as string;
    const category = formData.get('category') as string;
    const author = formData.get('author') as string;
    const published = formData.get('published') === 'true';
    const imageFile = formData.get('image') as File | null;
    
    // Validate required fields
    if (!title || !content || !category || !author) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    // Check if slug already exists
    const existingBlog = await prisma.blog.findUnique({
      where: { slug },
    });
    
    if (existingBlog) {
      return NextResponse.json(
        { error: 'A blog with this title already exists' },
        { status: 400 }
      );
    }
    
    let imageBuffer: Buffer | null = null;
    let imageType: string | null = null;
    
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      imageBuffer = Buffer.from(bytes);
      imageType = imageFile.type;
    }
    
    const blog = await prisma.blog.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        category,
        author,
        published,
        image: imageBuffer,
        imageType,
      },
    });
    
    return NextResponse.json(
      { message: 'Blog created successfully', blog },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { error: 'Failed to create blog' },
      { status: 500 }
    );
  }
}
