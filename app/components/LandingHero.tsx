"use client";

import React from "react";
import Image from "next/image";
import { TezzeractH1 } from "./ui/TezzeractH1";
import TezzeractText from "./ui/TezzeractText";
import TezzeractButtonLight from "./ui/TezzeractButtonLight";
import Testimonial from "./Testimonial";
import TalentCard from "./ui/TalentCard";


export default function LandingHero() {

  // Desktop path (original)
  const desktopPath = `
    M 0.0667,0.1
    L 0.2,0.1
    L 0.25,0
    L 0.98,0    A 0.03, 0.04 0,0,1
    1,0.04
    L 1,0.79    A 0.03,0.04 0,0,1 
    0.98,0.83
    L 0.6,0.83
    L 0.55,1  
    L 0.02,1   A 0.03,0.04 0,0,1
     0,0.97
    L 0,0.13  A 0.03, 0.04 0,0,1
     0.018,0.1
    Z
  `;



  // Mobile path (simplified, less cutouts)
  const mobilePath = `
    M 0.05,0.1
    L 0.95,0.1
    L 0.98,0    A 0.02, 0.02 0,0,1
    1,0.02
    L 1,0.98    A 0.02,0.02 0,0,1 
    0.98,1
    L 0.02,1   A 0.02,0.02 0,0,1
     0,0.98
    L 0,0.02  A 0.02, 0.02 0,0,1
     0.02,0
    Z
  `;

  const talentImages = [
    { 
      id: 1, 
      imageSrc: "/talentImg.png", 
      alt: "Talent 1",
      position: { top: "-5%", left: "100%" } // Top left
    },
    { 
      id: 2, 
      imageSrc: "/talenImg2.png", 
      alt: "Talent 2",
      position: { top: "-18%", left: "155%" } // Top right (card width ~220px + gap)
    },
    { 
      id: 3, 
      imageSrc: "/talenImg3.png", 
      alt: "Talent 3",
      position: { top: "40%", left: "45%" } // Bottom left (card height ~220px + gap)
    },
    { 
      id: 4, 
      imageSrc: "/talenImg4.png", 
      alt: "Talent 4",
      position: { top: "50%", left: "100%" } // Bottom middle
    },
    { 
      id: 5, 
      imageSrc: "/talenImg5.png", 
      alt: "Talent 5",
      position: { top: "10vw", left: "42vw" } // Bottom right
    },
  ];

  return (
    <div className="landing-hero-container p-6">
      <svg width="0" height="0" style={{ position: 'relative' }}>
        <defs>
          <clipPath id="landing-hero-clip-desktop" clipPathUnits="objectBoundingBox">
            <path d={desktopPath}/>
          </clipPath>
          <clipPath id="landing-hero-clip-mobile" clipPathUnits="objectBoundingBox">
            <path d={mobilePath}/>
          </clipPath>
        </defs>
      </svg>
      <div className="landing-hero justify-center pl-24 flex flex-col h-full relative">
        
        <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-4">
        <TezzeractH1 variant="light" className="text-white">
          Discover talent,
          <br />
          form remote teams &
          <br />
          start growing!
        </TezzeractH1>
        <TezzeractText variant="light" className="py-8">
        Tezzeract focuses on helping businesses grow digitally by providing access to<br /> scalable remote teams of professionals, tailored to meet your unique business needs. 
        </TezzeractText>
        <TezzeractButtonLight className="w-[300px]">Book a call with a vetting expert</TezzeractButtonLight>
        </div>
        
        {/* Talent Cards Container with absolute positioning */}
        <div className="relative z-2" style={{ width: "500px", height: "460px", minWidth: "500px" }}>
          {talentImages.map((talent) => (
            <div
              key={talent.id}
              className="absolute"
              style={{
                top: talent.position.top,
                left: talent.position.left,
              }}
            >
              <TalentCard
                imageSrc={talent.imageSrc}
                alt={talent.alt}
              />
            </div>
          ))}
        </div>
        </div>
        

     
        <div 
          className="absolute pointer-events-none"
          style={{
            right: '-20%',
            bottom: '-5%',
            width: '80%',
            height: '80%'
          }}
        >
          <Image
            src="/tezzeractcubeside.png"
            alt="Tezzeract Cube Side"
            height={1000}
            width={1000}
            className="object-contain z-1 w-full h-full"
            priority
          />
        </div>
      </div>
      <style jsx>{`
        .landing-hero {
          clip-path: url(#landing-hero-clip-desktop);
          height: 83vh;
          width: 100%;
          background-image: url('/herobg.webp');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        @media (max-width: 768px) {
          .landing-hero {
            clip-path: url(#landing-hero-clip-mobile);
          }
        }
      `}</style>

<div className="mt-12 max-w-2xl absolute right-36 bottom-[9%]">
          <Testimonial
            quote="Tezzeract teams works with us just as our own existing team and it was very easy to collaborate. More importantly, they helped us to scale faster!"
            name="Gabriele Mirabile"
            title="Chief Marketing Officer"
            company="Beentouch"
            rating={5}
          />
        </div>
        
   
    </div>
  );  
}