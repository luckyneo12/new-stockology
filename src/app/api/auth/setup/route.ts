import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// This route is for initial admin setup only
export async function POST() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.admin.findFirst();
    
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin already exists' },
        { status: 400 }
      );
    }
    
    const email = process.env.ADMIN_EMAIL || 'admin@stockology.com';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    const name = 'Admin';
    
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    
    return NextResponse.json({
      message: 'Admin created successfully',
      email: admin.email,
    });
  } catch (error) {
    console.error('Error creating admin:', error);
    return NextResponse.json(
      { error: 'Failed to create admin' },
      { status: 500 }
    );
  }
}
