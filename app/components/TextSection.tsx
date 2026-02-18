"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TezzeractButton } from "./ui/TezzeractButton";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TextSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const avatar1Ref = useRef<HTMLSpanElement>(null);
  const avatar2Ref = useRef<HTMLSpanElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!headingRef.current || !containerRef.current) return;

    const heading = headingRef.current;
    const container = containerRef.current;
    const textSpans = heading.querySelectorAll("span.text-word");

    // Check if mobile view (typically 768px and below)
    const isMobile = window.innerWidth < 768;

    // Set initial state for text spans
    gsap.set(textSpans, {
      opacity: 0,
      y: 50,
    });

    // Set initial state for images
    gsap.set([avatar1Ref.current, avatar2Ref.current], {
      opacity: 0,
      scale: 0.8,
    });

    // Set initial state for button
    if (buttonRef.current) {
      gsap.set(buttonRef.current, {
        opacity: 0,
        y: 40,
      });
    }

    // Create timeline for text animation with scroll scrub
    // Start earlier on mobile (top 95%) vs desktop (top 90%)
    const textTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: isMobile ? "top 95%" : "top 90%",
        end: "bottom 40%",
        scrub: 1, // Smooth scrubbing, tied to scroll position
      },
    });

    textTl.to(textSpans, {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.05,
      ease: "power3.out",
    }).to(buttonRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }, "-=1"); // Start much earlier in the animation sequence

    // Animate images with scroll scrub
    // Start earlier on mobile (top 85%) vs desktop (top 80%)
    const imageTl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: isMobile ? "top 85%" : "top 80%",
        end: "bottom 10%",
        scrub: 1, // Smooth scrubbing, tied to scroll position
      },
    });

    imageTl.to([avatar1Ref.current, avatar2Ref.current], {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out",
    });

    return () => {
      textTl.kill();
      imageTl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full  mx-auto py-20 md:py-10 text-center"
    >
      <h2 ref={headingRef} className="md:text-[60px] text-[36px] leading-[1.5] text-gray-400 font-light tracking-tighter">
        {/* Tezzeract */}
        <span className="text-word bg-gradient-to-r from-[#0068B5] to-[#00A9EE] bg-clip-text text-transparent" style={{ display: "inline-block" }}>Tezzeract</span>
        <span className="text-word" style={{ display: "inline-block" }}>{"\u00A0"}offers</span>
        <span className="text-word" style={{ display: "inline-block" }}>{"\u00A0"}access</span>
        <span className="text-word" style={{ display: "inline-block" }}>{"\u00A0"}to</span>
        <br className="hidden md:block" />
        {/* talent on demand */}
        <span className="text-word bg-gradient-to-r from-[#0068B5] to-[#00A9EE] bg-clip-text text-transparent" style={{ display: "inline-block" }}>{"\u00A0"}talent</span>
        <span className="text-word bg-gradient-to-r from-[#0068B5] to-[#00A9EE] bg-clip-text text-transparent" style={{ display: "inline-block" }}>{"\u00A0"}on</span>
        <span className="text-word bg-gradient-to-r from-[#0068B5] to-[#00A9EE] bg-clip-text text-transparent" style={{ display: "inline-block" }}>{"\u00A0"}demand</span>
        <span className="text-word bg-gradient-to-r from-[#0068B5] to-[#00A9EE] bg-clip-text text-transparent" style={{ display: "inline-block" }}>{"\u00A0"}</span>

        {/* Avatar 1 */}
        <span
          ref={avatar1Ref}
          className="inline-flex align-middle mx-2 md:mx-4 relative -top-1"
        >
          <div className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 overflow-hidden relative rounded-2xl border border-gray-100 shadow-sm">
            <Image
              src="/assets/avatars/Kotchakorn.jpeg"
              alt="Kotchakorn Avatar"
              fill
              className="object-cover"
            />
          </div>
        </span>

        {/* enabling businesses to */}
        <span className="text-word" style={{ display: "inline-block" }}>,</span>
        <span className="text-word" style={{ display: "inline-block" }}>{"\u00A0"}enabling</span>
        <span className="text-word" style={{ display: "inline-block" }}>{"\u00A0"}businesses</span>
        <span className="text-word" style={{ display: "inline-block" }}>{"\u00A0"}to</span>
        <br className="hidden md:block" />
        {/* form and scale teams */}
        <span className="text-word font-light bg-gradient-to-r from-[#0068B5] to-[#00A9EE] bg-clip-text text-transparent" style={{ display: "inline-block" }}>form</span>
        <span className="text-word font-light bg-gradient-to-r from-[#0068B5] to-[#00A9EE] bg-clip-text text-transparent" style={{ display: "inline-block" }}>{"\u00A0"}and</span>
        <span className="text-word font-light bg-gradient-to-r from-[#0068B5] to-[#00A9EE] bg-clip-text text-transparent" style={{ display: "inline-block" }}>{"\u00A0"}scale</span>
        <span className="text-word font-light bg-gradient-to-r from-[#0068B5] to-[#00A9EE] bg-clip-text text-transparent" style={{ display: "inline-block" }}>{"\u00A0"}teams</span>
        <span className="text-word font-light bg-gradient-to-r from-[#0068B5] to-[#00A9EE] bg-clip-text text-transparent" style={{ display: "inline-block" }}>{"\u00A0"}</span>

        {/* Pill Avatar + Button */}
        <span
          ref={avatar2Ref}
          className="inline-flex align-middle mx-2 md:mx-4 relative -top-1"
        >
          <div className="w-16 h-12 md:w-24 md:h-10 lg:w-32 lg:h-15 relative">
            <Image
              src="/assets/avatars/recGroup.png"
              alt="Tezzeract Team"
              fill
              className="object-contain"
            />
          </div>
        </span>

        {/* under */}
        <span className="text-word" style={{ display: "inline-block" }}>under</span>
        <br className="hidden md:block" />
        {/* a single subscription */}
        <span className="text-word font-light bg-gradient-to-r from-[#0068B5] to-[#00A9EE] bg-clip-text text-transparent" style={{ display: "inline-block" }}>a</span>
        <span className="text-word font-light bg-gradient-to-r from-[#0068B5] to-[#00A9EE] bg-clip-text text-transparent" style={{ display: "inline-block" }}>{"\u00A0"}single</span>
        <span className="text-word font-light bg-gradient-to-r from-[#0068B5] to-[#00A9EE] bg-clip-text text-transparent" style={{ display: "inline-block" }}>{"\u00A0"}subscription.</span>
      </h2>
      <Link href="/get-started" className="block w-fit mx-auto mt-10">
        <TezzeractButton ref={buttonRef} className="w-[200px]">Book a call</TezzeractButton>
      </Link>
    </div>
  );
}
