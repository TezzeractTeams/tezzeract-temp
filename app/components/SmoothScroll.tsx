"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";

interface SmoothScrollProps {
    children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
    const lenisRef = useRef<any>(null);

    useEffect(() => {
        // Lazy load ScrollTrigger
        let ScrollTrigger: any = null;
        const loadScrollTrigger = async () => {
            const module = await import("gsap/ScrollTrigger");
            ScrollTrigger = module.ScrollTrigger;
            gsap.registerPlugin(ScrollTrigger);
            
            // Connect ScrollTrigger to Lenis after loading
            const lenisInstance = lenisRef.current?.lenis;
            if (lenisInstance && ScrollTrigger) {
                lenisInstance.on('scroll', ScrollTrigger.update);
            }
        };
        
        loadScrollTrigger();

        function update(time: number) {
            lenisRef.current?.lenis?.raf(time * 1000);
        }

        gsap.ticker.add(update);

        return () => {
            gsap.ticker.remove(update);
            const lenisInstance = lenisRef.current?.lenis;
            if (lenisInstance && ScrollTrigger) {
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
