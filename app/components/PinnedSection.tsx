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
            ScrollTrigger.create({
                trigger: triggerRef.current,
                start: "top top",
                end: `+=${pinDuration}`,
                pin: true,
                pinSpacing: true,
                scrub: true,
                markers: false, // Set to true for debugging
                onLeave: () => {
                    // Get the next sibling element (Portfolio section)
                    const nextSection = containerRef.current?.nextElementSibling as HTMLElement;
                    if (nextSection && lenis) {
                        // Use Lenis to smoothly scroll to the next section
                        lenis.scrollTo(nextSection, {
                            duration: 1.5,
                            offset: 0,
                        });
                    }
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
