"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface MeetingBoxProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  stepNumber: number;
  numberRef?: React.RefObject<HTMLDivElement | null>;
}

const MeetingBox = ({ title, description, imageSrc, imageAlt, stepNumber, numberRef }: MeetingBoxProps) => {
  return (
    <div className="relative flex flex-col h-full">
      {/* Image area - fixed height ensures alignment */}
      <div className="order-2 md:order-1 bg-white w-full h-64 mb-6 flex items-center justify-center overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={200}
          height={200}
          className="object-contain w-full h-full"
        />
      </div>
      
      {/* Number and text content - side by side on mobile, stacked on desktop */}
      <div className="order-1 md:order-2 flex flex-row md:flex-col items-start gap-4 md:gap-0 mb-6 md:mb-4 z-20">
        {/* Step indicator */}
        <div className="relative z-20 shrink-0 -ml-8 md:ml-0 md:mb-4">
          <div 
            ref={numberRef}
            className="bg-gradient-to-br from-[#00A9EE] to-[#00378A] rounded-lg w-10 h-10 flex items-center justify-center shadow-md"
          >
            <span className="text-white text-lg font-semibold">{stepNumber}</span>
          </div>
        </div>
        
        {/* Text content */}
        <div className="flex-1 flex flex-col">
          <h2 className="text-black text-3xl font-light mb-3 leading-tight">
            {title}
          </h2>
          <p className="text-gray-600 text-base leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function MeetingBoxSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const verticalLineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const number1Ref = useRef<HTMLDivElement>(null);
  const number3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let horizontalAnimation: gsap.core.Tween | null = null;
    let verticalAnimation: gsap.core.Tween | null = null;

    // Horizontal line animation (desktop/tablet) - original implementation
    if (lineRef.current) {
      // Set initial state: line scaled to 0, anchored to left
      gsap.set(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left",
      });

      // Create ScrollTrigger animation
      horizontalAnimation = gsap.to(lineRef.current, {
        scaleX: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 50%",
          end: "bottom 20%",
          scrub: true,
        },
      });
    }

    // Vertical line animation (mobile)
    const updateVerticalLinePositions = () => {
      if (!number1Ref.current || !number3Ref.current || !section) return;

      // Helper to get position relative to ancestor
      const getRelativePosition = (element: HTMLElement, ancestor: HTMLElement) => {
        let x = 0;
        let y = 0;
        let current: HTMLElement | null = element;
        
        while (current && current !== ancestor) {
          x += current.offsetLeft;
          y += current.offsetTop;
          current = current.offsetParent as HTMLElement | null;
        }
        
        return { x, y };
      };

      const num1Pos = getRelativePosition(number1Ref.current, section);
      const num3Pos = getRelativePosition(number3Ref.current, section);

      const num1CenterX = num1Pos.x + number1Ref.current.offsetWidth / 2;
      const num1CenterY = num1Pos.y + number1Ref.current.offsetHeight / 2;
      const num3CenterY = num3Pos.y + number3Ref.current.offsetHeight / 2;

      // Vertical line animation (mobile)
      if (verticalLineRef.current && window.innerWidth < 768) {
        const totalHeight = num3CenterY - num1CenterY;
        const reducedHeight = totalHeight;
        const heightOffset = (totalHeight - reducedHeight) / 2;
        
        gsap.set(verticalLineRef.current, {
          x: num1CenterX - 1, // Center the 0.5 width line
          top: num1CenterY + heightOffset,
          height: reducedHeight,
          scaleY: 0,
          transformOrigin: "top",
        });
      }
    };

    // Initial setup for vertical line
    updateVerticalLinePositions();

    // Vertical line animation (mobile)
    if (verticalLineRef.current && number1Ref.current && number3Ref.current) {
      verticalAnimation = gsap.to(verticalLineRef.current, {
        scaleY: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 10%",
          end: "bottom 40%",
          scrub: true,
          onRefresh: updateVerticalLinePositions,
        },
      });
    }

    // Handle window resize for vertical line only
    const handleResize = () => {
      updateVerticalLinePositions();
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    // Refresh ScrollTrigger to ensure proper initialization
    ScrollTrigger.refresh();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (horizontalAnimation) horizontalAnimation.kill();
      if (verticalAnimation) verticalAnimation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === section) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full py-0 md:py-16 px-4 bg-white relative">
      {/* Continuous line spanning full screen width - hidden on small screens */}
      <div 
        ref={lineRef}
        className="hidden md:block absolute -left-4 -right-4 h-0.5 bg-gradient-to-r from-[#00A9EE] to-[#00378A] z-0 top-[364px]" 
      />
      {/* Vertical line from number 1 to number 3 - visible only on mobile */}
      <div 
        ref={verticalLineRef}
        className="block md:hidden absolute left-0 w-0.5 bg-gradient-to-b from-[#00A9EE] to-[#00378A] z-0" 
      />
      <div className="w-full max-w-7xl mx-auto pl-6 md:pl-0">
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-24">
          <div className="relative z-10">
            <MeetingBox
              stepNumber={1}
              title="Discover & Match Talent"
              description="We assess your goals, timelines, and skill requirements to match you with vetted professionals from our global talent pool—ready to integrate into your workflow."
              imageSrc="/MeetingBox3.jpg"
              imageAlt="Blood test illustration"
              numberRef={number1Ref}
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
              numberRef={number3Ref}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
