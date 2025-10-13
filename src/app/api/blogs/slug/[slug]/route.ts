import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET single blog by slug (for public pages)
export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    const blog = await prisma.blog.findUnique({
      where: { slug },
    });
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    // Convert image BLOB to base64
    const blogWithBase64 = {
      ...blog,
      image: blog.image && blog.imageType
        ? `data:${blog.imageType};base64,${blog.image.toString('base64')}`
        : null,
    };
    
    return NextResponse.json(blogWithBase64);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}
