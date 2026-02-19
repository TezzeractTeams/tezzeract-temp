"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { PinnedScrollContext } from "@/app/context/PinnedScrollContext";

interface PinnedSectionProps {
    children: React.ReactNode;
    pinDuration?: string | number;
}

export default function PinnedSection({ children, pinDuration = "100%" }: PinnedSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const isPinnedRef = useRef(false);
    const lenis = useLenis();

    useLayoutEffect(() => {
        // Function to check if mobile
        const checkIsMobile = () => window.innerWidth < 1024;
        
        // Set initial state
        if (checkIsMobile()) {
            isPinnedRef.current = false;
        }

        const ctx = gsap.context(() => {
            // Only apply pinning on desktop (lg and up). Mobile/tablet scroll normally.
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
                // Explicitly handle mobile - ensure no pinning
                "(max-width: 1023px)": () => {
                    isPinnedRef.current = false;
                },
            });
        }, containerRef);

        // Handle resize to ensure mobile state is maintained
        const handleResize = () => {
            if (checkIsMobile()) {
                isPinnedRef.current = false;
            }
        };
        
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            ctx.revert();
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
