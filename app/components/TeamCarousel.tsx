"use client";

import React, { useRef, useEffect, useLayoutEffect, useState, useMemo } from "react";
import Image from "next/image";

export interface TeamMember {
  image: string;
  name: string;
  title: string;
}

interface TeamCarouselProps {
  items: TeamMember[];
}

interface CarouselRowProps {
  items: TeamMember[];
  direction: "left" | "right";
  speed?: number;
}

function CarouselRow({ items, direction, speed = 0.5 }: CarouselRowProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const positionRef = useRef(0);
  const [singleSetWidth, setSingleSetWidth] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const duplicatedItems = [...items, ...items, ...items];

  useLayoutEffect(() => {
    if (!contentRef.current) return;
    const frameId = requestAnimationFrame(() => {
      if (contentRef.current) {
        const totalWidth = contentRef.current.scrollWidth;
        const calculatedWidth = totalWidth / 3;
        setSingleSetWidth(calculatedWidth);
        if (direction === "right") {
          positionRef.current = calculatedWidth;
          contentRef.current.style.transform = `translateX(-${calculatedWidth}px)`;
        }
        setIsReady(true);
      }
    });
    return () => cancelAnimationFrame(frameId);
  }, [direction, items]);

  useEffect(() => {
    if (!isReady || singleSetWidth === 0 || !contentRef.current) return;

    let lastTime = 0;
    const animate = (time: number) => {
      if (!contentRef.current) return;

      if (!lastTime) lastTime = time;
      const deltaTime = time - lastTime;
      lastTime = time;

      // Adjust speed based on frame time for consistent motion (60fps baseline)
      const adjustedSpeed = speed * (deltaTime / 16.66);

      if (direction === "left") {
        positionRef.current += adjustedSpeed;
        if (positionRef.current >= singleSetWidth) {
          positionRef.current -= singleSetWidth;
        }
      } else {
        positionRef.current -= adjustedSpeed;
        if (positionRef.current <= 0) {
          positionRef.current += singleSetWidth;
        }
      }

      contentRef.current.style.transform = `translate3d(-${positionRef.current}px, 0, 0)`;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [direction, speed, isReady, singleSetWidth]);

  return (
    <div className="overflow-hidden" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
      <div
        ref={contentRef}
        className="flex gap-8 md:gap-12 whitespace-nowrap"
        style={{ willChange: "transform", width: "fit-content" }}
      >
        {duplicatedItems.map((member, index) => (
          <div key={`${member.name}-${index}`} className="flex-shrink-0 flex flex-row items-center gap-3 md:gap-4">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl overflow-hidden flex-shrink-0">
              <Image
                src={member.image}
                alt={member.name}
                width={64}
                height={64}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col text-left">
              <h3 className="text-gray-700 text-base md:text-lg font-light">{member.name}</h3>
              <p className="text-gray-500 text-sm md:text-base font-light">{member.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TeamCarousel({ items }: TeamCarouselProps) {
  // Define specific team members for each row as requested
  // Top row: Shanilka, Wehan, Sakith Seneviratne, Nataly, Laura Sardinha
  const topRowMembers = useMemo(() => {
    const names = ["Shanilka Rajapaksha", "Wehan Himsara", "Sakith Seneviratne", "Nataly Undugodage", "Laura Sardinha"];
    return names.map(name => {
      const found = items.find(item => item.name.toLowerCase().includes(name.split(' ')[0].toLowerCase()));
      return found || { name, title: "Team Member", image: "/assets/avatars/germanfemale.png" };
    });
  }, [items]);

  // Bottom row: Nipun, Oneli, Simon, Kotchakorn
  const bottomRowMembers = useMemo(() => {
    const names = ["Nipun Koshalya", "Oneli Kumarasinghe", "Simon Abraham Tecle", "Kotchakorn Janroong"];
    return names.map(name => {
      const found = items.find(item => item.name.toLowerCase().includes(name.split(' ')[0].toLowerCase()));
      return found || { name, title: "Team Member", image: "/assets/avatars/germanfemale.png" };
    });
  }, [items]);

  return (
    <div
      className="relative w-full overflow-hidden py-8"
      style={{
        maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
    >
      <div className="flex flex-col md:gap-14 gap-6">
        <div className="w-full flex justify-center">
          <CarouselRow items={topRowMembers} direction="right" speed={0.8} />
        </div>
        <div className="w-full flex justify-center" style={{ transform: "translateY(4px)" }}>
          <CarouselRow items={bottomRowMembers} direction="left" speed={0.8} />
        </div>
      </div>
    </div>
  );
}
