"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";

interface FeatureCard {
  heading: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const features: FeatureCard[] = [
  {
    heading: "Work with screened",
    description: "Tezzeract focuses on helping businesses grow digitally by providing access to vetted, skilled professionals. Our rigorous screening process ensures you work with top-tier talent that understands your business needs and delivers exceptional results.",
    imageSrc: "/assets/avatars/meet1.png",
    imageAlt: "Screened professionals working together",
  },
  {
    heading: "Scalable solutions",
    description: "Scale your team up or down based on project requirements without the overhead of traditional hiring. Our flexible model allows you to adapt quickly to changing business needs while maintaining quality and consistency.",
    imageSrc: "/assets/scale.png",
    imageAlt: "Scalable business solutions",
  },
];

export default function TwoFeatureCardsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ScrollTrigger: any = null;
    const animations: gsap.core.Timeline[] = [];

    // Lazy load ScrollTrigger
    const initScrollTrigger = async () => {
      const module = await import("gsap/ScrollTrigger");
      ScrollTrigger = module.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      if (!ScrollTrigger || !section) return;

      // Check if mobile view
      const isMobile = window.innerWidth < 768;

      // Set initial state for all cards
      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.set(card, {
          opacity: 0,
          y: 60,
        });
      });

      // Create animations for each card
      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: isMobile ? "top 90%" : "top 85%",
            end: "bottom 50%",
            scrub: 1,
            markers: false,
          },
        });

        tl.to(card, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        });

        animations.push(tl);
      });

      // Refresh ScrollTrigger to ensure proper initialization
      if (ScrollTrigger) ScrollTrigger.refresh();
    };

    initScrollTrigger();

    // Cleanup
    return () => {
      animations.forEach((anim) => {
        if (anim && typeof anim.kill === "function") {
          anim.kill();
        }
      });
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger: any) => {
          if (trigger.vars && trigger.vars.trigger && cardRefs.current.includes(trigger.vars.trigger)) {
            trigger.kill();
          }
        });
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-white py-20 md:py-16 px-4 md:px-8 lg:px-16"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col gap-16 md:gap-20">
        {features.map((feature, index) => (
          <div
            key={index}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            {/* Text Content - left on card 1, right on card 2 */}
            <div
              className={`flex flex-col space-y-6 order-2 ${
                index === 0 ? "lg:order-1" : "lg:order-2"
              }`}
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-tight tracking-tighter">
                {feature.heading}
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 font-light leading-relaxed">
                {feature.description}
              </p>
            </div>

            {/* Image - right on card 1, left on card 2 */}
            <div
              className={`relative w-full h-[400px] md:h-[500px] lg:h-[600px] order-1 ${
                index === 0 ? "lg:order-2" : "lg:order-1"
              }`}
            >
              <Image
                src={feature.imageSrc}
                alt={feature.imageAlt}
                fill
                className="object-contain"
                loading={index === 0 ? "eager" : "lazy"}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
