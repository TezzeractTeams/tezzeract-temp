import React from "react";
import BlogCard from "./ui/BlogCard";
import TezzeractH1 from "./ui/TezzeractH1";
import { getPosts } from "../lib/strapi";

interface Article {
  id: number;
  title?: string;
  description?: string;
  cover?: {
    url?: string;
    data?: {
      attributes?: {
        url: string;
      };
      url?: string;
    };
    attributes?: {
      url: string;
    };
  };
  // Support both flat and nested structures
  attributes?: {
    title: string;
    description: string;
    cover?: {
      data?: {
        attributes?: {
          url: string;
        };
        url?: string;
      };
      attributes?: {
        url: string;
      };
      url?: string;
    };
  };
}

export default async function BlogSection() {
  const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 
    (process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : '');
  
  let posts: Article[] = [];
  let error: string | null = null;

  try {
    const response = await getPosts();
    
    // Handle Strapi v4 response structure: { data: [...] }
    if (response.data && Array.isArray(response.data)) {
      posts = response.data;
    } else if (Array.isArray(response)) {
      posts = response;
    } else {
      console.warn("Unexpected response structure:", response);
    }
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load posts";
    console.error("Error fetching posts:", err);
  }

  return (
    <section className="w-full py-14 px-8 bg-white relative">
      <TezzeractH1 variant="dark" className="text-center md:text-center text-4xl md:text-6xl pb-10">
        Our Blog
      </TezzeractH1>
      <div className="w-full  mx-auto">
        {error && (
          <div className="text-center py-10">
            <p className="text-red-600">Error: {error}</p>
          </div>
        )}
        {!error && posts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-600">No posts available</p>
          </div>
        )}
        {!error && posts.length > 0 && (
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
            {posts.map((article) => {
              // Handle both flat structure (direct properties) and nested structure (attributes)
              if (!article) {
                console.warn("Invalid article structure:", article);
                return null;
              }

              // Support both flat and nested structures
              const title = article.title || article.attributes?.title || 'Untitled';
              const description = article.description || article.attributes?.description || '';
              const cover = article.cover || article.attributes?.cover;
              
              // Extract cover image URL from Strapi response
              // Based on console output: cover.url is directly available
              let imageUrl = '/default-image.png';
              
              if (cover) {
                // Try different cover URL structures
                const coverUrl = cover.url || 
                                cover.data?.attributes?.url || 
                                cover.data?.url || 
                                cover.attributes?.url;
                
                if (coverUrl) {
                  // Strapi URLs are relative, so prepend the base URL
                  imageUrl = coverUrl.startsWith('http') 
                    ? coverUrl 
                    : `${strapiUrl}${coverUrl}`;
                }
              }
              
              // Truncate description to a reasonable length for excerpt display
              const excerpt = description.length > 150 
                ? `${description.substring(0, 150)}...` 
                : description;
              
              return (
                <div key={article.id} className="relative z-10">
                  <BlogCard
                    postImage={imageUrl}
                    postTitle={title}
                    postExcerpt={excerpt}
                    tag="test"
                  />
                </div>
              );
            }).filter(Boolean)}
          </div>
        )}
      </div>
    </section>
  );
}