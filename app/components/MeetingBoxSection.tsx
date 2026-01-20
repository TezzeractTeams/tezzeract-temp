import React from "react";
import Image from "next/image";

interface MeetingBoxProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  stepNumber: number;
}

const MeetingBox = ({ title, description, imageSrc, imageAlt, stepNumber }: MeetingBoxProps) => {
  return (
    <div className="relative flex flex-col h-full">
      {/* Image area - fixed height ensures alignment */}
      <div className="bg-white w-full h-64 mb-6 flex items-center justify-center overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={200}
          height={200}
          className="object-contain w-full h-full"
        />
      </div>
      
      {/* Step indicator */}
      <div className="relative mb-4 z-20">
        <div className="flex items-center relative z-20">
          <div className="bg-gradient-to-br from-[#00A9EE] to-[#00378A] rounded-lg w-10 h-10 flex items-center justify-center shadow-md">
            <span className="text-white text-lg font-semibold">{stepNumber}</span>
          </div>
        </div>
      </div>
      
      {/* Text content */}
      <div className="flex-1 flex flex-col">
        <h2 className="text-black text-2xl font-light mb-3 leading-tight">
          {title}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default function MeetingBoxSection() {
  return (
    <section className="w-full py-16 px-4 bg-white relative">
      {/* Continuous line spanning full screen width - hidden on small screens */}
      <div className="hidden md:block absolute -left-4 -right-4 h-0.5 bg-gradient-to-r from-[#00A9EE] to-[#00378A] z-0 top-[364px]" />
      <div className="w-full max-w-7xl mx-auto">
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="relative z-10">
            <MeetingBox
              stepNumber={1}
              title="Test your whole body"
              description="Get a comprehensive blood draw at one of our 2,000+ partner labs or from the comfort of your own home."
              imageSrc="/MeetingBox3.jpg"
              imageAlt="Blood test illustration"
            />
          </div>
          <div className="relative z-10">
            <MeetingBox
              stepNumber={2}
              title="An actionable plan"
              description="Easy to understand results and a clear health plan with tailored recommendations on diet, lifestyle changes & supplements."
              imageSrc="/MeetingBox3.png"
              imageAlt="Health plan illustration"
            />
          </div>
          <div className="relative z-10">
            <MeetingBox
              stepNumber={3}
              title="A connected ecosystem"
              description="You can book additional diagnostics, buy curated supplements with members-only discounts in your Superpower dashboard."
              imageSrc="/MeetingBox3.png"
              imageAlt="Ecosystem illustration"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
