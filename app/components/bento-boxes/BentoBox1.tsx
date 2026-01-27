"use client"

import React from "react";
import { Ripple } from "./Ripple";
import { File, Settings, Search, Zap, Star, Heart } from "lucide-react";    
import { OrbitingCircles } from "./OrbitingCircles";
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
          verticalOffset="100%"
          scale={1.3}
        />
        <div className="absolute inset-0 pointer-events-none">
          {/* Calculate radii matching ripple circles: (mainCircleSize + i * 120) * scale / 2 */}
          {/* Circle 0: (210 + 0 * 120) * 1.3 / 2 = 136.5px */}
          <OrbitingCircles 
            radius={136.5} 
            path={false}
            verticalOffset="102%"
          >
            <File />
            <Settings />
            <Search />
          </OrbitingCircles>
          {/* Circle 1: (210 + 1 * 120) * 1.3 / 2 = 214.5px */}
          <OrbitingCircles 
            radius={214.5} 
            path={false} 
            reverse
            verticalOffset="102%"
          >
            <File />
            <Settings />
            <Search />
            <Zap />
          </OrbitingCircles>
          {/* Circle 2: (210 + 2 * 120) * 1.3 / 2 = 292.5px */}
          <OrbitingCircles 
            radius={292.5} 
            path={false}
            verticalOffset="102%"
          >
            <File />
            <Settings />
            <Search />
            <Zap />
            <Star />
          </OrbitingCircles>
        </div>  
      </div>
    </>
  );
}
