import React from "react";
import BlogCard from "./ui/BlogCard";
import TezzeractH1 from "./ui/TezzeractH1";
import { getBlogPosts } from "../lib/blogData";

export default function BlogSection() {
  const posts = getBlogPosts();

  return (
    <section className="w-full pt-26 py-14 lg:px-8 px-2 bg-white relative">
      <TezzeractH1 variant="dark" className="text-center md:text-center text-4xl md:text-6xl pb-10">
        Explore the knowledge base
      </TezzeractH1>
      <p className="text-[#555555] font-light text-base md:text-lg lg:pb-16 pb-8 md:pb-16 lg:w-[75%] md:w-[80%] w-full mx-auto text-center">
      Learn how startups and growing companies build scalable remote teams using subscription based models. Tezzeract shares practical guides on remote teams as a service, remote teams on demand, and 
      proven ways to scale teams without hiring full-time employees so you can move faster with less risk.      </p>
      <div className="w-full mx-auto">
        {posts.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-600">No posts available</p>
          </div>
        )}
        {posts.length > 0 && (
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {posts.map((article) => {
              const imageUrl = article.cover?.url || '/default-image.png';
              
              return (
                <div key={article.id} className="relative z-10">
                  <BlogCard
                    postImage={imageUrl}
                    postTitle={article.title}
                    tag={article.tag}
                    slug={article.slug}
                    author={article.author}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}