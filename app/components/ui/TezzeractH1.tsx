import React from "react";
import { cn } from "../../lib/utils";

export interface TezzeractH1Props extends React.HTMLAttributes<HTMLHeadingElement> {
  variant?: "light" | "dark";
  children: React.ReactNode;
}

export const TezzeractH1 = React.forwardRef<HTMLHeadingElement, TezzeractH1Props>(
  ({ className, variant = "light", children, style, ...props }, ref) => {
    // Base styles
    const baseStyles = "text-[72px] leading-[84px] tracking-[-0.05em] font-sans bg-clip-text text-transparent";
    
    // Light variant gradient
    const lightGradient = "linear-gradient(257.31deg, #FFFFFF 16.02%, #D6D6D6 49.66%, #FFFFFF 83.98%)";
    
    // Dark variant gradient (adjusted for dark theme)
    const darkGradient = "linear-gradient(257.31deg, #171717 16.02%, #4A4A4A 49.66%, #171717 83.98%)";

    const gradientStyle = variant === "dark" ? darkGradient : lightGradient;

    return (
      <h1
        ref={ref}
        className={cn(baseStyles, className)}
        style={{
          backgroundImage: gradientStyle,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          ...style,
        }}
        {...props}
      >
        {children}
      </h1>
    );
  }
);

TezzeractH1.displayName = "TezzeractH1";

export default TezzeractH1;
