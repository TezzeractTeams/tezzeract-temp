"use client"

import React, { ComponentPropsWithoutRef, CSSProperties } from "react"

import { cn } from "@/lib/utils"

interface RippleProps extends ComponentPropsWithoutRef<"div"> {
  mainCircleSize?: number
  mainCircleOpacity?: number
  numCircles?: number
  verticalOffset?: string
  borderColor?: string
}

export const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 5,
  verticalOffset = "40%",
  borderColor = "#42647D",
  className,
  ...props
}: RippleProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 select-none",
        className
      )}
      {...props}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 90
        const opacity = mainCircleOpacity - i * 0.03
        const borderStyle = "solid"

        return (
          <div
            key={i}
            className="absolute rounded-full border shadow-[0px_10px_10px_10px_#42647D]"
            style={
              {
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                borderStyle,
                borderWidth: "2px",
                borderColor: borderColor,
                top: verticalOffset,
                left: "50%",
                transform: "translate(-50%, -50%) scale(1)",
              } as CSSProperties
            }
          />
        )
      })}
    </div>
  )
})

Ripple.displayName = "Ripple"
