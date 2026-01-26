"use client"

import React from "react"
import { OrbitingCircles } from "./OrbitingCircles"

interface RippleOrbitingIconsProps {
  mainCircleSize?: number
  numCircles?: number
  verticalOffset?: string
  icons?: React.ReactNode[]
  iconSize?: number
  reverse?: boolean[]
  duration?: number
  path?: boolean
  scale?: number
  radiusOffset?: number
  radiusMultiplier?: number
}

export function RippleOrbitingIcons({
  mainCircleSize = 210,
  numCircles = 3,
  verticalOffset = "85%",
  icons = [],
  iconSize = 40,
  reverse = [],
  duration = 20,
  path = false,
  scale = 1.2,
  radiusOffset = 1,
  radiusMultiplier = 1,
}: RippleOrbitingIconsProps) {
  // Calculate ripple circle radii and distribute icons
  const circleConfigs = Array.from({ length: numCircles }, (_, i) => {
    const circleSize = mainCircleSize + i * 120
    // Account for scale: visual size = circleSize * scale
    // Visual radius = (circleSize * scale) / 2
    // Border center = (circleSize * scale) / 2 + radiusOffset (accounting for 2px border)
    // Apply multiplier for easy adjustment
    const baseRadius = (circleSize * scale) / 2
    const radius = (baseRadius + radiusOffset) * radiusMultiplier
    const containerSize = radius * 2 + iconSize
    
    // Distribute icons evenly across circles
    const iconsPerCircle = Math.ceil(icons.length / numCircles)
    const startIndex = i * iconsPerCircle
    const endIndex = Math.min(startIndex + iconsPerCircle, icons.length)
    const circleIcons = icons.slice(startIndex, endIndex)
    
    // Get reverse flag for this circle (default to false if not provided)
    const isReverse = reverse[i] ?? false
    
    return {
      radius,
      containerSize,
      icons: circleIcons,
      reverse: isReverse,
    }
  })

  return (
    <>
      {circleConfigs.map((config, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            top: verticalOffset,
            left: "50%",
            width: `${config.containerSize}px`,
            height: `${config.containerSize}px`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <OrbitingCircles
            radius={config.radius}
            path={path}
            iconSize={iconSize}
            reverse={config.reverse}
            duration={duration}
          >
            {config.icons}
          </OrbitingCircles>
        </div>
      ))}
    </>
  )
}
