import React from "react";
import Image from "next/image";
import UserCard from "./UserCard";

interface BlogCardProps {
  postImage: string;
  postTitle: string;
  postExcerpt: string;
  tag?: string;
}

const BlogCard = ({ postImage, postTitle, postExcerpt, tag }: BlogCardProps) => {
  return (
    <div className="relative flex flex-col h-full rounded-2xl overflow-hidden" style={{ backgroundColor: '#F9F9F9' }}>
      {/* Content area */}
      <div className="flex-1 p-8 flex flex-col justify-between">
        {/* Tag */}
        <div>
        {tag && (
          <div className="mb-3 inline-block">
            <span
              className="text-xs sm:text-sm md:text-base font-light inline-block px-10 py-1 rounded-[24px]"
              style={{
                background: 'radial-gradient(50.47% 50.47% at 55.88% 97.48%, rgba(155, 155, 155, 0.3) 0%, rgba(253, 253, 253, 0.06) 100%)',
                border: '1px solid #5F5F5F4D',
                backdropFilter: 'blur(200px)',
                WebkitBackdropFilter: 'blur(200px)',
              }}
            >
              <span
                style={{
                  background: 'linear-gradient(257.31deg, #2B2B2B 16.02%, #4A4A4A 49.66%, #505050 83.98%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {tag}
              </span>
            </span>
          </div>
        )}
        
        {/* Title */}
        <h2 className="text-[#340E0E] text-[24px] md:text-[32px] font-light mb-3 leading-tight">
          {postTitle}
        </h2>
        
        {/* Description */}
        <p className="text-gray-600 text-[14px] md:text-[16px] leading-relaxed">
          {postExcerpt}
        </p>
        </div>

        <div>
              {/* User Card */}
        <UserCard />
        </div>
    
      </div>
      
      {/* Image area - at the bottom */}
      <div className="bg-white h-[265px] flex items-center rounded-b-2xl justify-center overflow-hidden aspect-square">
        <Image
          src={postImage}
          alt={postTitle}
          width={300}
          height={300}
          className="object-cover w-full h-full"
          unoptimized={postImage.startsWith('http://localhost')}
        />
      </div>
    </div>
  );
};

export default BlogCard;
