"use client";

import { useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
}

export default function BackgroundShape({ 
  className = "",
  borderRadius = 20 
}: { 
  className?: string;
  borderRadius?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height,
        });
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  const { width, height } = dimensions;

  // Percentage-based vertices from the original polygon
  // polygon(13% 0, 97% 0, 100% 3%, 100% 77%, 50% 77%, 47% 80%, 47% 97%, 3% 97%, 0 94%, 0 3%)
  const vertices: Point[] = width > 0 && height > 0 ? [
    { x: 0.13 * width, y: 0 },
    { x: 0.97 * width, y: 0 },
    { x: 1.0 * width, y: 0.03 * height },
    { x: 1.0 * width, y: 0.77 * height },
    { x: 0.5 * width, y: 0.77 * height },
    { x: 0.47 * width, y: 0.80 * height },
    { x: 0.47 * width, y: 0.97 * height },
    { x: 0.03 * width, y: 0.97 * height },
    { x: 0, y: 0.94 * height },
    { x: 0, y: 0.03 * height },
  ] : [];

  const createRoundedPath = (points: Point[], radius: number) => {
    if (points.length < 3 || width === 0 || height === 0) return "";

    let path = "";

    try {
      points.forEach((p, i) => {
        const prev = points[(i - 1 + points.length) % points.length];
        const next = points[(i + 1) % points.length];

        // Vectors
        const v1 = { x: p.x - prev.x, y: p.y - prev.y };
        const v2 = { x: next.x - p.x, y: next.y - p.y };

        // Lengths
        const l1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y);
        const l2 = Math.sqrt(v2.x * v2.x + v2.y * v2.y);

        // Prevent division by zero if points are identical
        if (l1 < 0.001 || l2 < 0.001) {
          // Fallback to straight line if segment is too small
          if (i === 0) path += `M ${p.x},${p.y} `;
          else path += `L ${p.x},${p.y} `;
          return;
        }

        // Clamped radius
        const r = Math.min(radius, l1 / 2, l2 / 2);

        // Start and end of curve
        const start = {
          x: p.x - (v1.x / l1) * r,
          y: p.y - (v1.y / l1) * r,
        };
        const end = {
          x: p.x + (v2.x / l2) * r,
          y: p.y + (v2.y / l2) * r,
        };

        if (i === 0) {
          path += `M ${start.x},${start.y} `;
        } else {
          path += `L ${start.x},${start.y} `;
        }

        // Quadratic bezier curve to rounded corner
        path += `Q ${p.x},${p.y} ${end.x},${end.y} `;
      });

      path += "Z";
    } catch (e) {
      console.error("Error creating path:", e);
      return "";
    }
    return path;
  };

  const pathData = createRoundedPath(vertices, borderRadius);

  return (
    <div ref={containerRef} className={`${className}`}>
      {width > 0 && height > 0 && pathData && (
        <svg 
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{ overflow: "visible" }}
        >
          <defs>
            <linearGradient id="bg-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00b4d8" />
              <stop offset="100%" stopColor="#0077b6" />
            </linearGradient>
          </defs>
          <path
            d={pathData}
            fill="url(#bg-gradient)"
          />
        </svg>
      )}
    </div>
  );
}
