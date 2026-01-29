import React from "react";
import Image from "next/image";

const UserCard = () => {
  // Sample data - will make reusable later
  const name = "Wehan Withana";
  const title = "Head of Development Services";
  const avatarSrc = "/TezzzeractAvatar.png"; // Using existing avatar path or placeholder

  return (
    <div className="flex items-center gap-3 mt-4">
      {/* Profile Picture */}
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden shrink-0">
        <Image
          src={avatarSrc}
          alt={name}
          width={48}
          height={48}
          className="object-cover w-full h-full"
        />
      </div>
      
      {/* Name and Title */}
      <div className="flex flex-col">
        <span className="text-black font-semibold text-sm md:text-base">
          {name}
        </span>
        <span className="text-gray-500 text-xs md:text-sm">
          {title}
        </span>
      </div>
    </div>
  );
};

export default UserCard;
