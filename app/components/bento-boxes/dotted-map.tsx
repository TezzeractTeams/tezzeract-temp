"use client";

import React from "react";

interface Marker {
  lat: number;
  lng: number;
  size?: number;
}

interface DottedMapProps {
  markers?: Marker[];
  dotRadius?: number;
  dotColor?: string;
}

export function DottedMap({
  markers = [],
  dotRadius = 0.15,
  dotColor = "#0077b6",
}: DottedMapProps) {
  return (
    <div className="w-full h-full relative flex items-center justify-center bg-gray-50">
      <svg
        className="w-full h-full"
        viewBox="0 0 1000 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* World map dots grid */}
        {Array.from({ length: 100 }).map((_, i) =>
          Array.from({ length: 50 }).map((_, j) => {
            const x = i * 10;
            const y = j * 10;
            return (
              <circle
                key={`${i}-${j}`}
                cx={x}
                cy={y}
                r={dotRadius * 2}
                fill="#e5e7eb"
                opacity="0.5"
              />
            );
          })
        )}

        {/* Markers */}
        {markers.map((marker, idx) => {
          const x = ((marker.lng + 180) / 360) * 1000;
          const y = ((90 - marker.lat) / 180) * 500;
          const size = marker.size || 0.3;

          return (
            <g key={idx}>
              <circle
                cx={x}
                cy={y}
                r={size * 15}
                fill={dotColor}
                opacity="0.3"
              >
                <animate
                  attributeName="r"
                  values={`${size * 15};${size * 20};${size * 15}`}
                  dur="2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx={x} cy={y} r={size * 8} fill={dotColor} opacity="0.8" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

const markers = [
  { lat: 40.7128, lng: -74.006, size: 0.3 }, // New York
  { lat: 34.0522, lng: -118.2437, size: 0.3 }, // Los Angeles
  { lat: 51.5074, lng: -0.1278, size: 0.3 }, // London
  { lat: -33.8688, lng: 151.2093, size: 0.3 }, // Sydney
  { lat: 48.8566, lng: 2.3522, size: 0.3 }, // Paris
  { lat: 35.6762, lng: 139.6503, size: 0.3 }, // Tokyo
  { lat: 55.7558, lng: 37.6176, size: 0.3 }, // Moscow
  { lat: 39.9042, lng: 116.4074, size: 0.3 }, // Beijing
  { lat: 28.6139, lng: 77.209, size: 0.3 }, // New Delhi
  { lat: -23.5505, lng: -46.6333, size: 0.3 }, // São Paulo
  { lat: 1.3521, lng: 103.8198, size: 0.3 }, // Singapore
  { lat: 25.2048, lng: 55.2708, size: 0.3 }, // Dubai
  { lat: 52.52, lng: 13.405, size: 0.3 }, // Berlin
  { lat: 19.4326, lng: -99.1332, size: 0.3 }, // Mexico City
  { lat: -26.2041, lng: 28.0473, size: 0.3 }, // Johannesburg
];

export function DottedMapDemo() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg">
      <DottedMap markers={markers} />
    </div>
  );
}
