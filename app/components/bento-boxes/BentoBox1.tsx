"use client"

import React from "react";
import { Ripple } from "./Ripple";
import { OrbitingCircles } from "./OrbitingCircles";
import { File, Settings, Search } from "lucide-react";

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
        />
        {/* Icons orbiting along ripple circle borders */}
        <div 
          className="absolute"
          style={{
            top: "85%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Circle 0: 105px radius */}
          <OrbitingCircles radius={105} path={false} iconSize={30}>
            <File className="h-4 w-4 text-gray-700" />
            <Settings className="h-4 w-4 text-gray-700" />
          </OrbitingCircles>
        </div>
        <div 
          className="absolute"
          style={{
            top: "85%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Circle 1: 150px radius */}
          <OrbitingCircles radius={150} path={false} reverse iconSize={30}>
            <File className="h-4 w-4 text-gray-600" />
            <Search className="h-4 w-4 text-gray-600" />
          </OrbitingCircles>
        </div>
        <div 
          className="absolute"
          style={{
            top: "85%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Circle 2: 195px radius */}
          <OrbitingCircles radius={195} path={false} iconSize={40}>
            <File className="h-5 w-5 text-gray-700" />
            <Settings className="h-5 w-5 text-gray-700" />
            <Search className="h-5 w-5 text-gray-700" />
          </OrbitingCircles>
        </div>
      </div>
    </>
  );
}
