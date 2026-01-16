import React from "react";
import Image from "next/image";

export default function TextSection() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-20 text-center">
      <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tighter text-gray-400 font-light tracking-tighter">
        <span className="text-[#0077b6] ">Tezzeract</span> offers access to
        <br className="hidden md:block" />
        <span className="text-[#0077b6] "> talent on demand </span>
        
        {/* Avatar 1 */}
        <span className="inline-flex align-middle mx-2 md:mx-4 relative -top-1">
          <div className="w-6 h-6 md:w-10 md:h-10 lg:w-15 lg:h-15 overflow-hidden relative">
            <Image
              src="/TezzzeractAvatar.png"
              alt="Tezzeract Avatar"
              fill
              className="object-cover"
            />
          </div>
        </span>
        , enabling businesses to
        <br className="hidden md:block" />
        <span className="text-[#0077b6] font-light">form and scale teams </span>
        
        {/* Pill Avatar + Button */}
        <span className="inline-flex align-middle mx-2 md:mx-4 relative -top-1">
          <div className="w-12 h-6 md:w-24 md:h-10 lg:w-32 lg:h-15 relative">
            <Image
              src="/TezzeractAvaterPlus.png"
              alt="Tezzeract Team"
              fill
              className="object-contain"
            />
          </div>
        </span>
        under
        <br className="hidden md:block" />
        <span className="text-[#0077b6] font-light">a single subscription.</span>
      </h1>
    </div>
  );
}
