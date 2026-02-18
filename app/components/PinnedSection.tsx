"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";

interface PinnedSectionProps {
    children: React.ReactNode;
    pinDuration?: string | number;
}

export default function PinnedSection({ children, pinDuration = "100%" }: PinnedSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLDivElement>(null);
    const lenis = useLenis();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Only apply pinning on desktop (lg and up). Mobile/tablet scroll normally.
            ScrollTrigger.matchMedia({
                "(min-width: 1024px)": () => {
                    const st = ScrollTrigger.create({
                        trigger: triggerRef.current,
                        start: "top top",
                        end: `+=${pinDuration}`,
                        pin: true,
                        pinSpacing: true,
                        scrub: true,
                        markers: false,
                        onLeave: () => {
                            // When pin ends, smoothly snap to portfolio section
                            const portfolioSection = document.getElementById("portfolio-section");
                            if (portfolioSection && lenis) {
                                lenis.scrollTo(portfolioSection, {
                                    duration: 1.5,
                                    offset: 0,
                                });
                            }
                        },
                    });
                    return () => st.kill();
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, [pinDuration, lenis]);

    return (
        <div ref={containerRef} className="w-full">
            <div ref={triggerRef} className="w-full">
                {children}
            </div>
        </div>
    );
}
