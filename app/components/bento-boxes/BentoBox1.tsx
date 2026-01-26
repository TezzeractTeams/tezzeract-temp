"use client"

import React from "react";
import { Ripple } from "./Ripple";
import { RippleOrbitingIcons } from "./RippleOrbitingIcons";
import { File, Settings, Search, Zap, Star, Heart } from "lucide-react";

export default function BentoBox1() {
  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="bento-shape-1" clipPathUnits="objectBoundingBox">
            <path 
              d="M0 0.0417599C0 0.0186966 0.0250721 0 0.056 0H0.6105C0.641428 0 0.6665 0.0186965 0.6665 0.0417599V0.148024C0.6665 0.171087 0.691572 0.189784 0.7225 0.189784H0.944C0.974928 0.189784 1 0.20848 1 0.231544V0.95824C1 0.981303 0.974928 1 0.944 1H0.056C0.0250721 1 0 0.981303 0 0.95824V0.0417599Z" 
            />
          </clipPath>
        </defs>
      </svg>
      <div 
        className="relative h-full w-full flex items-center justify-center overflow-hidden"
        style={{ 
          clipPath: 'url(#bento-shape-1)',
          backgroundColor: 'rgba(248, 248, 248, 0.22)',
          backdropFilter: 'blur(150px)',
          WebkitBackdropFilter: 'blur(150px)',
          border: '0px solid rgba(255, 255, 255, 0.47)'
        }}
      >
        <Ripple 
          mainCircleOpacity={0.5}
          numCircles={3}
          verticalOffset="85%"
          scale={1.3}
        />
        <RippleOrbitingIcons
          mainCircleSize={210}
          numCircles={3}
          verticalOffset="85%"
          scale={1.3}
          icons={[
            <File key="file1" className="h-5 w-5 text-gray-700" />,
            <Settings key="settings1" className="h-5 w-5 text-gray-700" />,
            <File key="file2" className="h-5 w-5 text-gray-600" />,
            <Search key="search1" className="h-5 w-5 text-gray-600" />,
            <File key="file3" className="h-6 w-6 text-gray-700" />,
            <Settings key="settings2" className="h-6 w-6 text-gray-700" />,
            <Search key="search2" className="h-6 w-6 text-gray-700" />,
          ]}
          iconSize={50}
          reverse={[false, true, false]}
          path={false}
        />
      </div>
    </>
  );
}
