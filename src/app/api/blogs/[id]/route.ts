import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET single blog by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid blog ID' },
        { status: 400 }
      );
    }
    
    const blog = await prisma.blog.findUnique({
      where: { id },
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

// PUT - Update blog
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid blog ID' },
        { status: 400 }
      );
    }
    
    const formData = await request.formData();
    
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const excerpt = formData.get('excerpt') as string;
    const category = formData.get('category') as string;
    const author = formData.get('author') as string;
    const published = formData.get('published') === 'true';
    const imageFile = formData.get('image') as File | null;
    
    // Check if blog exists
    const existingBlog = await prisma.blog.findUnique({
      where: { id },
    });
    
    if (!existingBlog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    const updateData: any = {};
    
    if (title) {
      updateData.title = title;
      // Update slug if title changes
      updateData.slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }
    
    if (content) updateData.content = content;
    if (excerpt) updateData.excerpt = excerpt;
    if (category) updateData.category = category;
    if (author) updateData.author = author;
    if (published !== undefined) updateData.published = published;
    
    // Handle image update
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      updateData.image = Buffer.from(bytes);
      updateData.imageType = imageFile.type;
    }
    
    const blog = await prisma.blog.update({
      where: { id },
      data: updateData,
    });
    
    return NextResponse.json({
      message: 'Blog updated successfully',
      blog,
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { error: 'Failed to update blog' },
      { status: 500 }
    );
  }
}

// DELETE blog
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid blog ID' },
        { status: 400 }
      );
    }
    
    const blog = await prisma.blog.findUnique({
      where: { id },
    });
    
    if (!blog) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }
    
    await prisma.blog.delete({
      where: { id },
    });
    
    return NextResponse.json({
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}
