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
  {
    heading: "Expert teams",
    description: "Access specialized teams across various domains including product development, web development, digital transformation, and more. Each team member brings years of experience and expertise to your projects.",
    imageSrc: "/assets/avatars/meet2.png",
    imageAlt: "Expert team collaboration",
  },
  {
    heading: "Fast deployment",
    description: "Get your team up and running quickly. Our streamlined onboarding process means you can start working with your dedicated team within days, not months. Focus on what matters most - growing your business.",
    imageSrc: "/assets/avatars/meet3.png",
    imageAlt: "Fast team deployment",
  },
  {
    heading: "Continuous support",
    description: "Receive ongoing support and guidance throughout your journey. Our team is committed to your success, providing regular check-ins, performance reviews, and strategic insights to help you achieve your goals.",
    imageSrc: "/assets/aboutbg.png",
    imageAlt: "Continuous business support",
  },
];

export default function FeaturesStackSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let ScrollTrigger: any = null;
    let ctx: gsap.Context | null = null;

    // Lazy load ScrollTrigger
    const initScrollTrigger = async () => {
      const module = await import("gsap/ScrollTrigger");
      ScrollTrigger = module.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      if (!ScrollTrigger || !section) return;

      // Check if mobile - disable pinning on mobile
      const checkIsMobile = () => window.innerWidth < 1024;

      // Use gsap.context() for better cleanup management
      ctx = gsap.context(() => {
        // Set initial states for all cards
        cardRefs.current.forEach((card, index) => {
          if (!card) return;

          if (index === 0) {
            // First card: visible initially
            gsap.set(card, {
              opacity: 1,
              y: 0,
              zIndex: features.length,
            });
          } else {
            // Other cards: hidden below
            gsap.set(card, {
              opacity: 0,
              y: 100,
              zIndex: features.length - index,
            });
          }
        });

        // Create a master timeline that controls all transitions
        // Timeline progresses from 0 to features.length as user scrolls
        // Pin the section on desktop while scrolling through transitions
        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${features.length * 100}vh`,
            scrub: 1,
            pin: !checkIsMobile(), // Pin on desktop only
            pinSpacing: true,
            anticipatePin: 1, // Help with transitions between pinned sections
            markers: false,
            onLeave: () => {
              // Refresh ScrollTrigger to recalculate positions for next section
              // This ensures smooth transition to BentoGrid
              if (ScrollTrigger) {
                ScrollTrigger.refresh();
              }
            },
          },
        });

        // Add animations for each card transition
        // Each transition happens over timeline positions i to i+1
        for (let i = 0; i < features.length - 1; i++) {
          const currentCard = cardRefs.current[i];
          const nextCard = cardRefs.current[i + 1];

          if (!currentCard || !nextCard) continue;

          // Set initial state: current card visible, next card hidden
          masterTl.set(
            currentCard,
            {
              opacity: 1,
              y: 0,
            },
            i
          );

          masterTl.set(
            nextCard,
            {
              opacity: 0,
              y: 100,
            },
            i
          );

          // Transition happens from position i to i+1
          // Fade out current card over the transition
          masterTl.to(
            currentCard,
            {
              opacity: 0,
              y: -50,
              ease: "power2.out",
              duration: 1, // Takes 1 unit of timeline (from i to i+1)
            },
            i
          );

          // Fade in next card from bottom over the same transition
          masterTl.to(
            nextCard,
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              duration: 1, // Takes 1 unit of timeline (from i to i+1)
            },
            i
          );

          // Ensure previous cards stay hidden
          for (let j = 0; j < i; j++) {
            const prevCard = cardRefs.current[j];
            if (prevCard) {
              masterTl.set(
                prevCard,
                {
                  opacity: 0,
                  y: -50,
                },
                i
              );
            }
          }

          // Ensure future cards stay hidden until their turn
          for (let j = i + 2; j < features.length; j++) {
            const futureCard = cardRefs.current[j];
            if (futureCard) {
              masterTl.set(
                futureCard,
                {
                  opacity: 0,
                  y: 100,
                },
                i
              );
            }
          }
        }
      }, sectionRef);
    };

    initScrollTrigger();

    // Cleanup using gsap.context()
    return () => {
      if (ctx) {
        ctx.revert();
        ctx = null;
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full relative bg-white overflow-hidden"
      style={{ height: "100vh" }}
    >
      {features.map((feature, index) => (
        <div
          key={index}
          ref={(el) => {
            cardRefs.current[index] = el;
          }}
          className="absolute inset-0 w-full h-screen flex items-center justify-center px-4 md:px-8 lg:px-16"
          style={{ zIndex: features.length - index }}
        >
          <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Side - Text Content */}
            <div className="flex flex-col space-y-6 order-2 lg:order-1">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 leading-tight tracking-tighter">
                {feature.heading}
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 font-light leading-relaxed">
                {feature.description}
              </p>
            </div>

            {/* Right Side - Image */}
            <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] order-1 lg:order-2">
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
        </div>
      ))}
    </section>
  );
}
