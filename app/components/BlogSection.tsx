import React from "react";
import BlogCard from "./ui/BlogCard";
import TezzeractH1 from "./ui/TezzeractH1";

export default function BlogSection() {
  const sampleBlogs = [
    {
      postImage: "/blogsample.jpg",
      postTitle: "The Future of Web Development",
      postExcerpt: "Explore the latest trends and technologies shaping the future of web development, from modern frameworks to innovative design patterns."
    },
    {
      postImage: "/blogsample.jpg",
      postTitle: "Building Scalable Applications",
      postExcerpt: "Learn best practices for creating applications that can grow with your business needs while maintaining performance and reliability."
    },
    {
      postImage: "/blogsample.jpg",
      postTitle: "Design Systems and Component Libraries",
      postExcerpt: "Discover how to build and maintain effective design systems that improve consistency and accelerate development workflows."
    },
    {
      postImage: "/blogsample.jpg",
      postTitle: "Modern UI/UX Design Principles",
      postExcerpt: "Master the fundamentals of creating intuitive user interfaces and exceptional user experiences that drive engagement and conversions."
    }
  ];

  return (
    <section className="w-full py-14 px-4 bg-white relative">
        <TezzeractH1 variant="dark" className="text-center md:text-center text-4xl md:text-6xl pb-10">Our Blog</TezzeractH1>  
      <div className="w-full max-w-7xl mx-auto">
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
          {sampleBlogs.map((blog, index) => (
            <div key={index} className="relative z-10">
              <BlogCard
                postImage={blog.postImage}
                postTitle={blog.postTitle}
                postExcerpt={blog.postExcerpt}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
