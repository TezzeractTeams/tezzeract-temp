import React from "react"

import { cn } from "@/lib/utils"

export interface OrbitingCirclesProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
  reverse?: boolean
  duration?: number
  delay?: number
  radius?: number
  path?: boolean
  iconSize?: number
  speed?: number
  verticalOffset?: string
}

export function OrbitingCircles({
  className,
  children,
  reverse,
  duration = 20,
  radius = 300,
  path = true,
  iconSize = 50,
  speed = 0.4,
  verticalOffset,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed
  const childrenCount = React.Children.count(children)

  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-black/10 stroke-1 dark:stroke-white/10"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      {React.Children.map(children, (child, index) => {
        const angle = (360 / childrenCount) * index
        return (
          <div
            data-orbit-index={index}
            style={
              {
                "--duration": calculatedDuration,
                "--radius": radius,
                "--angle": angle,
                "--icon-size": `${iconSize}px`,
                ...(verticalOffset ? { top: verticalOffset } : {}),
              } as React.CSSProperties
            }
            className={cn(
              `animate-orbit absolute left-1/2 flex size-[var(--icon-size)] transform-gpu items-center justify-center rounded-full bg-white`,
              verticalOffset ? "-translate-y-1/2" : "top-1/2",
              { "[animation-direction:reverse]": reverse },
              className
            )}
            {...props}
          >
            {child}
          </div>
        )
      })}
    </>
  )
}
