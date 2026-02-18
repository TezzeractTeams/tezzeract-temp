"use client"

import { useEffect, useRef } from "react"
import createGlobe, { COBEOptions } from "cobe"
import { useMotionValue, useSpring } from "motion/react"

import { cn } from "@/lib/utils"

const MOVEMENT_DAMPING = 1400

const GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [39 / 255, 170 / 255, 225 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [6.9271, 79.8612], size: 0.08 },    // Sri Lanka - Colombo
    { location: [28.6139, 77.2090], size: 0.08 },   // India - New Delhi
    { location: [22.3193, 114.1694], size: 0.08 },  // Hong Kong
    { location: [41.9028, 12.4964], size: 0.08 },   // Italy - Rome
    { location: [48.8566, 2.3522], size: 0.08 },     // France - Paris
    { location: [38.7223, -9.1393], size: 0.08 },   // Portugal - Lisbon
    { location: [39.9612, -82.9988], size: 0.08 },   // USA - Ohio (Columbus)
    { location: [34.0522, -118.2437], size: 0.08 },  // USA - California (Los Angeles)
    { location: [34.7465, -92.2896], size: 0.08 },   // USA - Arkansas (Little Rock)
    { location: [1.3521, 103.8198], size: 0.08 },   // Singapore
    { location: [13.7563, 100.5018], size: 0.08 },   // Thailand - Bangkok
    { location: [51.5074, -0.1278], size: 0.08 },   // United Kingdom - London
    { location: [52.52, 13.405], size: 0.08 },      // Germany - Berlin
    { location: [54.6872, 25.2797], size: 0.08 },   // Lithuania - Vilnius
  ],
}

export function Globe({
  className,
  config = GLOBE_CONFIG,
}: {
  className?: string
  config?: COBEOptions
}) {
  let phi = 0
  let width = 0
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)

  const r = useMotionValue(0)
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  })

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab"
    }
  }

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current
      pointerInteractionMovement.current = delta
      r.set(r.get() + delta / MOVEMENT_DAMPING)
    }
  }

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth
      }
    }

    window.addEventListener("resize", onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      ...config,
      width: width * 2,
      height: width * 2,
      onRender: (state: Record<string, any>) => {
        if (!pointerInteracting.current) phi += 0.005
        state.phi = phi + rs.get()
        state.width = width * 2
        state.height = width * 2
      },
    })

    setTimeout(() => (canvasRef.current!.style.opacity = "1"), 0)
    return () => {
      globe.destroy()
      window.removeEventListener("resize", onResize)
    }
  }, [rs, config])

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[800px]",
        className
      )}
    >
      <canvas
        className={cn(
          "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX
          updatePointerInteraction(e.clientX)
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  )
}
