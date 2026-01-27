import React from "react";
import Image from "next/image";

interface BlogCardProps {
  postImage: string;
  postTitle: string;
  postExcerpt: string;
}

const BlogCard = ({ postImage, postTitle, postExcerpt }: BlogCardProps) => {
  return (
    <div className="relative pt-4 flex flex-col h-full">
      {/* Image area - fixed height ensures alignment */}
      <div className="bg-white mb-12 flex items-center rounded-2xl justify-center overflow-hidden">
        <Image
          src={postImage}
          alt={postTitle}
          width={200}
          height={200}
          className="object-contain w-full h-full"
        />
      </div>
      
      {/* Text content */}
      <div className="flex-1 px-2 flex flex-col">
        <h2 className="text-black text-2xl font-light mb-3 leading-tight">
          {postTitle}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          {postExcerpt}
        </p>
      </div>
    </div>
  );
};

export default BlogCard;
