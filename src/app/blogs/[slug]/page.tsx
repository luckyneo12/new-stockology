'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, User, Tag, ArrowLeft, Share2 } from 'lucide-react';
import { Metadata } from 'next';

interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  image: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function BlogDetailPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlog();
  }, [params.slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/blogs/slug/${params.slug}`);
      
      if (!response.ok) {
        throw new Error('Blog not found');
      }
      
      const data = await response.json();
      
      if (!data.published) {
        throw new Error('Blog not published');
      }
      
      setBlog(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share && blog) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">
            {error || 'Blog not found'}
          </p>
          <button
            onClick={() => router.push('/blogs')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => router.push('/blogs')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Blogs
          </button>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Blog Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full">
              {blog.category}
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {blog.title}
          </h1>

          {blog.excerpt && (
            <p className="text-xl text-gray-600 mb-6">{blog.excerpt}</p>
          )}

          <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-gray-200">
            <div className="flex items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span className="font-medium">{blog.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
            </div>
            
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </header>

        {/* Featured Image */}
        {blog.image && (
          <div className="mb-8 rounded-xl overflow-hidden shadow-lg">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Blog Content */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12">
          <div 
            className="prose prose-lg max-w-none"
            style={{
              lineHeight: '1.8',
              fontSize: '1.125rem',
            }}
          >
            {blog.content.split('\n').map((paragraph, index) => (
              paragraph.trim() && (
                <p key={index} className="mb-4 text-gray-700">
                  {paragraph}
                </p>
              )
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Last updated: {new Date(blog.updatedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <button
              onClick={() => router.push('/blogs')}
              className="text-blue-600 hover:text-blue-700 font-medium transition"
            >
              Read more articles →
            </button>
          </div>
        </footer>
      </article>
    </div>
  );
}
