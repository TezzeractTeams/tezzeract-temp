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
                        onUpdate: (self) => {
                            isPinnedRef.current = self.isActive;
                        },
                        onLeave: () => {
                            isPinnedRef.current = false;
                            const nextSection = containerRef.current?.nextElementSibling as HTMLElement;
                            if (nextSection && lenis) {
                                lenis.scrollTo(nextSection, {
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
        <PinnedScrollContext.Provider value={{ isPinnedRef }}>
            <div ref={containerRef} className="w-full">
                <div ref={triggerRef} className="w-full">
                    {children}
                </div>
            </div>
        </PinnedScrollContext.Provider>
    );
}
