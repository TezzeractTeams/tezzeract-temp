import { getPostBySlug, getPosts } from "@/app/lib/strapi";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserCard from "@/app/components/ui/UserCard";
import TezzeractH1 from "@/app/components/ui/TezzeractH1";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ScrollToTop from "@/app/components/ScrollToTop";

// Generate static params for all blog posts (for static generation)
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound(); // Shows 404 page
  }

  return (
    <div className="min-h-screen bg-white font-manrope">
      <ScrollToTop />
      <Header />
      {/* Cover Image */}
      {post.cover && (
        <div className="w-full h-[400px] md:h-[500px] relative overflow-hidden">
          <Image
            src={post.cover.url}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <article className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-16">
        {/* Tag */}
        <div className="mb-6 inline-block">
          <span
            className="text-xs sm:text-sm md:text-base font-light inline-block px-6 py-1 rounded-[24px]"
            style={{
              background: 'radial-gradient(50.47% 50.47% at 55.88% 97.48%, rgba(155, 155, 155, 0.3) 0%, rgba(253, 253, 253, 0.06) 100%)',
              border: '1px solid #5F5F5F4D',
            }}
          >
            <span
              style={{
                background: 'linear-gradient(257.31deg, #2B2B2B 16.02%, #4A4A4A 49.66%, #505050 83.98%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                backdropFilter: 'blur(200px)',
                WebkitBackdropFilter: 'blur(200px)',
                color: 'transparent',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {post.tag || 'Article'}
            </span>
          </span>
        </div>

        {/* Title */}
        <TezzeractH1 variant="dark" className="text-3xl md:text-5xl lg:text-6xl mb-6">
          {post.title}
        </TezzeractH1>

        {/* Author */}
        <div className="mb-8 pb-8 border-b border-gray-200">
          <UserCard
            name={post.author.name}
            position={post.author.position}
            avatar={post.author.avatar}
          />
        </div>

        {/* Content */}
        <div className="blog-content">
          {/* Rich HTML Content */}
          <div 
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
      <Footer />
    </div>
  );
}
