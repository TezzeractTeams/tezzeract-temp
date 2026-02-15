"use client";

import React from "react";
import Image from "next/image";
import { TezzeractH1 } from "./ui/TezzeractH1";
import TezzeractText from "./ui/TezzeractText";
import TezzeractButtonLight from "./ui/TezzeractButtonLight";
import Testimonial from "./Testimonial";
// import TalentCard from "./ui/TalentCard";


export default function LandingHero() {

  // Desktop path (original)
  const desktopPath = `
    M 0.0667,0.1
    L 0.2 ,0.1
    L 0.233,0
    L 1,0    

    L 1,0.80    A 0.02,0.03 0,0,1 
    0.987,0.83
    L 0.6,0.83
    L 0.55,1  
 
    0,1


   L 0,0.13   A 0.03 0.04 0,0,1
    0.013,0.1
    Z
  `;



  // Mobile path (simplified, less cutouts)
  const mobilePath = `
  
    M 0.45 ,0.07
    L 0.51,0
    L 1,0   
    L 1,1 



    L 0.11,1  
 
   L 0,1    
    L 0,0.1   A 0.08 0.06 0,0,1
   0.0667,0.07
   
    
    Z
  `;

  // Tablet path (similar to mobile)
  const tabletPath = `
  
    M 0.45 ,0.07
    L 0.51,0
    L 1,0   
    L 1,1 



    L 0.11,1  
 
   L 0,1    
    L 0,0.1   A 0.08 0.06 0,0,1
   0.0667,0.07
   
    
    Z
  `;

  // const talentImages = [
  //   { 
  //     id: 1, 
  //     imageSrc: "/talentImg.png", 
  //     alt: "Talent 1",
  //     position: { top: "0vh", left: "56vw" }, // Desktop: Top left
  //     tabletPosition: { top: "5vh", left: "50vw" }, // Tablet position
  //     mobilePosition: { top: "65%", left: "1%" } // Mobile position
  //   },
  //   { 
  //     id: 2, 
  //     imageSrc: "/talenImg2.png", 
  //     alt: "Talent 2",
  //     position: { top: "-10vh", left: "72vw" }, // Desktop: Top right
  //     tabletPosition: { top: "-5vh", left: "70vw" }, // Tablet position
  //     mobilePosition: { top: "76%", left: "35%" } // Mobile position
  //   },
  //   { 
  //     id: 3, 
  //     imageSrc: "/talenImg3.png", 
  //     alt: "Talent 3",
  //     position: { top: "33vh", left: "40vw" }, // Desktop: Bottom left
  //     tabletPosition: { top: "39vh", left: "30vw" }, // Tablet position
  //     mobilePosition: { top: "56%", left: "35%" } // Mobile position
  //   },
  //   { 
  //     id: 4, 
  //     imageSrc: "/talenImg4.png", 
  //     alt: "Talent 4",
  //     position: { top: "26vh", left: "56vw" }, // Desktop: Bottom middle
  //     tabletPosition: { top: "24vh", left: "50vw" }, // Tablet position
  //     mobilePosition: { top: "78%", left: "69%" } // Mobile position
  //   },
  //   { 
  //     id: 5, 
  //     imageSrc: "/talenImg5.png", 
  //     alt: "Talent 5",
  //     position: { top: "17vh", left: "72vw" }, // Desktop: Bottom right
  //     tabletPosition: { top: "17vh", left: "70vw" }, // Tablet position
  //     mobilePosition: { top: "59%", left: "69%" } // Mobile position
  //   },
  // ];

  return (
    <div className="landing-hero-container md:m-6 m-3 rounded-3xl overflow-hidden border-blue-500">
      <svg width="0" height="0" style={{ position: 'relative' }}>
        <defs>
          <clipPath id="landing-hero-clip-desktop" clipPathUnits="objectBoundingBox">
            <path d={desktopPath} />
          </clipPath>
          <clipPath id="landing-hero-clip-tablet" clipPathUnits="objectBoundingBox">
            <path d={tabletPath} />
          </clipPath>
          <clipPath id="landing-hero-clip-mobile" clipPathUnits="objectBoundingBox">
            <path d={mobilePath} />
          </clipPath>
        </defs>
      </svg>
      <div className="landing-hero md:justify-center md:pl-12 lg:pl-24 px-4 flex flex-col h-full relative">

        <div className="flex flex-row gap-4 relative z-10">
          <div className="flex flex-col gap-0 md:gap-3 lg:gap-4 w-full md:w-[60%] md:pt-0 pt-26">
            <TezzeractH1 variant="light" className="text-white pb-2 md:pb-3 lg:pb-4 md:w-full lg:w-[700px] w-full text-3xl md:text-6xl lg:text-7xl">
              Discover talent,

              form remote teams &

              start growing!
            </TezzeractH1>
            <TezzeractText variant="light" className="pt-4 pb-4 md:pb-3 lg:pb-4 w-full md:w-[96%] text-center md:text-left text-sm md:text-lg lg:text-lg">
              Tezzeract focuses on helping businesses grow digitally by providing access to <br className="hidden  md:block" /> scalable remote teams of professionals, tailored to meet your unique business needs.
            </TezzeractText >
            <a href="/bookcall" target="_blank" rel="noopener noreferrer" className="self-center md:self-start cursor-pointer transition-transform duration-200 ">
              <TezzeractButtonLight className="w-210px md:w-[280px] lg:w-[300px] text-sm md:text-base cursor-pointer px-8">Book a call with a vetting expert</TezzeractButtonLight>
            </a>
          </div>

          {/* Desktop Talent Cards Container with absolute positioning (lg and above) */}
          {/* <div className="hidden lg:block absolute inset-0 z-2 pointer-events-none">
          {talentImages.map((talent) => (
            <div
              key={talent.id}
              className="absolute pointer-events-auto"
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
        </div> */}

          {/* Tablet Talent Cards Container with absolute positioning (md to lg) */}
          {/* <div className="hidden md:block lg:hidden absolute inset-0 z-2 pointer-events-none">
          {talentImages.map((talent) => (
            <div
              key={talent.id}
              className="absolute pointer-events-auto"
              style={{
                top: talent.tabletPosition.top,
                left: talent.tabletPosition.left,
                transform: 'scale(0.85)',
                transformOrigin: 'top left',
              }}
            >
              <TalentCard
                imageSrc={talent.imageSrc}
                alt={talent.alt}
              />
            </div>
          ))}
        </div> */}

        </div>

        {/* Mobile Talent Cards Container with absolute positioning */}
        {/* <div className="block md:hidden absolute right-0 top-0 z-2" style={{ width: "100%", height: "100%" }}>
          {talentImages.map((talent) => (
            <div
              key={talent.id}
              className="absolute"
              style={{
                top: talent.mobilePosition.top,
                right: talent.mobilePosition.left || '0',
                transform: 'scale(0.6)',
                transformOrigin: 'top right',
              }}
            >
              <TalentCard
                imageSrc={talent.imageSrc}
                alt={talent.alt}
              />
            </div>
          ))}
        </div> */}



        <div
          className="absolute pointer-events-none z-0 md:z-auto left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[-15%] lg:right-[-67%] bottom-[-10%] md:bottom-[0%] md:top-[40%] lg:top-[10%] w-[120%] md:w-[70%] lg:w-[180%] h-[60%] md:h-[75%] lg:h-[120%]"
        >
          {/* Desktop Image */}
          <Image
            src="/tezzeractlogo2.webp"
            alt="Tezzeract Cube Side"
            height={1000}
            width={1000}
            className="hidden md:block  lg:h-full object-contain w-full h-full"
            priority
          />
          {/* Mobile Image */}
          <Image
            src="/tezzeractlogo2.webp"
            alt="Tezzeract Logo"
            height={1000}
            width={1000}
            className="block md:hidden object-contain w-full h-full"
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

        @media (min-width: 768px) and (max-width: 1023px) {
          .landing-hero {
            clip-path: url(#landing-hero-clip-tablet);
          }
        }

        @media (max-width: 767px) {
          .landing-hero {
            clip-path: url(#landing-hero-clip-mobile);
          }
        }
      `}</style>

      <div className=" absolute overflow-hidden right-0 md:right-4 bottom-[15%] md:bottom-[12%] lg:bottom-[13%] block w-[calc(100%-2rem)] md:w-[55vw] lg:w-[50vw]">
        <Testimonial
          quote="Tezzeract teams works with us just as our own existing team and it was very easy to collaborate. "
          name="Gabriele Mirabile"
          className=" hidden lg:block "
          title="Chief Marketing Officer"
          company="Beentouch"
          rating={5}
        />


      </div>


    </div>
  );
}