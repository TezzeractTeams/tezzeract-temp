import React from "react";
import Image from "next/image";

interface BoxCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const BoxCard = ({ title, description, imageSrc, imageAlt }: BoxCardProps) => {
  return (
    <div className="bg-white rounded-2xl border-[10px] border-[#F5F5F5] p-8 hover:border-[#B8B8B8]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#0077b6]/10 h-full flex flex-col">
      <div className="flex-1 mb-6 relative w-full h-48">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          className="object-contain"
        />
      </div>
      <div className="flex flex-col justify-end">
        <h2 className="text-3xl font-light mb-3">
          <span className="text-[#00378A]">{title}</span>
    
        </h2>
        <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

export default function ThreeBoxSection() {
  return (
    <section className="w-full py-16 px-4 bg-gray-50">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BoxCard
            title="Book a meeting"
            description="Tezzeract focuses on helping businesses grow digitally by providing innovative solutions and expert guidance."
            imageSrc="/globe.svg"
            imageAlt="Meeting illustration"
          />
          <BoxCard
            title="Explore our"
            description="Discover how we can transform your digital presence with cutting-edge technology and strategic insights."
            imageSrc="/file.svg"
            imageAlt="Services illustration"
          />
          <BoxCard
            title="Join our"
            description="Connect with like-minded professionals and stay updated with the latest trends in digital transformation."
            imageSrc="/window.svg"
            imageAlt="Community illustration"
          />
        </div>
      </div>
    </section>
  );
}
