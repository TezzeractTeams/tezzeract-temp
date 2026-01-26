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
  radius = 160,
  path = true,
  iconSize = 30,
  speed = 0.4,
  verticalOffset,
  ...props
}: OrbitingCirclesProps) {
  const calculatedDuration = duration / speed
  const childrenCount = React.Children.count(children)
  // #region agent log
  React.useEffect(() => {
    fetch('http://127.0.0.1:7242/ingest/69aca90b-7973-4e12-aca1-b9909e760da5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'OrbitingCircles.tsx:29',message:'Component render params',data:{radius,iconSize,calculatedDuration,childrenCount},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
    setTimeout(() => {
      React.Children.forEach(children, (_, index) => {
        const element = document.querySelector(`[data-orbit-index="${index}"]`) as HTMLElement;
        if (element) {
          const rect = element.getBoundingClientRect();
          const parent = element.parentElement;
          const parentRect = parent?.getBoundingClientRect();
          const expectedCenterX = parentRect ? parentRect.left + parentRect.width/2 : null;
          const expectedCenterY = parentRect ? parentRect.top + parentRect.height/2 : null;
          const elementCenterX = rect.left + rect.width/2;
          const elementCenterY = rect.top + rect.height/2;
          fetch('http://127.0.0.1:7242/ingest/69aca90b-7973-4e12-aca1-b9909e760da5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'OrbitingCircles.tsx:35',message:'Element position check',data:{index,angle:(360/childrenCount)*index,radius,elementLeft:rect.left,elementTop:rect.top,elementWidth:rect.width,elementHeight:rect.height,elementCenterX,elementCenterY,parentWidth:parentRect?.width,parentHeight:parentRect?.height,parentLeft:parentRect?.left,parentTop:parentRect?.top,expectedCenterX,expectedCenterY,alignmentX:expectedCenterX ? Math.abs(elementCenterX - expectedCenterX) : null,alignmentY:expectedCenterY ? Math.abs(elementCenterY - expectedCenterY) : null},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'A'})}).catch(()=>{});
          const computedStyle = window.getComputedStyle(element);
          fetch('http://127.0.0.1:7242/ingest/69aca90b-7973-4e12-aca1-b9909e760da5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'OrbitingCircles.tsx:35',message:'Computed styles',data:{index,left:computedStyle.left,top:computedStyle.top,transform:computedStyle.transform,transformOrigin:computedStyle.transformOrigin},timestamp:Date.now(),sessionId:'debug-session',runId:'post-fix',hypothesisId:'B'})}).catch(()=>{});
        }
      });
    }, 100);
  }, [radius, iconSize, calculatedDuration, children, childrenCount]);
  // #endregion
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
