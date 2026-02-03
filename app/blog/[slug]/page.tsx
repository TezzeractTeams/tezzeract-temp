import { getBlogPostBySlug, getBlogPosts } from "@/app/lib/blogData";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserCard from "@/app/components/ui/UserCard";
import TezzeractH1 from "@/app/components/ui/TezzeractH1";

// Generate static params for all blog posts (for static generation)
export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  
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
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound(); // Shows 404 page
  }

  return (
    <div className="min-h-screen bg-white">
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
      <article className="max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16">
        {/* Tag */}
        {post.tag && (
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
                {post.tag}
              </span>
            </span>
          </div>
        )}

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
        <div className="prose prose-lg max-w-none">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
            {post.description}
          </p>
          
          {/* Extended content - you can expand this later */}
          <div className="text-base md:text-lg text-gray-600 leading-relaxed space-y-4">
            <p>
              {post.description}
            </p>
            <p>
              This is a placeholder for the full blog post content. You can expand this section with more detailed content, 
              paragraphs, images, and other elements as needed.
            </p>
          </div>
        </div>
      </article>
    </div>
  );
}
