"use client";

import React from "react";
import Image from "next/image";
import TezzeractText from "./ui/TezzeractText";

export interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  company: string;
  rating?: number; // 1-5, defaults to 5
  avatarSrc?: string; // defaults to TezzzeractAvatar.png
  className?: string;
}

export default function Testimonial({
  quote,
  name,
  title,
  company,
  rating = 5,
  avatarSrc = "/TezzzeractAvatar.png",
  className = "",
}: TestimonialProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Main testimonial card */}
      <div className="bg-transparent w-[800px] rounded-lg md:p-8 relative pb-8">
        {/* Two column layout */}
        <div className="flex flex-col md:flex-row gap-6 items-end md:items-start">
          {/* Column 1: Stars, text, and name with office */}
          <div className="flex-1 text-right">
            {/* Star rating    */}
            <div className="flex gap-1 justify-end mb-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <svg
                  key={index}
                  className={`w-5 h-5 ${
                    index < rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            {/* Quote text */}
            <TezzeractText variant="dark" className="block mb-2">
              {quote}
            </TezzeractText>
            
            {/* Attribution - name and company in one line */}
            <div className="text-right w-full">
              <TezzeractText variant="dark" className="font-bold text-lg inline">
                {name}
              </TezzeractText>
              <TezzeractText variant="dark" className="font-normal inline ml-2">
                {title}, {company}
              </TezzeractText>
            </div>
          </div>

          {/* Column 2: Only the image */}
          <div className="flex-shrink-0">
            <div className="relative w-28 h-28 md:w-28 md:h-28 rounded-xl overflow-hidden bg-gray-200">
              <Image
                src={avatarSrc}
                alt={name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Blue border at bottom */}
     
    </div>
  );
}
