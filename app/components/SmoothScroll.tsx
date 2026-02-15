"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
    children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    const lenisRef = useRef<any>(null);

    useEffect(() => {
        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000);
        }

        gsap.ticker.add(update);

        // Connect ScrollTrigger to Lenis
        const lenisInstance = lenisRef.current?.lenis;
        if (lenisInstance) {
            lenisInstance.on('scroll', ScrollTrigger.update);
        }

        return () => {
            gsap.ticker.remove(update);
            if (lenisInstance) {
                lenisInstance.off('scroll', ScrollTrigger.update);
            }
        };
    }, []);

    return (
        <ReactLenis
            root
            ref={lenisRef}
            autoRaf={false}
            options={{
                lerp: 0.1,
                duration: 1.5,
                smoothWheel: true,
                wheelMultiplier: 1,
            }}
        >
            {children}
        </ReactLenis>
    );
}
