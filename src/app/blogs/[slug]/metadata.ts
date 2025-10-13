import { Metadata } from 'next';
import { prisma } from '@/lib/prisma';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const blog = await prisma.blog.findUnique({
      where: { slug: params.slug },
      select: {
        title: true,
        excerpt: true,
        author: true,
        category: true,
        createdAt: true,
      },
    });

    if (!blog) {
      return {
        title: 'Blog Not Found',
        description: 'The requested blog post could not be found.',
      };
    }

    return {
      title: `${blog.title} | Stockology Blog`,
      description: blog.excerpt || `Read ${blog.title} by ${blog.author}`,
      authors: [{ name: blog.author }],
      keywords: [blog.category, 'stock market', 'investment', 'trading', blog.title],
      openGraph: {
        title: blog.title,
        description: blog.excerpt || '',
        type: 'article',
        publishedTime: blog.createdAt.toISOString(),
        authors: [blog.author],
        tags: [blog.category],
      },
      twitter: {
        card: 'summary_large_image',
        title: blog.title,
        description: blog.excerpt || '',
      },
    };
  } catch (error) {
    return {
      title: 'Blog | Stockology',
      description: 'Stockology blog posts',
    };
  }
}
