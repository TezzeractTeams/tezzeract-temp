"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { PinnedScrollContext } from "@/app/context/PinnedScrollContext";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface PinnedSectionProps {
    children: React.ReactNode;
    pinDuration?: string | number;
}

export default function PinnedSection({ children, pinDuration = "100%" }: PinnedSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const isPinnedRef = useRef(false);
    const ctxRef = useRef<gsap.Context | null>(null);
    const lenis = useLenis();

    useLayoutEffect(() => {
        // Function to check if mobile
        const checkIsMobile = () => window.innerWidth < 1024;
        
        // If mobile, skip ScrollTrigger initialization entirely
        if (checkIsMobile()) {
            isPinnedRef.current = false;
            // Clean up any existing ScrollTrigger instances if switching from desktop to mobile
            if (ctxRef.current) {
                ctxRef.current.revert();
                ctxRef.current = null;
            }
            return;
        }

        // Only initialize ScrollTrigger on desktop screens
        const ctx = gsap.context(() => {
            ScrollTrigger.matchMedia({
                "(min-width: 1024px)": () => {
                    // Double check we're still on desktop before creating trigger
                    if (checkIsMobile()) return;
                    
                    const st = ScrollTrigger.create({
                        trigger: triggerRef.current,
                        start: "top top",
                        end: `+=${pinDuration}`,
                        pin: true,
                        pinSpacing: true,
                        scrub: true,
                        markers: false,
                        onUpdate: (self) => {
                            // Only update if still on desktop
                            if (!checkIsMobile()) {
                                isPinnedRef.current = self.isActive;
                            } else {
                                isPinnedRef.current = false;
                            }
                        },
                        onLeave: () => {
                            // Only snap on desktop - double check window width
                            if (!checkIsMobile()) {
                                // When pin ends, smoothly snap to portfolio section
                                const portfolioSection = document.getElementById("portfolio-section");
                                if (portfolioSection && lenis) {
                                    lenis.scrollTo(portfolioSection, {
                                        duration: 1.5,
                                        offset: 0,
                                    });
                                }
                            }
                        },
                    });
                    return () => st.kill();
                },
            });
        }, containerRef);
        
        ctxRef.current = ctx;

        // Handle resize to clean up ScrollTrigger when switching from desktop to mobile
        const handleResize = () => {
            if (checkIsMobile()) {
                isPinnedRef.current = false;
                // Clean up ScrollTrigger when switching to mobile
                if (ctxRef.current) {
                    ctxRef.current.revert();
                    ctxRef.current = null;
                }
            }
        };
        
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (ctxRef.current) {
                ctxRef.current.revert();
                ctxRef.current = null;
            }
        };
    }, [pinDuration, lenis]);

    return (
        <PinnedScrollContext.Provider value={{ isPinnedRef }}>
            <div ref={containerRef} className="w-full">
                <div ref={triggerRef} className="w-full">
                    {children}
                </div>
            </div>
        </PinnedScrollContext.Provider>
    );
}
