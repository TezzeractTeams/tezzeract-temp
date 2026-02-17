"use client"

import React from "react";
import Image from "next/image";
import { Ripple } from "./Ripple";
import { File, Settings, Search, Zap, Star, Heart } from "lucide-react";
import { OrbitingCircles } from "./OrbitingCircles";

export default function BentoBox1() {
  return (
    <div className="h-[50vh]">
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="bento-shape-1" clipPathUnits="objectBoundingBox">
            <path
              d="M0 0.02C0 0.009 0.0125 0 0.028 0H0.6105C0.626 0 0.6385 0.009 0.6385 0.02V0.12C0.6385 0.132 0.651 0.14 0.6665 0.14H0.972C0.9875 0.14 1 0.148 1 0.16V0.979C1 0.99 0.9875 1 0.972 1H0.028C0.0125 1 0 0.99 0 0.979V0.02Z" />
          </clipPath>
        </defs>
      </svg>

      <div
        className="bento-box-1 relative h-full w-full flex items-center justify-center overflow-hidden rounded-xl min-h-[400px] md:min-h-0"
        style={{
          backdropFilter: 'blur(150px)',
          WebkitBackdropFilter: 'blur(150px)',
          borderRadius: '30px'
        }}
      >
        {/* Text content - top left */}
        <div className="absolute top-4 left-4 md:top-6 md:left-3 z-10 pointer-events-none">
          <div className="text-white p-5">
            <div className="text-6xl  md:text-7xl font-light tracking-tighter">250+</div>
            <p className="text-[16px]  md:text-xl lg:text-3xl font-light leading-tight pr-10 lg:pr-25 mt-1">
              professionals across the world, specialised across multiple domains.
            </p>
          </div>
        </div>
        <Ripple
          mainCircleOpacity={0.5}
          numCircles={3}
          verticalOffset="95%"
        />
        {/* White circle with SVG at ripple center */}
        <div
          className="absolute pointer-events-none flex items-center justify-center rounded-full shadow-lg"
          style={{
            width: '140px',
            height: '140px',
            top: '100%',
            left: '50%',
            transform: 'translate(-50%, -68%)',
            zIndex: 1,
            background: 'linear-gradient(to bottom right, #00A9EE 20%, #0070BC 50%, #00A9EE 100%)',
          }}
        >
          <img
            src="/TezzeractLight.svg"
            alt="Tezzeract Light"
            className="w-[45%] h-[45%] object-contain"
          />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          {/* Calculate radii matching ripple circles: (mainCircleSize + i * 120) * scale / 2 */}
          {/* Circle 0: (210 + 0 * 120) * 1.3 / 2 = 136.5px */}
          <OrbitingCircles
            radius={136.5}
            path={false}
            verticalOffset="102%"
          >
            <Image src="/assets/avatars/oneli.png" alt="Oneli" width={60} height={60} className="rounded-full shadow-md" />
            <Image src="/assets/avatars/wehan.jpg" alt="Wehan" width={60} height={60} className="rounded-full shadow-md" />
          </OrbitingCircles>
          {/* Circle 1: (210 + 1 * 120) * 1.3 / 2 = 214.5px */}
          <OrbitingCircles
            radius={214.5}
            path={false}
            reverse
            verticalOffset="102%"
          >
            <Image src="/assets/avatars/Nipun.png" alt="Nipun" width={60} height={60} className="rounded-full  shadow-md" />
            <Image src="/assets/avatars/german%20female.png" alt="German Female" width={60} height={60} className="rounded-full  shadow-md" />
            <Image src="/assets/avatars/arabfemale.png" alt="Arab Female" width={60} height={60} className="rounded-full  shadow-md" />
          </OrbitingCircles>
        </div>
      </div>
    </div>
  );
}
