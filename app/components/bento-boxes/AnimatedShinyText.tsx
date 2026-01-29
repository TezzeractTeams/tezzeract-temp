"use client"

import { ComponentPropsWithoutRef, CSSProperties, FC } from "react"

import { cn } from "@/lib/utils"

export interface AnimatedShinyTextProps extends ComponentPropsWithoutRef<"span"> {
  shimmerWidth?: number;
  textColor?: string;
  shimmerColor?: string;
}

export const AnimatedShinyText: FC<AnimatedShinyTextProps> = ({
  children,
  className,
  shimmerWidth = 100,
  textColor,
  shimmerColor = "rgba(255,255,255,0.35)",
  style,
  ...props
}) => {
  // Build gradient pattern that creates a subtle animated shine
  // The gradient pattern spans 0-100% and will be animated via background-position
  // Pattern: textColor → shimmer shine → textColor
  // Calculate lighter version of shimmer color for edges (60% opacity)
  const shimmerColorLight = shimmerColor.includes('rgba')
    ? shimmerColor.replace(/rgba\(([^)]+)\)/, (match, colors: string) => {
        const parts: string[] = colors.split(',').map((s: string) => s.trim());
        const opacity = parseFloat(parts[3] || '1');
        return `rgba(${parts[0]},${parts[1]},${parts[2]},${Math.max(0, opacity * 0.6)})`;
      })
    : shimmerColor.replace(/[\d.]+\)$/, (match) => {
        const opacity = parseFloat(match.replace(')', ''));
        return `${Math.max(0, opacity * 0.6)})`;
      });
  
  const gradientStyle = textColor
    ? {
        background: `linear-gradient(to right, ${textColor} 0%, ${textColor} 35%, ${shimmerColorLight} 45%, ${shimmerColor} 50%, ${shimmerColorLight} 55%, ${textColor} 65%, ${textColor} 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }
    : {};

  return (
    <span
      style={
        {
          "--shiny-width": `${shimmerWidth}px`,
          ...gradientStyle,
          ...style,
        } as unknown as CSSProperties
      }
      className={cn(
        "mx-auto max-w-md",
        textColor ? "text-transparent" : "text-white/90",

        // Shine effect
        "animate-shiny-text [background-size:var(--shiny-width)_100%] bg-clip-text [background-position:0_0] bg-no-repeat [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",

        // Shine gradient (only applied if no textColor is provided)
        !textColor && "bg-gradient-to-r from-transparent via-black via-50% to-transparent",

        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}
